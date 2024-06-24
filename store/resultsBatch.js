export const state = () => ({
  batchResults: [],
  batchList: [],
  replanningBatchResults: []
});

export const getters = {
  getBatchResults: (state) => state.batchResults,
  getReplanningBatchResults: (state) => state.replanningBatchResults,
  getBatchList: (state) => state.batchList
};
export const mutations = {
  setBatchResults(state, batchResults) {
    state.batchResults = batchResults;
  },
  setBatchList(state, batchList) {
    state.batchList = batchList
  },
  setReplanningBatchResults(state, replanningBatchResults) {
    state.replanningBatchResults = replanningBatchResults;
  }
};
export const actions = {
  async fetchBatchResults({ commit, dispatch }, planificationId) {
    const url = `batchresults/${planificationId}/get_batch_plan_list/`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setBatchResults', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener plan de batches', { root: true })
      return error;
    }
  },
  async fetchReplanningBatchList({ commit, dispatch }, { planificationId, hour, day }) {
    const url = 
      `batchresults/${planificationId}/get_batch_plan_list_replanning?day=${day}&hour=${hour}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setReplanningBatchResults', data);
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error al obtener plan de batches para replanificacion', 
        { root: true }
      )
      return error;
    }
  },
  async fetchBatchList({ commit, dispatch }, planificationId) {
    const url = `batchresults/${planificationId}/get_batch_list/`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setBatchList', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener lista de batches', { root: true })
      return error;
    }
  },
};