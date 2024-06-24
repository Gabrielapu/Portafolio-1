export const state = () => ({
    planTagList: [],
  });
  
export const getters = {
  getPlanTags: (state) => state.planTagList,
  getPlanTagListForSelect(state) {
    return state.planTagList.map((planTag) => ({
      value: planTag.id,
      text: planTag.name,
    }));
  },
};
export const mutations = {
  set(state, newPlanTagList) {
    state.planTagList = newPlanTagList;
  }
};
export const actions = {
  async fetchPlanTags({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('plantag/');
      if (data) commit('set', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener etiquetas de planificación', { root: true })
      return error;
    }
  },
};