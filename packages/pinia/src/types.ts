import type { UnwrapRef } from 'vue-demi'
import type { Pinia } from './rootStore'

export type StateTree = Record<string | number | symbol, any>

export interface PiniaCustomProperties<Id extends string = string, S extends StateTree = StateTree> { }

export interface PiniaCustomStateProperties<S extends StateTree = StateTree> { }

export type Store<Id extends string = string, S extends StateTree = {}> =
  _StoreWithState<Id, S> & UnwrapRef<S> & PiniaCustomProperties<Id, S> & PiniaCustomStateProperties<S>

export interface _StoreWithState<
  Id extends string,
  S extends StateTree,
> extends StoreProperties<Id> {
  $state: UnwrapRef<S> & PiniaCustomStateProperties<S>
}

export interface StoreProperties<Id extends string> {
  $id: Id
  pinia: Pinia
}

export type StoreGeneric = Store<string, StateTree>
