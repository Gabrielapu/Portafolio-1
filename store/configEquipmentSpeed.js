export const state = () => ({
  equipmentSpeed: [],
});

export const getters = {
  getEquipmentSpeed: (state) => state.equipmentSpeed
};
export const mutations = {
  setEquipmentSpeed(state, equipmentSpeed) {
    state.equipmentSpeed = equipmentSpeed;
  }
};
export const actions = {
  async fetchEquipmentSpeed({ commit, dispatch }, configId) {
    const url = `configequipmentspeed?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setEquipmentSpeed', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener velocidad de equipos', { root: true })
      return error;
    }
  },
  async saveEquipmentSpeed({ dispatch }, equipmentSpeed) {
    try {
      if(equipmentSpeed.id) {
        await this.$axios.patch(`configequipmentspeed/${equipmentSpeed.id}/`, equipmentSpeed)
        return;
      }
      await this.$axios.post('configequipmentspeed/', equipmentSpeed)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar velocidad de equipo', { root: true })
      return error;
    }
  },
  async deleteEquipmentSpeed({ dispatch }, equipmentSpeed ) {
    try {
      await this.$axios.delete(`configequipmentspeed/${equipmentSpeed}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar velocidad de equipo', { root: true })
      return error;
    }
  }
};