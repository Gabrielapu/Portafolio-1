export const state = () => ({
  connections: [],
  getConnectionByEquipment: {}
});

export const getters = {
  getConnections: (state) => state.connections,
  getConnectionByEquipment: (state) => state.getConnectionByEquipment
};
export const mutations = {
  setConnections(state, connections) {
    state.connections = connections;
  },
  setConnection(state, getConnectionByEquipment) {
    state.getConnectionByEquipment = getConnectionByEquipment;
  },
};
export const actions = {
  async fetchConnections({ commit, dispatch }, configId) {
    const url = `configequipmentconnection?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setConnections', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener conexiones', { root: true })
      return error;
    }
  },
  async fetchConnectionByEquipment({ commit, dispatch }, equipmentId) {
    const url = `configequipmentconnection/${equipmentId}/get_all_connections/`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setConnection', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener conexiones por equipo', { root: true })
      return error;
    }
  },
  async deleteEquipmentConnection({ dispatch }, connectionId ) {
    try {
      await this.$axios.delete(`configequipmentconnection/${connectionId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar conexión', { root: true })
      return error;
    }
  },
  async saveEquipmentConnection({ dispatch }, connection) {
    try {
      if(connection.id) {
        await this.$axios.patch(`configequipmentconnection/${connection.id}/`, connection)
        return;
      }
      await this.$axios.post('configequipmentconnection/', connection)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar conexión', { root: true })
      return error;
    }
  },
};