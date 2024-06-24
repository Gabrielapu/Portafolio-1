export const state = () => ({
  stages: [],
});

export const getters = {
  getStages: (state) => state.stages,
};
export const mutations = {
  setStages(state, stages) {
    state.stages = stages;
  },
};
export const actions = {
  async fetchStages({ commit, dispatch }, planificationId) {
    const url = `planstage/?plan=${planificationId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setStages', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener etapas por planificación', { root: true })
      return error;
    }
  },
};