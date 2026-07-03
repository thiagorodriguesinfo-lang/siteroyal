import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, Users, Clock, ArrowRight, RotateCcw } from 'lucide-react'

const CUTS_BBQ = [
  'Picanha',
  'Alcatra / Contra Filé',
  'Costela Janela',
  'Cupim',
  'Chorizo / Ancho',
  'Fraldinha',
]

const CUTS_CHICKEN = [
  'Coxa e Sobrecoxa',
  'Coração de Frango',
  'Filé de Frango',
]

const CUTS_SAUSAGE = [
  'Linguiça Calabresa',
  'Linguiça Toscana',
  'Costela de Porco',
]

interface Result {
  beef: number
  chicken: number
  sausage: number
  total: number
}

export default function Calculadora() {
  const [adults, setAdults] = useState(10)
  const [children, setChildren] = useState(0)
  const [profile, setProfile] = useState<'basico' | 'completo' | 'premium'>('completo')
  const [duration, setDuration] = useState<'curto' | 'medio' | 'longo'>('medio')
  const [includeChicken, setIncludeChicken] = useState(true)
  const [includeSausage, setIncludeSausage] = useState(true)
  const [result, setResult] = useState<Result | null>(null)

  const gramsPerAdult = { basico: 350, completo: 450, premium: 550 }
  const durationFactor = { curto: 1, medio: 1.15, longo: 1.35 }

  function calculate() {
    const basePerAdult = gramsPerAdult[profile] * durationFactor[duration]
    const basePerChild = basePerAdult * 0.5

    const total = Math.round(
      (adults * basePerAdult + children * basePerChild) / 1000 * 10
    ) / 10

    const beefPct = includeChicken && includeSausage ? 0.6
      : includeChicken ? 0.7
      : includeSausage ? 0.7
      : 1

    const chickenPct = includeChicken ? (includeSausage ? 0.2 : 0.3) : 0
    const sausagePct = includeSausage ? (includeChicken ? 0.2 : 0.3) : 0

    setResult({
      beef: Math.round(total * beefPct * 10) / 10,
      chicken: Math.round(total * chickenPct * 10) / 10,
      sausage: Math.round(total * sausagePct * 10) / 10,
      total,
    })
  }

  function reset() {
    setAdults(10)
    setChildren(0)
    setProfile('completo')
    setDuration('medio')
    setIncludeChicken(true)
    setIncludeSausage(true)
    setResult(null)
  }

  const Toggle = ({
    value,
    onChange,
    label,
  }: {
    value: boolean
    onChange: (v: boolean) => void
    label: string
  }) => (
    <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-vinho-300 transition-colors">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          value ? 'bg-vinho-700' : 'bg-gray-200'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </label>
  )

  const RadioGroup = <T extends string>({
    value,
    onChange,
    options,
  }: {
    value: T
    onChange: (v: T) => void
    options: { value: T; label: string; desc: string }[]
  }) => (
    <div className="grid grid-cols-3 gap-3">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${
            value === opt.value
              ? 'border-vinho-700 bg-vinho-50'
              : 'border-gray-200 hover:border-vinho-300'
          }`}
        >
          <input
            type="radio"
            className="sr-only"
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <div
            className={`font-semibold text-sm ${
              value === opt.value ? 'text-vinho-700' : 'text-gray-700'
            }`}
          >
            {opt.label}
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">{opt.desc}</div>
        </label>
      ))}
    </div>
  )

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-vinho-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calculator size={32} className="text-white" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Calculadora de Churrasco
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Informe quantas pessoas e o perfil do seu churrasco.
            Vamos calcular tudo para você.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">

            {/* Pessoas */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Users size={18} className="text-vinho-700" />
                <h2 className="font-bold text-gray-900">Número de pessoas</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">Adultos</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:border-vinho-700 hover:text-vinho-700 transition-colors font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold text-xl text-gray-900">
                      {adults}
                    </span>
                    <button
                      onClick={() => setAdults(adults + 1)}
                      className="w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:border-vinho-700 hover:text-vinho-700 transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">Crianças</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:border-vinho-700 hover:text-vinho-700 transition-colors font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold text-xl text-gray-900">
                      {children}
                    </span>
                    <button
                      onClick={() => setChildren(children + 1)}
                      className="w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:border-vinho-700 hover:text-vinho-700 transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Perfil */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-bold text-gray-900">Perfil do churrasco</h2>
              </div>
              <RadioGroup
                value={profile}
                onChange={setProfile}
                options={[
                  { value: 'basico', label: 'Básico', desc: '350g por adulto' },
                  { value: 'completo', label: 'Completo', desc: '450g por adulto' },
                  { value: 'premium', label: 'Premium', desc: '550g por adulto' },
                ]}
              />
            </div>

            <div className="border-t border-gray-100" />

            {/* Duração */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-vinho-700" />
                <h2 className="font-bold text-gray-900">Duração</h2>
              </div>
              <RadioGroup
                value={duration}
                onChange={setDuration}
                options={[
                  { value: 'curto', label: 'Até 3h', desc: 'Rápido' },
                  { value: 'medio', label: '4–6h', desc: 'Completo' },
                  { value: 'longo', label: '6h+', desc: 'Festival' },
                ]}
              />
            </div>

            <div className="border-t border-gray-100" />

            {/* Incluir */}
            <div>
              <h2 className="font-bold text-gray-900 mb-4">O que vai incluir?</h2>
              <div className="space-y-3">
                <Toggle
                  value={includeChicken}
                  onChange={setIncludeChicken}
                  label="Incluir frango"
                />
                <Toggle
                  value={includeSausage}
                  onChange={setIncludeSausage}
                  label="Incluir linguiça / suíno"
                />
              </div>
            </div>

            {/* Calcular */}
            <button
              onClick={calculate}
              className="w-full btn-primary justify-center text-base py-4"
            >
              <Calculator size={18} />
              Calcular
            </button>
          </div>

          {/* Resultado */}
          {result && (
            <div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3
                className="text-2xl font-bold text-gray-900 mb-1 text-center"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Quantidade estimada
              </h3>
              <p className="text-gray-400 text-sm text-center mb-8">
                Para {adults} adulto{adults > 1 ? 's' : ''}
                {children > 0 ? ` e ${children} criança${children > 1 ? 's' : ''}` : ''}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-vinho-50 rounded-2xl p-5 text-center border border-vinho-100">
                  <div className="text-3xl font-bold text-vinho-700">{result.beef} kg</div>
                  <div className="text-sm text-gray-600 mt-1">Carne Bovina</div>
                </div>
                {includeChicken && (
                  <div className="bg-amber-50 rounded-2xl p-5 text-center border border-amber-100">
                    <div className="text-3xl font-bold text-amber-700">{result.chicken} kg</div>
                    <div className="text-sm text-gray-600 mt-1">Frango</div>
                  </div>
                )}
                {includeSausage && (
                  <div className="bg-orange-50 rounded-2xl p-5 text-center border border-orange-100">
                    <div className="text-3xl font-bold text-orange-700">{result.sausage} kg</div>
                    <div className="text-sm text-gray-600 mt-1">Linguiça / Suíno</div>
                  </div>
                )}
                <div className="bg-gray-900 rounded-2xl p-5 text-center col-span-2">
                  <div className="text-3xl font-bold text-white">{result.total} kg</div>
                  <div className="text-sm text-gray-400 mt-1">Total estimado</div>
                </div>
              </div>

              {/* Sugestões */}
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Sugestões de cortes bovinos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CUTS_BBQ.map((c) => (
                      <span key={c} className="tag bg-vinho-50 text-vinho-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {includeChicken && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Sugestões de cortes de frango
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CUTS_CHICKEN.map((c) => (
                        <span key={c} className="tag bg-amber-50 text-amber-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {includeSausage && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Sugestões de embutidos / suínos
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CUTS_SAUSAGE.map((c) => (
                        <span key={c} className="tag bg-orange-50 text-orange-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 bg-vinho-700 rounded-2xl p-6 text-center">
                <p className="text-white font-semibold mb-4">
                  Quer comprar para sua empresa, evento ou estabelecimento?<br />
                  Fale com a Royal Alimentos.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/seja-cliente" className="bg-white text-vinho-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-sm">
                    Quero ser cliente
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href="https://wa.me/5500000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-white text-sm px-5 py-2.5"
                  >
                    Solicitar cotação
                  </a>
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full mt-4 flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 text-sm py-2 transition-colors"
              >
                <RotateCcw size={14} />
                Calcular novamente
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
