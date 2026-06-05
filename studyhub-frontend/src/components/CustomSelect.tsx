/**
 * CustomSelect - Replaces native <select> with a premium custom dropdown.
 * Usage:
 *   <CustomSelect
 *     options={[{value:'', label:'Tất cả'}]}
 *     value={val}
 *     onChange={setVal}
 *     icon="tune"           // optional material icon
 *     placeholder="Chọn..."
 *   />
 */
import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Material Symbols icon name */
  icon?: string;
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md';
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Chọn...',
  icon,
  className = '',
  size = 'md',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);
  const displayLabel = selected?.label ?? placeholder;
  const isPlaceholder = !selected;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const paddingClass = size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm';

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-2 ${paddingClass} bg-white border rounded-xl font-medium transition-all duration-150 w-full text-left ${
          open
            ? 'border-primary ring-2 ring-primary/15 shadow-sm'
            : 'border-slate-200 hover:border-slate-300 shadow-sm'
        }`}
      >
        {icon && (
          <span className="material-symbols-outlined text-[16px] text-slate-400 shrink-0">{icon}</span>
        )}
        <span className={`flex-1 truncate ${isPlaceholder ? 'text-slate-400' : 'text-slate-700'}`}>
          {displayLabel}
        </span>
        <span
          className={`material-symbols-outlined text-slate-400 text-[18px] shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-primary' : ''}`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 top-[calc(100%+6px)] left-0 min-w-full w-max bg-white border border-slate-150 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden animate-fade-in">
          {options.map(opt => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 ${paddingClass} text-left transition-all duration-100 ${
                  isSelected
                    ? 'bg-primary/8 text-primary font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
                {!isSelected && <span className="w-[16px] shrink-0" />}
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
