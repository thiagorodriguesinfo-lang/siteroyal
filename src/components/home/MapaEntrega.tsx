import { useState } from 'react'

// ── Coordenadas derivadas de lon/lat reais do Estado do RJ ───────────────
// viewBox 590x415, bounds: lon -45.1°→-40.9° / lat -20.8°→-23.4°
// x = 5 + (45.1 - |lon|) * 135.7    y = 5 + (|lat| - 20.8) * 153.8

const CD = { x: 295, y: 295 } // hub — nova Iguaçu / Duque de Caxias

const regions = [
  {
    id: 'metro',
    label: 'RJ Metropolitana',
    x: 262, y: 330,   // Rio de Janeiro city area
    gold: true,
    delay: '0s', dur: '2.2s',
    stats: ['Entrega diária', '27 municípios', 'Frota dedicada', 'Atendimento em campo'],
  },
  {
    id: 'serrana',
    label: 'Região Serrana',
    x: 258, y: 248,   // Petrópolis / Teresópolis
    gold: false,
    delay: '0.8s', dur: '2.4s',
    stats: ['Petrópolis · Teresópolis', 'Nova Friburgo', 'Cadeia de frio ativa', 'Seg–Sáb'],
  },
  {
    id: 'sul',
    label: 'Sul Fluminense',
    x: 148, y: 252,   // Volta Redonda / Resende
    gold: false,
    delay: '1.6s', dur: '2.0s',
    stats: ['Volta Redonda · Resende', 'Barra Mansa', 'Polo industrial', 'Seg–Sáb'],
  },
  {
    id: 'verde',
    label: 'Costa Verde',
    x: 90, y: 362,    // Angra dos Reis / Paraty
    gold: false,
    delay: '2.4s', dur: '2.2s',
    stats: ['Angra dos Reis · Paraty', 'Mangaratiba', 'Logística costeira', 'Prog. semanal'],
  },
  {
    id: 'lagos',
    label: 'Região dos Lagos',
    x: 432, y: 320,   // Cabo Frio / Búzios (costa SE)
    gold: false,
    delay: '3.2s', dur: '2.0s',
    stats: ['Cabo Frio · Búzios', 'Arraial do Cabo', 'Food service local', 'Seg–Sáb'],
  },
]

const metrics = [
  { value: '92+',   label: 'Municípios' },
  { value: '2,5M',  label: 'kg/mês' },
  { value: 'Seg–Sáb', label: 'Entregas' },
  { value: '100%',  label: 'Refrigerado' },
  { value: '17+',   label: 'Anos' },
]

// ── Path geográfico do Estado do RJ ─────────────────────────────────────
// Traçado clockwise a partir do canto NW (Itatiaia/Resende)
const RJ =
  'M 75,268 ' +
  'C 108,244 148,215 188,186 ' +   // MG border going NE
  'C 228,158 272,124 318,88 ' +    // continuing NE
  'C 358,52 398,26 438,14 ' +      // approaching NE corner
  'L 472,28 ' +                    // NE junction (RJ/MG/ES)
  'C 508,56 535,102 548,148 ' +    // ES border going S
  'C 558,185 558,220 548,252 ' +   // continuing S
  'C 538,278 522,298 500,315 ' +   // SE coast turning SW
  'C 482,326 458,332 432,330 ' +   // Cabo Frio area (E coast bulge)
  'C 406,328 378,326 352,326 ' +   // Búzios / Araruama
  'C 322,326 295,325 275,325 ' +   // Niterói direction
  'C 264,325 254,330 248,342 ' +   // Guanabara Bay notch
  'C 244,350 250,358 258,360 ' +   // other side of bay
  'C 248,356 232,350 210,350 ' +   // Rio coast going SW
  'C 188,350 165,352 142,355 ' +   // Mangaratiba / Itaguaí
  'C 118,358 96,365 78,372 ' +     // Angra dos Reis
  'C 62,378 46,382 38,378 ' +      // Paraty tip (SW)
  'C 28,372 30,352 36,328 ' +      // going N along SP border
  'C 42,305 52,282 60,268 ' +      // Sul Fluminense area
  'C 66,258 70,260 75,268 Z'       // back to Itatiaia

const LABEL_OFFSET: Record<string, [number, number]> = {
  metro:   [2,  -28],
  serrana: [2,  -28],
  sul:     [-5, -28],
  verde:   [8,   32],
  lagos:   [8,  -28],
}

export default function MapaEntrega() {
  const [hovered, setHovered] = useState<string | null>(null)
  const hr = regions.find(r => r.id === hovered) ?? null

  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ userSelect: 'none' }}>
      <svg
        viewBox="0 0 590 415"
        className="w-full rounded-2xl"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.10))' }}
        aria-label="Mapa de cobertura Royal Alimentos — Estado do Rio de Janeiro"
      >
        <defs>
          {/* Textura de papel de mapa */}
          <linearGradient id="mapPaper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f4ede4" />
            <stop offset="100%" stopColor="#ede4d8" />
          </linearGradient>
          {/* Água/oceano ao redor */}
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#dceaf8" />
            <stop offset="100%" stopColor="#c8daf0" />
          </linearGradient>
          {/* Fill do estado */}
          <linearGradient id="stateFill3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f0e6da" />
            <stop offset="100%" stopColor="#e8d8c8" />
          </linearGradient>
          {/* Glow do hub */}
          <radialGradient id="hubGlow3" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#8B1A1A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B1A1A" stopOpacity="0" />
          </radialGradient>
          {/* Filtros */}
          <filter id="pinShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#00000030"/>
          </filter>
          <filter id="glow3" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Fundo: oceano/água ─────────────────────────────────────── */}
        <rect width="590" height="415" rx="16" fill="url(#oceanGrad)" />

        {/* Textura sutil na água */}
        <rect width="590" height="415" rx="16" fill="none"
          stroke="rgba(100,148,200,0.12)" strokeWidth="0.5" />

        {/* ── Estado do RJ ───────────────────────────────────────────── */}
        {/* Sombra do estado */}
        <path d={RJ} fill="rgba(0,0,0,0.08)"
          transform="translate(3,4)" />
        {/* Shape principal */}
        <path d={RJ}
          fill="url(#stateFill3)"
          stroke="#8B1A1A"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Grade interna sutil (estilo mapa topográfico) */}
        <path d={RJ} fill="none"
          stroke="rgba(139,26,26,0.06)" strokeWidth="8" />

        {/* ── Linhas de latitude/longitude — estilo cartográfico ──────── */}
        {[130, 210, 290, 370].map((y, i) => (
          <line key={`lat-${i}`}
            x1="5" y1={y} x2="585" y2={y}
            stroke="rgba(100,140,180,0.18)" strokeWidth="0.6" strokeDasharray="3 5" />
        ))}
        {[150, 250, 350, 450].map((x, i) => (
          <line key={`lon-${i}`}
            x1={x} y1="5" x2={x} y2="410"
            stroke="rgba(100,140,180,0.18)" strokeWidth="0.6" strokeDasharray="3 5" />
        ))}

        {/* ── Rotas animadas CD → Regiões ────────────────────────────── */}
        {regions.map(r => (
          <g key={`route-${r.id}`}>
            <line
              x1={CD.x} y1={CD.y} x2={r.x} y2={r.y}
              stroke="#8B1A1A" strokeWidth="1.2"
              strokeDasharray="5 5"
              opacity={hovered === r.id ? 0.55 : 0.22}
              style={{ transition: 'opacity 0.25s' }}
            />
            <path id={`mp-${r.id}`}
              d={`M ${CD.x},${CD.y} L ${r.x},${r.y}`}
              fill="none" stroke="none" />
            <circle r="3" fill="#8B1A1A">
              <animateMotion dur={r.dur} begin={r.delay} repeatCount="indefinite">
                <mpath href={`#mp-${r.id}`} />
              </animateMotion>
              <animate attributeName="opacity"
                values="0;1;1;0" keyTimes="0;0.08;0.88;1"
                dur={r.dur} begin={r.delay} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ── Hub CD Royal Alimentos ─────────────────────────────────────── */}
        <circle cx={CD.x} cy={CD.y} r="38" fill="url(#hubGlow3)" />
        {/* Anéis pulsantes */}
        <circle cx={CD.x} cy={CD.y} r="14" fill="none"
          stroke="rgba(139,26,26,0.45)" strokeWidth="1.8">
          <animate attributeName="r"       from="14" to="36" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.7" to="0"  dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={CD.x} cy={CD.y} r="14" fill="none"
          stroke="rgba(139,26,26,0.25)" strokeWidth="1">
          <animate attributeName="r"       from="14" to="36" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0"  dur="2.4s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        {/* Núcleo */}
        <circle cx={CD.x} cy={CD.y} r="12"
          fill="white" stroke="#8B1A1A" strokeWidth="2.5"
          filter="url(#pinShadow)" />
        <circle cx={CD.x} cy={CD.y} r="5" fill="#8B1A1A" />
        {/* Label */}
        <rect x={CD.x - 34} y={CD.y - 40} width="68" height="18" rx="9"
          fill="white" stroke="#8B1A1A" strokeWidth="1" />
        <text x={CD.x} y={CD.y - 27} textAnchor="middle"
          fill="#8B1A1A" fontSize="8.5" fontWeight="bold" letterSpacing="1"
          fontFamily="Inter, sans-serif">Royal Alimentos</text>

        {/* ── Pinos das regiões ─────────────────────────────────────── */}
        {regions.map(r => {
          const active = hovered === r.id
          const c  = r.gold ? '#C8A84B' : '#1B4D2E'
          const rc = r.gold ? 'rgba(200,168,75,' : 'rgba(27,77,46,'
          return (
            <g key={r.id}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}>
              {/* Anel pulsante */}
              <circle cx={r.x} cy={r.y} r="8" fill={`${rc}0.15)`}>
                <animate attributeName="r"       from="8"   to="24" dur={r.dur} begin={r.delay} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0"  dur={r.dur} begin={r.delay} repeatCount="indefinite" />
              </circle>
              {/* Pin */}
              <circle cx={r.x} cy={r.y}
                r={active ? 9 : 7}
                fill="white" stroke={c} strokeWidth={active ? 2.8 : 2}
                filter="url(#pinShadow)"
                style={{ transition: 'all 0.2s' }} />
              <circle cx={r.x} cy={r.y}
                r={active ? 4.5 : 3.5}
                fill={c}
                style={{ transition: 'all 0.2s' }} />
            </g>
          )
        })}

        {/* ── Labels sempre visíveis ────────────────────────────────── */}
        {regions.map(r => {
          const active = hovered === r.id
          const c = r.gold ? '#8a6a1a' : '#1B4D2E'
          const [ox, oy] = LABEL_OFFSET[r.id] ?? [0, -27]
          const lx = r.x + ox
          const ly = r.y + oy
          const W  = Math.max(92, r.label.length * 6.4 + 18)
          return (
            <g key={`lbl-${r.id}`}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer', opacity: active ? 0 : 1, transition: 'opacity 0.12s' }}>
              <rect x={lx - W/2} y={ly - 12} width={W} height="17" rx="8.5"
                fill="white" stroke={c} strokeWidth="1"
                filter="url(#pinShadow)" />
              <text x={lx} y={ly + 1.5} textAnchor="middle"
                fill={c} fontSize="8.5" fontWeight="700"
                fontFamily="Inter, sans-serif">{r.label}</text>
            </g>
          )
        })}

        {/* ── Tooltip hover ─────────────────────────────────────────── */}
        {hr && (() => {
          const c = hr.gold ? '#8a6a1a' : '#1B4D2E'
          const bg = hr.gold ? 'rgba(200,168,75,0.1)' : 'rgba(27,77,46,0.08)'
          const W = 155, H = 28 + hr.stats.length * 19 + 10
          let tx = hr.x + 20
          let ty = hr.y - H/2
          if (tx + W > 580) tx = hr.x - W - 20
          if (ty < 8) ty = 8
          if (ty + H > 408) ty = 408 - H
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={tx+2} y={ty+2} width={W} height={H} rx="10"
                fill="rgba(0,0,0,0.08)" />
              <rect x={tx} y={ty} width={W} height={H} rx="10"
                fill="white" stroke={c} strokeWidth="1.5" />
              <rect x={tx} y={ty} width={W} height="24" rx="10"
                fill={bg} />
              <rect x={tx} y={ty+12} width={W} height="12" fill={bg} />
              <text x={tx + W/2} y={ty + 16} textAnchor="middle"
                fill={c} fontSize="10" fontWeight="bold"
                fontFamily="Inter, sans-serif">{hr.label}</text>
              {hr.stats.map((s, i) => (
                <g key={i}>
                  <circle cx={tx+14} cy={ty+30+i*19} r="2.5" fill={c} opacity="0.7" />
                  <text x={tx+24} y={ty+35+i*19}
                    fill="#374151" fontSize="9.5" fontFamily="Inter, sans-serif">{s}</text>
                </g>
              ))}
            </g>
          )
        })()}

        {/* ── Indicador de norte + label ────────────────────────────── */}
        <g transform="translate(548, 28)">
          <circle cx="0" cy="0" r="14" fill="white" stroke="rgba(139,26,26,0.3)" strokeWidth="1" />
          <polygon points="0,-10 3,0 0,-2 -3,0" fill="#8B1A1A" />
          <polygon points="0,10 3,0 0,2 -3,0" fill="rgba(139,26,26,0.25)" />
          <text x="0" y="0" textAnchor="middle" dominantBaseline="middle"
            fill="#8B1A1A" fontSize="7" fontWeight="bold" fontFamily="Inter, sans-serif">N</text>
        </g>

        {/* Label do estado */}
        <text x="18" y="24"
          fill="rgba(139,26,26,0.4)" fontSize="8" letterSpacing="2.5"
          fontFamily="Inter, sans-serif">ESTADO DO RIO DE JANEIRO</text>
      </svg>

      {/* ── Métricas ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-5 gap-2 mt-3">
        {metrics.map(m => (
          <div key={m.label}
            className="bg-white border border-gray-200 rounded-xl py-3 px-1.5 text-center shadow-sm">
            <div className="text-vinho-700 font-bold text-sm leading-none">{m.value}</div>
            <div className="text-gray-400 text-[8px] mt-1.5 leading-tight uppercase tracking-wide">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
