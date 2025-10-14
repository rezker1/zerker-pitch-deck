"use client"

import { useEffect, useState } from 'react';

export function BackgroundEffects({ variant = 'hero', intensity = 'medium' }) {
  const [nodes, setNodes] = useState([]);
  const [signals, setSignals] = useState([]);

  // Initialize grid nodes
  useEffect(() => {
    const gridSize = { x: 6, y: 4 }; // Adjust grid density
    const spacing = { x: window.innerWidth / (gridSize.x - 1), y: window.innerHeight / (gridSize.y - 1) };
    const newNodes = [];

    // Create grid nodes
    for (let y = 0; y < gridSize.y; y++) {
      for (let x = 0; x < gridSize.x; x++) {
        newNodes.push({
          x: x * spacing.x,
          y: y * spacing.y,
          connections: []
        });
      }
    }

    // Create connections
    newNodes.forEach((node, i) => {
      const possibleConnections = newNodes
        .map((n, index) => ({
          index,
          distance: Math.sqrt(Math.pow(n.x - node.x, 2) + Math.pow(n.y - node.y, 2))
        }))
        .filter(n => n.index !== i && n.distance < Math.max(spacing.x, spacing.y) * 1.5)
        .map(n => n.index);

      node.connections = possibleConnections;
    });

    setNodes(newNodes);
  }, []);

  // Animate signals
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prev => {
        const active = prev.filter(s => s.progress < 1);
        
        if (active.length < 3) {
          const startNodeIndex = Math.floor(Math.random() * nodes.length);
          const startNode = nodes[startNodeIndex];
          
          if (startNode?.connections.length) {
            const endNodeIndex = startNode.connections[
              Math.floor(Math.random() * startNode.connections.length)
            ];
            
            return [...active, {
              id: Date.now(),
              from: startNode,
              to: nodes[endNodeIndex],
              progress: 0
            }];
          }
        }
        
        return active;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [nodes]);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setSignals(prev => prev.map(signal => ({
        ...signal,
        progress: signal.progress + 0.01
      })));
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [signals]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Circuit board pattern */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <svg style={{ width: '100%', height: '100%', opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M10 10h30v30h-30z" fill="none" stroke="#FFCD38" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="2" fill="#FFCD38" />
            <circle cx="40" cy="40" r="2" fill="#FFCD38" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      {/* Animated nodes and connections */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* Draw connections */}
        {nodes.map((node, i) => 
          node.connections.map(connectionIndex => (
            <line
              key={`${i}-${connectionIndex}`}
              x1={node.x}
              y1={node.y}
              x2={nodes[connectionIndex].x}
              y2={nodes[connectionIndex].y}
              stroke="#FFCD38"
              strokeWidth="0.5"
              strokeOpacity="0.1"
            />
          ))
        )}

        {/* Draw nodes */}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="2"
            fill="#FFCD38"
            fillOpacity="0.3"
          />
        ))}

        {/* Animate signals */}
        {signals.map(signal => {
          const dx = signal.to.x - signal.from.x;
          const dy = signal.to.y - signal.from.y;
          const x = signal.from.x + dx * signal.progress;
          const y = signal.from.y + dy * signal.progress;

          return (
            <circle
              key={signal.id}
              cx={x}
              cy={y}
              r="3"
              fill="#FFCD38"
              fillOpacity="0.6"
            >
              <animate
                attributeName="r"
                values="3;5;3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </svg>

      {/* Glow effects */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '600px', 
          background: 'radial-gradient(circle 600px at 50% 0%, rgba(255,205,56,0.1), transparent 100%)' 
        }} />
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: '600px', 
          background: 'radial-gradient(circle 600px at 50% 100%, rgba(255,79,0,0.08), transparent 100%)' 
        }} />
      </div>

      {/* Subtle noise texture */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        opacity: 0.2, 
        mixBlendMode: 'soft-light' 
      }}>
        <div style={{
          width: '100%', 
          height: '100%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>
    </div>
  );
}