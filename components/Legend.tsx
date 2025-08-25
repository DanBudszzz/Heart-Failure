import React from 'react';
import type { Category } from '../types';

interface LegendProps {
  categories: Category[];
}

const Legend: React.FC<LegendProps> = ({ categories }) => {
  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-700 mb-3 text-center">Legend</h3>
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
        {categories.map(category => (
          <div key={category.id} className="flex items-center" aria-label={`Legend item: ${category.name}`}>
            <span className={`w-4 h-4 rounded-md mr-2 shrink-0 ${category.color} ${category.color === 'bg-white' ? 'border border-slate-300' : ''}`}></span>
            <span className="text-sm text-slate-600">{category.name}</span>
          </div>
        ))}
         <div className="flex items-center" aria-label="Legend item: Feedback or Effect">
            <svg width="24" height="16" viewBox="0 0 24 16" className="mr-2 shrink-0">
                <path d="M 2 8 L 22 8" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" fill="none" />
            </svg>
            <span className="text-sm text-slate-600">Feedback / Effect</span>
          </div>
      </div>
    </div>
  );
};

export default Legend;