import type { Ref } from 'vue-demi'
import { effectScope, markRaw, ref } from 'vue-demi'
import { type Pinia, piniaSymbol, setActivePinia } from './rootStore'
import type { StateTree } from './types'

export function createPinia() {
  // 创建一个effectScope
  // 提供管理和隔离响应式数据的能力
  const scope = effectScope(true)
  // 在创建的 effectScope 中运行一个函数，这个函数返回了一个对象
  const state = scope.run<Ref<Record<string, StateTree>>>(() =>
    ref<Record<string, StateTree>>({}),
  )!
  const plugins: Pinia['plugins'] = []
  // 标记不能变为响应式数据
  const pinia: Pinia = markRaw({
    install(app) {
      setActivePinia(pinia)
      // 关联vue应用实例
      pinia.app = app
      // 提供一个全局的pinia实例
      app.provide(piniaSymbol, pinia)
    },
    use(plugin) {
      // 添加插件
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
