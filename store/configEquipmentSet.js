export const state = () => ({
  equipmentSet: [],
  simpleEquipmentSet: []
});

export const getters = {
  getEquipmentSet: (state) => state.equipmentSet,
  getSimpleEquipmentSet: (state => state.simpleEquipmentSet),
  getSetCodes: (state) => state.equipmentSet.map(set => set.code)
};
export const mutations = {
  setEquipmentSet(state, equipmentSet) {
    state.equipmentSet = equipmentSet;
  },
  setSimpleEquipmentSet(state, simpleEquipmentSet) {
    state.simpleEquipmentSet = simpleEquipmentSet
  }
};
export const actions = {
  async fetchEquipmentSet({ commit, dispatch }, configId) {
    const url = `configequipmentset?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setEquipmentSet', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener set de equipos', { root: true })
      return error;
    }
  },
  async fetchSimpleEquipmentSet({ commit, dispatch }, filters) {
    const url = 'configequipmentset/list_simple/'
    try {
      const { data } = await this.$axios.post(url, filters);
      if (data) commit('setSimpleEquipmentSet', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener lista simple de set de equipos', { root: true })
      return error;
    }
  },
  async saveEquipmentSet({ dispatch }, equipmentSet) {
    try {
      if(equipmentSet.id) {
        await this.$axios.patch(`configequipmentset/${equipmentSet.id}/`, equipmentSet)
        return;
      }
      await this.$axios.post('configequipmentset/', equipmentSet)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar set de equipo', { root: true })
      return error;
    }
  },
  async deleteEquipmentSet({ dispatch }, equipmentSet ) {
    try {
      await this.$axios.delete(`configequipmentset/${equipmentSet}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar set de equipo', { root: true })
      return error;
    }
  }
};