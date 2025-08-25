import React from 'react';
import type { DiagramNode } from '../types';

const InfoPanel: React.FC<{ node?: DiagramNode }> = ({ node }) => {
  if (!node) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-50 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-slate-700">Select a Step</h3>
        <p className="text-slate-500 mt-2">Click on any element in the diagram to view a detailed explanation of its role in the pathway.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">{node.label[0]}</h2>
        
        <div className="prose prose-slate max-w-none mb-6 whitespace-pre-line">
            <p>{node.explanation}</p>
        </div>
        
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