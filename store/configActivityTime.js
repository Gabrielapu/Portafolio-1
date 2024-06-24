export const state = () => ({
  timePerActivityItems: [],
});

export const getters = {
  getActivityTime: (state) => state.timePerActivityItems
};
export const mutations = {
  setConfigActivity(state, timePerActivityItems) {
    state.timePerActivityItems = timePerActivityItems;
  }
};
export const actions = {
  async fetchActivityTime({ commit, dispatch }, profileId) {
    const url = `configactivitytime?configprofile=${profileId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setConfigActivity', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener tiempo por actividad', { root: true })
      return error;
    }
  },
  async deleteActivityTime({ dispatch }, activityTimeId ) {
    try {
      await this.$axios.delete(`configactivitytime/${activityTimeId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar tiempo por actividad', { root: true })
      return error;
    }
  },
  async saveActivityTime({ dispatch }, activityTime) {
    try {
      if(activityTime.id) {
        await this.$axios.patch(`configactivitytime/${activityTime.id}/`, activityTime)
        return;
      }
      await this.$axios.post('configactivitytime/', activityTime)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar tiempo por actividad', { root: true })
      return error;
    }
  },
};