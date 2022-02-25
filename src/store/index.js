import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityName: '',
    
  },
  mutations: {
    setCityName(state,newValue){
      state.cityName = newValue;
    }
  },
  actions: {},
  getters: {},
  modules: {},
});
