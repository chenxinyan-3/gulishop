import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state={}
const mutations={}
const actions={}
const getters={}

import home from './home'
import users from './users'
import search from './search'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
   // 第五个核心概念
    // 合并每个小模块的store到大的store
    modules:{
        home,
        users,
        search
    }
})