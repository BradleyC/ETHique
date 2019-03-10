import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
import econ from './econ'
import twitter from './twitter'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: false,
  modules: {
    econ: econ,
    twitter: twitter
  }
})
