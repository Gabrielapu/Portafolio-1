export const state = () => ({
  configAreas: [],
  configAreaDetail: {}
});

export const getters = {
  getConfigAreas: (state) => state.configAreas,
  areaDetail: (state) => state.configAreaDetail
};
export const mutations = {
  setConfigAreas(state, configAreas) {
    state.configAreas = configAreas;
  },
  setConfigAreaDetail(state, configAreaDetail) {
    state.configAreaDetail = configAreaDetail;
  }
};
export const actions = {
  async fetchConfigAreas({ commit, dispatch }, configId) {
    const url = configId ? `configarea?config=${configId}` : 'configarea/'
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setConfigAreas', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener areas por configuración', { root: true })
      return error;
    }
  },
  async fetchConfigArea({ commit, dispatch }, configAreaId) {
    try {
      const { data } = await this.$axios.get(`configarea/${configAreaId}`);
      if (data) commit('setConfigAreaDetail', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener areas', { root: true })
      return error;
    }
  },
  async editAreaDetail({ dispatch }, areaDetail) {
    try {
      await this.$axios.patch(`configarea/${areaDetail.id}/`, areaDetail);
    } catch (error) {
      dispatch('errors/setError', 'Error al editar detalle de area', { root: true })
      return error;
    }
  },
};