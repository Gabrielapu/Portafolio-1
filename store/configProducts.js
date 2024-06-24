export const state = () => ({
  finalProducts: [],
  allProducts: [],
  productsByConfig: [],
  simpleProducts: [],
  usefulLifeProductList: []
});

export const getters = {
  getFinalProducts: (state) => state.finalProducts,
  getProductSkus: (state) => state.finalProducts.map(product => product.code) ,
  getAllProducts: (state) => state.allProducts
    .map(product => ({
      ...product,
      full_name: `${product.code} - ${product.name}`
    })),
  getProductsByConfig: (state) => state.productsByConfig,
  getSimpleProducts: (state) => state.simpleProducts,
  getUsefulLifeProductList: (state) => state.usefulLifeProductList
};
export const mutations = {
  setFinalProducts(state, finalProducts) {
    state.finalProducts = finalProducts;
  },
  setAllProducts(state, allProducts) {
    state.allProducts = allProducts
  },
  setProductsByConfig(state, productsByConfig) {
    state.productsByConfig = productsByConfig
  },
  setSimpleProducts(state, simpleProducts) {
    state.simpleProducts = simpleProducts
  },
  setfetchUsefulLifeProductList(state, usefulLifeProductList) {
    state.usefulLifeProductList = usefulLifeProductList
  }
};
export const actions = {
  async fetchFinalProducts({ commit, dispatch }, configId) {
    const url = `configproduct?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setFinalProducts', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener productos finales', { root: true })
      return error;
    }
  },
  async fetchAllProducts({ commit, dispatch }) {
    const url = `configproduct`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setAllProducts', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener los productos', { root: true })
      return error;
    }
  },
  async fetchProductsByConfig({ commit, dispatch }, configId) {
    const url = `configproduct?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setProductsByConfig', data);
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error al obtener productos por configuración', 
        { root: true }
      )
      return error;
    }
  },
  async fetchSimpleProducts({ commit, dispatch }, filters) {
    try {
      const { data } = await this.$axios.post('configproduct/list_simple/', filters);
      if (data) commit('setSimpleProducts', data);
      return data
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error al obtener lista simple de productos', 
        { root: true }
      )
      return error;
    }
  },
  async saveFinalProduct({ dispatch }, product) {
    try {
      if(product.id) {
        await this.$axios.patch(`configproduct/${product.id}/`, product)
        return;
      }
      await this.$axios.post('configproduct/', product)
    } catch (error) {
      dispatch(
        'errors/setError', 'Error al guardar cambios del producto', 
        { root: true }
      )
      return error;
    }
  },
  async deleteFinalProduct({ dispatch }, productId ) {
    try {
      await this.$axios.delete(`configproduct/${productId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar producto', { root: true })
      return error;
    }
  },
  async fetchUsefulLifeProductList({ commit, dispatch }, configId) {
    const url = `configproduct/${configId}/useful_life_product_list`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setfetchUsefulLifeProductList', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener vida útil de productos', { root: true })
      return error;
    }
  },
};