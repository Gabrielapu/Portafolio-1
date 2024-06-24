export const state = () => ({
  changesByEquipment: [],
  changesByConfig: []
});

export const getters = {
  getChangesByEquipment: (state) => state.changesByEquipment,
  getChangesByConfig: (state) => state.changesByConfig
};
export const mutations = {
  setChangesByEquipment(state, changesByEquipment) {
    state.changesByEquipment = changesByEquipment;
  },
  setChangesByConfig(state, changesByConfig) {
    state.changesByConfig = changesByConfig
  }
};
export const actions = {
  async fetchChangesByEquipment({ commit, dispatch }, equipmentId) {
    const url = `configpackingchange?configpackingchange=${equipmentId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setChangesByEquipment', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener cambios por equipo', { root: true })
      return error;
    }
  },
  async fetchChangesByConfig({ commit, dispatch }, configId) {
    const url = `configpackingchange?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setChangesByConfig', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener cambios por configuración', { root: true })
      return error;
    }
  },
  async deletePackingChange({ dispatch }, packingChangeId ) {
    try {
      await this.$axios.delete(`configpackingchange/${packingChangeId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar envasado', { root: true })
      return error;
    }
  },
  async savePackingChange({ dispatch }, packingChange) {
    try {
      if(packingChange.id) {
        await this.$axios.patch(`configpackingchange/${packingChange.id}/`, packingChange)
        return;
      }
      await this.$axios.post('configpackingchange/', packingChange)
    } catch (error) {
      dispatch(
        'errors/setError', 'Error al guardar envasado', 
        { root: true }
      )
      return error;
    }
  },
};