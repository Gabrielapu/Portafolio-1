export const state = () => ({
  profiles: [],
  profile: {}
});

export const getters = {
  getProfiles: (state) => state.profiles,
  getProfileData: (state) => state.profile
};
export const mutations = {
  setProfiles(state, profiles) {
    state.profiles = profiles;
  },
  setProfile(state, profile) {
    state.profile = profile
  }
};
export const actions = {
  async fetchProfiles({ commit, dispatch }, configId) {
    const url = `configprofile?config=${configId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setProfiles', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener perfiles de una configuración', { root: true })
      return error;
    }
  },
  async fetchProfileData({ commit, dispatch }, profileId) {
    const url = `configprofile/${profileId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setProfile', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener un perfil', { root: true })
      return error;
    }
  },
  async deleteProfile({ dispatch }, profileId ) {
    try {
      await this.$axios.delete(`configprofile/${profileId}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar perfil', { root: true })
      return error;
    }
  },
  async saveProfile({ dispatch }, profile) {
    try {
      if(profile.id) {
        await this.$axios.patch(`configprofile/${profile.id}/`, profile)
        return;
      }
      await this.$axios.post('configprofile/', profile)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar perfil', { root: true })
      return error;
    }
  },
  async duplicateProfile({ dispatch }, profileId) {
    try {
      await this.$axios.get(`configprofile/${profileId}/duplicate_profile/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al duplicar perfil', { root: true })
      return error;
    }
  },
};