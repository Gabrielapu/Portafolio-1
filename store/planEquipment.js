export const state = () => ({
  equipment: [],
});

export const getters = {
  getEquipment: (state) => state.equipment.filter(({name}, index, self) =>
    index === self.findIndex((item) => (item.name === name)
  )) // TODO: Quitar filtrado al pasar a prod
};
export const mutations = {
  setEquipment(state, equipment) {
    state.equipment = equipment;
  },
};
export const actions = {
  async fetchPlanEquipment({ commit, dispatch }) {
    const url = 'planequipment'
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setEquipment', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener equipos', { root: true })
      return error;
    }
  },
};