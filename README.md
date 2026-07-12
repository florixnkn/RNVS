# Lernhub — meine Vorlesungen, bildlich erklärt

Ein persönlicher **Lernhub** für das Informatik-Studium an der LMU. Eine Übersichtsseite führt zu
allen Modulen; jedes Modul hat eine eigene Kurs-Startseite und pro Thema eine eigene Seite —
**detailliert und vor allem bildlich**, für Leute, die davon noch kaum Ahnung haben. Mit inline-SVG-
Diagrammen, Alltags-Vergleichen, typischen Klausur-Fallen und interaktiven **Wissenschecks**.

> Hinweis: Das Repository heißt aus historischen Gründen noch `RNVS`, ist inzwischen aber der
> übergreifende Lernhub für mehrere Vorlesungen.

## 🌐 Live ansehen
**https://florixnkn.github.io/RNVS/**

## 📚 Module

| Modul | Status | Themen |
|-------|--------|--------|
| **P4 – Programmierung & Modellierung** (Haskell) | ✅ fertig | 6 |
| **P11 – Rechnernetze & Verteilte Systeme** | ✅ fertig | 10 |
| P7 – Logik & Diskrete Strukturen | 🕓 geplant | — |
| P10 – Formale Sprachen & Komplexität | 🕓 geplant | — |
| P12 – Stochastik & Statistik | 🕓 geplant | — |
| WP – Maschinelles Lernen | 🕓 geplant | — |
| WP – Quantencomputing | 🕓 geplant | — |
| VWL-P2 – Makroökonomie | 🕓 geplant | — |
| VWL-P4 – Finanzwissenschaft | 🕓 geplant | — |

### P4 – Programmierung & Modellierung (Haskell)
01 Rekursion · 02 Polymorphie & Typklassen · 03 Datentypen modellieren (ADTs) ·
04 Higher-Order Functions & Folds · 05 Auswertung & Evaluation · 06 Monaden

### P11 – Rechnernetze & Verteilte Systeme
01 Graphen/Adressierung · 02 Protokolle · 03 Netze & Tools · 04 OSI-Modell ·
05 Verzögerungen · 06 Handshakes · 07 Sliding Window · 08 UDP · 09 TCP · 10 Congestion Control

## 🧩 Aufbau

```
index.html            → Portal: Übersicht über ALLE Vorlesungen
css/style.css         → gemeinsames Designsystem (Light/Dark), von allen Seiten genutzt
js/main.js            → Theme-Umschalter, aktives Inhaltsverzeichnis, Scroll-Fortschritt, Quiz-Logik

rnvs/index.html       → Kurs-Startseite Rechnernetze (P11)
rnvs/topics/NN-*.html → je eine Seite pro RNVS-Thema

p4/index.html         → Kurs-Startseite Programmierung & Modellierung (P4, Haskell)
p4/topics/NN-*.html   → je eine Seite pro P4-Thema

BUILD_SPEC.md         → Bau-Spezifikation der RNVS-Seiten (interne Vorlage)
BUILD_SPEC_P4.md      → Bau-Spezifikation der P4/Haskell-Seiten (interne Vorlage)
ANLEITUNG-NEUES-MODUL.md → Schritt-für-Schritt-Playbook, um weitere Module (P7, P10, …) zu ergänzen
```

## ➕ Weitere Module ergänzen
Wie man ein zusätzliches Fach im gleichen Stil hinzufügt, steht ausführlich in
**[ANLEITUNG-NEUES-MODUL.md](ANLEITUNG-NEUES-MODUL.md)** (Pfad-Regeln, Portal-Kachel live schalten, Kurs-Hub,
Spec ableiten, Referenzseite, Delegation an Subagenten, Verifikation, Push).

Jede Themen-Seite folgt derselben Struktur: **Worum geht's?** (mit Alltags-Vergleich) → **Theorie**
(mit inline-SVG-Diagrammen) → **Schritt für Schritt** → **Typische Fallen** (Falsch/Richtig) →
**Quick-Reference** für die Klausur → **🧩 Wissenscheck** (interaktive Aufgaben mit Sofort-Feedback).

## 🛠️ Technik
Reines HTML/CSS/JS, keine Build-Tools, keine externen Abhängigkeiten. Alle Diagramme sind inline-SVG
und funktionieren offline. Einfach `index.html` im Browser öffnen.

## 🎨 Wie es gebaut wurde
Ein Multiagenten-Ansatz: Das Designsystem, die Portal- und Kurs-Startseiten sowie je eine Referenzseite
wurden zentral gebaut; die übrigen Themenseiten dann von mehreren spezialisierten Agenten (Haiku/Sonnet)
parallel nach einer verbindlichen Spezifikation erstellt.

---
*Inhalte basieren auf eigenen Lernnotizen (LMU München).*
