import React from 'react';
import type { DiagramNode, DiagramConnection, Category } from '../types';

interface HeartFailureDiagramProps {
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  categories: Category[];
  selectedNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
}

const ArrowheadMarker: React.FC<{ id: string; color: string }> = ({ id, color }) => (
  <marker
    id={id}
    viewBox="0 0 10 10"
    refX="8"
    refY="5"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse"
  >
    <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
  </marker>
);

const DiagramConnectionLine: React.FC<{
  fromNode: DiagramNode;
  toNode: DiagramNode;
  connection: DiagramConnection;
}> = ({ fromNode, toNode, connection }) => {
  const { lineStyle = 'solid', type = 'primary' } = connection;
  const isDashed = lineStyle === 'dashed';
  const isFeedback = type === 'feedback';

  let strokeColor = '#64748b'; // Slate-500 for primary
  let markerId = 'arrowhead-primary';
  if (isDashed) {
    strokeColor = '#10b981'; // Emerald-500 for counter-regulatory
    markerId = 'arrowhead-counter';
  }
  if (isFeedback) {
    strokeColor = '#f97316'; // Orange-500 for feedback
    markerId = 'arrowhead-feedback';
  }

  // Calculate connection points on node edges
  const dx = (toNode.x + toNode.width / 2) - (fromNode.x + fromNode.width / 2);
  const dy = (toNode.y + toNode.height / 2) - (fromNode.y + fromNode.height / 2);
  
  let x1, y1, x2, y2;

  if (Math.abs(dx) > Math.abs(dy)) { // More horizontal
    x1 = fromNode.x + (dx > 0 ? fromNode.width : 0);
    y1 = fromNode.y + fromNode.height / 2;
    x2 = toNode.x + (dx < 0 ? toNode.width : 0);
    y2 = toNode.y + toNode.height / 2;
  } else { // More vertical
    x1 = fromNode.x + fromNode.width / 2;
    y1 = fromNode.y + (dy > 0 ? fromNode.height : 0);
    x2 = toNode.x + toNode.width / 2;
    y2 = toNode.y + (dy < 0 ? toNode.height : 0);
  }

  // Generate a curved path
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const controlX = midX + (y2 - y1) * 0.25;
  const controlY = midY - (x2 - x1) * 0.25;
  
  const pathData = `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;

  return (
    <path
      d={pathData}
      stroke={strokeColor}
      strokeWidth="2"
      fill="none"
      markerEnd={`url(#${markerId})`}
      strokeDasharray={isDashed ? "8 4" : "none"}
    />
  );
};

const DiagramNodeComponent: React.FC<{
  node: DiagramNode;
  category: Category;
  isSelected: boolean;
  onClick: (id: string) => void;
}> = ({ node, category, isSelected, onClick }) => {
  // Constants for precise text layout
  const LABEL_LINE_HEIGHT = 18;
  const EXAMPLE_LINE_HEIGHT = 15;
  const SEPARATOR_HEIGHT = 18; // Includes spacing for the '(e.g.)' line

  const totalLabelLines = node.label.length;
  const totalExampleLines = node.examples?.length ?? 0;
  const hasExamples = totalExampleLines > 0;

  // Calculate the total height of the text content block
  const labelBlockHeight = totalLabelLines * LABEL_LINE_HEIGHT;
  const examplesBlockHeight = hasExamples ? SEPARATOR_HEIGHT + totalExampleLines * EXAMPLE_LINE_HEIGHT : 0;
  const totalContentHeight = labelBlockHeight + examplesBlockHeight;
  
  // Calculate the top y-coordinate to vertically center the entire content block
  const contentTopY = (node.height - totalContentHeight) / 2;

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={() => onClick(node.id)}
      className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
      aria-label={`Diagram node for ${node.label.join(' ')}`}
    >
      <rect
        width={node.width}
        height={node.height}
        rx="12"
        ry="12"
        className={`${category.color.startsWith('bg-') ? `fill-${category.color.substring(3)}` : 'fill-gray-500'} stroke-2 ${isSelected ? 'stroke-cyan-400 ring-4 ring-cyan-200' : 'stroke-transparent'}`}
        style={{ filter: isSelected ? 'drop-shadow(0 4px 8px rgba(0, 172, 193, 0.6))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      />
      <text
        x={node.width / 2}
        textAnchor="middle"
        className="font-semibold select-none text-sm"
        fill="white"
        pointerEvents="none"
      >
        {/* Render main label lines using calculated absolute Y positions */}
        {node.label.map((line, index) => {
          // Add a small offset to account for text baseline, centering it within its line-height
          const yPos = contentTopY + (index * LABEL_LINE_HEIGHT) + (LABEL_LINE_HEIGHT * 0.75);
          return (
            <tspan key={`label-${index}`} x={node.width / 2} y={yPos}>
              {line}
            </tspan>
          );
        })}

        {/* Render separator and example lines if they exist */}
        {hasExamples && (
          <>
            <tspan
              key="separator"
              x={node.width / 2}
              y={contentTopY + labelBlockHeight + (SEPARATOR_HEIGHT * 0.5)}
              fontSize="10px"
              fillOpacity="0.7"
            >
              (e.g.)
            </tspan>
            {node.examples?.map((line, index) => {
               const yPos = contentTopY + labelBlockHeight + SEPARATOR_HEIGHT + (index * EXAMPLE_LINE_HEIGHT) + (EXAMPLE_LINE_HEIGHT * 0.75);
               return (
                 <tspan
                   key={`ex-${index}`}
                   x={node.width / 2}
                   y={yPos}
                   fontSize="11px"
                   fillOpacity="0.9"
                 >
                  {line}
                </tspan>
               );
            })}
          </>
        )}
      </text>
    </g>
  );
};


const HeartFailureDiagram: React.FC<HeartFailureDiagramProps> = ({ nodes, connections, categories, selectedNodeId, onNodeClick }) => {
  const categoryMap = new Map(categories.map(c => [c.id, c]));

  return (
    <svg width="100%" height="100%" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet">
      <defs>
        <ArrowheadMarker id="arrowhead-primary" color="#64748b" />
        <ArrowheadMarker id="arrowhead-counter" color="#10b981" />
        <ArrowheadMarker id="arrowhead-feedback" color="#f97316" />
      </defs>
      
      <g>
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;
          return <DiagramConnectionLine key={index} fromNode={fromNode} toNode={toNode} connection={conn} />;
        })}
      </g>
      
      <g>
        {nodes.map(node => {
          const category = categoryMap.get(node.category);
          if (!category) return null;
          return (
            <DiagramNodeComponent
              key={node.id}
              node={node}
              category={category}
              isSelected={node.id === selectedNodeId}
              onClick={onNodeClick}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default HeartFailureDiagram;