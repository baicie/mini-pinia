import type { Ref } from 'vue-demi'
import { effectScope, markRaw, ref } from 'vue-demi'
import { type Pinia, piniaSymbol, setActivePinia } from './rootStore'
import type { StateTree } from './types'

export function createPinia() {
  const scope = effectScope(true)
  const state = scope.run<Ref<Record<string, StateTree>>>(() =>
    ref<Record<string, StateTree>>({}),
  )!
  const plugins: Pinia['plugins'] = []
  // 标记不能变为响应式数据
  const pinia: Pinia = markRaw({
    install(app) {
      setActivePinia(pinia)
      pinia.app = app
      app.provide(piniaSymbol, pinia)
    },
    use(plugin) {
      plugins.push(plugin)
    },
    plugins,
    app: null,
    scope,
    store: new Map<string, any>(),
    state,
  })

  return pinia
}

export function disposePina(pinia: Pinia) {
  pinia.scope.stop()
  pinia.store.clear()
  pinia.plugins.length = 0
  pinia.app = null
}
