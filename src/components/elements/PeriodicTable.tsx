import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ELEMENTS, ELEMENT_CATEGORY_COLORS, type ChemElement } from '@/data/elements';

interface Props {
  selected?: string | null;
  highlightSymbol?: string | null;
  onSelect: (el: ChemElement) => void;
}

export function PeriodicTable({ selected, highlightSymbol, onSelect }: Props) {
  const [hover, setHover] = useState<string | null>(null);

  // Lay out main table (periods 1-7, groups 1-18)
  const mainGrid: (ChemElement | null)[][] = useMemo(() => {
    const grid: (ChemElement | null)[][] = Array.from({ length: 7 }, () =>
      Array.from({ length: 18 }, () => null)
    );
    ELEMENTS.forEach((el) => {
      if (el.period >= 1 && el.period <= 7 && el.group >= 1 && el.group <= 18) {
        grid[el.period - 1][el.group - 1] = el;
      }
    });
    return grid;
  }, []);

  const lanthanides = useMemo(() => ELEMENTS.filter((e) => e.category === 'lanthanide' && e.group === 0), []);
  const actinides = useMemo(() => ELEMENTS.filter((e) => e.category === 'actinide' && e.group === 0), []);

  const renderCell = (el: ChemElement | null, key: string) => {
    if (!el) return <div key={key} />;
    const color = ELEMENT_CATEGORY_COLORS[el.category];
    const isSelected = selected === el.symbol;
    const isHovered = hover === el.symbol;
    const isHighlighted = highlightSymbol === el.symbol;
    return (
      <motion.button
        key={key}
        type="button"
        onClick={() => onSelect(el)}
        onMouseEnter={() => setHover(el.symbol)}
        onMouseLeave={() => setHover(null)}
        whileHover={{ scale: 1.15, zIndex: 10 }}
        animate={isHighlighted ? { scale: [1, 1.1, 1] } : {}}
        transition={isHighlighted ? { duration: 1.2, repeat: Infinity } : {}}
        className="relative aspect-square rounded-md border text-[8px] sm:text-[10px] flex flex-col items-center justify-center transition-all"
        style={{
          background: isSelected || isHovered
            ? `${color}40`
            : `${color}15`,
          borderColor: isSelected ? color : `${color}60`,
          boxShadow: isSelected
            ? `0 0 16px ${color}, inset 0 0 8px ${color}80`
            : isHighlighted
            ? `0 0 12px ${color}`
            : 'none',
          color: isSelected ? '#fff' : color,
        }}
        aria-label={`${el.name} (${el.symbol})`}
      >
        <span className="absolute top-0.5 left-1 text-[6px] sm:text-[8px] opacity-70">{el.number}</span>
        <span className="font-bold text-xs sm:text-sm">{el.symbol}</span>
        {el.lore && (
          <span className="absolute top-0.5 right-1 text-[6px] sm:text-[8px]">✦</span>
        )}
      </motion.button>
    );
  };

  return (
    <div className="w-full">
      <div className="grid gap-0.5 sm:gap-1" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
        {mainGrid.flatMap((row, p) => row.map((el, g) => renderCell(el, `${p}-${g}`)))}
      </div>
      <div className="mt-2 sm:mt-3 grid gap-0.5 sm:gap-1" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))', marginLeft: '11.1%' }}>
        {lanthanides.map((el) => renderCell(el, `lan-${el.number}`))}
      </div>
      <div className="mt-0.5 sm:mt-1 grid gap-0.5 sm:gap-1" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))', marginLeft: '11.1%' }}>
        {actinides.map((el) => renderCell(el, `act-${el.number}`))}
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
        {Object.entries(ELEMENT_CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm border" style={{ background: `${color}30`, borderColor: color }} />
            <span className="capitalize">{cat.replace('-', ' ')}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span style={{ color: '#fbbf24' }}>✦</span>
          <span>Has disclosure lore</span>
        </div>
      </div>
    </div>
  );
}
