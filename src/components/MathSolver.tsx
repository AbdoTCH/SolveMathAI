import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Send, CheckCircle2, ListFilter, PlayCircle, RotateCcw, AlertCircle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { solveMathProblem, MathSolution } from '../services/gemini';

const StepCard = ({ number, title, content, isDark = false, bgClass = "bg-slate-50", delay }: { number: string, title: string, content: string, isDark?: boolean, bgClass?: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className={`${isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-800 border-slate-200'} rounded-xl border p-5 shadow-sm flex flex-col h-full`}
  >
    <div className="flex items-center gap-2 mb-3">
      <span className={`w-6 h-6 flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-slate-100'} rounded-full text-[10px] font-bold`}>
        {number}
      </span>
      <h3 className={`text-sm font-bold uppercase italic ${isDark ? 'text-white' : 'text-slate-800'}`}>
        {title}
      </h3>
    </div>
    <div className={`flex-1 rounded-lg border p-4 overflow-y-auto custom-scrollbar ${isDark ? 'bg-white/5 border-white/10 text-slate-300' : `${bgClass} border-slate-100 text-slate-700`}`}>
      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-invert:text-slate-300">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
    {isDark && (
      <div className="mt-3 flex items-center gap-2 p-2 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
        <CheckCircle2 size={14} />
        <span className="text-[10px] font-bold uppercase">Solution Validée par l'IA</span>
      </div>
    )}
  </motion.div>
);

export default function MathSolver() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState<MathSolution | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock history for density
  const history = [
    { title: "Équation linéaire: 3x + 5 = 20", type: "algebra" },
    { title: "Aire d'un cercle: r=7.5cm", type: "geometry" },
    { title: "Dérivée: f(x) = sin(x^2)", type: "analysis" }
  ];

  const handleSolve = async () => {
    if (!problem.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await solveMathProblem(problem);
      setSolution(result);
    } catch (err) {
      setError("Erreur de résolution. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProblem('');
    setSolution(null);
    setError(null);
  };

  return (
    <main className="flex flex-1 gap-4 p-4 overflow-hidden h-full">
      {/* Left Input Panel */}
      <section className="w-80 lg:w-96 flex flex-col gap-4 shrink-0 h-full">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col h-3/5 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Problème Mathématique</h2>
            <span className="text-[10px] text-indigo-500 font-bold uppercase">Prêt pour LaTeX</span>
          </div>
          
          <textarea
            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all placeholder:text-slate-400"
            placeholder="Entrez votre problème ici... ex: 'Un champ rectangulaire a un périmètre de 40m...'"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSolve}
              disabled={loading || !problem.trim()}
              className="flex-1 bg-slate-900 text-white p-3 rounded-lg font-bold text-sm hover:bg-indigo-600 disabled:bg-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <PlayCircle size={16} />}
              Générer la Solution
            </button>
            {(solution || problem) && (
              <button 
                onClick={handleReset}
                className="p-3 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-all cursor-pointer"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 p-5 flex-1 shadow-sm overflow-hidden flex flex-col"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Historique</h2>
          <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            {history.map((item, i) => (
              <div key={i} className={`p-3 text-[11px] border-l-2 rounded bg-opacity-50 transition-colors cursor-pointer ${i === 0 ? 'border-indigo-500 bg-indigo-50 text-slate-700' : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-600'}`}>
                {item.title}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Right Solution Panel */}
      <section className="flex-1 relative h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {!solution && !loading ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center flex-col text-slate-300"
            >
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center mb-4">
                <Calculator size={40} />
              </div>
              <p className="text-sm font-medium uppercase tracking-widest italic outline-none">Attente d'un nouveau problème</p>
            </motion.div>
          ) : solution ? (
            <motion.div 
              key="solution"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-4 pb-2 pr-1 overflow-y-auto md:overflow-hidden"
            >
              <StepCard 
                number="01"
                title="Choix de l'inconnue"
                content={solution.unknowns}
                delay={0.1}
              />
              <StepCard 
                number="02"
                title="Mise en système"
                content={solution.equations}
                bgClass="bg-indigo-50"
                delay={0.2}
              />
              <StepCard 
                number="03"
                title="Résolution"
                content={solution.resolution}
                delay={0.3}
              />
              <StepCard 
                number="04"
                title="Vérification"
                content={solution.verification + "\n\n---\n\n" + solution.conclusion}
                isDark={true}
                delay={0.4}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="loading"
              className="h-full flex items-center justify-center flex-col text-indigo-500"
            >
              <Loader2 className="animate-spin mb-4" size={48} />
              <p className="text-sm font-bold uppercase tracking-widest animate-pulse">Calcul des étapes en cours...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <AlertCircle size={14} />
            {error}
          </motion.div>
        )}
      </section>
    </main>
  );
}
