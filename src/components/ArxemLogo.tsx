import React from 'react';

interface ArxemLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'cobalt';
  showSubtitle?: boolean;
  compact?: boolean;
}

/**
 * Official ARXEM logo with transparent background (extracted from the original brand asset).
 */
export const ArxemLogo: React.FC<ArxemLogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = false,
  compact = false
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      <img
        src={showSubtitle ? '/arxem-logo.png' : '/arxem-logo-nav.png'}
        alt="ARXEM — Accesorios de Rayos X, Equipo Médico"
        draggable={false}
        className={`${
          compact ? 'h-11' : showSubtitle ? 'h-16' : 'h-13 sm:h-14'
        } w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] ${
          variant === 'light'
            ? 'drop-shadow-[0_2px_10px_rgba(255,255,255,0.22)] brightness-110'
            : ''
        }`}
      />
    </div>
  );
};
