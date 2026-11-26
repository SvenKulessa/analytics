/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar, ActiveModalType } from './components/Navbar';
import { OrbitalGlobeHero } from './components/OrbitalGlobeHero';
import { ProcessSelector } from './components/ProcessSelector';
import { ModuleDetailPanel } from './components/ModuleDetailPanel';
import { LiveExplorerSection } from './components/LiveExplorerSection';
import { HubModals } from './components/HubModals';
import { Language, ModuleId } from './data/analyticsData';

export default function App() {
  const [lang, setLang] = useState<Language>('DE');
  const [activeModule, setActiveModule] = useState<ModuleId>('datenqualitaet');
  const [hoveredModule, setHoveredModule] = useState<ModuleId | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'DE' ? 'EN' : 'DE'));
  };

  const handleSelectModule = (id: ModuleId) => {
    setActiveModule(id);
  };

  const handleScrollToExplorer = () => {
    const el = document.getElementById('live-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="cosmic-canvas relative min-h-screen overflow-x-hidden text-slate-100">
      {/* Subtle atmospheric starfield */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-45"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.55), transparent), radial-gradient(1px 1px at 34% 62%, rgba(148,163,184,0.45), transparent), radial-gradient(1.5px 1.5px at 78% 14%, rgba(224,231,255,0.6), transparent), radial-gradient(1px 1px at 88% 72%, rgba(125,211,252,0.5), transparent), radial-gradient(1px 1px at 54% 28%, rgba(255,255,255,0.4), transparent)',
        }}
      />

      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onSelectModule={handleSelectModule}
        onOpenModal={setActiveModal}
        onScrollToExplorer={handleScrollToExplorer}
      />

      <main className="relative z-10">
        <OrbitalGlobeHero
          lang={lang}
          activeModule={activeModule}
          hoveredModule={hoveredModule}
          onHoverModule={setHoveredModule}
          onSelectModule={handleSelectModule}
          onOpenLearning={() => setActiveModal('learning')}
          onOpenAnalytics={handleScrollToExplorer}
        />

        <ProcessSelector
          lang={lang}
          activeModule={activeModule}
          hoveredModule={hoveredModule}
          onHoverModule={setHoveredModule}
          onSelectModule={handleSelectModule}
        />

        <ModuleDetailPanel lang={lang} activeModule={activeModule} />

        <LiveExplorerSection lang={lang} />
      </main>

      <footer className="relative z-10 border-t border-slate-800/70 bg-[#03060f]/85">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-[13px] text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <span className="font-display font-semibold tracking-[0.14em] text-slate-200">
              CAPITAL-AI
            </span>
            <span className="mx-2 text-slate-600">·</span>
            <span>capital-ai.online/analytics</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveModal('learning')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Learning Hub
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('pricing')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              {lang === 'DE' ? 'Preise' : 'Pricing'}
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('enterprise')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              {lang === 'DE' ? 'Für Unternehmen' : 'Enterprise'}
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('license')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              {lang === 'DE' ? 'Lizenz & Daten' : 'License & Data'}
            </button>
          </div>
        </div>
      </footer>

      <HubModals
        lang={lang}
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onJumpToModule={(id) => {
          setActiveModule(id);
          const el = document.getElementById('analytics-prozess');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
    </div>
  );
}
