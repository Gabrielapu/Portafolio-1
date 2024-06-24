export const state = () => ({});
export const getters = {};
export const mutations = {};

export const actions = {
  async fetchEquipmentCompatibility({ dispatch }, configEquipmentId) {
    const url = `configequipmentcompatibility?configequipment=${configEquipmentId}`
    try {
      const { data } = await this.$axios.get(url);
      return data;
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener compatibilidades', { root: true })
      return error;
    }
  },
  async deleteCompatibility({ dispatch }, compatibilityId ) {
    try {
      await this.$axios.delete(`configequipmentcompatibility/${compatibilityId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar compatibilidad', { root: true })
      return error;
    }
  },
  async saveCompatibility({ dispatch }, compatibility) {
    try {
      if(compatibility.id) {
        await this.$axios.patch(`configequipmentcompatibility/${compatibility.id}/`, compatibility)
        return;
      }
      await this.$axios.post('configequipmentcompatibility/', compatibility)
    } catch (error) {
      dispatch(
        'errors/setError', 'Error al guardar compatibilidad', 
        { root: true }
      )
      return error;
    }
  },
};