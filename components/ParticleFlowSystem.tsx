import React, { useMemo } from 'react';

interface ParticleConfig {
  id: string;
  pathId: string;
  color: string;
  delay: number;
  duration: number;
  sourceNode: 'blue' | 'pink' | 'green' | 'purple';
}

interface Props {
  isVisible: boolean;
  hoveredNode: 'blue' | 'pink' | 'green' | 'purple' | null;
}

const ParticleFlowSystem: React.FC<Props> = ({ isVisible, hoveredNode }) => {
  const particles = useMemo<ParticleConfig[]>(() => [
    // Blue → Pink path (Strategic Intelligence → Brand Authority)
    { id: 'bp-1', pathId: 'path-blue-pink', color: '#00C9FF', delay: 0, duration: 4, sourceNode: 'blue' },
    { id: 'bp-2', pathId: 'path-blue-pink', color: '#00C9FF', delay: 1.33, duration: 4, sourceNode: 'blue' },
    { id: 'bp-3', pathId: 'path-blue-pink', color: '#00C9FF', delay: 2.66, duration: 4, sourceNode: 'blue' },

    // Pink → Green path (Brand Authority → Precision Activation)
    { id: 'pg-1', pathId: 'path-pink-green', color: '#FF2E63', delay: 4, duration: 4, sourceNode: 'pink' },
    { id: 'pg-2', pathId: 'path-pink-green', color: '#FF2E63', delay: 5.33, duration: 4, sourceNode: 'pink' },
    { id: 'pg-3', pathId: 'path-pink-green', color: '#FF2E63', delay: 6.66, duration: 4, sourceNode: 'pink' },

    // Green → Purple path (Precision Activation → Revenue Optimization)
    { id: 'gp-1', pathId: 'path-green-purple', color: '#22c55e', delay: 8, duration: 4, sourceNode: 'green' },
    { id: 'gp-2', pathId: 'path-green-purple', color: '#22c55e', delay: 9.33, duration: 4, sourceNode: 'green' },
    { id: 'gp-3', pathId: 'path-green-purple', color: '#22c55e', delay: 10.66, duration: 4, sourceNode: 'green' },

    // Purple → Blue path (Revenue Optimization → Strategic Intelligence)
    { id: 'pb-1', pathId: 'path-purple-blue', color: '#a855f7', delay: 12, duration: 4, sourceNode: 'purple' },
    { id: 'pb-2', pathId: 'path-purple-blue', color: '#a855f7', delay: 13.33, duration: 4, sourceNode: 'purple' },
    { id: 'pb-3', pathId: 'path-purple-blue', color: '#a855f7', delay: 14.66, duration: 4, sourceNode: 'purple' },
  ], []);

  if (!isVisible) return null;

  return (
    <svg
      className="absolute inset-0 hidden md:block pointer-events-none"
      viewBox="0 0 1152 600"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* SVG Paths for particle movement */}
        {/* Using quadratic Bezier curves (Q) for smooth motion through center */}
        <path id="path-blue-pink" d="M 240 150 Q 576 300 912 150" />
        <path id="path-pink-green" d="M 912 150 Q 576 300 912 450" />
        <path id="path-green-purple" d="M 912 450 Q 576 300 240 450" />
        <path id="path-purple-blue" d="M 240 450 Q 576 300 240 150" />
      </defs>

      {/* Render all particles */}
      {particles.map((particle) => {
        const isHovered = hoveredNode === particle.sourceNode;
        const glowAnimation = isHovered ? 'particleGlowEnhanced 1.5s ease-in-out infinite' : 'particleGlow 2s ease-in-out infinite';

        return (
          <circle
            key={particle.id}
            r="2"
            fill={particle.color}
            className="particle"
            style={{
              offsetPath: `url(#${particle.pathId})`,
              color: particle.color,
              animation: `particleFlow ${particle.duration}s linear infinite ${particle.delay}s, ${glowAnimation}`,
            } as React.CSSProperties & { offsetPath: string }}
          />
        );
      })}
    </svg>
  );
};

export default ParticleFlowSystem;
