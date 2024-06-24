export const state = () => ({
  planAreas: [],
});

export const getters = {
  getPlanAreas: (state) => state.planAreas
};
export const mutations = {
  sePlanAreas(state, planAreas) {
    state.planAreas = planAreas;
  }
};
export const actions = {
  async fetchPlanAreas({ commit, dispatch }, planificationId) {
    const url = `planarea?plan=${planificationId}`;
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('sePlanAreas', data);
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error al obtener areas de una planificación', 
        { root: true }
      )
      return error;
    }
  },
};