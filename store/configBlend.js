export const state = () => ({
  blends: [],
  simpleBlends: []
});

export const getters = {
  getBlends: (state) => state.blends
    .map(blend => ({
      ...blend,
      active: false
    })),
  getSimpleBlends: (state) => state.simpleBlends
};
export const mutations = {
  setBlends(state, blends) {
    state.blends = blends;
  },
  setSimpleBlends(state, simpleBlends) {
    state.simpleBlends = simpleBlends
  }
};
export const actions = {
  async fetchBlends({ commit, dispatch }, configId) {
    const url = `configblend?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setBlends', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener mezclas', { root: true })
      return error;
    }
  },
  async fetchSimpleBlends({ commit, dispatch }, filters) {
    try {
      const { data } = await this.$axios.post('configblend/list_simple/', filters);
      if (data) commit('setSimpleBlends', data);
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error al obtener lista simple de mezclas', 
        { root: true }
      )
      return error;
    }
  },
  async deleteBlend({ dispatch }, blendId ) {
    try {
      await this.$axios.delete(`configblend/${blendId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar mezcla', { root: true })
      return error;
    }
  },
  async saveBlend({ dispatch }, blend) {
    try {
      if(blend.id) {
        await this.$axios.patch(`configblend/${blend.id}/`, blend)
        return;
      }
      await this.$axios.post('configblend/', blend)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar mezcla', { root: true })
      return error;
    }
  },
};