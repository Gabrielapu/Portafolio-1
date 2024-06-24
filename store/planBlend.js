export const state = () => ({
  blends: [],
});

export const getters = {
  getBlends: (state) => state.blends.filter(({name}, index, self) => 
    index === self.findIndex((item) => (item.name === name)
  )) // TODO: Quitar filtrado al pasar a prod
};
export const mutations = {
  setBlends(state, blends) {
    state.blends = blends;
  }
};
export const actions = {
  async fetchBlends({ commit }, planificationId) {
    const url = `planblend/?plan=${planificationId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setBlends', data);
    } catch (error) {
      return error;
    }
  },
};