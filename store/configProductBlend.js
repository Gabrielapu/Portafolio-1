export const state = () => ({
  productBlendByConfig: [],
});

export const getters = {
  getProductBlendByConfig: (state) => state.productBlendByConfig,
};
export const mutations = {
  setProductBlendByConfig(state, productBlendByConfig) {
    state.productBlendByConfig = productBlendByConfig;
  },
};
export const actions = {
  async fetchProductBlendByConfig({ commit, dispatch }, configId) {
    const url = `configproduct_blend/?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setProductBlendByConfig', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener mezclas de una configuración', { root: true })
      return error;
    }
  },
  async saveProductBlend({ dispatch }, productBlend) {
    try {
      if(productBlend.id) {
        await this.$axios.patch(`configproduct_blend/${productBlend.id}/`, productBlend)
        return;
      }
      await this.$axios.post('configproduct_blend/', productBlend)
    } catch (error) {
      dispatch(
        'errors/setError', 'Error al guardar producto - mezcla', 
        { root: true }
      )
      return error;
    }
  },
  async deleteProductBlend({ dispatch }, productBlendId ) {
    try {
      await this.$axios.delete(`configproduct_blend/${productBlendId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar producto - mezcla', { root: true })
      return error;
    }
  }
};