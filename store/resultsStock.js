export const state = () => ({
  stockResults: [],
});

export const getters = {
  getStockResults: (state) => state.stockResults,
};
export const mutations = {
  setStockResults(state, stockResults) {
    state.stockResults = stockResults;
  },
};
export const actions = {
  async fetchStockResults({ commit, dispatch }, productId) {
    const url = `stockresults/${productId}/get_formatted_data/`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setStockResults', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener resultados de inventario', { root: true })
      return error;
    }
  },
};