import { effectScope, markRaw } from 'vue-demi'
import { type Pinia, piniaSymbol, setActivePinia } from './rootStore'

export function createPinia() {
  const scope = effectScope(true)

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
    state: null,
  })

  return pinia
}

export function disposePina(pinia: Pinia) {
  pinia.scope.stop()
  pinia.store.clear()
  pinia.plugins.length = 0
  pinia.app = null
}
