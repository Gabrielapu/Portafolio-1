export const state = () => ({
  tags: [],
});

export const getters = {
  getTags: (state) => state.tags
};
export const mutations = {
  setTags(state, tags) {
    state.tags = tags;
  }
};
export const actions = {
  async fetchConfigTags({ commit, dispatch }) {
    const url = 'configtag'
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setTags', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener etiquetas de configuración', { root: true })
      return error;
    }
  },
};