import { hasInjectionContext, inject } from 'vue-demi'
import { type Pinia, activePinia, piniaSymbol, setActivePinia } from './rootStore'

function createSetupStore<Id extends string, SS>(
  $id: Id,
  setup: () => SS,
  pinia: Pinia,
) {

}
export function defineStore<Id extends string, SS>(
  id: Id,
  storeSetup: () => SS,
) {
  if (__DEV__ && typeof id !== 'string')
    throw new Error('[🍍]: id passed to defineStore must be a string')

  function useStore(pinia?: Pinia | null) {
    const hasContext = hasInjectionContext()
    pinia = pinia || (hasContext && (inject(piniaSymbol, null)))
    if (pinia)
      setActivePinia(pinia)

    if (__DEV__ && !pinia)
      throw new Error('[🍍]: pinia not installed. Did you forget to call app.use(pinia)?')

    pinia = activePinia
    if (pinia.store.has(id)) {
      createSetupStore(id, storeSetup, pinia)
      if (__DEV__)
        // @ts-expect-error: not the right inferred type
        useStore._pinia = pinia
    }
  }

  return useStore
}
