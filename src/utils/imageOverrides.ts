import type { Product } from '../types'
import { products as defaultProducts } from '../data/products'

const OVERRIDES_KEY = 'rc_img_overrides'
const CHANGE_EVENT  = 'rc_overrides_changed'

export type ImageOverrides = Record<string, string>

export function getImageOverrides(): ImageOverrides {
  try {
    return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}')
  } catch {
    return {}
  }
}

export function setImageOverride(productId: string, url: string): void {
  const overrides = getImageOverrides()
  if (url.trim()) {
    overrides[productId] = url.trim()
  } else {
    delete overrides[productId]
  }
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function clearImageOverride(productId: string): void {
  const overrides = getImageOverrides()
  delete overrides[productId]
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function clearAllOverrides(): void {
  localStorage.removeItem(OVERRIDES_KEY)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** Retorna todos os produtos com overrides do admin aplicados */
export function getProductsWithOverrides(): Product[] {
  const overrides = getImageOverrides()
  return defaultProducts.map(p => ({
    ...p,
    image: overrides[p.id] || p.image,
  }))
}

/** Hook que escuta mudanças em tempo real */
export { CHANGE_EVENT }
