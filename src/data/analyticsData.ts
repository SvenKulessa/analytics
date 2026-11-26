export type Language = 'DE' | 'EN';

export type ModuleId =
  | 'quellen'
  | 'datenqualitaet'
  | 'scoring'
  | 'risiko'
  | 'evidenz'
  | 'marktnews'
  | 'lernen';

export interface ScoreBreakdownItem {
  label: string;
  value: number;
  unit?: string;
  color: string;
}

export interface SparklinePoint {
  day: string;
  value: number;
  display: string;
}

export interface CheckRow {
  status: 'success' | 'warning' | 'error';
  label: string;
  count: string;
  share: string;
}

export interface ProcessStep {
  id: string;
  label: string;
  iconKey: 'database' | 'checkSquare' | 'brush' | 'layers' | 'barChart' | 'shield' | 'alert' | 'news' | 'grad';
  detail: string;
  throughput: string;
}

export interface ModuleContent {
  id: ModuleId;
  name: string;
  shortDesc: string;
  accentHex: string;
  accentGlow: string;
  borderClass: string;
  badgeBgClass: string;
  bullets: string[];
  scoreCard: {
    title: string;
    info: string;
    primaryValue: string;
    primarySubLabel: string;
    progressPercent: number;
    breakdown: ScoreBreakdownItem[];
  };
  volumeCard: {
    title: string;
    info: string;
    value: string;
    delta: string;
    subtitle: string;
    series: SparklinePoint[];
  };
  checksCard: {
    title: string;
    info: string;
    rows: CheckRow[];
  };
  pipelineTitle: string;
  activeStepIndex: number;
  steps: ProcessStep[];
}

export interface InstrumentRow {
  ticker: string;
  name: string;
  sector: string;
  assetClass: 'Aktien' | 'ETF' | 'Anleihen' | 'Makro';
  price: string;
  change1D: string;
  positive: boolean;
  dataQuality: number;
  sourcesCount: number;
  multiFactorScore: number;
  riskGrade: 'Niedrig' | 'Moderat' | 'Erhöht';
  evidenceRating: 'A+' | 'A' | 'B+' | 'B';
  summaryDE: string;
  summaryEN: string;
}

export interface LearningModule {
  id: string;
  category: string;
  duration: string;
  level: string;
  titleDE: string;
  titleEN: string;
  descDE: string;
  descEN: string;
  progress: number;
}

export const UI_COPY: Record<
  Language,
  {
    nav: {
      product: string;
      learn: string;
      analyticsHub: string;
      pricing: string;
      enterprise: string;
      profileHub: string;
    };
    hero: {
      kicker: string;
      title: string;
      subtitle: string;
      description: string;
      ctaLearning: string;
      ctaAnalytics: string;
    };
    processBar: {
      kicker: string;
      subtitle: string;
    };
    explorer: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      allFilter: string;
      columns: {
        instrument: string;
        quality: string;
        sources: string;
        score: string;
        risk: string;
        evidence: string;
        change: string;
      };
    };
  }
> = {
  DE: {
    nav: {
      product: 'Produkt',
      learn: 'Lernen',
      analyticsHub: 'Analytics Hub',
      pricing: 'Preise',
      enterprise: 'Für Unternehmen',
      profileHub: 'Profile Hub',
    },
    hero: {
      kicker: 'GROWTH INTELLIGENCE ENGINE',
      title: 'Analytics Hub',
      subtitle:
        'Daten verstehen. Zusammenhänge erkennen. Entscheidungen fundiert vorbereiten.',
      description:
        'Die Analytics-Plattform von CAPITAL-AI für fundierte Marktanalysen, robuste Datenqualität, transparente Risikobewertung und evidenzbasierte Investment-Entscheidungen.',
      ctaLearning: 'Learning Hub öffnen',
      ctaAnalytics: 'Analytics Hub öffnen',
    },
    processBar: {
      kicker: 'ANALYTICS-PROZESS',
      subtitle: 'Von der Datengrundlage zur fundierten Entscheidung.',
    },
    explorer: {
      title: 'Live-Marktabdeckung & Evidenz-Screening',
      subtitle:
        'Durchsuchen Sie geprüfte Wertpapiere und Makro-Indikatoren mit direkter Kopplung an Datenqualität, Multi-Faktor-Scoring und Risikoprofil.',
      searchPlaceholder: 'Ticker, Name oder Sektor filtern…',
      allFilter: 'Alle Klassen',
      columns: {
        instrument: 'Instrument',
        quality: 'Datenqualität',
        sources: 'Quellen',
        score: 'Scoring',
        risk: 'Risiko',
        evidence: 'Evidenz',
        change: '24h',
      },
    },
  },
  EN: {
    nav: {
      product: 'Product',
      learn: 'Learn',
      analyticsHub: 'Analytics Hub',
      pricing: 'Pricing',
      enterprise: 'Enterprise',
      profileHub: 'Profile Hub',
    },
    hero: {
      kicker: 'GROWTH INTELLIGENCE ENGINE',
      title: 'Analytics Hub',
      subtitle:
        'Understand data. Recognize patterns. Prepare decisions with conviction.',
      description:
        'The CAPITAL-AI analytics platform for deep market intelligence, verified data quality, transparent risk modeling, and evidence-based investment decisions.',
      ctaLearning: 'Open Learning Hub',
      ctaAnalytics: 'Open Analytics Hub',
    },
    processBar: {
      kicker: 'ANALYTICS PROCESS',
      subtitle: 'From raw data foundations to high-conviction decisions.',
    },
    explorer: {
      title: 'Live Market Coverage & Evidence Screening',
      subtitle:
        'Inspect verified securities and macro benchmarks directly linked to data quality, multi-factor scoring, and risk telemetry.',
      searchPlaceholder: 'Filter ticker, name, or sector…',
      allFilter: 'All Classes',
      columns: {
        instrument: 'Instrument',
        quality: 'Data Quality',
        sources: 'Sources',
        score: 'Scoring',
        risk: 'Risk',
        evidence: 'Evidence',
        change: '24h',
      },
    },
  },
};

export const MODULES_DE: Record<ModuleId, ModuleContent> = {
  quellen: {
    id: 'quellen',
    name: 'Quellen',
    shortDesc:
      'Strukturierte Anbindung globaler Börsenplätze, Fundamentaldaten, Makro-Feeds und regulatorischer Meldungen.',
    accentHex: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    borderClass: 'border-emerald-400/50',
    badgeBgClass: 'from-emerald-500/25 to-teal-500/10 border-emerald-400/40 text-emerald-300',
    bullets: [
      'Direkte Anbindung von 64 globalen Handelsplätzen und Indexanbietern',
      'Synchronisierte Quartalsberichte, Bilanzkennzahlen und Ad-hoc-Mitteilungen',
      'Makroökonomische Zeitreihen von Zentralbanken und Statistikämtern',
      'Lückenlose Herkunfts-Metadaten für jede Kennzahl im System',
    ],
    scoreCard: {
      title: 'Quellen-Abdeckung',
      info: 'Anteil aktiver, latenzgeprüfter Primär- und Sekundärfeeds an der Zielabdeckung.',
      primaryValue: '97 %',
      primarySubLabel: 'Verfügbar',
      progressPercent: 97,
      breakdown: [
        { label: 'Markt- & Kursfeeds', value: 99, color: '#10b981' },
        { label: 'Fundamentaldaten', value: 96, color: '#38bdf8' },
        { label: 'Makro-Indikatoren', value: 95, color: '#a78bfa' },
        { label: 'Regulatorik & Filings', value: 98, color: '#f59e0b' },
      ],
    },
    volumeCard: {
      title: 'Aktive Datenstreams',
      info: 'Anzahl synchronisierter Datenkanäle über die letzten 30 Tage.',
      value: '318 Feeds',
      delta: '+4,1 %',
      subtitle: 'Synchronisierte Kanäle (30 Tage)',
      series: [
        { day: 'Tag 1', value: 298, display: '298 Feeds' },
        { day: 'Tag 5', value: 302, display: '302 Feeds' },
        { day: 'Tag 10', value: 305, display: '305 Feeds' },
        { day: 'Tag 15', value: 308, display: '308 Feeds' },
        { day: 'Tag 20', value: 311, display: '311 Feeds' },
        { day: 'Tag 25', value: 315, display: '315 Feeds' },
        { day: 'Tag 30', value: 318, display: '318 Feeds' },
      ],
    },
    checksCard: {
      title: 'Feed-Status (letzte 24 h)',
      info: 'Kontinuierliche Erreichbarkeits- und Latenzprüfung aller externen Schnittstellen.',
      rows: [
        { status: 'success', label: 'Synchronisiert', count: '312', share: '98,1 %' },
        { status: 'warning', label: 'Verzögert (>2s)', count: '5', share: '1,6 %' },
        { status: 'error', label: 'Offline / Failover', count: '1', share: '0,3 %' },
      ],
    },
    pipelineTitle: 'Prozess: Quellen-Integration im Analytics Hub',
    activeStepIndex: 1,
    steps: [
      {
        id: 'q1',
        label: 'Primärfeeds verbinden',
        iconKey: 'database',
        detail: 'Authentifizierte API- und FIX-Streams erfassen Rohdaten aus 64 Märkten.',
        throughput: '42.000 Events/Sek.',
      },
      {
        id: 'q2',
        label: 'Schema normalisieren',
        iconKey: 'checkSquare',
        detail: 'Einheitliche ISIN-, Währungs- und Zeitzonen-Abbildung über alle Quellen.',
        throughput: '100 % ISO-konform',
      },
      {
        id: 'q3',
        label: 'Quellen abgleichen',
        iconKey: 'brush',
        detail: 'Cross-Check zwischen Primärbörsen und konsolidierten Datenanbietern.',
        throughput: 'Latenz < 180 ms',
      },
      {
        id: 'q4',
        label: 'Herkunft taggen',
        iconKey: 'layers',
        detail: 'Jeder Datenpunkt erhält Zeitstempel, Provider-ID und Vertrauensgrad.',
        throughput: 'Lückenlos auditiert',
      },
      {
        id: 'q5',
        label: 'Qualitätsgate übergeben',
        iconKey: 'barChart',
        detail: 'Übergabe der normalisierten Zeitreihen an die Qualitätsprüfung.',
        throughput: 'Zero-Drop-Buffer',
      },
    ],
  },
  datenqualitaet: {
    id: 'datenqualitaet',
    name: 'Datenqualität',
    shortDesc:
      'Verlässliche und konsistente Daten als Fundament für belastbare Analysen und Entscheidungen.',
    accentHex: '#a855f7',
    accentGlow: 'rgba(168, 85, 247, 0.45)',
    borderClass: 'border-violet-400/70',
    badgeBgClass: 'from-violet-500/30 to-purple-600/20 border-violet-400/60 text-violet-200',
    bullets: [
      'Automatische Prüfung von Vollständigkeit, Konsistenz und Aktualität',
      'Erkennung und Bereinigung von Ausreißern und Anomalien',
      'Transparente Qualitätskennzahlen und Historie',
      'Direkter Einfluss auf Scoring, Risiko und Evidenz',
    ],
    scoreCard: {
      title: 'Datenqualitäts-Score',
      info: 'Gewichteter Gesamtindex aus Vollständigkeit, Konsistenz, Aktualität und Plausibilität.',
      primaryValue: '94 %',
      primarySubLabel: 'Qualität',
      progressPercent: 94,
      breakdown: [
        { label: 'Vollständigkeit', value: 98, color: '#a855f7' },
        { label: 'Konsistenz', value: 93, color: '#38bdf8' },
        { label: 'Aktualität', value: 96, color: '#c084fc' },
        { label: 'Plausibilität', value: 91, color: '#f59e0b' },
      ],
    },
    volumeCard: {
      title: 'Datenvolumen',
      info: 'Geprüfte und bereinigte Datenpunkte im rollierenden 30-Tage-Fenster.',
      value: '142,8 Mio.',
      delta: '+6,3 %',
      subtitle: 'Datenpunkte (30 Tage)',
      series: [
        { day: 'Tag 1', value: 112.4, display: '112,4 Mio.' },
        { day: 'Tag 5', value: 118.9, display: '118,9 Mio.' },
        { day: 'Tag 10', value: 115.2, display: '115,2 Mio.' },
        { day: 'Tag 15', value: 124.8, display: '124,8 Mio.' },
        { day: 'Tag 20', value: 129.6, display: '129,6 Mio.' },
        { day: 'Tag 25', value: 135.4, display: '135,4 Mio.' },
        { day: 'Tag 30', value: 142.8, display: '142,8 Mio.' },
      ],
    },
    checksCard: {
      title: 'Qualitäts-Checks (letzte 24 h)',
      info: 'Automatisierte Validierungsregeln über alle eingehenden Markt- und Fundamentaldaten.',
      rows: [
        { status: 'success', label: 'Erfolgreich', count: '1.248.320', share: '98,6 %' },
        { status: 'warning', label: 'Auffälligkeiten', count: '16.480', share: '1,3 %' },
        { status: 'error', label: 'Fehler', count: '1.260', share: '0,1 %' },
      ],
    },
    pipelineTitle: 'Prozess: Datenqualität im Analytics Hub',
    activeStepIndex: 1,
    steps: [
      {
        id: 'dq1',
        label: 'Daten erfassen',
        iconKey: 'database',
        detail: 'Inkrementelle Übernahme aller geprüften Rohfeeds inklusive Schema-Versionierung.',
        throughput: '1,26 Mio. Checks/Tag',
      },
      {
        id: 'dq2',
        label: 'Qualität prüfen',
        iconKey: 'checkSquare',
        detail: 'Regelbasierte und statistische Z-Score-Prüfung auf Lücken, Sprünge und Duplikate.',
        throughput: '480 Validierungsregeln',
      },
      {
        id: 'dq3',
        label: 'Bereinigen & standardisieren',
        iconKey: 'brush',
        detail: 'Split-Adjustments, Währungsharmonisierung und Ausreißer-Quarantäne.',
        throughput: '99,9 % automatisiert',
      },
      {
        id: 'dq4',
        label: 'Qualität bewerten',
        iconKey: 'layers',
        detail: 'Berechnung des modularen Qualitäts-Scores je Asset und Zeitreihe.',
        throughput: 'Aktualisierung alle 5 Min.',
      },
      {
        id: 'dq5',
        label: 'An Analysen übergeben',
        iconKey: 'barChart',
        detail: 'Freigabe ausschließlich qualitätsgeprüfter Datensätze an Scoring & Risikomodelle.',
        throughput: 'Signierte Snapshots',
      },
    ],
  },
  scoring: {
    id: 'scoring',
    name: 'Scoring',
    shortDesc:
      'Multidimensionale Bewertung von Wachstum, Profitabilität, Bewertung und Momentum auf einheitlicher Skala.',
    accentHex: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.4)',
    borderClass: 'border-blue-400/60',
    badgeBgClass: 'from-blue-500/25 to-indigo-500/15 border-blue-400/50 text-blue-200',
    bullets: [
      'Standardisierte 0–100 Faktor-Scores über vier fundamentale Dimensionen',
      'Sektorrelative Peergroup-Kalibrierung ohne Look-Ahead-Bias',
      'Gewichtungs-Transparenz und historische Score-Migrationen',
      'Direkte Kopplung an Datenqualitäts-Schwellenwerte',
    ],
    scoreCard: {
      title: 'Modell-Kalibrierung',
      info: 'Aktuelle Faktoren-Trennschärfe und Stabilität im Backtest-Fenster.',
      primaryValue: '88 %',
      primarySubLabel: 'Konfidenz',
      progressPercent: 88,
      breakdown: [
        { label: 'Qualität & Marge', value: 92, color: '#3b82f6' },
        { label: 'Wachstumsdynamik', value: 86, color: '#38bdf8' },
        { label: 'Bewertungsdisziplin', value: 84, color: '#a855f7' },
        { label: 'Trend-Momentum', value: 90, color: '#10b981' },
      ],
    },
    volumeCard: {
      title: 'Bewertete Titel',
      info: 'Täglich neu berechnete Multi-Faktor-Profile im globalen Anlageuniversum.',
      value: '8.420 Titel',
      delta: '+3,8 %',
      subtitle: 'Aktive Scoring-Profile (30 Tage)',
      series: [
        { day: 'Tag 1', value: 7940, display: '7.940 Titel' },
        { day: 'Tag 5', value: 8050, display: '8.050 Titel' },
        { day: 'Tag 10', value: 8120, display: '8.120 Titel' },
        { day: 'Tag 15', value: 8210, display: '8.210 Titel' },
        { day: 'Tag 20', value: 8290, display: '8.290 Titel' },
        { day: 'Tag 25', value: 8360, display: '8.360 Titel' },
        { day: 'Tag 30', value: 8420, display: '8.420 Titel' },
      ],
    },
    checksCard: {
      title: 'Scoring-Läufe (letzte 24 h)',
      info: 'Verteilung der Faktor-Neuberechnungen nach Datenfreigabe.',
      rows: [
        { status: 'success', label: 'Vollständig berechnet', count: '8.314', share: '98,7 %' },
        { status: 'warning', label: 'Eingeschränkte Historie', count: '92', share: '1,1 %' },
        { status: 'error', label: 'Gesperrt (Qualität <80%)', count: '14', share: '0,2 %' },
      ],
    },
    pipelineTitle: 'Prozess: Multi-Faktor-Scoring im Analytics Hub',
    activeStepIndex: 2,
    steps: [
      {
        id: 'sc1',
        label: 'Faktoren extrahieren',
        iconKey: 'database',
        detail: 'Berechnung von 34 Fundamental-, Cashflow- und Momentum-Kennzahlen.',
        throughput: '286.000 Kennzahlen',
      },
      {
        id: 'sc2',
        label: 'Sektor normalisieren',
        iconKey: 'checkSquare',
        detail: 'Winsorizing und Z-Transformation innerhalb globaler GICS-Peergroups.',
        throughput: '11 Sektoren',
      },
      {
        id: 'sc3',
        label: 'Scores gewichten',
        iconKey: 'brush',
        detail: 'Regime-bewusste Zusammenführung zu einem klaren Gesamt-Score.',
        throughput: '0–100 Skala',
      },
      {
        id: 'sc4',
        label: 'Stabilität prüfen',
        iconKey: 'layers',
        detail: 'Turnover-Kontrolle verhindert erratische Umschichtungen durch Rauschen.',
        throughput: '94 % Rank-Stabilität',
      },
      {
        id: 'sc5',
        label: 'An Risiko & Evidenz',
        iconKey: 'barChart',
        detail: 'Bereitstellung der Faktor-Attribution für Risiko- und Evidenzberichte.',
        throughput: 'Echtzeit-API',
      },
    ],
  },
  risiko: {
    id: 'risiko',
    name: 'Risiko',
    shortDesc:
      'Transparente Quantifizierung von Volatilität, Drawdown-Szenarien, Korrelationen und Klumpenrisiken.',
    accentHex: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.4)',
    borderClass: 'border-cyan-400/60',
    badgeBgClass: 'from-cyan-500/25 to-sky-500/15 border-cyan-400/50 text-cyan-200',
    bullets: [
      'Historische & Monte-Carlo-Stresstests über multiple Marktregime',
      'Dynamische Korrelationsmatrizen und Sektor-Exposures',
      'Value-at-Risk (95% / 99%) und erwarteter Tail-Loss (CVaR)',
      'Frühwarnindikatoren bei Liquiditäts- oder Volatilitätsbrüchen',
    ],
    scoreCard: {
      title: 'Risiko-Modellgüte',
      info: 'Treffergenauigkeit der prognostizierten Volatilitäts- und VaR-Korridore.',
      primaryValue: '92 %',
      primarySubLabel: 'Kalibriert',
      progressPercent: 92,
      breakdown: [
        { label: 'Volatilitäts-Fit', value: 94, color: '#06b6d4' },
        { label: 'Tail-Risk-Abdeckung', value: 91, color: '#38bdf8' },
        { label: 'Liquiditäts-Modell', value: 95, color: '#10b981' },
        { label: 'Stresstest-Validität', value: 89, color: '#f59e0b' },
      ],
    },
    volumeCard: {
      title: 'Simulierte Szenarien',
      info: 'Täglich berechnete Risiko- und Stresstest-Pfade über Portfolios und Watchlists.',
      value: '24,6 Mio.',
      delta: '+8,4 %',
      subtitle: 'Monte-Carlo-Pfade (30 Tage)',
      series: [
        { day: 'Tag 1', value: 19.2, display: '19,2 Mio.' },
        { day: 'Tag 5', value: 20.1, display: '20,1 Mio.' },
        { day: 'Tag 10', value: 21.4, display: '21,4 Mio.' },
        { day: 'Tag 15', value: 22.0, display: '22,0 Mio.' },
        { day: 'Tag 20', value: 22.9, display: '22,9 Mio.' },
        { day: 'Tag 25', value: 23.7, display: '23,7 Mio.' },
        { day: 'Tag 30', value: 24.6, display: '24,6 Mio.' },
      ],
    },
    checksCard: {
      title: 'Risiko-Alarme (letzte 24 h)',
      info: 'Überwachung definierter Schwellenwerte für Drawdown, Beta und Liquidität.',
      rows: [
        { status: 'success', label: 'Im Zielkorridor', count: '7.910', share: '93,9 %' },
        { status: 'warning', label: 'Erhöhte Volatilität', count: '442', share: '5,3 %' },
        { status: 'error', label: 'Limit-Überschreitung', count: '68', share: '0,8 %' },
      ],
    },
    pipelineTitle: 'Prozess: Risikomodellierung im Analytics Hub',
    activeStepIndex: 2,
    steps: [
      {
        id: 'ri1',
        label: 'Renditeverteilung laden',
        iconKey: 'database',
        detail: 'Erfassung bereinigter Tages- und Intraday-Renditen inklusive Dividenden.',
        throughput: '10 Jahre Historie',
      },
      {
        id: 'ri2',
        label: 'Kovarianz schätzen',
        iconKey: 'checkSquare',
        detail: 'Ledoit-Wolf-Shrinkage für stabile Korrelationsmatrizen in Stressphasen.',
        throughput: '8.420 × 8.420 Matrix',
      },
      {
        id: 'ri3',
        label: 'Stresstests fahren',
        iconKey: 'alert',
        detail: 'Simulation historischer Krisen (2008, 2020, Zinswende 2022) & Schocks.',
        throughput: '10.000 Pfade/Asset',
      },
      {
        id: 'ri4',
        label: 'Risikobudget bewerten',
        iconKey: 'layers',
        detail: 'Zerlegung des Gesamtrisikos nach Faktoren, Währungen und Regionen.',
        throughput: 'Granularität <0,1%',
      },
      {
        id: 'ri5',
        label: 'Evidenz-Check speisen',
        iconKey: 'barChart',
        detail: 'Integration der Risiko-Kennzahlen in die finale Entscheidungs-Evidenz.',
        throughput: 'Sofort-Alerts',
      },
    ],
  },
  evidenz: {
    id: 'evidenz',
    name: 'Evidenz',
    shortDesc:
      'Nachvollziehbare Beweisführung: Jede These wird mit historischen Trefferquoten und Konfidenzintervallen verknüpft.',
    accentHex: '#60a5fa',
    accentGlow: 'rgba(96, 165, 250, 0.4)',
    borderClass: 'border-sky-400/60',
    badgeBgClass: 'from-sky-500/25 to-blue-500/15 border-sky-400/50 text-sky-200',
    bullets: [
      'Jede Analyse verknüpft Signal, Datenbasis und statistische Signifikanz',
      'Out-of-Sample-Validierung zur Vermeidung von Overfitting',
      'Klare Pro- & Contra-Faktoren pro Investment-These',
      'Vollständig exportierbare Entscheidungs-Dossiers',
    ],
    scoreCard: {
      title: 'Evidenz-Integrität',
      info: 'Anteil von Investment-Signalen mit statistisch robuster Out-of-Sample-Bestätigung.',
      primaryValue: '91 %',
      primarySubLabel: 'Belegt',
      progressPercent: 91,
      breakdown: [
        { label: 'Datenabdeckung', value: 96, color: '#60a5fa' },
        { label: 'Backtest-Robustheit', value: 89, color: '#a855f7' },
        { label: 'Signifikanz (p<0.05)', value: 92, color: '#10b981' },
        { label: 'Quellen-Diversität', value: 87, color: '#f59e0b' },
      ],
    },
    volumeCard: {
      title: 'Geprüfte Hypothesen',
      info: 'Aktive Signale und Thesen mit vollständiger Evidenz-Kette.',
      value: '18.940',
      delta: '+5,2 %',
      subtitle: 'Validierte Thesen (30 Tage)',
      series: [
        { day: 'Tag 1', value: 17100, display: '17.100' },
        { day: 'Tag 5', value: 17420, display: '17.420' },
        { day: 'Tag 10', value: 17880, display: '17.880' },
        { day: 'Tag 15', value: 18150, display: '18.150' },
        { day: 'Tag 20', value: 18440, display: '18.440' },
        { day: 'Tag 25', value: 18710, display: '18.710' },
        { day: 'Tag 30', value: 18940, display: '18.940' },
      ],
    },
    checksCard: {
      title: 'Evidenz-Audits (letzte 24 h)',
      info: 'Laufende Überprüfung aktiver Investment-Thesen gegen neue Marktdaten.',
      rows: [
        { status: 'success', label: 'Bestätigt (A/A+)', count: '15.890', share: '83,9 %' },
        { status: 'warning', label: 'In Überprüfung', count: '2.540', share: '13,4 %' },
        { status: 'error', label: 'Widerlegt / Abgelaufen', count: '510', share: '2,7 %' },
      ],
    },
    pipelineTitle: 'Prozess: Evidenz-Generierung im Analytics Hub',
    activeStepIndex: 3,
    steps: [
      {
        id: 'ev1',
        label: 'Signale bündeln',
        iconKey: 'database',
        detail: 'Zusammenführung von Qualitäts-, Scoring- und Risiko-Outputs.',
        throughput: '3 Kern-Layer',
      },
      {
        id: 'ev2',
        label: 'Backtest prüfen',
        iconKey: 'checkSquare',
        detail: 'Walk-Forward-Validierung über verschiedene Zins- und Wachstumszyklen.',
        throughput: '15+ Jahre',
      },
      {
        id: 'ev3',
        label: 'Gegenhypothesen testen',
        iconKey: 'brush',
        detail: 'Aktive Suche nach widersprechenden Indikatoren und Regime-Risiken.',
        throughput: 'Bias-Kontrolle',
      },
      {
        id: 'ev4',
        label: 'Evidenzgrad vergeben',
        iconKey: 'layers',
        detail: 'Transparente Einstufung von A+ (sehr hoch) bis C (spekulativ).',
        throughput: 'Reproduzierbar',
      },
      {
        id: 'ev5',
        label: 'Dossier bereitstellen',
        iconKey: 'barChart',
        detail: 'Strukturierte Aufbereitung für Investment-Komitee und Learning Hub.',
        throughput: '1-Klick-Export',
      },
    ],
  },
  marktnews: {
    id: 'marktnews',
    name: 'Marktnews',
    shortDesc:
      'Kuratierte Nachrichtenströme, Earnings-Call-Analysen und Makro-Impulse ohne Clickbait-Rauschen.',
    accentHex: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.38)',
    borderClass: 'border-amber-400/60',
    badgeBgClass: 'from-amber-500/25 to-orange-500/15 border-amber-400/50 text-amber-200',
    bullets: [
      'Semantische Filterung nach Relevanz für Ihr Portfolio & Ihre Watchlist',
      'Automatisierte Einordnung von Zentralbank-Statements und Quartalszahlen',
      'Verknüpfung jeder Meldung mit betroffenen Sektoren und Risikokennzahlen',
      'Duplikat-Eliminierung und Quellen-Verifizierung vor Veröffentlichung',
    ],
    scoreCard: {
      title: 'Signal-Relevanz',
      info: 'Verhältnis kurs- und fundamentalrelevanter Meldungen zum gesamten News-Aufkommen.',
      primaryValue: '89 %',
      primarySubLabel: 'Präzision',
      progressPercent: 89,
      breakdown: [
        { label: 'Primärquellen-Anteil', value: 95, color: '#f59e0b' },
        { label: 'Entity-Zuordnung', value: 92, color: '#38bdf8' },
        { label: 'Duplikat-Bereinigung', value: 97, color: '#10b981' },
        { label: 'Sentiment-Treue', value: 84, color: '#a855f7' },
      ],
    },
    volumeCard: {
      title: 'Verarbeitete Meldungen',
      info: 'Kuratierte und kontextualisierte Nachrichten-Events in 30 Tagen.',
      value: '412 Tsd.',
      delta: '+11,4 %',
      subtitle: 'Verifizierte Meldungen (30 Tage)',
      series: [
        { day: 'Tag 1', value: 345, display: '345 Tsd.' },
        { day: 'Tag 5', value: 360, display: '360 Tsd.' },
        { day: 'Tag 10', value: 352, display: '352 Tsd.' },
        { day: 'Tag 15', value: 378, display: '378 Tsd.' },
        { day: 'Tag 20', value: 391, display: '391 Tsd.' },
        { day: 'Tag 25', value: 403, display: '403 Tsd.' },
        { day: 'Tag 30', value: 412, display: '412 Tsd.' },
      ],
    },
    checksCard: {
      title: 'News-Filterung (letzte 24 h)',
      info: 'Eingehende Meldungen nach Relevanz-Klassifizierung und Quellenprüfung.',
      rows: [
        { status: 'success', label: 'Relevant & verifiziert', count: '14.210', share: '71,4 %' },
        { status: 'warning', label: 'Duplikate gefiltert', count: '5.190', share: '26,1 %' },
        { status: 'error', label: 'Unbestätigt / Verworfen', count: '495', share: '2,5 %' },
      ],
    },
    pipelineTitle: 'Prozess: Marktnews-Kuration im Analytics Hub',
    activeStepIndex: 2,
    steps: [
      {
        id: 'mn1',
        label: 'Nachrichten erfassen',
        iconKey: 'news',
        detail: 'Echtzeit-Ingestion von Wirtschaftspresse, Ad-hoc-Diensten und Transcripts.',
        throughput: '19.800 Artikel/Tag',
      },
      {
        id: 'mn2',
        label: 'Quellen verifizieren',
        iconKey: 'checkSquare',
        detail: 'Abgleich gegen offizielle Filings und vertrauenswürdige Primäragenturen.',
        throughput: 'Tier-1 Priorisierung',
      },
      {
        id: 'mn3',
        label: 'Kontext zuordnen',
        iconKey: 'brush',
        detail: 'Verknüpfung mit Emittenten, Lieferketten und Makro-Faktoren.',
        throughput: '8.420 Assets gemappt',
      },
      {
        id: 'mn4',
        label: 'Relevanz bewerten',
        iconKey: 'layers',
        detail: 'Unterdrückung von Redundanz; Hervorhebung fundamentaler Impulsgeber.',
        throughput: '-26 % Rauschen',
      },
      {
        id: 'mn5',
        label: 'Feed & Alerts speisen',
        iconKey: 'barChart',
        detail: 'Auslieferung in das Cockpit und Auslösung gezielter Portfolio-Hinweise.',
        throughput: 'Sub-Sekunden-Push',
      },
    ],
  },
  lernen: {
    id: 'lernen',
    name: 'Lernen',
    shortDesc:
      'Praxisnahe Lernpfade verbinden reale Marktdaten direkt mit Methodenwissen zu Analyse, Risiko und Allokation.',
    accentHex: '#eab308',
    accentGlow: 'rgba(234, 179, 8, 0.38)',
    borderClass: 'border-yellow-400/60',
    badgeBgClass: 'from-yellow-500/25 to-amber-500/15 border-yellow-400/50 text-yellow-200',
    bullets: [
      'Interaktive Fallstudien direkt auf Basis aktueller Analytics-Daten',
      'Schritt-für-Schritt-Erklärungen zu Faktoren, Kennzahlen und Drawdowns',
      'Lernfortschritt, Wissenschecks und Zertifizierungs-Module',
      'Nahtloser Wechsel zwischen Analyse-Tool und Erklärungsmodus',
    ],
    scoreCard: {
      title: 'Lernpfad-Reifegrad',
      info: 'Abdeckung der Kernkompetenzen über alle Analytics-Hub-Module hinweg.',
      primaryValue: '86 %',
      primarySubLabel: 'Praxisbezug',
      progressPercent: 86,
      breakdown: [
        { label: 'Datenkompetenz', value: 92, color: '#eab308' },
        { label: 'Faktor-Verständnis', value: 85, color: '#38bdf8' },
        { label: 'Risikomanagement', value: 88, color: '#a855f7' },
        { label: 'Fallstudien-Transfer', value: 80, color: '#10b981' },
      ],
    },
    volumeCard: {
      title: 'Abgeschlossene Lektionen',
      info: 'Durchgeführte interaktive Analysen und Lernmodule der Community.',
      value: '38.400',
      delta: '+14,2 %',
      subtitle: 'Lerneinheiten (30 Tage)',
      series: [
        { day: 'Tag 1', value: 29.5, display: '29,5 Tsd.' },
        { day: 'Tag 5', value: 31.0, display: '31,0 Tsd.' },
        { day: 'Tag 10', value: 32.4, display: '32,4 Tsd.' },
        { day: 'Tag 15', value: 34.1, display: '34,1 Tsd.' },
        { day: 'Tag 20', value: 35.8, display: '35,8 Tsd.' },
        { day: 'Tag 25', value: 37.2, display: '37,2 Tsd.' },
        { day: 'Tag 30', value: 38.4, display: '38,4 Tsd.' },
      ],
    },
    checksCard: {
      title: 'Wissenschecks (letzte 24 h)',
      info: 'Ergebnisse aus interaktiven Modultests und Szenario-Übungen.',
      rows: [
        { status: 'success', label: 'Bestanden (>80%)', count: '1.840', share: '87,6 %' },
        { status: 'warning', label: 'Wiederholung empfohlen', count: '215', share: '10,2 %' },
        { status: 'error', label: 'Abgebrochen', count: '46', share: '2,2 %' },
      ],
    },
    pipelineTitle: 'Prozess: Lernen im Analytics Hub',
    activeStepIndex: 1,
    steps: [
      {
        id: 'le1',
        label: 'Konzept wählen',
        iconKey: 'grad',
        detail: 'Auswahl von Modulen wie Datenqualität, Faktor-Scoring oder VaR.',
        throughput: '28 Lernpfade',
      },
      {
        id: 'le2',
        label: 'Echtdaten untersuchen',
        iconKey: 'checkSquare',
        detail: 'Direkte Anwendung des Wissens an realen Kurs- und Bilanzverläufen.',
        throughput: 'Live-Sandbox',
      },
      {
        id: 'le3',
        label: 'Szenario simulieren',
        iconKey: 'brush',
        detail: 'Auswirkungen veränderter Gewichtungen und Schock-Events testen.',
        throughput: 'Interaktiv',
      },
      {
        id: 'le4',
        label: 'Wissen prüfen',
        iconKey: 'layers',
        detail: 'Kurze Verständnisfragen sichern nachhaltigen Transfer in die Praxis.',
        throughput: 'Sofort-Feedback',
      },
      {
        id: 'le5',
        label: 'Im Cockpit anwenden',
        iconKey: 'barChart',
        detail: 'Nahtlose Rückkehr in den Analytics Hub mit gespeicherten Filtern.',
        throughput: '1-Klick-Transfer',
      },
    ],
  },
};

export const MODULES_EN: Record<ModuleId, ModuleContent> = {
  quellen: {
    ...MODULES_DE.quellen,
    name: 'Sources',
    shortDesc:
      'Structured ingestion of global exchanges, fundamental filings, macro feeds, and regulatory disclosures.',
    bullets: [
      'Direct integration with 64 global trading venues and index providers',
      'Synchronized quarterly filings, balance sheet ratios, and disclosures',
      'Macroeconomic time series from central banks and statistical offices',
      'Complete provenance metadata attached to every metric in the system',
    ],
    scoreCard: {
      ...MODULES_DE.quellen.scoreCard,
      title: 'Source Coverage',
      info: 'Share of active, latency-verified primary and secondary feeds against target coverage.',
      primarySubLabel: 'Available',
      breakdown: [
        { label: 'Market & Price Feeds', value: 99, color: '#10b981' },
        { label: 'Fundamentals', value: 96, color: '#38bdf8' },
        { label: 'Macro Indicators', value: 95, color: '#a78bfa' },
        { label: 'Regulatory Filings', value: 98, color: '#f59e0b' },
      ],
    },
    volumeCard: {
      ...MODULES_DE.quellen.volumeCard,
      title: 'Active Data Streams',
      info: 'Number of synchronized data channels over the trailing 30 days.',
      subtitle: 'Synchronized channels (30 days)',
    },
    checksCard: {
      title: 'Feed Health (last 24 h)',
      info: 'Continuous uptime and latency monitoring across all external interfaces.',
      rows: [
        { status: 'success', label: 'Synchronized', count: '312', share: '98.1 %' },
        { status: 'warning', label: 'Delayed (>2s)', count: '5', share: '1.6 %' },
        { status: 'error', label: 'Offline / Failover', count: '1', share: '0.3 %' },
      ],
    },
    pipelineTitle: 'Process: Source Integration in Analytics Hub',
    steps: [
      { id: 'q1', label: 'Connect primary feeds', iconKey: 'database', detail: 'Authenticated API & FIX streams ingest raw data from 64 venues.', throughput: '42,000 events/s' },
      { id: 'q2', label: 'Normalize schema', iconKey: 'checkSquare', detail: 'Unified ISIN, currency, and timezone mapping across providers.', throughput: '100% ISO-aligned' },
      { id: 'q3', label: 'Cross-check sources', iconKey: 'brush', detail: 'Automated reconciliation between primary exchanges and vendors.', throughput: 'Latency < 180 ms' },
      { id: 'q4', label: 'Tag provenance', iconKey: 'layers', detail: 'Every data point receives timestamp, provider ID, and trust tier.', throughput: 'Fully audited' },
      { id: 'q5', label: 'Pass to quality gate', iconKey: 'barChart', detail: 'Handover of normalized series to automated validation checks.', throughput: 'Zero-drop buffer' },
    ],
  },
  datenqualitaet: {
    ...MODULES_DE.datenqualitaet,
    name: 'Data Quality',
    shortDesc:
      'Reliable and consistent data as the foundation for resilient analyses and decisions.',
    bullets: [
      'Automated checks for completeness, consistency, and timeliness',
      'Detection and cleansing of outliers and statistical anomalies',
      'Transparent quality metrics and full audit history',
      'Direct impact on Scoring, Risk, and Evidence ratings',
    ],
    scoreCard: {
      ...MODULES_DE.datenqualitaet.scoreCard,
      title: 'Data Quality Score',
      info: 'Weighted composite score across completeness, consistency, timeliness, and plausibility.',
      primarySubLabel: 'Quality',
      breakdown: [
        { label: 'Completeness', value: 98, color: '#a855f7' },
        { label: 'Consistency', value: 93, color: '#38bdf8' },
        { label: 'Timeliness', value: 96, color: '#c084fc' },
        { label: 'Plausibility', value: 91, color: '#f59e0b' },
      ],
    },
    volumeCard: {
      ...MODULES_DE.datenqualitaet.volumeCard,
      title: 'Data Volume',
      info: 'Validated and cleansed data points in the rolling 30-day window.',
      value: '142.8 M',
      delta: '+6.3 %',
      subtitle: 'Data points (30 days)',
    },
    checksCard: {
      title: 'Quality Checks (last 24 h)',
      info: 'Automated validation rules executed across incoming market and fundamental feeds.',
      rows: [
        { status: 'success', label: 'Passed', count: '1,248,320', share: '98.6 %' },
        { status: 'warning', label: 'Anomalies', count: '16,480', share: '1.3 %' },
        { status: 'error', label: 'Errors', count: '1,260', share: '0.1 %' },
      ],
    },
    pipelineTitle: 'Process: Data Quality in Analytics Hub',
    steps: [
      { id: 'dq1', label: 'Ingest data', iconKey: 'database', detail: 'Incremental ingestion of verified raw feeds with schema versioning.', throughput: '1.26M checks/day' },
      { id: 'dq2', label: 'Verify quality', iconKey: 'checkSquare', detail: 'Rule-based and Z-score anomaly checks for gaps and spikes.', throughput: '480 validation rules' },
      { id: 'dq3', label: 'Clean & standardize', iconKey: 'brush', detail: 'Split adjustments, FX harmonization, and outlier quarantine.', throughput: '99.9% automated' },
      { id: 'dq4', label: 'Rate quality', iconKey: 'layers', detail: 'Modular quality scoring per security and time series.', throughput: '5-min refresh' },
      { id: 'dq5', label: 'Deliver to analytics', iconKey: 'barChart', detail: 'Only quality-cleared datasets enter Scoring & Risk models.', throughput: 'Signed snapshots' },
    ],
  },
  scoring: {
    ...MODULES_DE.scoring,
    name: 'Scoring',
    shortDesc:
      'Multi-dimensional evaluation of growth, profitability, valuation, and momentum on a unified scale.',
    bullets: [
      'Standardized 0–100 factor scores across four fundamental dimensions',
      'Sector-relative peer calibration free of look-ahead bias',
      'Full weight transparency and historical score migration logs',
      'Direct gating linked to minimum data quality thresholds',
    ],
    scoreCard: {
      ...MODULES_DE.scoring.scoreCard,
      title: 'Model Calibration',
      info: 'Current factor discrimination and stability across the walk-forward window.',
      primarySubLabel: 'Confidence',
      breakdown: [
        { label: 'Quality & Margin', value: 92, color: '#3b82f6' },
        { label: 'Growth Momentum', value: 86, color: '#38bdf8' },
        { label: 'Valuation Discipline', value: 84, color: '#a855f7' },
        { label: 'Trend Strength', value: 90, color: '#10b981' },
      ],
    },
    volumeCard: {
      ...MODULES_DE.scoring.volumeCard,
      title: 'Scored Securities',
      info: 'Daily recalculated multi-factor profiles across the global universe.',
      value: '8,420 Assets',
      delta: '+3.8 %',
      subtitle: 'Active scoring profiles (30 days)',
    },
    checksCard: {
      title: 'Scoring Runs (last 24 h)',
      info: 'Distribution of factor recalculations following data clearance.',
      rows: [
        { status: 'success', label: 'Fully scored', count: '8,314', share: '98.7 %' },
        { status: 'warning', label: 'Limited history', count: '92', share: '1.1 %' },
        { status: 'error', label: 'Held (Quality <80%)', count: '14', share: '0.2 %' },
      ],
    },
    pipelineTitle: 'Process: Multi-Factor Scoring in Analytics Hub',
    steps: [
      { id: 'sc1', label: 'Extract factors', iconKey: 'database', detail: 'Compute 34 fundamental, cashflow, and momentum ratios.', throughput: '286,000 metrics' },
      { id: 'sc2', label: 'Normalize sector', iconKey: 'checkSquare', detail: 'Winsorizing and Z-scoring within global GICS peer groups.', throughput: '11 sectors' },
      { id: 'sc3', label: 'Weight scores', iconKey: 'brush', detail: 'Regime-aware aggregation into a transparent composite score.', throughput: '0–100 scale' },
      { id: 'sc4', label: 'Check stability', iconKey: 'layers', detail: 'Turnover control prevents erratic churn caused by noise.', throughput: '94% rank stability' },
      { id: 'sc5', label: 'Feed Risk & Evidence', iconKey: 'barChart', detail: 'Supply factor attribution to Risk and Evidence reporting.', throughput: 'Real-time API' },
    ],
  },
  risiko: {
    ...MODULES_DE.risiko,
    name: 'Risk',
    shortDesc:
      'Transparent quantification of volatility, drawdown scenarios, correlations, and concentration risk.',
    bullets: [
      'Historical & Monte Carlo stress tests across multiple market regimes',
      'Dynamic correlation matrices and sector factor exposures',
      'Value-at-Risk (95% / 99%) and Conditional Tail Loss (CVaR)',
      'Early warning triggers on liquidity or volatility regime shifts',
    ],
    scoreCard: {
      ...MODULES_DE.risiko.scoreCard,
      title: 'Risk Model Accuracy',
      info: 'Calibration accuracy of forecasted volatility and VaR corridors.',
      primarySubLabel: 'Calibrated',
      breakdown: [
        { label: 'Volatility Fit', value: 94, color: '#06b6d4' },
        { label: 'Tail-Risk Coverage', value: 91, color: '#38bdf8' },
        { label: 'Liquidity Model', value: 95, color: '#10b981' },
        { label: 'Stress Validity', value: 89, color: '#f59e0b' },
      ],
    },
    volumeCard: {
      ...MODULES_DE.risiko.volumeCard,
      title: 'Simulated Scenarios',
      info: 'Daily risk and stress-test paths across portfolios and watchlists.',
      value: '24.6 M',
      delta: '+8.4 %',
      subtitle: 'Monte Carlo paths (30 days)',
    },
    checksCard: {
      title: 'Risk Alerts (last 24 h)',
      info: 'Continuous monitoring of drawdown, beta, and liquidity thresholds.',
      rows: [
        { status: 'success', label: 'Within corridor', count: '7,910', share: '93.9 %' },
        { status: 'warning', label: 'Elevated volatility', count: '442', share: '5.3 %' },
        { status: 'error', label: 'Limit breach', count: '68', share: '0.8 %' },
      ],
    },
    pipelineTitle: 'Process: Risk Modeling in Analytics Hub',
    steps: [
      { id: 'ri1', label: 'Load return series', iconKey: 'database', detail: 'Ingest total-return series adjusted for corporate actions.', throughput: '10-year history' },
      { id: 'ri2', label: 'Estimate covariance', iconKey: 'checkSquare', detail: 'Ledoit-Wolf shrinkage for resilient stress correlations.', throughput: '8,420 × 8,420 matrix' },
      { id: 'ri3', label: 'Run stress tests', iconKey: 'alert', detail: 'Simulate historical crises (2008, 2020, 2022) and rate shocks.', throughput: '10,000 paths/asset' },
      { id: 'ri4', label: 'Decompose budget', iconKey: 'layers', detail: 'Attribute total risk across factors, currencies, and regions.', throughput: '<0.1% granularity' },
      { id: 'ri5', label: 'Update Evidence', iconKey: 'barChart', detail: 'Integrate risk metrics into the final decision dossier.', throughput: 'Instant alerts' },
    ],
  },
  evidenz: {
    ...MODULES_DE.evidenz,
    name: 'Evidence',
    shortDesc:
      'Auditable proof chains: every thesis is backed by historical hit rates and confidence intervals.',
    bullets: [
      'Every insight links signal, underlying data, and statistical significance',
      'Out-of-sample validation to eliminate overfitting',
      'Clear pro & counter-arguments for every investment thesis',
      'Exportable decision dossiers for investment committees',
    ],
    scoreCard: {
      ...MODULES_DE.evidenz.scoreCard,
      title: 'Evidence Integrity',
      info: 'Share of active investment signals with statistically robust out-of-sample confirmation.',
      primarySubLabel: 'Verified',
      breakdown: [
        { label: 'Data Coverage', value: 96, color: '#60a5fa' },
        { label: 'Backtest Robustness', value: 89, color: '#a855f7' },
        { label: 'Significance (p<0.05)', value: 92, color: '#10b981' },
        { label: 'Source Diversity', value: 87, color: '#f59e0b' },
      ],
    },
    volumeCard: {
      ...MODULES_DE.evidenz.volumeCard,
      title: 'Validated Hypotheses',
      info: 'Active signals and theses backed by complete evidence chains.',
      value: '18,940',
      delta: '+5.2 %',
      subtitle: 'Validated theses (30 days)',
    },
    checksCard: {
      title: 'Evidence Audits (last 24 h)',
      info: 'Continuous re-evaluation of active theses against incoming market data.',
      rows: [
        { status: 'success', label: 'Confirmed (A/A+)', count: '15,890', share: '83.9 %' },
        { status: 'warning', label: 'Under review', count: '2,540', share: '13.4 %' },
        { status: 'error', label: 'Refuted / Expired', count: '510', share: '2.7 %' },
      ],
    },
    pipelineTitle: 'Process: Evidence Generation in Analytics Hub',
    steps: [
      { id: 'ev1', label: 'Aggregate signals', iconKey: 'database', detail: 'Combine Quality, Scoring, and Risk layer outputs.', throughput: '3 core layers' },
      { id: 'ev2', label: 'Validate backtest', iconKey: 'checkSquare', detail: 'Walk-forward verification across rate and growth cycles.', throughput: '15+ years' },
      { id: 'ev3', label: 'Test counter-cases', iconKey: 'brush', detail: 'Active search for contradicting indicators and regime risks.', throughput: 'Bias control' },
      { id: 'ev4', label: 'Assign grade', iconKey: 'layers', detail: 'Transparent rating from A+ (very strong) to C (speculative).', throughput: 'Reproducible' },
      { id: 'ev5', label: 'Publish dossier', iconKey: 'barChart', detail: 'Structured output for committees and Learning Hub.', throughput: '1-click export' },
    ],
  },
  marktnews: {
    ...MODULES_DE.marktnews,
    name: 'Market News',
    shortDesc:
      'Curated news streams, earnings transcript intelligence, and macro catalysts without clickbait noise.',
    bullets: [
      'Semantic filtering tailored to your portfolio & watchlist holdings',
      'Structured summaries of central bank statements and earnings calls',
      'Direct linkage of every headline to affected sectors and risk metrics',
      'Deduplication and primary-source verification prior to display',
    ],
    scoreCard: {
      ...MODULES_DE.marktnews.scoreCard,
      title: 'Signal Precision',
      info: 'Ratio of price- and fundamental-relevant dispatches to total incoming news flow.',
      primarySubLabel: 'Precision',
      breakdown: [
        { label: 'Primary Sources', value: 95, color: '#f59e0b' },
        { label: 'Entity Mapping', value: 92, color: '#38bdf8' },
        { label: 'Deduplication', value: 97, color: '#10b981' },
        { label: 'Sentiment Fidelity', value: 84, color: '#a855f7' },
      ],
    },
    volumeCard: {
      ...MODULES_DE.marktnews.volumeCard,
      title: 'Processed Dispatches',
      info: 'Curated and contextualized market news events over 30 days.',
      value: '412 K',
      delta: '+11.4 %',
      subtitle: 'Verified articles (30 days)',
    },
    checksCard: {
      title: 'News Filtering (last 24 h)',
      info: 'Incoming news items classified by relevance and source trust.',
      rows: [
        { status: 'success', label: 'Relevant & verified', count: '14,210', share: '71.4 %' },
        { status: 'warning', label: 'Duplicates filtered', count: '5,190', share: '26.1 %' },
        { status: 'error', label: 'Unverified / Dropped', count: '495', share: '2.5 %' },
      ],
    },
    pipelineTitle: 'Process: Market News Curation in Analytics Hub',
    steps: [
      { id: 'mn1', label: 'Ingest dispatches', iconKey: 'news', detail: 'Real-time ingestion from financial wires, filings, and transcripts.', throughput: '19,800 items/day' },
      { id: 'mn2', label: 'Verify sources', iconKey: 'checkSquare', detail: 'Cross-check against regulatory filings and tier-1 wires.', throughput: 'Tier-1 priority' },
      { id: 'mn3', label: 'Map context', iconKey: 'brush', detail: 'Link stories to issuers, supply chains, and macro factors.', throughput: '8,420 assets mapped' },
      { id: 'mn4', label: 'Score relevance', iconKey: 'layers', detail: 'Suppress redundant syndication; elevate fundamental catalysts.', throughput: '-26% noise' },
      { id: 'mn5', label: 'Update feeds & alerts', iconKey: 'barChart', detail: 'Deliver to cockpit and trigger targeted portfolio alerts.', throughput: 'Sub-second push' },
    ],
  },
  lernen: {
    ...MODULES_DE.lernen,
    name: 'Learn',
    shortDesc:
      'Applied learning paths connect live market data directly with analytical, risk, and allocation mastery.',
    bullets: [
      'Interactive case studies powered by current Analytics Hub datasets',
      'Step-by-step explanations of factors, ratios, and drawdown dynamics',
      'Progress tracking, knowledge checks, and certification modules',
      'Seamless switching between analytical tools and guided explanations',
    ],
    scoreCard: {
      ...MODULES_DE.lernen.scoreCard,
      title: 'Curriculum Coverage',
      info: 'Mastery across all core analytical modules inside CAPITAL-AI.',
      primarySubLabel: 'Applied',
      breakdown: [
        { label: 'Data Literacy', value: 92, color: '#eab308' },
        { label: 'Factor Understanding', value: 85, color: '#38bdf8' },
        { label: 'Risk Management', value: 88, color: '#a855f7' },
        { label: 'Case Transfer', value: 80, color: '#10b981' },
      ],
    },
    volumeCard: {
      ...MODULES_DE.lernen.volumeCard,
      title: 'Completed Lessons',
      info: 'Interactive analyses and learning modules completed by users.',
      value: '38,400',
      delta: '+14.2 %',
      subtitle: 'Learning units (30 days)',
    },
    checksCard: {
      title: 'Knowledge Checks (last 24 h)',
      info: 'Results from interactive module quizzes and scenario labs.',
      rows: [
        { status: 'success', label: 'Passed (>80%)', count: '1,840', share: '87.6 %' },
        { status: 'warning', label: 'Review recommended', count: '215', share: '10.2 %' },
        { status: 'error', label: 'Incomplete', count: '46', share: '2.2 %' },
      ],
    },
    pipelineTitle: 'Process: Learning in Analytics Hub',
    steps: [
      { id: 'le1', label: 'Choose concept', iconKey: 'grad', detail: 'Pick modules such as Data Quality, Factor Scoring, or VaR.', throughput: '28 paths' },
      { id: 'le2', label: 'Inspect live data', iconKey: 'checkSquare', detail: 'Apply concepts directly to real market and balance-sheet curves.', throughput: 'Live sandbox' },
      { id: 'le3', label: 'Simulate scenario', iconKey: 'brush', detail: 'Test how altered factor weights and shocks affect portfolios.', throughput: 'Interactive' },
      { id: 'le4', label: 'Verify mastery', iconKey: 'layers', detail: 'Short comprehension checks ensure durable practical transfer.', throughput: 'Instant feedback' },
      { id: 'le5', label: 'Apply in cockpit', iconKey: 'barChart', detail: 'Return to Analytics Hub with saved screening presets.', throughput: '1-click transfer' },
    ],
  },
};

export const INSTRUMENTS: InstrumentRow[] = [
  {
    ticker: 'SAP.DE',
    name: 'SAP SE',
    sector: 'Enterprise Software',
    assetClass: 'Aktien',
    price: '238,40 €',
    change1D: '+1,84 %',
    positive: true,
    dataQuality: 98,
    sourcesCount: 14,
    multiFactorScore: 86,
    riskGrade: 'Niedrig',
    evidenceRating: 'A+',
    summaryDE: 'Starker Cloud-Backlog und überdurchschnittliche Cashflow-Visibilität bei moderatem Beta (0,84).',
    summaryEN: 'Strong cloud backlog and high free-cashflow visibility with moderate market beta (0.84).',
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    sector: 'Semiconductors',
    assetClass: 'Aktien',
    price: '146,90 $',
    change1D: '+2,42 %',
    positive: true,
    dataQuality: 97,
    sourcesCount: 19,
    multiFactorScore: 91,
    riskGrade: 'Erhöht',
    evidenceRating: 'A',
    summaryDE: 'Führendes Wachstums- und Profitabilitäts-Scoring, jedoch erhöhte historische 90T-Volatilität (38 %).',
    summaryEN: 'Top-decile growth & margin score paired with elevated 90-day realized volatility (38%).',
  },
  {
    ticker: 'ALV.DE',
    name: 'Allianz SE',
    sector: 'Insurance & Asset Mgmt',
    assetClass: 'Aktien',
    price: '296,10 €',
    change1D: '+0,62 %',
    positive: true,
    dataQuality: 96,
    sourcesCount: 12,
    multiFactorScore: 82,
    riskGrade: 'Niedrig',
    evidenceRating: 'A',
    summaryDE: 'Stabile Solvency-II-Quote und verlässliche Ausschüttungsqualität im europäischen Kernportfolio.',
    summaryEN: 'Resilient Solvency II ratio and consistent dividend coverage within European core equities.',
  },
  {
    ticker: 'SIE.DE',
    name: 'Siemens AG',
    sector: 'Industrial Automation',
    assetClass: 'Aktien',
    price: '189,75 €',
    change1D: '-0,41 %',
    positive: false,
    dataQuality: 95,
    sourcesCount: 13,
    multiFactorScore: 79,
    riskGrade: 'Moderat',
    evidenceRating: 'B+',
    summaryDE: 'Robuste Digital-Industries-Marge; kurzfristige Zyklik im Auftragseingang durch Makro-Indikatoren abgefedert.',
    summaryEN: 'Solid Digital Industries margin profile; short-term order cyclicality cushioned by grid demand.',
  },
  {
    ticker: 'IWDA',
    name: 'iShares Core MSCI World',
    sector: 'Global Developed Equity',
    assetClass: 'ETF',
    price: '104,28 €',
    change1D: '+0,48 %',
    positive: true,
    dataQuality: 99,
    sourcesCount: 22,
    multiFactorScore: 84,
    riskGrade: 'Niedrig',
    evidenceRating: 'A+',
    summaryDE: 'Breite Streuung über 1.410 Titel; 99 % Datenabdeckung für robuste Kern-Allokation.',
    summaryEN: 'Broad diversification across 1,410 constituents with 99% underlying data completeness.',
  },
  {
    ticker: 'DE10Y',
    name: 'Bundesanleihe 10Y Benchmark',
    sector: 'Euro Sovereign Rates',
    assetClass: 'Anleihen',
    price: '2,34 %',
    change1D: '-0,04 %',
    positive: true,
    dataQuality: 99,
    sourcesCount: 11,
    multiFactorScore: 74,
    riskGrade: 'Niedrig',
    evidenceRating: 'A',
    summaryDE: 'Zentraler Stabilitätsanker in Multi-Asset-Stresstests mit negativer Aktien-Korrelation (-0,28).',
    summaryEN: 'Core ballast in multi-asset stress tests with negative equity correlation (-0.28).',
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'lm-1',
    category: 'Datenqualität',
    duration: '12 Min.',
    level: 'Grundlagen',
    titleDE: 'Warum Ausreißer und Survivorship-Bias jedes Backtest-Modell verzerren',
    titleEN: 'Why Outliers and Survivorship Bias Distort Backtests',
    descDE: 'Lernen Sie, wie unbereinigte Split-Events und fehlende Delistings Renditen künstlich aufblähen – und wie CAPITAL-AI sie filtert.',
    descEN: 'Understand how unadjusted splits and missing delistings inflate returns—and how CAPITAL-AI filters them.',
    progress: 100,
  },
  {
    id: 'lm-2',
    category: 'Scoring',
    duration: '18 Min.',
    level: 'Fortgeschritten',
    titleDE: 'Multi-Faktor-Scoring: Qualität, Wachstum und Bewertung richtig gewichten',
    titleEN: 'Multi-Factor Scoring: Balancing Quality, Growth & Valuation',
    descDE: 'Vergleichen Sie sektorrelative Z-Scores anhand realer DAX- und S&P-500-Unternehmen direkt in der Praxis.',
    descEN: 'Compare sector-relative Z-scores across DAX and S&P 500 leaders in an interactive lab.',
    progress: 65,
  },
  {
    id: 'lm-3',
    category: 'Risiko',
    duration: '15 Min.',
    level: 'Praxis',
    titleDE: 'Drawdowns, Value-at-Risk & Korrelationsbrüche in Stressphasen',
    titleEN: 'Drawdowns, Value-at-Risk & Correlation Breakdowns',
    descDE: 'Warum klassische Standardabweichung Tail-Risiken unterschätzt und wie Monte-Carlo-Stresstests Klarheit schaffen.',
    descEN: 'Why standard deviation understates tail risk and how Monte Carlo stress tests improve resilience.',
    progress: 30,
  },
  {
    id: 'lm-4',
    category: 'Evidenz',
    duration: '14 Min.',
    level: 'Experte',
    titleDE: 'Von der Datenbasis zur Investment-These: Evidenz-Dossiers aufbauen',
    titleEN: 'From Data Foundations to Investment Conviction: Evidence Dossiers',
    descDE: 'Strukturieren Sie Pro- und Contra-Faktoren sauber, um emotionale Fehlentscheidungen systematisch auszuschließen.',
    descEN: 'Structure pro and counter-factors systematically to eliminate emotional decision bias.',
    progress: 0,
  },
];
