export const state = () => ({
    configList: [],
    configurationData: {}
  });
  
export const getters = {
  getConfigurations: (state) => state.configList,
  getConfiguration: (state) => state.configurationData,
  getConfigListForSelect(state) {
    return state.configList.map((config) => ({
      value: config.id,
      text: config.name,
    }));
  },
  getConfigEdit: (state) => {
    return state.configEdit;
  },
};
export const mutations = {
  set(state, newConfigList) {
    state.configList = newConfigList;
  },
  setConfigEdit(state, newConfig){
    state.configEdit = newConfig
  },
  createConfig(state, newConfig) {
    state.configList.push(newConfig);
  },
  deleteConfig(state, configId) {
    state.configList = state.configList.filter((config) => config.id !== configId);
  },
  setConfigurationData(state, configurationData) {
    state.configurationData = configurationData
  }
};
export const actions = {
  async fetchConfigurations({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('configuration/');
      if (data) commit('set', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener configuración', { root: true })
      return error;
    }
  },
  async fetchConfigurationsByPlant({ commit, dispatch }, configId) {
    try {
      const { data } = await this.$axios.get(`configuration?plant=${configId}`);
      if (data) commit('set', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener configuraciones por planta', { root: true })
      return error;
    }
  },
  async fetchConfiguration({ commit, dispatch }, configurationId) {
    try {
      const { data } = await this.$axios.get(`configuration/${configurationId}`);
      if (data) commit('setConfigurationData', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener una configuración', { root: true })
      return error;
    }
  },
  async editConfiguration({ dispatch }, configuration) {
    try {
      await this.$axios.patch(`configuration/${configuration.id}/`, configuration);
    } catch (error) {
      dispatch('errors/setError', 'Error al editar configuración', { root: true })
      return error;
    }
  },
  createConfig({ commit, dispatch }, newConfig) {
    return this.$axios
      .post('configuration/', newConfig)
      .then((response) => {
        commit('createConfig', response.data);
        return response;
      })
      .catch((error) => {
        dispatch('errors/setError', 'Error al crear una configuración', { root: true })
        return error;
      });
  },
  editConfig({ dispatch }, configObject) {
    return this.$axios
      .patch(`configuration/${configObject.id}/`, configObject)
      .catch((error) => {
        dispatch('errors/setError', 'Error al editar una  configuración', { root: true })
        return error;
      });
  },
  deleteConfig({ commit, dispatch }, configId) {
    return this.$axios
      .delete(`configuration/${configId}`)
      .then((response) => {
        commit('deleteConfig', configId);
        return response;
      })
      .catch((error) => {
        dispatch('errors/setError', 'Error al borrar una configuración', { root: true })
        return error;
      });
  },
  copyConfig({ commit, dispatch }, configId) {
    return this.$axios
      .post(`configuration/${configId}/duplicate/`)
      .then((response) => {
        commit('createConfig', response.data);
        return response;
      })
      .catch((error) => {
        dispatch('errors/setError', 'Error al copiar una configuración', { root: true })
        return error;
      });
  }
};
