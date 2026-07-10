(() => {
  const body = document.body;
  const loader = document.getElementById("page-loader");
  const MIN_LOADER_MS = 1000;



  const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

  const defaultTextMap = {};
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key || defaultTextMap[key]) return;
    const text = normalizeText(el.textContent || "");
    if (text) defaultTextMap[key] = text;
  });

  const baseStrings = {
    "archive.card.download": "Download",
    "archive.card.size": "File size: {size}",
    "archive.card.version": "Version {version}",
    "archive.empty": "No archive entries found.",
    "chess.bot.status": "Bot: {level} - Playing {side}",
    "chess.piece.bishop": "Bishop",
    "chess.piece.king": "King",
    "chess.piece.knight": "Knight",
    "chess.piece.label": "{color} {piece}",
    "chess.piece.pawn": "Pawn",
    "chess.piece.queen": "Queen",
    "chess.piece.rook": "Rook",
    "chess.result.checkmate": "Checkmate ? {winner} wins",
    "chess.result.insufficient": "Draw ? Insufficient material",
    "chess.result.stalemate": "Draw ? Stalemate",
    "chess.result.threefold": "Draw ? Threefold repetition",
    "chess.theme.light": "Theme: Light",
    "chess.turn.bot": " | Bot thinking",
    "chess.turn.check": " - Check",
    "chess.turn.move": "{color} to move",
    "gallery.modal.alt": "Gallery preview"
  };

  const translations = {
    fr: {
      "action.close": "Fermer",
      "action.open": "Ouvrir",
      "action.reset": "Réinitialiser",
      "action.undo": "Annuler",
      "archive.card.download": "Télécharger",
      "archive.card.size": "Taille du fichier : {size}",
      "archive.card.version": "Version {version}",
      "archive.empty": "Aucune entrée d'archive trouvée.",
      "archive.lead": "Exports versionnés de l'état actuel du site, si je m'en souviens.",
      "archive.source.item1": "Manifeste : site-archive/manifest.json",
      "archive.source.item2": "Format : instantanés compressés, pour moi ou pour toi, nerd :)",
      "archive.source.item3": "Actuel : v2.0",
      "archive.source.title": "Source",
      "archive.title": "Archive",
      "chess.bot.off": "Bot : Désactivé",
      "chess.bot.status": "Bot : {level} - Joue {side}",
      "chess.color.black": "Noir",
      "chess.color.white": "Blanc",
      "chess.engine.item1": "Validation des coups légaux",
      "chess.engine.item2": "Bot hors ligne avec niveaux de difficulté",
      "chess.engine.item3": "Choix du camp et humain contre bot",
      "chess.engine.item4": "Annuler, réinitialiser, basculer le thème",
      "chess.engine.title": "Moteur",
      "chess.lead": "Un plateau épuré pour tester la logique des coups et la notation.",
      "chess.level.easy": "Facile",
      "chess.level.hard": "Difficile",
      "chess.level.medium": "Moyen",
      "chess.moves": "Historique des coups",
      "chess.piece.bishop": "Fou",
      "chess.piece.king": "Roi",
      "chess.piece.knight": "Cavalier",
      "chess.piece.label": "{piece} {color}",
      "chess.piece.pawn": "Pion",
      "chess.piece.queen": "Dame",
      "chess.piece.rook": "Tour",
      "chess.result.checkmate": "Échec et mat ? {winner} gagne",
      "chess.result.insufficient": "Nulle ? Matériel insuffisant",
      "chess.result.stalemate": "Nulle ? Pat",
      "chess.result.threefold": "Nulle ? Triple répétition",
      "chess.result.title": "Partie terminée",
      "chess.setup.apply": "Appliquer et redémarrer",
      "chess.setup.difficulty": "Difficulté",
      "chess.setup.hvb": "Humain vs Bot",
      "chess.setup.hvh": "Humain vs Humain",
      "chess.setup.opponent": "Adversaire",
      "chess.setup.play_as": "Jouer en",
      "chess.setup.title": "Configuration du match",
      "chess.theme.dark": "Thème : Sombre",
      "chess.theme.light": "Thème : Clair",
      "chess.title": "Échecs",
      "chess.turn.bot": " | Bot réfléchit",
      "chess.turn.check": " - Échec",
      "chess.turn.move": "{color} à jouer",
      "contact.github.desc": "Dépôts publics.",
      "contact.spotify.desc": "Music Recs? Anyone?",
      "contact.title": "Contact",
      "footer.by": "par Alex Mercer",
      "footer.copyright": "© 2026 Alex Mercer. Tous droits réservés. Aucune réutilisation sans autorisation.",
      "footer.licenses": "Licences",
      "footer.privacy": "Politique de confidentialité",
      "footer.terms": "Conditions générales",
      "gallery.lead": "Études visuelles capturées parallèlement au travail technique.",
      "gallery.modal.alt": "Aperçu de la galerie",
      "gallery.specs.item1": "Ressources : 15 études SVG",
      "gallery.specs.item2": "Emplacement : assets/gallery/",
      "gallery.specs.item3": "Interaction : survol + aperçu modal",
      "gallery.specs.title": "Spécifications",
      "gallery.title": "Galerie",
      "home.archive_desc": "Exportations versionnées du site, y compris v2.0.",
      "home.archive_preview": "Aperçu de l'archive",
      "home.by": "par Alex Mercer",
      "home.card.archive.desc": "Versions compressées du site.",
      "home.card.chess.desc": "Plateau jouable avec notation.",
      "home.card.contact.desc": "Liens principaux et profils.",
      "home.card.gallery.desc": "Études visuelles et tests de géométrie.",
      "home.card.lab.desc": "Systèmes et modules actifs.",
      "home.card.notes.desc": "Notes techniques et expérimentations.",
      "home.gallery_count": "Deux études mises en avant.",
      "home.gallery_preview": "Aperçu de la galerie",
      "home.lead": "Une archive personnelle de notes, d'expériences et d'outils.",
      "home.notes_desc": "Entrées courtes, mises à jour au besoin.",
      "home.open_archive": "Ouvrir l'archive",
      "home.open_notes": "Ouvrir les notes",
      "home.quote": "Claus Hugo Strandberg : « L'avidité et l'ignorance, mon ami. Voilà les pierres angulaires de toute bonne escroquerie. »",
      "home.recent_notes": "Notes récentes",
      "home.site_index": "Index du site",
      "home.system.item1": "Build statique, prêt pour le hors ligne.",
      "home.system.item2": "Grille procédurale et champ de carrés flottants.",
      "home.system.item3": "Moteur d'échecs manuel avec journal de notation.",
      "home.system.title": "Système",
      "home.view_full_gallery": "Voir la galerie complète",
      "lab.assets.item1": "Études SVG locales de la galerie",
      "lab.assets.item2": "Textures de bruit et de grille",
      "lab.assets.item3": "Pièces d'échecs SVG",
      "lab.assets.item4": "Polices locales : Inter + JetBrains Mono",
      "lab.assets.title": "Ressources de référence",
      "lab.demo.background": "Systèmes d'arrière-plan",
      "lab.demo.gallery": "Modale de galerie",
      "lab.demo.lead": "Lancer des aperçus des systèmes clés sans quitter le lab.",
      "lab.demo.loading": "Écran de chargement",
      "lab.demo.title": "Console de démo",
      "lab.lead": "Modules actifs et expérimentations qui alimentent le site.",
      "lab.modules.item1": "Grille procédurale + carrés flottants",
      "lab.modules.item2": "Rendu des notes avec blocs de code",
      "lab.modules.item3": "Manifeste d'archive et cartes de téléchargement",
      "lab.modules.item4": "Moteur d'échecs avec historique de notation",
      "lab.modules.title": "Modules actifs",
      "lab.notes.lead": "Cette page suit ce qui tourne en arrière-plan. Les détails restent courts et opérationnels.",
      "lab.notes.title": "Notes",
      "lab.scope.item1": "Systèmes visuels et mouvements d'interface",
      "lab.scope.item2": "Rendu des données et manifestes",
      "lab.scope.item3": "Outillage autonome",
      "lab.scope.title": "Périmètre",
      "lab.title": "Laboratoire",
      "licenses.assets.body": "Toutes les icônes, ressources d'échecs, textures et visuels d'arrière-plan sont des créations originales pour ce projet. Aucune image stock sous licence n'est distribuée avec la build.",
      "licenses.assets.title": "Ressources tierces",
      "licenses.coverage.item1": "Aucune bibliothèque d'exécution externe",
      "licenses.coverage.item2": "Tous les graphismes produits en interne",
      "licenses.coverage.item3": "Distribution hors ligne prioritaire",
      "licenses.coverage.title": "Couverture",
      "licenses.fonts.body": "Des polices hébergées localement sont utilisées pour la typographie. Leurs licences s'appliquent séparément et ne sont pas reproduites ici.",
      "licenses.fonts.title": "Polices",
      "licenses.lead": "Divulgations de licences tierces pour axmcr.",
      "licenses.libraries.body": "Aucune bibliothèque, framework ou script externe n'est inclus avec ce site.",
      "licenses.libraries.title": "Bibliothèques tierces",
      "licenses.overview.body": "Cette page documente les licences tierces incluses avec axmcr. Le site est livré comme une build statique, hors ligne, avec HTML, CSS et JavaScript personnalisés rédigés par Alex Mercer.",
      "licenses.overview.title": "Présentation",
      "licenses.title": "Licences",
      "loader.loading": "Chargement...",
      "loader.page.archive": "Archive",
      "loader.page.chess": "Échecs",
      "loader.page.contact": "Contact",
      "loader.page.gallery": "Galerie",
      "loader.page.home": "Accueil",
      "loader.page.lab": "Laboratoire",
      "loader.page.licenses": "Licences",
      "loader.page.notes": "Notes",
      "loader.page.privacy": "Confidentialité",
      "loader.page.terms": "Conditions",
      "nav.archive": "Archive",
      "nav.chess": "Échecs",
      "nav.contact": "Contact",
      "nav.gallery": "Galerie",
      "nav.home": "Accueil",
      "nav.lab": "Laboratoire",
      "nav.language": "Langue",
      "nav.local": "Local",
      "nav.more": "Plus à venir",
      "nav.notes": "Notes",
      "notes.coming.lead": "Un flux de notes en direct apparaîtra ici après le lancement.",
      "notes.coming.title": "Bientôt disponible lors du lancement du site",
      "notes.lead": "Bientôt disponible lors du lancement du site.",
      "notes.status.item1": "Les notes seront publiées après le lancement.",
      "notes.status.item2": "L'index reste disponible sur la page d'accueil.",
      "notes.status.item3": "Les brouillons restent hors ligne jusqu'à la sortie.",
      "notes.status.title": "Statut",
      "notes.title": "Notes",
      "privacy.collection.body": "Le Site est hébergé comme un projet statique et ne collecte pas intentionnellement de données personnelles. Aucun formulaire, traceur ou script d'analyse n'est intégré.",
      "privacy.collection.title": "Collecte d'informations",
      "privacy.contact.body": "Pour les questions relatives à la confidentialité, contactez Alex Mercer via les liens de la page Contact.",
      "privacy.contact.title": "Informations de contact",
      "privacy.cookies.body": "Le Site ne définit pas de cookies et n'utilise pas le stockage local au-delà de ce que votre navigateur peut appliquer par défaut.",
      "privacy.cookies.title": "Cookies",
      "privacy.definitions.body": "\"Site\" désigne axmcr, un site web statique créé par Alex Mercer. \"Vous\" désigne tout visiteur du Site.",
      "privacy.definitions.title": "Définitions",
      "privacy.external.body": "Les liens externes peuvent vous diriger vers des sites tiers avec leurs propres pratiques de confidentialité. Consultez ces politiques avant d'interagir avec ces services.",
      "privacy.external.title": "Liens externes",
      "privacy.github.body": "Si le Site est hébergé ou répliqué via GitHub, GitHub peut collecter et traiter des données d'accès conformément à ses propres politiques. La gestion des données par GitHub est indépendante de axmcr.",
      "privacy.github.title": "Divulgation du dépôt GitHub",
      "privacy.hosting.body": "Les fournisseurs d'hébergement statique peuvent enregistrer des adresses IP, des horodatages d'accès et des métadonnées de requête de base dans le cadre des opérations serveur standard. Ces journaux sont gérés par le fournisseur d'hébergement et ne sont pas contrôlés par le Site.",
      "privacy.hosting.title": "Hébergement et infrastructure",
      "privacy.lead": "Date d'entrée en vigueur : 13 mars 2026",
      "privacy.rights.body": "Étant donné que le Site ne collecte pas de données personnelles, il n'existe aucune information personnelle stockée à consulter, corriger ou supprimer.",
      "privacy.rights.title": "Droits des utilisateurs",
      "privacy.security.body": "Aucune donnée personnelle n'est stockée par le Site. Les responsabilités de sécurité liées à l'infrastructure d'hébergement incombent au fournisseur d'hébergement.",
      "privacy.security.title": "Sécurité des données",
      "privacy.summary.item1": "Aucune collecte intentionnelle de données personnelles",
      "privacy.summary.item2": "L'hébergement statique peut consigner des données d'accès",
      "privacy.summary.item3": "Les liens externes sont gérés séparément",
      "privacy.summary.title": "Résumé",
      "privacy.title": "Politique de confidentialité",
      "privacy.updates.body": "Cette politique peut être mise à jour pour refléter les changements du Site ou de l'environnement d'hébergement. La date d'entrée en vigueur ci-dessus sera mise à jour lorsque des changements surviendront.",
      "privacy.updates.title": "Mises à jour de la politique",
      "terms.acceptance.body": "En accédant au Site, vous acceptez ces Conditions générales. Si vous n'êtes pas d'accord, cessez d'utiliser le Site.",
      "terms.acceptance.title": "Acceptation des conditions",
      "terms.changes.body": "Les conditions peuvent être mises à jour périodiquement. L'utilisation continue du Site indique l'acceptation des conditions révisées.",
      "terms.changes.title": "Modifications des conditions",
      "terms.contact.body": "Pour toute question concernant ces conditions, contactez Alex Mercer via la page Contact.",
      "terms.contact.title": "Contact",
      "terms.definitions.body": "\"Site\" désigne axmcr, créé par Alex Mercer. \"Vous\" désigne tout visiteur du Site.",
      "terms.definitions.title": "Définitions",
      "terms.external.body": "Le Site peut contenir des liens vers des services externes. Ces services sont régis par leurs propres conditions et politiques.",
      "terms.external.title": "Liens externes",
      "terms.ip.body": "Sauf indication contraire, tout le contenu original du Site appartient à Alex Mercer. Tous droits réservés. Aucune réutilisation, redistribution ou usage dérivé n'est autorisé sans permission explicite.",
      "terms.ip.title": "Propriété intellectuelle",
      "terms.lead": "Date d'entrée en vigueur : 13 mars 2026",
      "terms.liability.body": "Alex Mercer n'est pas responsable des dommages résultant de l'utilisation ou de l'incapacité d'utiliser le Site.",
      "terms.liability.title": "Limitation de responsabilité",
      "terms.permitted.body": "Vous pouvez consulter, lire et référencer le Site à des fins personnelles et informatives.",
      "terms.permitted.title": "Utilisation autorisée",
      "terms.prohibited.body": "Vous ne pouvez pas tenter de perturber le Site, accéder à une infrastructure restreinte ou republier des contenus de manière trompeuse.",
      "terms.prohibited.title": "Utilisation interdite",
      "terms.summary.item1": "Archive technique personnelle",
      "terms.summary.item2": "Contenu appartenant à Alex Mercer",
      "terms.summary.item3": "Aucune garantie fournie",
      "terms.summary.title": "Résumé",
      "terms.title": "Conditions générales",
      "terms.warranty.body": "Le Site est fourni « tel quel » sans garantie d'aucune sorte, expresse ou implicite.",
      "terms.warranty.title": "Exclusion de garantie",
      "title.archive": "axmcr — Archive",
      "title.chess": "axmcr — Échecs",
      "title.contact": "axmcr — Contact",
      "title.gallery": "axmcr — Galerie",
      "title.home": "axmcr — Accueil",
      "title.lab": "axmcr — Laboratoire",
      "title.licenses": "Licences de axmcr",
      "title.notes": "axmcr — Notes",
      "title.privacy": "axmcr — Politique de confidentialité",
      "title.terms": "axmcr — Conditions générales"
    },
    es: {
      "action.close": "Cerrar",
      "action.open": "Abrir",
      "action.reset": "Reiniciar",
      "action.undo": "Deshacer",
      "archive.card.download": "Descargar",
      "archive.card.size": "Tamaño del archivo: {size}",
      "archive.card.version": "Versión {version}",
      "archive.empty": "No se encontraron entradas de archivo.",
      "archive.lead": "Exportaciones versionadas del estado actual del sitio, si me acuerdo.",
      "archive.source.item1": "Manifiesto: site-archive/manifest.json",
      "archive.source.item2": "Formato: instantáneas comprimidas, para mí o para ti, nerd :)",
      "archive.source.item3": "Actual: v2.0",
      "archive.source.title": "Fuente",
      "archive.title": "Archivo",
      "chess.bot.off": "Bot: Desactivado",
      "chess.bot.status": "Bot: {level} - Juega con {side}",
      "chess.color.black": "Negro",
      "chess.color.white": "Blanco",
      "chess.engine.item1": "Validación de movimientos legales",
      "chess.engine.item2": "Bot sin conexión con niveles de dificultad",
      "chess.engine.item3": "Selección de lado y humano vs bot",
      "chess.engine.item4": "Deshacer, reiniciar, alternar tema",
      "chess.engine.title": "Motor",
      "chess.lead": "Un tablero limpio para probar la lógica de movimientos y la notación.",
      "chess.level.easy": "Fácil",
      "chess.level.hard": "Difícil",
      "chess.level.medium": "Medio",
      "chess.moves": "Historial de movimientos",
      "chess.piece.bishop": "Alfil",
      "chess.piece.king": "Rey",
      "chess.piece.knight": "Caballo",
      "chess.piece.label": "{piece} {color}",
      "chess.piece.pawn": "Peón",
      "chess.piece.queen": "Reina",
      "chess.piece.rook": "Torre",
      "chess.result.checkmate": "Jaque mate ? {winner} gana",
      "chess.result.insufficient": "Tablas ? Material insuficiente",
      "chess.result.stalemate": "Tablas ? Ahogado",
      "chess.result.threefold": "Tablas ? Repetición triple",
      "chess.result.title": "Juego terminado",
      "chess.setup.apply": "Aplicar y reiniciar",
      "chess.setup.difficulty": "Dificultad",
      "chess.setup.hvb": "Humano vs Bot",
      "chess.setup.hvh": "Humano vs Humano",
      "chess.setup.opponent": "Oponente",
      "chess.setup.play_as": "Jugar como",
      "chess.setup.title": "Configuración de partida",
      "chess.theme.dark": "Tema: Oscuro",
      "chess.theme.light": "Tema: Claro",
      "chess.title": "Ajedrez",
      "chess.turn.bot": " | Bot pensando",
      "chess.turn.check": " - Jaque",
      "chess.turn.move": "{color} mueve",
      "contact.github.desc": "Repositorios públicos.",
      "contact.spotify.desc": "Music Recs? Anyone?",
      "contact.title": "Contacto",
      "footer.by": "por Alex Mercer",
      "footer.copyright": "© 2026 Alex Mercer. Todos los derechos reservados. No se permite reutilización sin permiso.",
      "footer.licenses": "Licencias",
      "footer.privacy": "Política de privacidad",
      "footer.terms": "Términos y condiciones",
      "gallery.lead": "Estudios visuales capturados junto al trabajo técnico.",
      "gallery.modal.alt": "Vista previa de la galería",
      "gallery.specs.item1": "Recursos: 15 estudios SVG",
      "gallery.specs.item2": "Ubicación: assets/gallery/",
      "gallery.specs.item3": "Interacción: hover + vista previa modal",
      "gallery.specs.title": "Especificaciones",
      "gallery.title": "Galería",
      "home.archive_desc": "Exportaciones versionadas del sitio, incluyendo v2.0.",
      "home.archive_preview": "Vista previa del archivo",
      "home.by": "por Alex Mercer",
      "home.card.archive.desc": "Versiones comprimidas del sitio.",
      "home.card.chess.desc": "Tablero jugable con notación.",
      "home.card.contact.desc": "Enlaces principales y perfiles.",
      "home.card.gallery.desc": "Estudios visuales y pruebas de geometría.",
      "home.card.lab.desc": "Sistemas y módulos activos.",
      "home.card.notes.desc": "Notas técnicas y experimentos.",
      "home.gallery_count": "Dos estudios destacados.",
      "home.gallery_preview": "Vista previa de la galería",
      "home.lead": "Un archivo personal de notas, experimentos y herramientas.",
      "home.notes_desc": "Entradas cortas, actualizadas según sea necesario.",
      "home.open_archive": "Abrir archivo",
      "home.open_notes": "Abrir notas",
      "home.quote": "Claus Hugo Strandberg: \"Codicia e ignorancia, amigo mío. Esas son las piedras angulares de cualquier buena estafa.\"",
      "home.recent_notes": "Notas recientes",
      "home.site_index": "Índice del sitio",
      "home.system.item1": "Build estática, lista para uso sin conexión.",
      "home.system.item2": "Cuadrícula procedimental y campo de cuadrados flotantes.",
      "home.system.item3": "Motor de ajedrez manual con registro de notación.",
      "home.system.title": "Sistema",
      "home.view_full_gallery": "Ver galería completa",
      "lab.assets.item1": "Estudios SVG locales de la galería",
      "lab.assets.item2": "Texturas de ruido y cuadrícula",
      "lab.assets.item3": "Piezas de ajedrez SVG",
      "lab.assets.item4": "Fuentes locales: Inter + JetBrains Mono",
      "lab.assets.title": "Activos de referencia",
      "lab.demo.background": "Sistemas de fondo",
      "lab.demo.gallery": "Modal de galería",
      "lab.demo.lead": "Lanza vistas previas de sistemas clave sin salir del lab.",
      "lab.demo.loading": "Pantalla de carga",
      "lab.demo.title": "Consola de demostración",
      "lab.lead": "Módulos activos y experimentos que impulsan el sitio.",
      "lab.modules.item1": "Cuadrícula procedimental + cuadrados flotantes",
      "lab.modules.item2": "Renderizador de notas con bloques de código",
      "lab.modules.item3": "Manifiesto de archivo y tarjetas de descarga",
      "lab.modules.item4": "Motor de ajedrez con historial de notación",
      "lab.modules.title": "Módulos activos",
      "lab.notes.lead": "Esta página rastrea lo que se ejecuta en segundo plano. Los detalles se mantienen breves y operativos.",
      "lab.notes.title": "Notas",
      "lab.scope.item1": "Sistemas visuales y movimiento de interfaz",
      "lab.scope.item2": "Renderizado de datos y manifiestos",
      "lab.scope.item3": "Herramientas autónomas",
      "lab.scope.title": "Alcance",
      "lab.title": "Laboratorio",
      "licenses.assets.body": "Todos los iconos, activos de ajedrez, texturas y elementos visuales de fondo son creaciones originales para este proyecto. No se distribuye ninguna imagen de stock con licencia en la build.",
      "licenses.assets.title": "Activos de terceros",
      "licenses.coverage.item1": "Sin bibliotecas de ejecución externas",
      "licenses.coverage.item2": "Todos los gráficos producidos internamente",
      "licenses.coverage.item3": "Distribución prioritaria sin conexión",
      "licenses.coverage.title": "Cobertura",
      "licenses.fonts.body": "Se utilizan fuentes alojadas localmente para la tipografía. Sus licencias se aplican por separado y no se reproducen aquí.",
      "licenses.fonts.title": "Fuentes",
      "licenses.lead": "Divulgaciones de licencias de terceros para axmcr.",
      "licenses.libraries.body": "No se incluyen bibliotecas, frameworks ni scripts externos con este sitio.",
      "licenses.libraries.title": "Bibliotecas de terceros",
      "licenses.overview.body": "Esta página documenta las licencias de terceros incluidas con axmcr. El sitio se entrega como una build estática, offline-first, con HTML, CSS y JavaScript personalizados escritos por Alex Mercer.",
      "licenses.overview.title": "Resumen",
      "licenses.title": "Licencias",
      "loader.loading": "Cargando...",
      "loader.page.archive": "Archivo",
      "loader.page.chess": "Ajedrez",
      "loader.page.contact": "Contacto",
      "loader.page.gallery": "Galería",
      "loader.page.home": "Inicio",
      "loader.page.lab": "Laboratorio",
      "loader.page.licenses": "Licencias",
      "loader.page.notes": "Notas",
      "loader.page.privacy": "Privacidad",
      "loader.page.terms": "Términos",
      "nav.archive": "Archivo",
      "nav.chess": "Ajedrez",
      "nav.contact": "Contacto",
      "nav.gallery": "Galería",
      "nav.home": "Inicio",
      "nav.lab": "Laboratorio",
      "nav.language": "Idioma",
      "nav.local": "Local",
      "nav.more": "Más pronto",
      "nav.notes": "Notas",
      "notes.coming.lead": "Un feed de notas en vivo aparecerá aquí después del lanzamiento.",
      "notes.coming.title": "Próximamente cuando el sitio se publique",
      "notes.lead": "Próximamente cuando el sitio se publique.",
      "notes.status.item1": "Las notas se publicarán después del lanzamiento.",
      "notes.status.item2": "El índice permanece disponible en la página principal.",
      "notes.status.item3": "Los borradores permanecen sin conexión hasta el lanzamiento.",
      "notes.status.title": "Estado",
      "notes.title": "Notas",
      "privacy.collection.body": "El Sitio está alojado como un proyecto estático y no recopila datos personales intencionalmente. No se integran formularios, rastreadores ni scripts de analítica.",
      "privacy.collection.title": "Recopilación de información",
      "privacy.contact.body": "Para preguntas relacionadas con la privacidad, contacte a Alex Mercer a través de los enlaces en la página de Contacto.",
      "privacy.contact.title": "Información de contacto",
      "privacy.cookies.body": "El Sitio no establece cookies ni utiliza almacenamiento local más allá de lo que su navegador pueda aplicar por defecto.",
      "privacy.cookies.title": "Cookies",
      "privacy.definitions.body": "\"Sitio\" se refiere a axmcr, un sitio web estático creado por Alex Mercer. \"Usted\" se refiere a cualquier visitante del Sitio.",
      "privacy.definitions.title": "Definiciones",
      "privacy.external.body": "Los enlaces externos pueden dirigirle a sitios de terceros con sus propias prácticas de privacidad. Revise esas políticas antes de interactuar con esos servicios.",
      "privacy.external.title": "Enlaces externos",
      "privacy.github.body": "Si el Sitio se aloja o se refleja a través de GitHub, GitHub puede recopilar y procesar datos de acceso según sus propias políticas. El manejo de datos de GitHub es independiente de axmcr.",
      "privacy.github.title": "Divulgación del repositorio de GitHub",
      "privacy.hosting.body": "Los proveedores de alojamiento estático pueden registrar direcciones IP, marcas de tiempo de acceso y metadatos básicos de solicitudes como parte de las operaciones estándar del servidor. Estos registros son gestionados por el proveedor de alojamiento y no están controlados por el Sitio.",
      "privacy.hosting.title": "Alojamiento e infraestructura",
      "privacy.lead": "Fecha de entrada en vigor: 13 de marzo de 2026",
      "privacy.rights.body": "Debido a que el Sitio no recopila datos personales, no hay información personal almacenada para acceder, corregir o eliminar.",
      "privacy.rights.title": "Derechos del usuario",
      "privacy.security.body": "No se almacenan datos personales en el Sitio. Las responsabilidades de seguridad relacionadas con la infraestructura de alojamiento recaen en el proveedor de alojamiento.",
      "privacy.security.title": "Seguridad de datos",
      "privacy.summary.item1": "Sin recopilación intencional de datos personales",
      "privacy.summary.item2": "El alojamiento estático puede registrar datos de acceso",
      "privacy.summary.item3": "Los enlaces externos se gestionan por separado",
      "privacy.summary.title": "Resumen",
      "privacy.title": "Política de privacidad",
      "privacy.updates.body": "Esta política puede actualizarse para reflejar cambios en el Sitio o en el entorno de alojamiento. La fecha de entrada en vigor anterior se actualizará cuando ocurran cambios.",
      "privacy.updates.title": "Actualizaciones de la política",
      "terms.acceptance.body": "Al acceder al Sitio, usted acepta estos Términos y condiciones. Si no está de acuerdo, deje de usar el Sitio.",
      "terms.acceptance.title": "Aceptación de los términos",
      "terms.changes.body": "Los términos pueden actualizarse periódicamente. El uso continuo del Sitio indica la aceptación de los términos revisados.",
      "terms.changes.title": "Cambios en los términos",
      "terms.contact.body": "Para preguntas sobre estos términos, contacte a Alex Mercer a través de la página de Contacto.",
      "terms.contact.title": "Contacto",
      "terms.definitions.body": "\"Sitio\" se refiere a axmcr, creado por Alex Mercer. \"Usted\" se refiere a cualquier visitante del Sitio.",
      "terms.definitions.title": "Definiciones",
      "terms.external.body": "El Sitio puede enlazar a servicios externos. Esos servicios se rigen por sus propios términos y políticas.",
      "terms.external.title": "Enlaces externos",
      "terms.ip.body": "Salvo que se indique lo contrario, todo el contenido original del Sitio es propiedad de Alex Mercer. Todos los derechos reservados. No se permite reutilización, redistribución ni uso derivado sin permiso explícito.",
      "terms.ip.title": "Propiedad intelectual",
      "terms.lead": "Fecha de entrada en vigor: 13 de marzo de 2026",
      "terms.liability.body": "Alex Mercer no es responsable de ningún daño derivado del uso o la imposibilidad de usar el Sitio.",
      "terms.liability.title": "Limitación de responsabilidad",
      "terms.permitted.body": "Puede ver, leer y referenciar el Sitio con fines personales e informativos.",
      "terms.permitted.title": "Uso permitido",
      "terms.prohibited.body": "No puede intentar interrumpir el Sitio, acceder a infraestructura restringida o republicar materiales de manera engañosa.",
      "terms.prohibited.title": "Uso prohibido",
      "terms.summary.item1": "Archivo técnico personal",
      "terms.summary.item2": "Contenido propiedad de Alex Mercer",
      "terms.summary.item3": "Sin garantía",
      "terms.summary.title": "Resumen",
      "terms.title": "Términos y condiciones",
      "terms.warranty.body": "El Sitio se proporciona \"tal cual\" sin garantías de ningún tipo, expresas o implícitas.",
      "terms.warranty.title": "Exención de garantía",
      "title.archive": "axmcr — Archivo",
      "title.chess": "axmcr — Ajedrez",
      "title.contact": "axmcr — Contacto",
      "title.gallery": "axmcr — Galería",
      "title.home": "axmcr — Inicio",
      "title.lab": "axmcr — Laboratorio",
      "title.licenses": "Licencias de axmcr",
      "title.notes": "axmcr — Notas",
      "title.privacy": "axmcr — Política de privacidad",
      "title.terms": "axmcr — Términos y condiciones"
    },
    ru: {
      "action.close": "Закрыть",
      "action.open": "Открыть",
      "action.reset": "Сбросить",
      "action.undo": "Отменить",
      "archive.card.download": "Скачать",
      "archive.card.size": "Размер файла: {size}",
      "archive.card.version": "Версия {version}",
      "archive.empty": "Записей архива не найдено.",
      "archive.lead": "Версионные выгрузки текущего состояния сайта, если я вспомню.",
      "archive.source.item1": "Манифест: site-archive/manifest.json",
      "archive.source.item2": "Формат: архивированные снимки, для меня или для тебя, nerd :)",
      "archive.source.item3": "Текущая: v2.0",
      "archive.source.title": "Источник",
      "archive.title": "Архив",
      "chess.bot.off": "Бот: Выключен",
      "chess.bot.status": "Бот: {level} - Играет за {side}",
      "chess.color.black": "Черный",
      "chess.color.white": "Белый",
      "chess.engine.item1": "Проверка допустимых ходов",
      "chess.engine.item2": "Оффлайн-бот с уровнями сложности",
      "chess.engine.item3": "Выбор стороны и человек против бота",
      "chess.engine.item4": "Отмена хода, сброс, переключение темы",
      "chess.engine.title": "Движок",
      "chess.lead": "Чистая доска для проверки логики ходов и нотации.",
      "chess.level.easy": "Легкий",
      "chess.level.hard": "Сложный",
      "chess.level.medium": "Средний",
      "chess.moves": "История ходов",
      "chess.piece.bishop": "Слон",
      "chess.piece.king": "Король",
      "chess.piece.knight": "Конь",
      "chess.piece.label": "{color} {piece}",
      "chess.piece.pawn": "Пешка",
      "chess.piece.queen": "Ферзь",
      "chess.piece.rook": "Ладья",
      "chess.result.checkmate": "Мат ? Побеждают {winner}",
      "chess.result.insufficient": "Ничья ? Недостаточно материала",
      "chess.result.stalemate": "Ничья ? Пат",
      "chess.result.threefold": "Ничья ? Троекратное повторение",
      "chess.result.title": "Игра окончена",
      "chess.setup.apply": "Применить и перезапустить",
      "chess.setup.difficulty": "Сложность",
      "chess.setup.hvb": "Человек против бота",
      "chess.setup.hvh": "Человек против человека",
      "chess.setup.opponent": "Соперник",
      "chess.setup.play_as": "Играть за",
      "chess.setup.title": "Настройка партии",
      "chess.theme.dark": "Тема: Темная",
      "chess.theme.light": "Тема: Светлая",
      "chess.title": "Шахматы",
      "chess.turn.bot": " | Бот думает",
      "chess.turn.check": " - Шах",
      "chess.turn.move": "{color} ходит",
      "contact.github.desc": "Публичные репозитории.",
      "contact.spotify.desc": "Music Recs? Anyone?",
      "contact.title": "Контакты",
      "footer.by": "от Alex Mercer",
      "footer.copyright": "© 2026 Alex Mercer. Все права защищены. Повторное использование без разрешения запрещено.",
      "footer.licenses": "Лицензии",
      "footer.privacy": "Политика конфиденциальности",
      "footer.terms": "Условия использования",
      "gallery.lead": "Визуальные исследования, созданные параллельно технической работе.",
      "gallery.modal.alt": "Предпросмотр галереи",
      "gallery.specs.item1": "Ресурсы: 15 SVG-исследований",
      "gallery.specs.item2": "Расположение: assets/gallery/",
      "gallery.specs.item3": "Взаимодействие: наведение + модальный просмотр",
      "gallery.specs.title": "Характеристики",
      "gallery.title": "Галерея",
      "home.archive_desc": "Версионные выгрузки сайта, включая v2.0.",
      "home.archive_preview": "Превью архива",
      "home.by": "от Alex Mercer",
      "home.card.archive.desc": "Архивированные версии сайта.",
      "home.card.chess.desc": "Игровая доска с нотацией.",
      "home.card.contact.desc": "Основные ссылки и профили.",
      "home.card.gallery.desc": "Визуальные исследования и геометрические тесты.",
      "home.card.lab.desc": "Активные системы и модули.",
      "home.card.notes.desc": "Технические заметки и эксперименты.",
      "home.gallery_count": "Два избранных исследования.",
      "home.gallery_preview": "Превью галереи",
      "home.lead": "Личный архив заметок, экспериментов и инструментов.",
      "home.notes_desc": "Короткие записи, обновляются по мере необходимости.",
      "home.open_archive": "Открыть архив",
      "home.open_notes": "Открыть заметки",
      "home.quote": "Клаус Хьюго Страндберг: «Жадность и невежество, мой друг. Вот краеугольные камни любой хорошей аферы.»",
      "home.recent_notes": "Свежие заметки",
      "home.site_index": "Индекс сайта",
      "home.system.item1": "Статическая сборка, готовая к работе офлайн.",
      "home.system.item2": "Процедурная сетка и поле плавающих квадратов.",
      "home.system.item3": "Ручной шахматный движок с журналом нотации.",
      "home.system.title": "Система",
      "home.view_full_gallery": "Открыть всю галерею",
      "lab.assets.item1": "Локальные SVG-исследования галереи",
      "lab.assets.item2": "Текстуры шума и сетки",
      "lab.assets.item3": "SVG-фигуры для шахмат",
      "lab.assets.item4": "Локальные шрифты: Inter + JetBrains Mono",
      "lab.assets.title": "Справочные ресурсы",
      "lab.demo.background": "Фоновые системы",
      "lab.demo.gallery": "Модальное окно галереи",
      "lab.demo.lead": "Запуск превью ключевых систем, не покидая лабораторию.",
      "lab.demo.loading": "Экран загрузки",
      "lab.demo.title": "Демо-консоль",
      "lab.lead": "Активные модули и эксперименты, поддерживающие сайт.",
      "lab.modules.item1": "Процедурная сетка + плавающие квадраты",
      "lab.modules.item2": "Рендер заметок с код-блоками",
      "lab.modules.item3": "Манифест архива и карточки скачивания",
      "lab.modules.item4": "Шахматный движок с историей нотации",
      "lab.modules.title": "Активные модули",
      "lab.notes.lead": "Эта страница отслеживает то, что работает в фоне. Детали остаются краткими и рабочими.",
      "lab.notes.title": "Заметки",
      "lab.scope.item1": "Визуальные системы и движение интерфейса",
      "lab.scope.item2": "Рендеринг данных и манифесты",
      "lab.scope.item3": "Автономные инструменты",
      "lab.scope.title": "Область",
      "lab.title": "Лаборатория",
      "licenses.assets.body": "Все иконки, шахматные ресурсы, текстуры и фоновые визуалы являются оригинальными работами для этого проекта. Лицензированные стоковые изображения не распространяются вместе со сборкой.",
      "licenses.assets.title": "Сторонние ресурсы",
      "licenses.coverage.item1": "Нет внешних библиотек рантайма",
      "licenses.coverage.item2": "Вся графика создана внутри проекта",
      "licenses.coverage.item3": "Офлайн-ориентированная дистрибуция",
      "licenses.coverage.title": "Покрытие",
      "licenses.fonts.body": "Для типографики используются локально размещенные шрифты. Их лицензии применяются отдельно и здесь не приводятся.",
      "licenses.fonts.title": "Шрифты",
      "licenses.lead": "Раскрытие лицензий сторонних компонентов для axmcr.",
      "licenses.libraries.body": "На сайте нет сторонних библиотек, фреймворков или внешних скриптов.",
      "licenses.libraries.title": "Сторонние библиотеки",
      "licenses.overview.body": "Эта страница описывает сторонние лицензии, включенные в axmcr. Сайт поставляется как статическая офлайн-сборка с пользовательскими HTML, CSS и JavaScript, созданными Alex Mercer.",
      "licenses.overview.title": "Обзор",
      "licenses.title": "Лицензии",
      "loader.loading": "Загрузка...",
      "loader.page.archive": "Архив",
      "loader.page.chess": "Шахматы",
      "loader.page.contact": "Контакты",
      "loader.page.gallery": "Галерея",
      "loader.page.home": "Главная",
      "loader.page.lab": "Лаборатория",
      "loader.page.licenses": "Лицензии",
      "loader.page.notes": "Заметки",
      "loader.page.privacy": "Конфиденциальность",
      "loader.page.terms": "Условия",
      "nav.archive": "Архив",
      "nav.chess": "Шахматы",
      "nav.contact": "Контакты",
      "nav.gallery": "Галерея",
      "nav.home": "Главная",
      "nav.lab": "Лаборатория",
      "nav.language": "Язык",
      "nav.local": "Местное",
      "nav.more": "Скоро ещё",
      "nav.notes": "Заметки",
      "notes.coming.lead": "После запуска здесь появится живой поток заметок.",
      "notes.coming.title": "Скоро после запуска сайта",
      "notes.lead": "Скоро после запуска сайта.",
      "notes.status.item1": "Заметки будут опубликованы после запуска.",
      "notes.status.item2": "Индекс остаётся доступен на главной странице.",
      "notes.status.item3": "Черновики остаются офлайн до релиза.",
      "notes.status.title": "Статус",
      "notes.title": "Заметки",
      "privacy.collection.body": "Сайт размещен как статический проект и не собирает персональные данные намеренно. Формы, трекеры или аналитические скрипты не встроены.",
      "privacy.collection.title": "Сбор информации",
      "privacy.contact.body": "По вопросам конфиденциальности свяжитесь с Alex Mercer через ссылки на странице контактов.",
      "privacy.contact.title": "Контактная информация",
      "privacy.cookies.body": "Сайт не устанавливает cookies и не использует локальное хранилище сверх того, что ваш браузер применяет по умолчанию.",
      "privacy.cookies.title": "Cookies",
      "privacy.definitions.body": "\"Сайт\" означает axmcr, статический веб-сайт, созданный Alex Mercer. \"Вы\" означает любого посетителя Сайта.",
      "privacy.definitions.title": "Определения",
      "privacy.external.body": "Внешние ссылки могут вести на сторонние сайты с их собственными практиками конфиденциальности. Ознакомьтесь с их политиками перед взаимодействием с этими сервисами.",
      "privacy.external.title": "Внешние ссылки",
      "privacy.github.body": "Если Сайт размещен или зеркалируется через GitHub, GitHub может собирать и обрабатывать данные доступа согласно своим политикам. Обработка данных GitHub не зависит от axmcr.",
      "privacy.github.title": "Раскрытие информации о репозитории GitHub",
      "privacy.hosting.body": "Провайдеры статического хостинга могут записывать IP-адреса, временные метки доступа и базовые метаданные запросов в рамках стандартной работы серверов. Эти журналы управляются провайдером хостинга и не контролируются Сайтом.",
      "privacy.hosting.title": "Хостинг и инфраструктура",
      "privacy.lead": "Дата вступления в силу: 13 марта 2026 г.",
      "privacy.rights.body": "Поскольку Сайт не собирает персональные данные, отсутствует сохранённая персональная информация для доступа, исправления или удаления.",
      "privacy.rights.title": "Права пользователя",
      "privacy.security.body": "Персональные данные на Сайте не хранятся. Ответственность за безопасность инфраструктуры хостинга несёт провайдер хостинга.",
      "privacy.security.title": "Безопасность данных",
      "privacy.summary.item1": "Нет намеренного сбора персональных данных",
      "privacy.summary.item2": "Статический хостинг может фиксировать данные доступа",
      "privacy.summary.item3": "Внешние ссылки обрабатываются отдельно",
      "privacy.summary.title": "Кратко",
      "privacy.title": "Политика конфиденциальности",
      "privacy.updates.body": "Эта политика может обновляться, чтобы отражать изменения в Сайте или в среде хостинга. Дата вступления в силу выше будет обновлена при изменениях.",
      "privacy.updates.title": "Обновления политики",
      "terms.acceptance.body": "Получая доступ к Сайту, вы соглашаетесь с этими Условиями. Если вы не согласны, прекратите использование Сайта.",
      "terms.acceptance.title": "Принятие условий",
      "terms.changes.body": "Условия могут обновляться периодически. Продолжение использования Сайта означает принятие обновленных условий.",
      "terms.changes.title": "Изменения условий",
      "terms.contact.body": "По вопросам, связанным с этими условиями, свяжитесь с Alex Mercer через страницу контактов.",
      "terms.contact.title": "Контакт",
      "terms.definitions.body": "\"Сайт\" означает axmcr, созданный Alex Mercer. \"Вы\" означает любого посетителя Сайта.",
      "terms.definitions.title": "Определения",
      "terms.external.body": "Сайт может содержать ссылки на внешние сервисы. Эти сервисы регулируются собственными условиями и политиками.",
      "terms.external.title": "Внешние ссылки",
      "terms.ip.body": "Если не указано иное, весь оригинальный контент на Сайте принадлежит Alex Mercer. Все права защищены. Повторное использование, перераспределение или производное использование запрещены без явного разрешения.",
      "terms.ip.title": "Интеллектуальная собственность",
      "terms.lead": "Дата вступления в силу: 13 марта 2026 г.",
      "terms.liability.body": "Alex Mercer не несет ответственности за любые убытки, возникшие из-за использования или невозможности использования Сайта.",
      "terms.liability.title": "Ограничение ответственности",
      "terms.permitted.body": "Вы можете просматривать, читать и ссылаться на Сайт в личных и информационных целях.",
      "terms.permitted.title": "Разрешенное использование",
      "terms.prohibited.body": "Вы не можете пытаться нарушить работу Сайта, получить доступ к ограниченной инфраструктуре или публиковать материалы вводящим в заблуждение образом.",
      "terms.prohibited.title": "Запрещенное использование",
      "terms.summary.item1": "Личный технический архив",
      "terms.summary.item2": "Контент принадлежит Alex Mercer",
      "terms.summary.item3": "Гарантии не предоставляются",
      "terms.summary.title": "Кратко",
      "terms.title": "Условия использования",
      "terms.warranty.body": "Сайт предоставляется «как есть» без каких-либо гарантий, явных или подразумеваемых.",
      "terms.warranty.title": "Отказ от гарантий",
      "title.archive": "axmcr — Архив",
      "title.chess": "axmcr — Шахматы",
      "title.contact": "axmcr — Контакты",
      "title.gallery": "axmcr — Галерея",
      "title.home": "axmcr — Главная",
      "title.lab": "axmcr — Лаборатория",
      "title.licenses": "Лицензии axmcr",
      "title.notes": "axmcr — Заметки",
      "title.privacy": "axmcr — Политика конфиденциальности",
      "title.terms": "axmcr — Условия использования"
    }
  };

  const normalizeLang = (value) => (translations[value] ? value : "en");

  const getStoredLanguage = () => {
    try {
      return localStorage.getItem("siteLanguage") || "en";
    } catch (error) {
      return "en";
    }
  };

  let currentLanguage = normalizeLang(getStoredLanguage());

  const formatText = (text, vars = {}) =>
    text.replace(/\{(\w+)\}/g, (_match, key) => (key in vars ? vars[key] : ""));

  const t = (key, vars) => {
    const table = translations[currentLanguage] || {};
    const base = table[key] || baseStrings[key] || defaultTextMap[key] || key;
    return formatText(base, vars);
  };

  const changeListeners = new Set();
  const notifyLanguageChange = () => {
    changeListeners.forEach((handler) => {
      try {
        handler(currentLanguage);
      } catch (error) {
        // Ignore listener failures.
      }
    });
  };

  const applyTranslations = () => {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (!key) return;
      const text = t(key);
      if (el.tagName === "TITLE") {
        document.title = text;
      }
      el.textContent = text;
    });
    document.querySelectorAll("#lang-select").forEach((select) => {
      select.value = currentLanguage;
      select.setAttribute("aria-label", t("nav.language"));
    });
  };

  const setLanguage = (lang) => {
    currentLanguage = normalizeLang(lang);
    try {
      localStorage.setItem("siteLanguage", currentLanguage);
    } catch (error) {
      // Ignore storage errors.
    }
    applyTranslations();
    notifyLanguageChange();
  };

  window.siteI18n = {
    t,
    setLanguage,
    getLanguage: () => currentLanguage,
    onChange: (handler) => {
      if (typeof handler === "function") changeListeners.add(handler);
      return () => changeListeners.delete(handler);
    }
  };

  document.querySelectorAll("#lang-select").forEach((select) => {
    select.addEventListener("change", (event) => {
      const next = event.target.value;
      setLanguage(next);
    });
  });

  applyTranslations();


  const getStoredStart = () => {
    try {
      const stored = sessionStorage.getItem("loaderStart");
      const parsed = stored ? Number(stored) : NaN;
      return Number.isFinite(parsed) ? parsed : Date.now();
    } catch (error) {
      return Date.now();
    }
  };

  let loaderStart = getStoredStart();

  const showLoader = () => {
    if (!loader) return;
    loader.classList.add("is-active");
    loader.classList.remove("is-exit");
  };

  const hideLoader = () => {
    if (!loader) return;
    const elapsed = Date.now() - loaderStart;
    const delay = Math.max(0, MIN_LOADER_MS - elapsed);
    setTimeout(() => {
      loader.classList.add("is-exit");
      setTimeout(() => {
        loader.classList.remove("is-active", "is-exit");
        try {
          sessionStorage.removeItem("loaderStart");
        } catch (error) {
          // Ignore storage errors.
        }
      }, 520);
    }, delay);
  };

  if (loader) {
    showLoader();
    window.addEventListener("load", hideLoader, { once: true });
  }

  const quoteTargets = document.querySelectorAll("[data-loader-quote]");
  if (quoteTargets.length) {
    const quotes = [
      "Greed is a bottomless pit which exhausts the person in an endless effort to satisfy the need without ever reaching satisfaction. - Erich Fromm",
      "Earth provides enough to satisfy every man's needs, but not every man's greed. - Mahatma Gandhi",
      "The more you have, the more you know you don't have. - Aristotle Onassis",
      "It is not the man who has too little, but the man who craves more, that is poor. - Seneca",
      "We are in danger of destroying ourselves by our greed and stupidity. - Stephen Hawking",
      "Greed is the lack of confidence of one's own ability to create. - Vanna Bonta",
      "There is no fire like passion, there is no shark like hatred, there is no snare like folly, there is no torrent like greed. - Siddharta Gautama",
      "The greedy search for money or success will almost always lead men into unhappiness. - Andre Maurois",
      "He who is not contented with what he has, would not be contented with what he would like to have. - Socrates",
      "Greed lessens what is gathered. - Arab proverb",
      "There is a sufficiency in the world for people's need but not for people's greed. - Mohandas Gandhi",
      "The avaricious man is like the barren sandy ground of the desert which sucks in all the rain and dew with greediness, but yields no fruitful herbs or plants for the benefit of others. - Zeno",
      "Wealth is like sea-water; the more we drink, the thirstier we become. - Arthur Schopenhauer",
      "Nothing makes us more vulnerable than loneliness, except greed. - Thomas Harris",
      "Hell has three gates: lust, anger, and greed. - Bhagavad Gita"
    ];
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    quoteTargets.forEach((target) => {
      target.textContent = pick;
    });
  }


  const loaderIcons = document.querySelectorAll("[data-loader-icon]");
  if (loaderIcons.length) {
    const iconPaths = [
      "assets/stars/LOCKPICK.svg",
      "assets/stars/RIFLE.svg",
      "assets/stars/MEDICALTOOLS.svg",
      "assets/stars/SILVERBALLER.svg"
    ];
    loaderIcons.forEach((icon) => {
      const pick = iconPaths[Math.floor(Math.random() * iconPaths.length)];
      icon.src = pick;
    });
  }

  // Page fade-in.
  requestAnimationFrame(() => {
    body.classList.add("page-ready");
  });

  // Smooth page transitions for internal links.
  const isInternalLink = (link) => {
    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("#")) return false;
    if (link.target === "_blank" || link.hasAttribute("download")) return false;
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    return true;
  };

  document.querySelectorAll("a").forEach((link) => {
    if (!isInternalLink(link)) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      body.classList.add("page-exit");
      loaderStart = Date.now();
      try {
        sessionStorage.setItem("loaderStart", String(loaderStart));
      } catch (error) {
        // Ignore storage errors.
      }
      showLoader();
      const target = link.getAttribute("href");
      setTimeout(() => {
        window.location.href = target;
      }, 360);
    });
  });

  // Active navigation state.
  const navLinks = document.querySelectorAll("[data-nav]");
  const current = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Docked navigation when scrolling.
  const header = document.querySelector(".site-header");
  const sideNav = document.querySelector(".side-nav");
  const dockThreshold = 260;
  const updateDock = () => {
    const docked = window.scrollY > dockThreshold;
    header?.classList.toggle("docked", docked);
    body.classList.toggle("nav-docked", docked);
    if (sideNav) {
      sideNav.setAttribute("aria-hidden", docked ? "false" : "true");
    }
  };
  window.addEventListener("scroll", updateDock);
  updateDock();

  // Clock.
  const clockEls = document.querySelectorAll("[data-clock]");
  if (clockEls.length) {
    const formatter = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    const tick = () => {
      const time = formatter.format(new Date());
      clockEls.forEach((el) => {
        el.textContent = time;
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  // Scroll reveal for blur/fade elements.
  const revealTargets = document.querySelectorAll("[data-reveal], [data-blur-text]");
  if (revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.35 }
    );
    revealTargets.forEach((target) => observer.observe(target));
  }

  // Gallery modal interactions.
  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("modal-image");
  const modalClose = document.getElementById("modal-close");
  if (modal && modalImage) {
    const thumbnails = document.querySelectorAll("[data-gallery]");
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        modalImage.src = thumb.dataset.full;
        modalImage.alt = thumb.dataset.alt || t("gallery.modal.alt");
        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden", "false");
      });
    });

    const closeModal = () => {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    };

    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });

    modalClose?.addEventListener("click", closeModal);
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  // Lab demo overlays.
  const demoButtons = document.querySelectorAll("[data-demo-open]");
  if (demoButtons.length) {
    demoButtons.forEach((button) => {
      const targetId = button.getAttribute("data-demo-open");
      const modalEl = targetId ? document.getElementById(targetId) : null;
      button.addEventListener("click", () => {
        if (!modalEl) return;
        modalEl.classList.add("is-active");
        modalEl.setAttribute("aria-hidden", "false");
      });
    });

    document.querySelectorAll("[data-demo-close]").forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        const modalEl = closeBtn.closest(".demo-modal");
        if (!modalEl) return;
        modalEl.classList.remove("is-active");
        modalEl.setAttribute("aria-hidden", "true");
      });
    });
  }

  // Archive listing from local manifest.
  const archiveList = document.getElementById("archive-list");
  const archivePreview = document.getElementById("archive-preview");
  if (archiveList || archivePreview) {
    let archiveEntriesCache = [];
    const formatSize = (bytes) => {
      if (bytes < 1024) return `${bytes} B`;
      const kb = bytes / 1024;
      if (kb < 1024) return `${kb.toFixed(1)} KB`;
      return `${(kb / 1024).toFixed(1)} MB`;
    };

    const buildCard = (entry) => {
      const card = document.createElement("article");
      card.className = "archive-card";

      const title = document.createElement("h3");
      title.textContent = t("archive.card.version", { version: entry.version });

      const size = document.createElement("p");
      size.className = "muted";
      size.textContent = t("archive.card.size", { size: formatSize(entry.size) });

      const download = document.createElement("a");
      download.href = entry.file;
      download.textContent = t("archive.card.download");
      download.setAttribute("download", "");

      card.appendChild(title);
      card.appendChild(size);
      card.appendChild(download);
      return card;
    };

    const renderAll = (entries) => {
      if (archiveList) {
        archiveList.innerHTML = "";
        if (!entries.length) {
          archiveList.innerHTML = `<p class="muted">${t("archive.empty")}</p>`;
        } else {
          entries.forEach((entry) => archiveList.appendChild(buildCard(entry)));
        }
      }

      if (archivePreview) {
        archivePreview.innerHTML = "";
        if (!entries.length) {
          archivePreview.innerHTML = `<p class="muted">${t("archive.empty")}</p>`;
        } else {
          const previewEntries = entries.slice(0, Math.min(2, entries.length));
          previewEntries.forEach((entry) => archivePreview.appendChild(buildCard(entry)));
        }
      }
    };

    const loadFallback = () => {
      const fallback = document.getElementById("archive-fallback");
      if (!fallback) return null;
      try {
        return JSON.parse(fallback.textContent);
      } catch (error) {
        return null;
      }
    };

    fetch("site-archive/manifest.json")
      .then((response) => response.json())
      .then((entries) => {
        archiveEntriesCache = entries;
        renderAll(entries);
      })
      .catch(() => {
        const entries = loadFallback() || [];
        archiveEntriesCache = entries;
        renderAll(entries);
      });

    window.siteI18n?.onChange?.(() => {
      renderAll(archiveEntriesCache);
    });
  }
})();
