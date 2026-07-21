# BUILD_SPEC — Modul P10 „Formale Sprachen & Komplexität" (Ordner `fsk/`)

Dies ist die **verbindliche Bau-Spezifikation** für die Themen-Seiten des Moduls
**Formale Sprachen & Komplexität** (Kürzel FSK, LMU Modul P10, Prof. Dr. Jasmin Blanchette).
Jede Themen-Seite ist eine eigenständige statische HTML-Datei in `fsk/topics/`.
**Kein Build-System, keine externen Abhängigkeiten** — nur die gemeinsame `../../css/style.css`
und `../../js/main.js`. Sprache: **Deutsch, du-Form, für Einsteiger ohne Vorwissen**, so **bildlich
wie möglich** (inline-SVG-Diagramme!).

Quelle des Wissens: `F:\Brain\LEARNING\LMU\Informatik-BA-NF30\SoSe-2026-Module\P10-Formale-Sprachen-und-Komplexität\`
(Dateien `01-regulaere-sprachen.md` … `05-komplexitaet.md` + `README.md`).

---

## 0. Verbindliche Referenzseite (Template)

**Kopiere die Grundstruktur exakt aus:** `fsk/topics/01-regulaere-ausdruecke.html`
(bzw. wenn du 01 baust, aus `../lds/topics/01-mengen.html`, `C:\Users\Florian Kindler\Projects\RNVS\lds\topics\01-mengen.html`).
Halte dich **1:1** an dieselbe Klassen- und Abschnitts-Struktur.

### Kopf jeder Themen-Seite (Pfade beachten: Seiten liegen in `fsk/topics/`, also `../../`)

```html
<!DOCTYPE html>
<html lang="de" data-theme="light">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>KURZTITEL · FSK</title>
<meta name="description" content="… 1–2 Sätze, was die Seite bildlich erklärt …" />
<link rel="stylesheet" href="../../css/style.css" />
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%234f46e5'/><text x='50' y='72' font-size='58' text-anchor='middle' fill='white' font-family='Georgia, serif' font-weight='bold'>δ</text></svg>" />
</head>
<body style="--cat:var(--c-catN);--cat-soft:var(--c-catN-soft)">
<div id="progress-bar"></div>

<header class="site-header">
  <div class="container">
    <a class="brand" href="../index.html">
      <span class="logo">δ</span>
      <span>P10 · FSK<small>Formale Sprachen &amp; Komplexität, bildlich erklärt</small></span>
    </a>
    <span class="nav-spacer"></span>
    <nav class="nav-links">
      <a class="nav-cta" href="../index.html">← Kursübersicht</a>
      <a href="#worum">Worum</a>
      <a href="#theorie">Theorie</a>
      <a href="#rechnen">Beispiele</a>
      <a href="#fallen">Fallen</a>
      <a href="#quickref">Quick-Ref</a>
      <a href="#check">Check</a>
    </nav>
    <button class="theme-toggle" aria-label="Design wechseln">🌙</button>
  </div>
</header>

<section class="topic-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">FSK-Kursübersicht</a> › Thema NN</div>
    <span class="th-icon">EMOJI</span>
    <h1>TITEL</h1>
    <div class="th-meta">
      <span class="stars">★★☆</span>
      <span class="badge badge-exam">🚨 Klausur</span>   <!-- nur wenn wirklich klausurrelevant -->
    </div>
  </div>
</section>

<div class="container">
  <div class="layout">
    <aside class="toc">
      <h4>Auf dieser Seite</h4>
      <ul>
        <li><a href="#worum">Worum geht's?</a></li>
        <li><a href="#theorie">…</a></li>
        <li><a href="#rechnen">…</a></li>
        <li><a href="#fallen">Typische Fallen</a></li>
        <li><a href="#quickref">Quick-Reference</a></li>
        <li><a href="#check">🧩 Wissenscheck</a></li>
      </ul>
    </aside>

    <article class="content">
      <section id="worum" class="reveal"> … </section>
      <section id="theorie" class="reveal"> … </section>
      <section id="rechnen" class="reveal"> … </section>
      <section id="fallen" class="reveal"> … </section>
      <section id="quickref" class="reveal"> … </section>
      <section id="check" class="reveal"> … Wissenscheck … </section>
      <nav class="prev-next"> … Pager … </nav>
    </article>
  </div>
</div>

<footer class="site-footer">
  <div class="container">
    <span>FSK · Formale Sprachen &amp; Komplexität (P 10, LMU) · bildlich erklärt</span>
    <span><a href="../index.html">← Zurück zur Kursübersicht</a></span>
  </div>
</footer>

<script src="../../js/main.js"></script>
</body>
</html>
```

**`--c-catN`** = Phasenfarbe (siehe Seitenplan): Phase 1 → `cat1`, Phase 2 → `cat2`,
Phase 3 → `cat3`, Phase 4 → `cat4`, Phase 5 (Klausurtraining) → `cat1`.

---

## 1. Inhaltliche Bausteine (nutze reichlich, so bildlich wie möglich!)

Verfügbare, **bereits im CSS vorhandene** Komponenten (nicht neu erfinden):

- `<p class="lead-in">…</p>` — Einstiegsabsatz.
- **Analogie-Box:** `<div class="analogy"><div class="a-title">Stell dir vor …</div><p>…</p></div>`
- **Diagramm:** `<figure class="diagram"><div class="diagram-title">…</div><svg …>…</svg><figcaption>…</figcaption></figure>`
- **Callouts:** `<div class="callout callout-tip|callout-info|callout-formula"><div class="c-title">…</div><p>…</p></div>`
  - Für Formeln: `<div class="callout callout-formula"><div class="c-title">…</div><span class="formula">… mehrzeilig …</span><p>…</p></div>`
- **Schritt-für-Schritt:** `<ol class="steps"><li><strong>…:</strong> …</li></ol>`
- **Code / Automaten / Grammatiken:** `<pre class="code">…</pre>` (mono, für δ-Tabellen, Ableitungen, Regeln).
- **Faktenkacheln:** `<div class="factgrid"><div class="fact"><b>…</b><span>…</span></div>…</div>`
- **Tabellen:** `<div class="table-wrap"><table class="data"><thead>…</thead><tbody>…</tbody></table></div>`
- **Falle/richtig-Paare:** 
  ```html
  <div class="fr">
    <div class="wrong"><span class="fr-tag">❌ Falsch</span>…</div>
    <div class="right"><span class="fr-tag">✅ Richtig</span>…</div>
  </div>
  ```
- **Quick-Ref-Block:** `<div class="quickref"><h3>🎯 Quick-Reference für die Klausur</h3> … <h4>…</h4> … </div>`

**Jede Seite braucht mindestens 2 inline-SVG-Diagramme** (Automaten, Bäume, Zerlegungen, Pyramiden …).

### SVG-Konventionen (WICHTIG — Automaten bildlich zeichnen)

- `viewBox="0 0 B H"`, `width="…"`, `role="img"`, `aria-label="…"`.
- Text-Klassen aus dem CSS nutzen: `class="svg-ink"` (Vordergrund), `class="svg-soft"` (gedämpft).
  Zusätzliche feste Farben: Blau `#2f6df6`, Violett `#8b5cf6`, Orange `#f5810b`, Grün `#12b28c`, Rot `#e0483d`.
- **Zustände (Automaten):** `<circle r="24">` mit Füllung `fill-opacity` + Rand. Label mono in der Mitte.
- **Akzeptierender Zustand:** **doppelter Kreis** = zwei konzentrische circles (z. B. r=24 und r=19).
- **Startpfeil:** kurzer `<path>`/`<line>` mit Pfeilspitze, der von links in den Startzustand zeigt.
- **Übergangspfeile:** `<defs><marker id="arrH" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#2f6df6"/></marker></defs>`
  dann `<path d="…" fill="none" stroke="#2f6df6" stroke-width="2" marker-end="url(#arrH)"/>` (Bezier `C…` für Bögen).
  **Selbstschleife:** kleiner Bezier-Bogen der am selben Zustand startet/endet, z. B.
  `d="M cx-24,cy-8 C cx-40,cy-60 cx+40,cy-60 cx+24,cy-8"`.
- Übergangs-Symbol als `<text>` an die Kante schreiben (a, b, ε, …). Nutze `ε` (U+03B5) für ε-Übergänge.
- Gib **jedem** `marker`/`clipPath`/`mask` eine **seitenweit eindeutige id** mit Datei-Präfix (z. B. `p03arrH`),
  damit sich Diagramme nicht gegenseitig stören.

**Keine LaTeX-Syntax**: nie `$…$`, nie `\cdot`, nie `\frac`. Verwende Unicode/Plaintext:
· (Malpunkt), ≤ ≥ ≠ ∈ ∉ ⊆ ∪ ∩ ⇒ ⇔ ∀ ∃ ε ∅ ℕ Σ Γ δ ⟶ →. Kleene-Stern als `*`.
In HTML immer `&lt; &gt; &amp;` escapen (v. a. in `pre.code` und bei `x < y`).

---

## 2. Wissenscheck (Quiz) — exakte Markup-Regeln

Jede Seite endet (vor dem Pager) mit einem `#check`-Abschnitt. Die `js/main.js`-Quiz-Engine erwartet **exakt**:

- Container: `<div class="quiz"> … </div>`, darin je Frage ein `<div class="quiz-q" data-type="…">`.
- **3–6 Fragen pro Seite.** Mische die Typen.
- **Jede** `quiz-q` enthält **genau ein** `<div class="quiz-feedback" aria-live="polite"></div>`
  und **genau ein** `<div class="quiz-explain" hidden>…</div>`. (Anzahl quiz-q = quiz-feedback = quiz-explain!)

**Typ „number":**
```html
<div class="quiz-q" data-type="number" data-answer="256">
  <p class="quiz-prompt"><span class="q-no">1.</span>Frage …</p>
  <div class="quiz-input-row">
    <input type="text" class="quiz-input" placeholder="Zahl …" aria-label="Antwort">
    <span class="quiz-unit">Zustände</span>            <!-- optional -->
    <button class="quiz-check" type="button">Prüfen</button>
    <button class="quiz-reveal" type="button">Lösung</button>
  </div>
  <div class="quiz-feedback" aria-live="polite"></div>
  <div class="quiz-explain" hidden>Erklärung … <strong>256</strong>.</div>
</div>
```
Optional `data-tol="0.5"` für Toleranz.

**Typ „text":** wie number, aber `data-type="text" data-answer="…"`. Mehrere gültige Antworten mit `|` trennen
(z. B. `data-answer="nicht regulär|nichtregulär"`). Für Text-Antworten Groß/Klein egal — halte die Antwort kurz.

**Typ „choice":**
```html
<div class="quiz-q" data-type="choice">
  <p class="quiz-prompt"><span class="q-no">2.</span>Frage …</p>
  <div class="quiz-choices">
    <button class="quiz-choice" type="button" data-correct>richtige Option</button>
    <button class="quiz-choice" type="button">falsch</button>
    <button class="quiz-choice" type="button">falsch</button>
  </div>
  <div class="quiz-feedback" aria-live="polite"></div>
  <div class="quiz-explain" hidden>Erklärung …</div>
</div>
```
**Genau ein** `data-correct` pro choice-Frage.

---

## 3. Labeling der Aufgaben (WICHTIG — Ehrlichkeit)

Die Quellnotizen enthalten **echte Klausuraufgaben** aus SoSe 2024 (Erst- und Zweitklausur, Prof. Blanchette).
Diese sind in den `.md`-Dateien mit „**Klausur Erstklausur, Aufgabe …**" bzw. „**Klausur Zweitklausur, Aufgabe …**"
gekennzeichnet.

- Aufgaben, die aus einer dieser echten Klausuren stammen → Tag **„🎓 Klausur SoSe 24 (EK)"** bzw.
  **„🎓 Klausur SoSe 24 (ZK)"** (EK = Erstklausur, ZK = Zweitklausur). In Fließ-Überschriften z. B.
  `<h3>🎓 Original-Klausuraufgabe (SoSe 2024, Erstklausur, Aufgabe 1a)</h3>`.
- **Selbst konstruierte** Übungs-/Trainingsaufgaben (z. B. aus den „Übungs-Aufgaben"-Abschnitten oder von dir
  ergänzt) → Tag **„🧮 Übung"** oder **„🧮 Aufgabe"**. **NIEMALS** „🎓 Klausur" auf selbst erfundene Aufgaben!
- Verwende **niemals** die fehlerhafte Schreibweise `<\span>` (immer `</span>`).

---

## 4. Seitenplan, Pager-Kette & Zuständigkeit

Reihenfolge & Pager (jede Seite: `prev` = vorige, `next` = nächste; 01.prev → `../index.html`;
12.next → `../index.html`). Dateinamen **exakt** so:

| NN | Datei | Phase/cat | th-icon | Titel (H1) | Quelle |
|----|-------|-----------|---------|-----------|--------|
| 01 | `01-regulaere-ausdruecke.html` | 1 / cat1 | 🔤 | Reguläre Ausdrücke & formale Sprachen | 01 + README (Chomsky-Überblick) |
| 02 | `02-endliche-automaten.html` | 1 / cat1 | 🤖 | Endliche Automaten: NFA & DFA | 01 |
| 03 | `03-regex-zu-dfa.html` | 1 / cat1 | 🔀 | Von Regex zu DFA (Potenzmenge) | 01 |
| 04 | `04-dfa-minimierung.html` | 1 / cat1 | ✂️ | DFA-Minimierung | 01 |
| 05 | `05-pumping-lemma.html` | 2 / cat2 | 💪 | Das Pumping-Lemma | 02 |
| 06 | `06-myhill-nerode.html` | 2 / cat2 | 🧩 | Myhill-Nerode & Abschluss | 02 |
| 07 | `07-kontextfreie-grammatiken.html` | 3 / cat3 | 🌳 | Kontextfreie Grammatiken | 03 |
| 08 | `08-kellerautomaten.html` | 3 / cat3 | 🥞 | Kellerautomaten (PDA) | 03 |
| 09 | `09-mu-rekursion.html` | 4 / cat4 | 🔁 | µ-rekursive Funktionen | 04 |
| 10 | `10-rice-entscheidbarkeit.html` | 4 / cat4 | 🚦 | Entscheidbarkeit & Satz von Rice | 04 |
| 11 | `11-np-komplexitaet.html` | 4 / cat4 | 🧨 | NP-Schwere & Reduktionen | 05 |
| 12 | `12-klausurtraining.html` | 5 / cat1 | 🎯 | Klausurtraining (EK & ZK SoSe 24) | 01–05 (alle echten Klausuraufgaben) |

**Pager-Beispiel (Seite 03):**
```html
<nav class="prev-next">
  <a class="prev" href="02-endliche-automaten.html">
    <div class="pn-label">← Vorheriges Thema</div>
    <div class="pn-title">Endliche Automaten: NFA &amp; DFA</div>
  </a>
  <a class="next" href="04-dfa-minimierung.html">
    <div class="pn-label">Nächstes Thema →</div>
    <div class="pn-title">DFA-Minimierung</div>
  </a>
</nav>
```
**Seite 01 prev** → `../index.html` (pn-label „← Übersicht", pn-title „Zur FSK-Kursübersicht").
**Seite 12 next** → `../index.html` (pn-label „Übersicht →", pn-title „Zurück zur FSK-Kursübersicht").

---

## 5. Qualitäts-Checkliste (vor Abgabe selbst prüfen)

- [ ] `../../css/style.css` und `../../js/main.js` (zwei Ebenen hoch!) korrekt verlinkt.
- [ ] Anzahl `quiz-q` == `quiz-feedback` == `quiz-explain`; jede choice-Frage genau **ein** `data-correct`.
- [ ] Keine `<\span>`-Tippfehler; alle Tags geschlossen; `&lt; &gt; &amp;` escaped.
- [ ] Keine LaTeX-Artefakte (`$`, `\cdot`, `\frac`).
- [ ] Pager prev/next zeigen auf die **richtigen** Nachbardateien (siehe Tabelle).
- [ ] Mindestens 2 aussagekräftige SVG-Diagramme, alle marker/clip-ids seitenweit eindeutig mit Datei-Präfix.
- [ ] „🎓 Klausur"-Tags nur auf echte EK/ZK-Aufgaben; selbst erfundene → „🧮".
- [ ] du-Form, einsteigerfreundlich, alle Fachbegriffe beim ersten Auftreten kurz erklärt.
