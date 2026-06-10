import { type ReactNode } from 'react'

interface AdinkraBgProps {
  children: ReactNode
  variant?: 'gye-nyame' | 'adinkrahene' | 'akoma' | 'aban' | 'sankofa' | 'dwennimmen' | 'funtunfunefu' | 'all'
  opacity?: number
  color?: string
  className?: string
}

const symbols = {
  'gye-nyame': {
    viewBox: '-37.654 -4.726 510 510',
    paths: ['M180.475,11.245c11.609,15.968,7.794,46.741,26.767,55.644c26.062-0.674,25.307-27.081,40.147-38.522c37.423-25.598,80.812-4.661,84.757,21.401c8.344,55.104-94.203,80.456-84.757,136.968c9.536,33.494,46.84-40.814,80.296-4.281c29.544,65.467-102.894,51.963-95.405,99.257c8.479,69.408,83.598-43.18,99.866,7.75c7.444,61.115-90.009,39.543-71.376,85.605c31.053,43.338,93.146-42.834,84.878-31.873c43.16-57.209,85.813-159.123,29.777-256.006c99.626,91.095,71.729,313.357-69.21,350.594c14.787,9.459,18.504,36.646,8.087,48.568c-10.346,11.842-36.933,22.807-57.991,4.281c-10.31-14.361,2.403-39.824-26.765-47.08c-18.745-4.664-32.433,39.398-55.647,52.135c-15.555,8.533-43.473,1.455-59.915-15.34c-14.078-14.379-14.788-47.295,0.466-56.301c26.519-15.656,80.032-33.082,83.868-87.5c-5.471-40.646-59.689,35.025-84.756,8.559c-34.083-68.123,83.784-46.83,89.217-102.725c-0.074-36.338-67.55,32.542-89.217-8.562c-38.333-69.896,114.667-36.896,93.68-94.165c-24.013-47.731-112.56,5.376-147.334,72.364c-19.86,38.258-46.917,121.406-34.647,187.93C-22.375,289.606-9.89,111.731,125.831,70.548c-16.777-6.39-21.382-28.988-8.3-51.689C125.911,4.318,159.07-11.08,180.475,11.245z']
  },
  adinkrahene: {
    viewBox: '0 0 480 480',
    paths: [],
    circles: [
      { cx: 240, cy: 240, r: 45 },
      { cx: 240, cy: 240, r: 105 },
      { cx: 240, cy: 240, r: 165 },
    ]
  },
  akoma: {
    viewBox: '0 0 480 480',
    paths: [
      'M281.62489,96.412C318.30563,59.73128,362.342,44.29642,399.02283,80.97717s21.24585,80.71707-15.43491,117.39784',
      'M198.37517,383.58789c-36.68076,36.68078-80.71706,52.11575-117.39784,15.435s-21.24594-80.7172,15.43481-117.398',
      'M96.41194,198.37539C59.73116,161.69464,44.29648,117.658,80.97723,80.97727s80.71689-21.24566,117.39766,15.43509',
      'M383.58777,281.6251c36.68078,36.68074,52.1159,80.71688,15.43518,117.39766s-80.71735,21.24613-117.39812-15.43463',
    ],
    rects: [
      { x: 218.17261, y: 62.07118, width: 43.6552, height: 355.85742, rotate: -45, rx: 240, ry: 240.00023 },
      { x: 62.07108, y: 218.17261, width: 355.85741, height: 43.65518, rotate: -45, rx: 240.00021, ry: 240.00002 },
    ],
    circle: { cx: 240.00021, cy: 239.99989, r: 93.92698 }
  },
  aban: {
    viewBox: '0 0 892.37 892.37',
    paths: [],
    polygons: ['64.35 191.63 318.9 446.18 64.35 700.74 191.63 828.02 446.18 573.46 700.74 828.02 828.02 700.74 573.46 446.18 828.02 191.63 700.74 64.35 446.18 318.9 191.63 64.35 64.35 191.63'],
    rects: [
      { x: 19.35, y: 19.35, width: 90, height: 90, rotate: -45, rx: -26.65, ry: 64.35 },
      { x: 783.02, y: 783.02, width: 90, height: 90, rotate: -45, rx: -342.98, ry: 828.02 },
      { x: 783.02, y: 19.35, width: 90, height: 90, rotate: -45, rx: 197.02, ry: 604.35 },
      { x: 19.35, y: 783.02, width: 90, height: 90, rotate: -45, rx: -566.65, ry: 288.02 },
    ]
  },
  sankofa: {
    viewBox: '0 0 480 480',
    paths: [
      // Stylized Sankofa bird - body, head turned backward, feet pointing forward
      'M150,420 C130,400 120,370 125,340 C130,310 145,290 160,275 C170,265 175,250 170,235 C165,220 155,210 145,200 C130,185 120,165 125,140 C130,115 150,95 175,85 C200,75 225,80 240,95 C255,110 255,135 240,155 C225,175 200,185 180,185 C165,185 155,180 148,172',
      'M148,172 C155,165 165,160 180,160 C200,160 220,168 235,185 C250,202 255,225 250,245 C245,265 230,280 215,290 C200,300 185,305 175,315 C165,325 158,338 155,355',
      'M125,340 C120,360 115,380 120,400',
      'M150,420 L140,450 M130,440 L160,440',
      'M160,275 L190,270 M175,280 L185,260',
    ],
  },
  dwennimmen: {
    viewBox: '0 0 480 480',
    paths: [
      // Left horn
      'M240,240 C220,220 190,200 170,180 C150,160 135,135 140,110 C145,85 165,65 190,65 C215,65 235,80 240,100 C245,120 240,140 225,155 C210,170 190,178 175,175',
      'M175,175 C165,172 158,162 160,150 C162,138 172,128 185,128 C198,128 210,135 218,145 C226,155 230,168 228,180 C226,192 218,202 208,208',
      // Right horn
      'M240,240 C260,220 290,200 310,180 C330,160 345,135 340,110 C335,85 315,65 290,65 C265,65 245,80 240,100 C235,120 240,140 255,155 C270,170 290,178 305,175',
      'M305,175 C315,172 322,162 320,150 C318,138 308,128 295,128 C282,128 270,135 262,145 C254,155 250,168 252,180 C254,192 262,202 272,208',
    ],
  },
  funtunfunefu: {
    viewBox: '0 0 480 480',
    paths: [
      // Shared body (stomach)
      'M180,240 C180,200 200,170 240,170 C280,170 300,200 300,240 C300,280 280,310 240,310 C200,310 180,280 180,240 Z',
      // Left crocodile head (facing left)
      'M180,240 C160,230 130,215 100,220 C70,225 55,240 60,255 C65,270 80,275 95,270 C110,265 120,250 130,240',
      'M60,255 L40,248 M60,255 L45,268',
      'M100,220 L85,200 M100,220 L105,200',
      // Right crocodile head (facing right)
      'M300,240 C320,230 350,215 380,220 C410,225 425,240 420,255 C415,270 400,275 385,270 C370,265 360,250 350,240',
      'M420,255 L440,248 M420,255 L435,268',
      'M380,220 L395,200 M380,220 L375,200',
      // Tail left
      'M180,260 C155,280 130,310 120,340 C115,355 120,365 130,365 C140,365 145,355 148,340',
      // Tail right
      'M300,260 C325,280 350,310 360,340 C365,355 360,365 350,365 C340,365 335,355 332,340',
      // Eyes
      'M85,248 C88,245 92,245 95,248',
      'M385,248 C388,245 392,245 395,248',
      // Teeth left
      'M70,250 L75,260 M80,252 L83,262',
      // Teeth right
      'M400,250 L405,260 M410,252 L413,262',
    ],
  },
} as const

function AdinkraSymbol({ name, color = '#c8a96e' }: { name: keyof typeof symbols; color?: string }) {
  const sym = symbols[name]
  return (
    <svg
      viewBox={sym.viewBox}
      fill="none"
      stroke={color}
      strokeWidth={name === 'aban' ? 90 : name === 'dwennimmen' || name === 'sankofa' ? 24 : 30}
      strokeMiterlimit={10}
      className="w-full h-full"
    >
      {sym.paths?.map((d, i) => (
        <path key={i} d={d} />
      ))}
      {sym.circles?.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
      ))}
      {sym.polygons?.map((p, i) => (
        <polygon key={i} points={p} />
      ))}
      {sym.rects?.map((r, i) => (
        <rect
          key={i}
          x={r.x} y={r.y}
          width={r.width} height={r.height}
          transform={`translate(${r.rx} ${r.ry}) rotate(${r.rotate})`}
        />
      ))}
      {sym.circle && <circle cx={sym.circle.cx} cy={sym.circle.cy} r={sym.circle.r} />}
    </svg>
  )
}

export default function AdinkraBg({
  children,
  variant = 'gye-nyame',
  opacity = 0.04,
  color = '#c8a96e',
  className = '',
}: AdinkraBgProps) {
  const allSymbols: (keyof typeof symbols)[] = ['gye-nyame', 'adinkrahene', 'akoma', 'aban', 'sankofa', 'dwennimmen', 'funtunfunefu']
  const symbolsToRender: (keyof typeof symbols)[] =
    variant === 'all' ? allSymbols : [variant]

  return (
    <div className={`relative ${className}`}>
      {/* Kente-inspired top border */}
      <div className="absolute top-0 left-0 right-0 h-1 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #c8a96e 0%, #ef4036 25%, #c8a96e 50%, #006b3f 75%, #c8a96e 100%)',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Adinkra background symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ zIndex: 0 }}>
        {/* Bottom-right large symbol */}
        <div
          className="absolute -bottom-8 -right-8 w-48 h-48 md:w-64 md:h-64"
          style={{ opacity }}
        >
          <AdinkraSymbol name={symbolsToRender[0]} color={color} />
        </div>

        {/* Top-left medium symbol */}
        <div
          className="absolute -top-4 -left-4 w-32 h-32 md:w-40 md:h-40"
          style={{ opacity: opacity * 0.7 }}
        >
          <AdinkraSymbol name={symbolsToRender.length > 1 ? symbolsToRender[1] : symbolsToRender[0]} color={color} />
        </div>

        {/* Middle scattered small symbols */}
        {symbolsToRender.map((sym, i) => (
          i > 1 && i < 5 ? (
            <div
              key={sym}
              className="absolute w-20 h-20"
              style={{
                opacity: opacity * 0.5,
                ...i === 2 ? { bottom: '15%', left: '10%' } :
                  i === 3 ? { top: '20%', right: '15%' } :
                  { top: '60%', left: '30%' },
              }}
            >
              <AdinkraSymbol name={sym} color={color} />
            </div>
          ) : null
        ))}

        {/* Extra scattered symbols for 'all' variant */}
        {symbolsToRender.length > 5 && symbolsToRender.slice(5).map((sym, i) => (
          <div
            key={sym}
            className="absolute w-16 h-16"
            style={{
              opacity: opacity * 0.35,
              ...i === 0 ? { top: '10%', left: '50%' } :
                i === 1 ? { bottom: '30%', right: '10%' } :
                { top: '45%', left: '5%' },
            }}
          >
            <AdinkraSymbol name={sym} color={color} />
          </div>
        ))}

        {/* Kente-inspired grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent, transparent 120px, ${color} 120px, ${color} 121px),
              repeating-linear-gradient(0deg, transparent, transparent 120px, ${color} 120px, ${color} 121px)
            `,
            opacity: opacity * 0.3,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[1]">
        {children}
      </div>

      {/* Kente-inspired bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #006b3f 0%, #c8a96e 25%, #ef4036 50%, #c8a96e 75%, #006b3f 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  )
}
