/* Lecteur audio : synthèse vocale du navigateur, surlignage du passage et du mot lus.
   Tout le texte d'une partie est mis en file d'un coup (plusieurs speak() sans cancel())
   pour qu'il n'y ait aucun blanc ; le surlignage suit la voix au lieu de la piloter. */
(function () {
  "use strict";
  var synth = window.speechSynthesis || null;
  var RATES = [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2];
  var RKEY = "revis-manag-rate";
  // Éléments jamais lus (étiquettes, boutons, champs, numéros décoratifs, commandes du lecteur)
  var IGN = ".pill, .tag, .badge, button:not(.opt):not(.ord-item):not([role=radio]), select, textarea, input, svg, [hidden], [aria-hidden=true], " +
    ".num, .st-n, .sw-l, .dot, .an-corner, .exam-grid, .listen, [data-listen], .spd, .tap, .kbd-hint, .qcount, .timer, .segs, .back, .dim";
  var PASS = "h1, h2, h3, p, li, blockquote, tr, dt, dd, .opt, .copts button, .ord-item";
  var SYM = [[/→/g, ", puis "], [/÷/g, " divisé par "], [/≈/g, " environ "], [/²/g, " au carré"], [/√/g, " racine de "], [/×/g, " fois "],
    [/±/g, " plus ou moins "], [/≤/g, " inférieur ou égal à "], [/≥/g, " supérieur ou égal à "], [/≠/g, " différent de "], [/·/g, ", "],
    [/[★☆✔✓✗✘✕•▪◆●○↑↓←⇒➜✅❌⚠]/g, " "]];

  var rate = 1;
  try { var sr = parseFloat(localStorage.getItem(RKEY)); if (RATES.indexOf(sr) >= 0) rate = sr; } catch (e) { }

  /* ---------- voix ---------- */
  var avoid = {}, preferLocal = false;
  function pickVoice() {
    if (!synth) return null;
    var all = synth.getVoices().filter(function (v) { return /^fr/i.test(v.lang); });
    var ok = all.filter(function (v) { return !avoid[v.voiceURI]; });
    if (!ok.length) ok = all;
    var score = function (v) {
      var s = /Natural|Online|Neural/i.test(v.name) ? 30 : /Google/i.test(v.name) ? 20 : 0;
      if (/fr[-_]FR/i.test(v.lang)) s += 10;
      if (preferLocal && v.localService) s += 100;
      return s;
    };
    return ok.sort(function (a, b) { return score(b) - score(a); })[0] || null;
  }
  if (synth) { synth.getVoices(); try { synth.addEventListener("voiceschanged", function () { }); } catch (e) { } }

  /* ---------- découpage en passages ---------- */
  function ignored(el, root) { var ig = el.closest(IGN); return !!(ig && ig !== root && root.contains(ig)) || (el === root && el.matches(IGN) && !el.matches(".opt, .ord-item, [role=radio]")); }
  function directText(el) { for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && /\S/.test(n.nodeValue)) return true; return false; }
  function blocks(root) {
    var out = [];
    (function walk(el) {
      for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
        if (c.matches(IGN)) continue;
        if (c.matches(PASS) || directText(c)) { if (textOf(c).text) out.push(c); continue; }
        walk(c);
      }
    })(root);
    return out;
  }
  function speakable(s) { SYM.forEach(function (r) { s = s.replace(r[0], r[1]); }); return s.replace(/\s+/g, " "); }
  // Texte prononcé d'un passage + correspondance vers les nœuds texte du DOM
  function textOf(el) {
    var text = "", pieces = [];
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    for (var n = w.nextNode(); n; n = w.nextNode()) {
      var p = n.parentElement;
      if (!p || ignored(p, el) || !/\S/.test(n.nodeValue)) continue;
      var s, bub = p.closest(".bub");
      if (bub && el.contains(bub)) { if (bub.closest(".vf")) continue; s = n.nodeValue.trim() + ". "; }
      else s = speakable(n.nodeValue);
      if (text && !/\s$/.test(text) && !/^\s/.test(s)) text += " ";
      pieces.push({ node: n, start: text.length, len: s.length, raw: n.nodeValue });
      text += s;
    }
    return { text: text.replace(/\s+$/, ""), pieces: pieces };
  }

  /* ---------- état ---------- */
  var cur = null, token = 0, timers = [], hl = null;
  function emit() { try { document.dispatchEvent(new CustomEvent("reader:change")); } catch (e) { } }
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function halt() { if (!synth) return; var paused = synth.paused; try { synth.cancel(); } catch (e) { } if (paused) try { synth.resume(); } catch (e) { } }
  function clearMarks() {
    document.querySelectorAll(".reading").forEach(function (e) { e.classList.remove("reading"); });
    try { if (window.CSS && CSS.highlights) CSS.highlights.delete("reading-word"); } catch (e) { }
    hl = null;
  }

  // Une partie = suite de passages ; elle est coupée en segments aux pauses voulues
  function cfgOf(it) { return it && it.nodeType === 1 ? { el: it, pause: 0, before: null } : { el: it.el, pause: it.pause || 0, before: it.before || null }; }
  function makePart(items, enter) {
    var segs = [], seg = null;
    items.map(cfgOf).forEach(function (c, k) {
      if (!c.el) return;
      if (!seg || c.pause > 0) { seg = { pause: c.pause, before: c.before, G: "", map: [] }; segs.push(seg); }
      var t = textOf(c.el); if (!t.text) return;
      if (seg.G) seg.G += /[.?!:;…]$/.test(seg.G) ? " " : ". ";
      seg.map.push({ el: c.el, start: seg.G.length, end: seg.G.length + t.text.length, pieces: t.pieces });
      seg.G += t.text;
    });
    segs.forEach(function (s, i) { s.part = null; s.i = i; });
    var part = { segs: segs.filter(function (s) { return s.G; }), enter: enter || null, entered: !enter };
    part.segs.forEach(function (s, i) { s.part = part; s.i = i; });
    return part;
  }
  function isGoogle(v) { return !!(v && /Google/i.test(v.name)); }
  function cut(G, from, max) {
    var out = [], pos = from;
    while (pos < G.length) {
      if (G.length - pos <= max) { out.push([pos, G.length]); break; }
      var win = G.slice(pos, pos + max), k = -1, m, re = /[.?!:](\s)/g;
      while ((m = re.exec(win))) if (m.index > max * 0.35) k = m.index + 1;
      if (k < 0) { k = win.lastIndexOf(", "); if (k > max * 0.35) k += 1; else k = -1; }
      if (k < 0) { k = win.lastIndexOf(" "); if (k < 20) k = max; }
      out.push([pos, pos + k]); pos += k;
      while (G[pos] === " ") pos++;
    }
    return out;
  }

  // Met en file tous les énoncés d'un segment, sans cancel() entre eux
  function queueSeg(seg, from) {
    if (!cur) return;
    var tok = token, voice = cur.voice, max = isGoogle(voice) ? 220 : 900;
    var chunks = cut(seg.G, from || 0, max);
    seg.queued = true;
    chunks.forEach(function (ch, k) {
      var u = new SpeechSynthesisUtterance(seg.G.slice(ch[0], ch[1]));
      u.lang = "fr-FR"; if (voice) u.voice = voice; u.rate = rate;
      var meta = { seg: seg, start: ch[0], end: ch[1], last: k === chunks.length - 1, bseen: false, t0: 0 };
      u.onstart = function () { if (tok !== token) return; onStart(meta); };
      u.onboundary = function (e) { if (tok !== token || (e.name && e.name !== "word")) return; meta.bseen = true; setPos(seg, meta.start + e.charIndex); };
      u.onend = function () { if (tok !== token) return; onEnd(meta); };
      u.onerror = function (e) { if (tok !== token || e.error === "interrupted" || e.error === "canceled") return; fallback(); };
      cur.queued++;
      try { synth.speak(u); } catch (e) { fallback(); }
    });
  }
  function onStart(meta) {
    var seg = meta.seg, part = seg.part;
    if (!cur.started) {
      cur.started = true; clearTimeout(cur.watch);
      if (cur.slow) clearTimeout(cur.slow);
    }
    if (!part.entered) { part.entered = true; try { part.enter(); } catch (e) { } }
    meta.t0 = performance.now(); cur.meta = meta;
    setPos(seg, meta.start);
    // Sans onboundary, on estime la position (≈ 14,5 caractères/s à vitesse 1)
    var tok = token;
    (function tick() {
      later(function () {
        if (tok !== token || cur.meta !== meta || meta.bseen) return;
        var p = meta.start + Math.floor((performance.now() - meta.t0) / 1000 * 14.5 * rate);
        setPos(seg, Math.min(p, meta.end - 1)); tick();
      }, 250);
    })();
    if (meta.last && seg.i === part.segs.length - 1 && cur.opts.chain && !cur.next) {
      var nx = null; try { nx = cur.opts.chain(); } catch (e) { }
      if (nx && nx.items && nx.items.length) {
        var np = makePart(nx.items, nx.enter);
        if (np.segs.length) { cur.next = np; if (!np.segs[0].pause) queueSeg(np.segs[0], 0); }
      }
    }
  }
  function onEnd(meta) {
    cur.done++;
    var seg = meta.seg, part = seg.part;
    if (!meta.last) return;
    var nxt = seg.i < part.segs.length - 1 ? part.segs[seg.i + 1] : cur.next ? cur.next.segs[0] : null;
    if (cur.next && seg.i === part.segs.length - 1) cur.next = null;
    if (nxt && !nxt.queued) {
      var tok = token;
      later(function () {
        if (tok !== token) return;
        if (!nxt.part.entered) { nxt.part.entered = true; try { nxt.part.enter(); } catch (e) { } }
        if (nxt.before) try { nxt.before(); } catch (e) { }
        queueSeg(nxt, 0);
      }, nxt.pause || 0);
      return;
    }
    if (!nxt && cur.done >= cur.queued) finish();
  }

  /* ---------- surlignage ---------- */
  function setPos(seg, p) {
    if (!cur) return;
    cur.pos = { seg: seg, p: p };
    var m = null;
    for (var i = 0; i < seg.map.length; i++) if (p < seg.map[i].end || i === seg.map.length - 1) { m = seg.map[i]; break; }
    if (!m) return;
    if (cur.el !== m.el) {
      if (cur.el) cur.el.classList.remove("reading");
      cur.el = m.el; m.el.classList.add("reading");
      var r = m.el.getBoundingClientRect();
      // On fait défiler la page seulement (pas un conteneur interne comme la face d'une carte)
      if (r.top < 70 || r.bottom > window.innerHeight - 90) try { window.scrollBy({ top: r.top - window.innerHeight / 2 + Math.min(r.height, window.innerHeight / 2) / 2, behavior: "smooth" }); } catch (e) { }
    }
    if (!(window.CSS && CSS.highlights && window.Highlight)) return;
    var q = p - m.start, pc = null;
    for (var j = 0; j < m.pieces.length; j++) if (q >= m.pieces[j].start && q < m.pieces[j].start + m.pieces[j].len) { pc = m.pieces[j]; break; }
    if (!pc) return;
    var raw = pc.raw, o = Math.min(raw.length - 1, Math.max(0, Math.round((q - pc.start) / Math.max(1, pc.len) * raw.length)));
    var W = /[0-9A-Za-zÀ-ÖØ-öø-ÿœŒ'’-]/;
    if (!W.test(raw[o])) { var f = o; while (f < raw.length && !W.test(raw[f])) f++; o = f < raw.length ? f : o; }
    var a = o, b = o; while (a > 0 && W.test(raw[a - 1])) a--; while (b < raw.length && W.test(raw[b])) b++;
    if (b <= a) return;
    try { var rg = document.createRange(); rg.setStart(pc.node, a); rg.setEnd(pc.node, b); CSS.highlights.set("reading-word", new Highlight(rg)); hl = rg; } catch (e) { }
  }

  /* ---------- démarrage, relance, secours ---------- */
  function begin(fromSeg, fromChar) {
    token++; halt(); clearTimers();
    var tok = token;
    cur.voice = pickVoice(); cur.started = false; cur.queued = 0; cur.done = 0; cur.next = null;
    // Une voix en ligne qui met plus de 2,5 s à démarrer : on préférera une voix locale ensuite
    cur.slow = setTimeout(function () { if (tok === token && cur && !cur.started && cur.voice && !cur.voice.localService) { avoid[cur.voice.voiceURI] = true; preferLocal = true; } }, 2500);
    // Rien au bout de 6 s : voix locale et reprise au début de la phrase
    cur.watch = setTimeout(function () { if (tok === token && cur && !cur.started) fallback(); }, 6000);
    var part = fromSeg.part;
    part.segs.forEach(function (s) { s.queued = s.i < fromSeg.i; });
    queueSeg(fromSeg, fromChar || 0);
  }
  function sentenceStart(seg, p) {
    var G = seg.G, k = -1, re = /[.?!:]\s/g, m;
    while ((m = re.exec(G)) && m.index < p) k = m.index + 2;
    return k < 0 ? 0 : k;
  }
  function restart() {
    if (!cur) return;
    var pos = cur.pos || { seg: cur.first, p: 0 };
    begin(pos.seg, sentenceStart(pos.seg, pos.p));
  }
  function fallback() {
    if (!cur) return;
    if (cur.voice) avoid[cur.voice.voiceURI] = true;
    preferLocal = true;
    if (cur.tries >= 2) { stop(); return; }
    cur.tries++;
    restart();
  }
  function finish() {
    var o = cur && cur.opts; token++; clearTimers(); clearMarks(); cur = null; emit();
    if (o && o.onEnd) try { o.onEnd(); } catch (e) { }
  }
  function stop() {
    var o = cur && cur.opts; token++; halt(); clearTimers(); clearMarks();
    if (cur) { clearTimeout(cur.watch); clearTimeout(cur.slow); }
    cur = null; emit();
    if (o && o.onStop) try { o.onStop(); } catch (e) { }
  }
  function play(items, opts) {
    opts = opts || {};
    if (!synth) return;
    if (cur) { var prev = cur.opts; token++; halt(); clearTimers(); clearMarks(); cur = null; if (prev && prev.owner !== opts.owner && prev.onStop) try { prev.onStop(); } catch (e) { } }
    var part = makePart(items || [], null);
    if (!part.segs.length) { emit(); return; }
    cur = { owner: opts.owner || "x", opts: opts, tries: 0, first: part.segs[0], el: null };
    emit();
    var s0 = part.segs[0];
    if (s0.pause || s0.before) { if (s0.before) try { s0.before(); } catch (e) { } }
    begin(s0, 0);
  }

  /* ---------- vitesse ---------- */
  function fmtRate(r) { return String(r).replace(".", ",") + "×"; }
  function setRate(r) {
    rate = r; try { localStorage.setItem(RKEY, String(r)); } catch (e) { }
    document.querySelectorAll(".spd-v").forEach(function (e) { e.textContent = fmtRate(r); });
    document.querySelectorAll("[data-spd]").forEach(function (b) { var k = RATES.indexOf(rate); b.disabled = b.dataset.spd === "-" ? k <= 0 : k >= RATES.length - 1; });
    if (cur && cur.started) restart();
  }
  function step(d) { var k = RATES.indexOf(rate); if (k < 0) k = 4; k = Math.max(0, Math.min(RATES.length - 1, k + d)); if (RATES[k] !== rate) setRate(RATES[k]); }
  function speedHTML() {
    var k = RATES.indexOf(rate);
    return '<span class="spd" role="group" aria-label="Vitesse de lecture"><button type="button" data-spd="-" aria-label="Plus lent"' + (k <= 0 ? " disabled" : "") + '>−</button><span class="spd-v" aria-live="polite">' + fmtRate(rate) +
      '</span><button type="button" data-spd="+" aria-label="Plus rapide"' + (k >= RATES.length - 1 ? " disabled" : "") + ">+</button></span>";
  }
  document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-spd]"); if (b && !b.disabled) step(b.dataset.spd === "-" ? -1 : 1); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && cur) stop(); });
  window.addEventListener("pagehide", function () { if (cur) stop(); });

  window.Reader = {
    supported: !!synth,
    blocks: blocks, textOf: textOf, play: play, stop: stop,
    owner: function () { return cur ? cur.owner : null; },
    rate: function () { return rate; }, setRate: setRate, speedHTML: speedHTML,
    _debug: function () { return { cur: !!cur, voice: cur && cur.voice && cur.voice.name, avoid: Object.keys(avoid), preferLocal: preferLocal }; }
  };
})();
