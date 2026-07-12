# RNVS — Rechnernetze & Verteilte Systeme, bildlich erklärt

Eine statische Lern-Website zum LMU-Modul **P 11 – Rechnernetze und Verteilte Systeme** (SoSe 2026).
Jedes Thema hat eine eigene Seite, verwaltet über eine Homepage, von der aus man zu jedem Thema
springen kann. Erklärt **detailliert und vor allem bildlich** — für Leute, die davon noch kaum Ahnung haben.

## 🌐 Live ansehen
Sobald GitHub Pages aktiv ist: **https://florixnkn.github.io/RNVS/**

## 📚 Die 10 Themen (in Lernreihenfolge)

| # | Thema | Phase |
|---|-------|-------|
| 01 | Graphen, Bäume & Adressierung | Grundlagen |
| 02 | Protokolle & das Pizzadienst-Modell | Grundlagen |
| 03 | Rechnernetz vs. Verteiltes System & Linux-Tools | Grundlagen |
| 04 | OSI- & Internet-Referenzmodell (PDU/SDU) 🚨 | Grundlagen |
| 05 | Verzögerungszeiten & Vermittlungsarten 🧮 | Vermittlung & Verbindung |
| 06 | Verbindungsmanagement: Handshakes | Vermittlung & Verbindung |
| 07 | Sequenznummern & Sliding Window 🚨🚨 | Zuverlässige Übertragung |
| 08 | UDP & RFC 768 | Transportschicht |
| 09 | TCP: Verbindung, Sequenznummern & SACK 🚨🚨 | Transportschicht |
| 10 | TCP Congestion Control: Slow-Start, Tahoe & Reno 🚨🚨🚨 | Transportschicht |

## 🧩 Aufbau

```
index.html            → Homepage / Themen-Hub (nach Lernphasen gruppiert)
topics/NN-*.html      → je eine Seite pro Thema
css/style.css         → gemeinsames Designsystem (Light/Dark)
js/main.js            → Theme-Umschalter, aktives Inhaltsverzeichnis, Scroll-Fortschritt
BUILD_SPEC.md         → Bau-Spezifikation (interne Vorlage, nicht Teil der Website)
```

Jede Themen-Seite folgt derselben Struktur: **Worum geht's?** (mit Alltags-Vergleich) → **Theorie**
(mit inline-SVG-Diagrammen) → **Schritt für Schritt / Rechnen** → **Typische Fallen** (Falsch/Richtig)
→ **Quick-Reference** für die Klausur.

## 🛠️ Technik
Reines HTML/CSS/JS, keine Build-Tools, keine externen Abhängigkeiten. Alle Diagramme sind inline-SVG
und funktionieren offline. Einfach `index.html` im Browser öffnen.

## 🎨 Wie es gebaut wurde
Ein Multiagenten-Ansatz: Das Designsystem, die Homepage und eine Referenzseite wurden zentral gebaut,
die 10 Themenseiten dann von mehreren spezialisierten Agenten (Haiku für einfachere, Sonnet für
diagramm- und rechenlastige Themen) parallel nach einer verbindlichen Spezifikation erstellt.

---
*Inhalte basieren auf eigenen Lernnotizen zum Modul P 11 (LMU).*
