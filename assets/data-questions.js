/* Banque de questions.
   Types : qcm (une seule bonne réponse), multi (plusieurs bonnes réponses possibles), vf (vrai/faux), open (réponse à saisir), ordre (remettre dans l'ordre)
   src : "prof" = QCM fourni par l'enseignant / préparation du devoir ; "25qcm" = série « 25 QCM corrigés » (reprise mot pour mot) ; sinon cours.
   fix : remarque quand le corrigé officiel contredit le cours (la question reste intacte). */
(function () {
  var Q = [];
  // qcm(ch, question, options, indexBonneRéponse, explication, src, opts)
  function qcm(ch, q, o, a, ex, src, x) { Q.push(Object.assign({ t: "qcm", ch: ch, q: q, o: o, a: a, ex: ex || "", src: src || "cours" }, x || {})); }
  // multi(ch, question, options, [indices des bonnes réponses], explication)
  function multi(ch, q, o, a, ex, src, x) { Q.push(Object.assign({ t: "multi", ch: ch, q: q, o: o, a: a, ex: ex || "", src: src || "cours" }, x || {})); }
  function vf(ch, q, a, ex, src) { Q.push({ t: "vf", ch: ch, q: q, a: a, ex: ex || "", src: src || "cours" }); }
  // k : liste de groupes de mots-clés ; chaque groupe = alternatives acceptées
  function open(ch, q, a, k, ex, src) { Q.push({ t: "open", ch: ch, q: q, a: a, k: k, ex: ex || "", src: src || "cours" }); }
  function ordre(ch, q, items, ex) { Q.push({ t: "ordre", ch: ch, q: q, items: items, ex: ex || "", src: "cours" }); }

  /* =====================================================================
     QCM DU PROF (préparation du devoir) — repris mot pour mot, options dans l'ordre d'origine
     ===================================================================== */
  var K = { keep: true };
  qcm("c4", "Quelle est la première étape du processus de planification stratégique ?",
    ["Élaboration de la stratégie", "Évaluation des résultats", "Analyse de l'environnement externe et interne", "Mise en œuvre de la stratégie"], 2,
    "On commence toujours par le diagnostic : analyser l'environnement (externe et interne) avant de formuler, mettre en œuvre puis évaluer.", "prof", K);
  qcm("c4", "Quel outil est souvent utilisé pour analyser les forces, faiblesses, opportunités et menaces d'une entreprise ?",
    ["Matrice BCG", "Matrice SWOT", "Analyse PESTEL", "Diagramme de Gantt"], 1,
    "SWOT = Strengths (forces), Weaknesses (faiblesses), Opportunities (opportunités), Threats (menaces).", "prof", K);
  qcm("c4", "Quel est l'objectif principal d'une analyse PESTEL ?",
    ["Évaluer la performance financière de l'entreprise", "Identifier les facteurs macro-environnementaux influençant l'entreprise", "Analyser les forces et faiblesses internes", "Déterminer les coûts de production"], 1,
    "PESTEL analyse le macro-environnement (Politique, Économique, Socioculturel, Technologique, Écologique, Légal). Forces/faiblesses internes = SWOT.", "prof", K);
  qcm("c5", "Quel est le rôle principal d'un tableau de bord stratégique ?",
    ["Réaliser des études de marché", "Suivre les indicateurs de performance clés", "Élaborer des prévisions financières", "Gérer les ressources humaines"], 1,
    "Le tableau de bord regroupe visuellement les KPI pour suivre la performance et aider à la décision.", "prof", K);
  qcm("c4", "Quel est l'impact d'une bonne gestion stratégique sur une entreprise ?",
    ["Augmentation des dettes à long terme", "Amélioration de la compétitivité et de la rentabilité", "Réduction de l'innovation", "Diminution de la satisfaction client"], 1,
    "Les trois autres réponses sont des effets négatifs : seule l'amélioration de la compétitivité et de la rentabilité est logique.", "prof", K);
  qcm("c4", "Quel modèle est souvent utilisé pour analyser la concurrence dans une industrie ?",
    ["Le modèle PESTEL.", "Le modèle de McKinsey.", "La matrice BCG.", "Le modèle des cinq forces de Porter."], 3,
    "Les 5 forces de Porter mesurent l'intensité concurrentielle d'un secteur (entrants, fournisseurs, clients, substituts, rivalité).", "prof", K);
  qcm("c5", "Quel est le rôle principal d'un responsable opérationnel ?",
    ["Gérer les ressources humaines.", "Élaborer des politiques de marketing.", "Définir la vision stratégique de l'entreprise.", "Superviser les activités quotidiennes de l'entreprise"], 3,
    "Opérationnel = quotidien. Définir la vision relève du management stratégique (direction générale).", "prof", K);
  qcm("c5", "Dans le cadre de la gestion opérationnelle, qu'est-ce que l'optimisation des processus ?",
    ["Réduire le temps de travail des employés.", "Éliminer complètement les procédures standard.", "Augmenter le nombre d'étapes dans un processus.", "Améliorer l'efficacité et réduire les coûts des opérations."], 3,
    "Optimiser = faire mieux avec moins : plus d'efficacité, moins de coûts.", "prof", K);
  qcm("c5", "Quelle méthode est souvent utilisée pour analyser les processus opérationnels ?",
    ["Le SWOT", "La matrice BCG", "La cartographie des processus", "Le PESTEL"], 2,
    "SWOT, BCG et PESTEL sont des outils stratégiques. Pour les processus (opérationnel), on les cartographie.", "prof", K);
  qcm("c5", "Quelle approche est souvent utilisée pour améliorer la qualité dans les opérations ?",
    ["Planification stratégique", "Gestion des ressources humaines", "Analyse de marché", "Six Sigma"], 3,
    "Le mot « opérations » exclut la planification stratégique. Six Sigma (Lean Six Sigma) réduit les défauts : c'est une méthode de qualité.", "prof", K);
  qcm("c3", "Quel élément est essentiel pour définir un modèle économique ?",
    ["Le type de produits uniquement", "La localisation géographique", "Le nombre d'employés", "La proposition de valeur"], 3,
    "La proposition de valeur est le 1er pilier du business model. Attention au mot « uniquement » qui rend la première réponse fausse.", "prof", K);
  qcm("c3", "Quel élément du Business Model Canvas décrit les activités clés d'une entreprise ?",
    ["Canaux", "Proposition de valeur", "Activités clés", "Segments de clients"], 2,
    "La réponse est dans la question : le bloc « Activités clés ».", "prof", K);
  qcm("c3", "Dans le Business Model Canvas, quel bloc est consacré à la manière dont une entreprise fait des profits ?",
    ["Structure des coûts", "Relations avec les clients", "Ressources clés", "Flux de revenus"], 3,
    "Les flux de revenus décrivent d'où vient l'argent. La structure des coûts décrit où il part.", "prof", K);
  qcm("c3", "Quel élément du Business Model Canvas décrit comment une entreprise communique et livre sa proposition de valeur ?",
    ["Canaux", "Ressources clés", "Partenaires clés", "Activités clés"], 0,
    "Les canaux = comment la proposition de valeur est délivrée au client (communication, distribution, vente).", "prof", K);
  qcm("c4", "Dans l'analyse PESTEL, quel facteur est lié aux tendances démographiques et culturelles ?",
    ["Politique", "Environnemental", "Socioculturel"], 2,
    "Démographie, culture, modes de vie, éducation = facteur Socioculturel (le S de PESTEL).", "prof", K);
  qcm("c4", "Dans le cadre de l'analyse PESTEL, quel facteur politique pourrait affecter une entreprise ?",
    ["Coût de production", "Stabilité gouvernementale", "Technologie utilisée"], 1,
    "Coût de production = économique/interne ; technologie = T. La stabilité du gouvernement est un facteur Politique.", "prof", K);
  qcm("c4", "Quelle est la principale caractéristique du management stratégique ?",
    ["Il se concentre sur la vision à long terme de l'entreprise.", "Il se concentre uniquement sur la réduction des coûts.", "Il gère les tâches quotidiennes des employés.", "Il est axé sur la gestion des ressources humaines."], 0,
    "Stratégique = long terme (plus de 3 ans), vision externe, avenir de l'entreprise. Les tâches quotidiennes = opérationnel.", "prof", K);

  /* =====================================================================
     SÉRIE « 25 QCM CORRIGÉS : PLANIFICATION STRATÉGIQUE » — reprise mot pour mot.
     La bonne réponse est celle du corrigé officiel du document ; « fix » signale
     quand ce corrigé contredit le cours.
     ===================================================================== */
  qcm("c4", "La planification stratégique est avant tout axée sur :",
    ["La satisfaction des actionnaires.", "La maximisation des profits à court terme.", "La vision et la mission de l'organisation.", "La réduction des coûts à tout prix."], 2,
    "La planification stratégique est axée sur la définition d'une vision et d'une mission claires pour l'organisation, qui guideront ses décisions et actions à long terme.", "25qcm", K);
  qcm("c4", "L'une des premières étapes de la planification stratégique implique de :",
    ["Analyser l'environnement externe.", "Définir les objectifs financiers.", "Établir un budget détaillé.", "Identifier les forces et faiblesses internes."], 0,
    "L'une des premières étapes est d'analyser l'environnement externe (facteurs politiques, économiques, sociaux et technologiques) pour identifier les opportunités et menaces.", "25qcm", K);
  qcm("c5", "La planification opérationnelle se concentre sur :",
    ["La formulation de stratégies à long terme.", "La mise en place de procédures quotidiennes.", "L'allocation des ressources pour les initiatives stratégiques.", "L'évaluation des performances financières trimestrielles."], 1,
    "La planification opérationnelle se concentre sur la mise en place de procédures et de processus quotidiens pour soutenir la mise en œuvre des stratégies.", "25qcm", K);
  qcm("c4", "Le SWOT analysis est un outil utilisé pour :",
    ["Évaluer les opportunités et menaces externes.", "Identifier les forces et faiblesses de la concurrence.", "Définir les objectifs à long terme.", "Analyser les tendances du marché boursier."], 0,
    "Le SWOT évalue les forces et faiblesses internes, ainsi que les opportunités et menaces externes.", "25qcm",
    { keep: true, fix: "Réponse du corrigé officiel. Dans le cours, le SWOT couvre aussi l'interne (forces et faiblesses de l'entreprise elle-même) : cette réponse est incomplète, mais c'est la seule acceptable parmi les quatre." });
  qcm("c4", "La planification stratégique efficace implique souvent de :",
    ["Maintenir le statu quo pour minimiser les risques.", "Innover et s'adapter aux changements de l'environnement.", "Se concentrer uniquement sur les objectifs financiers.", "Ignorer l'impact des parties prenantes externes."], 1,
    "La planification stratégique efficace implique de s'adapter et d'innover en réponse aux changements de l'environnement. Le statu quo limite la compétitivité.", "25qcm", K);
  qcm("c4", "L'analyse PESTEL prend en compte les facteurs suivants, SAUF :",
    ["Politiques.", "Économiques.", "Sociaux-culturels.", "Écologiques."], 3,
    "Corrigé officiel : D) Écologiques. Explication du document : l'analyse PESTEL prend en compte les facteurs politiques, économiques, sociaux, technologiques, écologiques et légaux.", "25qcm",
    { keep: true, fix: "Attention : le corrigé officiel donne « Écologiques », alors que le E de PESTEL est justement Écologique. Les quatre options font partie de PESTEL : la question n'a pas de vraie bonne réponse. Retiens la réponse du corrigé pour cette série, mais sache que PESTEL = Politique, Économique, Socioculturel, Technologique, Écologique, Légal." });
  qcm("c4", "La planification stratégique efficace nécessite une :",
    ["Vision claire et inspirante.", "Compréhension des besoins des clients.", "Collaboration interdépartementale.", "Toutes les réponses ci-dessus."], 3,
    "Une planification stratégique efficace nécessite une vision claire, une compréhension des besoins des clients et une collaboration interdépartementale.", "25qcm", K);
  qcm("c4", "Le processus de planification stratégique comprend typiquement :",
    ["La formulation de la stratégie.", "La mise en œuvre de la stratégie.", "Le contrôle et l'évaluation de la performance.", "Toutes les réponses ci-dessus."], 3,
    "Formulation de la stratégie, mise en œuvre, puis contrôle et évaluation de la performance.", "25qcm", K);
  qcm("c5", "Les objectifs SMART sont :",
    ["Spécifiques, Mesurables, Aléatoires, Réalisables et Temporellement définis.", "Simples, Médiatiques, Adaptables, Réguliers et Tendanceurs.", "Significatifs, Majestueux, Adaptés, Réalisables et Traditionnels.", "Stratégiques, Mélangés, Abstraits, Révolutionnaires et Temporels."], 0,
    "Corrigé officiel : A. Explication du document : les objectifs SMART sont spécifiques, mesurables, atteignables, réalistes et limités dans le temps.", "25qcm",
    { keep: true, fix: "Attention : le corrigé officiel donne la réponse A, qui contient « Aléatoires ». Dans le cours, le A de SMART veut dire Atteignable (Attainable), jamais aléatoire. Ici, A est seulement la « moins fausse » des quatre options." });
  qcm("c4", "La matrice de croissance-part de marché de l'Boston Consulting Group (BCG) classe les unités d'affaires en :",
    ["Vedettes, Poids-mouches, Chiens et Question-marques.", "Vedettes, Poids-lourds, Chouchous et Questionnaires.", "Vainqueurs, Perdants, Challengers et Dormeurs.", "Champions, Suiveurs, Nouveaux venus et Indécis."], 0,
    "Corrigé officiel : A) Vedettes, Poids-mouches, Chiens et Question-marques.", "25qcm",
    { keep: true, fix: "Attention : la vraie matrice BCG classe les activités en Vedettes, Vaches à lait, Dilemmes (question-marques) et Poids morts (chiens). « Poids-mouches » n'existe pas, et les définitions du document sont fausses. A reste la réponse attendue parce que c'est la plus proche." });
  qcm("c4", "La planification stratégique efficace implique de :",
    ["S'adapter aux changements technologiques.", "Ignorer les tendances technologiques émergentes.", "Maintenir des pratiques commerciales traditionnelles.", "Sous-traiter toutes les fonctions technologiques."], 0,
    "Il faut s'adapter aux changements technologiques pour rester compétitif. Les ignorer met en péril la position de l'organisation sur le marché.", "25qcm", K);
  qcm("c4", "L'analyse des cinq forces de Porter évalue l'intensité de la concurrence en examinant :",
    ["Le pouvoir de négociation des clients.", "La menace de nouveaux entrants.", "Le pouvoir de négociation des fournisseurs.", "Toutes les réponses ci-dessus."], 3,
    "Les 5 forces : pouvoir des clients et des fournisseurs, menace des nouveaux entrants et des produits de substitution, rivalité entre concurrents existants.", "25qcm", K);
  qcm("c4", "La planification stratégique efficace prend en compte :",
    ["Les ressources et capacités internes.", "Les opportunités et menaces externes.", "Les objectifs et stratégies des concurrents.", "Toutes les réponses ci-dessus."], 3,
    "Elle prend en compte les facteurs internes et externes, ainsi que les mouvements de la concurrence.", "25qcm", K);
  qcm("c4", "La courbe d'expérience suggère que :",
    ["Les coûts unitaires diminuent de façon constante avec l'accumulation de l'expérience.", "Les coûts de production augmentent avec le temps.", "Les coûts de production restent constants au fil du temps.", "Les coûts unitaires augmentent avec l'expansion de la production."], 0,
    "À mesure que l'organisation accumule de l'expérience dans une activité, ses coûts unitaires diminuent.", "25qcm", K);
  qcm("c4", "L'analyse des parties prenantes implique d'identifier et de comprendre :",
    ["Les besoins et les attentes des employés.", "L'impact des réglementations gouvernementales.", "Les objectifs et les stratégies de la concurrence.", "Toutes les réponses ci-dessus."], 3,
    "Employés, réglementations gouvernementales, concurrence : tous font partie de l'analyse des parties prenantes.", "25qcm", K);
  qcm("c4", "La planification stratégique efficace implique de :",
    ["Définir des objectifs clairs et réalistes.", "Maintenir des objectifs statiques et immuables.", "Ignorer les obstacles potentiels à la réalisation des objectifs.", "Modifier les objectifs fréquemment pour s'adapter aux changements."], 0,
    "Des objectifs clairs et réalistes, qui peuvent être adaptés en fonction des changements de l'environnement.", "25qcm", K);
  qcm("c4", "La matrice de planification produit-marché d'Ansoff propose les stratégies suivantes, SAUF :",
    ["La pénétration du marché.", "Le développement du marché.", "La diversification de la concurrence.", "Le développement du produit."], 2,
    "Ansoff propose pénétration du marché, développement du marché, développement du produit et diversification, mais pas de « diversification de la concurrence ».", "25qcm", K);
  qcm("c4", "La planification stratégique efficace prend en considération :",
    ["Les valeurs et la culture organisationnelle.", "Les objectifs à court terme uniquement.", "Les opportunités de croissance et d'expansion.", "Les réductions de coûts à tout prix."], 0,
    "Les valeurs et la culture organisationnelle influencent la direction et les décisions stratégiques.", "25qcm",
    { keep: true, fix: "La réponse C (opportunités de croissance) est aussi défendable, mais le corrigé officiel retient A : les valeurs font partie du cadre de référence fondamental (vision, vocation, valeurs)." });
  qcm("c4", "L'analyse des lacunes (gap analysis) implique de :",
    ["Identifier et comprendre les écarts de performance.", "Comparer les produits de l'entreprise à ceux de la concurrence.", "Évaluer les forces et faiblesses internes uniquement.", "Déterminer les opportunités et menaces externes uniquement."], 0,
    "L'analyse des lacunes identifie les écarts entre la performance actuelle et la performance désirée.", "25qcm", K);
  qcm("c4", "La planification stratégique efficace implique souvent de :",
    ["Collaborer avec d'autres départements.", "Travailler de manière isolée.", "Ignorer les idées et contributions des employés.", "Dépendre uniquement de la direction pour la prise de décision."], 0,
    "La collaboration interdépartementale aligne les efforts et rend les stratégies réalisables.", "25qcm", K);
  qcm("c4", "Les scénarios de planification sont utiles pour :",
    ["Préparer l'organisation à différents futurs possibles.", "Développer une seule vision du futur.", "Éviter l'incertitude en se concentrant sur le présent.", "Ignorer les changements futurs probables."], 0,
    "Les scénarios aident à se préparer à différents futurs possibles et à développer des stratégies flexibles.", "25qcm", K);
  qcm("c4", "La chaîne de valeur :",
    ["Identifie les activités qui créent de la valeur pour le client.", "Se concentre uniquement sur les activités de production.", "Ignore les activités de soutien et de logistique.", "Ne prend pas en compte les coûts associés à chaque activité."], 0,
    "La chaîne de valeur identifie les activités qui créent de la valeur pour le client, y compris les activités de soutien, opérationnelles et de logistique.", "25qcm", K);
  qcm("c4", "L'analyse de la valeur nette présente (net present value, NPV) est une technique de :",
    ["Évaluation des flux de trésorerie futurs.", "Évaluation de la satisfaction des clients.", "Mesure de la performance environnementale.", "Détermination du prix optimal du produit."], 0,
    "La NPV (VAN) évalue les flux de trésorerie futurs en tenant compte de la valeur temps de l'argent.", "25qcm", K);
  qcm("c4", "La planification stratégique efficace implique de :",
    ["Développer des stratégies alternatives.", "Se reposer sur une seule stratégie.", "Ignorer les stratégies des concurrents.", "Copier aveuglément les stratégies des concurrents."], 0,
    "Plusieurs stratégies alternatives permettent de faire face à l'incertitude.", "25qcm", K);
  qcm("c4", "La gestion stratégique implique de :",
    ["Formuler, mettre en œuvre et évaluer des stratégies.", "Se concentrer uniquement sur la formulation de stratégies.", "Ne pas tenir compte de l'évaluation de la performance.", "Modifier les stratégies sans évaluation préalable."], 0,
    "Un processus itératif de formulation, de mise en œuvre et d'évaluation des stratégies.", "25qcm", K);
  qcm("c4", "Le compte de résultat est également appelé :",
    ["Bilan.", "Tableau de financement.", "Compte de profits et pertes.", "Flux de trésorerie."], 2,
    "Le compte de résultat (charges et produits de l'exercice) s'appelle aussi compte de profits et pertes. Le bilan décrit le patrimoine.", "25qcm",
    { keep: true, fix: "Cette question s'est glissée dans le document (« 25 QCM corrigés : Analyse des Profits et Pertes », QCM 1), sans corrigé. La réponse C est la bonne d'après les notions de comptabilité." });

  /* =====================================================================
     CHAPITRE I — Organisation, entreprise, environnement
     ===================================================================== */
  qcm("c1", "Le mot « organisation » vient du grec « organon » qui signifie :",
    ["Ordre", "Outil ou instrument", "Groupe d'hommes", "Hiérarchie"], 1, "Organon = outil, instrument.");
  qcm("c1", "Une organisation est :",
    ["Un groupement humain qui met en commun moyens, efforts et compétences pour atteindre des objectifs communs", "Une entreprise qui recherche uniquement le profit", "Un ensemble de machines", "Une administration publique uniquement"], 0, "Définition du cours. Une organisation n'est pas forcément une entreprise (association, État…).");
  qcm("c1", "Laquelle de ces propositions N'EST PAS une caractéristique d'une organisation ?",
    ["Une division et une coordination des tâches", "Des règles et procédures de fonctionnement", "Une hiérarchie et un contrôle", "La recherche obligatoire du profit"], 3,
    "Les 4 caractéristiques : division/coordination, règles/procédures, hiérarchie/contrôle, stabilité relative. Le profit n'en fait pas partie.");
  qcm("c1", "Selon l'approche macro-économique, l'entreprise est :",
    ["Une firme qui dispose d'un pouvoir d'influence", "Un agent économique qui produit et distribue des richesses dans le circuit économique", "Une organisation qui combine moyens matériels, financiers, humains et informationnels", "Une société de capitaux"], 1, "Macro = circuit économique.");
  qcm("c1", "« Une organisation qui utilise des moyens matériels, financiers, humains et informationnels pour produire, échanger ou faire circuler des biens et services » correspond à l'approche :",
    ["Macro-économique", "Méso-économique", "Micro-économique", "Juridique"], 2, "Micro = les moyens.");
  qcm("c1", "L'approche méso-économique insiste sur :",
    ["Le pouvoir d'influence de la firme", "Les moyens humains de l'entreprise", "Le statut juridique", "La taille de l'entreprise"], 0, "Méso = influence sur les grands équilibres économiques, sociologiques et politiques.");
  qcm("c1", "Une entreprise de transformation du coton en tissu appartient au secteur :",
    ["Primaire", "Secondaire", "Tertiaire", "Quaternaire"], 1, "Transformation = secondaire. La culture du coton serait primaire.");
  qcm("c1", "Une banque appartient au secteur :",
    ["Primaire", "Secondaire", "Tertiaire", "Public obligatoirement"], 2, "Services = tertiaire.");
  qcm("c1", "La classification « entreprise publique / semi-publique / privée » repose sur :",
    ["La taille", "Le secteur d'activité", "La propriété du capital", "La nature juridique"], 2, "On regarde qui détient le capital.");
  qcm("c1", "Pourquoi parle-t-on de « société » dans la classification juridique ?",
    ["Parce que la notion d'entreprise n'est pas reconnue en droit", "Parce que toutes les entreprises sont des SA", "Parce que l'État l'impose", "Parce que la société est plus grande que l'entreprise"], 0, "Le droit ne connaît pas l'entreprise, il connaît la société (de personnes ou de capitaux).");
  qcm("c1", "Les deux grands types de sociétés selon la nature juridique sont :",
    ["Sociétés publiques et privées", "Sociétés de personnes et sociétés de capitaux", "PME et grandes entreprises", "Sociétés civiles et commerciales uniquement"], 1, "");
  qcm("c1", "Les trois groupes de finalités de l'entreprise sont :",
    ["Économiques, sociales/sociétales, techniques/technologiques", "Financières, commerciales, humaines", "Politiques, économiques, légales", "Court, moyen et long terme"], 0, "Moyen mnémotechnique : E-S-T.");
  qcm("c1", "Les flux échangés entre l'entreprise et son environnement sont :",
    ["Réels, financiers et informationnels", "Uniquement financiers", "Humains et matériels", "Fiscaux et sociaux"], 0, "");
  qcm("c1", "Les clients, les fournisseurs et la banque font partie de :",
    ["L'environnement interne", "L'environnement externe", "Du macro-environnement uniquement", "Des finalités"], 1, "Interne = associés, dirigeants, personnel.");
  qcm("c1", "Le macro-environnement regroupe les acteurs et facteurs qui influencent :",
    ["Directement les décisions de l'entreprise", "Indirectement les décisions de l'entreprise", "Uniquement les salariés", "Uniquement les finances"], 1, "Macro = indirect ; micro = direct.");
  vf("c1", "Le micro-environnement regroupe les acteurs et facteurs qui influencent directement les décisions de l'entreprise.", true, "Exemples : clients, fournisseurs, concurrents.");
  vf("c1", "Les associés et le personnel font partie de l'environnement externe de l'entreprise.", false, "Ils font partie de l'environnement INTERNE.");
  vf("c1", "TPE désigne des entités de dimension très modeste.", true, "TPE = très petite entreprise.");
  vf("c1", "L'entreprise subit son environnement mais ne peut pas agir sur lui.", false, "Elle peut agir sur lui et échange avec lui des flux réels, financiers et informationnels.");
  open("c1", "Donne la définition d'une organisation.", "Un groupement humain qui met ensemble ses moyens, ses efforts et ses compétences pour atteindre des objectifs communs.",
    [["groupement", "groupe", "ensemble de personnes"], ["moyen"], ["effort"], ["competence"], ["objectif"]]);
  open("c1", "Cite les 4 caractéristiques d'une organisation.", "Division et coordination des tâches ; règles et procédures de fonctionnement ; hiérarchie et contrôle ; stabilité relative.",
    [["division", "coordination"], ["regle", "procedure"], ["hierarchie", "controle"], ["stabilite"]]);
  open("c1", "Cite les 4 critères de classification (typologie) des entreprises.", "Le secteur d'activité, la taille, la propriété du capital, la nature juridique.",
    [["secteur"], ["taille", "dimension"], ["capital", "propriete"], ["juridique"]]);
  open("c1", "Quelles sont les trois familles de finalités de l'entreprise ?", "Finalités économiques, sociales ou sociétales, techniques ou technologiques.",
    [["econom"], ["social", "societal"], ["techni", "technolog"]]);
  open("c1", "Définis l'environnement de l'entreprise.", "Ensemble d'acteurs et de facteurs internes et externes qui influencent l'entreprise dans sa vie, son fonctionnement et ses décisions ; elle agit en retour sur lui et échange des flux réels, financiers et informationnels.",
    [["acteur"], ["facteur"], ["interne", "externe"], ["influenc"], ["flux", "decision"]]);

  /* =====================================================================
     CHAPITRE II — Management et manager
     ===================================================================== */
  qcm("c2", "Le management se définit comme :",
    ["L'ensemble des méthodes et techniques qui aident l'entrepreneur à diriger, organiser et gérer l'entreprise pour atteindre ses objectifs", "La tenue de la comptabilité", "La gestion des stocks uniquement", "L'art de vendre"], 0, "");
  qcm("c2", "En quelle période le terme « management » est-il utilisé en Angleterre pour désigner la direction d'une entreprise ?",
    ["1768-1770", "1868-1870", "1907-1910", "1945-1950"], 1, "Angleterre : 1868-1870 ; États-Unis : 1907-1910 avec le « scientific management ».");
  qcm("c2", "L'expression « scientific management » apparaît aux États-Unis vers :",
    ["1868-1870", "1907-1910", "1929", "1960"], 1, "");
  qcm("c2", "Selon une origine étymologique, « managgiare » en italien signifie :",
    ["Conduire un bateau", "Manier ou dresser un cheval", "Commander une armée", "Compter l'argent"], 1, "Manager = conducteur de bateau ; managgiare = manier un cheval ; latin = la main.");
  qcm("c2", "La gestion est un acte tourné essentiellement vers :",
    ["Les hommes", "Les moyens", "L'environnement", "La vision"], 1, "Gérer = optimiser les moyens sous contraintes techniques.");
  qcm("c2", "Le management met en évidence deux dimensions importantes :",
    ["Vendre et produire", "Gérer les moyens et diriger les hommes", "Planifier et budgétiser", "Recruter et licencier"], 1, "C'est la grande différence avec la gestion.");
  qcm("c2", "« Voir globalement et agir localement » caractérise :",
    ["La gestion", "Le management", "La comptabilité", "La production"], 1, "Le management implique création, transgression des contraintes techniques, vision globale.");
  qcm("c2", "Le management est considéré comme un ART parce qu'il fait appel :",
    ["À des outils statistiques", "Aux qualités personnelles du manager (intuition, flair, charisme…)", "À la comptabilité", "À des lois scientifiques"], 1, "");
  qcm("c2", "Le management est considéré comme une SCIENCE parce qu'il :",
    ["Repose uniquement sur l'intuition", "S'appuie sur des méthodes quantifiables et des outils multidisciplinaires", "Dépend du charisme", "Est enseigné à l'université"], 1, "Comptabilité, maths, statistique, informatique, sociologie, psychologie…");
  qcm("c2", "Les quatre piliers du système de management sont :",
    ["Planification, organisation, direction, contrôle", "Production, vente, finance, RH", "Vision, mission, valeurs, objectifs", "Prévoir, commander, coordonner, sanctionner"], 0, "P-O-D-C.");
  qcm("c2", "Lequel de ces éléments ne fait PAS partie des 4 piliers du management ?",
    ["La planification", "Le contrôle", "La direction", "La comptabilité"], 3, "");
  qcm("c2", "Le manager doit répondre aux objectifs de :",
    ["Flexibilité et réactivité", "Rigidité et stabilité", "Profit immédiat", "Centralisation totale"], 0, "Face à un environnement en perpétuelle évolution.");
  qcm("c2", "Laquelle de ces tâches fait partie des 10 tâches du manager ?",
    ["Déléguer", "Tenir la caisse", "Nettoyer les locaux", "Rédiger les statuts"], 0, "Organiser, animer, motiver, communiquer, déléguer, gérer, analyser, décider, prévoir, contrôler.");
  qcm("c2", "Un manager qui décide seul et impose ses décisions est :",
    ["Démocratique", "Permissif", "Autoritaire (autocratique)", "Participatif"], 2, "");
  qcm("c2", "Un manager « laisser-faire » est :",
    ["Autoritaire", "Permissif", "Participatif", "Directif"], 1, "");
  qcm("c2", "Un manager démocratique est aussi appelé :",
    ["Autocratique", "Participatif", "Permissif", "Bureaucratique"], 1, "");
  qcm("c2", "Selon la dimension hiérarchique, les trois niveaux de managers sont :",
    ["Top managers, managers intermédiaires, managers de première ligne", "Directeurs, ouvriers, stagiaires", "Stratèges, tacticiens, exécutants", "PDG, DG, DRH"], 0, "");
  qcm("c2", "Les deux types de management sont :",
    ["Le management stratégique et le management opérationnel", "Le management public et privé", "Le management autoritaire et participatif", "Le management financier et commercial"], 0, "");
  vf("c2", "Gérer, c'est optimiser et atteindre les objectifs de l'entreprise en minimisant les ressources mises en œuvre.", true, "Définition du cours.");
  vf("c2", "Le management et la gestion sont exactement la même chose.", false, "Le management ajoute la dimension humaine (diriger les hommes) et la création.");
  vf("c2", "Le management est à la fois un art et une science.", true, "");
  vf("c2", "Le manager a la responsabilité de répartir et de coordonner les tâches de ses subordonnés.", true, "");
  vf("c2", "La persévérance et le flair montrent que le management est une science.", false, "Ce sont des qualités personnelles : elles montrent que le management est un ART.");
  open("c2", "Définis le management.", "L'ensemble des méthodes et techniques qui aident l'entrepreneur à diriger, organiser et gérer l'entreprise afin de réaliser les objectifs qu'elle s'est fixés.",
    [["methode", "technique"], ["diriger"], ["organiser"], ["gerer"], ["objectif"]]);
  open("c2", "Quelle est la différence entre management et gestion ?", "La gestion est tournée vers les moyens (optimiser les ressources sous contraintes). Le management va plus loin : création, transgression des contraintes, voir globalement et agir localement ; il a deux dimensions : gérer les moyens ET diriger les hommes.",
    [["moyen"], ["homme", "humain", "diriger"], ["global", "creation", "contrainte"]]);
  open("c2", "Pourquoi dit-on que le management est un art ?", "Parce qu'il fait appel aux qualités personnelles du manager : attitude, intuition, valeurs, flair, persévérance, ténacité, bon sens, expérience, charisme.",
    [["qualite", "personnel"], ["intuition", "flair", "charisme", "experience", "tenacite", "perseverance"]]);
  open("c2", "Pourquoi dit-on que le management est une science ?", "Parce qu'il repose sur une démarche normative, des méthodes scientifiques quantifiables et des outils multidisciplinaires (comptabilité, mathématiques, statistique, informatique, sociologie, psychologie).",
    [["normati", "methode", "scientifique"], ["quantifi", "outil"], ["comptab", "statisti", "mathemat", "informati", "psycholog", "sociolog"]]);
  open("c2", "Cite les 4 piliers du management.", "Planification, organisation, direction, contrôle.",
    [["planif", "prevoir"], ["organis"], ["direction", "diriger"], ["controle"]]);
  open("c2", "Cite les 3 profils (types) de manager.", "Autoritaire (autocratique), permissif (laisser-faire), démocratique (participatif).",
    [["autoritaire", "autocrat"], ["permissif", "laisser"], ["democrat", "participatif"]]);
  open("c2", "Cite au moins 6 des 10 tâches du manager.", "Organiser, animer, motiver, communiquer, déléguer, gérer, analyser, décider, prévoir, contrôler.",
    [["organis"], ["anim"], ["motiv"], ["communiq"], ["deleg"], ["gere", "gerer"], ["analys"], ["decid"], ["prevoi", "prevoir"], ["control"]]);

  /* =====================================================================
     CHAPITRE III — Fondamentaux de l'entreprise
     ===================================================================== */
  qcm("c3", "Quelle forme juridique est la plus adaptée à une grande entreprise qui veut entrer en bourse ?",
    ["SARL", "EURL", "SA", "SCI"], 2, "");
  qcm("c3", "Dans une SARL, le nombre d'associés est limité à :",
    ["2", "7", "50", "100"], 3, "");
  qcm("c3", "Quelle forme juridique permet aux associés de personnaliser librement ses règles de fonctionnement, sans limite d'associés ?",
    ["SARL", "SAS", "EARL", "SCI"], 1, "La SAS est la forme la plus souple et attire les investisseurs.");
  qcm("c3", "Une EURL est :",
    ["Une SA à un seul actionnaire", "Une SARL constituée d'un seul associé", "Une entreprise agricole", "Une société immobilière"], 1, "U = unipersonnelle.");
  qcm("c3", "Une SASU est :",
    ["Une SAS avec un associé unique", "Une SARL familiale", "Une société publique", "Une société civile"], 0, "");
  qcm("c3", "La SCI est créée principalement pour :",
    ["Exploiter une ferme", "Acquérir et gérer un patrimoine immobilier", "Entrer en bourse", "Exporter"], 1, "");
  qcm("c3", "Le principal avantage de l'EARL est :",
    ["L'entrée en bourse", "La facilité de transmission de l'exploitation agricole entre générations", "L'absence de capital", "La gestion d'immeubles"], 1, "");
  qcm("c3", "Le business model répond principalement à la question :",
    ["Combien d'employés recruter ?", "Comment l'entreprise gagne-t-elle de l'argent ?", "Où installer le siège ?", "Quel statut juridique choisir ?"], 1, "Lecocq et al., 2006.");
  qcm("c3", "Les trois piliers du business model sont :",
    ["Proposition de valeur, architecture de valeur, équation de profit", "Produit, prix, promotion", "Vision, mission, valeurs", "Forces, faiblesses, menaces"], 0, "");
  qcm("c3", "La proposition de valeur répond aux questions :",
    ["Quoi ? Qui ? Combien ?", "Comment ? Avec qui ?", "Où ? Quand ?", "Pourquoi ? Pour qui ?"], 0, "Quoi = l'offre ; qui = le client ; combien = le prix.");
  qcm("c3", "L'architecture de valeur répond à la question :",
    ["Quoi ?", "Qui ?", "Comment ?", "Combien ?"], 2, "Comment l'entreprise élabore et délivre sa proposition de valeur (chaîne de valeur, ressources, compétences).");
  qcm("c3", "L'équation de profit comprend :",
    ["La structure de coûts, les revenus et les capitaux engagés", "Les clients et les canaux", "La vision et les valeurs", "Les fournisseurs uniquement"], 0, "");
  qcm("c3", "Pour un médicament remboursé, le médecin est :",
    ["L'utilisateur", "Le payeur", "Le prescripteur", "Le fournisseur"], 2, "Patient = utilisateur ; mutuelle/sécurité sociale = payeur ; médecin = prescripteur.");
  qcm("c3", "Dans le modèle de Google, qui est le principal payeur ?",
    ["L'internaute", "Les annonceurs publicitaires", "L'État", "Les développeurs"], 1, "L'internaute utilise gratuitement ; l'annonceur paie pour toucher une audience ciblée.");
  qcm("c3", "Dans le modèle RCOV, le « O » signifie :",
    ["Offre", "Organisation interne et externe", "Objectif", "Opportunité"], 1, "Ressources et Compétences, Organisation, proposition de Valeur.");
  qcm("c3", "Le modèle RCOV a été proposé par :",
    ["Lecocq, Demil et Warnier", "Kaplan et Norton", "Porter", "Ansoff"], 0, "2006.");
  qcm("c3", "Dans le business model d'une compagnie aérienne low cost, le chiffre d'affaires est obtenu grâce :",
    ["Aux prix élevés", "Au volume", "Aux services à bord", "Aux subventions"], 1, "Prix très bas, vol sans service, avions identiques, hôtesses multitâches, nombreuses rotations → CA grâce au volume.");
  qcm("c3", "Le moteur clé du modèle d'Airbnb est :",
    ["La publicité", "L'effet de réseau", "La vente de logements", "Les subventions publiques"], 1, "Plus de logements attirent les voyageurs, plus de voyageurs attirent les hôtes.");
  qcm("c3", "Comment Uber se rémunère-t-il principalement ?",
    ["En vendant des voitures", "En prélevant une commission sur les courses", "Par la publicité", "Par des abonnements obligatoires"], 1, "");
  qcm("c3", "Selon le cours, pour Airbnb, Uber et Google, « le véritable produit vendu » est :",
    ["La technologie", "La confiance", "Le logement", "La publicité"], 1, "Avis, évaluations, garanties et assistance permettent à des inconnus de faire une transaction.");
  qcm("c3", "Dans le Business Model Canvas, quel bloc désigne précisément les clients et utilisateurs visés ?",
    ["Segments de clientèle", "Canaux", "Relations clients", "Partenaires clés"], 0, "");
  qcm("c3", "Dans le Business Model Canvas, « comment l'entreprise fidélise-t-elle ses clients ? » relève du bloc :",
    ["Canaux", "Relations avec le client", "Activités clés", "Flux de revenus"], 1, "");
  qcm("c3", "Les brevets, les usines et la marque de Nespresso sont des :",
    ["Activités clés", "Ressources clés", "Partenaires clés", "Canaux"], 1, "Ce que l'entreprise POSSÈDE = ressources.");
  qcm("c3", "Les cultivateurs de café et les fabricants de machines sont, pour Nespresso, des :",
    ["Segments de clientèle", "Partenaires clés", "Ressources clés", "Canaux"], 1, "");
  qcm("c3", "Les blocs « partenaires clés, activités clés, ressources clés » forment le côté :",
    ["Délivrance de l'offre", "Infrastructure de l'offre", "Financier", "Client"], 1, "Côté droit = délivrance (segments, relations, canaux).");
  qcm("c3", "Combien de blocs compte le Business Model Canvas ?",
    ["3", "5", "7", "9"], 3, "");
  qcm("c3", "Laquelle de ces questions fait partie des 7 questions fondamentales d'une entreprise ?",
    ["Comment l'entreprise crée-t-elle de la valeur ?", "Quel est l'âge du dirigeant ?", "Combien de bureaux possède-t-elle ?", "Quelle est la couleur du logo ?"], 0, "");
  vf("c3", "Dans une SAS, l'entrée et la sortie des associés sont soumises à des procédures strictes.", false, "C'est le cas de la SARL. Dans la SAS, elles sont facilitées.");
  vf("c3", "Dans la SARL, les entrées et sorties d'associés sont soumises à des procédures strictes.", true, "");
  vf("c3", "Celui qui utilise un produit est toujours celui qui le paie.", false, "Exemple : le patient utilise le médicament mais c'est la mutuelle qui paie.");
  vf("c3", "Pour Nespresso, la vente de capsules est un flux de revenus.", true, "Vente de machines et vente de capsules.");
  vf("c3", "La structure des coûts décrit la manière dont l'entreprise fait des profits.", false, "C'est le rôle des FLUX DE REVENUS. La structure des coûts décrit les dépenses.");
  open("c3", "Donne une définition du business model.", "Réponse à la question « comment l'entreprise gagne-t-elle de l'argent ? » ; ensemble de descripteurs sur la façon dont l'entreprise s'organise pour créer et distribuer de la valeur de façon profitable.",
    [["argent", "profit", "rentab"], ["valeur"], ["creer", "cree", "distribu", "organis"]]);
  open("c3", "Cite les 3 piliers du business model.", "La proposition de valeur, l'architecture de valeur, l'équation de profit.",
    [["proposition"], ["architecture"], ["equation", "profit"]]);
  open("c3", "Cite les 9 blocs du Business Model Canvas.", "Partenaires clés, activités clés, ressources clés, proposition de valeur, relations clients, canaux, segments de clientèle, structure des coûts, flux de revenus.",
    [["partenaire"], ["activite"], ["ressource"], ["proposition"], ["relation"], ["canaux", "canal"], ["segment"], ["cout"], ["revenu"]]);
  open("c3", "Que signifie RCOV ?", "Ressources et Compétences, Organisation (interne et externe), proposition de Valeur.",
    [["ressource"], ["competence"], ["organisation"], ["valeur"]]);
  open("c3", "Distingue utilisateur, payeur et prescripteur avec un exemple.", "L'utilisateur consomme le produit, le payeur le finance, le prescripteur recommande ou décide. Ex. médicament : patient (utilisateur), sécurité sociale/mutuelle (payeur), médecin (prescripteur).",
    [["utilis"], ["payeur", "paie", "paye"], ["prescri"]]);
  open("c3", "Cite au moins 4 des 7 questions fondamentales pour une entreprise.", "Que vend-elle ? À qui ? Où ? À combien ? Combien compte-t-elle gagner ? Comment crée-t-elle de la valeur ? Quel est son contexte et son environnement ?",
    [["vend", "quoi"], ["qui"], ["ou ", "endroit", "lieu"], ["combien", "prix"], ["gagner"], ["valeur", "comment"], ["contexte", "environnement"]]);

  /* =====================================================================
     CHAPITRE IV — Management stratégique
     ===================================================================== */
  qcm("c4", "Le mot « stratégie » vient du grec « stratos » et « agos » qui signifient :",
    ["Armée / je conduis", "Plan / je décide", "Guerre / je gagne", "Peuple / je gouverne"], 0, "Origine militaire.");
  qcm("c4", "La stratégie désigne :",
    ["L'ensemble des choix qui orientent l'entreprise à moyen/long terme vers ses objectifs", "La gestion quotidienne des stocks", "Le recrutement du personnel", "Le calcul du résultat comptable"], 0, "");
  qcm("c4", "Lequel de ces éléments N'EST PAS une raison d'avoir une stratégie selon le cours ?",
    ["Donner du sens et faire adhérer les parties prenantes", "Donner un cap pour mobiliser les équipes", "Mieux maîtriser le devenir de l'entreprise", "Supprimer toute incertitude"], 3, "On ne supprime pas l'incertitude, on l'anticipe et on la subit moins.");
  qcm("c4", "Le raisonnement stratégique va :",
    ["Du court terme vers le long terme", "De l'interne vers l'externe", "Du long terme vers le court terme", "De l'action vers l'objectif"], 2, "Long → court ; global → proximité ; externe → interne ; aval → amont ; objectif → action.");
  qcm("c4", "« Think global, act local » correspond au raisonnement :",
    ["Du global vers la proximité", "De l'externe vers l'interne", "De l'amont vers l'aval", "De l'action vers l'objectif"], 0, "Dans le cours (raisonnement stratégique), « think global, act local » illustre le 2e point : du global vers la proximité.");
  qcm("c4", "La question fondamentale des associés dans le cadre de référence est :",
    ["Combien allons-nous gagner cette année ?", "Que voulons-nous faire ensemble de cette entreprise ?", "Qui sera le prochain directeur ?", "Quel logiciel acheter ?"], 1, "");
  qcm("c4", "« Quelle est la raison d'être de l'entreprise ? » renvoie à :",
    ["La mission", "La vision", "Les valeurs", "Le budget"], 0, "Mission = raison d'être ; vision = où on va ; valeurs = comment on collabore.");
  qcm("c4", "« Être la banque de référence en Afrique » est un exemple de :",
    ["Mission", "Vision", "Valeur", "Objectif opérationnel"], 1, "C'est une ambition, un futur désiré : la vision.");
  qcm("c4", "« Intégrité, confiance, responsabilité » sont des exemples de :",
    ["Missions", "Valeurs", "Visions", "FCS"], 1, "");
  qcm("c4", "« Financer les particuliers et les entreprises, notamment les PME/PMI » est un exemple de :",
    ["Vision", "Mission", "Valeur", "Menace"], 1, "Ce que l'entreprise fait, sa raison d'être.");
  qcm("c4", "Dans PESTEL, le « L » signifie :",
    ["Logistique", "Législatif / légal", "Local", "Leadership"], 1, "");
  qcm("c4", "Une nouvelle loi sur la protection des données relève du facteur PESTEL :",
    ["Politique", "Technologique", "Légal", "Socioculturel"], 2, "Une loi = facteur légal (législatif). La stabilité du gouvernement serait politique.");
  qcm("c4", "La hausse du taux d'inflation relève du facteur :",
    ["Économique", "Politique", "Écologique", "Légal"], 0, "");
  qcm("c4", "Le développement du paiement mobile relève du facteur :",
    ["Socioculturel", "Technologique", "Politique", "Écologique"], 1, "");
  qcm("c4", "Le changement climatique et la gestion des déchets relèvent du facteur :",
    ["Économique", "Écologique (environnemental)", "Légal", "Politique"], 1, "");
  qcm("c4", "En économie de production :",
    ["Offre > demande", "Offre = demande", "Offre < demande", "Il n'y a pas de demande"], 2, "Il suffit de produire pour vendre.");
  qcm("c4", "En économie de marché, qui domine ?",
    ["Le producteur", "Le distributeur", "Le consommateur", "L'État"], 2, "Offre > demande : concurrence exacerbée, il faut se différencier.");
  qcm("c4", "En économie de distribution, le pouvoir appartient :",
    ["Aux experts techniques", "Aux commerciaux", "Aux consommateurs", "Aux banques"], 1, "");
  qcm("c4", "Les facteurs clés de succès de l'économie d'environnement sont :",
    ["Capacité de production, standardisation", "Réseau de distribution, force de vente", "Stratégie, prospective, agilité, communication", "Prix bas uniquement"], 2, "");
  qcm("c4", "Le raisonnement « de l'aval vers l'amont » apparaît à partir de :",
    ["L'économie de production", "L'économie de distribution", "L'économie de marché", "Aucune"], 2, "En production et distribution, on raisonne de l'amont vers l'aval.");
  qcm("c4", "« Savoir décider tout en doutant » et « choisir donc renoncer » relèvent des capacités de :",
    ["Diagnostic", "Projection prospective", "Décision", "Animation"], 2, "");
  qcm("c4", "« Savoir formaliser une vision ambitieuse et identifier les scénarios du futur » relève des capacités de :",
    ["Diagnostic", "Projection prospective", "Décision", "Animation"], 1, "");
  qcm("c4", "La démarche stratégique comprend dans l'ordre :",
    ["Mise en œuvre, prospective, problématique", "Problématique (diagnostic), prospective (scénarios), mise en œuvre", "Prospective, diagnostic, contrôle", "Budget, plan, action"], 1, "");
  qcm("c4", "Un DAS (domaine d'activité stratégique) est :",
    ["Un service administratif", "Un couple offre/clients avec son propre univers concurrentiel et ses propres FCS", "Un segment marketing", "Un centre de coût"], 1, "");
  qcm("c4", "Un DAS est toujours :",
    ["Un centre de coût", "Un centre de profit", "Une filiale", "Une BU"], 1, "Jamais un centre de coût. Et ne pas confondre DAS et BU.");
  qcm("c4", "Les FCS sont :",
    ["Les avantages propres à mon entreprise", "Les compétences/ressources que tout compétiteur doit maîtriser pour réussir sur le marché", "Les forces de la SWOT", "Les flux de capitaux"], 1, "À ne pas confondre avec l'avantage concurrentiel.");
  qcm("c4", "Le tri-axe d'Abell définit un DAS selon :",
    ["Qui (clients), quoi (offre), comment (technologie)", "Prix, produit, place", "Forces, faiblesses, menaces", "Court, moyen, long terme"], 0, "");
  qcm("c4", "Découper la clientèle d'un DAS en groupes selon les besoins et comportements d'achat relève de la segmentation :",
    ["Stratégique", "Marketing", "Juridique", "Financière"], 1, "La segmentation stratégique découpe l'entreprise en DAS.");
  qcm("c4", "Un DAS de type « banalisation de l'offre » a pour FCS :",
    ["Innovation et image", "Volume de production, standardisation, productivité", "Open innovation et marketing", "Personnalisation"], 1, "");
  qcm("c4", "Un DAS de type « savoir-faire différenciateur » répond à une attente de :",
    ["Prix bas", "Fonctionnalité spécifique et offre distinctive", "Offre standard", "Production de masse"], 1, "");
  qcm("c4", "L'attractivité d'un DAS est évaluée notamment avec :",
    ["Les 5 forces de Porter", "La pyramide de Maslow", "Le PDCA", "Le diagramme d'Ishikawa"], 0, "");
  qcm("c4", "Les barrières à l'entrée citées dans le cours sont :",
    ["Réglementation, technologie, intensité capitalistique", "Prix, produit, promotion", "Salaire, statut, sécurité", "Vision, mission, valeurs"], 0, "");
  qcm("c4", "Pour évaluer la compétitivité de l'entreprise sur un DAS, on note la maîtrise de chaque FCS :",
    ["De 0 à 20", "De −5 à +5 par rapport au principal concurrent", "En pourcentage du CA", "De A à E"], 1, "Avec un coefficient de pondération par FCS (par ordre décroissant d'importance).");
  qcm("c4", "La matrice McKinsey croise :",
    ["Croissance du marché et part de marché", "Attractivité du marché et compétitivité de l'entreprise", "Produits et marchés", "Probabilité et impact"], 1, "Croissance × part de marché = BCG ; produits × marchés = Ansoff.");
  qcm("c4", "Dans la matrice McKinsey, un DAS à forte attractivité et compétitivité élevée appelle à :",
    ["Abandonner", "Conforter son leadership", "Se désengager progressivement", "Maximiser la profitabilité"], 1, "");
  qcm("c4", "Dans la matrice McKinsey, un DAS à faible attractivité et faible compétitivité appelle à :",
    ["Conforter son leadership", "Investir massivement", "Abandonner, désinvestir", "Segmenter"], 2, "Logique de repli.");
  qcm("c4", "Dans la matrice McKinsey, un DAS à faible attractivité mais compétitivité élevée appelle à :",
    ["Maximiser la profitabilité, générer du cash, optimiser les coûts", "Abandonner immédiatement", "Investir sur les FCS", "Se retirer sélectivement"], 0, "Logique de maintien : on « trait » l'activité.");
  qcm("c4", "Les 4 logiques stratégiques de la matrice McKinsey sont :",
    ["Développement, maintien, repli, interrogation", "Vedettes, vaches à lait, dilemmes, poids morts", "Pénétration, développement, diversification, intégration", "Forces, faiblesses, opportunités, menaces"], 0, "La 2e liste = BCG, la 3e ressemble à Ansoff, la 4e = SWOT.");
  qcm("c4", "Dans la matrice McKinsey, la case « forte attractivité / faible compétitivité » correspond à la logique :",
    ["Développement", "Maintien", "Repli", "Interrogation"], 3, "Investir sélectivement (segmenter) ou abandonner : on s'interroge.");
  qcm("c4", "Une faiblesse dans une analyse SWOT est :",
    ["Un facteur interne défavorable", "Un facteur externe défavorable", "Un facteur interne favorable", "Un facteur externe favorable"], 0, "Facteur externe défavorable = menace.");
  qcm("c4", "« L'arrivée d'un nouveau concurrent étranger » est, dans une SWOT :",
    ["Une force", "Une faiblesse", "Une opportunité", "Une menace"], 3, "Externe et défavorable.");
  qcm("c4", "« Une réglementation favorable » est, dans une SWOT :",
    ["Une force", "Une faiblesse", "Une opportunité", "Une menace"], 2, "");
  qcm("c4", "« Le monosourcing (dépendance à un seul fournisseur) » est, dans une SWOT :",
    ["Une force", "Une faiblesse", "Une opportunité", "Une menace"], 1, "C'est une situation interne défavorable.");
  qcm("c4", "« Des employés qualifiés et des brevets technologiques » sont des :",
    ["Forces", "Faiblesses", "Opportunités", "Menaces"], 0, "");
  qcm("c4", "« Un turnover du personnel important » est :",
    ["Une force", "Une faiblesse", "Une opportunité", "Une menace"], 1, "");
  qcm("c4", "Dans le radar de dépendances, une note de 7 sur 10 traduit une dépendance :",
    ["Faible", "Moyenne", "Forte", "Nulle"], 2, "1-4 faible ; 5-6 moyenne ; 7-10 forte.");
  qcm("c4", "Dans le radar de dépendances, une note de 5 traduit une dépendance :",
    ["Faible", "Moyenne", "Forte", "Critique"], 1, "");
  qcm("c4", "La rentabilité financière se calcule par :",
    ["Résultat net / capitaux propres", "Résultat d'exploitation / chiffre d'affaires", "Capitaux propres / dettes", "CA / effectif"], 0, "La rentabilité économique (ROCE) = résultat d'exploitation après impôt / capitaux investis.");
  qcm("c4", "La trésorerie se calcule par :",
    ["FR + BFR", "FR − BFR", "BFR − FR", "CA − charges"], 1, "Trésorerie = Fonds de roulement − Besoin en fonds de roulement.");
  qcm("c4", "Le projet A coûte 100 M et rapporte 12 M de bénéfice ; le projet B coûte 15 M et rapporte 8 M. Lequel est le plus rentable ?",
    ["A, car le bénéfice est plus élevé", "B, car sa rentabilité est d'environ 53 % contre 12 % pour A", "Les deux se valent", "On ne peut pas savoir"], 1, "Rentabilité = bénéfice / investissement : A = 12/100 = 12 % ; B = 8/15 ≈ 53 %.");
  qcm("c4", "Dans la matrice d'Ansoff, vendre un produit existant sur un nouveau marché (export) est :",
    ["Une pénétration de marché", "Un développement de marché", "Un développement de produit", "Une diversification"], 1, "");
  qcm("c4", "Dans la matrice d'Ansoff, lancer un nouveau produit pour ses clients actuels est :",
    ["Une pénétration de marché", "Un développement de marché", "Un développement de produit", "Une diversification"], 2, "");
  qcm("c4", "Quelle stratégie d'Ansoff présente le risque le plus faible ?",
    ["Pénétration de marché", "Développement de marché", "Développement de produit", "Diversification"], 0, "Produit et marché déjà connus.");
  qcm("c4", "Quelle stratégie d'Ansoff présente le risque le plus élevé ?",
    ["Pénétration de marché", "Développement de marché", "Développement de produit", "Diversification"], 3, "Nouveau produit et nouveau marché.");
  qcm("c4", "Une diversification sans aucun rapport avec le métier d'origine est dite :",
    ["Liée", "Conglomérale (non liée)", "Horizontale", "Concentrique"], 1, "");
  qcm("c4", "Une campagne promotionnelle et une baisse de prix pour gagner des parts de marché auprès des clients actuels correspond à :",
    ["Pénétration de marché", "Diversification", "Développement de produit", "Développement de marché"], 0, "");
  qcm("c4", "Lequel de ces critères sert à évaluer et comparer les scénarios stratégiques ?",
    ["La réversibilité (mesure du risque)", "La couleur du logo", "L'âge des salariés", "Le nombre de bureaux"], 0, "7 critères : cohérence avec le CRF, attractivité, accessibilité aux FCS, impact économique et financier, acceptabilité, réversibilité, impacts prévisibles.");
  vf("c4", "La stratégie est d'origine militaire.", true, "Stratos = armée ; agos = je conduis.");
  vf("c4", "Le raisonnement stratégique va de l'interne vers l'externe.", false, "Il va de l'EXTERNE vers l'interne.");
  vf("c4", "Les FCS et l'avantage concurrentiel sont la même chose.", false, "FCS = ce que tous doivent maîtriser ; avantage concurrentiel = ce qui distingue une entreprise.");
  vf("c4", "Un DAS peut être un centre de coût.", false, "Un DAS est toujours un centre de profit.");
  vf("c4", "En économie de marché, l'offre est supérieure à la demande.", true, "");
  vf("c4", "La matrice McKinsey croise la croissance du marché et la part de marché relative.", false, "Ça, c'est la matrice BCG. McKinsey croise attractivité et compétitivité.");
  vf("c4", "Dans la SWOT, les opportunités et les menaces sont des facteurs externes.", true, "");
  vf("c4", "La diversification est la stratégie d'Ansoff la moins risquée.", false, "C'est la plus risquée.");
  vf("c4", "PESTEL sert à analyser le macro-environnement de l'entreprise.", true, "");
  vf("c4", "Il ne faut pas confondre segmentation stratégique et segmentation marketing.", true, "");
  open("c4", "Donne la définition de la stratégie (avec son étymologie).", "Du grec stratos (armée) et agos (je conduis). La stratégie est l'ensemble des choix qui orientent une entreprise sur le moyen et/ou long terme vers la réalisation de ses objectifs.",
    [["stratos", "armee"], ["agos", "conduis", "conduire"], ["choix"], ["long terme", "moyen", "long"], ["objectif"]]);
  open("c4", "Que signifie chaque lettre de PESTEL ?", "Politique, Économique, Socioculturel (sociologique), Technologique, Écologique, Légal (législatif).",
    [["politique"], ["economique"], ["socio"], ["technolog"], ["ecolog", "environnement"], ["legal", "legislatif"]]);
  open("c4", "Que signifie SWOT ?", "Strengths (forces), Weaknesses (faiblesses), Opportunities (opportunités), Threats (menaces). Forces et faiblesses = interne ; opportunités et menaces = externe.",
    [["force", "strength"], ["faiblesse", "weakness"], ["opportunit"], ["menace", "threat"]]);
  open("c4", "Cite les 5 forces de Porter.", "Menace des nouveaux entrants, pouvoir de négociation des fournisseurs, pouvoir de négociation des clients, menace des produits de substitution, rivalité entre concurrents existants.",
    [["entrant"], ["fournisseur"], ["client"], ["substitu"], ["rivalite", "concurren"]]);
  open("c4", "Qu'est-ce qu'un facteur clé de succès (FCS) ?", "Une compétence et/ou une ressource que tout compétiteur doit maîtriser pour réussir sur le marché (à ne pas confondre avec l'avantage concurrentiel).",
    [["competence", "ressource"], ["tout", "chaque", "competiteur", "concurrent"], ["maitris"], ["reussi", "marche"]]);
  open("c4", "Qu'est-ce qu'un DAS ?", "Un domaine d'activité stratégique : un couple offre/clients qui a son propre univers concurrentiel, ses propres FCS, des compétences spécifiques, des flux économiques distincts et qui peut fonctionner de manière autonome. C'est toujours un centre de profit.",
    [["domaine", "activite"], ["offre", "client", "couple"], ["fcs", "facteur", "concurren"], ["profit", "autonom"]]);
  open("c4", "Cite les 4 stratégies de la matrice d'Ansoff.", "Pénétration de marché, développement de marché, développement de produit, diversification.",
    [["penetration"], ["developpement de marche", "developpement du marche", "developpement marche"], ["developpement de produit", "developpement du produit", "developpement produit"], ["diversification"]]);
  open("c4", "Quelles sont les 4 logiques stratégiques de la matrice McKinsey ?", "Développement, maintien, repli, interrogation.",
    [["developpement"], ["maintien"], ["repli"], ["interrogation"]]);
  open("c4", "Quels sont les 3 temps de la démarche stratégique ?", "1) Problématique : analyse et diagnostic stratégique ; 2) prospective : scénarios, choix du scénario pertinent ; 3) mise en œuvre : quantifier, planifier, piloter (plan d'action, business plan).",
    [["diagnostic", "problematique", "analyse"], ["prospective", "scenario"], ["mise en oeuvre", "plan", "pilot"]]);
  open("c4", "Quelle différence entre segmentation stratégique et segmentation marketing ?", "La segmentation stratégique découpe l'activité de l'entreprise en DAS (couples offre/clients selon les FCS) pour allouer les ressources. La segmentation marketing découpe la clientèle d'un DAS en segments selon les besoins et comportements d'achat pour ajuster l'offre.",
    [["das", "domaine"], ["ressource", "allocation", "fcs"], ["segment", "client"], ["besoin", "comportement", "achat"]]);
  open("c4", "Cite les compétences du dirigeant stratège.", "Capacités de diagnostic, de projection prospective, de décision et d'animation.",
    [["diagnostic"], ["prospective", "projection"], ["decision"], ["animation"]]);
  open("c4", "Cite les 3 axes de l'analyse financière vus en cours.", "La performance économique, la santé financière, l'équilibre de trésorerie.",
    [["performance"], ["sante"], ["tresorerie"]]);
  ordre("c4", "Remets dans l'ordre le raisonnement stratégique, en commençant par l'horizon de temps.",
    ["Du long terme vers le court terme", "Du global vers la proximité", "De l'externe vers l'interne", "De l'aval vers l'amont", "De l'objectif vers l'action"], "Ordre du cours (5 étapes).");
  ordre("c4", "Remets dans l'ordre l'évolution historique des contextes économiques.",
    ["Économie de production (O < D)", "Économie de distribution (O = D)", "Économie de marché (O > D)", "Économie d'environnement (O > D + PESTEL)"], "");
  ordre("c4", "Remets dans l'ordre les étapes de l'évaluation du positionnement stratégique.",
    ["Vocation de l'entreprise (cadre de référence)", "Segmentation stratégique (DAS)", "Attractivité de chaque DAS", "Compétitivité de l'entreprise sur chaque DAS", "Équilibre du portefeuille d'activités"], "");
  ordre("c4", "Classe les stratégies d'Ansoff du risque le plus faible au plus élevé.",
    ["Pénétration de marché", "Développement de marché", "Développement de produit", "Diversification"], "Faible → modéré → modéré à élevé → élevé à très élevé.");

  /* =====================================================================
     CHAPITRE V — Management opérationnel
     ===================================================================== */
  qcm("c5", "La structure de l'entreprise implique :",
    ["La division du travail, le rôle de chacun, les rapports entre les membres", "Uniquement le capital social", "Le choix du logo", "Les prix de vente"], 0, "");
  qcm("c5", "L'organigramme représente :",
    ["La répartition formelle et officielle des attributions et des liens hiérarchiques", "Les comptes de l'entreprise", "Le plan marketing", "Les relations informelles entre amis"], 0, "");
  qcm("c5", "Lequel de ces facteurs influence le choix de la structure ?",
    ["La taille de l'entreprise", "La couleur des locaux", "Le prénom du dirigeant", "La météo"], 0, "Âge, technique, environnement, taille, stratégie, style de management.");
  qcm("c5", "La structure « staff and line » est aussi appelée :",
    ["Structure divisionnaire", "Structure hiérarchico-fonctionnelle", "Structure matricielle", "Structure par projet"], 1, "C'est une structure fonctionnelle évoluée.");
  qcm("c5", "Une structure organisée en divisions par produit, par marché ou par projet est :",
    ["Fonctionnelle", "Divisionnaire", "Matricielle", "Staff and line"], 1, "");
  qcm("c5", "Dans quelle structure un salarié a-t-il un double rattachement (fonction + division) ?",
    ["Fonctionnelle simple", "Divisionnaire", "Matricielle", "Hiérarchique"], 2, "");
  qcm("c5", "Selon Peter Drucker, le management opérationnel se concentre sur :",
    ["La création de valeur", "L'efficacité dans le travail quotidien des activités de l'entreprise", "L'art de faire des gens une réalité opérationnelle", "L'exécution des plans"], 1, "");
  qcm("c5", "Pour Henri Fayol, le management opérationnel est principalement lié à :",
    ["L'exécution des plans de l'entreprise", "La création de valeur", "Le côté humain", "La stratégie concurrentielle"], 0, "");
  qcm("c5", "Mary Parker Follett définit le management opérationnel comme :",
    ["L'exécution des plans", "L'art de faire des gens une réalité opérationnelle", "La création de valeur", "La réduction des coûts"], 1, "Elle met l'accent sur le côté humain.");
  qcm("c5", "Pour Michael Porter, le management opérationnel est crucial pour :",
    ["La création de valeur au sein de l'entreprise", "Le recrutement", "La motivation", "La fiscalité"], 0, "");
  qcm("c5", "L'horizon du management stratégique est :",
    ["Moins d'un an", "Court et moyen terme", "Long terme (plus de 3 ans)", "Une semaine"], 2, "");
  qcm("c5", "Les décisions du management opérationnel sont :",
    ["Non réversibles", "Réversibles si nécessaire", "Toujours prises par la direction générale", "Orientées vers l'environnement externe"], 1, "");
  qcm("c5", "Lequel de ces exemples relève du management opérationnel ?",
    ["Rachat d'un concurrent", "Lancement d'une nouvelle activité", "Fixation des prix ou lancement d'une promotion", "Changement de structure"], 2, "Les trois autres sont stratégiques.");
  qcm("c5", "Lequel de ces exemples relève du management stratégique ?",
    ["Embauche d'un agent", "Lancement d'une opération de promotion", "Rachat d'un concurrent", "Planning de la semaine"], 2, "");
  qcm("c5", "Le management opérationnel a une vision :",
    ["Externe, orientée vers l'environnement", "Interne, orientée sur les ressources à organiser", "Uniquement financière", "Politique"], 1, "");
  qcm("c5", "Les acteurs concernés par le management opérationnel sont surtout :",
    ["La direction générale", "La hiérarchie intermédiaire (chefs de service)", "Les actionnaires", "L'État"], 1, "");
  qcm("c5", "Les trois principes de base du management opérationnel sont :",
    ["Diriger, mobiliser, contrôler", "Planifier, organiser, diriger", "Produire, vendre, encaisser", "Recruter, former, licencier"], 0, "");
  qcm("c5", "« Mettre en place des indicateurs de performance et vérifier que les objectifs ont été atteints » relève du principe :",
    ["Diriger", "Mobiliser", "Contrôler", "Déléguer"], 2, "");
  qcm("c5", "« Identifier les compétences à déployer, fournir les outils, organiser des réunions et renforcer la cohésion » relève du principe :",
    ["Diriger", "Mobiliser", "Contrôler", "Planifier"], 1, "");
  qcm("c5", "L'objectif principal du management opérationnel est :",
    ["L'optimisation des opérations quotidiennes", "La définition de la vision", "Le rachat de concurrents", "L'entrée en bourse"], 0, "Améliorer l'efficacité des processus, réduire les coûts, maximiser la productivité.");
  qcm("c5", "L'objectif ultime du management opérationnel est :",
    ["La satisfaction du client", "La réduction du personnel", "L'augmentation des dettes", "La diversification"], 0, "");
  qcm("c5", "Dans SMART, le « M » signifie :",
    ["Motivant", "Mesurable", "Modeste", "Mensuel"], 1, "");
  qcm("c5", "Dans SMART, le « T » signifie :",
    ["Total", "Temporellement défini (limité dans le temps)", "Technique", "Transversal"], 1, "");
  qcm("c5", "Lequel de ces objectifs est SMART ?",
    ["Augmenter les ventes", "Être les meilleurs du marché", "Augmenter le chiffre d'affaires de 10 % d'ici le 31 décembre 2026", "Améliorer l'ambiance"], 2, "Spécifique (CA), mesurable (10 %), atteignable et réaliste, daté (31/12/2026).");
  qcm("c5", "Les étapes de la planification opérationnelle sont :",
    ["Objectifs SMART, allocation des ressources, conception des processus", "Vision, mission, valeurs", "Diagnostic, prospective, mise en œuvre", "Plan, Do, Check, Act"], 0, "");
  qcm("c5", "La marque, la réputation et la notoriété sont des ressources :",
    ["Matérielles", "Financières", "Immatérielles", "Technologiques"], 2, "");
  qcm("c5", "Les brevets, le savoir-faire et la R&D sont des ressources :",
    ["Humaines", "Technologiques", "Matérielles", "Financières"], 1, "");
  qcm("c5", "La première étape de la gestion des performances est :",
    ["La reconnaissance", "La fixation des objectifs", "Le feedback", "L'amélioration continue"], 1, "Puis suivi/évaluation, feedback/développement, reconnaissance/récompenses, amélioration continue.");
  qcm("c5", "Les KPI sont :",
    ["Des mesures quantifiables de l'efficacité et du degré de réalisation des objectifs", "Des documents juridiques", "Des contrats de travail", "Des produits financiers"], 0, "");
  qcm("c5", "Le « taux de conversion » est un KPI de type :",
    ["Ressources humaines", "Marketing et ventes", "Productivité", "Financier"], 1, "Pourcentage de prospects qui deviennent clients.");
  qcm("c5", "Le « taux de rotation du personnel » (turnover) est un KPI :",
    ["Financier", "Ressources humaines", "Service client", "Productivité"], 1, "");
  qcm("c5", "Le « coût d'acquisition client (CAC) » est un indicateur :",
    ["Financier", "RH", "Qualité", "Environnemental"], 0, "Dans le cours, il est classé dans les indicateurs financiers.");
  qcm("c5", "Le « taux de résolution au premier contact » est un KPI :",
    ["Service client", "Financier", "RH", "Productivité"], 0, "");
  qcm("c5", "La « valeur à vie du client (CLV) » mesure :",
    ["Le revenu total attendu d'un client pendant toute sa relation avec l'entreprise", "L'âge moyen des clients", "Le nombre de réclamations", "Le coût d'un salarié"], 0, "");
  qcm("c5", "Dans un tableau de bord, la couleur rouge signale généralement :",
    ["Un objectif atteint ou dépassé", "Un indicateur sous l'objectif / une situation critique", "Une donnée neutre", "Une prévision"], 1, "Vert = objectif atteint ou dépassé.");
  qcm("c5", "Le Balanced Scorecard (BSC) a été proposé par :",
    ["Kaplan et Norton", "Taylor et Ford", "Lecocq et Demil", "Ansoff et Porter"], 0, "");
  qcm("c5", "Les 4 axes du Balanced Scorecard sont :",
    ["Financier, clients, processus internes, apprentissage organisationnel", "Politique, économique, social, technologique", "Forces, faiblesses, opportunités, menaces", "Production, vente, finance, RH"], 0, "");
  qcm("c5", "Dans le BSC, le ROI et le bénéfice par action se trouvent dans l'axe :",
    ["Clients", "Financier", "Processus internes", "Apprentissage"], 1, "");
  qcm("c5", "Dans le BSC, le taux de satisfaction et la part de marché se trouvent dans l'axe :",
    ["Clients", "Financier", "Processus internes", "Apprentissage"], 0, "");
  qcm("c5", "Dans le BSC, le nombre de défauts de fabrication et le délai de mise sur le marché se trouvent dans l'axe :",
    ["Clients", "Financier", "Processus internes", "Apprentissage"], 2, "");
  qcm("c5", "Dans le BSC, les plans de formation et les systèmes d'information relèvent de l'axe :",
    ["Clients", "Financier", "Processus internes", "Apprentissage organisationnel (innovation)"], 3, "");
  qcm("c5", "Le taylorisme est aussi appelé :",
    ["Organisation Scientifique du Travail (OST)", "Management participatif", "Lean management", "Design thinking"], 0, "");
  qcm("c5", "Lequel de ces principes appartient au taylorisme ?",
    ["La séparation entre conception et exécution", "L'autonomie totale des ouvriers", "La production à la demande", "Le travail en équipes agiles"], 0, "Division verticale (bureau d'études / ouvriers) et horizontale (tâches spécialisées).");
  qcm("c5", "Henry Ford augmente les salaires de ses ouvriers pour :",
    ["Qu'ils puissent acheter les produits qu'ils fabriquent", "Réduire la production", "Réduire les ventes", "Embaucher moins"], 0, "Cercle vertueux production de masse / consommation de masse.");
  qcm("c5", "Les 3 grands principes introduits par le fordisme sont :",
    ["Standardisation du produit, travail à la chaîne, augmentation du pouvoir d'achat", "Plan, Do, Check", "Hygiène, motivation, reconnaissance", "Vision, mission, valeurs"], 0, "");
  qcm("c5", "Selon Maslow, le besoin situé au sommet de la pyramide est :",
    ["Le besoin de sécurité", "Le besoin d'estime", "Le besoin d'accomplissement de soi", "Le besoin physiologique"], 2, "");
  qcm("c5", "La stabilité de l'emploi correspond, chez Maslow, au besoin :",
    ["Physiologique", "De sécurité", "D'appartenance", "D'estime"], 1, "");
  qcm("c5", "La reconnaissance et le statut correspondent au besoin :",
    ["D'appartenance", "D'estime", "De sécurité", "Physiologique"], 1, "");
  qcm("c5", "La camaraderie au travail correspond au besoin :",
    ["D'appartenance (social)", "D'estime", "D'accomplissement", "Physiologique"], 0, "");
  qcm("c5", "Un manager qui pense que ses employés sont paresseux et doivent être surveillés applique :",
    ["La théorie Y", "La théorie X", "La théorie des deux facteurs", "La pyramide de Maslow"], 1, "");
  qcm("c5", "Selon Herzberg, le salaire est :",
    ["Un facteur de motivation", "Un facteur d'hygiène", "Un besoin d'accomplissement", "Un KPI"], 1, "Son absence crée de l'insatisfaction, sa présence ne motive pas activement.");
  qcm("c5", "Selon Herzberg, lequel est un facteur de motivation ?",
    ["Les conditions de travail", "Le salaire", "La reconnaissance et les responsabilités", "Les relations avec les collègues"], 2, "");
  qcm("c5", "Le style de management qui consiste à confier des missions en laissant une large autonomie est :",
    ["Directif", "Persuasif", "Participatif", "Délégatif"], 3, "");
  qcm("c5", "Le style qui consiste à expliquer les choix, convaincre et répondre aux objections est :",
    ["Directif", "Persuasif", "Participatif", "Délégatif"], 1, "");
  qcm("c5", "Le style qui consiste à associer les collaborateurs à la décision sur les moyens est :",
    ["Directif", "Persuasif", "Participatif", "Délégatif"], 2, "");
  qcm("c5", "Le style directif ne doit pas être confondu avec :",
    ["Le dirigisme", "La délégation", "La persuasion", "La participation"], 0, "Le cours insiste : directif ≠ dirigisme.");
  qcm("c5", "Le profil de communication qui « s'affirme sans agresser » est :",
    ["L'agressif", "Le passif", "Le manipulateur", "L'assertif"], 3, "");
  qcm("c5", "Lequel N'EST PAS un des 7 carburants motivationnels ?",
    ["L'autonomie", "L'apprentissage", "Le pouvoir/influence", "La peur de la sanction"], 3, "Les 7 : stabilité, diversité, apprentissage, argent, relation, pouvoir, autonomie.");
  qcm("c5", "Lequel n'est PAS une fonction du système d'information pour le manager opérationnel ?",
    ["Aide à la prise de décision", "Contrôle et suivi des performances", "Gestion des risques et conformité", "Remplacement total des managers"], 3, "");
  qcm("c5", "La roue de Deming correspond au cycle :",
    ["SWOT", "PDCA (Plan, Do, Check, Act)", "DMAIC", "PESTEL"], 1, "");
  qcm("c5", "Dans le PDCA, l'étape « Check » consiste à :",
    ["Planifier", "Réaliser", "Vérifier les résultats", "Corriger et standardiser"], 2, "");
  qcm("c5", "Le diagramme d'Ishikawa est aussi appelé :",
    ["Diagramme de Gantt", "Diagramme en arêtes de poisson / de cause à effet", "Radar de dépendances", "Matrice des risques"], 1, "Développé par le Japonais Kaoru Ishikawa.");
  qcm("c5", "Le diagramme d'Ishikawa sert à :",
    ["Planifier un projet dans le temps", "Identifier les causes possibles d'un problème", "Calculer la rentabilité", "Classer les DAS"], 1, "");
  qcm("c5", "Les 5M du diagramme d'Ishikawa sont :",
    ["Main-d'œuvre, Matériel, Méthode, Matière, Milieu", "Marché, Marketing, Marge, Management, Mission", "Mesure, Motivation, Mobilité, Monnaie, Mode", "Maslow, McGregor, Mayo, Mintzberg, Maier"], 0, "");
  qcm("c5", "La communication interne permet notamment :",
    ["D'aligner les équipes sur les objectifs", "De valoriser l'image auprès des investisseurs", "De gérer la réputation dans les médias", "De diffuser les résultats au grand public"], 0, "Les autres réponses relèvent de la communication externe.");
  qcm("c5", "Valoriser l'image et la crédibilité de l'entreprise auprès des clients et investisseurs relève de :",
    ["La communication interne", "La communication externe", "La gestion des conflits", "Le PDCA"], 1, "");
  qcm("c5", "La compétence fondamentale dans la gestion des conflits est :",
    ["L'écoute active", "La sanction immédiate", "L'évitement", "Le favoritisme"], 0, "Puis impartialité, décision rapide et équitable, médiation/négociation, suivi.");
  qcm("c5", "Dans la gestion des risques, l'évaluation consiste à analyser :",
    ["La probabilité d'occurrence et l'impact potentiel", "Le chiffre d'affaires", "Le nombre de salariés", "Les valeurs de l'entreprise"], 0, "");
  qcm("c5", "Souscrire une assurance contre l'incendie est une stratégie de risque de type :",
    ["Éviter", "Réduire", "Transférer", "Accepter"], 2, "On transfère le risque financier à l'assureur.");
  qcm("c5", "Installer un générateur de secours contre les coupures d'électricité, c'est :",
    ["Éviter le risque", "Réduire le risque (ou son impact)", "Transférer le risque", "Accepter le risque"], 1, "");
  qcm("c5", "Le Lean vise principalement à :",
    ["Éliminer les gaspillages", "Augmenter les stocks", "Allonger les processus", "Centraliser les décisions"], 0, "");
  qcm("c5", "Six Sigma vise principalement à :",
    ["Réduire la variabilité et les défauts", "Recruter plus", "Augmenter les prix", "Analyser le macro-environnement"], 0, "");
  qcm("c5", "L'excellence opérationnelle s'appuie sur :",
    ["Lean, Six Sigma, gestion de la qualité totale", "PESTEL et SWOT", "Ansoff et BCG", "Maslow et Herzberg"], 0, "");
  qcm("c5", "Dans les méthodes agiles, les phases successives sont appelées :",
    ["Sprints ou itérations", "Jalons annuels", "Cycles PDCA", "Chaînes"], 0, "Généralement d'une ou deux semaines.");
  qcm("c5", "Lequel N'EST PAS un principe de la gestion de projet agile ?",
    ["Réponse rapide au changement", "Livraisons fréquentes", "Collaboration avec le client", "Suivre un plan rigide sans modification"], 3, "");
  qcm("c5", "La première étape du design thinking est :",
    ["Le prototypage", "L'empathie", "Le test", "L'idéation"], 1, "Empathie, définition, idéation, prototypage, test.");
  qcm("c5", "Dans le design thinking, les personas servent à :",
    ["Représenter les différents types d'utilisateurs", "Calculer les coûts", "Organiser l'organigramme", "Fixer les prix"], 0, "");
  qcm("c5", "Le design thinking se distingue du design traditionnel car il est :",
    ["Linéaire", "Centré sur l'utilisateur et itératif", "Centré sur la technique uniquement", "Réservé aux ingénieurs"], 1, "");
  qcm("c5", "« Ouvrir une filiale à l'étranger » est une décision :",
    ["Stratégique", "Tactique", "Opérationnelle", "Programmée"], 0, "");
  qcm("c5", "« Installer un logiciel de gestion des stocks » est une décision :",
    ["Stratégique", "Tactique (administrative)", "Opérationnelle", "Non programmée"], 1, "Moyen terme, cadres intermédiaires.");
  qcm("c5", "« Passer une commande habituelle » est une décision :",
    ["Stratégique", "Tactique", "Opérationnelle", "Non programmée"], 2, "");
  qcm("c5", "« Réapprovisionner quand le stock atteint le seuil minimal » est une décision :",
    ["Programmée", "Non programmée", "Stratégique", "Incertaine"], 0, "Situation répétitive traitée par une règle.");
  qcm("c5", "« Délocaliser une activité » est une décision :",
    ["Programmée", "Non programmée", "Opérationnelle", "Routinière"], 1, "Situation nouvelle qui demande analyse et créativité.");
  qcm("c5", "Selon Herbert Simon (rationalité limitée), le décideur retient :",
    ["La solution optimale", "Une solution satisfaisante", "La solution la moins chère", "La solution du concurrent"], 1, "");
  qcm("c5", "En univers incertain, le décideur :",
    ["Connaît toutes les conséquences", "Mobilise son jugement et son expérience car l'information est incomplète", "Ne décide pas", "Applique une procédure automatique"], 1, "");
  qcm("c5", "Le processus décisionnel du cours comporte :",
    ["3 étapes", "5 étapes", "9 étapes réparties en 3 phases", "12 étapes"], 2, "Analyse (4), décision (3), mise en œuvre (2).");
  qcm("c5", "La dernière étape de la conduite du changement est :",
    ["Préparer", "Mobiliser", "Accompagner", "Ancrer"], 3, "Mesurer l'usage, corriger, intégrer aux procédures.");
  qcm("c5", "« Former par profil, tester sur un périmètre pilote » correspond à l'étape :",
    ["Préparer", "Mobiliser", "Accompagner", "Ancrer"], 2, "");
  vf("c5", "Le management opérationnel a une vision externe orientée vers l'environnement.", false, "C'est le management stratégique. L'opérationnel a une vision interne (les ressources).");
  vf("c5", "Les décisions stratégiques sont généralement non réversibles.", true, "");
  vf("c5", "Un KPI doit être quantifiable.", true, "Mesurable = basé sur des données claires et précises.");
  vf("c5", "Dans un tableau de bord, le vert signale un objectif atteint ou dépassé.", true, "");
  vf("c5", "Selon Herzberg, l'augmentation du salaire suffit à motiver durablement les employés.", false, "Le salaire est un facteur d'hygiène : il évite l'insatisfaction mais ne motive pas activement.");
  vf("c5", "La théorie Y suppose que les employés sont motivés par nature et capables d'autonomie.", true, "");
  vf("c5", "Le taylorisme sépare la conception et l'exécution du travail.", true, "");
  vf("c5", "Le besoin d'estime est à la base de la pyramide de Maslow.", false, "La base, ce sont les besoins physiologiques.");
  vf("c5", "Le PDCA est un outil d'amélioration continue.", true, "Roue de Deming.");
  vf("c5", "Le Balanced Scorecard ne contient que des indicateurs financiers.", false, "Il a 4 axes : financier, clients, processus internes, apprentissage.");
  vf("c5", "Accepter un risque fait partie des mesures possibles dans la gestion des risques.", true, "Éviter, réduire, transférer, accepter.");
  vf("c5", "Dans la méthode agile, le client n'intervient qu'à la fin du projet.", false, "Il est impliqué tout au long du projet.");
  vf("c5", "Selon Herbert Simon, le décideur cherche toujours la solution optimale.", false, "Rationalité limitée : il retient une solution satisfaisante.");
  open("c5", "Donne la définition du management opérationnel selon Drucker, Fayol et Follett.", "Drucker : l'efficacité dans le travail quotidien des activités de l'entreprise. Fayol : l'exécution des plans de l'entreprise. Follett : l'art de faire des gens une réalité opérationnelle.",
    [["quotidien", "efficacite"], ["execution", "plan"], ["art", "gens"]]);
  open("c5", "Cite 4 différences entre management stratégique et opérationnel.", "Démarche (avenir / quotidien), objectif (pérennité / optimisation des ressources), vision (externe / interne), horizon (long terme > 3 ans / court-moyen terme), acteurs (direction générale / hiérarchie intermédiaire), décisions (non réversibles / réversibles).",
    [["long", "terme", "horizon"], ["externe", "interne", "vision"], ["direction", "intermediaire", "chef"], ["reversible", "irreversible"], ["quotidien", "avenir", "perennite"]]);
  open("c5", "Que signifie SMART ?", "Spécifique, Mesurable, Atteignable, Réaliste (pertinent), Temporellement défini.",
    [["specifique"], ["mesurable"], ["atteignable", "accessible", "acceptable"], ["realiste", "pertinent", "relevant"], ["tempor", "delai", "date", "temps"]]);
  open("c5", "Définis un KPI et cite 3 exemples.", "Un indicateur clé de performance est une mesure quantifiable qui évalue l'efficacité des activités et le degré de réalisation des objectifs. Ex. : chiffre d'affaires, taux de défauts, taux de rotation du personnel, taux de conversion, temps de réponse.",
    [["mesure", "quantifi"], ["objectif", "performance", "efficacite"], ["chiffre", "marge", "roi", "defaut", "rotation", "turnover", "conversion", "satisfaction", "absenteisme", "productivite"]]);
  open("c5", "Définis le tableau de bord.", "Outil de suivi et d'aide à la décision qui regroupe, sous forme visuelle, les indicateurs clés de performance et les données essentielles pour la gestion quotidienne. Il donne une vue d'ensemble rapide.",
    [["outil", "suivi"], ["decision"], ["indicateur", "kpi"], ["visuel", "graphique", "vue"]]);
  open("c5", "Cite les 4 axes du Balanced Scorecard.", "Financier, clients, processus internes, apprentissage organisationnel (innovation et apprentissage).",
    [["financ"], ["client"], ["processus"], ["apprentissage", "innovation"]]);
  open("c5", "Cite les 5 niveaux de la pyramide de Maslow de la base au sommet.", "Besoins physiologiques, de sécurité, d'appartenance (sociaux), d'estime, d'accomplissement de soi.",
    [["physiolog"], ["securite"], ["appartenance", "social", "sociaux"], ["estime"], ["accomplissement", "realisation"]]);
  open("c5", "Explique la théorie des deux facteurs de Herzberg.", "Facteurs d'hygiène : leur absence crée de l'insatisfaction, leur présence ne motive pas (salaire, conditions de travail, relations). Facteurs de motivation : leur présence augmente la motivation (reconnaissance, responsabilités, évolution).",
    [["hygiene"], ["motivation"], ["insatisfaction"], ["salaire", "condition", "relation"], ["reconnaissance", "responsabilit", "croissance", "evolution"]]);
  open("c5", "Explique les théories X et Y de McGregor.", "Théorie X : les employés sont paresseux, il faut les surveiller et les diriger (style autoritaire). Théorie Y : les employés sont motivés, cherchent les responsabilités et l'autonomie (style participatif).",
    [["paresseu", "surveill"], ["autoritaire"], ["motiv", "responsabilit", "autonom"], ["participatif"]]);
  open("c5", "Cite les 4 principes du taylorisme.", "Division du travail (conception / exécution, spécialisation), standardisation, contrôle (contre la flânerie), motivation par la rémunération au mérite.",
    [["division", "specialisation"], ["standardis"], ["controle", "flanerie", "surveillance"], ["remuneration", "salaire", "merite"]]);
  open("c5", "Cite les 3 grands principes du fordisme.", "Standardisation du produit, travail à la chaîne, augmentation du pouvoir d'achat des ouvriers.",
    [["standardis"], ["chaine"], ["pouvoir d'achat", "pouvoir d achat", "salaire"]]);
  open("c5", "Cite les 4 styles de management.", "Directif, persuasif, participatif, délégatif.",
    [["directif"], ["persuasif"], ["participatif"], ["delegatif"]]);
  open("c5", "Cite les 4 étapes de la gestion des risques.", "Identification, évaluation (probabilité × impact), plan d'action (éviter, réduire, transférer, accepter), mise en œuvre et suivi.",
    [["identif"], ["evalu", "probabilit", "impact"], ["plan", "action", "eviter", "reduire", "transferer"], ["suivi", "mise en oeuvre"]]);
  open("c5", "Cite les 4 réponses possibles face à un risque.", "Éviter, réduire, transférer, accepter.",
    [["eviter"], ["reduire"], ["transferer"], ["accepter"]]);
  open("c5", "Cite les 5 étapes du design thinking.", "Empathie, définition, idéation, prototypage, test.",
    [["empathie"], ["definition"], ["ideation"], ["prototyp"], ["test"]]);
  open("c5", "Distingue décision programmée et non programmée, avec un exemple chacune.", "Programmée : situation répétitive traitée par des règles (ex. réapprovisionner au seuil minimal de stock). Non programmée : situation nouvelle qui demande analyse et créativité (ex. délocaliser une activité).",
    [["repetitiv", "routine", "regle", "procedure"], ["nouvelle", "inedit", "creativit"], ["stock", "reapprovision", "commande"], ["delocalis", "filiale", "nouveau"]]);
  open("c5", "Qu'est-ce que la rationalité limitée ?", "Selon Herbert Simon, l'information, le temps et les capacités d'analyse du décideur sont limités : il retient une solution satisfaisante plutôt qu'optimale.",
    [["simon"], ["information", "temps", "capacit"], ["limit"], ["satisfaisant"]]);
  open("c5", "Cite les 4 étapes de la conduite du changement.", "Préparer, mobiliser, accompagner, ancrer.",
    [["prepar"], ["mobilis"], ["accompagn"], ["ancr"]]);
  open("c5", "Cite les 3 principes de base du management opérationnel.", "Diriger, mobiliser, contrôler.",
    [["dirig"], ["mobilis"], ["control"]]);
  open("c5", "Cite les 5 étapes de la gestion des performances.", "Fixation des objectifs, suivi et évaluation, feedback et développement, reconnaissance et récompenses, amélioration continue.",
    [["objectif", "fixation"], ["suivi", "evaluation"], ["feedback", "retour", "developpement"], ["reconnaissance", "recompense"], ["amelioration"]]);
  open("c5", "Cite les 4 types de structures (organigrammes) vus en cours.", "Fonctionnelle simple, hiérarchico-fonctionnelle (staff and line), divisionnaire, matricielle.",
    [["fonctionnelle"], ["staff", "hierarchico"], ["division"], ["matricielle"]]);
  ordre("c5", "Remets les besoins de Maslow dans l'ordre, de la base au sommet de la pyramide.",
    ["Besoins physiologiques", "Besoins de sécurité", "Besoins d'appartenance", "Besoins d'estime", "Besoin d'accomplissement de soi"], "« Petit Singe Aime Escalader l'Arbre ».");
  ordre("c5", "Remets dans l'ordre les étapes de la roue de Deming.",
    ["Plan (planifier)", "Do (réaliser)", "Check (vérifier)", "Act (agir, ajuster)"], "P-D-C-A.");
  ordre("c5", "Remets dans l'ordre les étapes du design thinking.",
    ["Empathie", "Définition", "Idéation", "Prototypage", "Test"], "");
  ordre("c5", "Remets dans l'ordre les 9 étapes du processus décisionnel.",
    ["Diagnostiquer la situation", "Définir le problème", "Collecter les informations pertinentes", "Analyser les données et les contraintes", "Rechercher les solutions possibles", "Comparer faisabilité, coûts et avantages", "Choisir la solution", "Appliquer la décision (plan d'action)", "Évaluer les résultats et assurer le suivi"], "Analyse (1-4), décision (5-7), mise en œuvre (8-9).");
  ordre("c5", "Remets dans l'ordre les étapes de la gestion des performances.",
    ["Fixation des objectifs", "Suivi et évaluation", "Feedback et développement", "Reconnaissance et récompenses", "Amélioration continue"], "");
  ordre("c5", "Remets dans l'ordre la conduite du changement.",
    ["Préparer", "Mobiliser", "Accompagner", "Ancrer"], "");
  ordre("c5", "Remets dans l'ordre la planification opérationnelle.",
    ["Établir des objectifs SMART", "Allouer les ressources nécessaires", "Concevoir les processus"], "");
  ordre("c5", "Remets dans l'ordre les étapes de la gestion des risques.",
    ["Identification", "Évaluation (probabilité × impact)", "Plan d'action", "Mise en œuvre et suivi"], "");
  ordre("c5", "Classe les styles de management du plus « encadrant » au plus « autonome ».",
    ["Directif", "Persuasif", "Participatif", "Délégatif"], "Plus le collaborateur est compétent et motivé, plus on peut déléguer.");

  /* =====================================================================
     QCM À PLUSIEURS RÉPONSES (une ou plusieurs bonnes réponses à cocher)
     ===================================================================== */
  // Chapitre I
  multi("c1", "Quelles sont les caractéristiques d'une organisation ?",
    ["Une division et une coordination des tâches", "Des règles et procédures de fonctionnement", "Une hiérarchie et un contrôle", "La recherche obligatoire du profit", "Une stabilité relative"], [0, 1, 2, 4],
    "Les 4 caractéristiques du cours : division/coordination, règles/procédures, hiérarchie/contrôle, stabilité relative. Le profit n'en fait pas partie.");
  multi("c1", "Lesquels font partie de l'environnement interne de l'entreprise ?",
    ["Les associés", "Les dirigeants", "Le personnel", "Les clients", "La banque"], [0, 1, 2],
    "Interne : associés, dirigeants, personnel. Clients, fournisseurs et banque = environnement externe.");
  multi("c1", "Quels critères servent à classer les entreprises (typologie) ?",
    ["Le secteur d'activité", "La taille", "La propriété du capital", "La nature juridique", "L'âge du dirigeant"], [0, 1, 2, 3],
    "Les 4 classifications du cours : secteur d'activité, taille, propriété du capital, nature juridique.");
  multi("c1", "Quels flux l'entreprise échange-t-elle avec son environnement ?",
    ["Des flux réels", "Des flux financiers", "Des flux informationnels", "Des flux militaires"], [0, 1, 2],
    "Flux réels, financiers et informationnels.");
  multi("c1", "Parmi ces entreprises, lesquelles appartiennent au secteur tertiaire ?",
    ["Une banque", "Une compagnie d'assurance", "Une mine d'or", "Une cimenterie", "Un hôtel"], [0, 1, 4],
    "Tertiaire = services (banque, assurance, hôtellerie). La mine = primaire ; la cimenterie (transformation) = secondaire.");
  multi("c1", "Selon l'approche micro-économique, l'entreprise utilise des moyens :",
    ["Matériels", "Financiers", "Humains", "Informationnels", "Militaires"], [0, 1, 2, 3],
    "Moyens matériels, financiers, humains et informationnels pour produire, échanger ou faire circuler des biens et services.");
  multi("c1", "Quelles familles de finalités de l'entreprise sont citées dans le cours ?",
    ["Économiques", "Sociales ou sociétales", "Techniques ou technologiques", "Religieuses"], [0, 1, 2],
    "E-S-T : économiques, sociales/sociétales, techniques/technologiques.");

  // Chapitre II
  multi("c2", "Quelles qualités montrent que le management est un ART ?",
    ["L'intuition", "Le flair", "La persévérance", "La statistique", "La comptabilité"], [0, 1, 2],
    "Art = qualités personnelles (attitude, intuition, valeurs, flair, persévérance, ténacité, bon sens). Statistique et comptabilité = science.");
  multi("c2", "Quels outils montrent que le management est une SCIENCE ?",
    ["La comptabilité", "Les mathématiques", "La statistique", "La psychologie", "L'intuition"], [0, 1, 2, 3],
    "Science = démarche normative et outils multidisciplinaires : comptabilité, mathématiques, statistique, informatique, sociologie, psychologie. L'intuition relève de l'art.");
  multi("c2", "Quels sont les piliers du système de management ?",
    ["La planification", "L'organisation", "La direction", "Le contrôle", "La comptabilité", "La production"], [0, 1, 2, 3],
    "P-O-D-C : planification, organisation, direction, contrôle.");
  multi("c2", "Parmi ces éléments, lesquels font partie des 10 tâches du manager ?",
    ["Motiver", "Déléguer", "Prévoir", "Vendre au comptoir", "Fabriquer les produits"], [0, 1, 2],
    "Organiser, animer, motiver, communiquer, déléguer, gérer, analyser, décider, prévoir, contrôler.");
  multi("c2", "Selon le cours, le manager doit être :",
    ["Leader", "Stratège", "Négociateur", "Juge", "Comptable"], [0, 1, 2],
    "Leader, stratège, animateur, gestionnaire des ressources, planificateur, communicateur et négociateur.");
  multi("c2", "Quelles origines du mot « management » sont citées dans le cours ?",
    ["Manager : le conducteur d'un bateau", "L'italien managgiare : manier ou dresser un cheval", "Le latin : la main", "Le grec organon : l'outil"], [0, 1, 2],
    "Organon (outil, instrument) est l'origine du mot « organisation », pas de « management ».");
  multi("c2", "Quels sont les profils de manager présentés dans le cours ?",
    ["Autoritaire ou autocratique", "Permissif ou laisser-faire", "Démocratique ou participatif", "Comptable"], [0, 1, 2],
    "Les trois types de managers les plus importants selon le cours.");
  multi("c2", "Quels sont les niveaux de managers selon la dimension hiérarchique ?",
    ["Les top managers", "Les managers moyens ou intermédiaires", "Les managers de première ligne", "Les managers stagiaires"], [0, 1, 2],
    "Trois niveaux : top managers, managers intermédiaires, managers de première ligne.");

  // Chapitre III
  multi("c3", "Quelles formes de société ne comptent qu'un seul associé ?",
    ["EURL", "SASU", "SARL", "SA", "SAS"], [0, 1],
    "EURL = SARL à associé unique ; SASU = SAS à associé unique.");
  multi("c3", "Quels sont les trois piliers du business model ?",
    ["La proposition de valeur", "L'architecture de valeur", "L'équation de profit", "L'organigramme", "Le plan de communication"], [0, 1, 2],
    "Quoi/qui/combien (proposition), comment (architecture), rentabilité (équation de profit).");
  multi("c3", "La proposition de valeur répond aux questions :",
    ["Quoi ?", "Qui ?", "Combien ?", "Comment ?", "Où ?"], [0, 1, 2],
    "Quoi = l'offre, qui = le client, combien = le prix. « Comment ? » relève de l'architecture de valeur.");
  multi("c3", "Que comprend l'équation de profit ?",
    ["La structure de coûts", "Les types et volumes de revenus", "Les capitaux engagés", "Les segments de clientèle"], [0, 1, 2],
    "Elle explique l'origine de la rentabilité du modèle.");
  multi("c3", "Quels blocs du Business Model Canvas forment le côté « infrastructure » de l'offre ?",
    ["Partenaires clés", "Activités clés", "Ressources clés", "Canaux", "Segments de clientèle"], [0, 1, 2],
    "Côté infrastructure : partenaires, activités, ressources clés. Canaux, relations et segments = côté délivraison.");
  multi("c3", "Quels blocs du Business Model Canvas forment le côté « délivraison » de l'offre ?",
    ["Segments de clientèle", "Relations avec le client", "Canaux", "Ressources clés", "Activités clés"], [0, 1, 2],
    "Côté délivraison : segments de clientèle, relations avec le client, canaux de distribution.");
  multi("c3", "Dans le Business Model Canvas de Nespresso, quels sont les flux de revenus ?",
    ["La vente de machines", "La vente de capsules", "La publicité", "Les commissions sur les courses"], [0, 1],
    "Vente de machines et vente de capsules.");
  multi("c3", "Pour Nespresso, quelles sont des ressources clés ?",
    ["Le café", "Les usines", "Les brevets", "Les marques", "Les cultivateurs"], [0, 1, 2, 3],
    "Ce que l'entreprise possède = ressources. Les cultivateurs sont des partenaires clés.");
  multi("c3", "Pour un médicament remboursé, qui sont les payeurs ?",
    ["La mutuelle", "La sécurité sociale", "Le patient", "Le médecin"], [0, 1],
    "Patient = utilisateur ; mutuelle et sécurité sociale = payeurs ; médecin et pharmacien = prescripteurs.");
  multi("c3", "Dans le business model d'une compagnie low cost, quels éléments relèvent de l'architecture de valeur (le « comment ») ?",
    ["Des avions neufs identiques", "Des hôtesses multitâches", "De nombreuses rotations", "Des prix très bas", "Les touristes comme clients"], [0, 1, 2],
    "Prix très bas et touristes = proposition de valeur (combien / qui).");
  multi("c3", "Selon le cours, pourquoi les modèles d'Airbnb, Uber et Google fonctionnent-ils ?",
    ["Ils attirent les deux parties", "Ils simplifient la rencontre", "Ils instaurent la confiance", "Ils réinvestissent dans la croissance", "Ils fixent les prix les plus élevés du marché"], [0, 1, 2, 3],
    "Les 4 raisons du cours : attirer les deux parties, simplifier la rencontre, instaurer la confiance, réinvestir dans la croissance.");
  multi("c3", "Quelles sont des sources de revenus de Google ?",
    ["La publicité", "Le cloud", "Les outils professionnels (Workspace)", "Les appareils et abonnements", "Les commissions sur les courses de taxi"], [0, 1, 2, 3],
    "Les commissions sur les courses, c'est le modèle d'Uber.");
  multi("c3", "Que regroupe le modèle RCOV ?",
    ["Les ressources et compétences", "L'organisation interne et externe", "La proposition de valeur", "La rentabilité commerciale"], [0, 1, 2],
    "R-C = ressources et compétences, O = organisation, V = proposition de valeur (Lecocq, Demil, Warnier).");

  // Chapitre IV
  multi("c4", "Lesquels sont des facteurs de l'analyse PESTEL ?",
    ["Politique", "Économique", "Technologique", "Légal", "Financier interne", "Concurrentiel"], [0, 1, 2, 3],
    "PESTEL = Politique, Économique, Socioculturel, Technologique, Écologique, Légal. Le financier interne relève du diagnostic interne ; la concurrence, des 5 forces de Porter.");
  multi("c4", "Dans une SWOT, quels éléments sont des facteurs externes ?",
    ["Les opportunités", "Les menaces", "Les forces", "Les faiblesses"], [0, 1],
    "Forces et faiblesses = interne ; opportunités et menaces = externe.");
  multi("c4", "Parmi ces éléments, lesquels sont des forces dans une SWOT ?",
    ["La capacité d'innovation", "La notoriété de la marque", "Des brevets technologiques", "Le monosourcing", "Un turnover du personnel important"], [0, 1, 2],
    "Monosourcing et turnover important sont des faiblesses (internes, défavorables).");
  multi("c4", "Parmi ces éléments, lesquels sont des menaces dans une SWOT ?",
    ["Une concurrence directe et élargie", "Une réglementation défavorable", "L'augmentation du coût des matières", "De nouvelles technologies", "Des employés qualifiés"], [0, 1, 2],
    "Les nouvelles technologies sont une opportunité ; les employés qualifiés, une force.");
  multi("c4", "Parmi ces éléments, lesquels sont des opportunités dans une SWOT ?",
    ["Un marché en croissance", "De nouveaux canaux de distribution", "Une réglementation favorable", "La saisonnalité", "Une faible capacité financière"], [0, 1, 2],
    "La saisonnalité est une menace ; la faible capacité financière, une faiblesse.");
  multi("c4", "Quelles sont les forces du modèle de Porter ?",
    ["La menace des nouveaux entrants", "Le pouvoir de négociation des fournisseurs", "Le pouvoir de négociation des clients", "La menace des produits de substitution", "La rivalité entre concurrents existants", "Le taux d'inflation"], [0, 1, 2, 3, 4],
    "Les 5 forces de Porter. L'inflation est un facteur économique de PESTEL.");
  multi("c4", "Quelles barrières à l'entrée sont citées dans le cours ?",
    ["La réglementation", "La technologie", "L'intensité capitalistique", "Le nombre de clients"], [0, 1, 2],
    "Les trois barrières à l'entrée du schéma des 5 forces.");
  multi("c4", "Le raisonnement stratégique va :",
    ["Du long terme vers le court terme", "Du global vers la proximité", "De l'externe vers l'interne", "De l'action vers l'objectif", "De l'amont vers l'aval"], [0, 1, 2],
    "Les 5 sens du cours : long → court terme, global → proximité, externe → interne, aval → amont, objectif → action. Les deux dernières options sont inversées.");
  multi("c4", "Sur quoi repose le cadre de référence fondamental (volonté des dirigeants propriétaires) ?",
    ["La vision", "Les valeurs", "La vocation", "Le budget annuel"], [0, 1, 2],
    "Vision, valeurs, vocation.");
  multi("c4", "Selon le cours, la stratégie consiste à définir :",
    ["L'ambition et le cap à atteindre", "Le business model pour y parvenir", "Les activités à privilégier", "Les moyens à allouer", "Le planning de la semaine"], [0, 1, 2, 3],
    "Plus les ressources pour les financer. Le planning de la semaine relève de l'opérationnel.");
  multi("c4", "Quelles questions se poser pour déterminer les DAS de l'entreprise ?",
    ["Des clients spécifiques ?", "Des concurrents spécifiques ?", "Des FCS spécifiques ou hiérarchisés différemment ?", "Un centre de profit avec des flux distincts ?", "La couleur de l'emballage ?"], [0, 1, 2, 3],
    "Les 7 questions : clients, concurrents, compétences distinctives, FCS, centre de profit, devenir autonome, organisation autonome.");
  multi("c4", "Quels sont les FCS d'un DAS de « banalisation de l'offre » ?",
    ["Le volume de production", "La standardisation", "La productivité", "L'open innovation", "La différenciation"], [0, 1, 2],
    "Open innovation, différenciation et marketing = savoir-faire différenciateur.");
  multi("c4", "Quels sont les facteurs clés de succès de l'économie d'environnement ?",
    ["La stratégie", "La prospective", "L'agilité", "La communication", "La capacité de production"], [0, 1, 2, 3],
    "La capacité de production est un FCS de l'économie de production.");
  multi("c4", "Dans la matrice McKinsey, quelles recommandations relèvent de la logique de développement ?",
    ["Conforter son leadership", "Développer, investir sur les FCS", "Segmenter, investir sélectivement", "Maximiser la profitabilité", "Abandonner, désinvestir"], [0, 1, 2],
    "Maximiser la profitabilité = maintien ; abandonner = repli.");
  multi("c4", "Dans la matrice McKinsey, quelles recommandations relèvent de la logique de repli ?",
    ["Se retirer sélectivement", "Se désengager progressivement", "Abandonner, désinvestir", "Rentabiliser prudemment", "Conforter son leadership"], [0, 1, 2],
    "Rentabiliser prudemment = maintien ; conforter son leadership = développement.");
  multi("c4", "Quels critères servent à évaluer et comparer les scénarios stratégiques ?",
    ["La cohérence avec le cadre de référence fondamental", "La réversibilité", "L'acceptabilité par les acteurs clés", "L'impact économique et financier", "L'âge du dirigeant"], [0, 1, 2, 3],
    "Les 7 critères : cohérence avec le CRF, attractivité, accessibilité aux FCS, impact économique et financier, acceptabilité, réversibilité, impacts prévisibles.");
  multi("c4", "Dans l'analyse financière, quels éléments mesurent la santé financière ?",
    ["La valeur patrimoniale", "La capacité d'autofinancement (CAF)", "Le niveau d'endettement", "La rentabilité financière", "Le niveau de BFR"], [0, 1, 2, 3],
    "Le niveau de BFR relève de l'équilibre de trésorerie.");
  multi("c4", "Quelles stratégies d'Ansoff visent un NOUVEAU marché ?",
    ["Le développement de marché", "La diversification", "La pénétration de marché", "Le développement de produit"], [0, 1],
    "Pénétration et développement de produit restent sur le marché actuel.");
  multi("c4", "Quelles stratégies d'Ansoff impliquent un NOUVEAU produit ?",
    ["Le développement de produit", "La diversification", "La pénétration de marché", "Le développement de marché"], [0, 1],
    "Pénétration et développement de marché gardent le produit actuel.");
  multi("c4", "Quelles sont les compétences du dirigeant stratège ?",
    ["Les capacités de diagnostic", "Les capacités de projection prospective", "Les capacités de décision", "Les capacités d'animation", "Les capacités de saisie comptable"], [0, 1, 2, 3],
    "Diagnostic, prospective, décision, animation.");

  // Chapitre V
  multi("c5", "Quels sont les principes de base du management opérationnel ?",
    ["Diriger", "Mobiliser", "Contrôler", "Racheter des concurrents"], [0, 1, 2],
    "D-M-C : diriger, mobiliser, contrôler.");
  multi("c5", "Quels exemples relèvent du management opérationnel ?",
    ["L'embauche", "La fixation des prix", "Le lancement d'une opération de promotion", "Le rachat d'un concurrent", "Le changement de structure"], [0, 1, 2],
    "Rachat d'un concurrent et changement de structure = management stratégique.");
  multi("c5", "Quelles caractéristiques correspondent au management stratégique ?",
    ["Un horizon long terme (plus de 3 ans)", "Une vision externe orientée sur l'environnement", "Des décisions non réversibles", "Des décisions prises par les chefs de service", "La gestion au quotidien"], [0, 1, 2],
    "Chefs de service et gestion au quotidien = management opérationnel.");
  multi("c5", "Quelles sont les caractéristiques d'un KPI ?",
    ["Mesurable", "Pertinent", "Temporel", "Spécifique", "Imprécis"], [0, 1, 2, 3],
    "Plus « atteignable ». Un KPI doit être basé sur des données claires et précises.");
  multi("c5", "Lesquels sont des indicateurs financiers selon le cours ?",
    ["Le chiffre d'affaires", "La marge bénéficiaire", "Le retour sur investissement (ROI)", "Le coût d'acquisition client (CAC)", "Le taux d'absentéisme"], [0, 1, 2, 3],
    "Le taux d'absentéisme est un KPI ressources humaines.");
  multi("c5", "Lesquels sont des KPI ressources humaines ?",
    ["Le taux de rotation du personnel", "Le taux d'absentéisme", "L'engagement des employés", "Le taux de conversion", "La valeur à vie du client"], [0, 1, 2],
    "Taux de conversion et valeur à vie du client = marketing et ventes.");
  multi("c5", "Quels sont des objectifs du management opérationnel ?",
    ["L'optimisation des opérations", "L'atteinte des objectifs de qualité", "La gestion des ressources", "La satisfaction du client", "La définition de la vision de l'entreprise"], [0, 1, 2, 3],
    "La vision relève du management stratégique.");
  multi("c5", "Lesquelles sont des ressources immatérielles ?",
    ["La marque", "La réputation", "La notoriété", "Les stocks", "Les capitaux propres"], [0, 1, 2],
    "Stocks = ressource matérielle ; capitaux propres = ressource financière.");
  multi("c5", "Selon Herzberg, lesquels sont des facteurs d'hygiène ?",
    ["Le salaire", "Les conditions de travail", "Les relations avec les collègues", "La reconnaissance", "Les responsabilités"], [0, 1, 2],
    "Reconnaissance et responsabilités = facteurs de motivation.");
  multi("c5", "Selon Herzberg, lesquels sont des facteurs de motivation ?",
    ["La reconnaissance", "Les responsabilités", "La croissance professionnelle", "Le salaire", "Les conditions de travail"], [0, 1, 2],
    "Salaire et conditions de travail = facteurs d'hygiène.");
  multi("c5", "Quels sont les principes clés du taylorisme ?",
    ["La division du travail", "La standardisation", "Le contrôle", "La rémunération au mérite", "L'autonomie totale des ouvriers"], [0, 1, 2, 3],
    "Taylor sépare conception et exécution : pas d'autonomie des ouvriers.");
  multi("c5", "Quels sont les grands principes du fordisme ?",
    ["La standardisation du produit", "Le travail à la chaîne", "L'augmentation du pouvoir d'achat des ouvriers", "La production sur mesure"], [0, 1, 2],
    "Production de masse de produits standardisés, pas sur mesure.");
  multi("c5", "Lesquels font partie de la pyramide des besoins de Maslow ?",
    ["Les besoins physiologiques", "Le besoin de sécurité", "Le besoin d'appartenance", "Le besoin d'estime", "Le besoin d'accomplissement de soi", "Le besoin de pouvoir"], [0, 1, 2, 3, 4],
    "5 niveaux ; le pouvoir n'en fait pas partie (c'est un des « carburants » motivationnels).");
  multi("c5", "Lesquels sont des « carburants » motivationnels cités dans le cours ?",
    ["La stabilité, la routine, la sécurité", "L'apprentissage", "L'argent", "L'autonomie", "La peur de la sanction"], [0, 1, 2, 3],
    "Les 7 : stabilité, diversité, apprentissage, argent, relation, pouvoir, autonomie.");
  multi("c5", "Quelles sont des fonctions du système d'information pour le manager opérationnel ?",
    ["L'aide à la prise de décision", "L'amélioration de la productivité", "La coordination et la communication", "Le contrôle et le suivi des performances", "Le remplacement des managers"], [0, 1, 2, 3],
    "Plus la gestion des risques et de la conformité. Le SI aide le manager, il ne le remplace pas.");
  multi("c5", "Que permet la communication interne ?",
    ["Aligner les équipes sur les objectifs", "Coordonner les actions", "Favoriser la collaboration", "Maintenir la motivation", "Valoriser l'image auprès des investisseurs"], [0, 1, 2, 3],
    "Valoriser l'image auprès des investisseurs relève de la communication externe.");
  multi("c5", "Que permet la communication externe ?",
    ["Valoriser l'image et la crédibilité de l'entreprise", "Diffuser les résultats et les réussites", "Gérer la réputation et prévenir les crises", "Aligner les équipes sur les objectifs"], [0, 1, 2],
    "Aligner les équipes relève de la communication interne.");
  multi("c5", "Quelles compétences sont utiles dans la gestion des conflits ?",
    ["L'écoute active", "L'impartialité et l'objectivité", "La médiation et la négociation", "Le suivi après résolution", "Le favoritisme"], [0, 1, 2, 3],
    "Plus la prise de décision rapide et équitable. Le favoritisme est à proscrire.");
  multi("c5", "Quelles sont les réponses possibles face à un risque ?",
    ["Éviter", "Réduire", "Transférer", "Accepter", "Ignorer"], [0, 1, 2, 3],
    "Éviter, réduire, transférer, accepter.");
  multi("c5", "Sur quoi s'appuie l'excellence opérationnelle ?",
    ["Le Lean", "Six Sigma", "La gestion de la qualité totale", "L'analyse PESTEL", "La matrice d'Ansoff"], [0, 1, 2],
    "PESTEL et Ansoff sont des outils stratégiques.");
  multi("c5", "Quels sont des principes de la gestion de projet agile ?",
    ["La réponse rapide au changement", "Des livraisons fréquentes", "La collaboration avec le client", "Des équipes autonomes et pluridisciplinaires", "Un plan rigide sans modification"], [0, 1, 2, 3],
    "L'agile favorise l'adaptabilité plutôt qu'un plan rigide.");
  multi("c5", "Quelles sont des étapes du design thinking ?",
    ["L'empathie", "L'idéation", "Le prototypage", "Le test", "La délégation"], [0, 1, 2, 3],
    "Empathie, définition, idéation, prototypage, test.");
  multi("c5", "Quels sont les axes du Balanced Scorecard ?",
    ["Financier", "Clients", "Processus internes", "Apprentissage organisationnel", "Concurrents"], [0, 1, 2, 3],
    "Kaplan et Norton : 4 axes.");
  multi("c5", "Quels sont les styles de management présentés dans le cours ?",
    ["Directif", "Persuasif", "Participatif", "Délégatif", "Laxiste"], [0, 1, 2, 3],
    "Les 4 styles selon la compétence et la motivation du collaborateur.");
  multi("c5", "Selon leur portée, les décisions sont :",
    ["Stratégiques", "Administratives ou tactiques", "Opérationnelles", "Fiscales"], [0, 1, 2],
    "Long terme (direction générale), moyen terme (cadres intermédiaires), court terme (encadrement de proximité).");
  multi("c5", "Quels types de contrôle accompagnent la mise en œuvre d'une décision ?",
    ["Le contrôle des résultats", "Le contrôle des procédures", "L'autocontrôle et l'ajustement", "Le contrôle fiscal"], [0, 1, 2],
    "Après avoir organisé l'action (objectifs, responsables, moyens, délais, indicateurs).");
  multi("c5", "Quels types de structures (organigrammes) sont présentés dans le cours ?",
    ["La structure fonctionnelle simple", "La structure hiérarchico-fonctionnelle (staff and line)", "La structure divisionnaire", "La structure matricielle", "La structure circulaire"], [0, 1, 2, 3],
    "Les 4 modèles d'organigramme du cours.");
  multi("c5", "Quels facteurs influencent le choix et l'évolution de la structure ?",
    ["L'âge de l'organisation", "La technique appliquée", "La taille de l'entreprise", "Le style de management", "La couleur des bureaux"], [0, 1, 2, 3],
    "Plus la fluctuation de l'environnement et l'adaptation à la stratégie retenue.");
  multi("c5", "Quelles sont les étapes de la conduite du changement ?",
    ["Préparer", "Mobiliser", "Accompagner", "Ancrer", "Imposer"], [0, 1, 2, 3],
    "Préparer, mobiliser, accompagner, ancrer.");
  multi("c5", "Quels sont les « M » du diagramme d'Ishikawa ?",
    ["Main-d'œuvre", "Matériel", "Méthode", "Matière", "Milieu", "Marketing"], [0, 1, 2, 3, 4],
    "Les 5M.");
  multi("c5", "Que suppose la théorie Y de McGregor ?",
    ["Les employés sont motivés par nature", "Ils cherchent à prendre des responsabilités", "Ils sont capables d'autonomie", "Ils doivent être constamment surveillés", "Ils sont intrinsèquement paresseux"], [0, 1, 2],
    "Les deux dernières propositions décrivent la théorie X.");
  multi("c5", "Quelles sont les étapes de la planification opérationnelle ?",
    ["L'établissement d'objectifs SMART", "L'allocation des ressources nécessaires", "La conception des processus", "Le rachat d'un concurrent"], [0, 1, 2],
    "Le rachat d'un concurrent est une décision stratégique.");

  // Identifiants stables (hash du texte)
  function h(s) { var x = 5381; for (var i = 0; i < s.length; i++) { x = ((x << 5) + x + s.charCodeAt(i)) | 0; } return (x >>> 0).toString(36); }
  Q.forEach(function (q) { q.id = q.t + "-" + h(q.q + (q.o ? q.o.join("|") : "")); });
  window.QUESTIONS = Q;
})();
