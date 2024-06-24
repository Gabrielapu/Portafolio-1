export const state = () => ({
  loadedPlans: [],
  plan: null,
  inExecutionPlanId: null,
});

export const getters = {
  getLoadedPlans: (state) => state.loadedPlans,
  getPlan: (state) => {
    return state.plan;
  },
};
export const mutations = {
  setLoadedPlans(state, newLoadedPlans) {
    state.loadedPlans = newLoadedPlans
      .sort((a, b) => b.id - a.id);
  },
  setPlan(state, newPlan){
    state.plan = newPlan
  },
  createPlan(state, newPlan) {
    state.loadedPlans.push(newPlan);
  },
  deletePlan(state, planId) {
    state.loadedPlans = state.loadedPlans.filter((plan) => plan.id !== planId);
  },
  setFinishedScenario(state, finishedScenario) {
    const scenario = state.scenariosInProgress
      .find(scenario => scenario.id === finishedScenario.id)
    scenario.inProgress = false
  },
  setPlanId(state, planId) {
    state.inExecutionPlanId = planId
  }
};
export const actions = {
  async validateExcels({ dispatch }, {configId, files}) {
    const url = `planification/validate_excels/?config_id=${configId}`
    const bodyFormData = new FormData()
      files.forEach(file => {
        bodyFormData.append(file.field, file.file)
      });

    try {
      return await this.$axios.post(url, bodyFormData);
    } catch (error) {
      dispatch('errors/setError', 'Error al validar los excels', { root: true })
      return error.response
    }
  },
  async setLoadedPlans({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('planification/');
      if (data) commit('setLoadedPlans', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener planificaciones', { root: true })
      return error;
    }
  },
  async setPlan({ commit, dispatch }, planId) {
    try {
      const { data } = await this.$axios.get(`planification/${planId}`);
      delete data.plant_name
      delete data.group_name
      delete data.tag_name
      delete data.cells
      if (data) commit('setPlan', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener planificación', { root: true })
      return error;
    }
  },
  async executePlanification({ commit, dispatch }, plan) {
    if(!plan.id) return
    try {
      await this.$axios.get(`planification/${plan.id}/execute_planification/`);
      commit('setPlanId', plan.id)
    } catch (error) {
      dispatch('errors/setError', 'Error al ejecutar planificación', { root: true })
      return error;
    }
  },
  async executeReplanification({ dispatch }, plan ) {
    const url = 'planification/execute_replanning/' 
    try {
      await this.$axios.post(url, plan);
    } catch (error) {
      dispatch('errors/setError', 'Error al ejecutar replanificación', { root: true })
      return error;
    }
  },
  async fetchPlansByPlant({ commit, dispatch }, planId) {
    try {
      const { data } = await this.$axios.get(`planification?plant=${planId}`);
      if (data) commit('setLoadedPlans', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener planificaciones por planta', { root: true })
      return error;
    }
  },
  createPlan({ commit, dispatch }, newPlan) {
    return this.$axios
      .post('planification/', newPlan)
      .then((response) => {
        commit('createPlan', response.data);
        return response;
      })
      .catch((error) => {
        dispatch('errors/setError', 'Error al crear planificación', { root: true })
      return error;
      });
  },
  editPlan({ dispatch }, planObject) {
    return this.$axios
      .patch(`planification/${planObject.id}/`, planObject)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        dispatch('errors/setError', 'Error al editar planificación', { root: true })
      return error;
      });
  },
  deletePlan({ commit, dispatch }, planId) {
    return this.$axios
      .delete(`planification/${planId}`)
      .then((response) => {
        commit('deletePlan', planId);
        return response;
      })
      .catch((error) => {
        dispatch('errors/setError', 'Error al borrar planificación', { root: true })
      return error;
      });
  },
  async loadFiles({ dispatch }, { files, planificationId }) {
    try {
      const bodyFormData = new FormData()
      files.forEach(file => {
        bodyFormData.append(file.field, file.file)
      });
      await this.$axios.post(`planification/${planificationId}/bulk_data/`, bodyFormData);
    } catch (error) {
      dispatch('errors/setError', 'Error al cargar archivos', { root: true })
      return error;
    }
  },
  async loadModifiedFiles({ dispatch }, { files, planificationId }) {
    try {
      const bodyFormData = new FormData()
      files.forEach(file => {
        bodyFormData.append(file.field, file.file)
      });
      await this.$axios.post(`planification/${planificationId}/bulk_data_update/`, bodyFormData);
    } catch (error) {
      dispatch('errors/setError', 'Error al cargar archivos', { root: true })
      return error;
    }
  },
  async sendParameters({ dispatch }, { planificationId, parameters}) {
    try {
      await this.$axios.post(`planification/${planificationId}/plan_parameter/`, parameters);
    } catch (error) {
      dispatch('errors/setError', 'Error al enviar parámetros', { root: true })
      return error;
    }
  },
};

