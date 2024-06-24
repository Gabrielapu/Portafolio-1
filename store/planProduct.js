export const state = () => ({
  productsByPlan: [],
});

export const getters = {
  getProductsByPlan: (state) => state.productsByPlan
  .map(product => ({
    ...product,
    full_name: `${product.code} - ${product.name}`
  })),
};
export const mutations = {
  setProductsByPlan(state, productsByPlan) {
    state.productsByPlan = productsByPlan;
  },
};
export const actions = {
  async fetchProductsByPlan({ commit, dispatch }, planificationId) {
    const url = `planproduct/?plan=${planificationId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setProductsByPlan', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener productos por planificación', { root: true })
      return error;
    }
  },
};