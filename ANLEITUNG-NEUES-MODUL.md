# 📓 Anleitung: ein neues Modul in den Lernhub bauen

**Für ein späteres Ich (Claude Code) gedacht.** Diese Datei beschreibt Schritt für Schritt, wie man ein
weiteres Vorlesungs-Modul (P7, P10, P12, ML, Quanten, Makro, Finanzwissenschaft …) im gleichen Stil und in
gleicher Qualität wie **P11 (RNVS)** und **P4 (Haskell)** ergänzt. Wer sich exakt daran hält, bekommt ein
konsistentes Ergebnis ohne Nachdenken über Architektur.

> Kurzfassung des Prinzips: **Hauptmodell plant + baut das Fundament (Portal-Kachel, Kurs-Hub, Spec,
> Referenzseite 01, Quizfragen), delegiert die restlichen Themenseiten an Sonnet-Subagenten, verifiziert,
> committet, pusht.** Quizfragen formuliert IMMER das Hauptmodell selbst (Faktentreue), Agenten setzen nur ein.

---

## 0. Kontext in 30 Sekunden

- **Was:** statische Lern-Website (reines HTML/CSS/JS, kein Build, keine externen Ressourcen), GitHub Pages.
- **Repo:** `C:\Users\Florian Kindler\Projects\RNVS` → https://github.com/florixnkn/RNVS → live https://florixnkn.github.io/RNVS/
- **Aufbau:** ein **Portal** (`index.html`) verlinkt auf pro-Modul **Kurs-Hubs** (`MODULE/index.html`), die auf
  **Themenseiten** (`MODULE/topics/NN-*.html`) verlinken. `css/style.css` + `js/main.js` sind **geteilt**.
- **Quell-Notizen:** `F:\Brain\LEARNING\LMU\Informatik-BA-NF30\SoSe-2026-Module\<MODUL-ORDNER>\`
  (jeweils `README.md` + `NN-Thema.md`).

---

## 1. Architektur & Pfad-Regeln (WICHTIG)

```
index.html                → Portal (Übersicht aller Module)
css/style.css  js/main.js  → GETEILT von allen Seiten
.nojekyll                  → muss existieren (schaltet Jekyll aus)
BUILD_SPEC.md              → Bau-Vorlage RNVS-Themenseiten
BUILD_SPEC_P4.md           → Bau-Vorlage P4/Haskell-Themenseiten  ← beste Kopiervorlage
rnvs/index.html            → Kurs-Hub P11
rnvs/topics/NN-*.html      → RNVS-Themen
p4/index.html              → Kurs-Hub P4
p4/topics/NN-*.html        → P4-Themen
MODULE/index.html          → NEU: Kurs-Hub
MODULE/topics/NN-*.html    → NEU: Themenseiten
```

**Relative Pfade je nach Ebene — das ist die häufigste Fehlerquelle:**

| Datei liegt in … | zu `css/style.css` | zu `js/main.js` | zum Portal (`index.html`) | zum eigenen Kurs-Hub |
|------------------|--------------------|-----------------|---------------------------|----------------------|
| `index.html` (Root/Portal) | `css/style.css` | `js/main.js` | — | — |
| `MODULE/index.html` (Hub) | `../css/style.css` | `../js/main.js` | `../index.html` | (self) `index.html` |
| `MODULE/topics/NN.html` | `../../css/style.css` | `../../js/main.js` | `../../index.html` | `../index.html` |
| Thema → Nachbarthema | — | — | — | `NN-name.html` (gleicher Ordner) |

- **Theme** wird per `localStorage`-Key `rnvs-theme` global gemerkt (einmal umschalten gilt überall).
- **Quiz-Engine** in `js/main.js` ist generisch (data-attribut-gesteuert) → funktioniert für jedes Modul ohne JS-Änderung.
- Farb-/Kategorie-Variablen: `--c-cat1` grün, `--c-cat2` blau, `--c-cat3` lila, `--c-cat4` orange (+ `-soft` Varianten).

---

## 2. Die 7 offenen Module (Quelle → Web-Slug → Umfang)

| Modul | Quellordner | Web-Ordner-Slug | Portal-Kachel `tc-no` | Themen-.md im Quellordner |
|-------|-------------|-----------------|-----------------------|---------------------------|
| P7 Logik & Diskrete Strukturen | `P7-Logik-und-Diskrete-Strukturen` | `p7/` | `P7` | 15 |
| P10 Formale Sprachen & Komplexität | `P10-Formale-Sprachen-und-Komplexität` | `p10/` | `P10` | 5 |
| P12 Stochastik & Statistik | `P12-Stochastik-und-Statistik` | `p12/` | `P12` | 14 |
| WP Maschinelles Lernen | `WP-Maschinelles-Lernen` | `ml/` | `WP` | 9 |
| WP Quantencomputing | `WP-Quantencomputing` | `quanten/` | `WP` | 9 |
| VWL-P2 Makroökonomie | `VWL-P2-Makroökonomie` | `makro/` | `P2` | 12 |
| VWL-P4 Finanzwissenschaft | `VWL-P4-Finanzwissenschaft` | `finanzwissenschaft/` | `P4` | 8 |

> **Hinweis zu Umfang:** Nicht jede Quell-.md muss 1:1 eine eigene Seite werden. Bei Modulen mit vielen Dateien
> (P7=15, P12=14, Makro=12) die Quelle sichten und zu **6–10 sinnvollen Themenseiten in 3–4 Phasen** bündeln.
> Icon & Kachel-Farbe stehen schon auf der Portal-Kachel (siehe `index.html`) — dort abschauen.

---

## 3. Der Bau-Prozess (Schritt für Schritt)

Platzhalter unten: `MODULE` = Web-Slug (z.B. `p7`), `MODUL-ORDNER` = Quellordner, `NN` = Themennummer `01`…

### Schritt 0 — Voraussetzungen
- `git -C "C:\Users\Florian Kindler\Projects\RNVS" status` → sauber, auf `main`.
- **Alle** Quell-.md des Moduls lesen (`README.md` zuerst → gibt Struktur, Klausur-Fokus, häufige Fehler vor).

### Schritt 1 — Inhalt sichten & Struktur festlegen
- Themen auf **6–10 Seiten** in **3–4 Phasen** festlegen. Pro Thema notieren: Dateiname `NN-slug.html`,
  Icon (Emoji), Kategorie-Farbe (`cat1`–`cat4`, meist eine pro Phase), Schwierigkeit (★☆☆–★★★), Klausurrelevanz.
- **prev/next** = strikt numerische Kette `01 → 02 → … → NN`; `01.prev = ../index.html`, `letzte.next = ../index.html`.
- **Quizfragen** für ALLE Seiten selbst formulieren (3 pro Seite, ≥1 Zahlen-/Texteingabe), Antworten aus der Quelle
  ableiten und prüfen. Diese kommen später wörtlich in die Agenten-Aufträge.

### Schritt 2 — Portal-Kachel „live" schalten (`index.html`)
Die betreffende „Bald verfügbar"-Kachel von einem `<div …soon>` in einen echten `<a>`-Link umbauen:
```html
<!-- VORHER (Platzhalter) -->
<div class="topic-card soon reveal" style="--cat:var(--c-cat2);--cat-soft:var(--c-cat2-soft)">
  <div class="tc-top"><span class="tc-icon">🧮</span><span class="tc-no">P7</span></div>
  <h3>Logik &amp; Diskrete Strukturen</h3>
  <p>…</p>
  <div class="tc-meta"><span class="badge badge-soon">Bald verfügbar</span></div>
</div>

<!-- NACHHER (live) -->
<a class="topic-card reveal" href="p7/index.html" style="--cat:var(--c-cat2);--cat-soft:var(--c-cat2-soft)">
  <div class="tc-top"><span class="tc-icon">🧮</span><span class="tc-no">P7</span></div>
  <h3>Logik &amp; Diskrete Strukturen</h3>
  <p>…</p>
  <div class="tc-meta"><span class="badge badge-live">✓ Verfügbar</span><span class="badge badge-soft">8 Themen</span></div>
  <div class="tc-foot"><span>SoSe 2026</span><span>·</span><span class="badge badge-ects">6 ECTS</span></div>
</a>
```
Danach in der Hero-Statistik oben ggf. „schon bildlich erklärt" und „Themen-Seiten" hochzählen.

### Schritt 3 — Ordner anlegen
```bash
mkdir -p "C:/Users/Florian Kindler/Projects/RNVS/MODULE/topics"
```

### Schritt 4 — Kurs-Hub `MODULE/index.html` bauen
**Beste Vorlage: `p4/index.html` kopieren** und anpassen. Zu ändern:
- `<title>`, `<meta description>`, Favicon-Farbe/Buchstabe (P4 nutzt lila `%238b5cf6` + `λ`; eigene Farbe/Icon wählen).
- Brand-Logo-Text + `<small>`, Nav-Links (Phasen-Anker), `nav-cta` bleibt `href="../index.html"` (← Alle Vorlesungen).
- Hero-H1/Lead/CTAs/Stats. Phasen-Sektionen `#phase-1…n` mit `.topic-card`-Links auf `topics/NN-*.html`.
- Footer-Text. CSS/JS-Pfade: `../css/style.css`, `../js/main.js` (Hub-Ebene!).

### Schritt 5 — `BUILD_SPEC_<MODULE>.md` ableiten
**`BUILD_SPEC_P4.md` kopieren** und anpassen (es ist die generischste Vorlage, inkl. Code-Blöcke & Quiz):
- Modulname/Fach überall, Ton an das Fach anpassen (Mathe/Logik: viel Formeln & Beweise; VWL: Kurven/Diagramme).
- **Navigationstabelle** (§5) mit den in Schritt 1 festgelegten NN/CAT/Icon/Titel/prev/next füllen.
- SVG-Ideen §4 durch fachpassende ersetzen (siehe Ideen-Liste unten in §4 dieser Anleitung).
- Pfade bleiben `../../css/style.css`, `../../js/main.js`, `../index.html` (Themen-Ebene).
- Bei Nicht-Code-Fächern die Haskell-spezifischen Teile (`pre.code.hs`, Operator-Escaping) entschärfen/entfernen.

### Schritt 6 — Referenzseite `topics/01-*.html` SELBST bauen
Eine erste Themenseite vollständig selbst schreiben (Vorlage: `p4/topics/01-rekursion.html`). Sie validiert die
Spec und dient den Agenten als Qualitäts-Referenz. Pflichtsektionen: `#worum` (mit `.analogy`), `#theorie`
(≥2 SVG), `#schritt`, `#fallen` (≥3 `.fr`), `#quickref`, `#check` (3 Quizfragen). Danach mit §6-Checks prüfen.

### Schritt 7 — Restliche Seiten an Sonnet-Subagenten delegieren
Pro Seite **ein** `general-purpose`-Agent, `model: sonnet` (bei sehr rechen-/beweislastigen Themen sinnvoll;
niemals unter Sonnet für inhaltsdichte Seiten). Mehrere Agenten parallel im selben Turn starten. Prompt-Template:

```
Du baust EINE HTML-Lernseite für <MODUL> (LMU). Reines HTML + inline-SVG, keine externen Ressourcen.
Deutsch, „du"-Ansprache, für Einsteiger ohne Vorwissen, sehr bildlich.

PFLICHT-LEKTÜRE ZUERST:
1. c:\...\RNVS\BUILD_SPEC_<MODULE>.md — halte dich EXAKT daran.
2. REFERENZSEITE (gleiche Qualität): c:\...\RNVS\MODULE\topics\01-....html
3. Quell-Notiz: F:\...\SoSe-2026-Module\MODUL-ORDNER\NN-....md

SCHREIBE DIE DATEI NACH: c:\...\RNVS\MODULE\topics\NN-slug.html

VERBINDLICHE KOPFDATEN: NN, CAT=catX, Icon=…, H1="…", <body style="--cat:var(--c-catX);--cat-soft:var(--c-catX-soft)">,
Meta-Badges …, prev: …, next: …

INHALT: <die Kernpunkte aus der Quelle stichpunktartig — fachlich korrekt vorgeben>
SVG-IDEEN (mind. 3): <3 konkrete, fachpassende Diagramm-Ideen>

WISSENSCHECK (#check, genau diese 3 Fragen WÖRTLICH übernehmen — Markup laut §4b der Spec):
  Frage 1 (number/text/choice, data-answer="…"): „…" — Erklärung: …
  Frage 2 …
  Frage 3 …

QUALITÄT: alle 6 Pflichtsektionen + TOC-Anker (inkl. #check), ≥3 SVG, ≥3 .fr, Pfade ../../… korrekt,
<section>-Tags balanciert, [bei Code-Fächern:] alle Operatoren escaped. Am Ende nur kurze Zusammenfassung zurückgeben.
```

### Schritt 8 — Verifizieren (Snippets in §6 dieser Anleitung, copy-paste)
Struktur, TOC-Anker, Quiz-Anzahl, prev/next-Kette, Pfade, (bei Code) Escaping prüfen. Erst weiter, wenn alles grün.

### Schritt 9 — README + Memory pflegen
- `README.md`: Modul in der Tabelle von „🕓 geplant" auf „✅ fertig" + Themen-Zahl, Themenliste ergänzen, Ordner im Baum.
- Memory `project_rnvs_website.md` (im Cycling-Website-Memory-Ordner) + `MEMORY.md`-Pointer aktualisieren.

### Schritt 10 — Commit + Push + Live-Check
```bash
cd "C:/Users/Florian Kindler/Projects/RNVS" && git add -A
git commit -m "Neues Modul <MODUL>: Hub + N Themenseiten mit Wissenschecks

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git push origin main
```
- Git-Autor ist `florixnkn <florixnkn@users.noreply.github.com>` (KEINE private iCloud-Mail ins Public-Repo).
- Pages-Build abwarten: `gh api repos/florixnkn/RNVS/pages/builds/latest --jq '.status'` bis `built`.
- Live prüfen: `curl -s -o /dev/null -w "%{http_code}\n" https://florixnkn.github.io/RNVS/MODULE/topics/NN-slug.html` → 200.

---

## 4. Referenz: Design-Bausteine

**Kategorie-Farben** (nur diese; SVG braucht Hex, CSS-Variablen greifen im SVG nicht zuverlässig):

| Token | Hex | `-soft` | Rolle-Beispiel |
|-------|-----|---------|----------------|
| `--c-cat1` | `#12b28c` grün | `--c-cat1-soft` | Grundlagen |
| `--c-cat2` | `#2f6df6` blau | `--c-cat2-soft` | Aufbau/Mitte |
| `--c-cat3` | `#8b5cf6` lila | `--c-cat3-soft` | Abstraktion |
| `--c-cat4` | `#f5810b` orange | `--c-cat4-soft` | Fortgeschritten |
| (weitere im SVG) | rot `#e0483d`, grau `#8a94a6` | | Fehler / neutral |

**Quiz-Fragetypen** (Logik liegt in `js/main.js`, nur Markup schreiben):

| Typ | Attribute | Verhalten |
|-----|-----------|-----------|
| Zahl | `data-type="number" data-answer="6"` (optional `data-tol="0.5"`) | Komma/Punkt & Einheiten egal; ohne `data-tol` 1 % relative Toleranz |
| Text | `data-type="text" data-answer="Just 6\|Just (6)"` | Groß/klein, Leerzeichen, Endsatzzeichen egal; Varianten mit `\|` trennen |
| Auswahl / Wahr-Falsch | `data-type="choice"`, richtiger Button trägt `data-correct`; für W/F `class="quiz-choices quiz-tf"` | markiert richtig grün / falsch rot |

Regeln: **genau 3 Fragen/Seite**, ≥1 Eingabefeld, Nummerierung `<span class="q-no">N.</span>`. Vollständiges
Markup-Muster steht in `BUILD_SPEC_P4.md` §4b.

**SVG-Ideen nach Fach** (mind. 3 pro Seite, farbig, mit `<figcaption>`):
- **Logik (P7):** Wahrheitstabellen als Gitter, Beweisbaum, Mengen-Venn-Diagramme, Relationen als Pfeilgraph.
- **Formale Sprachen (P10):** Automaten (Zustände als Kreise + Übergangspfeile), Ableitungsbaum einer Grammatik, Pumping-Lemma-Bild.
- **Stochastik (P12):** Baumdiagramm (Pfadwahrscheinlichkeiten), Histogramm/Dichtekurve, Verteilungs-Vergleich.
- **ML:** Datenpunkte + Trenngerade/Regressionslinie, Neuron als Knoten mit Gewichten, Gradientenabstieg als Talfahrt.
- **Quanten:** Bloch-Kugel schematisch, Qubit-Superposition als Zeiger, Quantengatter als Box-Reihe.
- **Makro (P2):** Angebot/Nachfrage-Kurven, Kreislaufdiagramm, IS-LM/AD-AS-Achsen, Konjunkturzyklus-Welle.
- **Finanzwissenschaft (P4-VWL):** Steuer-Keil im Marktdiagramm, Lorenzkurve, öffentliches-Gut-Schema, Laffer-Kurve.

**Komponenten-Klassen** (nur diese verwenden — nichts erfinden): `.analogy`, `.callout(-info/-warning/-tip/-formula)`,
`.fr` (`.wrong`/`.right`), `.steps`, `.table-wrap`+`table.data`, `.factgrid`+`.fact`, `figure.diagram`+`.diagram-title`,
`.quickref`, `.evalstep`, `pre.code`(`.hs`), `.quiz`+`.quiz-q`(…). SVG-Text: `class="svg-ink"`/`svg-soft` für Theme.

---

## 5. Eiserne Regeln (Fallstricke, an denen es sonst scheitert)

1. **Quizfragen faktentreu = Chefsache.** Immer das Hauptmodell formuliert Frage + Antwort + Erklärung aus der
   Quelle; Agenten setzen nur ein. Nie Agenten Fragen erfinden lassen.
2. **Escaping in Code-Fächern:** in `<pre>`/`<code>` müssen `<` `>` `&` als `&lt;` `&gt;` `&amp;` — sonst frisst
   der Browser Teile als Tags. (Reine Text-/Mathe-Module: `<` und `&` trotzdem escapen, `>` unkritisch.)
3. **Delegieren, nicht selbst alle Seiten tippen.** Fundament (Portal-Kachel, Hub, Spec, Seite 01, Quizfragen)
   selbst; Rest an Subagenten mit **niedrigstem sinnvollem Modell** (inhaltsdicht = Sonnet).
4. **Keine externen Ressourcen** (keine CDNs, Fonts, Bild-URLs, JS-Libs). Alles inline/geteilt.
5. **prev/next strikt numerisch** und Kette geschlossen (01.prev & letzte.next → `../index.html`).
6. **Pfad-Tiefe** exakt nach Tabelle §1 (häufigster Bug beim Verschieben/Neuanlegen).
7. **`.nojekyll`** muss bleiben; neue Ordner brauchen nichts Extra (Pages liefert statisch).
8. **Nichts pushen, bevor §8-Checks grün sind.** Danach Pages-Build abwarten und Live-200 bestätigen.

---

## 6. Copy-paste: Verifikations-Snippets

**Struktur/Links pro Modul (Bash, Git-Bash):**
```bash
cd "C:/Users/Florian Kindler/Projects/RNVS"
for f in MODULE/topics/0*.html; do
  printf "%-26s check=%s toc=%s svg=%s fr=%s quiz=%s sec(%s/%s) css=%s js=%s nav=%s\n" "$(basename $f)" \
    "$(grep -oc 'id=\"check\"' $f)" "$(grep -oc 'href=\"#check\"' $f)" "$(grep -c '<svg ' $f)" \
    "$(grep -c 'class=\"fr\"' $f)" "$(grep -c 'class=\"quiz-q\"' $f)" \
    "$(grep -oc '<section' $f)" "$(grep -oc '</section>' $f)" \
    "$(grep -c '\.\./\.\./css/style\.css' $f)" "$(grep -c '\.\./\.\./js/main\.js' $f)" "$(grep -c 'class=\"prev-next\"' $f)"
done
# Erwartung je Seite: check=1 toc=1 svg>=3 fr>=3 quiz=3 sec balanciert css=1 js=1 nav=1
grep -rhoE 'data-answer="[^"]*"' MODULE/topics/0*.html      # Antworten gegen die Quelle gegenprüfen
```

**TOC-Anker + Escaping (Node):**
```bash
node -e '
const fs=require("fs"),dir="MODULE/topics";
for(const f of fs.readdirSync(dir).filter(x=>/^0\d.*\.html$/.test(x)).sort()){
  const s=fs.readFileSync(dir+"/"+f,"utf8");
  const anchors=[...s.matchAll(/href="#([\w-]+)"/g)].map(m=>m[1]);
  const ids=new Set([...s.matchAll(/<section id="([\w-]+)"/g)].map(m=>m[1]));
  const missing=anchors.filter(a=>!ids.has(a));
  let rawLt=0; for(const m of s.matchAll(/<pre\b[^>]*>([\s\S]*?)<\/pre>/g)) rawLt+=(m[1].match(/</g)||[]).length;
  console.log(f.padEnd(22)+" tocMissing=["+missing.join(",")+"] rawLtInPre="+rawLt);
}'
# Erwartung: tocMissing=[] und rawLtInPre=0 auf jeder Seite
```

**Live-Check nach Push:**
```bash
base="https://florixnkn.github.io/RNVS"
gh api repos/florixnkn/RNVS/pages/builds/latest --jq '.status'   # bis "built"
curl -s -o /dev/null -w "portal %{http_code}\n" "$base/"
curl -s -o /dev/null -w "hub %{http_code}\n"   "$base/MODULE/index.html"
for p in MODULE/topics/0*; do :; done   # oder je Seite: curl … "$base/MODULE/topics/NN-slug.html" → 200
```

---

*Wenn du dich an diese Datei hältst, ist jedes weitere Modul in ~1 Session fertig: sichten → Kachel live →
Hub → Spec → Seite 01 → Rest delegieren → prüfen → pushen. Viel Erfolg, späteres Ich.*
