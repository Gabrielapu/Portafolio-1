export const state = () => ({
    planGroupList: [],
    planGroupNameColors: [],
  });
  
export const getters = {
  getPlanGroups: (state) => state.planGroupList,
  getPlanGroupListForSelect(state) {
    return state.planGroupList.map((planGroup) => ({
      value: planGroup.id,
      text: planGroup.name,
    }));
  }
};
export const mutations = {
  set(state, newPlanGroupList) {
    state.planGroupList = newPlanGroupList;
  }
};
export const actions = {
  async fetchPlanGroups({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('plangroup/');
      if (data) commit('set', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener grupos de planificaciones', { root: true })
      return error;
    }
  },
};