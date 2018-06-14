/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config 添加一个只读的config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue
   

  /**
   * 将 builtInComponents 的属性混合到 Vue.options.components 中
   */
  extend(Vue.options.components, builtInComponents)

  /**
     * components:Object.create(null)
     * directives:Object.create(null)
     * filters:Object.create(null)
     * _base:Vue
     * components:{
     *    KeepAlive
     * }
     */

  initUse(Vue)
  //Vue.use
  initMixin(Vue)
  //Vue.mixin
  initExtend(Vue)
  //Vue.extend
  initAssetRegisters(Vue)
  //Vue.component
  //Vue.directive
  //Vue.filter
}
