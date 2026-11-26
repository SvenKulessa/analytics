import React, { useMemo, useState } from 'react';
import { ArrowUpDown, CheckCircle2, Search, ShieldCheck } from 'lucide-react';
import {
  INSTRUMENTS,
  InstrumentRow,
  Language,
  UI_COPY,
} from '../data/analyticsData';

interface LiveExplorerSectionProps {
  lang: Language;
}

type AssetFilter = 'ALL' | 'Aktien' | 'ETF' | 'Anleihen';
type SortField = 'multiFactorScore' | 'dataQuality' | 'sourcesCount';

export const LiveExplorerSection: React.FC<LiveExplorerSectionProps> = ({ lang }) => {
  const copy = UI_COPY[lang].explorer;
  const [query, setQuery] = useState('');
  const [assetFilter, setAssetFilter] = useState<AssetFilter>('ALL');
  const [sortField, setSortField] = useState<SortField>('multiFactorScore');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentRow>(INSTRUMENTS[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INSTRUMENTS.filter((item) => {
      const matchesClass = assetFilter === 'ALL' || item.assetClass === assetFilter;
      const matchesQuery =
        !q ||
        item.ticker.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.sector.toLowerCase().includes(q);
      return matchesClass && matchesQuery;
    }).sort((a, b) => {
      const diff = a[sortField] - b[sortField];
      return sortAsc ? diff : -diff;
    });
  }, [query, assetFilter, sortField, sortAsc]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filterButtons: { id: AssetFilter; labelDE: string; labelEN: string }[] = [
    { id: 'ALL', labelDE: 'Alle Klassen', labelEN: 'All Classes' },
    { id: 'Aktien', labelDE: 'Aktien', labelEN: 'Equities' },
    { id: 'ETF', labelDE: 'ETF', labelEN: 'ETF' },
    { id: 'Anleihen', labelDE: 'Anleihen', labelEN: 'Bonds' },
  ];

  const translateRisk = (risk: InstrumentRow['riskGrade']) => {
    if (lang === 'DE') return risk;
    if (risk === 'Niedrig') return 'Low';
    if (risk === 'Moderat') return 'Moderate';
    return 'Elevated';
  };

  return (
    <section
      id="live-explorer"
      className="mx-auto mt-10 max-w-[1440px] px-5 pb-14 lg:px-10"
    >
      <div className="hub-panel rounded-2xl border border-slate-700/50 p-5 lg:p-7">
        {/* Header & Filter Toolbar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-[22px] font-bold tracking-tight text-white">
              {copy.title}
            </h2>
            <p className="mt-1 max-w-2xl text-[14px] text-slate-400">{copy.subtitle}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="w-full sm:w-60 rounded-xl border border-slate-700/70 bg-[#080f21]/90 py-2 pl-9 pr-3 text-[13px] text-slate-100 placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-[#070d1d] p-1">
              {filterButtons.map((btn) => {
                const active = assetFilter === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => setAssetFilter(btn.id)}
                    className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-violet-600/35 text-white border border-violet-400/50'
                        : 'text-slate-400 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    {lang === 'DE' ? btn.labelDE : btn.labelEN}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Table + Selected Evidence Dossier */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Screening Table */}
          <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-slate-800/90 bg-[#070d1d]/75">
            <table className="w-full min-w-[640px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-slate-800/90 text-[12px] font-medium text-slate-400">
                  <th className="px-4 py-3">{copy.columns.instrument}</th>
                  <th className="px-3 py-3 text-right">{copy.columns.change}</th>
                  <th className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleSort('dataQuality')}
                      className="inline-flex items-center gap-1 hover:text-white cursor-pointer"
                    >
                      <span>{copy.columns.quality}</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleSort('sourcesCount')}
                      className="inline-flex items-center gap-1 hover:text-white cursor-pointer"
                    >
                      <span>{copy.columns.sources}</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleSort('multiFactorScore')}
                      className="inline-flex items-center gap-1 hover:text-white cursor-pointer"
                    >
                      <span>{copy.columns.score}</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-3 py-3">{copy.columns.risk}</th>
                  <th className="px-4 py-3 text-right">{copy.columns.evidence}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      {lang === 'DE'
                        ? 'Keine Instrumente für diesen Filter gefunden.'
                        : 'No instruments match the current filter.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const isSelected = selectedInstrument.ticker === item.ticker;
                    return (
                      <tr
                        key={item.ticker}
                        onClick={() => setSelectedInstrument(item)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-violet-600/15'
                            : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono-tabular text-[12.5px] font-semibold text-white">
                              {item.ticker}
                            </span>
                            <span className="text-slate-300">{item.name}</span>
                          </div>
                          <div className="text-[11.5px] text-slate-500">
                            {item.sector} · {item.price}
                          </div>
                        </td>
                        <td
                          className={`px-3 py-3 text-right font-mono-tabular font-medium ${
                            item.positive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {item.change1D}
                        </td>
                        <td className="px-3 py-3 text-right font-mono-tabular text-slate-100">
                          {item.dataQuality} %
                        </td>
                        <td className="px-3 py-3 text-right font-mono-tabular text-slate-300">
                          {item.sourcesCount}
                        </td>
                        <td className="px-3 py-3 text-right font-mono-tabular font-semibold text-sky-300">
                          {item.multiFactorScore}/100
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`text-[12.5px] font-medium ${
                              item.riskGrade === 'Niedrig'
                                ? 'text-emerald-300'
                                : item.riskGrade === 'Moderat'
                                ? 'text-cyan-300'
                                : 'text-amber-300'
                            }`}
                          >
                            {translateRisk(item.riskGrade)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-mono-tabular font-bold text-violet-300">
                          {item.evidenceRating}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Right: Selected Instrument Evidence Dossier */}
          <div className="lg:col-span-4 hub-subcard rounded-xl border border-slate-700/60 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-mono-tabular text-[12px] text-violet-300">
                    {selectedInstrument.ticker} · {selectedInstrument.assetClass}
                  </div>
                  <h3 className="mt-0.5 font-display text-[20px] font-bold text-white">
                    {selectedInstrument.name}
                  </h3>
                  <div className="text-[12.5px] text-slate-400">{selectedInstrument.sector}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono-tabular text-[18px] font-bold text-white">
                    {selectedInstrument.price}
                  </div>
                  <div
                    className={`font-mono-tabular text-[12.5px] font-semibold ${
                      selectedInstrument.positive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {selectedInstrument.change1D}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2.5 border-y border-slate-800/80 py-3.5">
                <div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'DE' ? 'Datenqualität' : 'Data Quality'}
                  </div>
                  <div className="mt-0.5 font-mono-tabular text-[16px] font-bold text-white">
                    {selectedInstrument.dataQuality} %
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'DE' ? 'Faktor-Score' : 'Factor Score'}
                  </div>
                  <div className="mt-0.5 font-mono-tabular text-[16px] font-bold text-sky-300">
                    {selectedInstrument.multiFactorScore}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'DE' ? 'Evidenzgrad' : 'Evidence'}
                  </div>
                  <div className="mt-0.5 font-mono-tabular text-[16px] font-bold text-violet-300">
                    {selectedInstrument.evidenceRating}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[13.5px] leading-relaxed text-slate-300">
                {lang === 'DE' ? selectedInstrument.summaryDE : selectedInstrument.summaryEN}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-800/80 pt-3.5 text-[12px] text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {selectedInstrument.sourcesCount}{' '}
                {lang === 'DE' ? 'Primärquellen synchron' : 'primary sources synced'}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
                {lang === 'DE' ? 'Auditierbar' : 'Auditable'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
