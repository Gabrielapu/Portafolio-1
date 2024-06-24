export const state = () => ({
  ganttData: [],
});

export const getters = {
  getGanttData: (state) => state.ganttData
};
export const mutations = {
  setGanttData(state, ganttData) {
    state.ganttData = ganttData;
  }
};
export const actions = {
  async fetchGanttData({ commit, dispatch }, { planificationId, areaId }) {
    const url = `ganttchart/${planificationId}/get_data_gantt?area=${areaId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setGanttData', data);
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error al obtener obtener datos para la carga gantt', 
        { root: true }
      )
      return error;
    }
  },
};