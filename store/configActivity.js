export const state = () => ({
  activities: [],
  simpleActivities: []
});

export const getters = {
  getActivities: (state) => state.activities,
  getSimpleActivities: (state) => state.simpleActivities
};
export const mutations = {
  setActivities(state, activities) {
    state.activities = activities;
  },
  setSimpleActivities(state, simpleActivities) {
    state.simpleActivities = simpleActivities
  }
};
export const actions = {
  async fetchActivities({ commit, dispatch }, profileId) {
    const url = `configactivity?configprofile=${profileId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setActivities', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener actividades', { root: true })
      return error;
    }
  },
  async fetchSimpleActivities({ commit, dispatch }, filters) {
    const url = '/configactivity/list_simple/'
    try {
      const { data } = await this.$axios.post(url, filters);
      if (data) commit('setSimpleActivities', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener lista simple de actividades', { root: true })
      return error;
    }
  },
  async deleteActivity({ dispatch }, activityId ) {
    try {
      await this.$axios.delete(`configactivity/${activityId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar actividad', { root: true })
      return error;
    }
  },
  async saveActivity({ dispatch }, activity) {
    try {
      if(activity.id) {
        await this.$axios.patch(`configactivity/${activity.id}/`, activity)
        return;
      }
      await this.$axios.post('configactivity/', activity)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar actividad', { root: true })
      return error;
    }
  },
};