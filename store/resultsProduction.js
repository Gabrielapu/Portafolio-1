export const state = () => ({
  allProductionResults: []
});

export const getters = {
  getAllProductionResults: (state) => state.allProductionResults
};
export const mutations = {
  setAllProductionResults(state, allProductionResults) {
    state.allProductionResults = allProductionResults
  }
};
export const actions = {
  async fetchAllProductionData({ commit, dispatch }, planificationId) {
    const url = `productionresults/${planificationId}/get_list_productions/`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setAllProductionResults', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener resultados de producción', { root: true })
      return error;
    }
  },
  async fetchActivitiesByBatches({ commit, dispatch }, { planificationId, batches, day, hour}) {
    const url = 
      `productionresults/${planificationId}/get_list_productions_replaning/?day=${day}&hour=${hour}`
    try {
      const { data } = await this.$axios.post(url, { batchs: batches });
      if (data) return data
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener actividades por batches', { root: true })
      return error;
    }
  }
};