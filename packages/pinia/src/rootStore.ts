import type { App, EffectScope, InjectionKey, Ref } from 'vue-demi'
import type { StateTree, StoreGeneric } from './types'

// eslint-disable-next-line import/no-mutable-exports
export let activePinia: Pinia | undefined

export const setActivePinia: (pinia: Pinia) => void = pinia => (activePinia = pinia)

export interface Pinia {
  plugins: PiniaPlugin[]
  use(pugin: PiniaPlugin): void
  install: (app: App) => void
  app: App | null
  scope: EffectScope
  store: Map<string, StoreGeneric>
  state: Ref<Record<string, StateTree>>
}

export const piniaSymbol = Symbol('pinia') as InjectionKey<Pinia>

export type PiniaPlugin = (context: any) => void
