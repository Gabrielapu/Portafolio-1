export const state = () => ({
  preparations: [],
});

export const getters = {
  getPreparations: (state) => state.preparations
};
export const mutations = {
  setPreparations(state, preparations) {
    state.preparations = preparations;
  }
};
export const actions = {
  async fetchPreparationChangesByConfig({ commit, dispatch }, configId) {
    const url = `configprepchange?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setPreparations', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener cambios de preparaciones', { root: true })
      return error;
    }
  },
  async deletePrepChange({ dispatch }, prepChangeId ) {
    try {
      await this.$axios.delete(`configprepchange/${prepChangeId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar tipo de cambio', { root: true })
      return error;
    }
  },
  async savePrepChange({ dispatch }, prepChange) {
    try {
      if(prepChange.id) {
        await this.$axios.patch(`configprepchange/${prepChange.id}/`, prepChange)
        return;
      }
      await this.$axios.post('configprepchange/', prepChange)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar tipo de cambio', { root: true })
      return error;
    }
  },
};