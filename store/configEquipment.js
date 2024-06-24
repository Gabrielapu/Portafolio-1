export const state = () => ({
  equipment: [],
  oneEquipmentData: {},
  simpleEquipment: []
});

export const getters = {
  getEquipment: (state) => state.equipment,
  getOneQuipmentData: (state) => state.oneEquipmentData,
  getSimpleEquipment: (state) => state.simpleEquipment
};
export const mutations = {
  setEquipment(state, equipment) {
    state.equipment = equipment;
  },
  setOneEquipmnetData(state, oneEquipmentData) {
    state.oneEquipmentData = oneEquipmentData
  },
  setSimpleEquipment(state, simpleEquipment) {
    state.simpleEquipment = simpleEquipment
  }
};
export const actions = {
  async fetchEquipment({ commit, dispatch }, configId) {
    const url = `configequipment?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setEquipment', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener equipos', { root: true })
      return error;
    }
  },
  async fetchOneEquipmentData({ commit, dispatch }, equipmentId) {
    const url = `configequipment/${equipmentId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setOneEquipmnetData', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener equipo', { root: true })
      return error;
    }
  },
  async fetchSimpleEquipment({ commit, dispatch }, filters) {
    try {
      const { data } = await this.$axios.post('configequipment/list_simple/', filters);
      if (data) commit('setSimpleEquipment', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener lista simple de equipos', { root: true })
      return error;
    }
  },
  async deleteEquipment({ dispatch }, equipmentId ) {
    try {
      await this.$axios.delete(`configequipment/${equipmentId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar equipo', { root: true })
      return error;
    }
  },
  async saveEquipment({ dispatch }, equipment) {
    try {
      if(equipment.id) {
        await this.$axios.patch(`configequipment/${equipment.id}/`, equipment)
        return;
      }
      await this.$axios.post('configequipment/', equipment)
    } catch (error) {
      dispatch(
        'errors/setError', 'Error al guardar equipo', 
        { root: true }
      )
      return error;
    }
  },
};