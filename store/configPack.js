export const state = () => ({
  packs: [],
});

export const getters = {
  getPacks: (state) => state.packs
};
export const mutations = {
  setPacks(state, packs) {
    state.packs = packs;
  }
};
export const actions = {
  async fetchConfigPacks({ commit, dispatch }, configId) {
    const url = `configpack_product/?config=${configId}`;
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setPacks', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener packs', { root: true })
      return error;
    }
  },
  async savePack({ dispatch }, pack) {
    try {
      if(pack.id) {
        await this.$axios.patch(`configpack_product/${pack.id}/`, pack)
        return;
      }
      await this.$axios.post('configpack_product/', pack)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar pack', { root: true })
      return error;
    }
  },
  async deletePack({ dispatch }, pack ) {
    try {
      await this.$axios.delete(`configpack_product/${pack}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar pack', { root: true })
      return error;
    }
  }
};