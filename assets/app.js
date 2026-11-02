/* Révisions Management des entreprises — application (vanilla JS, aucune dépendance) */
(function () {
  "use strict";
  var QUESTIONS = window.QUESTIONS || [], FICHES = window.FICHES || [], CASES = window.CASES || [], CHAPTERS = window.CHAPTERS || [];
  var CH = {}; CHAPTERS.forEach(function (c) { CH[c.id] = c; });
  var app = document.getElementById("app");
  var LETTERS = ["A", "B", "C", "D", "E", "F"];

  /* ---------------- utilitaires ---------------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’`]/g, "'").replace(/œ/g, "oe").replace(/\s+/g, " "); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function plural(n, s, p) { return n + " " + (n > 1 ? (p || s + "s") : s); }
  function fmt(n) { return String(Math.round(n * 100) / 100).replace(".", ","); }

  var ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
    quiz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="12" r="2.5" fill="currentColor"/><circle cx="6" cy="18" r="2.5"/><path d="M11 6h9M11 12h9M11 18h9"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/></svg>',
    cases: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v12H4z"/><path d="m10 8 4 2-4 2z" fill="currentColor"/><path d="M8 20h8"/></svg>',
    memo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M9 11h7M9 15h7M9 7h3"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="m17 9 5 6M22 9l-5 6"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
  };

  /* ---------------- stockage local (facultatif) ---------------- */
  var KEY = "revis-manag-v1";
  var S = { q: {}, f: {}, cases: {}, exams: [], cfg: null };
  try { var raw = localStorage.getItem(KEY); if (raw) { var p = JSON.parse(raw); if (p && typeof p === "object") S = Object.assign(S, p); } } catch (e) { }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function rec(q, ok) {
    var r = S.q[q.id] || { ok: 0, ko: 0, st: 0 };
    if (ok) { r.ok++; r.st++; } else { r.ko++; r.st = 0; }
    S.q[q.id] = r; save();
  }
  function mastered(q) { var r = S.q[q.id]; return !!(r && r.st >= 1); }
  function isError(q) { var r = S.q[q.id]; return !!(r && r.ko > 0 && r.st < 2); }
  function errorList() { return QUESTIONS.filter(isError); }

  function toast(msg) {
    var t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200);
  }

  /* ---------------- thème ---------------- */
  var themeBtn = document.getElementById("themeBtn");
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme");
    var dark = t === "dark" || (!t && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
    if (themeBtn) { themeBtn.innerHTML = dark ? ICON.sun : ICON.moon; themeBtn.setAttribute("aria-label", dark ? "Passer en mode clair" : "Passer en mode sombre"); }
  }
  var theme = null; try { theme = localStorage.getItem(KEY + "-theme"); } catch (e) { }
  applyTheme(theme);
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var dark = cur === "dark" || (!cur && matchMedia("(prefers-color-scheme: dark)").matches);
    theme = dark ? "light" : "dark"; applyTheme(theme);
    try { localStorage.setItem(KEY + "-theme", theme); } catch (e) { }
  });

  /* ---------------- navigation ---------------- */
  var NAV = [["accueil", "Accueil", ICON.home], ["quiz", "S'entraîner", ICON.quiz], ["fiches", "Fiches", ICON.cards], ["cas", "Cas pratiques", ICON.cases], ["memo", "Mémo", ICON.memo]];
  var nav = document.getElementById("nav");
  nav.innerHTML = NAV.map(function (n) { return '<a href="#' + n[0] + '" data-v="' + n[0] + '">' + n[2] + "<span>" + n[1] + "</span></a>"; }).join("");

  var cleanup = null;
  function route() {
    if (cleanup) { try { cleanup(); } catch (e) { } cleanup = null; }
    var h = (location.hash || "#accueil").slice(1) || "accueil";
    var base = h.indexOf("cas-") === 0 ? "cas" : h;
    $$("a", nav).forEach(function (a) { if (a.dataset.v === base) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    window.scrollTo(0, 0);
    if (h === "quiz") renderQuiz();
    else if (h === "fiches") renderFiches();
    else if (h === "cas") renderCases();
    else if (h.indexOf("cas-") === 0) renderCase(h.slice(4));
    else if (h === "memo") renderMemo();
    else renderHome();
  }
  window.addEventListener("hashchange", route);
  function go(h) { if (location.hash === "#" + h) route(); else location.hash = h; }

  /* =========================================================
     ACCUEIL
     ========================================================= */
  function renderHome() {
    var last = S.exams.length ? S.exams[S.exams.length - 1] : null;
    var nProf = QUESTIONS.filter(function (q) { return q.src === "prof"; }).length;
    var nErr = errorList().length;
    var nMast = QUESTIONS.filter(mastered).length;
    var nCases = CASES.filter(function (c) { return S.cases[c.id] && S.cases[c.id].best != null; }).length;
    var sample = [[1, 2], [2, 1], [3, 3], [4, 1], [5, 0]];
    var sheet = '<div class="sheet" aria-hidden="true"><h3>' + (last ? "Ton dernier devoir blanc" : "Exemple de copie") + "</h3>" +
      sample.map(function (r) { return '<div class="sheet-row"><span>' + r[0] + "</span>" + [0, 1, 2, 3].map(function (k) { return '<span class="bub' + (k === r[1] ? " f" : "") + '">' + LETTERS[k] + "</span>"; }).join("") + "</div>"; }).join("") +
      '<div class="sheet-score"><span class="muted small">' + (last ? new Date(last.d).toLocaleDateString("fr-FR") : "note sur 20") + "</span><b>" + (last ? fmt(last.s / last.n * 20) : "16") + "<small style='font-size:1rem'>/20</small></b></div></div>";

    app.innerHTML = '<div class="view home">' +
      '<section class="hero"><div><span class="eyebrow">IBAM · Master 1 · Semestre 2</span><h1>Ton devoir de management est un QCM. <em>Entraîne-toi sur les vraies questions.</em></h1>' +
      '<p class="lead"><b>' + QUESTIONS.length + " questions</b> tirées du cours de M. Kiendrebeogo et des QCM fournis, " + FICHES.length + " définitions à mémoriser et " + CASES.length + " cas pratiques expliqués pas à pas.</p>" +
      '<div class="row"><a class="btn btn-gold" href="#quiz" data-start="exam">Faire un devoir blanc</a><a class="btn btn-ghost" href="#fiches">Réviser les définitions</a></div></div>' + sheet + "</section>" +
      '<section class="stack"><h2>Choisis ta façon de réviser</h2><div class="modes">' +
      '<button class="mode feature" data-start="prof"><b>Les QCM du prof</b><span>Les ' + nProf + " questions de la préparation du devoir. À connaître par cœur.</span><span class='count'>" + nProf + " questions</span></button>" +
      '<button class="mode" data-start="exam"><b>Devoir blanc</b><span>20 questions, 20 minutes, correction à la fin, note sur 20.</span><span class="count">Conditions réelles</span></button>' +
      '<button class="mode" data-start="libre"><b>Entraînement libre</b><span>QCM, vrai/faux, réponses à écrire et remises en ordre, par chapitre.</span><span class="count">' + QUESTIONS.length + " questions</span></button>" +
      '<button class="mode" data-start="err"' + (nErr ? "" : " disabled") + '><b>Questions à revoir</b><span>Chaque question ratée s\'ajoute ici toute seule. Elle en sort après 2 bonnes réponses de suite.</span><span class="count">' + (nErr ? plural(nErr, "question") + " à revoir" : "Rien à revoir pour l'instant") + "</span></button>" +
      "</div></section>" +
      '<section class="panel stack"><div class="section-h"><h2>Ta progression</h2><span class="muted small">Enregistrée sur cet appareil</span></div>' +
      '<div class="stats"><div class="stat"><b>' + nMast + "/" + QUESTIONS.length + "</b><span>questions réussies</span></div><div class='stat'><b>" + nErr + "</b><span>questions à revoir</span></div><div class='stat'><b>" + nCases + "/" + CASES.length + "</b><span>cas pratiques faits</span></div></div>" +
      '<div class="progress-list">' + CHAPTERS.map(function (c) {
        var qs = QUESTIONS.filter(function (q) { return q.ch === c.id; }); var m = qs.filter(mastered).length; var p = qs.length ? Math.round(m / qs.length * 100) : 0;
        return '<div class="prog"><span class="num">' + c.n + '</span><div><div class="small"><b>' + esc(c.title) + '</b></div><div class="bar"><i style="width:' + p + '%"></i></div></div><span class="pct">' + p + " %</span></div>";
      }).join("") + "</div></section></div>";
    $$("[data-start]", app).forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); var m = b.dataset.start; S.cfg = Object.assign(defaultCfg(), S.cfg || {}, { mode: m }); save(); if (m !== "libre") { QS = buildSession(S.cfg); } else { QS = null; } go("quiz"); });
    });
  }

  /* =========================================================
     QUIZ
     ========================================================= */
  var QS = null; // session en cours
  function defaultCfg() { return { mode: "libre", ch: CHAPTERS.map(function (c) { return c.id; }), types: ["qcm", "vf", "open", "ordre"], n: 15 }; }
  var TYPE_LABEL = { qcm: "QCM", vf: "Vrai / faux", open: "Réponse à écrire", ordre: "Remettre dans l'ordre" };

  function buildSession(cfg) {
    var list, timed = false, exam = false;
    if (cfg.mode === "prof") list = shuffle(QUESTIONS.filter(function (q) { return q.src === "prof"; }));
    else if (cfg.mode === "err") list = shuffle(errorList());
    else if (cfg.mode === "exam") {
      exam = true; timed = true;
      var pool = QUESTIONS.filter(function (q) { return q.t === "qcm" || q.t === "vf"; });
      var prof = shuffle(pool.filter(function (q) { return q.src === "prof"; })).slice(0, 6);
      var rest = pool.filter(function (q) { return q.src !== "prof"; });
      var picked = [];
      CHAPTERS.forEach(function (c) { picked = picked.concat(shuffle(rest.filter(function (q) { return q.ch === c.id; })).slice(0, c.id === "c4" || c.id === "c5" ? 4 : 2)); });
      list = shuffle(prof.concat(picked)).slice(0, 20);
    } else {
      list = QUESTIONS.filter(function (q) { return cfg.ch.indexOf(q.ch) >= 0 && cfg.types.indexOf(q.t) >= 0; });
      list = shuffle(list).sort(function (a, b) { return (mastered(a) ? 1 : 0) - (mastered(b) ? 1 : 0); });
      if (cfg.n !== "all") list = shuffle(list.slice(0, cfg.n));
    }
    return sessionFrom(list, cfg.mode, exam, timed);
  }
  function makeItem(q) {
    var order = q.o ? (q.keep ? q.o.map(function (_, k) { return k; }) : shuffle(q.o.map(function (_, k) { return k; }))) : null;
    return { q: q, order: order, ordShuffled: q.items ? shuffle(q.items.map(function (_, k) { return k; })) : null, val: null, pick: [], graded: false, correct: null };
  }
  function sessionFrom(list, mode, exam, timed) {
    return { mode: mode, exam: !!exam, timed: !!timed, end: timed ? Date.now() + 20 * 60 * 1000 : 0, i: 0, done: false, items: list.map(makeItem) };
  }

  function renderQuiz() {
    if (QS && !QS.done && QS.items.length) return renderRunner();
    if (QS && QS.done) return renderResults();
    renderSetup();
  }

  function renderSetup() {
    var cfg = Object.assign(defaultCfg(), S.cfg || {});
    var nErr = errorList().length;
    var modes = [["libre", "Entraînement libre", "Tu choisis chapitres et types"], ["prof", "QCM du prof", "Les questions de la préparation"], ["exam", "Devoir blanc", "20 QCM chronométrés"], ["err", "Questions à revoir", nErr ? plural(nErr, "question") + " ratée" + (nErr > 1 ? "s" : "") : "Rien à revoir"]];
    function count() {
      if (cfg.mode === "prof") return QUESTIONS.filter(function (q) { return q.src === "prof"; }).length;
      if (cfg.mode === "err") return nErr;
      if (cfg.mode === "exam") return 20;
      var n = QUESTIONS.filter(function (q) { return cfg.ch.indexOf(q.ch) >= 0 && cfg.types.indexOf(q.t) >= 0; }).length;
      return cfg.n === "all" ? n : Math.min(n, cfg.n);
    }
    function draw() {
      var lib = cfg.mode === "libre";
      app.innerHTML = '<div class="view"><div><h1>S\'entraîner</h1><p class="muted" style="margin-top:8px">Choisis un mode puis lance la série. Les questions déjà réussies passent après les autres.</p></div>' +
        '<div class="panel setup"><fieldset><legend>Mode</legend><div class="mode-pick">' + modes.map(function (m) { return '<button data-mode="' + m[0] + '" aria-pressed="' + (cfg.mode === m[0]) + '"><b>' + m[1] + "</b><span>" + m[2] + "</span></button>"; }).join("") + "</div></fieldset>" +
        (lib ? '<fieldset><legend>Chapitres</legend><div class="row">' + CHAPTERS.map(function (c) { return '<button class="chip" data-ch="' + c.id + '" aria-pressed="' + (cfg.ch.indexOf(c.id) >= 0) + '">' + c.n + ". " + esc(c.short) + "</button>"; }).join("") + "</div></fieldset>" +
          '<fieldset><legend>Types de questions</legend><div class="row">' + Object.keys(TYPE_LABEL).map(function (t) { var n = QUESTIONS.filter(function (q) { return q.t === t; }).length; return '<button class="chip" data-ty="' + t + '" aria-pressed="' + (cfg.types.indexOf(t) >= 0) + '">' + TYPE_LABEL[t] + " (" + n + ")</button>"; }).join("") + "</div></fieldset>" +
          '<fieldset><legend>Nombre de questions</legend><div class="row">' + [10, 15, 30, "all"].map(function (n) { return '<button class="chip" data-n="' + n + '" aria-pressed="' + (cfg.n === n) + '">' + (n === "all" ? "Toutes" : n) + "</button>"; }).join("") + "</div></fieldset>" : "") +
        (cfg.mode === "exam" ? '<p class="note note-info"><b>Comme le jour J :</b> 20 questions (QCM et vrai/faux), 20 minutes, tu peux revenir en arrière, la correction s\'affiche quand tu rends ta copie.</p>' : "") +
        '<div class="row" style="justify-content:space-between"><span class="muted">' + plural(count(), "question") + '</span><button class="btn btn-gold" id="go"' + (count() ? "" : " disabled") + ">Commencer</button></div></div></div>";
      $$("[data-mode]", app).forEach(function (b) { b.onclick = function () { cfg.mode = b.dataset.mode; draw(); }; });
      $$("[data-ch]", app).forEach(function (b) { b.onclick = function () { var id = b.dataset.ch, k = cfg.ch.indexOf(id); if (k >= 0) { if (cfg.ch.length > 1) cfg.ch.splice(k, 1); } else cfg.ch.push(id); draw(); }; });
      $$("[data-ty]", app).forEach(function (b) { b.onclick = function () { var id = b.dataset.ty, k = cfg.types.indexOf(id); if (k >= 0) { if (cfg.types.length > 1) cfg.types.splice(k, 1); } else cfg.types.push(id); draw(); }; });
      $$("[data-n]", app).forEach(function (b) { b.onclick = function () { cfg.n = b.dataset.n === "all" ? "all" : +b.dataset.n; draw(); }; });
      $("#go", app).onclick = function () { S.cfg = cfg; save(); QS = buildSession(cfg); if (!QS.items.length) { toast("Aucune question avec ces filtres"); QS = null; return; } renderRunner(); window.scrollTo(0, 0); };
    }
    draw();
  }

  var timerId = null;
  function renderRunner() {
    var it = QS.items[QS.i], q = it.q, n = QS.items.length;
    var badges = '<span class="pill">' + CH[q.ch].n + ". " + esc(CH[q.ch].short) + "</span>" + '<span class="pill" style="background:var(--surface-2)">' + TYPE_LABEL[q.t] + "</span>" +
      (q.src === "prof" ? '<span class="pill pill-prof">QCM du prof</span>' : "") + (q.src === "25qcm" ? '<span class="pill pill-hors">Série 25 QCM</span>' : "");
    var body = "";
    if (q.t === "qcm") {
      body = '<div class="opts" role="radiogroup">' + it.order.map(function (k, pos) { return '<button class="opt" role="radio" data-k="' + k + '" aria-checked="' + (it.val === k) + '"><span class="bub">' + LETTERS[pos] + "</span><span>" + esc(q.o[k]) + "</span></button>"; }).join("") + "</div>";
    } else if (q.t === "vf") {
      body = '<div class="opts vf" role="radiogroup">' + [[true, "Vrai", "V"], [false, "Faux", "F"]].map(function (o) { return '<button class="opt" role="radio" data-v="' + o[0] + '" aria-checked="' + (it.val === o[0]) + '"><span class="bub">' + o[2] + "</span><span>" + o[1] + "</span></button>"; }).join("") + "</div>";
    } else if (q.t === "open") {
      body = '<label class="ord-label" for="ans">Ta réponse (des mots-clés suffisent)</label><textarea id="ans" class="answer-input" placeholder="Écris ta réponse comme sur ta copie…">' + esc(it.val || "") + "</textarea>";
    } else if (q.t === "ordre") {
      body = ordreHTML(q.items, it.ordShuffled, it.pick, it.graded);
    }
    var head = '<div class="qhead"><button class="back" id="quit">' + ICON.prev + 'Quitter</button><div class="qbar"><i style="width:' + ((QS.i + (it.graded ? 1 : 0)) / n * 100) + '%"></i></div><span class="qcount">' + (QS.i + 1) + " / " + n + "</span>" + (QS.timed ? '<span class="timer" id="timer">20:00</span>' : "") + "</div>";
    var actions;
    if (QS.exam) {
      actions = '<div class="qactions"><button class="btn btn-ghost" id="prev"' + (QS.i ? "" : " disabled") + ">" + ICON.prev + "Précédente</button>" + (QS.i < n - 1 ? '<button class="btn" id="next">Suivante' + ICON.next + "</button>" : '<button class="btn btn-gold" id="submit">Rendre ma copie</button>') + "</div>" +
        '<div class="exam-grid" aria-label="Aller à la question">' + QS.items.map(function (x, k) { return '<button data-go="' + k + '" class="' + (x.val !== null ? "done " : "") + (k === QS.i ? "cur" : "") + '">' + (k + 1) + "</button>"; }).join("") + "</div>";
    } else {
      actions = '<div class="qactions"><span class="kbd-hint">Raccourcis : A–D ou 1–4 pour choisir, Entrée pour valider</span>' + (it.graded ? '<button class="btn" id="next">' + (QS.i < n - 1 ? "Question suivante" : "Voir mon score") + ICON.next + "</button>" : '<button class="btn" id="check">Valider</button>') + "</div>";
    }
    app.innerHTML = '<div class="view">' + head + '<article class="qcard"><div class="qmeta">' + badges + '</div><p class="qtext">' + esc(q.q) + "</p>" +
      (q.t === "qcm" && /SAUF|N'EST PAS|NE fait PAS|N'EST PAS/i.test(q.q) ? '<p class="qhint">Attention : question négative, on cherche l\'intrus.</p>' : "") +
      body + '<div id="fb"></div>' + actions + "</article></div>";
    if (it.graded && !QS.exam) showFeedback(it);
    bindRunner(it);
    if (QS.timed) startTimer();
    var ta = $("#ans", app); if (ta && !it.graded) ta.focus();
  }

  function ordreHTML(items, shuffled, pick, graded) {
    var pool = shuffled.filter(function (k) { return pick.indexOf(k) < 0; });
    return '<div class="ord-label">Touche les éléments dans le bon ordre</div><div class="ord-pick">' +
      (pick.length ? pick.map(function (k, pos) { var cls = graded ? (k === pos ? " ok" : " ko") : ""; return '<button class="ord-item' + cls + '" data-un="' + k + '"' + (graded ? " disabled" : "") + "><i>" + (pos + 1) + "</i><span>" + esc(items[k]) + "</span></button>"; }).join("") : '<div class="ord-empty">Ta réponse s\'affichera ici.</div>') +
      '</div><div class="ord-pool">' + pool.map(function (k) { return '<button class="ord-item" data-pk="' + k + '"' + (graded ? " disabled" : "") + ">" + esc(items[k]) + "</button>"; }).join("") + "</div>";
  }

  function bindRunner(it) {
    var q = it.q;
    $("#quit", app).onclick = function () { stopTimer(); QS = null; renderSetup(); };
    $$(".opt", app).forEach(function (b) {
      b.onclick = function () {
        if (it.graded) return;
        it.val = q.t === "vf" ? b.dataset.v === "true" : +b.dataset.k;
        $$(".opt", app).forEach(function (x) { x.setAttribute("aria-checked", x === b ? "true" : "false"); });
        if (QS.exam) { var g = $$(".exam-grid button", app)[QS.i]; if (g) g.classList.add("done"); }
      };
    });
    $$("[data-pk]", app).forEach(function (b) { b.onclick = function () { it.pick.push(+b.dataset.pk); it.val = it.pick.slice(); rerenderOrdre(it); }; });
    $$("[data-un]", app).forEach(function (b) { b.onclick = function () { var k = +b.dataset.un; it.pick = it.pick.filter(function (x) { return x !== k; }); it.val = it.pick.length ? it.pick.slice() : null; rerenderOrdre(it); }; });
    var ta = $("#ans", app); if (ta) ta.oninput = function () { it.val = ta.value; };
    var chk = $("#check", app); if (chk) chk.onclick = function () { grade(it); };
    var nx = $("#next", app); if (nx) nx.onclick = function () { if (QS.i < QS.items.length - 1) { QS.i++; renderRunner(); window.scrollTo(0, 0); } else finish(); };
    var pv = $("#prev", app); if (pv) pv.onclick = function () { if (QS.i > 0) { QS.i--; renderRunner(); } };
    var sb = $("#submit", app); if (sb) sb.onclick = function () { askSubmit(); };
    $$("[data-go]", app).forEach(function (b) { b.onclick = function () { QS.i = +b.dataset.go; renderRunner(); }; });
  }
  function rerenderOrdre(it) {
    var wrapStart = $(".ord-label", app); if (!wrapStart) return;
    var box = document.createElement("div"); box.innerHTML = ordreHTML(it.q.items, it.ordShuffled, it.pick, it.graded);
    var parent = wrapStart.parentNode;
    [".ord-label", ".ord-pick", ".ord-pool"].forEach(function (s) { var el = $(s, parent); if (el) el.remove(); });
    var fb = $("#fb", parent); while (box.firstChild) parent.insertBefore(box.firstChild, fb);
    bindRunner(it);
  }

  function evalOpen(text, k) {
    var t = norm(text || ""); var hit = [], miss = [];
    k.forEach(function (g) { var ok = g.some(function (w) { return t.indexOf(norm(w)) >= 0; }); (ok ? hit : miss).push(g[0]); });
    return { hit: hit, miss: miss, ratio: k.length ? hit.length / k.length : 0 };
  }
  function isCorrect(it) {
    var q = it.q;
    if (it.val === null || it.val === undefined || it.val === "") return false;
    if (q.t === "qcm") return it.val === q.a;
    if (q.t === "vf") return it.val === q.a;
    if (q.t === "ordre") return it.pick.length === q.items.length && it.pick.every(function (k, i) { return k === i; });
    if (q.t === "open") return evalOpen(it.val, q.k).ratio >= 0.6;
    return false;
  }
  function grade(it) {
    if ((it.val === null || it.val === "" || (it.q.t === "ordre" && it.pick.length < it.q.items.length))) {
      toast(it.q.t === "ordre" ? "Place tous les éléments avant de valider" : it.q.t === "open" ? "Écris quelque chose avant de valider" : "Choisis une réponse");
      return;
    }
    it.graded = true; it.correct = isCorrect(it); rec(it.q, it.correct);
    renderRunner();
  }
  function showFeedback(it) {
    var q = it.q, fb = $("#fb", app); var h = "";
    if (q.t === "qcm") {
      $$(".opt", app).forEach(function (b) { b.disabled = true; var k = +b.dataset.k; if (k === q.a) b.classList.add("ok"); else if (k === it.val) b.classList.add("ko"); });
    } else if (q.t === "vf") {
      $$(".opt", app).forEach(function (b) { b.disabled = true; var v = b.dataset.v === "true"; if (v === q.a) b.classList.add("ok"); else if (v === it.val) b.classList.add("ko"); });
    }
    var cls = it.correct ? "ok" : "ko";
    var verdict = it.correct ? "Bonne réponse" : "Mauvaise réponse";
    if (q.t === "open") {
      var r = evalOpen(it.val, q.k); cls = it.correct ? "ok" : r.ratio > 0.25 ? "mid" : "ko";
      verdict = it.correct ? "Réponse validée" : r.ratio > 0.25 ? "Réponse incomplète" : "Réponse à revoir";
      h += '<div class="kw">Idées clés trouvées : ' + r.hit.length + " sur " + (r.hit.length + r.miss.length) + "</div>";
      h += '<div class="model"><b>Réponse attendue :</b> ' + esc(q.a) + "</div>";
      if (!it.correct) h += '<button class="btn btn-ghost" id="override" style="justify-self:start">Ma réponse disait la même chose</button>';
    }
    if (q.t === "ordre" && !it.correct) h += '<div class="model"><b>Bon ordre :</b><ol style="margin:6px 0 0;padding-left:1.2em">' + q.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol></div>";
    if (q.t === "vf") h += '<div><b>' + (q.a ? "Vrai." : "Faux.") + "</b></div>";
    if (q.ex) h += "<div>" + esc(q.ex) + "</div>";
    if (q.fix) h += '<div class="fix"><b>Correction du document d\'origine :</b> ' + esc(q.fix) + "</div>";
    fb.innerHTML = '<div class="feedback ' + cls + '" role="status"><div class="verdict">' + verdict + "</div>" + h + "</div>";
    var ov = $("#override", fb);
    if (ov) ov.onclick = function () { it.correct = true; var r2 = S.q[q.id]; if (r2) { r2.ko = Math.max(0, r2.ko - 1); r2.ok++; r2.st = 1; save(); } toast("Réponse comptée juste"); renderRunner(); };
  }

  function startTimer() {
    stopTimer();
    var tick = function () {
      var t = $("#timer"); if (!QS || !QS.timed) return stopTimer();
      var left = Math.max(0, QS.end - Date.now()); var m = Math.floor(left / 60000), s = Math.floor(left % 60000 / 1000);
      if (t) { t.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; t.classList.toggle("low", left < 120000); }
      if (left <= 0) { stopTimer(); toast("Temps écoulé : copie ramassée"); finish(); }
    };
    tick(); timerId = setInterval(tick, 1000);
    cleanup = function () { stopTimer(); };
  }
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
  function askSubmit() {
    var blank = QS.items.filter(function (x) { return x.val === null; }).length;
    var fb = $("#fb", app);
    fb.innerHTML = '<div class="feedback mid"><div class="verdict">Rendre ta copie ?</div><div>' + (blank ? plural(blank, "question") + " sans réponse." : "Toutes les questions ont une réponse.") + '</div><div class="row"><button class="btn btn-gold" id="confirmSubmit">Oui, rendre</button><button class="btn btn-ghost" id="cancelSubmit">Continuer</button></div></div>';
    $("#confirmSubmit", fb).onclick = finish;
    $("#cancelSubmit", fb).onclick = function () { fb.innerHTML = ""; };
  }
  function finish() {
    stopTimer();
    if (QS.exam) QS.items.forEach(function (it) { it.graded = true; it.correct = isCorrect(it); rec(it.q, it.correct); });
    QS.done = true;
    var ok = QS.items.filter(function (x) { return x.correct; }).length;
    if (QS.exam) { S.exams.push({ d: Date.now(), s: ok, n: QS.items.length }); save(); }
    renderResults(); window.scrollTo(0, 0);
  }
  function answerText(it) {
    var q = it.q;
    if (it.val === null || it.val === undefined) return "Pas de réponse";
    if (q.t === "qcm") return q.o[it.val];
    if (q.t === "vf") return it.val ? "Vrai" : "Faux";
    if (q.t === "ordre") return it.pick.map(function (k) { return q.items[k]; }).join(" → ");
    return it.val;
  }
  function goodText(q) {
    if (q.t === "qcm") return q.o[q.a];
    if (q.t === "vf") return q.a ? "Vrai" : "Faux";
    if (q.t === "ordre") return q.items.join(" → ");
    return q.a;
  }
  function renderResults() {
    var n = QS.items.length, ok = QS.items.filter(function (x) { return x.correct; }).length, p = Math.round(ok / n * 100);
    var note20 = ok / n * 20;
    var msg = p >= 85 ? "Excellent, tu es prêt·e pour le devoir." : p >= 65 ? "Bon niveau. Revois tes erreurs pour assurer les points." : p >= 45 ? "C'est un début. Relis les fiches des chapitres faibles puis recommence." : "Commence par les fiches et les QCM du prof, puis refais une série.";
    var sorted = QS.items.slice().sort(function (a, b) { return (a.correct ? 1 : 0) - (b.correct ? 1 : 0); });
    var wrong = QS.items.filter(function (x) { return !x.correct; }).length;
    app.innerHTML = '<div class="view"><div class="panel result-top"><div class="score-ring" style="--p:' + p + '"><div><span><b>' + fmt(note20) + "</b><br>sur 20</span></div></div>" +
      '<div class="stack" style="gap:10px"><h1 style="font-size:1.8rem">' + ok + " bonne" + (ok > 1 ? "s" : "") + " réponse" + (ok > 1 ? "s" : "") + " sur " + n + "</h1><p class='muted'>" + msg + "</p>" + (wrong ? '<p class="note note-info"><b>' + plural(wrong, "question ratée", "questions ratées") + "</b> " + (wrong > 1 ? "ont été ajoutées" : "a été ajoutée") + ' à tes <a href="#quiz" id="toErr">questions à revoir</a>.</p>' : "") + '<div class="row">' +
      (wrong ? '<button class="btn btn-gold" id="redo">Refaire mes erreurs</button>' : "") + '<button class="btn btn-ghost" id="again">Nouvelle série</button></div></div></div>' +
      '<section class="stack"><h2>Correction</h2><div class="review">' + sorted.map(function (it) {
        var q = it.q;
        return '<div class="rev ' + (it.correct ? "ok" : "ko") + '"><div class="q">' + esc(q.q) + "</div>" +
          (it.correct ? '<div class="a">✓ ' + esc(goodText(q)) + "</div>" : '<div class="a" style="color:var(--ko)">✗ Ta réponse : ' + esc(answerText(it)) + '</div><div class="a"><b>Bonne réponse :</b> ' + esc(goodText(q)) + "</div>") +
          (q.ex && !it.correct ? '<div class="a muted">' + esc(q.ex) + "</div>" : "") + (q.fix && !it.correct ? '<div class="fix">' + esc(q.fix) + "</div>" : "") + "</div>";
      }).join("") + "</div></section></div>";
    var r = $("#redo", app); if (r) r.onclick = function () { var items = QS.items.filter(function (x) { return !x.correct; }).map(function (x) { return x.q; }); QS = sessionFrom(shuffle(items), "redo", false, false); renderRunner(); window.scrollTo(0, 0); };
    $("#again", app).onclick = function () { QS = null; renderSetup(); };
    var te = $("#toErr", app); if (te) te.onclick = function (e) { e.preventDefault(); S.cfg = Object.assign(defaultCfg(), S.cfg || {}, { mode: "err" }); save(); QS = null; renderSetup(); window.scrollTo(0, 0); };
  }

  // Raccourcis clavier pendant un quiz
  document.addEventListener("keydown", function (e) {
    if (!QS || QS.done || location.hash !== "#quiz") return;
    if (e.target && (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")) { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { var c0 = $("#check", app); if (c0) c0.click(); } return; }
    var it = QS.items[QS.i]; var k = e.key.toLowerCase();
    var map = { a: 0, b: 1, c: 2, d: 3, "1": 0, "2": 1, "3": 2, "4": 3 };
    if (it.q.t === "qcm" && map[k] !== undefined) { var opts = $$(".opt", app); if (opts[map[k]]) opts[map[k]].click(); }
    else if (it.q.t === "vf" && (k === "v" || k === "f")) { var o2 = $$(".opt", app); o2[k === "v" ? 0 : 1].click(); }
    else if (e.key === "Enter") { var c = $("#check", app) || $("#next", app); if (c) { e.preventDefault(); c.click(); } }
  });

  /* =========================================================
     FICHES
     ========================================================= */
  var F = { mode: "cards", ch: "all", i: 0, deck: null, flipped: false, q: "" };
  function buildDeck() {
    F.deck = FICHES.map(function (_, i) { return i; }).filter(function (i) { return F.ch === "all" || FICHES[i].ch === F.ch; });
    F.i = 0; F.flipped = false;
  }
  function renderFiches() {
    if (!F.deck) buildDeck();
    var head = '<div class="view"><div class="section-h"><div><h1>Fiches de définitions</h1><p class="muted" style="margin-top:8px">Des définitions courtes, avec une astuce pour chacune.</p></div>' +
      '<div class="seg" role="group" aria-label="Affichage"><button data-m="cards" aria-pressed="' + (F.mode === "cards") + '">Cartes</button><button data-m="list" aria-pressed="' + (F.mode === "list") + '">Liste</button></div></div>' +
      '<div class="row"><button class="chip" data-c="all" aria-pressed="' + (F.ch === "all") + '">Tout</button>' + CHAPTERS.map(function (c) { return '<button class="chip" data-c="' + c.id + '" aria-pressed="' + (F.ch === c.id) + '">' + c.n + ". " + esc(c.short) + "</button>"; }).join("") + "</div>";
    if (F.mode === "cards") app.innerHTML = head + cardsHTML() + "</div>"; else app.innerHTML = head + listHTML() + "</div>";
    $$("[data-m]", app).forEach(function (b) { b.onclick = function () { F.mode = b.dataset.m; renderFiches(); }; });
    $$("[data-c]", app).forEach(function (b) { b.onclick = function () { F.ch = b.dataset.c; buildDeck(); renderFiches(); }; });
    if (F.mode === "cards") bindCards(); else bindList();
  }
  function cardsHTML() {
    var d = F.deck;
    if (!d.length) return '<div class="empty">Aucune fiche.</div>';
    var f = FICHES[d[F.i]];
    return '<div class="row" style="justify-content:space-between"><span class="qcount">Carte ' + (F.i + 1) + " / " + d.length + '</span></div><div class="qbar"><i style="width:' + ((F.i + 1) / d.length * 100) + '%"></i></div>' +
      '<div class="flash-wrap"><button class="flash' + (F.flipped ? " flipped" : "") + '" id="flash" aria-label="Retourner la carte"><div class="face front"><span class="pill" style="align-self:flex-start">' + CH[f.ch].n + ". " + esc(CH[f.ch].short) + (f.hors ? " · tombé au QCM" : "") + '</span><div class="term">' + esc(f.term) + '</div><div class="tap">Essaie de réciter la définition, puis touche la carte pour vérifier.</div></div>' +
      '<div class="face back"><h3>' + esc(f.term) + '</h3><p class="def">' + esc(f.def) + "</p>" + (f.memo ? '<div class="memo"><b>Astuce :</b> ' + esc(f.memo) + "</div>" : "") + "</div></button></div>" +
      '<div class="flash-ctl"><button class="btn btn-ghost" id="prevCard"' + (F.i ? "" : " disabled") + ">" + ICON.prev + 'Précédente</button><button class="btn" id="nextCard"' + (F.i < d.length - 1 ? "" : " disabled") + ">Suivante" + ICON.next + "</button></div>";
  }
  function sizeFlash() {
    var fl = $("#flash", app); if (!fl) return;
    var h = 0; $$(".face", fl).forEach(function (x) { x.style.position = "relative"; h = Math.max(h, x.scrollHeight); x.style.position = ""; });
    fl.style.minHeight = Math.max(300, h) + "px";
  }
  function bindCards() {
    sizeFlash();
    var fl = $("#flash", app);
    if (fl) fl.onclick = function () { F.flipped = !F.flipped; fl.classList.toggle("flipped", F.flipped); };
    function moveTo(i) { if (i < 0 || i >= F.deck.length) return; F.i = i; F.flipped = false; renderFiches(); }
    var pv = $("#prevCard", app), nx = $("#nextCard", app);
    if (pv) pv.onclick = function () { moveTo(F.i - 1); };
    if (nx) nx.onclick = function () { moveTo(F.i + 1); };
    var onKey = function (e) { if (location.hash !== "#fiches" || F.mode !== "cards") return; if (e.key === " ") { e.preventDefault(); if (fl) fl.click(); } else if (e.key === "ArrowRight") moveTo(F.i + 1); else if (e.key === "ArrowLeft") moveTo(F.i - 1); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", sizeFlash);
    cleanup = function () { document.removeEventListener("keydown", onKey); window.removeEventListener("resize", sizeFlash); };
  }
  function hl(text, q) {
    var t = esc(text); if (!q) return t;
    var nt = norm(t), nq = norm(q); var out = "", i = 0, pos;
    while ((pos = nt.indexOf(nq, i)) >= 0) { out += t.slice(i, pos) + "<mark>" + t.slice(pos, pos + nq.length) + "</mark>"; i = pos + nq.length; }
    return out + t.slice(i);
  }
  function listHTML() {
    var q = F.q;
    var groups = CHAPTERS.filter(function (c) { return F.ch === "all" || F.ch === c.id; }).map(function (c) {
      var items = FICHES.filter(function (f) { return f.ch === c.id && (!q || norm(f.term + " " + f.def + " " + (f.memo || "")).indexOf(norm(q)) >= 0); });
      if (!items.length) return "";
      return '<section class="gloss-ch"><h3><span>' + c.n + "</span>" + esc(c.title) + "</h3><dl>" + items.map(function (f) {
        return '<div class="gloss-item"><dt>' + hl(f.term, q) + (f.hors ? ' <span class="pill pill-hors">tombé au QCM, hors diapos</span>' : "") + "</dt><dd>" + hl(f.def, q) + (f.memo ? '<div class="m">Astuce : ' + esc(f.memo) + "</div>" : "") + "</dd></div>";
      }).join("") + "</dl></section>";
    }).join("");
    return '<input class="search" id="search" type="search" placeholder="Chercher une notion (ex. FCS, SMART, Porter…)" value="' + esc(q) + '" aria-label="Chercher une notion"><div class="glossary" id="gloss">' + (groups || '<div class="empty">Aucune définition ne contient « ' + esc(q) + " ».</div>") + "</div>";
  }
  function bindList() {
    var s = $("#search", app);
    s.oninput = function () { F.q = s.value; var g = document.createElement("div"); g.innerHTML = listHTML(); $("#gloss", app).replaceWith($("#gloss", g)); };
  }

  /* =========================================================
     CAS PRATIQUES
     ========================================================= */
  function renderCases() {
    app.innerHTML = '<div class="view"><div><h1>Cas pratiques</h1><p class="muted" style="margin-top:8px;max-width:62ch">Chaque cas commence par une explication pas à pas (lecture automatique et voix possibles), puis un exercice corrigé comme au devoir.</p></div>' +
      '<div class="cases">' + CASES.map(function (c, i) {
        var st = S.cases[c.id]; var s = st && st.best != null ? '<span class="status done">Exercice : ' + st.best + " %</span>" : st && st.seen ? '<span class="status">Explication vue</span>' : '<span class="status">À découvrir</span>';
        return '<a class="case" href="#cas-' + c.id + '"><span class="pill">' + esc(c.tag) + "</span><b>" + esc(c.title) + "</b><p>" + esc(c.summary) + '</p><div class="row">' + s + '<span class="muted small">' + plural(c.steps.length, "étape") + "</span></div></a>";
      }).join("") + "</div></div>";
  }

  var P = { id: null, i: 0, playing: false, voice: false, timer: null, raf: null, t0: 0, dur: 0, tab: "learn", exo: null };
  var synth = window.speechSynthesis || null, frVoice = null;
  function pickVoice() { if (!synth) return; var v = synth.getVoices(); frVoice = v.filter(function (x) { return /^fr/i.test(x.lang); }).sort(function (a, b) { return (b.lang === "fr-FR") - (a.lang === "fr-FR"); })[0] || null; }
  if (synth) { pickVoice(); try { synth.onvoiceschanged = pickVoice; } catch (e) { } }
  try { P.voice = localStorage.getItem(KEY + "-voice") === "1"; } catch (e) { }

  function stopPlayer() { P.playing = false; if (P.timer) clearTimeout(P.timer); if (P.raf) cancelAnimationFrame(P.raf); P.timer = P.raf = null; if (synth) try { synth.cancel(); } catch (e) { } }

  function renderCase(id) {
    var c = CASES.filter(function (x) { return x.id === id; })[0];
    if (!c) return renderCases();
    if (P.id !== id) { stopPlayer(); P.id = id; P.i = 0; P.tab = "learn"; P.exo = null; }
    S.cases[id] = S.cases[id] || {}; S.cases[id].seen = true; save();
    app.innerHTML = '<div class="view"><a class="back" href="#cas">' + ICON.prev + 'Tous les cas</a><div class="section-h"><div><span class="pill">' + esc(c.tag) + " · Chapitre " + CH[c.ch].n + '</span><h1 style="margin-top:8px">' + esc(c.title) + '</h1></div><div class="seg" role="group" aria-label="Partie"><button data-t="learn" aria-pressed="' + (P.tab === "learn") + '">Comprendre</button><button data-t="exo" aria-pressed="' + (P.tab === "exo") + '">S\'exercer</button></div></div><div id="caseBody"></div></div>';
    $$("[data-t]", app).forEach(function (b) { b.onclick = function () { stopPlayer(); P.tab = b.dataset.t; renderCase(id); }; });
    if (P.tab === "learn") renderPlayer(c); else renderExo(c);
    cleanup = function () { stopPlayer(); };
  }

  function stepText(st) { var d = document.createElement("div"); d.innerHTML = st.html; return st.t + ". " + d.textContent.replace(/\s+/g, " ").trim(); }
  function renderPlayer(c) {
    var body = $("#caseBody", app), st = c.steps[P.i], n = c.steps.length, last = P.i === n - 1;
    body.innerHTML = '<div class="player"><div class="segs">' + c.steps.map(function (_, k) { return '<button data-s="' + k + '" class="' + (k < P.i ? "past" : "") + '" aria-label="Étape ' + (k + 1) + '"><i></i></button>'; }).join("") + "</div>" +
      '<div class="stage" aria-live="polite"><span class="st-n">Étape ' + (P.i + 1) + " sur " + n + "</span><h2>" + esc(st.t) + "</h2>" + st.html +
      (last ? '<div class="rv"><button class="btn btn-gold" id="toExo">Passer à l\'exercice' + ICON.next + "</button></div>" : "") + "</div>" +
      '<div class="ctl"><div class="row"><button class="icon-btn" id="pPrev" aria-label="Étape précédente"' + (P.i ? "" : " disabled") + ">" + ICON.prev + '</button><button class="play" id="pPlay" aria-label="' + (P.playing ? "Mettre en pause" : "Lecture automatique") + '">' + (P.playing ? ICON.pause : ICON.play) + '</button><button class="icon-btn" id="pNext" aria-label="Étape suivante"' + (last ? " disabled" : "") + ">" + ICON.next + "</button></div>" +
      (synth ? '<button class="btn btn-ghost" id="pVoice" aria-pressed="' + P.voice + '">' + (P.voice ? ICON.sound + "Voix activée" : ICON.mute + "Voix coupée") + "</button>" : "") + "</div></div>";
    $$(".stage .rv", body).forEach(function (el, k) { el.style.animationDelay = (k * 0.35) + "s"; });
    $$("[data-s]", body).forEach(function (b) { b.onclick = function () { var keep = P.playing; stopPlayer(); P.i = +b.dataset.s; P.playing = keep; renderPlayer(c); if (keep) runStep(c); }; });
    $("#pPrev", body).onclick = function () { var keep = P.playing; stopPlayer(); P.i = Math.max(0, P.i - 1); P.playing = keep; renderPlayer(c); if (keep) runStep(c); };
    $("#pNext", body).onclick = function () { var keep = P.playing; stopPlayer(); P.i = Math.min(n - 1, P.i + 1); P.playing = keep; renderPlayer(c); if (keep) runStep(c); };
    $("#pPlay", body).onclick = function () { if (P.playing) { stopPlayer(); renderPlayer(c); } else { if (last) P.i = 0; P.playing = true; renderPlayer(c); runStep(c); } };
    var v = $("#pVoice", body); if (v) v.onclick = function () { P.voice = !P.voice; try { localStorage.setItem(KEY + "-voice", P.voice ? "1" : "0"); } catch (e) { } var keep = P.playing; stopPlayer(); P.playing = keep; renderPlayer(c); if (keep) runStep(c); };
    var te = $("#toExo", body); if (te) te.onclick = function () { stopPlayer(); P.tab = "exo"; renderCase(c.id); window.scrollTo(0, 0); };
  }
  function runStep(c) {
    var st = c.steps[P.i], txt = stepText(st), words = txt.split(" ").length;
    P.dur = Math.max(7000, words * 430); P.t0 = performance.now();
    var seg = $$(".segs button", app)[P.i]; var bar = seg && $("i", seg);
    var advance = function () { if (!P.playing) return; if (P.i < c.steps.length - 1) { P.i++; renderPlayer(c); runStep(c); } else { P.playing = false; renderPlayer(c); } };
    var frame = function (t) { if (!P.playing) return; var p = Math.min(0.99, (t - P.t0) / P.dur); if (bar) bar.style.width = (p * 100) + "%"; P.raf = requestAnimationFrame(frame); };
    P.raf = requestAnimationFrame(frame);
    if (P.voice && synth) {
      try {
        synth.cancel(); var u = new SpeechSynthesisUtterance(txt); u.lang = "fr-FR"; if (frVoice) u.voice = frVoice; u.rate = 1;
        u.onend = function () { if (P.playing) P.timer = setTimeout(advance, 700); };
        u.onerror = function () { if (P.playing) P.timer = setTimeout(advance, P.dur); };
        synth.speak(u);
      } catch (e) { P.timer = setTimeout(advance, P.dur); }
    } else P.timer = setTimeout(advance, P.dur);
  }

  /* ---------- exercices ---------- */
  function newExo(c) {
    return {
      graded: false, parts: c.exo.parts.map(function (p) {
        if (p.kind === "choose") return { sel: p.rows.map(function () { return null; }) };
        if (p.kind === "grid") return { sel: p.rows.map(function () { return p.fields.map(function () { return ""; }); }) };
        if (p.kind === "calc") return { val: p.rows.map(function () { return ""; }) };
        if (p.kind === "open") return { val: "" };
        if (p.kind === "order") return { sh: shuffle(p.items.map(function (_, k) { return k; })), pick: [] };
        return {};
      })
    };
  }
  function parseNum(s) { s = String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", ".").replace(/%$/, ""); if (s === "" || s === "-") return NaN; return Number(s); }
  function exoScore(c, E) {
    var tot = 0, ok = 0;
    c.exo.parts.forEach(function (p, pi) {
      var st = E.parts[pi];
      if (p.kind === "choose") p.rows.forEach(function (r, ri) { tot++; if (st.sel[ri] === r[1]) ok++; });
      if (p.kind === "grid") p.rows.forEach(function (r, ri) { r[1].forEach(function (a, fi) { tot++; if (st.sel[ri][fi] !== "" && +st.sel[ri][fi] === a) ok++; }); });
      if (p.kind === "calc") p.rows.forEach(function (r, ri) { tot++; var v = parseNum(st.val[ri]); if (!isNaN(v) && Math.abs(v - r.a) <= (r.tol || 0) + 1e-9) ok++; });
      if (p.kind === "open") { tot++; if (evalOpen(st.val, p.k).ratio >= 0.6) ok++; }
      if (p.kind === "order") { tot++; if (st.pick.length === p.items.length && st.pick.every(function (k, i) { return k === i; })) ok++; }
    });
    return { ok: ok, tot: tot, p: tot ? Math.round(ok / tot * 100) : 0 };
  }
  function renderExo(c) {
    if (!P.exo) P.exo = newExo(c);
    var E = P.exo, g = E.graded, body = $("#caseBody", app);
    var h = '<div class="panel stack">' + c.exo.context + "</div>";
    c.exo.parts.forEach(function (p, pi) {
      var st = E.parts[pi];
      h += '<section class="exo-part"><h3><span>' + (pi + 1) + ".</span>" + esc(p.prompt) + "</h3>";
      if (p.kind === "choose") {
        h += p.rows.map(function (r, ri) {
          var cls = g ? (st.sel[ri] === r[1] ? " ok" : " ko") : "";
          return '<div class="crow' + cls + '"><div class="lbl">' + esc(r[0]) + '</div><div class="copts" role="radiogroup">' + p.options.map(function (o, oi) {
            var extra = g && oi === r[1] && st.sel[ri] !== r[1] ? " right" : "";
            return '<button role="radio" class="' + extra + '" data-p="' + pi + '" data-r="' + ri + '" data-o="' + oi + '" aria-pressed="' + (st.sel[ri] === oi) + '"' + (g ? " disabled" : "") + ">" + esc(o) + "</button>";
          }).join("") + "</div>" + (g && (st.sel[ri] !== r[1] || r[2]) ? '<div class="why">' + (st.sel[ri] !== r[1] ? "<b>Réponse : " + esc(p.options[r[1]]) + ".</b> " : "") + esc(r[2] || "") + "</div>" : "") + "</div>";
        }).join("");
      } else if (p.kind === "grid") {
        h += p.rows.map(function (r, ri) {
          var allOk = g && r[1].every(function (a, fi) { return st.sel[ri][fi] !== "" && +st.sel[ri][fi] === a; });
          return '<div class="crow' + (g ? (allOk ? " ok" : " ko") : "") + '"><div class="lbl">' + esc(r[0]) + '</div><div class="ggrid">' + p.fields.map(function (f, fi) {
            var id = "g" + pi + "-" + ri + "-" + fi;
            return '<div class="gfield"><label for="' + id + '">' + esc(f.name) + '</label><select id="' + id + '" data-p="' + pi + '" data-r="' + ri + '" data-f="' + fi + '"' + (g ? " disabled" : "") + '><option value="">Choisir…</option>' + f.options.map(function (o, oi) { return '<option value="' + oi + '"' + (String(st.sel[ri][fi]) === String(oi) ? " selected" : "") + ">" + esc(o) + "</option>"; }).join("") + "</select>" +
              (g && !(st.sel[ri][fi] !== "" && +st.sel[ri][fi] === r[1][fi]) ? '<span class="small" style="color:var(--ko)">→ ' + esc(f.options[r[1][fi]]) + "</span>" : "") + "</div>";
          }).join("") + "</div>" + (g && r[2] ? '<div class="why">' + esc(r[2]) + "</div>" : "") + "</div>";
        }).join("");
      } else if (p.kind === "calc") {
        h += p.rows.map(function (r, ri) {
          var v = parseNum(st.val[ri]); var good = !isNaN(v) && Math.abs(v - r.a) <= (r.tol || 0) + 1e-9; var id = "c" + pi + "-" + ri;
          return '<div class="crow' + (g ? (good ? " ok" : " ko") : "") + '"><div class="calc-row"><label class="lbl" for="' + id + '">' + esc(r.label) + '</label><input id="' + id + '" inputmode="decimal" autocomplete="off" data-p="' + pi + '" data-r="' + ri + '" value="' + esc(st.val[ri]) + '" placeholder="' + (r.unit ? "en " + r.unit : "ta réponse") + '"' + (g ? " disabled" : "") + "></div>" +
            (g ? '<div class="why"><b>' + (good ? "Juste." : "Réponse : " + fmt(r.a) + (r.unit ? " " + r.unit : "") + ".") + "</b> " + esc(r.sol || "") + "</div>" : "") + "</div>";
        }).join("");
      } else if (p.kind === "open") {
        var id = "o" + pi;
        h += '<textarea id="' + id + '" class="answer-input" data-p="' + pi + '" placeholder="Rédige comme sur ta copie…"' + (g ? " disabled" : "") + ">" + esc(st.val) + "</textarea>";
        if (g) { var r = evalOpen(st.val, p.k); var ok = r.ratio >= 0.6; h += '<div class="feedback ' + (ok ? "ok" : r.ratio > 0.25 ? "mid" : "ko") + '"><div class="verdict">' + (ok ? "Réponse validée" : "À compléter") + '</div><div class="kw">Idées clés trouvées : ' + r.hit.length + " sur " + (r.hit.length + r.miss.length) + '</div><div class="model"><b>Proposition de corrigé :</b> ' + esc(p.a) + "</div></div>"; }
      } else if (p.kind === "order") {
        var pool = st.sh.filter(function (k) { return st.pick.indexOf(k) < 0; });
        h += '<div class="ord-pick">' + (st.pick.length ? st.pick.map(function (k, pos) { return '<button class="ord-item' + (g ? (k === pos ? " ok" : " ko") : "") + '" data-p="' + pi + '" data-un="' + k + '"' + (g ? " disabled" : "") + "><i>" + (pos + 1) + "</i><span>" + esc(p.items[k]) + "</span></button>"; }).join("") : '<div class="ord-empty">Touche les éléments ci-dessous dans l\'ordre.</div>') + "</div>" +
          '<div class="ord-pool">' + pool.map(function (k) { return '<button class="ord-item" data-p="' + pi + '" data-pk="' + k + '"' + (g ? " disabled" : "") + ">" + esc(p.items[k]) + "</button>"; }).join("") + "</div>" +
          (g && !st.pick.every(function (k, i) { return k === i; }) ? '<div class="model feedback ko"><b>Bon ordre :</b><ol style="margin:4px 0 0;padding-left:1.2em">' + p.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol></div>" : "");
      }
      h += "</section>";
    });
    var sc = exoScore(c, E);
    h += g ? '<div class="exo-score" role="status"><span>Ta note : <b>' + sc.ok + " / " + sc.tot + "</b> (" + sc.p + ' %)</span><button class="btn btn-gold" id="exoRedo">Recommencer</button></div>'
      : '<div class="exo-score"><span>Quand tu as fini :</span><button class="btn btn-gold" id="exoGrade">Corriger ma copie</button></div>';
    body.innerHTML = '<div class="stack" style="gap:22px">' + h + "</div>";

    $$(".copts button", body).forEach(function (b) { b.onclick = function () { var st = E.parts[+b.dataset.p]; st.sel[+b.dataset.r] = +b.dataset.o; $$('.copts button[data-p="' + b.dataset.p + '"][data-r="' + b.dataset.r + '"]', body).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); }; });
    $$("select[data-f]", body).forEach(function (s) { s.onchange = function () { E.parts[+s.dataset.p].sel[+s.dataset.r][+s.dataset.f] = s.value; }; });
    $$("input[data-r]", body).forEach(function (i) { i.oninput = function () { E.parts[+i.dataset.p].val[+i.dataset.r] = i.value; }; });
    $$("textarea[data-p]", body).forEach(function (t) { t.oninput = function () { E.parts[+t.dataset.p].val = t.value; }; });
    $$("[data-pk]", body).forEach(function (b) { b.onclick = function () { E.parts[+b.dataset.p].pick.push(+b.dataset.pk); var y = window.scrollY; renderExo(c); window.scrollTo(0, y); }; });
    $$("[data-un]", body).forEach(function (b) { b.onclick = function () { var st = E.parts[+b.dataset.p], k = +b.dataset.un; st.pick = st.pick.filter(function (x) { return x !== k; }); var y = window.scrollY; renderExo(c); window.scrollTo(0, y); }; });
    var gr = $("#exoGrade", body); if (gr) gr.onclick = function () {
      E.graded = true; var s = exoScore(c, E); var cs = S.cases[c.id] || {}; cs.best = Math.max(cs.best || 0, s.p); S.cases[c.id] = cs; save();
      renderExo(c); toast("Note : " + s.ok + " / " + s.tot);
    };
    var rd = $("#exoRedo", body); if (rd) rd.onclick = function () { P.exo = newExo(c); renderExo(c); window.scrollTo(0, 0); };
  }

  /* =========================================================
     MÉMO
     ========================================================= */
  function renderMemo() {
    var mn = [
      ["P-O-D-C", "Les 4 piliers du management", "Planifier, Organiser, Diriger, Contrôler."],
      ["P-E-S-T-E-L", "Macro-environnement", "Politique, Économique, Socioculturel, Technologique, Écologique, Légal."],
      ["S-W / O-T", "SWOT", "Forces et faiblesses = interne ; opportunités et menaces = externe."],
      ["S-M-A-R-T", "Objectif", "Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini."],
      ["P-S-A-E-A", "Maslow, de la base au sommet", "« Petit Singe Aime Escalader l'Arbre » : Physiologique, Sécurité, Appartenance, Estime, Accomplissement."],
      ["P-D-C-A", "Roue de Deming", "Plan, Do, Check, Act : l'amélioration continue."],
      ["F-C-P-A", "Balanced Scorecard", "Financier, Clients, Processus internes, Apprentissage (Kaplan et Norton)."],
      ["R-C-O-V", "Business model (Lecocq)", "Ressources et Compétences, Organisation, proposition de Valeur."],
      ["E-S-T", "Finalités de l'entreprise", "Économiques, Sociales/sociétales, Techniques/technologiques."],
      ["D-M-C", "Principes du management opérationnel", "Diriger, Mobiliser, Contrôler."],
      ["5M", "Ishikawa", "Main-d'œuvre, Matériel, Méthode, Matière, Milieu."],
      ["E-D-I-P-T", "Design thinking", "Empathie, Définition, Idéation, Prototypage, Test."],
      ["4 + 3 + 2", "Processus décisionnel", "9 étapes : analyse (4), décision (3), mise en œuvre (2)."],
      ["P-M-A-A", "Conduite du changement", "Préparer, Mobiliser, Accompagner, Ancrer."],
      ["E-F-C-S-R", "5 forces de Porter", "Nouveaux Entrants, Fournisseurs, Clients, Substituts, Rivalité entre concurrents."]
    ];
    var traps = [
      ["uniquement", "Une réponse qui contient « uniquement », « seulement » ou « à tout prix » est presque toujours fausse en management."],
      ["ignorer", "« Ignorer les parties prenantes / la technologie / les concurrents » : toujours faux."],
      ["opérations", "Si la question parle d'opérations ou de quotidien, élimine les outils stratégiques (SWOT, PESTEL, BCG, planification stratégique). Pense Six Sigma, cartographie des processus, tableau de bord."],
      ["long terme", "Long terme, vision, avenir, environnement externe → management stratégique. Quotidien, ressources, court terme → opérationnel."],
      ["toutes", "« Toutes les réponses ci-dessus » est souvent juste quand les 3 autres propositions sont positives et compatibles."],
      ["SAUF", "Question négative : cherche l'intrus. Récite la liste complète (ex. PESTEL) et trouve ce qui n'y est pas."],
      ["la réponse dans la question", "« Quel bloc décrit les activités clés ? » → Activités clés. Ça arrive : ne cherche pas plus compliqué."]
    ];
    var tools = [["Analyser le macro-environnement", "PESTEL"], ["Forces, faiblesses, opportunités, menaces", "SWOT"], ["Intensité de la concurrence dans un secteur", "5 forces de Porter"], ["Stratégies de croissance produits × marchés", "Matrice d'Ansoff"], ["Équilibre du portefeuille (attractivité × compétitivité)", "Matrice McKinsey"], ["Portefeuille (croissance × part de marché)", "Matrice BCG"], ["Décrire le modèle économique", "Business Model Canvas / RCOV"], ["Dépendance aux parties prenantes", "Radar de dépendances"], ["Suivre les KPI au quotidien", "Tableau de bord"], ["Traduire la stratégie en 4 axes d'indicateurs", "Balanced Scorecard"], ["Trouver les causes d'un problème", "Diagramme d'Ishikawa"], ["Amélioration continue", "Roue de Deming (PDCA)"], ["Améliorer la qualité, réduire les défauts", "Six Sigma"], ["Analyser les processus opérationnels", "Cartographie des processus"], ["Évaluer un investissement (flux futurs)", "VAN"]];
    var fixes = QUESTIONS.filter(function (q) { return q.fix; });
    app.innerHTML = '<div class="view"><div><h1>Mémo du devoir</h1><p class="muted" style="margin-top:8px">Les moyens mnémotechniques, les pièges des QCM et l\'outil à choisir pour chaque question.</p></div>' +
      '<section class="stack"><h2>Moyens mnémotechniques</h2><div class="memo-grid">' + mn.map(function (m) { return '<div class="memo-card"><span class="big">' + esc(m[0]) + "</span><b>" + esc(m[1]) + "</b><p>" + esc(m[2]) + "</p></div>"; }).join("") + "</div></section>" +
      '<section class="panel stack"><h2>Méthode pour le QCM : les mots qui trahissent</h2><div class="traps">' + traps.map(function (t) { return '<div class="trap"><span class="w">' + esc(t[0]) + "</span><p>" + esc(t[1]) + "</p></div>"; }).join("") + "</div></section>" +
      '<section class="stack"><h2>Quel outil pour quelle question ?</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Si on te demande…</th><th>Réponds</th></tr></thead><tbody>' + tools.map(function (t) { return "<tr><td>" + esc(t[0]) + "</td><td><b>" + esc(t[1]) + "</b></td></tr>"; }).join("") + "</tbody></table></div></section>" +
      '<section class="stack"><h2>Stratégique ou opérationnel ?</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th></th><th>Stratégique</th><th>Opérationnel</th></tr></thead><tbody>' +
      [["Démarche", "Quel avenir veut-on ?", "Comment gérer au quotidien ?"], ["Objectif", "Pérennité et développement", "Optimiser l'utilisation des ressources"], ["Vision", "Externe : opportunités et menaces", "Interne : ressources à organiser"], ["Horizon", "Long terme (plus de 3 ans)", "Court et moyen terme"], ["Acteurs", "Direction générale", "Hiérarchie intermédiaire (chefs de service)"], ["Nature des décisions", "Domaines d'activité, marchés, structures", "RH, finances, commercial, production"], ["Caractère", "Non réversibles", "Réversibles si nécessaire"], ["Exemples", "Nouvelle activité, rachat d'un concurrent, changement de structure", "Embauche, fixation des prix, promotion"]].map(function (r) { return "<tr><td><b>" + r[0] + "</b></td><td>" + r[1] + "</td><td>" + r[2] + "</td></tr>"; }).join("") + "</tbody></table></div></section>" +
      '<section class="stack"><h2>Les 4 contextes économiques</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Économie</th><th>Offre / demande</th><th>Qui domine ?</th><th>Raisonnement</th><th>FCS</th></tr></thead><tbody>' +
      [["Production", "O < D", "Le producteur (experts techniques)", "Amont → aval", "Capacité, standardisation, productivité"], ["Distribution", "O = D", "Le distributeur (commerciaux)", "Amont → aval", "Réseau, force de vente, promotion"], ["Marché", "O > D", "Le consommateur", "Aval → amont", "Open innovation, R&D, marketing"], ["Environnement", "O > D + PESTEL", "Toutes les fonctions", "Aval et transversal → amont", "Stratégie, prospective, agilité, communication"]].map(function (r) { return "<tr>" + r.map(function (x, i) { return "<td>" + (i ? x : "<b>" + x + "</b>") + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div></section>" +
      '<section class="panel stack"><h2>Erreurs corrigées dans « 25 QCM corrigés »</h2><p class="muted">Ce document contient des corrigés faux. Si une de ces questions tombe, voici la bonne réponse.</p>' +
      fixes.map(function (q) { return '<div class="rev ok"><div class="q">' + esc(q.q) + '</div><div class="a"><b>Bonne réponse :</b> ' + esc(q.o[q.a]) + '</div><div class="fix">' + esc(q.fix) + "</div></div>"; }).join("") + "</section>" +
      '<section class="panel stack"><h2>Ta progression</h2><p class="muted">Tes résultats sont enregistrés uniquement dans ce navigateur.</p><div id="resetBox"><button class="btn btn-ghost" id="reset">Effacer ma progression</button></div></section></div>';
    $("#reset", app).onclick = function () {
      var box = $("#resetBox", app);
      box.innerHTML = '<div class="feedback ko"><div class="verdict">Tout effacer ?</div><div>Questions réussies, questions à revoir, notes des devoirs blancs et des cas seront supprimées.</div><div class="row"><button class="btn" id="resetYes">Oui, tout effacer</button><button class="btn btn-ghost" id="resetNo">Annuler</button></div></div>';
      $("#resetYes", box).onclick = function () { S = { q: {}, f: {}, cases: {}, exams: [], cfg: null }; save(); F.deck = null; toast("Progression effacée"); renderMemo(); };
      $("#resetNo", box).onclick = function () { renderMemo(); };
    };
  }

  route();

  /* Hors connexion (GitHub Pages) */
  if ("serviceWorker" in navigator && /^https:$/.test(location.protocol) && !/claude|anthropic/.test(location.hostname)) {
    try { navigator.serviceWorker.register("sw.js").catch(function () { }); } catch (e) { }
  }
})();
