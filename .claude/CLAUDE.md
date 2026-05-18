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
├── privacy.html            # Privacy policy GDPR
├── robots.txt
├── sitemap.xml             # Dominio: mmarchetti.it (da configurare)
├── favicon.svg
├── assets/
│   ├── css/
│   │   ├── reset.css       # Reset CSS
│   │   ├── variables.css   # Variabili CSS (colori, font, spaziature)
│   │   └── main.css        # Stili principali (~2100 righe)
│   ├── js/
│   │   └── main.js         # Navbar, hamburger menu, fade-in animations
│   └── images/
│       ├── logo_mmarchetti.png
│       ├── logo_mmarchetti_1.png
│       ├── hero_bg.png
│       ├── marco_profilo.png
│       ├── marco_al_lavoro.png
│       └── aula_formazione_workshop.png
└── _work/                  # Documenti di lavoro (non pubblicati)
    ├── brief-immagini.html
    └── brief-immagini.pdf
```

## Stack tecnico

- HTML5 semantico (no framework)
- CSS vanilla con variabili custom (`variables.css`)
- JavaScript vanilla — nessuna dipendenza esterna
- Font Google Fonts: Barlow Condensed, DM Sans, Bebas Neue
- Form contatti: Formspree (`https://formspree.io/f/XXXXXXXX` — endpoint da configurare)
- SEO: Schema.org JSON-LD, Open Graph, sitemap.xml

## Convenzioni CSS

Tutti gli stili sono in `assets/css/main.css`. Nessun CSS inline negli HTML.

Classi utili da riusare:
- `.stat-card`, `.stat-card--blu`, `.stat-card--arancio` — card statistiche con bordo colorato
- `.step-number--blu/viola/magenta/arancio/faded` — numeri step colorati
- `.benefit-list`, `.benefit-list__item`, `.benefit-list__icon` — lista con icona checkmark
- `.content-centered` — div max-width 800px centrato
- `.quote-large`, `.quote-attr` — citazione grande con attribuzione
- `.area-heading`, `.area-list` — heading e lista per aree tematiche
- `.text-muted`, `.note-blu` — testo attenuato / nota con bordo sinistro blu
- `.privacy-content`, `.privacy-heading`, `.privacy-para`, `.privacy-list` — pagina privacy
- `.mt-sm`, `.mt-xl`, `.mb-xl` — utility margin extra (oltre .mb-sm/md/lg già esistenti)

## Colori brand

```
--blu:     #1A7FD4
--arancio: #F5A623
--magenta: #E8357A
--viola:   #7B1FA2
--nero:    #0A0A0A
```

## Note operative

- Il form contatti usa Formspree. L'endpoint `XXXXXXXX` va sostituito con l'ID reale.
- `sitemap.xml` e `robots.txt` usano `https://mmarchetti.it` — verificare il dominio finale.
- `_work/` non è pubblicato (robots.txt include `Disallow: /_work/`).
