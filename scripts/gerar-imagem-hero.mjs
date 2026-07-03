import Replicate from 'replicate'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

function loadEnv() {
  const envPath = path.join(root, '.env')
  if (!fs.existsSync(envPath)) {
    console.error('Arquivo .env nao encontrado. Rode: cp .env.example .env  e cole seu token da Replicate.')
    process.exit(1)
  }
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const value = trimmed.slice(idx + 1).trim()
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnv()

const token = process.env.REPLICATE_API_TOKEN
if (!token) {
  console.error('REPLICATE_API_TOKEN nao definido no .env')
  process.exit(1)
}

const defaultPrompt =
  'professional photograph of premium cuts of beef displayed in an elegant cold storage / butcher showroom, ' +
  'sophisticated environment, studio lighting, shallow depth of field, high-end food distributor branding, ' +
  'realistic, high resolution, no text, no watermark'

const prompt = process.argv[2] || defaultPrompt

const replicate = new Replicate({ auth: token })

console.log('Gerando imagem com Replicate (black-forest-labs/flux-1.1-pro)...')
console.log(`Prompt: ${prompt}`)

const output = await replicate.run('black-forest-labs/flux-1.1-pro', {
  input: {
    prompt,
    aspect_ratio: '16:9',
    output_format: 'jpg',
    output_quality: 90,
  },
})

const url = Array.isArray(output) ? output[0] : output
const res = await fetch(url)
if (!res.ok) {
  console.error(`Falha ao baixar imagem gerada: ${res.status} ${res.statusText}`)
  process.exit(1)
}
const buffer = Buffer.from(await res.arrayBuffer())

const outDir = path.join(root, 'public', 'images')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'hero-bg.jpg')
fs.writeFileSync(outPath, buffer)

console.log(`Imagem salva em: ${outPath}`)
console.log('Atualize HERO_BG_IMAGE em src/components/home/HeroBanner.tsx para: "/images/hero-bg.jpg"')
