export const state = () => ({
  wash: [],
  washTypes: []
});

export const getters = {
  getWash: (state) => state.wash,
  getWashTypes: (state) => state.washTypes
};
export const mutations = {
  setWash(state, wash) {
    state.wash = wash;
  },
  setWashTypes(state, washTypes) {
    state.washTypes = washTypes;
  }
};
export const actions = {
  async fetchWashByConfig({ commit, dispatch }, configId) {
    const url = `configwashed/?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setWash', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener lavados por configuración', { root: true })
      return error;
    }
  },
  async fetchWashTypes({ commit, dispatch }, configId) {
    const url = `configtypewashed/${configId}/get_list_type_washeds`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setWashTypes', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener tipos de lavado', { root: true })
      return error;
    }
  },
  async deleteWash({ dispatch }, washId ) {
    try {
      await this.$axios.delete(`configwashed/${washId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar lavado', { root: true })
      return error;
    }
  },
  async saveWash({ dispatch }, wash) {
    try {
      if(wash.id) {
        await this.$axios.patch(`configwashed/${wash.id}/`, wash)
        return;
      }
      await this.$axios.post('configwashed/', wash)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar lavado', { root: true })
      return error;
    }
  },
};