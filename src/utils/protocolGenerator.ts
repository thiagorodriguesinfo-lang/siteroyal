export function gerarProtocolo(): string {
  const now = new Date()
  const ano = now.getFullYear()
  const mes = String(now.getMonth() + 1).padStart(2, '0')
  const aleatorio = String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0')
  return `RC-${ano}-${mes}-${aleatorio}`
}
