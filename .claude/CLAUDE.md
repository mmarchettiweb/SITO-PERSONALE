# mmarchetti-new — Sito web Marco Marchetti

Sito statico HTML/CSS/JS per Marco Marchetti, consulente e formatore digitale.

## Struttura

```
mmarchetti-new/
├── index.html              # Home
├── chi-sono.html           # Biografia
├── consulenza.html         # Servizi di consulenza PMI
├── formazione.html         # Corsi e percorsi formativi
├── scuola-futuro.html      # Progetto educativo scuole
├── contatti.html           # Form di contatto (Formspree)
├── privacy.html            # Privacy policy GDPR (noindex — linkata dal form)
├── robots.txt
├── sitemap.xml             # Dominio: mmarchetti.it (da allineare ai canonical HTML)
├── favicon.svg
├── assets/
│   ├── css/
│   │   ├── reset.css               # Reset CSS
│   │   ├── variables.css           # Variabili CSS (colori, font, spaziature, ombre)
│   │   ├── main.css                # Stili globali, navbar, footer, componenti condivisi
│   │   ├── home.css                # Stili specifici index.html (stat-card — riserva)
│   │   ├── chi-sono.css            # Stili specifici chi-sono.html (bio, skills)
│   │   ├── consulenza.css          # Stili specifici consulenza.html (pmi, benefit-list)
│   │   ├── formazione.css          # Stili specifici formazione.html (badge, quote, aree, corso-card)
│   │   ├── scuola-futuro.css       # Stili specifici scuola-futuro.html (temi, scuola-*)
│   │   └── contatti.css            # Stili specifici contatti.html (form, gdpr, contatti-diretti)
│   ├── js/
│   │   └── main.js         # Navbar, hamburger, animazioni, cursore personalizzato, typewriter
│   └── images/
│       ├── hero_bg_new.jpg                      # Hero background (via CSS) — 2400×1200
│       ├── logo_mmarchetti_1.png                # Logo — 900×260
│       ├── web_designer_pro_v1_studio.jpg       # chi-sono.html (ritratto studio) — 832×1248
│       ├── web_designer_pro_v4_darkstudio.jpg   # chi-sono.html (al lavoro) — 832×1248
│       ├── web_designer_pro_v5_european.jpg     # index.html (piazza) — 832×1248
│       ├── web_designer_pro_v6_dramatic.jpg     # consulenza.html (ritratto) — 832×1248
│       ├── consulenza_me_v1_ai_workshop.jpg     # consulenza.html (workshop AI) — 1344×768
│       ├── consulenza_me_v3_digital_marketing.jpg  # formazione.html (marketing) — 1344×768
│       ├── consulenza_me_v4_comunicazione.jpg   # formazione.html (comunicazione) — 1344×768
│       ├── consulenza_me_v5_formazione.jpg      # formazione.html (AI team) — 1344×768
│       └── dashboard_strumenti_digitali.png     # formazione.html (dashboard) — 1024×1024
└── _work/                  # Documenti di lavoro (non pubblicati, esclusi da robots.txt)
    ├── brief-immagini.html
    ├── brief-immagini.pdf
    └── seo-report.html
```

## Stack tecnico

- HTML5 semantico (no framework)
- CSS vanilla con variabili custom (`variables.css`)
- JavaScript vanilla — nessuna dipendenza esterna
- Font Google Fonts: Barlow Condensed, DM Sans
- Form contatti: Formspree (`https://formspree.io/f/XXXXXXXX` — endpoint da configurare)
- SEO: Schema.org JSON-LD, Open Graph, Twitter Card, sitemap.xml

## Convenzioni CSS

Ogni pagina ha il suo file CSS dedicato che viene linkato dopo `main.css`. Nessun CSS inline negli HTML. Nessun valore colore hardcoded — si usano sempre le variabili di `variables.css`.

**File CSS:**
- `reset.css` — reset base
- `variables.css` — variabili CSS del brand (colori, hover, gradienti, font, spaziature, ombre, breakpoint reference)
- `main.css` — stili globali: navbar, footer, bottoni, card, sezioni, hero, animazioni, utility
- `home.css` — `.stat-card`, `.stat-card--blu/arancio`, `.stat-label--small` (riserva, non attivi)
- `chi-sono.css` — `.bio-intro`, `.bio-paragraphs`, `.skills-list`, `.skill-tag`
- `consulenza.css` — `.pmi-hero-stats`, `.pmi-stat`, `.pmi-highlight`, `.benefit-list`
- `formazione.css` — `.badge`, `.badge-*`, `.quote-large`, `.quote-attr`, `.area-heading`, `.area-list`, `.corso-card`
- `scuola-futuro.css` — `.temi-grid`, `.tema-item`, `.scuola-apertura`, `.scuola-per-chi`, `.per-chi-item`
- `contatti.css` — form fields, `.contatti-layout`, `.gdpr-*`, `.contatto-*`

**Classi utili in main.css:**
- `.step-number--blu/viola/magenta/arancio/faded` — numeri step colorati
- `.content-centered` — div max-width 800px centrato
- `.quote-large`, `.quote-attr` → **formazione.css**
- `.area-heading`, `.area-list` → **formazione.css**
- `.text-muted`, `.note-blu` — testo attenuato / nota con bordo sinistro blu
- `.privacy-content`, `.privacy-heading`, `.privacy-para`, `.privacy-para--sm`, `.privacy-list` — pagina privacy
- `.mt-sm`, `.mt-md`, `.mt-lg`, `.mt-xl`, `.mb-sm`, `.mb-md`, `.mb-lg`, `.mb-xl` — utility margin
- `.benefit-list`, `.benefit-list__item`, `.benefit-list__icon` → **consulenza.css**
- `.visually-hidden` / `.sr-only` — accessibilità (alias equivalenti)

## Colori brand

```
--blu:          #1A7FD4    (hover: --blu-hover #1569B0)
--arancio:      #F5A623    (hover: --arancio-hover #E09513)
--magenta:      #E8357A    (hover: --magenta-hover #D12D6A)
--viola:        #7B1FA2
--nero:         #0A0A0A
--footer-bg:    #050505
```

## Note operative

- Il form contatti usa Formspree. L'endpoint `XXXXXXXX` va sostituito con l'ID reale.
- I canonical URL negli HTML usano `https://mmarchetti.web/` ma `sitemap.xml` e `robots.txt` usano `https://mmarchetti.it` — **da allineare prima del go-live**.
- `_work/` non è pubblicato (robots.txt include `Disallow: /_work/`).
- `privacy.html` non è nella navigazione principale ma è linkato dal form GDPR in contatti.html — NON eliminare.
- Tutte le immagini `<img>` hanno `alt`, `width`, `height` e `loading="lazy"` (eccetto logo navbar above-the-fold).
- La navbar mobile usa `position: absolute` (non `fixed`) per evitare conflitti con `backdrop-filter` del parent in Safari.
