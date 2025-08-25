
import React, { useState, useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import HeartFailureDiagram from './components/HeartFailureDiagram';
import InfoPanel from './components/InfoPanel';
import Legend from './components/Legend';
import { DIAGRAM_NODES, DIAGRAM_CONNECTIONS, CATEGORIES } from './components/constants';
import type { DiagramNode } from './types';

const App: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('predisposing-factors');
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAreaRef = useRef<HTMLDivElement>(null);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const selectedNode = useMemo((): DiagramNode | undefined => {
    return DIAGRAM_NODES.find(node => node.id === selectedNodeId);
  }, [selectedNodeId]);

  const handleDownload = async () => {
    const downloadAreaEl = downloadAreaRef.current;
    if (!downloadAreaEl || isDownloading) return;

    setIsDownloading(true);
    const originalSelectedId = selectedNodeId;
    
    // Temporarily deselect the node to remove the highlight for the screenshot
    setSelectedNodeId(null);
    
    // Allow a brief moment for React to re-render the component without the selection
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(downloadAreaEl, {
        scale: 2, // Higher resolution for crisp text and lines
        useCORS: true,
        backgroundColor: '#ffffff', // The diagram area has a white background
      });

      // Add padding around the captured canvas
      const PADDING = 40;
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = canvas.width + PADDING * 2;
      finalCanvas.height = canvas.height + PADDING * 2;
      const ctx = finalCanvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context for download image.');
      }

      // The overall background of the final image.
      ctx.fillStyle = '#f1f5f9'; // slate-100, matches the page body
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

      // Draw the captured content onto the slate background, creating a padded effect.
      ctx.drawImage(canvas, PADDING, PADDING, canvas.width, canvas.height);

      const link = document.createElement('a');
      link.download = 'heart-failure-pathophysiology.png';
      link.href = finalCanvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error generating image for download:', error);
      alert('An error occurred while generating the image.');
    } finally {
      // Restore the original selection and reset the download state
      setSelectedNodeId(originalSelectedId);
      setIsDownloading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 lg:p-6">
      <div className="container mx-auto max-w-full">
        <header className="mb-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">Heart Failure Pathophysiology</h1>
          <p className="text-lg text-slate-600 mt-2">An interactive visual guide to the disease process.</p>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-slate-700">Interactive Pathway</h2>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center justify-center px-4 py-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 text-white font-semibold text-sm rounded-lg shadow transition-colors duration-200"
                aria-label="Download diagram as image"
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Diagram
                  </>
                )}
              </button>
            </div>
            <div ref={downloadAreaRef}>
                <div className="w-full h-[2200px] lg:h-[2200px]">
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
          </div>

          <div className="xl:col-span-1 bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-slate-200 h-fit xl:sticky xl:top-6">
            <InfoPanel node={selectedNode} />
          </div>
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>This diagram is a representation for educational purposes. Clinical decision-making requires consultation with qualified healthcare professionals.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
