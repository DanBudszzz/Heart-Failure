
import React, { useState, useMemo } from 'react';
import HeartFailureDiagram from './components/HeartFailureDiagram';
import InfoPanel from './components/InfoPanel';
import Legend from './components/Legend';
import { DIAGRAM_NODES, DIAGRAM_CONNECTIONS, CATEGORIES } from './components/constants';
import type { DiagramNode } from './types';

const App: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('initial-injury');

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const selectedNode = useMemo((): DiagramNode | undefined => {
    return DIAGRAM_NODES.find(node => node.id === selectedNodeId);
  }, [selectedNodeId]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 lg:p-6">
      <div className="container mx-auto max-w-full">
        <header className="mb-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">Pathophysiology of Heart Failure</h1>
          <p className="text-lg text-slate-600 mt-2">A detailed, interactive guide to the mechanisms and treatments.</p>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Interactive Pathway</h2>
            <div className="w-full h-[800px] lg:h-[1000px]">
              <HeartFailureDiagram 
                nodes={DIAGRAM_NODES}
                connections={DIAGRAM_CONNECTIONS}
                categories={CATEGORIES}
                selectedNodeId={selectedNodeId}
                onNodeClick={handleNodeClick}
              />
            </div>
            <div className="mt-4">
              <Legend categories={CATEGORIES} />
            </div>
          </div>

          <div className="xl:col-span-1 bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-slate-200 h-fit xl:sticky xl:top-6">
            <InfoPanel node={selectedNode} />
          </div>
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>This diagram is a detailed representation for educational purposes. Clinical decision-making requires consultation with qualified healthcare professionals.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;