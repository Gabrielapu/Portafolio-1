export const state = () => ({
  kpiResults: [],
});

export const getters = {
  getKpiResults: (state) => state.kpiResults,
};
export const mutations = {
  seKpiResults(state, kpiResults) {
    state.kpiResults = kpiResults;
  },
};
export const actions = {
  async fetchKpiResults({ commit, dispatch }, planificationId) {
    const url = `kpiresults/?plan=${planificationId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('seKpiResults', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener indicadores (kpi)', { root: true })
      return error;
    }
  },
};