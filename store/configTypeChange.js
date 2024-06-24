export const state = () => ({
  changeTypeByEquipment: [],
  changeTypeByConfig: [],
  simpleTypeChange: []
});

export const getters = {
  getChangeTypeByEquipment: (state) => state.changeTypeByEquipment,
  getChangeTypeByConfig: (state) => state.changeTypeByConfig,
  getSimpleTypeChange: (state) => state.simpleTypeChange
};
export const mutations = {
  setChangeTypeByEquipment(state, changeTypeByEquipment) {
    state.changeTypeByEquipment = changeTypeByEquipment;
  },
  setChangeTypeByConfig(state, changeTypeByConfig) {
    state.changeTypeByConfig = changeTypeByConfig
  },
  setSimpleTypeChange(state, simpleTypeChange) {
    state.simpleTypeChange = simpleTypeChange
  }
};
export const actions = {
  async fetchChangeTypeByEquipment({ commit, dispatch }, equipmentId) {
    const url = `configtypechange?configequipment=${equipmentId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setChangeTypeByEquipment', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener tipo de cambio por equipo', { root: true })
      return error;
    }
  },
  async fetchChangeTypeByConfig({ commit, dispatch }, configId) {
    const url = `configtypechange?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setChangeTypeByConfig', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener tipo de cambio por configuración', { root: true })
      return error;
    }
  },
  async deleteTypeChange({ dispatch }, typeChangeId ) {
    try {
      await this.$axios.delete(`configtypechange/${typeChangeId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar tipo de cambio', { root: true })
      return error;
    }
  },
  async saveTypeChange({ dispatch }, typeChange) {
    try {
      if(typeChange.id) {
        await this.$axios.patch(`configtypechange/${typeChange.id}/`, typeChange)
        return;
      }
      await this.$axios.post('configtypechange/', typeChange)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar tipo de cambio', { root: true })
      return error;
    }
  },
  async fetchSimpleTypeChange({ commit, dispatch }, filters) {
    try {
      const { data } = await this.$axios.post('configtypechange/list_simple/', filters);
      if (data) commit('setSimpleTypeChange', data);
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error al obtener lista simple de tipos de cambio', 
        { root: true })
      return error;
    }
  },
};