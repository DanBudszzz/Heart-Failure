
import React from 'react';
import type { DiagramNode, Intervention } from '../types';

const InterventionCard: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <h4 className="font-semibold text-slate-700">{title}</h4>
        <p className="text-slate-600 text-sm mt-1 prose prose-sm max-w-none">{description}</p>
    </div>
);

const InfoPanel: React.FC<{ node?: DiagramNode }> = ({ node }) => {
  if (!node) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-50 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-slate-700">Select a Step</h3>
        <p className="text-slate-500 mt-2">Click on any element in the diagram to view a detailed explanation and related treatment strategies.</p>
      </div>
    );
  }

  const hasPharmacological = node.interventions.pharmacological.length > 0;
  const hasNonPharmacological = node.interventions.nonPharmacological.length > 0;

  return (
    <div className="flex flex-col h-full animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">{node.label.join(' ')}</h2>
        
        <div className="prose prose-slate max-w-none mb-6">
            <p>{node.explanation}</p>
        </div>

        {(hasPharmacological || hasNonPharmacological) && (
            <div className="space-y-6">
                {hasPharmacological && (
                    <div>
                        <h3 className="text-lg font-semibold text-cyan-700 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" />
                                <path fillRule="evenodd" d="M3.5 8a.5.5 0 01.5-.5h12a.5.5 0 010 1H4a.5.5 0 01-.5-.5zM3 11a.5.5 0 01.5-.5h13a.5.5 0 010 1H3.5a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                            </svg>
                            Pharmacological Interventions
                        </h3>
                        <div className="space-y-3">
                            {node.interventions.pharmacological.map((item, index) => (
                                <InterventionCard key={`pharm-${index}`} {...item} />
                            ))}
                        </div>
                    </div>
                )}

                {hasNonPharmacological && (
                     <div>
                        <h3 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            Non-Pharmacological & Lifestyle
                        </h3>
                        <div className="space-y-3">
                            {node.interventions.nonPharmacological.map((item, index) => (
                                <InterventionCard key={`nonpharm-${index}`} {...item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}
        
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default InfoPanel;
