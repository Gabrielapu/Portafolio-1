export const state = () => ({
  equipmentUnits: [],
});

export const getters = {
  getEquipmentUnits: (state) => state.equipmentUnits
};
export const mutations = {
  setEquipmentUnits(state, equipmentUnits) {
    state.equipmentUnits = equipmentUnits;
  }
};
export const actions = {
  async fetchEquipmentUnits({ commit, dispatch }) {
    const url = `equipmentunits/get_equipment_units`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setEquipmentUnits', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener unidades de equipos', { root: true })
      return error;
    }
  },
};