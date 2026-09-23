/** Black isometric-style glyphs (Palantir-like monochrome). Pattern: component-based icon set. */

export function iconKind(entityId: string, label: string): string {
  const s = `${entityId} ${label}`.toLowerCase();
  if (/estimat|quote|quotation|order|sales/.test(s) && !/purchase|manufact/.test(s))
    return 'order';
  if (/purchase/.test(s)) return 'revenue';
  if (/contact|customer|partner|client|people|user/.test(s)) return 'customer';
  if (/plant|factory|manufact/.test(s)) return 'plant';
  if (/warehous|inventory|stock|item/.test(s)) return 'warehouse';
  if (/shop.?floor|ship|truck|logistics|deliver/.test(s)) return 'ship';
  if (/quality|qc|inspect/.test(s)) return 'forecast';
  if (/employee|attendance|hr/.test(s)) return 'customer';
  if (/document|sct|doc/.test(s)) return 'order';
  if (/revenue|cash|payment|invoice|financ/.test(s)) return 'revenue';
  if (/forecast|predict|plan/.test(s)) return 'forecast';
  return 'generic';
}

type EntityIconProps = {
  kind: string;
  size?: number;
};

export function EntityIcon({ kind, size = 58 }: EntityIconProps) {
  const ink = '#0a0a0a';
  const soft = '#3f3f46';
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    'aria-hidden': true as const,
  };

  switch (kind) {
    case 'order':
      return (
        <svg {...common}>
          <path
            d="M18 12h28l4 8v34H14V20l4-8Z"
            fill="#f4f4f5"
            stroke={ink}
            strokeWidth="2.2"
          />
          <path d="M18 12h28v8H18V12Z" fill={soft} />
          <path d="M22 30h20M22 38h14M22 46h18" stroke={ink} strokeWidth="2" />
        </svg>
      );
    case 'customer':
      return (
        <svg {...common}>
          <circle cx="32" cy="20" r="11" fill="#f4f4f5" stroke={ink} strokeWidth="2.2" />
          <path
            d="M12 54c2-12 10-18 20-18s18 6 20 18"
            fill="#f4f4f5"
            stroke={ink}
            strokeWidth="2.2"
          />
          <circle cx="32" cy="20" r="4" fill={ink} />
        </svg>
      );
    case 'plant':
      return (
        <svg {...common}>
          <path d="M8 50h48V30L40 18H24L8 30v20Z" fill="#f4f4f5" stroke={ink} strokeWidth="2.2" />
          <rect x="14" y="34" width="10" height="10" fill={soft} />
          <rect x="28" y="34" width="10" height="10" fill={soft} />
          <rect x="42" y="28" width="8" height="22" fill={ink} />
          <path d="M24 18v-6h16v6" stroke={ink} strokeWidth="2.2" />
        </svg>
      );
    case 'warehouse':
      return (
        <svg {...common}>
          <path
            d="M6 28 L32 10 L58 28 V52 H6 Z"
            fill="#f4f4f5"
            stroke={ink}
            strokeWidth="2.2"
          />
          <path d="M6 28 L32 10 L58 28" stroke={ink} strokeWidth="2.2" />
          <rect x="26" y="34" width="12" height="18" fill={soft} stroke={ink} strokeWidth="1.5" />
        </svg>
      );
    case 'ship':
      return (
        <svg {...common}>
          <path d="M8 34h34l10 8H10l-2-8Z" fill="#f4f4f5" stroke={ink} strokeWidth="2.2" />
          <rect x="14" y="22" width="14" height="12" fill={soft} stroke={ink} strokeWidth="1.5" />
          <circle cx="18" cy="46" r="4.5" fill={ink} />
          <circle cx="38" cy="46" r="4.5" fill={ink} />
        </svg>
      );
    case 'revenue':
      return (
        <svg {...common}>
          <rect
            x="18"
            y="12"
            width="28"
            height="40"
            rx="3"
            fill="#f4f4f5"
            stroke={ink}
            strokeWidth="2.2"
          />
          <text
            x="32"
            y="40"
            textAnchor="middle"
            fill={ink}
            fontSize="20"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui"
          >
            $
          </text>
        </svg>
      );
    case 'forecast':
      return (
        <svg {...common}>
          <rect
            x="10"
            y="12"
            width="44"
            height="40"
            rx="3"
            fill="#f4f4f5"
            stroke={ink}
            strokeWidth="2.2"
          />
          <path
            d="M18 40 L28 28 L38 34 L48 20"
            stroke={ink}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="20" r="3.5" fill={ink} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect
            x="14"
            y="14"
            width="36"
            height="36"
            rx="6"
            fill="#f4f4f5"
            stroke={ink}
            strokeWidth="2.2"
          />
          <circle cx="32" cy="32" r="8" stroke={ink} strokeWidth="2.2" />
        </svg>
      );
  }
}
