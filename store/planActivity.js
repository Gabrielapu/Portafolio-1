export const state = () => ({
  activities: [],
});

export const getters = {
  getActivitiesList: (state) => state.activities
};
export const mutations = {
  setActivities(state, activities) {
    state.activities = activities;
  }
};
export const actions = {
  async fetchPlanActivitiesList({ commit, dispatch }, planificationId) {
    const url = `planactivity/${planificationId}/activities_replanning`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setActivities', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener actividades', { root: true })
      return error;
    }
  },
};