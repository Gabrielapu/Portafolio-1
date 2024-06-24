export const state = () => ({
  stages: [],
  simpleStages: []
});

export const getters = {
  getStages: (state) => state.stages,
  getSimpleStages: (state) => state.simpleStages
};
export const mutations = {
  setStages(state, stages) {
    state.stages = stages;
  },
  setSimpleStages(state, simpleStages) {
    state.simpleStages = simpleStages
  }
};
export const actions = {
  async fetchProfileStages({ commit, dispatch }, profileId) {
    const url = `configstage?configprofile=${profileId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setStages', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener etapas por perfil', { root: true })
      return error;
    }
  },
  async fetchSimpleProfileStages({ commit, dispatch }, filters) {
    const url = 'configstage/list_simple/'
    try {
      const { data } = await this.$axios.post(url, filters);
      if (data) commit('setSimpleStages', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener lista simple de etapas por perfil', { root: true })
      return error;
    }
  },
  async saveStage({ dispatch }, stage) {
    try {
      if(stage.id) {
        await this.$axios.patch(`configstage/${stage.id}/`, stage)
        return;
      }
      await this.$axios.post('configstage/', stage)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar etapa', { root: true })
      return error;
    }
  },
  async deleteStage({ dispatch }, stage ) {
    try {
      await this.$axios.delete(`configstage/${stage}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar etapa', { root: true })
      return error;
    }
  }
};