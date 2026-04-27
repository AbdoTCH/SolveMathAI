/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MathSolver from './components/MathSolver';

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-[#F1F5F9] font-sans overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">Σ</div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight italic">SolveMath AI</h1>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="px-3 py-1.5 text-xs font-semibold rounded bg-indigo-50 text-indigo-700 border border-indigo-100">Algèbre</button>
          <button className="px-3 py-1.5 text-xs font-semibold rounded hover:bg-slate-50 text-slate-600 transition-colors">Géométrie</button>
          <button className="px-3 py-1.5 text-xs font-semibold rounded hover:bg-slate-50 text-slate-600 transition-colors">Analyse</button>
          <button className="px-3 py-1.5 text-xs font-semibold rounded hover:bg-slate-50 text-slate-600 transition-colors">Statistiques</button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-400">Gemini 3.1 Pro Actif</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </nav>

      <MathSolver />

      {/* Bottom Status Bar */}
      <footer className="px-6 py-2 bg-white border-t border-slate-200 flex justify-between items-center shrink-0">
        <div className="flex gap-6 text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
          <span>Mode: Étape par Étape</span>
          <span>Format: Standard Métrique</span>
          <span>Précision: 4 Décimales</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[10px] font-bold text-slate-500 uppercase hover:text-indigo-600 transition-colors">Copier</button>
          <button className="text-[10px] font-bold text-slate-500 uppercase hover:text-indigo-600 transition-colors">Export PDF</button>
        </div>
      </footer>
    </div>
  );
}
