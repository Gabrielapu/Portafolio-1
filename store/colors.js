export const state = () => ({
  colors: [],
});

export const getters = {
  getColors: (state) => state.colors
};
export const mutations = {
  setColors(state, colors) {
    state.colors = colors;
  }
};
export const actions = {
  async fetchColors({ commit, dispatch }) {
    const url = 'color'
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setColors', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener colores', { root: true })
      return error;
    }
  },
};