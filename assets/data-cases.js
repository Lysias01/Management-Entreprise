/* Cas pratiques : explication pas à pas (mode « vidéo ») + exercice type devoir.
   Les entreprises des exercices sont fictives. */
(function () {
  /* ---------- petits constructeurs de schémas ---------- */
  function li(a) { return "<ul>" + a.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>"; }
  function note(type, title, body) { return "<div class='note note-" + type + " rv'><b>" + title + "</b> " + body + "</div>"; }
  function tbl(head, rows, cls) {
    return "<div class='tbl-wrap rv'><table class='tbl " + (cls || "") + "'><thead><tr>" + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
      "</tr></thead><tbody>" + rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
  }
  function swot(d, on) {
    var cell = function (k, name, sub) {
      var dim = on && on.indexOf(k) < 0 ? " dim" : "";
      return "<div class='sw sw-" + k + dim + "'><div class='sw-h'><span class='sw-l'>" + k.toUpperCase() + "</span>" + name + "<small>" + sub + "</small></div>" + (d && d[k] ? li(d[k]) : "") + "</div>";
    };
    return "<div class='swot rv'><div class='ax ax-top'><span>Favorable</span><span>Défavorable</span></div>" +
      "<div class='sw-grid'><div class='ax-side'>Interne</div>" + cell("s", "Forces", "interne · favorable") + cell("w", "Faiblesses", "interne · défavorable") +
      "<div class='ax-side'>Externe</div>" + cell("o", "Opportunités", "externe · favorable") + cell("t", "Menaces", "externe · défavorable") + "</div></div>";
  }
  function ansoff(on, content) {
    var c = content || {};
    var cell = function (k, name, risk, sub) {
      var cls = on && on.indexOf(k) < 0 ? " dim" : "";
      return "<div class='an an-" + k + cls + "'><b>" + name + "</b><span class='risk'>Risque " + risk + "</span><small>" + sub + "</small>" + (c[k] ? "<em>" + c[k] + "</em>" : "") + "</div>";
    };
    return "<div class='ansoff rv'><div class='an-corner'></div><div class='an-colh'>Produit actuel</div><div class='an-colh'>Produit nouveau</div>" +
      "<div class='an-rowh'>Marché actuel</div>" + cell("p", "Pénétration de marché", "faible", "même produit, mêmes clients") + cell("dp", "Développement de produit", "modéré à élevé", "nouveau produit, mêmes clients") +
      "<div class='an-rowh'>Marché nouveau</div>" + cell("dm", "Développement de marché", "modéré", "même produit, nouveaux clients") + cell("d", "Diversification", "élevé", "tout est nouveau") + "</div>";
  }
  var MCK = [
    ["Conforter son leadership", "Développer, investir sur les FCS", "Investir sélectivement ou abandonner"],
    ["Segmenter, investir sélectivement", "Rentabiliser prudemment", "Se retirer sélectivement"],
    ["Maximiser la profitabilité, générer du cash", "Se désengager progressivement", "Abandonner, désinvestir"]
  ];
  var MCKL = [["dev", "dev", "int"], ["dev", "mai", "rep"], ["mai", "rep", "rep"]];
  function mck(points, hl) {
    var rows = ["Forte", "Moyenne", "Faible"], cols = ["Élevée", "Moyenne", "Faible"];
    var h = "<div class='mck rv'><div class='mck-yl'>Attractivité du marché ↑</div><div class='mck-g'><div></div>" + cols.map(function (c) { return "<div class='mck-ch'>" + c + "</div>"; }).join("");
    for (var r = 0; r < 3; r++) {
      h += "<div class='mck-rh'>" + rows[r] + "</div>";
      for (var c = 0; c < 3; c++) {
        var pts = (points || []).filter(function (p) { return p.r === r && p.c === c; }).map(function (p) { return "<span class='dot'>" + p.n + "</span>"; }).join("");
        var dim = hl && !(hl[0] === r && hl[1] === c) ? " dim" : "";
        h += "<div class='mck-c l-" + MCKL[r][c] + dim + "'><span>" + MCK[r][c] + "</span>" + pts + "</div>";
      }
    }
    return h + "</div><div class='mck-xl'>← Compétitivité de l'entreprise</div><div class='mck-leg'><span class='l-dev'>Développement</span><span class='l-mai'>Maintien</span><span class='l-rep'>Repli</span><span class='l-int'>Interrogation</span></div></div>";
  }
  function bmc(d) {
    var b = function (k, t) { return "<div class='bm bm-" + k + "'><b>" + t + "</b>" + (d[k] ? "<span>" + d[k] + "</span>" : "") + "</div>"; };
    return "<div class='bmc rv'>" + b("pa", "Partenaires clés") + b("ac", "Activités clés") + b("re", "Ressources clés") + b("pv", "Proposition de valeur") +
      b("rc", "Relations clients") + b("ca", "Canaux") + b("se", "Segments de clientèle") + b("co", "Structure des coûts") + b("rv", "Flux de revenus") + "</div>";
  }
  function pyramid(levels, on) {
    return "<div class='pyr rv'>" + levels.slice().reverse().map(function (l, i) {
      var idx = levels.length - 1 - i; var dim = on !== undefined && on !== idx ? " dim" : "";
      return "<div class='py' style='--w:" + (40 + i * 12) + "%'><span class='" + dim + "'>" + l + "</span></div>";
    }).join("") + "</div>";
  }
  function pdca(on) {
    var s = [["P", "Plan", "Planifier : objectifs, causes, plan d'action"], ["D", "Do", "Réaliser : mettre en œuvre"], ["C", "Check", "Vérifier : mesurer les résultats"], ["A", "Act", "Agir : corriger, standardiser"]];
    return "<div class='pdca rv'>" + s.map(function (x, i) { return "<div class='pd pd-" + i + (on !== undefined && on !== i ? " dim" : "") + "'><b>" + x[0] + "</b><span>" + x[1] + "</span><small>" + x[2] + "</small></div>"; }).join("") + "<div class='pd-c'>Amélioration<br>continue</div></div>";
  }
  function fish(effect, cats) {
    var keys = Object.keys(cats);
    var half = Math.ceil(keys.length / 2);
    var col = function (ks) { return "<div class='fi-row'>" + ks.map(function (k) { return "<div class='fi-cat'><b>" + k + "</b>" + li(cats[k]) + "</div>"; }).join("") + "</div>"; };
    return "<div class='fish rv'>" + col(keys.slice(0, half)) + "<div class='fi-spine'><span>Causes</span><i></i><div class='fi-head'>" + effect + "</div></div>" + col(keys.slice(half)) + "</div>";
  }
  function formula(t) { return "<div class='formula rv'>" + t + "</div>"; }
  function steps(a) { return "<ol class='mini rv'>" + a.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol>"; }

  window.CASES = [
    /* ====================================================== 1. SWOT */
    {
      id: "swot", ch: "c4", title: "Analyse SWOT", tag: "Diagnostic",
      summary: "Classer des faits en forces, faiblesses, opportunités et menaces sans se tromper.",
      steps: [
        { t: "Deux questions suffisent", html: "<p class='rv'>Pour chaque information, pose-toi deux questions :</p>" + steps(["<b>Interne ou externe ?</b> L'entreprise la contrôle-t-elle (interne) ou la subit-elle (externe) ?", "<b>Favorable ou défavorable ?</b> Est-ce que ça l'aide ou est-ce que ça la gêne ?"]) + swot(null) },
        { t: "Le piège classique", html: "<p class='rv'>« La hausse du prix du lait en poudre importé » touche directement la laiterie. Pourtant, ce n'est <b>pas une faiblesse</b> : l'entreprise ne contrôle pas les prix mondiaux.</p>" + note("piege", "Piège :", "un fait externe reste externe même s'il fait mal. C'est une MENACE.") + note("astuce", "Astuce :", "« notre / nos » (notre usine, nos vendeurs) → souvent interne. « le marché, l'État, les concurrents, le climat » → externe.") },
        { t: "Exemple : laiterie Faso Lait (Bobo-Dioulasso)", html: "<p class='rv'>Voici 8 faits. Lis-les, puis regarde le classement à l'étape suivante.</p>" + li(["Une marque connue dans tout l'Ouest du pays", "Des camions de collecte vieux et souvent en panne", "La demande de yaourts augmente en ville", "Un seul fournisseur d'emballages (monosourcing)", "Des éleveurs partenaires formés à l'hygiène", "Un concurrent ivoirien arrive avec des prix bas", "Un programme public soutient la filière lait local", "Les coupures d'électricité perturbent la chaîne du froid"]) },
        { t: "Le classement expliqué", html: swot({ s: ["Marque connue", "Éleveurs formés"], w: ["Camions vieux", "Un seul fournisseur d'emballages"], o: ["Demande de yaourts en hausse", "Programme public de soutien"], t: ["Concurrent ivoirien à bas prix", "Coupures d'électricité"] }) + note("info", "Pourquoi le monosourcing est une faiblesse ?", "C'est un choix d'organisation de l'entreprise (interne) qui la rend dépendante (défavorable).") },
        { t: "Ce que le correcteur attend", html: steps(["Un tableau à 4 cases clairement titré.", "Au moins 2 éléments par case, formulés en phrases courtes.", "Aucun élément externe dans Forces/Faiblesses, aucun élément interne dans Opportunités/Menaces.", "Pour aller plus loin : utiliser les forces pour saisir les opportunités, corriger les faiblesses, se protéger des menaces."]) + note("retenir", "À retenir :", "S-W = dedans (je contrôle) ; O-T = dehors (je subis).") }
      ],
      exo: {
        context: "<p><b>Wend-Panga Cosmétiques</b> fabrique des crèmes au beurre de karité à Ouagadougou. Classe chaque fait dans la bonne case de la SWOT.</p>",
        parts: [
          { kind: "choose", prompt: "Classe les 12 faits.", options: ["Force", "Faiblesse", "Opportunité", "Menace"], rows: [
            ["Un savoir-faire artisanal reconnu et un label bio", 0, "Interne et favorable."],
            ["Un site internet ancien qui ne permet pas de commander", 1, "Système interne dépassé."],
            ["La mode du « naturel » se développe chez les jeunes urbains", 2, "Tendance socioculturelle externe favorable."],
            ["Une forte rotation des employés de l'atelier", 1, "Turnover = faiblesse interne."],
            ["Les grandes marques internationales lancent des gammes au karité", 3, "Concurrence externe."],
            ["Une faible capacité financière pour investir", 1, ""],
            ["Un accord commercial facilite l'export vers la sous-région", 2, "Réglementation favorable."],
            ["La hausse du prix des noix de karité", 3, "Hausse du coût des matières : externe."],
            ["Des coopératives de femmes fidèles comme fournisseurs", 0, "Relation interne maîtrisée, favorable."],
            ["Un nouveau canal : la vente via les réseaux sociaux", 2, "Nouveau canal de distribution disponible sur le marché."],
            ["Une nouvelle taxe sur les produits cosmétiques", 3, "Réglementation défavorable."],
            ["Une forte notoriété auprès des touristes", 0, ""]
          ] },
          { kind: "open", prompt: "Explique en une phrase pourquoi « la hausse du prix des noix de karité » est une menace et non une faiblesse.", a: "Parce que c'est un facteur externe que l'entreprise ne contrôle pas (le prix du marché) ; il est défavorable, donc c'est une menace. Une faiblesse est interne.", k: [["externe", "ne controle pas", "marche"], ["defavorable", "menace"], ["faiblesse", "interne"]] }
        ]
      }
    },

    /* ====================================================== 2. PESTEL */
    {
      id: "pestel", ch: "c4", title: "Analyse PESTEL", tag: "Diagnostic",
      summary: "Ranger chaque facteur du macro-environnement dans la bonne lettre.",
      steps: [
        { t: "À quoi sert PESTEL ?", html: "<p class='rv'>PESTEL analyse le <b>macro-environnement</b> : les grandes forces externes qui influencent indirectement l'entreprise et peuvent créer des <b>risques de rupture</b>.</p>" + tbl(["Lettre", "Facteur", "Exemples"], [["P", "Politique", "Stabilité du gouvernement, politique fiscale, sécurité, relations entre États"], ["E", "Économique", "Inflation, croissance, taux d'intérêt, prix des matières, pouvoir d'achat"], ["S", "Socioculturel", "Démographie, culture, modes de vie, éducation, religion"], ["T", "Technologique", "Innovations, internet, paiement mobile, R&D"], ["E", "Écologique", "Climat, sécheresse, déchets, pollution"], ["L", "Légal", "Lois, normes, réglementation du travail, code des impôts"]]) },
        { t: "Les confusions à éviter", html: note("piege", "Politique ou Légal ?", "Une DÉCISION ou une SITUATION politique (stabilité, élection, politique de subvention) → P. Une LOI ou une NORME votée et applicable → L.") + note("piege", "Économique ou interne ?", "Le coût de production de l'entreprise est interne. L'inflation du pays est économique (externe).") + note("piege", "Socioculturel ?", "Tout ce qui touche à la population : âge, croissance démographique, habitudes, culture.") },
        { t: "Exemple : compagnie de transport interurbain", html: tbl(["Fait", "Lettre", "Pourquoi"], [["Hausse du prix du carburant", "E", "Prix des intrants = économie"], ["Nouvelle loi sur la charge maximale des cars", "L", "C'est une loi"], ["Insécurité sur certains axes routiers", "P", "Situation politique et sécuritaire"], ["Population jeune et très mobile", "S", "Démographie"], ["Billets vendus par paiement mobile", "T", "Technologie"], ["Routes dégradées par les pluies", "E", "Climat (écologique)"]]) },
        { t: "Méthode pour le devoir", html: steps(["Écris les 6 lettres en colonne.", "Pour chaque facteur, demande-toi « de quel domaine parle-t-on ? ».", "Ajoute si possible s'il s'agit d'une opportunité ou d'une menace pour l'entreprise.", "Conclus : quels facteurs sont les plus importants pour l'entreprise ?"]) + note("retenir", "À retenir :", "PESTEL = macro-environnement (externe). Ne jamais y mettre une force ou une faiblesse interne.") }
      ],
      exo: {
        context: "<p><b>Sahel Céréales</b> transforme le maïs et le mil en farine. Range chaque facteur dans la bonne lettre.</p>",
        parts: [
          { kind: "choose", prompt: "Classe les 12 facteurs.", options: ["Politique", "Économique", "Socioculturel", "Technologique", "Écologique", "Légal"], rows: [
            ["Les sécheresses répétées réduisent les récoltes", 4, ""],
            ["Le gouvernement subventionne la consommation de céréales locales", 0, "Politique de soutien (décision politique)."],
            ["L'inflation réduit le pouvoir d'achat des ménages", 1, ""],
            ["Une nouvelle norme impose l'étiquetage nutritionnel", 5, "Norme obligatoire = légal."],
            ["L'urbanisation fait évoluer les habitudes alimentaires", 2, ""],
            ["Des moulins solaires plus efficaces arrivent sur le marché", 3, ""],
            ["La stabilité gouvernementale rassure les investisseurs", 0, ""],
            ["La hausse des taux d'intérêt des banques", 1, ""],
            ["La population double tous les 20 ans environ", 2, "Démographie."],
            ["L'interdiction des sachets plastiques non biodégradables", 5, "C'est une interdiction légale (même si le sujet est écologique)."],
            ["La vente en ligne via les applications de livraison", 3, ""],
            ["La dégradation des sols agricoles", 4, ""]
          ] },
          { kind: "open", prompt: "Pourquoi l'analyse PESTEL ne doit-elle contenir aucun élément interne à l'entreprise ?", a: "Parce que PESTEL analyse le macro-environnement, c'est-à-dire les facteurs externes qui influencent indirectement l'entreprise. Les éléments internes (forces, faiblesses) relèvent du diagnostic interne / SWOT.", k: [["macro", "externe"], ["indirect", "influen"], ["interne", "swot", "force", "faiblesse"]] }
        ]
      }
    },

    /* ====================================================== 3. ANSOFF */
    {
      id: "ansoff", ch: "c4", title: "Matrice d'Ansoff", tag: "Scénarios",
      summary: "Identifier la stratégie de croissance et son niveau de risque, puis comparer des scénarios.",
      steps: [
        { t: "Deux axes, quatre stratégies", html: "<p class='rv'>On croise les <b>produits</b> (actuels ou nouveaux) et les <b>marchés</b> (actuels ou nouveaux).</p>" + ansoff() },
        { t: "L'exemple du cours", html: "<p class='rv'>Une entreprise de <b>développement informatique</b> travaille aujourd'hui pour l'<b>Administration</b>. Elle étudie 4 projets :</p>" + ansoff(null, { p: "① Plus de développements pour l'Administration", dp: "② Vendre des drones à l'Administration", dm: "③ Développements pour des entreprises privées", d: "④ Une appli mobile grand public" }) },
        { t: "Comment raisonner, case par case", html: steps(["Le produit est-il <b>déjà vendu</b> par l'entreprise ? Oui → colonne « actuel ».", "Le client est-il <b>déjà client</b> ? Oui → ligne « actuel ».", "Croise les deux réponses : tu obtiens la stratégie.", "Ajoute le niveau de risque : plus on s'éloigne de « actuel × actuel », plus c'est risqué."]) + note("exemple", "Projet ② :", "les drones sont un produit nouveau ; l'Administration est un client actuel → développement de produit.") },
        { t: "Actions typiques", html: tbl(["Stratégie", "Objectif", "Actions"], [["Pénétration", "Gagner des parts de marché", "Promotions, baisse de prix, distribution, fidélisation"], ["Dév. de marché", "Nouvelles cibles ou zones", "Export, e-commerce, nouveau message marketing"], ["Dév. de produit", "Nouveaux besoins des clients actuels", "Extension de gamme, innovation, services"], ["Diversification", "Sortir du cœur de métier", "Liée (synergies) ou conglomérale (sans rapport)"]]) },
        { t: "Comparer les scénarios", html: "<p class='rv'>On note chaque scénario sur 7 critères, chacun avec un <b>coefficient de pondération</b> :</p>" + li(["Cohérence avec le cadre de référence", "Attractivité (évolution des marchés)", "Accessibilité aux FCS des DAS à créer", "Impact économique et financier", "Acceptabilité par les acteurs clés", "Réversibilité (mesure du risque)", "Impacts prévisibles (social, commercial, sociétal)"]) + formula("Score = Σ (note × coefficient) ÷ Σ coefficients") + note("retenir", "À retenir :", "le scénario retenu est celui qui a le meilleur score pondéré.") }
      ],
      exo: {
        context: "<p><b>Bissap Délices</b> vend du jus de bissap en bouteille dans les supermarchés de Ouagadougou.</p>",
        parts: [
          { kind: "choose", prompt: "Pour chaque projet, choisis la stratégie d'Ansoff.", options: ["Pénétration de marché", "Développement de marché", "Développement de produit", "Diversification"], rows: [
            ["Offrir une bouteille gratuite pour 5 achetées dans les mêmes supermarchés", 0, "Même produit, mêmes clients."],
            ["Vendre le même jus à Bobo-Dioulasso et à Niamey", 1, "Nouvelle zone géographique."],
            ["Lancer un jus de gingembre dans les mêmes supermarchés", 2, "Nouveau produit, clients actuels."],
            ["Ouvrir une école de formation en informatique", 3, "Sans rapport : diversification conglomérale."],
            ["Proposer le jus de bissap aux compagnies aériennes", 1, "Nouveau segment de clientèle."],
            ["Baisser le prix de 10 % pour attirer les clients des concurrents", 0, ""],
            ["Produire des emballages en verre pour d'autres entreprises", 3, "Nouveau produit, nouveau marché (diversification liée, car proche du métier)."],
            ["Ajouter un format 25 cl pour les clients actuels", 2, "Extension de gamme."]
          ] },
          { kind: "calc", prompt: "Le scénario « export vers Niamey » reçoit les notes suivantes (sur 10) : cohérence 8 (coef. 3), attractivité 6 (coef. 2), réversibilité 4 (coef. 1). Calcule le score pondéré.", rows: [
            { label: "Σ (note × coefficient)", a: 40, tol: 0, sol: "8×3 + 6×2 + 4×1 = 24 + 12 + 4 = 40" },
            { label: "Σ coefficients", a: 6, tol: 0, sol: "3 + 2 + 1 = 6" },
            { label: "Score pondéré (sur 10, 2 décimales)", a: 6.67, tol: 0.01, sol: "40 ÷ 6 = 6,67" }
          ] }
        ]
      }
    },

    /* ====================================================== 4. DAS */
    {
      id: "das", ch: "c4", title: "Segmentation stratégique (DAS)", tag: "Diagnostic",
      summary: "Découper l'entreprise en domaines d'activité stratégique et distinguer FCS et avantage concurrentiel.",
      steps: [
        { t: "Qu'est-ce qu'un DAS ?", html: "<p class='rv'>Un <b>Domaine d'Activité Stratégique</b> est un couple <b>offre / clients</b> qui a :</p>" + li(["son propre univers concurrentiel ;", "ses propres facteurs clés de succès (FCS) ;", "des compétences spécifiques ;", "des flux économiques distincts (produits et charges) ;", "une possibilité de fonctionner de manière autonome."]) + note("retenir", "Règle d'or :", "un DAS est toujours un centre de PROFIT, jamais un centre de coût. Ne pas confondre DAS et BU.") },
        { t: "L'exemple de la banque", html: "<p class='rv'>On croise les activités (offre) et les marchés (clients). Chaque croix est un DAS potentiel.</p>" + tbl(["", "Particuliers", "Entreprises", "Exploitants agricoles"], [["Épargne", "✔ DAS", "", "✔ DAS"], ["Crédit", "✔ DAS", "✔ DAS", ""], ["Assurance de biens", "", "✔ DAS", ""]]) + note("info", "Pourquoi « Crédit / entreprises » et « Crédit / particuliers » sont deux DAS ?", "Les concurrents, les FCS (analyse du risque, montants) et les compétences ne sont pas les mêmes.") },
        { t: "Le tri-axe d'Abell", html: "<p class='rv'>Autre méthode : définir le DAS selon 3 axes.</p>" + tbl(["Axe", "Question", "Prêt-à-porter"], [["Clients", "Qui ?", "Homme, femme, enfant"], ["Offre / besoins", "Quoi ?", "Travail, loisirs, sport, intérieur"], ["Technologie", "Comment ?", "Coton, maille, soie, synthétique"]]) + note("exemple", "DAS :", "« habits de sport / femme / coton » et « habits de sport / femme / synthétique » sont deux DAS différents.") },
        { t: "FCS ou avantage concurrentiel ?", html: note("piege", "FCS :", "ce que TOUT concurrent doit maîtriser pour survivre sur ce marché (ex. pour une boulangerie : la fraîcheur du pain).") + note("piege", "Avantage concurrentiel :", "ce que MON entreprise fait mieux que les autres (ex. ma recette secrète).") + "<p class='rv'>On trouve les FCS en écoutant le marché (attentes des clients, critères de choix, bonnes pratiques du leader) et en analysant la chaîne de valeur.</p>" },
        { t: "BO ou SFD ?", html: tbl(["", "Banalisation de l'offre (BO)", "Savoir-faire différenciateur (SFD)"], [["Attente client", "Prix bas", "Fonctionnalité spécifique"], ["Offre", "Standard", "Distinctive"], ["Enjeu", "Croissance rapide, maîtrise des coûts", "Image, innovation"], ["FCS", "Volume, standardisation, productivité", "Open innovation, différenciation, marketing"]]) + note("retenir", "Et la segmentation marketing ?", "Elle vient APRÈS : à l'intérieur d'un DAS, on découpe la clientèle en segments pour ajuster l'offre.") }
      ],
      exo: {
        context: "<p>Teste ta compréhension de la segmentation stratégique.</p>",
        parts: [
          { kind: "choose", prompt: "Ce DAS relève-t-il de la banalisation de l'offre (BO) ou du savoir-faire différenciateur (SFD) ?", options: ["BO", "SFD"], rows: [
            ["Farine de blé en sacs de 50 kg vendue aux boulangeries", 0, "Produit standard, enjeu prix et volume."],
            ["Cosmétiques bio haut de gamme au karité", 1, ""],
            ["Ciment vendu aux entreprises du BTP", 0, ""],
            ["Logiciel de gestion sur mesure pour cliniques", 1, ""],
            ["Eau en sachet vendue dans la rue", 0, ""],
            ["Tissu Faso Dan Fani de créateur", 1, "Image et différenciation."]
          ] },
          { kind: "choose", prompt: "FCS ou avantage concurrentiel de l'entreprise ?", options: ["FCS (obligatoire pour tous)", "Avantage concurrentiel (propre à l'entreprise)"], rows: [
            ["Pour un transporteur : la sécurité des passagers", 0, ""],
            ["Notre compagnie possède les seuls cars climatisés de la ligne", 1, ""],
            ["Pour un restaurant : l'hygiène", 0, ""],
            ["Notre chef a gagné un concours national de cuisine", 1, ""]
          ] },
          { kind: "choose", prompt: "Segmentation stratégique ou segmentation marketing ?", options: ["Stratégique", "Marketing"], rows: [
            ["Séparer l'activité « épargne » de l'activité « crédit » pour allouer les ressources", 0, ""],
            ["Diviser les clients du crédit auto en jeunes actifs et en retraités", 1, ""],
            ["Décider d'investir davantage dans le DAS le plus attractif", 0, ""],
            ["Adapter la publicité aux étudiants", 1, ""]
          ] },
          { kind: "open", prompt: "Pourquoi un DAS ne peut-il jamais être un centre de coût ?", a: "Parce qu'un DAS a ses propres flux économiques (produits et charges) : il génère des revenus et peut fonctionner de manière autonome, donc c'est un centre de profit.", k: [["flux", "revenu", "produit", "chiffre"], ["charge", "cout"], ["autonom", "profit"]] }
        ]
      }
    },

    /* ====================================================== 5. Compétitivité pondérée */
    {
      id: "competitivite", ch: "c4", title: "Compétitivité par les FCS", tag: "Calcul",
      summary: "Noter la maîtrise des FCS de −5 à +5, pondérer et conclure.",
      steps: [
        { t: "Le principe", html: "<p class='rv'>On compare l'entreprise à son <b>principal concurrent</b> sur chaque FCS du DAS.</p>" + tbl(["Note", "Signification"], [["−5", "Bien moins bonne"], ["−2 à −1", "Moins bonne"], ["0", "Équivalente"], ["+1 à +2", "Meilleure"], ["+5", "Bien meilleure"]]) + note("retenir", "Pondération :", "chaque FCS reçoit un coefficient par ordre d'importance décroissant (ex. 4, 3, 2, 1).") },
        { t: "Exemple du cours (notes illustratives)", html: tbl(["FCS", "Pondération", "Note", "Note × poids"], [["Maîtrise des coûts", "4", "+3", "12"], ["Logistique", "3", "+1", "3"], ["Réseau de distribution", "2", "−2", "−4"], ["Achats", "1", "+2", "2"], ["<b>Total</b>", "<b>10</b>", "", "<b>13</b>"]]) },
        { t: "Le calcul pas à pas", html: steps(["Multiplie chaque note par sa pondération.", "Additionne les résultats : 12 + 3 − 4 + 2 = <b>13</b>.", "Divise par la somme des pondérations : 13 ÷ 10 = <b>+1,3</b>.", "Interprète : résultat positif → l'entreprise est un peu meilleure que son concurrent."]) + formula("Score = Σ (note × pondération) ÷ Σ pondérations") },
        { t: "Interpréter et placer", html: note("info", "Lecture :", "entre −5 et +5. Positif = plus compétitif que le concurrent ; négatif = moins compétitif.") + note("astuce", "Pour placer le DAS dans la matrice McKinsey (convention d'entraînement) :", "ajoute 5 pour passer sur une échelle de 0 à 10 → 1,3 + 5 = 6,3 → compétitivité moyenne.") + note("piege", "Erreur fréquente :", "oublier de diviser par la somme des pondérations, ou oublier le signe moins.") }
      ],
      exo: {
        context: "<p>Une PME de distribution se compare au <b>concurrent A</b>. Pondérations : distribution logistique 4, webmarketing 3, maîtrise des coûts 2, capacité de production 1. Notes : +4, −4, −1, 0.</p>",
        parts: [
          { kind: "calc", prompt: "Calcule.", rows: [
            { label: "Distribution logistique : note × poids", a: 16, tol: 0, sol: "4 × 4 = 16" },
            { label: "Webmarketing : note × poids", a: -12, tol: 0, sol: "−4 × 3 = −12" },
            { label: "Maîtrise des coûts : note × poids", a: -2, tol: 0, sol: "−1 × 2 = −2" },
            { label: "Total Σ (note × poids)", a: 2, tol: 0, sol: "16 − 12 − 2 + 0 = 2" },
            { label: "Score pondéré (1 décimale)", a: 0.2, tol: 0.05, sol: "2 ÷ 10 = 0,2" }
          ] },
          { kind: "choose", prompt: "Conclusion", options: ["Bien meilleure que A", "Légèrement meilleure que A", "Moins bonne que A"], rows: [["Position de la PME face au concurrent A", 1, "0,2 est positif mais proche de 0 : légèrement meilleure, avec une vraie faiblesse en webmarketing."]] },
          { kind: "open", prompt: "Quel FCS la PME doit-elle améliorer en priorité ? Justifie.", a: "Le webmarketing : c'est la note la plus faible (−4) sur un FCS important (pondération 3), il fait perdre 12 points.", k: [["webmarketing", "web"], ["-4", "faible", "negati"], ["3", "pondera", "important", "12"]] }
        ]
      }
    },

    /* ====================================================== 6. McKinsey */
    {
      id: "mckinsey", ch: "c4", title: "Matrice McKinsey", tag: "Portefeuille",
      summary: "Placer des DAS selon attractivité et compétitivité, puis recommander une stratégie.",
      steps: [
        { t: "La matrice en 9 cases", html: "<p class='rv'>Lignes : <b>attractivité du marché</b>. Colonnes : <b>compétitivité de l'entreprise</b> (élevée à gauche).</p>" + mck([]) },
        { t: "Repérer les zones (notes sur 10)", html: tbl(["Note", "Zone"], [["0 à 3,3", "Faible"], ["3,4 à 6,6", "Moyenne"], ["6,7 à 10", "Forte / élevée"]]) + note("info", "Dans le cours :", "DAS 1 (attractivité 7, compétitivité 1) ; DAS 2 (6 ; 7) ; DAS 3 (2 ; 8).") },
        { t: "DAS 1 : attractivité 7, compétitivité 1", html: mck([{ n: 1, r: 0, c: 2 }], [0, 2]) + note("exemple", "Lecture :", "marché attractif mais l'entreprise est faible → logique d'INTERROGATION : investir sélectivement (segmenter) ou abandonner.") },
        { t: "DAS 2 : attractivité 6, compétitivité 7", html: mck([{ n: 1, r: 0, c: 2 }, { n: 2, r: 1, c: 0 }], [1, 0]) + note("exemple", "Lecture :", "attractivité moyenne, compétitivité élevée → DÉVELOPPEMENT : segmenter, investir sélectivement.") },
        { t: "DAS 3 : attractivité 2, compétitivité 8", html: mck([{ n: 1, r: 0, c: 2 }, { n: 2, r: 1, c: 0 }, { n: 3, r: 2, c: 0 }], [2, 0]) + note("exemple", "Lecture :", "marché peu attractif mais l'entreprise y est forte → MAINTIEN : maximiser la profitabilité, générer du cash, optimiser les coûts.") },
        { t: "La méthode à écrire au devoir", html: steps(["Convertis chaque note en zone (faible, moyenne, forte).", "Place le DAS dans la case correspondante.", "Écris la recommandation de la case.", "Donne la logique : développement, maintien, repli ou interrogation.", "Conclus sur l'équilibre du portefeuille : y a-t-il des DAS qui génèrent du cash pour financer ceux en développement ?"]) + note("piege", "Ne confonds pas :", "McKinsey = attractivité × compétitivité (9 cases). BCG = croissance × part de marché (4 cases).") }
      ],
      exo: {
        context: "<p>Le groupe <b>Kanazoé Industries</b> possède 4 DAS (notes sur 10).</p>" + "<div class='tbl-wrap'><table class='tbl'><thead><tr><th>DAS</th><th>Attractivité</th><th>Compétitivité</th></tr></thead><tbody><tr><td>A — Huile alimentaire</td><td>8</td><td>8</td></tr><tr><td>B — Savon industriel</td><td>5</td><td>2</td></tr><tr><td>C — Emballages carton</td><td>2</td><td>5</td></tr><tr><td>D — Jus de fruits</td><td>8</td><td>5</td></tr></tbody></table></div>",
        parts: [
          { kind: "grid", prompt: "Pour chaque DAS, trouve les zones, la recommandation et la logique.", fields: [
            { name: "Attractivité", options: ["Forte", "Moyenne", "Faible"] },
            { name: "Compétitivité", options: ["Élevée", "Moyenne", "Faible"] },
            { name: "Recommandation", options: ["Conforter son leadership", "Développer, investir sur les FCS", "Investir sélectivement ou abandonner", "Segmenter, investir sélectivement", "Rentabiliser prudemment", "Se retirer sélectivement", "Maximiser la profitabilité", "Se désengager progressivement", "Abandonner, désinvestir"] },
            { name: "Logique", options: ["Développement", "Maintien", "Repli", "Interrogation"] }
          ], rows: [
            ["DAS A (8 ; 8)", [0, 0, 0, 0], "Forte × élevée → conforter son leadership (développement)."],
            ["DAS B (5 ; 2)", [1, 2, 5, 2], "Moyenne × faible → se retirer sélectivement (repli)."],
            ["DAS C (2 ; 5)", [2, 1, 7, 2], "Faible × moyenne → se désengager progressivement (repli)."],
            ["DAS D (8 ; 5)", [0, 1, 1, 0], "Forte × moyenne → développer, investir sur les FCS (développement)."]
          ] },
          { kind: "open", prompt: "Que penses-tu de l'équilibre du portefeuille de Kanazoé Industries ?", a: "Le portefeuille est déséquilibré : deux DAS en développement (A et D) mais deux DAS en repli (B et C) et aucun DAS en maintien qui génère du cash. A devra financer D ; il faut se retirer de B et C pour libérer des ressources.", k: [["desequilibr", "equilibr"], ["developpement", "a et d", "huile", "jus"], ["repli", "b et c", "retirer", "desengager"], ["cash", "financ", "ressource"]] }
        ]
      }
    },

    /* ====================================================== 7. Business model */
    {
      id: "bm", ch: "c3", title: "Business model et Canvas", tag: "Modèle économique",
      summary: "Décrire un modèle économique avec les 3 piliers puis les 9 blocs du Canvas.",
      steps: [
        { t: "Les 3 piliers", html: tbl(["Pilier", "Question", "Contenu"], [["1. Proposition de valeur", "Quoi ? Qui ? Combien ?", "L'offre, le client (utilisateur, payeur, prescripteur), le prix"], ["2. Architecture de valeur", "Comment ?", "Chaîne de valeur, ressources et compétences clés"], ["3. Équation de profit", "Combien gagne-t-on ?", "Structure de coûts, revenus, capitaux engagés"]]) },
        { t: "Exemple : compagnie aérienne low cost", html: tbl(["Pilier", "Low cost"], [["Proposition de valeur", "Touristes et nouveaux clients ; vol sans service ; prix très bas"], ["Architecture de valeur", "Avions neufs identiques, hôtesses multitâches, nombreuses rotations"], ["Équation de profit", "Coûts bas ; chiffre d'affaires grâce au volume ; capitaux élevés (flotte d'avions)"]]) + note("retenir", "Logique :", "tout est cohérent : on supprime les services pour baisser les coûts et les prix, et on gagne grâce au volume.") },
        { t: "Le Canvas en 9 blocs", html: "<p class='rv'>À gauche : comment on produit. À droite : comment on vend. En bas : l'argent.</p>" + bmc({}) },
        { t: "Exemple : Nespresso", html: bmc({ pa: "Fabricants de machines, cultivateurs de café", ac: "Production, distribution, marketing", re: "Café, usines, canaux, brevets, marques", pv: "Le meilleur du café à domicile ou au bureau", rc: "Capture, enfermement (on doit racheter les capsules)", ca: "Détaillants, numérique (web, mail)", se: "Domiciles, entreprises", co: "Coûts de production, distribution, marketing", rv: "Vente de machines, vente de capsules" }) },
        { t: "Les questions-réflexes", html: steps(["Partenaires : avec qui travaille-t-on ?", "Activités : que doit-on absolument bien faire ?", "Ressources : que doit-on absolument posséder ?", "Proposition : pourquoi le client nous choisit-il ?", "Relations : comment fidélise-t-on ?", "Canaux : comment atteint-on et livre-t-on le client ?", "Segments : pour qui crée-t-on de la valeur ?", "Coûts : où part l'argent ?", "Revenus : d'où vient l'argent ?"]) + note("piege", "Piège QCM :", "« comment l'entreprise fait des profits » → flux de revenus (pas structure des coûts) ; « communique et livre » → canaux.") }
      ],
      exo: {
        context: "<p>Place chaque élément du modèle <b>Airbnb</b> dans le bon bloc du Canvas.</p>",
        parts: [
          { kind: "choose", prompt: "Classe les éléments.", options: ["Partenaires clés", "Activités clés", "Ressources clés", "Proposition de valeur", "Relations clients", "Canaux", "Segments de clientèle", "Structure des coûts", "Flux de revenus"], rows: [
            ["Les hôtes qui proposent leur logement", 0, "Sans eux, pas d'offre : ce sont des partenaires (et aussi un segment)."],
            ["Le développement et la maintenance de la plateforme", 1, ""],
            ["La plateforme technologique et la marque", 2, ""],
            ["Un choix varié de logements avec réservation et paiement centralisés", 3, ""],
            ["Les avis et évaluations qui créent la confiance", 4, ""],
            ["L'application mobile et le site web", 5, ""],
            ["Les voyageurs qui cherchent un logement temporaire", 6, ""],
            ["Les frais de service prélevés sur chaque réservation", 8, ""],
            ["Les dépenses de serveurs, de marketing et d'assistance", 7, ""]
          ] },
          { kind: "choose", prompt: "À quel pilier du business model appartient chaque élément ?", options: ["Proposition de valeur", "Architecture de valeur", "Équation de profit"], rows: [
            ["Le prix très bas d'un billet low cost", 0, "Le « combien » de la proposition de valeur."],
            ["Les hôtesses multitâches", 1, "Le « comment »."],
            ["Le chiffre d'affaires grâce au volume", 2, ""],
            ["Les touristes comme cible", 0, "Le « qui »."],
            ["La flotte d'avions (capitaux engagés)", 2, ""]
          ] },
          { kind: "open", prompt: "Explique l'effet de réseau d'Airbnb.", a: "Plus il y a de logements (hôtes) sur la plateforme, plus elle attire de voyageurs ; et plus il y a de voyageurs, plus elle attire d'hôtes. La valeur de la plateforme augmente avec le nombre d'utilisateurs des deux côtés.", k: [["logement", "hote"], ["voyageur"], ["attir", "plus"]] }
        ]
      }
    },

    /* ====================================================== 8. Analyse financière */
    {
      id: "finance", ch: "c4", title: "Analyse financière", tag: "Calcul",
      summary: "Comparer deux projets et calculer rentabilités et trésorerie.",
      steps: [
        { t: "Les 3 axes", html: tbl(["Axe", "Question", "Indicateurs"], [["Performance économique", "L'activité est-elle rentable ?", "CA, EBE, rentabilité économique"], ["Santé financière", "L'entreprise est-elle solide ?", "Valeur patrimoniale, CAF, endettement, rentabilité financière"], ["Équilibre de trésorerie", "A-t-elle assez de liquidités ?", "BFR, FR, trésorerie"]]) },
        { t: "Exemple du cours : A ou B ?", html: tbl(["Projet", "Investissement", "Bénéfice"], [["A", "100 M", "12 M"], ["B", "15 M", "8 M"]]) + note("piege", "Piège :", "A rapporte plus en valeur absolue (12 M > 8 M)… mais il faut rapporter le bénéfice à ce qu'on investit.") },
        { t: "Le calcul", html: formula("Rentabilité = Bénéfice ÷ Investissement × 100") + steps(["A : 12 ÷ 100 = 0,12 → <b>12 %</b>", "B : 8 ÷ 15 = 0,533 → <b>53,3 %</b>", "Conclusion : B est plus rentable ; chaque franc investi rapporte plus."]) },
        { t: "Rentabilité économique et financière", html: formula("Rentabilité économique (ROCE) = Résultat d'exploitation après impôt ÷ Capitaux investis") + formula("Rentabilité financière = Résultat net ÷ Capitaux propres") + note("astuce", "Pour retenir :", "économique = tout l'argent investi dans l'outil ; financière = l'argent des associés.") },
        { t: "Trésorerie", html: formula("Trésorerie = Fonds de roulement (FR) − Besoin en fonds de roulement (BFR)") + steps(["FR = 80 M, BFR = 60 M → trésorerie = <b>+20 M</b> : situation saine.", "FR = 50 M, BFR = 70 M → trésorerie = <b>−20 M</b> : l'entreprise dépend de découverts bancaires."]) + note("retenir", "À retenir :", "trésorerie positive = le FR couvre le BFR.") }
      ],
      exo: {
        context: "<p><b>Ferme avicole Kaboré</b> hésite entre deux projets : <b>X</b> (investissement 40 M, bénéfice 6 M) et <b>Y</b> (investissement 25 M, bénéfice 5 M). Par ailleurs : résultat net 18 M, capitaux propres 120 M, résultat d'exploitation après impôt 24 M, capitaux investis 200 M, FR 50 M, BFR 65 M.</p>",
        parts: [
          { kind: "calc", prompt: "Calcule (en %, ou en millions pour la trésorerie).", rows: [
            { label: "Rentabilité du projet X (%)", a: 15, tol: 0.1, unit: "%", sol: "6 ÷ 40 = 0,15 → 15 %" },
            { label: "Rentabilité du projet Y (%)", a: 20, tol: 0.1, unit: "%", sol: "5 ÷ 25 = 0,20 → 20 %" },
            { label: "Rentabilité financière (%)", a: 15, tol: 0.1, unit: "%", sol: "18 ÷ 120 = 0,15 → 15 %" },
            { label: "Rentabilité économique (%)", a: 12, tol: 0.1, unit: "%", sol: "24 ÷ 200 = 0,12 → 12 %" },
            { label: "Trésorerie (M)", a: -15, tol: 0, unit: "M", sol: "50 − 65 = −15 M" }
          ] },
          { kind: "choose", prompt: "Conclusions", options: ["Projet X", "Projet Y"], rows: [["Quel projet est le plus rentable ?", 1, "Y : 20 % contre 15 %."]] },
          { kind: "open", prompt: "Interprète la trésorerie de la ferme.", a: "La trésorerie est négative (−15 M) : le fonds de roulement ne couvre pas le besoin en fonds de roulement. La ferme dépend de financements à court terme (découverts) ; elle doit augmenter son FR ou réduire son BFR.", k: [["negati", "-15", "−15"], ["fr", "fonds de roulement"], ["bfr", "besoin"], ["decouvert", "court terme", "augmenter", "reduire", "tension"]] }
        ]
      }
    },

    /* ====================================================== 9. Tableau de bord */
    {
      id: "tdb", ch: "c5", title: "Tableau de bord", tag: "Pilotage",
      summary: "Calculer les écarts, choisir la bonne couleur et commenter.",
      steps: [
        { t: "La structure d'un tableau de bord", html: "<p class='rv'>Chaque ligne suit le même schéma :</p>" + tbl(["Indicateur", "Objectif", "Réalisé", "Variation", "Commentaire"], [["Ce qu'on mesure", "Ce qu'on visait", "Ce qu'on a obtenu", "Réalisé − objectif", "Cause et action"]]) + note("retenir", "Rôle :", "suivre les KPI d'un coup d'œil pour décider vite.") },
        { t: "Exemple du cours : une minoterie", html: tbl(["Indicateur", "Objectif", "Réalisé", "Variation"], [["Farine produite", "500 t", "480 t", "−20 t"], ["Coût de production / tonne", "75 000 F", "78 000 F", "+3 000 F"], ["Taux de rejet", "5 %", "6 %", "+1 pt"], ["Chiffre d'affaires", "100 M", "98 M", "−2 %"]]) },
        { t: "Le sens de l'indicateur", html: note("piege", "Le piège :", "une variation positive n'est pas toujours bonne !") + tbl(["Type d'indicateur", "Variation +", "Variation −"], [["« Plus c'est haut, mieux c'est » (production, CA, qualité)", "Vert", "Rouge"], ["« Plus c'est bas, mieux c'est » (coûts, rejets, temps d'arrêt, turnover)", "Rouge", "Vert"]]) + note("exemple", "Minoterie :", "coût +3 000 F → rouge ; taux de rejet +1 pt → rouge ; production −20 t → rouge.") },
        { t: "Commenter comme un manager", html: steps(["Constat : « La production est inférieure de 20 t à l'objectif (96 %). »", "Cause : « Arrêt machine. »", "Action : « Réviser le plan de maintenance. »"]) + formula("Taux de réalisation = Réalisé ÷ Objectif × 100") }
      ],
      exo: {
        context: "<p>Tableau de bord mensuel de la <b>Boulangerie Wendkouni</b>.</p><div class='tbl-wrap'><table class='tbl'><thead><tr><th>Indicateur</th><th>Objectif</th><th>Réalisé</th></tr></thead><tbody><tr><td>Baguettes vendues</td><td>30 000</td><td>27 000</td></tr><tr><td>Chiffre d'affaires (M FCFA)</td><td>4,5</td><td>4,8</td></tr><tr><td>Taux de pain invendu (%)</td><td>4</td><td>7</td></tr><tr><td>Coût de la farine par baguette (F)</td><td>60</td><td>55</td></tr><tr><td>Taux d'absentéisme (%)</td><td>3</td><td>2</td></tr></tbody></table></div>",
        parts: [
          { kind: "calc", prompt: "Calcule les variations (réalisé − objectif) et un taux de réalisation.", rows: [
            { label: "Variation baguettes vendues", a: -3000, tol: 0, sol: "27 000 − 30 000 = −3 000" },
            { label: "Variation CA (M FCFA)", a: 0.3, tol: 0.001, sol: "4,8 − 4,5 = +0,3" },
            { label: "Variation taux d'invendus (points)", a: 3, tol: 0, sol: "7 − 4 = +3 points" },
            { label: "Variation coût farine (F)", a: -5, tol: 0, sol: "55 − 60 = −5 F" },
            { label: "Taux de réalisation des baguettes (%)", a: 90, tol: 0.1, sol: "27 000 ÷ 30 000 = 90 %" }
          ] },
          { kind: "choose", prompt: "Quelle couleur pour chaque indicateur ?", options: ["Vert", "Rouge"], rows: [
            ["Baguettes vendues", 1, "Sous l'objectif."],
            ["Chiffre d'affaires", 0, "Au-dessus de l'objectif (les prix ou le panier moyen ont dû augmenter)."],
            ["Taux de pain invendu", 1, "Plus c'est bas, mieux c'est : +3 points est mauvais."],
            ["Coût de la farine par baguette", 0, "Coût en baisse = bon."],
            ["Taux d'absentéisme", 0, "En baisse = bon."]
          ] },
          { kind: "open", prompt: "Propose une action corrective pour le taux d'invendus.", a: "Ajuster la production à la demande réelle (prévisions par jour, production par fournées), vendre les invendus à prix réduit ou les transformer (pain rassis → chapelure), suivre l'indicateur chaque jour.", k: [["production", "quantite", "fournee", "prevision"], ["demande", "vente"], ["reduire", "ajuster", "transformer", "prix reduit", "suivre"]] }
        ]
      }
    },

    /* ====================================================== 10. Risques */
    {
      id: "risques", ch: "c5", title: "Matrice des risques", tag: "Pilotage",
      summary: "Évaluer probabilité et impact, puis choisir la bonne réponse au risque.",
      steps: [
        { t: "Les 4 étapes", html: steps(["<b>Identifier</b> les risques : processus, ressources, délais, qualité, sécurité, environnement externe.", "<b>Évaluer</b> : probabilité d'occurrence × impact (fort, moyen, faible).", "<b>Plan d'action</b> : éviter, réduire, transférer ou accepter.", "<b>Mise en œuvre et suivi</b> : intégrer au pilotage, ajuster."]) },
        { t: "Évaluer le niveau de risque", html: "<p class='rv'>Convention d'entraînement : probabilité et impact notés de 1 (faible) à 3 (fort).</p>" + formula("Score = Probabilité × Impact") + tbl(["Score", "Niveau"], [["1 – 2", "Modéré"], ["3 – 4", "Élevé"], ["6 – 9", "Critique"]]) },
        { t: "Les 4 réponses au risque", html: tbl(["Réponse", "Idée", "Exemple (élevage de volailles)"], [["Éviter", "Supprimer l'activité ou la cause", "Ne pas acheter de poussins d'une zone touchée par la grippe aviaire"], ["Réduire", "Baisser la probabilité ou l'impact", "Vaccination, générateur de secours, ventilation"], ["Transférer", "Faire porter le risque par un tiers", "Assurance, contrat de vente à terme"], ["Accepter", "Garder le risque, souvent faible", "Petites pertes de casse d'œufs"]]) },
        { t: "Exemple du cours : ferme avicole", html: tbl(["Risque", "Prob.", "Impact", "Mesures"], [["Maladies aviaires", "Élevée", "Très fort", "Vaccination, biosécurité, suivi vétérinaire"], ["Pénurie d'aliments", "Élevée", "Fort", "Contrats, diversification des fournisseurs, stock"], ["Coupures d'électricité / eau", "Moyenne", "Fort", "Générateur, forage, entretien"], ["Vol ou prédation", "Moyenne", "Moyen", "Clôtures, gardiennage, chiens"], ["Prix de vente instables", "Élevée", "Fort", "Contrats à terme, diversification des circuits"]]) }
      ],
      exo: {
        context: "<p><b>TechPhone Ouaga</b> vend et répare des téléphones.</p>",
        parts: [
          { kind: "choose", prompt: "Quelle réponse au risque correspond à chaque mesure ?", options: ["Éviter", "Réduire", "Transférer", "Accepter"], rows: [
            ["Souscrire une assurance contre le vol et l'incendie", 2, ""],
            ["Installer des caméras et un coffre-fort", 1, ""],
            ["Arrêter de vendre des téléphones contrefaits", 0, "On supprime la cause."],
            ["Garder à sa charge la casse occasionnelle de petits accessoires", 3, ""],
            ["Former les techniciens pour limiter les erreurs de réparation", 1, ""],
            ["Faire signer au fournisseur une garantie de reprise des stocks invendus", 2, ""]
          ] },
          { kind: "calc", prompt: "Calcule le score (probabilité × impact, notes de 1 à 3).", rows: [
            { label: "Vol de stock : probabilité 2, impact 3", a: 6, tol: 0, sol: "2 × 3 = 6 → critique" },
            { label: "Panne du terminal de paiement : probabilité 2, impact 1", a: 2, tol: 0, sol: "2 × 1 = 2 → modéré" },
            { label: "Coupure d'électricité : probabilité 3, impact 2", a: 6, tol: 0, sol: "3 × 2 = 6 → critique" }
          ] },
          { kind: "choose", prompt: "Niveau de risque", options: ["Modéré", "Élevé", "Critique"], rows: [["Vol de stock (score 6)", 2, ""], ["Panne du terminal (score 2)", 0, ""]] }
        ]
      }
    },

    /* ====================================================== 11. Ishikawa + PDCA */
    {
      id: "qualite", ch: "c5", title: "Ishikawa et roue de Deming", tag: "Qualité",
      summary: "Trouver les causes d'un problème, puis l'améliorer en boucle.",
      steps: [
        { t: "Le diagramme d'Ishikawa", html: "<p class='rv'>Aussi appelé <b>diagramme de cause à effet</b> ou <b>en arêtes de poisson</b> (Kaoru Ishikawa). La tête = le problème ; les arêtes = les familles de causes.</p>" + note("retenir", "Les 5M :", "Main-d'œuvre, Matériel, Méthode, Matière, Milieu.") },
        { t: "Exemple du cours : baisse de 20 % de la marge", html: fish("Baisse de 20 % de la marge", { "Marché (milieu)": ["Marché aval en chute libre", "Concurrents qui attaquent sur les prix", "Nouveaux entrants virulents"], "Méthodes": ["Moins de temps en face à face client", "Trop d'administratif"], "Management": ["Forte hausse des remises", "Politique tarifaire plus agressive"], "Vendeurs (main-d'œuvre)": ["Mauvaise connaissance des clients", "Rémunération insuffisante", "Hausse du turnover"] }) },
        { t: "Comment le construire", html: steps(["Écris le problème précis dans la tête du poisson.", "Trace les grandes arêtes (5M ou familles adaptées).", "Fais un brainstorming : chaque cause va sur une arête.", "Repère les causes principales.", "Lance un plan d'action sur ces causes (PDCA)."]) },
        { t: "La roue de Deming (PDCA)", html: pdca() + note("info", "Image :", "la roue monte une pente : chaque tour améliore la qualité ; une cale (les standards) l'empêche de redescendre.") },
        { t: "PDCA appliqué", html: tbl(["Étape", "Pour la marge"], [["Plan", "Objectif : regagner 10 points de marge ; plan : limiter les remises"], ["Do", "Nouvelle grille de remises, formation des vendeurs"], ["Check", "Mesurer la marge chaque mois"], ["Act", "Si ça marche, standardiser ; sinon, corriger et recommencer"]]) }
      ],
      exo: {
        context: "<p>L'imprimerie <b>Graphik Sahel</b> livre souvent ses commandes en retard. Problème : <b>retards de livraison</b>.</p>",
        parts: [
          { kind: "choose", prompt: "Range chaque cause dans le bon « M ».", options: ["Main-d'œuvre", "Matériel", "Méthode", "Matière", "Milieu"], rows: [
            ["Les imprimantes tombent souvent en panne", 1, ""],
            ["Le papier livré par le fournisseur arrive en retard", 3, ""],
            ["Les opérateurs ne sont pas formés aux nouvelles machines", 0, ""],
            ["Aucune procédure pour planifier les commandes", 2, ""],
            ["Les coupures d'électricité fréquentes dans le quartier", 4, ""],
            ["L'encre de mauvaise qualité doit être changée souvent", 3, ""],
            ["Absentéisme élevé des employés", 0, ""],
            ["La chaleur de l'atelier fait gondoler le papier", 4, ""],
            ["Les commandes urgentes ne sont pas priorisées", 2, ""],
            ["Le logiciel de mise en page est obsolète", 1, ""]
          ] },
          { kind: "order", prompt: "Remets ces actions dans l'ordre du PDCA.", items: ["Fixer l'objectif « 95 % des commandes livrées à temps » et planifier la maintenance", "Mettre en place la maintenance hebdomadaire des imprimantes", "Mesurer le taux de livraisons à l'heure pendant un mois", "Généraliser la maintenance et ajuster le planning"] }
        ]
      }
    },

    /* ====================================================== 12. Motivation */
    {
      id: "motivation", ch: "c5", title: "Motiver et diriger une équipe", tag: "Humain",
      summary: "Maslow, Herzberg, McGregor et les 4 styles appliqués à des situations concrètes.",
      steps: [
        { t: "Maslow : 5 niveaux de besoins", html: pyramid(["Physiologiques : salaire, conditions de travail", "Sécurité : stabilité de l'emploi", "Appartenance : relations, camaraderie", "Estime : reconnaissance, statut", "Accomplissement : se réaliser, créer"]) + note("astuce", "Mémo :", "« Petit Singe Aime Escalader l'Arbre ». On satisfait d'abord le bas de la pyramide.") },
        { t: "Herzberg : hygiène ou motivation ?", html: tbl(["Facteurs d'hygiène", "Facteurs de motivation"], [["Absents → insatisfaction", "Présents → motivation"], ["Présents → pas de motivation active", ""], ["Salaire, conditions de travail, relations avec les collègues", "Reconnaissance, responsabilités, évolution professionnelle"]]) + note("exemple", "Exemple :", "Awa a un bon salaire mais personne ne la félicite : elle n'est pas mécontente… mais pas motivée non plus.") },
        { t: "McGregor : X ou Y ?", html: tbl(["Théorie X", "Théorie Y"], [["L'employé est paresseux", "L'employé est motivé par nature"], ["Il faut le surveiller et le diriger", "Il cherche les responsabilités et l'autonomie"], ["→ style autoritaire", "→ style participatif"]]) },
        { t: "Les 4 styles de management", html: tbl(["Style", "Le manager…", "Quand ?"], [["Directif", "définit, impose, contrôle", "Collaborateur peu compétent (nouveau)"], ["Persuasif", "explique, convainc", "Compétence en progrès, motivation à construire"], ["Participatif", "associe aux décisions", "Compétent mais à remotiver"], ["Délégatif", "confie avec large autonomie", "Compétent et motivé"]]) + note("piege", "Attention :", "directif ≠ dirigisme. Le bon style dépend de la compétence et de la motivation du collaborateur.") }
      ],
      exo: {
        context: "<p>Situations vécues dans une agence de microfinance.</p>",
        parts: [
          { kind: "choose", prompt: "Quel besoin de Maslow est concerné ?", options: ["Physiologique", "Sécurité", "Appartenance", "Estime", "Accomplissement"], rows: [
            ["Moussa veut un CDI plutôt qu'un contrat de 3 mois", 1, ""],
            ["Fatim est fière d'avoir été nommée « agent du mois »", 3, ""],
            ["Issa aime les repas d'équipe du vendredi", 2, ""],
            ["Aminata veut créer un nouveau produit d'épargne pour les femmes", 4, ""],
            ["Le personnel réclame un salaire versé à temps", 0, ""]
          ] },
          { kind: "choose", prompt: "Selon Herzberg, facteur d'hygiène ou de motivation ?", options: ["Hygiène", "Motivation"], rows: [
            ["La climatisation du bureau", 0, ""],
            ["Se voir confier la gestion d'un nouveau portefeuille", 1, ""],
            ["Des félicitations publiques du directeur devant toute l'équipe", 1, "La reconnaissance est un facteur de motivation."],
            ["De bonnes relations avec les collègues", 0, ""]
          ] },
          { kind: "choose", prompt: "Quel style de management est utilisé ?", options: ["Directif", "Persuasif", "Participatif", "Délégatif"], rows: [
            ["La cheffe donne une procédure écrite et vérifie chaque dossier du nouvel agent", 0, ""],
            ["Le directeur explique pourquoi l'agence change d'horaires et répond aux objections", 1, ""],
            ["L'équipe choisit elle-même la façon d'organiser les permanences", 2, ""],
            ["Un agent expérimenté gère seul la nouvelle antenne, avec un point mensuel", 3, ""]
          ] },
          { kind: "choose", prompt: "Théorie X ou Y ?", options: ["Théorie X", "Théorie Y"], rows: [
            ["« Sans pointeuse, ils arriveraient tous en retard »", 0, ""],
            ["« Je leur fais confiance pour fixer leurs objectifs »", 1, ""]
          ] }
        ]
      }
    },

    /* ====================================================== 13. Décision */
    {
      id: "decision", ch: "c5", title: "La prise de décision", tag: "Décision",
      summary: "Classer les décisions et dérouler le processus en 9 étapes.",
      steps: [
        { t: "3 niveaux de décision", html: tbl(["Portée", "Horizon", "Qui ?", "Exemple"], [["Stratégique", "Long terme", "Direction générale", "Ouvrir une filiale à l'étranger"], ["Tactique (administrative)", "Moyen terme", "Cadres intermédiaires", "Installer un logiciel de gestion des stocks"], ["Opérationnelle", "Court terme", "Encadrement de proximité", "Passer une commande habituelle"]]) },
        { t: "Programmée ou non ? Certaine ou non ?", html: tbl(["", "Définition", "Exemple"], [["Programmée", "Situation répétitive, règle existante", "Réapprovisionner au seuil minimal"], ["Non programmée", "Situation nouvelle, analyse et créativité", "Délocaliser une activité"], ["Univers certain", "On peut anticiper les résultats", "Choisir le fournisseur le moins cher à qualité égale"], ["Univers incertain", "Information incomplète : jugement et expérience", "Lancer un produit dans un pays inconnu"]]) },
        { t: "Rationalité parfaite ou limitée ?", html: note("retenir", "Herbert Simon :", "l'information, le temps et les capacités d'analyse sont limités. Le décideur retient une solution SATISFAISANTE, pas forcément optimale.") + note("info", "Influence des acteurs :", "valeurs, motivations et attitude face au risque orientent les choix ; les intérêts divergents conduisent à des compromis.") },
        { t: "Le processus en 9 étapes", html: tbl(["Phase", "Étapes"], [["Analyse", "1. Diagnostiquer · 2. Définir le problème · 3. Collecter l'information · 4. Analyser données et contraintes"], ["Décision", "5. Rechercher les solutions · 6. Les comparer · 7. Choisir"], ["Mise en œuvre", "8. Appliquer (plan d'action) · 9. Évaluer et suivre"]]) + note("astuce", "Mémo :", "4 + 3 + 2 = 9.") },
        { t: "Mise en œuvre et conduite du changement", html: steps(["<b>Préparer</b> : identifier les acteurs, les impacts, les freins.", "<b>Mobiliser</b> : présenter les objectifs, co-construire.", "<b>Accompagner</b> : former, tester sur un pilote.", "<b>Ancrer</b> : mesurer l'usage, intégrer aux procédures."]) }
      ],
      exo: {
        context: "<p>La pharmacie <b>Bon Secours</b> prend plusieurs décisions.</p>",
        parts: [
          { kind: "grid", prompt: "Classe chaque décision.", fields: [
            { name: "Portée", options: ["Stratégique", "Tactique", "Opérationnelle"] },
            { name: "Type", options: ["Programmée", "Non programmée"] }
          ], rows: [
            ["Commander le paracétamol quand il reste 50 boîtes", [2, 0], "Court terme, règle de seuil."],
            ["Ouvrir une deuxième pharmacie à Koudougou", [0, 1], ""],
            ["Choisir un logiciel de gestion des ordonnances", [1, 1], "Moyen terme, organise les ressources ; situation nouvelle."],
            ["Faire le planning des gardes de la semaine", [2, 0], ""]
          ] },
          { kind: "order", prompt: "La pharmacie a de longues files d'attente. Remets les étapes dans l'ordre.", items: ["Constater que les clients attendent plus de 30 minutes", "Définir le problème : trop d'attente aux heures de pointe", "Compter les clients par heure pendant 2 semaines", "Analyser : 70 % des clients viennent entre 17 h et 19 h", "Lister les solutions : un guichet de plus, prise de rendez-vous, renfort", "Comparer coûts et avantages de chaque solution", "Choisir un renfort à mi-temps de 17 h à 19 h", "Recruter et organiser le renfort", "Mesurer le temps d'attente après un mois"] }
        ]
      }
    },

    /* ====================================================== 14. Stratégique vs opérationnel + SMART/KPI/BSC */
    {
      id: "pilotage", ch: "c5", title: "Stratégique, opérationnel, KPI", tag: "Pilotage",
      summary: "Distinguer les deux managements, écrire un objectif SMART et classer les KPI.",
      steps: [
        { t: "Stratégique ou opérationnel ?", html: tbl(["", "Stratégique", "Opérationnel"], [["Question", "Quel avenir ?", "Comment gérer au quotidien ?"], ["Vision", "Externe (environnement)", "Interne (ressources)"], ["Horizon", "Long terme (> 3 ans)", "Court et moyen terme"], ["Acteurs", "Direction générale", "Hiérarchie intermédiaire"], ["Décisions", "Non réversibles", "Réversibles"], ["Exemples", "Nouvelle activité, rachat, structure", "Embauche, prix, promotion"]]) },
        { t: "Écrire un objectif SMART", html: tbl(["Lettre", "Sens", "Question"], [["S", "Spécifique", "Quoi exactement ?"], ["M", "Mesurable", "Quel chiffre ?"], ["A", "Atteignable", "Est-ce possible ?"], ["R", "Réaliste / pertinent", "Est-ce utile pour la stratégie ?"], ["T", "Temporellement défini", "Pour quand ?"]]) + note("exemple", "Non SMART :", "« Vendre plus ». SMART : « Augmenter les ventes de 10 % à Ouagadougou d'ici le 31 décembre 2026 ».") },
        { t: "De la vision aux KPI", html: steps(["Vision → objectifs stratégiques.", "Objectifs stratégiques → objectifs opérationnels.", "Chaque objectif opérationnel → un ou plusieurs KPI.", "Plan d'action, suivi régulier, analyse des écarts, réajustement."]) },
        { t: "Le Balanced Scorecard", html: tbl(["Axe", "Question", "KPI type"], [["Financier", "Comment nous voient les actionnaires ?", "ROI, rentabilité des capitaux propres, BPA"], ["Clients", "Comment nous voient les clients ?", "Satisfaction, part de marché"], ["Processus internes", "Où devons-nous exceller ?", "Défauts, délai de mise sur le marché, innovations"], ["Apprentissage", "Comment progresser ?", "Formation, systèmes d'information, partage"]]) + note("astuce", "Mémo :", "F-C-P-A, du haut (résultat) vers le bas (fondations).") }
      ],
      exo: {
        context: "<p>Entraîne-toi sur les notions de pilotage.</p>",
        parts: [
          { kind: "choose", prompt: "Décision stratégique ou opérationnelle ?", options: ["Stratégique", "Opérationnelle"], rows: [
            ["Racheter un concurrent", 0, ""],
            ["Fixer le prix de la promotion de Tabaski", 1, ""],
            ["Passer d'une structure fonctionnelle à une structure divisionnaire", 0, ""],
            ["Recruter un caissier", 1, ""],
            ["Se lancer sur le marché ivoirien", 0, ""]
          ] },
          { kind: "choose", prompt: "Cet objectif est-il SMART ?", options: ["SMART", "Pas SMART"], rows: [
            ["Améliorer la qualité", 1, "Ni mesurable ni daté."],
            ["Réduire le taux de rebut de 6 % à 4 % d'ici juin 2027", 0, ""],
            ["Devenir le leader mondial du yaourt l'an prochain (PME de 10 salariés)", 1, "Pas atteignable ni réaliste."],
            ["Former les 12 caissiers au nouveau logiciel avant le 15 janvier", 0, ""]
          ] },
          { kind: "choose", prompt: "Dans quel axe du Balanced Scorecard placer ce KPI ?", options: ["Financier", "Clients", "Processus internes", "Apprentissage"], rows: [
            ["Retour sur investissement (ROI)", 0, ""],
            ["Taux de satisfaction client", 1, ""],
            ["Nombre de défauts de fabrication", 2, ""],
            ["Heures de formation par employé", 3, ""],
            ["Part de marché", 1, ""],
            ["Délai de mise sur le marché d'un produit", 2, ""]
          ] }
        ]
      }
    }
  ];
})();
