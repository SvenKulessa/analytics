# Lizenzierung der erstellten Grafiken und Daten — CAPITAL-AI Analytics Hub

**Projekt:** CAPITAL-AI Analytics Hub (`capital-ai.online/analytics`)  
**Stand:** November 2026  
**Rechteinhaber / Herausgeber:** CAPITAL-AI (`capital-ai.online`)

---

## 1. Lizenz für erstellte Grafiken & Vektor-Assets

Alle eigens für diese Webanwendung erstellten Vektorgrafiken, Logos, Diagramme und UI-Illustrationen unterliegen der **Apache-2.0-Lizenz** (sofern nachfolgend nicht abweichend gekennzeichnet) und dürfen im Rahmen von `capital-ai.online` frei verwendet, skaliert, angepasst und veröffentlicht werden.

### Inventar der erstellten Grafiken

| Asset / Komponente | Speicherort | Beschreibung | Lizenz |
| --- | --- | --- | --- |
| **CAPITAL-AI Brand-Emblem** | `src/components/CapitalAiEmblem.tsx` | Vektor-Logo oben links in der Navigation (Orbital-Globus mit Wachstumspfeil) | Apache-2.0 / CAPITAL-AI Brand Asset |
| **Jarvis 3D-Hero-Globus & Neuronen-HUD** | `src/components/OrbitalGlobeHero.tsx` | Interaktiver 3D-Punktmatrix-Globus, konzentrische Telemetrie-Ringe, Lock-On-Scanner & animierte Verbindungsneuronen | Apache-2.0 |
| **Donut-Score- & Sparkline-Visualisierungen** | `src/components/ModuleDetailPanel.tsx` | Interaktive SVG-Kreisdiagramme und 30-Tage-Verlaufsgrafiken für alle 7 Prozessmodule | Apache-2.0 |

---

## 2. Lizenz für erstellte Daten & Strukturmodelle

Die im Repository hinterlegten strukturierten Kennzahlen, Prozessketten, Screener-Datensätze und Lernmodule dienen der Darstellung und interaktiven Demonstration des CAPITAL-AI Analytics Hub.

### Inventar der erstellten Datensätze

| Datensatz / Datei | Speicherort | Inhalt | Lizenz |
| --- | --- | --- | --- |
| **Analytics-Prozess-Metriken (DE/EN)** | `src/data/analyticsData.ts` (`MODULES_DE`, `MODULES_EN`) | Qualitäts-Scores, 30-Tage-Volumenreihen, 24h-Prüfstatistiken und 5-stufige Prozesspipelines für alle 7 Module | CC BY 4.0 (Attribution: CAPITAL-AI) |
| **Instrumenten- & Evidenz-Screening** | `src/data/analyticsData.ts` (`INSTRUMENTS`) | Referenzdaten für Aktien, ETFs und Staatsanleihen inkl. Datenqualität, Quellenanzahl, Faktor-Score und Evidenzgrad | CC BY 4.0 (Demonstrationsdaten, keine Anlageberatung) |
| **Learning-Hub-Curriculum** | `src/data/analyticsData.ts` (`LEARNING_MODULES`) | Lernmodule und Themenbeschreibungen zu Datenqualität, Scoring, Risiko und Evidenz | CC BY 4.0 (Attribution: CAPITAL-AI) |

> **Hinweis zu Marktdaten:** Die angezeigten Wertpapierkurse, Scores und Prüfzahlen in `src/data/analyticsData.ts` sind kuratierte Referenz- und Demonstrationsdaten und stellen keine Finanz- oder Anlageberatung dar.

---

## 3. Drittanbieter-Icons & Open-Source-Komponenten

Die kleinen Prozess- und UI-Icons werden über die Bibliothek **`lucide-react`** eingebunden:

- **Lucide Icons (`lucide-react`)** — Lizenziert unter der **ISC-Lizenz** (Copyright © Lucide Contributors). Verwendete Prozess-Icons: `Database`, `Shield`, `BarChart2`, `AlertTriangle`, `Layers`, `Newspaper`, `GraduationCap` sowie zugehörige Pipeline- und Navigations-Icons.
- **React / Tailwind CSS / Motion** — Lizenziert unter der **MIT-Lizenz**.

---

## 4. Lizenztext (Apache License 2.0 — Kurzfassung)

```text
Copyright 2026 CAPITAL-AI (capital-ai.online)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
