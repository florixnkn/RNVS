# RNVS – Bau-Spezifikation für Themen-Seiten (VERBINDLICH)

Du baust **genau eine** HTML-Seite im Ordner `topics/`. Halte dich **exakt** an dieses Dokument,
damit alle 10 Seiten identisch aussehen und funktionieren. Erfinde keine neuen CSS-Klassen und
lade keine externen Ressourcen (keine CDNs, keine Bilder-URLs). Nur reines HTML + inline-SVG.

## Zielgruppe & Ton
- Leser haben **kaum Vorwissen**. Erkläre so, dass es ein interessierter Laie versteht.
- **Bildlich**: viele inline-SVG-Diagramme, Farben, Alltags-Vergleiche. Kein trockener Fließtext.
- Sprache: **Deutsch**, „du"-Ansprache, freundlich, konkret. Fachbegriffe beim ersten Mal erklären.
- Länge: gründlich. Lieber ein Diagramm zu viel als zu wenig.

## Pfade (Seite liegt in `topics/`)
- CSS: `../css/style.css`  ·  JS: `../js/main.js`  ·  Home: `../index.html`
- Andere Themen: `NN-name.html` (gleicher Ordner, siehe Navigationstabelle unten).

---

## 1) Seiten-Skelett (KOPIEREN und Platzhalter {{...}} ersetzen)

```html
<!DOCTYPE html>
<html lang="de" data-theme="light">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{{TITLE}} · RNVS</title>
<meta name="description" content="{{META_DESCRIPTION}}" />
<link rel="stylesheet" href="../css/style.css" />
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%232f6df6'/><text x='50' y='68' font-size='54' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold'>RN</text></svg>" />
</head>
<body style="--cat:var(--c-{{CAT}});--cat-soft:var(--c-{{CAT}}-soft)">
<div id="progress-bar"></div>

<header class="site-header">
  <div class="container">
    <a class="brand" href="../index.html">
      <span class="logo">RN</span>
      <span>RNVS<small>Rechnernetze, bildlich erklärt</small></span>
    </a>
    <span class="nav-spacer"></span>
    <nav class="nav-links">
      <a href="../index.html">← Alle Themen</a>
    </nav>
    <button class="theme-toggle" aria-label="Design wechseln">🌙</button>
  </div>
</header>

<section class="topic-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Startseite</a> › Thema {{NN}}</div>
    <span class="th-icon">{{ICON}}</span>
    <h1>{{H1_TITLE}}</h1>
    <div class="th-meta">
      {{META_BADGES}}  <!-- z.B. <span class="stars">★★☆</span><span class="badge badge-blatt">Blatt 3</span> ggf. <span class="badge badge-exam">🚨 Klausurrelevant</span> -->
    </div>
  </div>
</section>

<div class="container">
  <div class="layout">

    <!-- Inhaltsverzeichnis (Anker müssen zu <section id> passen) -->
    <aside class="toc">
      <h4>Auf dieser Seite</h4>
      <ul>
        {{TOC_ITEMS}}  <!-- <li><a href="#worum">Worum geht's?</a></li> ... -->
      </ul>
    </aside>

    <article class="content">
      {{CONTENT_SECTIONS}}

      <!-- Prev/Next unten -->
      <nav class="prev-next">
        {{PREV_LINK}}
        {{NEXT_LINK}}
      </nav>
    </article>
  </div>
</div>

<footer class="site-footer">
  <div class="container">
    <span>RNVS · Rechnernetze &amp; Verteilte Systeme (P 11, LMU) · bildlich erklärt</span>
    <span><a href="../index.html">Zur Themenübersicht</a></span>
  </div>
</footer>

<script src="../js/main.js"></script>
</body>
</html>
```

### Prev/Next-Format
```html
<!-- PREV_LINK (wenn Vorgänger existiert) -->
<a class="prev" href="{{PREV_FILE}}">
  <div class="pn-label">← Vorheriges Thema</div>
  <div class="pn-title">{{PREV_TITLE}}</div>
</a>
<!-- Wenn kein Vorgänger: zeige stattdessen Link zur Startseite mit pn-label "Übersicht" -->

<!-- NEXT_LINK -->
<a class="next" href="{{NEXT_FILE}}">
  <div class="pn-label">Nächstes Thema →</div>
  <div class="pn-title">{{NEXT_TITLE}}</div>
</a>
<!-- Wenn kein Nachfolger: Link auf ../index.html, pn-title "Zurück zur Übersicht" -->
```

---

## 2) Pflicht-Struktur des Inhalts (`{{CONTENT_SECTIONS}}`)

Jede Seite MUSS diese Sektionen in dieser Reihenfolge haben (jede als `<section id="..." class="reveal">`):

1. `#worum` — **„Worum geht's?"** — 2–3 Sätze in einfachster Sprache + eine **`.analogy`**-Box (Alltags-Vergleich).
2. `#theorie` — **Theorie / Kernkonzepte** — mit **mindestens 2 inline-SVG-Diagrammen** und `.data`-Tabellen.
   Nutze Unter-Überschriften `<h3>`. Baue Callouts (`.callout-info`, `.callout-tip`) ein.
3. `#rechnen` ODER `#schritt` — **Schritt-für-Schritt** (Lösungskonzept) mit `.steps`-Liste. Bei Rechen-Themen:
   ein durchgerechnetes Beispiel in einer `.callout-formula`.
4. `#fallen` — **Typische Fallen** — jede Falle als `.fr` (Falsch/Richtig-Paar). Mindestens 3.
5. `#quickref` — **Quick-Reference** — `.quickref`-Box mit Kern-Tabellen/Formeln für die Klausur.

Die TOC-Einträge müssen exakt auf diese `id`s zeigen.

---

## 3) Komponenten-Baukasten (nur diese Klassen verwenden)

**Alltags-Vergleich (immer in #worum):**
```html
<div class="analogy">
  <div class="a-title">Stell dir vor …</div>
  <p>… hier der Vergleich aus dem Alltag (Post, Pizza, Telefon, Straßenverkehr …).</p>
</div>
```

**Callouts:**
```html
<div class="callout callout-info"><div class="c-title">Gut zu wissen</div><p>…</p></div>
<div class="callout callout-tip"><div class="c-title">Merksatz</div><p>…</p></div>
<div class="callout callout-warning"><div class="c-title">Achtung</div><p>…</p></div>
<div class="callout callout-formula"><div class="c-title">Formel</div>
  <span class="formula">t = L / R</span><p>Erklärung der Symbole …</p></div>
```

**Typische Falle (Falsch/Richtig):**
```html
<div class="fr">
  <div class="wrong"><span class="fr-tag">❌ Falsch</span>Transport ist Schicht 3.</div>
  <div class="right"><span class="fr-tag">✅ Richtig</span>Transport ist Schicht 4 (Vermittlung ist 3).</div>
</div>
```

**Schritt-für-Schritt:**
```html
<ol class="steps">
  <li><strong>Erst dies:</strong> Erklärung …</li>
  <li><strong>Dann das:</strong> Erklärung …</li>
</ol>
```

**Tabelle (immer in `.table-wrap`):**
```html
<div class="table-wrap"><table class="data">
  <thead><tr><th>Spalte</th><th>Bedeutung</th></tr></thead>
  <tbody><tr><td>…</td><td>…</td></tr></tbody>
</table></div>
```

**Fakten-Kacheln / Steckbrief:**
```html
<div class="factgrid">
  <div class="fact"><b>8 Byte</b><span>UDP-Header</span></div>
  <div class="fact"><b>RFC 768</b><span>Spezifikation</span></div>
</div>
```

**Quick-Reference (Schluss-Sektion):**
```html
<div class="quickref"><h3>🎯 Quick-Reference für die Klausur</h3> … Tabellen/Listen … </div>
```

**ASCII/Pseudocode (nur wenn ein SVG unpraktisch ist):** `<pre class="code">…</pre>`

---

## 4) Inline-SVG-Diagramme (DAS WICHTIGSTE — „bildlich")

Immer in diesem Wrapper, damit es zentriert/gestylt ist:
```html
<figure class="diagram">
  <div class="diagram-title">Titel des Diagramms</div>
  <svg viewBox="0 0 640 300" width="640" role="img" aria-label="Kurzbeschreibung">
     … Formen …
  </svg>
  <figcaption>Eine Bildunterschrift, die das Diagramm in einem Satz erklärt.</figcaption>
</figure>
```

**Regeln für SVG:**
- Nutze `viewBox` + `width` (max 720). Höhe automatisch. Muss auf Handy skalieren.
- **Text im SVG:** `<text>` mit `class="svg-ink"` (normal) oder `class="svg-soft"` (grau) für Theme-Kompatibilität,
  oder explizit `fill="#fff"` auf farbigen Flächen. `font-family="Segoe UI, sans-serif"`, `font-size` 12–16.
- Farben: nutze die Kategorie- & Callout-Farben als Hex (SVG kennt keine CSS-Variablen zuverlässig):
  grün `#12b28c`, blau `#2f6df6`, lila `#8b5cf6`, orange `#f5810b`, rot `#e0483d`, grau `#8a94a6`.
  Flächen gern mit 12–18 % Deckkraft hinterlegen (`fill-opacity="0.15"`).
- Runde Ecken: `rx="8"`. Pfeile via `<defs><marker>` (siehe Muster).

**Muster A – Schichten-Stapel (für OSI, Header-Aufbau):**
```html
<svg viewBox="0 0 420 300" width="420">
  <g font-family="Segoe UI, sans-serif" font-size="14">
    <rect x="60" y="20"  width="300" height="40" rx="8" fill="#2f6df6" fill-opacity="0.18" stroke="#2f6df6"/>
    <text x="210" y="45" text-anchor="middle" class="svg-ink">7 · Anwendung (HTTP, DNS)</text>
    <rect x="60" y="66" width="300" height="40" rx="8" fill="#8b5cf6" fill-opacity="0.18" stroke="#8b5cf6"/>
    <text x="210" y="91" text-anchor="middle" class="svg-ink">4 · Transport (TCP, UDP)</text>
    <!-- weitere Schichten … -->
  </g>
</svg>
```

**Muster B – Sequenzdiagramm (für Handshake, Sliding Window, Pizza):**
```html
<svg viewBox="0 0 480 300" width="480">
  <defs>
    <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#2f6df6"/>
    </marker>
  </defs>
  <g font-family="Segoe UI, sans-serif" font-size="13">
    <text x="90"  y="24" text-anchor="middle" class="svg-ink" font-weight="700">Client</text>
    <text x="390" y="24" text-anchor="middle" class="svg-ink" font-weight="700">Server</text>
    <line x1="90"  y1="34" x2="90"  y2="270" stroke="#8a94a6" stroke-width="2"/>
    <line x1="390" y1="34" x2="390" y2="270" stroke="#8a94a6" stroke-width="2"/>
    <line x1="90" y1="70" x2="390" y2="90" stroke="#2f6df6" stroke-width="2" marker-end="url(#arr)"/>
    <text x="240" y="72" text-anchor="middle" class="svg-soft">SYN</text>
    <!-- weitere Pfeile diagonal nach unten … -->
  </g>
</svg>
```
(Für jede eigene Pfeilfarbe einen eigenen `<marker>` mit eigener id definieren, z.B. `arr-green`.)

**Muster C – beschriftete Box-Reihe (für Paket-/Header-Felder, Fenster):**
Rechtecke nebeneinander mit Feldnamen darin und Byte-Angaben darüber/darunter.

Baue **passend zum Thema** eigene Diagramme. Ideen je nach Thema:
Binärbaum, IP-als-Baum, Pizza-Sequenz, Schichten-Sanduhr OSI↔Internet, PDU-Verschachtelung,
Verzögerungs-Zeitachse Sender→Router→Empfänger, 3-Wege-Handshake, Sliding-Window-Fensterlauf,
UDP-/TCP-Header (8 vs. 20 Byte), Sägezahn-Kurve (Congestion Window über Zeit).

---

## 4b) Wissenscheck / Quiz-Komponente (interaktiv)

Jede Seite hat vor der Prev/Next-Navigation eine Sektion `<section id="check" class="reveal">` mit
Überschrift „🧩 Wissenscheck" und einem passenden TOC-Eintrag `<li><a href="#check">🧩 Wissenscheck</a></li>`.
Die Logik steckt bereits in `js/main.js` — du schreibst nur das Markup. Drei Fragetypen:

**Eingabefeld (Zahl):** `data-type="number"`, `data-answer="8"` (mehrere erlaubt via `|`), optional
`data-tol="0.5"` (absolute Toleranz; ohne Angabe 1 % relativ). Komma/Punkt und Einheiten werden ignoriert.
```html
<div class="quiz-q" data-type="number" data-answer="120" data-tol="1">
  <p class="quiz-prompt"><span class="q-no">1.</span>t_übertr für 12000 bit bei 100 Mbit/s? (in µs)</p>
  <div class="quiz-input-row">
    <input type="text" class="quiz-input" placeholder="Antwort …" aria-label="Antwort">
    <span class="quiz-unit">µs</span>
    <button class="quiz-check" type="button">Prüfen</button>
    <button class="quiz-reveal" type="button">Lösung</button>
  </div>
  <div class="quiz-feedback" aria-live="polite"></div>
  <div class="quiz-explain" hidden>12000 bit / 10⁸ bit/s = 120 µs.</div>
</div>
```

**Eingabefeld (Text):** wie oben, aber `data-type="text"`, `data-answer="Semantik|semantik"`
(Groß/klein, Leerzeichen, Endsatzzeichen egal). Einheit-Span weglassen.

**Multiple Choice / Richtig-Falsch:** `data-type="choice"`. Die **richtige** Antwort-Schaltfläche bekommt das
Attribut `data-correct`. Für Richtig/Falsch die Klasse `quiz-tf` an `.quiz-choices` (zwei breite Buttons).
```html
<div class="quiz-q" data-type="choice">
  <p class="quiz-prompt"><span class="q-no">2.</span>Auf welcher OSI-Schicht liegt TCP?</p>
  <div class="quiz-choices">
    <button class="quiz-choice" type="button">Schicht 3</button>
    <button class="quiz-choice" type="button" data-correct>Schicht 4</button>
    <button class="quiz-choice" type="button">Schicht 7</button>
  </div>
  <div class="quiz-feedback" aria-live="polite"></div>
  <div class="quiz-explain" hidden>TCP ist Transport → Schicht 4. (IP ist Schicht 3.)</div>
</div>
```
Regeln: **3–4 Fragen pro Seite**, mindestens **eine Zahlen-/Texteingabe**. Antworten fachlich korrekt,
Erklärungen kurz. Nummeriere mit `<span class="q-no">N.</span>` im Prompt.

## 5) Navigationstabelle (Titel & prev/next verbindlich)

| NN | Datei | CAT | Icon | H1-Titel | prev | next |
|----|-------|-----|------|----------|------|------|
| 01 | 01-grundlagen.html | cat1 | 🌳 | Graphen, Bäume &amp; Adressierung | ../index.html (Übersicht) | 02-protokolle.html |
| 02 | 02-protokolle.html | cat1 | 🍕 | Protokolle &amp; das Pizzadienst-Modell | 01-grundlagen.html | 03-netze-tools.html |
| 03 | 03-netze-tools.html | cat1 | 🛠️ | Rechnernetz vs. Verteiltes System &amp; Linux-Tools | 02-protokolle.html | 04-osi-modell.html |
| 04 | 04-osi-modell.html | cat1 | 🏛️ | OSI- &amp; Internet-Referenzmodell (PDU/SDU) | 03-netze-tools.html | 05-verzoegerung.html |
| 05 | 05-verzoegerung.html | cat2 | ⏱️ | Verzögerungszeiten &amp; Vermittlungsarten | 04-osi-modell.html | 06-handshakes.html |
| 06 | 06-handshakes.html | cat2 | 🤝 | Verbindungsmanagement: Handshakes | 05-verzoegerung.html | 07-sliding-window.html |
| 07 | 07-sliding-window.html | cat3 | 🪟 | Sequenznummern &amp; Sliding Window | 06-handshakes.html | 08-udp.html |
| 08 | 08-udp.html | cat4 | 📮 | UDP &amp; RFC 768 | 07-sliding-window.html | 09-tcp.html |
| 09 | 09-tcp.html | cat4 | 🔗 | TCP: Verbindung, Sequenznummern &amp; SACK | 08-udp.html | 10-congestion-control.html |
| 10 | 10-congestion-control.html | cat4 | 📈 | TCP Congestion Control: Slow-Start, Tahoe &amp; Reno | 09-tcp.html | ../index.html (Übersicht) |

## 6) Qualitäts-Checkliste (vor Abgabe prüfen)
- [ ] Alle 5 Pflicht-Sektionen vorhanden, TOC-Anker stimmen.
- [ ] **Mindestens 3 inline-SVG-Diagramme**, thematisch passend, farbig, mit figcaption.
- [ ] Eine `.analogy`-Box in #worum. Mind. 3 `.fr`-Fallen. Eine `.quickref` am Ende.
- [ ] Nur erlaubte CSS-Klassen, keine externen Ressourcen, valides HTML.
- [ ] Prev/Next korrekt laut Tabelle. `data-theme="light"` im `<html>`, `--cat` im `<body>`.
- [ ] Fachlich korrekt und vollständig gegenüber der Quell-Notiz.
