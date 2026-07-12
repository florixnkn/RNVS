# P4 (Haskell) – Bau-Spezifikation für Themen-Seiten (VERBINDLICH)

Du baust **genau eine** HTML-Seite im Ordner `p4/topics/`. Halte dich **exakt** an dieses Dokument,
damit alle 6 Seiten identisch aussehen und funktionieren. Erfinde keine neuen CSS-Klassen und
lade keine externen Ressourcen (keine CDNs, keine Bilder-URLs). Nur reines HTML + inline-SVG.
Das Designsystem (`css/style.css`) und die Quiz-Logik (`js/main.js`) existieren bereits — du schreibst nur Markup.

## Zielgruppe & Ton
- Leser haben **kaum Vorwissen** in funktionaler Programmierung / Haskell. Erkläre so, dass es ein interessierter Laie versteht.
- **Bildlich**: viele inline-SVG-Diagramme, Farben, Alltags-Vergleiche. Kein trockener Fließtext.
- Sprache: **Deutsch**, „du"-Ansprache, freundlich, konkret. Fachbegriffe (Rekursion, Functor, foldr …) beim ersten Mal in einem Satz erklären.
- Haskell-Code IMMER in `<pre class="code hs">…</pre>`. Kurze Inline-Bezeichner in `<code>…</code>`.
- Länge: gründlich. Lieber ein Diagramm / ein durchgespieltes Beispiel zu viel als zu wenig.

## Pfade (Seite liegt in `p4/topics/`)
- CSS: `../../css/style.css`  ·  JS: `../../js/main.js`  ·  P4-Übersicht („Home"): `../index.html`
- Andere Themen: `NN-name.html` (gleicher Ordner, siehe Navigationstabelle unten).

---

## 1) Seiten-Skelett (KOPIEREN und Platzhalter {{...}} ersetzen)

```html
<!DOCTYPE html>
<html lang="de" data-theme="light">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{{TITLE}} · P4 Haskell</title>
<meta name="description" content="{{META_DESCRIPTION}}" />
<link rel="stylesheet" href="../../css/style.css" />
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%238b5cf6'/><text x='50' y='72' font-size='60' text-anchor='middle' fill='white' font-family='Georgia, serif' font-weight='bold'>λ</text></svg>" />
</head>
<body style="--cat:var(--c-{{CAT}});--cat-soft:var(--c-{{CAT}}-soft)">
<div id="progress-bar"></div>

<header class="site-header">
  <div class="container">
    <a class="brand" href="../index.html">
      <span class="logo">λ</span>
      <span>P4 · Prog&amp;Mod<small>Haskell, bildlich erklärt</small></span>
    </a>
    <span class="nav-spacer"></span>
    <nav class="nav-links">
      <a class="nav-cta" href="../index.html">← Alle Themen</a>
    </nav>
    <button class="theme-toggle" aria-label="Design wechseln">🌙</button>
  </div>
</header>

<section class="topic-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../../index.html">Lernhub</a> › <a href="../index.html">P4 Haskell</a> › Thema {{NN}}</div>
    <span class="th-icon">{{ICON}}</span>
    <h1>{{H1_TITLE}}</h1>
    <div class="th-meta">
      {{META_BADGES}}  <!-- z.B. <span class="stars">★★☆</span><span class="badge badge-blatt">Task 1</span> ggf. <span class="badge badge-exam">🚨 Klausurrelevant</span> -->
    </div>
  </div>
</section>

<div class="container">
  <div class="layout">

    <!-- Inhaltsverzeichnis (Anker müssen zu <section id> passen) -->
    <aside class="toc">
      <h4>Auf dieser Seite</h4>
      <ul>
        {{TOC_ITEMS}}  <!-- <li><a href="#worum">Worum geht's?</a></li> … <li><a href="#check">🧩 Wissenscheck</a></li> -->
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
    <span>P 4 · Programmierung &amp; Modellierung (Haskell · LMU) · bildlich erklärt</span>
    <span><a href="../index.html">Zur Themenübersicht</a></span>
  </div>
</footer>

<script src="../../js/main.js"></script>
</body>
</html>
```

### Prev/Next-Format
```html
<!-- PREV_LINK -->
<a class="prev" href="{{PREV_FILE}}">
  <div class="pn-label">← Vorheriges Thema</div>
  <div class="pn-title">{{PREV_TITLE}}</div>
</a>
<!-- Wenn kein Vorgänger (Thema 01): href="../index.html", pn-label "Übersicht", pn-title "Zur P4-Themenübersicht" -->

<!-- NEXT_LINK -->
<a class="next" href="{{NEXT_FILE}}">
  <div class="pn-label">Nächstes Thema →</div>
  <div class="pn-title">{{NEXT_TITLE}}</div>
</a>
<!-- Wenn kein Nachfolger (Thema 06): href="../index.html", pn-title "Zurück zur Übersicht" -->
```

---

## 2) Pflicht-Struktur des Inhalts (`{{CONTENT_SECTIONS}}`)

Jede Seite MUSS diese Sektionen in dieser Reihenfolge haben (jede als `<section id="..." class="reveal">`):

1. `#worum` — **„Worum geht's?"** — 2–3 Sätze in einfachster Sprache + eine **`.analogy`**-Box (Alltags-Vergleich).
2. `#theorie` — **Theorie / Kernkonzepte** — mit **mindestens 2 inline-SVG-Diagrammen**, Haskell-Codeblöcken (`pre.code.hs`)
   und `.data`-Tabellen. Nutze Unter-Überschriften `<h3>`. Baue Callouts (`.callout-info`, `.callout-tip`) ein.
3. `#schritt` — **Schritt für Schritt** — ein **durchgespieltes Code-Beispiel**: `.steps`-Liste und/oder `.evalstep`-Zeilen,
   die eine Auswertung/Reduktion Zeile für Zeile zeigen (z.B. `foldr (+) 0 [1,2,3] → 1 + (2 + (3 + 0)) → 6`).
4. `#fallen` — **Typische Fallen** — jede Falle als `.fr` (Falsch/Richtig-Paar), gern mit kurzen Haskell-Schnipseln. Mindestens 3.
5. `#quickref` — **Quick-Reference** — `.quickref`-Box mit Kern-Signaturen/Regeln/Tabellen für die Klausur.
6. `#check` — **🧩 Wissenscheck** — Quiz (Markup laut §4b). Die genauen Fragen/Antworten bekommst du im Auftrag vorgegeben.

Die TOC-Einträge müssen exakt auf diese `id`s zeigen (inkl. `<li><a href="#check">🧩 Wissenscheck</a></li>`).

---

## 3) Komponenten-Baukasten (nur diese Klassen verwenden)

**Haskell-Codeblock (das Kern-Element dieser Seiten):**
```html
<div class="code-title">// productNonZero.hs</div>   <!-- optionale Titelzeile, weglassen wenn unnötig -->
<pre class="code hs">productNonZero :: [Int] -&gt; Int
productNonZero []     = 1
productNonZero (x:xs)
  | x == 0    = productNonZero xs
  | otherwise = x * productNonZero xs</pre>
```
> WICHTIG: In `<pre>` MÜSSEN `<`, `>` und `&` als `&lt;` `&gt;` `&amp;` escaped werden
> (z.B. `a -&gt; b`, `xs &gt;&gt;= f`, `x &lt;- m`, `foldMap :: Monoid m =&gt; …`). Einrückung bleibt erhalten.

**Auswertungs-/Reduktionsschritt (für #schritt, CBV/CBN, fold-Traces):**
```html
<div class="evalstep">foldr (+) 0 [1,2,3]  <span class="arrow">→</span>  1 + (2 + (3 + 0))  <span class="arrow">→</span>  6</div>
```

**Alltags-Vergleich (immer in #worum):**
```html
<div class="analogy">
  <div class="a-title">Stell dir vor …</div>
  <p>… hier der Vergleich aus dem Alltag (Matrjoschka-Puppen für Rekursion, Steckbrief/Formular für Datentypen,
     Fließband für Folds, Geschenk-in-Schachtel für Functor/Monad …).</p>
</div>
```

**Callouts:**
```html
<div class="callout callout-info"><div class="c-title">Gut zu wissen</div><p>…</p></div>
<div class="callout callout-tip"><div class="c-title">Merksatz</div><p>…</p></div>
<div class="callout callout-warning"><div class="c-title">Achtung</div><p>…</p></div>
<div class="callout callout-formula"><div class="c-title">Signatur</div>
  <span class="formula">foldr :: (a -&gt; b -&gt; b) -&gt; b -&gt; [a] -&gt; b</span><p>Erklärung der Symbole …</p></div>
```

**Typische Falle (Falsch/Richtig) – gern mit Code:**
```html
<div class="fr">
  <div class="wrong"><span class="fr-tag">❌ Falsch</span>Base Case fehlt → Endlos-Rekursion:
    <pre class="code hs">productNonZero (x:xs) = …</pre></div>
  <div class="right"><span class="fr-tag">✅ Richtig</span>Immer zuerst den leeren Fall behandeln:
    <pre class="code hs">productNonZero []     = 1
productNonZero (x:xs) = …</pre></div>
</div>
```

**Schritt-für-Schritt:**
```html
<ol class="steps">
  <li><strong>Base Case zuerst:</strong> Erklärung …</li>
  <li><strong>Rekursiver Fall:</strong> Erklärung …</li>
</ol>
```

**Tabelle (immer in `.table-wrap`):**
```html
<div class="table-wrap"><table class="data">
  <thead><tr><th>Typklasse</th><th>Signatur</th><th>Intuition</th></tr></thead>
  <tbody><tr><td>Functor</td><td><code>fmap :: (a-&gt;b) -&gt; f a -&gt; f b</code></td><td>Wert im Kontext transformieren</td></tr></tbody>
</table></div>
```

**Fakten-Kacheln / Steckbrief:**
```html
<div class="factgrid">
  <div class="fact"><b>foldr</b><span>lazy · von rechts</span></div>
  <div class="fact"><b>foldl</b><span>strict · von links</span></div>
</div>
```

**Quick-Reference (vorletzte Sektion):**
```html
<div class="quickref"><h3>🎯 Quick-Reference für die Klausur</h3> … Tabellen/Signaturen/Regeln … </div>
```

---

## 4) Inline-SVG-Diagramme (DAS WICHTIGSTE — „bildlich")

Immer in diesem Wrapper:
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
- `viewBox` + `width` (max 720). Höhe automatisch, muss auf dem Handy skalieren.
- **Text im SVG:** `<text>` mit `class="svg-ink"` (normal) / `class="svg-soft"` (grau) für Theme-Kompatibilität,
  oder explizit `fill="#fff"` auf farbigen Flächen. `font-family="Segoe UI, sans-serif"`, Code im SVG gern `font-family="JetBrains Mono, monospace"`, `font-size` 12–16.
- Farben als Hex: grün `#12b28c`, blau `#2f6df6`, lila `#8b5cf6`, orange `#f5810b`, rot `#e0483d`, grau `#8a94a6`.
  Flächen mit `fill-opacity="0.15"` hinterlegen. Runde Ecken `rx="8"`. Pfeile via `<defs><marker>`.

**Passende Diagramm-Ideen je Haskell-Thema:**
- **Rekursion:** Matrjoschka-/Stapel-Bild des Aufruf-Stacks (`sum [1,2,3]` klappt auf und wieder zu); Tail-Rekursion mit Akkumulator als „flache" Schleife.
- **Typklassen:** Hierarchie-Pfeildiagramm `Functor → Applicative → Monad` und `Eq → Ord`; `fmap` als „Kiste, in die eine Funktion hineingreift".
- **Datentypen:** Baum eines ADT (Sum `|` als Verzweigung); Zipper als Liste mit Fokus-Lupe `[1,2] ⟨3⟩ [4,5]`; Peano `Succ(Succ(Succ Zero))` als Türmchen.
- **Folds:** Klammer-Baum `foldr` (rechts-assoziativ) vs. `foldl` (links-assoziativ) nebeneinander; Fließband, das Elemente in einen Akkumulator schiebt.
- **Auswertung:** Zwei Spalten CBV vs. CBN, die dieselbe Expression unterschiedlich reduzieren; Zeitachse „wann wird gerechnet?".
- **Monaden:** `>>=`-Pipeline (Wert kommt aus einer Schachtel, Funktion steckt ihn in die nächste); `do`-Block neben seiner `>>=`-Übersetzung.

Baue **mindestens 3** solcher Diagramme, thematisch passend, farbig, mit figcaption.

---

## 4b) Wissenscheck / Quiz-Komponente (interaktiv)

Sektion `<section id="check" class="reveal">` mit `<h2>🧩 Wissenscheck</h2>`, einer kurzen Einleitung und einem
`<div class="quiz"> … </div>` mit **3 Fragen**. Die Logik steckt in `js/main.js` — du schreibst nur Markup.
**Die konkreten Fragen, Antworten und Erklärungen bekommst du im Auftrag wörtlich vorgegeben — übernimm sie exakt.**
Drei Fragetypen:

**Eingabefeld (Zahl):** `data-type="number"`, `data-answer="6"` (mehrere via `|`), optional `data-tol="0.5"`.
```html
<div class="quiz-q" data-type="number" data-answer="6">
  <p class="quiz-prompt"><span class="q-no">1.</span>Was ergibt <code>foldr (+) 0 [1,2,3]</code>?</p>
  <div class="quiz-input-row">
    <input type="text" class="quiz-input" placeholder="Antwort …" aria-label="Antwort">
    <button class="quiz-check" type="button">Prüfen</button>
    <button class="quiz-reveal" type="button">Lösung</button>
  </div>
  <div class="quiz-feedback" aria-live="polite"></div>
  <div class="quiz-explain" hidden>1 + (2 + (3 + 0)) = 6.</div>
</div>
```

**Eingabefeld (Text):** wie oben, aber `data-type="text"`, `data-answer="Just 6|Just (6)"` (Groß/klein, Leerzeichen,
Endsatzzeichen egal). Einheit-Span weglassen. Für Haskell-Ausdrücke einfache, eindeutige Antworten wählen und
sinnvolle Schreibvarianten mit `|` zulassen.

**Multiple Choice / Richtig-Falsch:** `data-type="choice"`. Die **richtige** Antwort bekommt `data-correct`.
Für Richtig/Falsch die Klasse `quiz-tf` an `.quiz-choices`.
```html
<div class="quiz-q" data-type="choice">
  <p class="quiz-prompt"><span class="q-no">2.</span>Welcher Fold ist lazy und kann unendliche Listen verarbeiten?</p>
  <div class="quiz-choices">
    <button class="quiz-choice" type="button" data-correct>foldr</button>
    <button class="quiz-choice" type="button">foldl</button>
  </div>
  <div class="quiz-feedback" aria-live="polite"></div>
  <div class="quiz-explain" hidden><code>foldr</code> ist rechts-assoziativ &amp; lazy; <code>foldl</code> ist strict.</div>
</div>
```
Regeln: **genau 3 Fragen**, mindestens **eine Zahlen-/Texteingabe**. Nummeriere mit `<span class="q-no">N.</span>`.

---

## 5) Navigationstabelle (Titel & prev/next VERBINDLICH)

| NN | Datei | CAT | Icon | H1-Titel | prev | next |
|----|-------|-----|------|----------|------|------|
| 01 | 01-rekursion.html | cat3 | 🔁 | Rekursion | ../index.html (Übersicht) | 02-typklassen.html |
| 02 | 02-typklassen.html | cat3 | 🧬 | Polymorphie &amp; Typklassen | 01-rekursion.html | 03-datentypen.html |
| 03 | 03-datentypen.html | cat2 | 🧱 | Datentypen modellieren (ADTs) | 02-typklassen.html | 04-folds.html |
| 04 | 04-folds.html | cat2 | 🪗 | Higher-Order Functions &amp; Folds | 03-datentypen.html | 05-auswertung.html |
| 05 | 05-auswertung.html | cat4 | ⏳ | Auswertung &amp; Evaluation | 04-folds.html | 06-monaden.html |
| 06 | 06-monaden.html | cat4 | 🪄 | Monaden | 05-auswertung.html | ../index.html (Übersicht) |

## 6) Qualitäts-Checkliste (vor Abgabe prüfen)
- [ ] Alle 6 Pflicht-Sektionen (#worum, #theorie, #schritt, #fallen, #quickref, #check) vorhanden, TOC-Anker stimmen.
- [ ] **Mindestens 3 inline-SVG-Diagramme**, thematisch passend, farbig, mit figcaption.
- [ ] Eine `.analogy`-Box in #worum. Mind. 3 `.fr`-Fallen. Eine `.quickref`. Ein `#check`-Quiz mit genau 3 Fragen (Vorgabe exakt übernommen).
- [ ] **Alle** Haskell-Zeichen in `<pre>`/`<code>` korrekt escaped (`&lt; &gt; &amp;`). Kein `<` das der Browser als Tag liest.
- [ ] Nur erlaubte CSS-Klassen, keine externen Ressourcen, valides HTML.
- [ ] Prev/Next korrekt laut Tabelle. `data-theme="light"` im `<html>`, `--cat` im `<body>`.
- [ ] Fachlich korrekt und vollständig gegenüber der Quell-Notiz.
