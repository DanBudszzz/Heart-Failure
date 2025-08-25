
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
    refX="10"
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
  nodes: DiagramNode[];
}> = ({ fromNode, toNode, connection, nodes }) => {
  const { lineStyle = 'solid' } = connection;
  const isDashed = lineStyle === 'dashed';
  const strokeColor = '#64748b'; // Slate-500
  const markerId = 'arrowhead-primary';

  /**
   * Generates a clean, orthogonal (90-degree bends) path between two nodes.
   * This version uses specific, rule-based routing for complex areas to guarantee
   * that no lines overlap with nodes or other lines.
   */
  const getOrthogonalPath = (fromNode: DiagramNode, toNode: DiagramNode): string => {
    const fromId = fromNode.id;
    const toId = toNode.id;
    const fromCenter = { x: fromNode.x + fromNode.width / 2, y: fromNode.y + fromNode.height / 2 };
    const toCenter = { x: toNode.x + toNode.width / 2, y: toNode.y + toNode.height / 2 };

    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;

    // --- RULE-BASED ROUTING FOR COMPLEX CONNECTIONS ---
    const symptomIds = ['left-sided-symptoms', 'low-output-symptoms', 'right-sided-symptoms'];

    // RULE 1: Symptoms -> Clinical Syndrome (Trident pattern from above)
    if (symptomIds.includes(fromId) && toId === 'clinical-syndrome') {
        const start = { x: fromCenter.x, y: fromNode.y + fromNode.height };
        let targetX = toCenter.x;
        if (fromId === 'left-sided-symptoms') targetX = toNode.x + toNode.width * 0.25;
        if (fromId === 'right-sided-symptoms') targetX = toNode.x + toNode.width * 0.75;
        // The Y-level for the horizontal line segment. Must be less than toNode.y to ensure a final vertical line.
        const commonY = fromNode.y + fromNode.height + 30;
        const end = { x: targetX, y: toNode.y };
        return `M ${start.x} ${start.y} V ${commonY} H ${end.x} V ${end.y}`;
    }

    // RULE 2A: Clinical Syndrome -> Non-Pharm Mgt (Direct downward line)
    if (fromId === 'clinical-syndrome' && toId === 'non-pharmacological-management') {
        const start = { x: fromCenter.x, y: fromNode.y + fromNode.height };
        const end = { x: toCenter.x, y: toNode.y };
        // A simple vertical line. Removing the zero-length horizontal segment
        // from the previous implementation to fix arrowhead orientation.
        return `M ${start.x} ${start.y} V ${end.y}`;
    }

    // RULE 2B: Clinical Syndrome -> Pharm Mgt (Bypass intermediate node)
    if (fromId === 'clinical-syndrome' && toId === 'pharmacological-management') {
        const start = { x: fromCenter.x, y: fromNode.y + fromNode.height };
        const end = { x: toCenter.x, y: toNode.y };

        const intermediateNode = nodes.find(n => n.id === 'non-pharmacological-management');
        if (!intermediateNode) { // Fallback if node not found
            return `M ${start.x} ${start.y} V ${end.y}`;
        }
        
        // Route path around the 'non-pharmacological-management' node.
        const bypassX = intermediateNode.x + intermediateNode.width + 60; // Right side bypass
        const y1 = start.y + 20;
        const y2 = end.y - 20;

        return `M ${start.x} ${start.y} V ${y1} H ${bypassX} V ${y2} H ${end.x} V ${end.y}`;
    }
    
    // RULE 3: Management -> Positive Outcomes (Clean fork pattern)
    if ((fromId === 'non-pharmacological-management' || fromId === 'pharmacological-management') && toId === 'positive-outcomes') {
        const start = { x: fromCenter.x, y: fromNode.y + fromNode.height };
        let targetX = toCenter.x;
        // Create a fork pattern pointing to the left and right quarters of the target node
        if (fromId === 'non-pharmacological-management') {
            targetX = toNode.x + toNode.width * 0.35;
        } else { // pharmacological-management
            targetX = toNode.x + toNode.width * 0.65;
        }
        // A common Y-level for the horizontal segment, ensuring it's below the source node
        const commonY = fromNode.y + fromNode.height + 40;
        const end = { x: targetX, y: toNode.y };
        // Path: Drop down, move horizontally, drop down again.
        // This ensures the final segment is always vertical, fixing arrowhead orientation.
        return `M ${start.x} ${start.y} V ${commonY} H ${end.x} V ${end.y}`;
    }

    // RULE 4: Feedback loop (Tidy C-shape on the right)
    if (fromId === 'cardiac-remodeling' && toId === 'decreased-co') {
      const start = { x: fromNode.x + fromNode.width, y: fromCenter.y };
      const end = { x: toNode.x + toNode.width, y: toCenter.y };
      const midX = fromNode.x + fromNode.width + 100; // Tighter loop
      return `M ${start.x} ${start.y} H ${midX} V ${end.y} H ${end.x}`;
    }

    // RULE 5: Worsening HF -> End-Stage HF (Clear progression path)
    if (fromId === 'worsening-hf' && toId === 'end-stage-hf') {
        // Route the line from the bottom of 'Worsening HF' around the central
        // management nodes to the top of 'End-Stage HF'.
        const start = { x: fromCenter.x, y: fromNode.y + fromNode.height };
        const end = { x: toCenter.x, y: toNode.y };
        
        // Define path waypoints to create a clean bypass on the left side.
        const intermediateY1 = start.y + 30; // Drop down slightly from start
        const bypassX = 10; // Go to the far left of the diagram
        const intermediateY2 = end.y - 30; // Align vertically before the final horizontal move
        
        return `M ${start.x} ${start.y} V ${intermediateY1} H ${bypassX} V ${intermediateY2} H ${end.x} V ${end.y}`;
    }


    // --- DEFAULT ORTHOGONAL ROUTING for simpler connections ---
    let start, end;
    if (Math.abs(dy) > Math.abs(dx)) { // Primarily vertical
      if (dy > 0) { // Down
        start = { x: fromCenter.x, y: fromNode.y + fromNode.height };
        end = { x: toCenter.x, y: toNode.y };
      } else { // Up
        start = { x: fromCenter.x, y: fromNode.y };
        end = { x: toCenter.x, y: toNode.y + toNode.height };
      }
      const midY = fromCenter.y + dy / 2;
      return `M ${start.x} ${start.y} V ${midY} H ${end.x} V ${end.y}`;

    } else { // Primarily horizontal
      if (dx > 0) { // Right
        start = { x: fromNode.x + fromNode.width, y: fromCenter.y };
        end = { x: toNode.x, y: toCenter.y };
      } else { // Left
        start = { x: fromNode.x, y: fromCenter.y };
        end = { x: toNode.x + toNode.width, y: toCenter.y };
      }
      const midX = fromCenter.x + dx / 2;
      return `M ${start.x} ${start.y} H ${midX} V ${end.y} H ${end.x}`;
    }
  };

  const pathData = getOrthogonalPath(fromNode, toNode);

  return (
    <path
      d={pathData}
      stroke={strokeColor}
      strokeWidth="2"
      fill="none"
      markerEnd={`url(#${markerId})`}
      strokeDasharray={isDashed ? "5 5" : "none"}
    />
  );
};

const DiagramNodeComponent: React.FC<{
    node: DiagramNode;
    category: Category;
    isSelected: boolean;
    onClick: (id: string) => void;
  }> = ({ node, category, isSelected, onClick }) => {
    const LABEL_LINE_HEIGHT = 18;
    const PADDING_Y = 15;
    const totalLabelLines = node.label.length;
    const labelBlockHeight = totalLabelLines * LABEL_LINE_HEIGHT;
    const contentTopY = Math.max(PADDING_Y, (node.height - labelBlockHeight) / 2);
    const textColor = category.textColor === 'text-white' ? 'white' : '#1e293b'; // slate-800
  
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
          className={`${category.color.startsWith('bg-') ? `fill-${category.color.substring(3)}` : 'fill-gray-500'} stroke-2 ${isSelected ? 'stroke-cyan-400 ring-4 ring-cyan-200' : (category.color === 'bg-white' ? 'stroke-slate-300' : 'stroke-transparent')}`}
          style={{ filter: isSelected ? 'drop-shadow(0 4px 8px rgba(0, 172, 193, 0.6))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
        />
        <text
          x={node.width / 2}
          textAnchor="middle"
          className="font-semibold select-none text-sm"
          fill={textColor}
          pointerEvents="none"
        >
          {node.label.map((line, index) => {
            const yPos = contentTopY + (index * LABEL_LINE_HEIGHT) + (LABEL_LINE_HEIGHT * 0.75);
            const isListItem = line.trim().startsWith('•') || line.trim().startsWith('-');
            const textAnchor = isListItem ? 'start' : 'middle';
            // Adjust x position for list items to be indented from the left, not centered
            const xPos = isListItem ? 40 : node.width / 2;
  
            return (
              <tspan key={`label-${index}`} x={xPos} y={yPos} textAnchor={textAnchor}>
                {line}
              </tspan>
            );
          })}
        </text>
      </g>
    );
  };

const HeartFailureDiagram: React.FC<HeartFailureDiagramProps> = ({ nodes, connections, categories, selectedNodeId, onNodeClick }) => {
  const categoryMap = new Map(categories.map(c => [c.id, c]));
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 960 2150" preserveAspectRatio="xMidYMid meet">
      <defs>
        <ArrowheadMarker id="arrowhead-primary" color="#64748b" />
      </defs>
      
      <g>
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;
          return <DiagramConnectionLine key={index} fromNode={fromNode} toNode={toNode} connection={conn} nodes={nodes} />;
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
