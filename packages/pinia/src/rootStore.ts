import type { App, EffectScope, InjectionKey } from 'vue-demi'

// eslint-disable-next-line import/no-mutable-exports
export let activePinia: Pinia | undefined

export const setActivePinia: (pinia: Pinia) => void = pinia => (activePinia = pinia)

export interface Pinia {
  plugins: PiniaPlugin[]
  use(pugin: PiniaPlugin): void
  install: (app: App) => void
  app: App | null
  scope: EffectScope
  store: Map<string, any>
  state: any
}

export const piniaSymbol = Symbol('pinia') as InjectionKey<Pinia>

export interface PiniaPlugin { }
