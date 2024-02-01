import type { EffectScope } from 'vue-demi'
import { effectScope, hasInjectionContext, inject, reactive } from 'vue-demi'
import { type Pinia, activePinia, piniaSymbol, setActivePinia } from './rootStore'
import type { StateTree, Store, StoreGeneric, _StoreWithState } from './types'

const fallbackRunWithContext = <T>(fn: () => T) => fn()

const { assign } = Object

function createSetupStore<
  Id extends string, SS extends Record<any, unknown>,
  S extends StateTree,
>(
  $id: Id,
  setup: () => SS,
  pinia: Pinia,
): Store<Id, S> {
  let scope!: EffectScope

  if (__DEV__ && !pinia.scope.active)
    throw new Error('pina destroyed')

  // let isListening: boolean
  // let isSyncLinstening: boolean
  // let subscriptions: any
  // const initialState = pinia.state.value[$id]

  pinia.state.value[$id] = {}

  function $reset() {

  }

  function $dispose() {

  }

  const partialStore = {
    pinia,
    $id,
    $reset,
    $dispose,
  } as unknown as _StoreWithState<Id, S>

  const store: Store<Id, S> = reactive(partialStore) as Store<Id, S>
  // 设置到store上
  pinia.store.set($id, store)
  // https://cn.vuejs.org/api/application.html#app-runwithcontext
  const runWithContext
    = (pinia.app && pinia.app.runWithContext) || fallbackRunWithContext
  // 在当前上下文下运行
  // 在pinia总的scope下获取该store的scope
  // run steup函数捕获store中所有的响应式数据一起处理
  // 拿到的值相当于是store retturn的值
  const setupStore = runWithContext(() =>
    pinia.scope.run(() => (scope = effectScope()).run(setup)!),
  )!

  for (const key of Object.keys(setupStore)) {
    const prop = setupStore[key]
    pinia.state.value[$id][key] = prop
    // store.$state[key] = prop
  }

  assign(store, setupStore)

  pinia.plugins.forEach((cb) => {
    assign(store, scope.run(() => {
      cb({
        store,
        app: pinia.app,
        pinia,
      })
    }))
  })

  return store
}

export function defineStore<Id extends string, SS extends Record<any, unknown>>(
  id: Id,
  storeSetup: () => SS,
) {
  if (__DEV__ && typeof id !== 'string')
    throw new Error('[🍍]: id passed to defineStore must be a string')

  function useStore(pinia?: Pinia | null): StoreGeneric {
    const hasContext = hasInjectionContext()
    pinia = pinia || (hasContext ? (inject(piniaSymbol, null)) : null)
    if (pinia)
      setActivePinia(pinia)

    if (__DEV__ && !pinia)
      throw new Error('[🍍]: pinia not installed. Did you forget to call app.use(pinia)?')

    pinia = activePinia!
    if (pinia.store.has(id)) {
      createSetupStore(id, storeSetup, pinia)
      if (__DEV__)
        // @ts-expect-error: not the right inferred type
        useStore._pinia = pinia
    }
    const store = pinia.store.get(id)!

    return store
  }

  useStore.$id = id
  return useStore
}
