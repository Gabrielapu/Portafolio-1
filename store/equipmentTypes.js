export const state = () => ({
  equipmentTypes: [],
});

export const getters = {
  getEquipmentTypes: (state) => state.equipmentTypes
};
export const mutations = {
  setEquipmentTypes(state, equipmentTypes) {
    state.equipmentTypes = equipmentTypes;
  }
};
export const actions = {
  async fetchEquipmentTypes({ commit, dispatch }) {
    const url = `equipmenttypes/get_equipment_types`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setEquipmentTypes', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener tipos de equipos', { root: true })
      return error;
    }
  },
};