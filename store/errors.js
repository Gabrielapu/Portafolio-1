export const state = () => ({
  requestError: '',
});

export const getters = {
  requestError: (state) => state.requestError
};
export const mutations = {
  setError(state, requestError) {
    state.requestError = requestError;
  }
};
export const actions = {
  setError({ commit }, error) {
    commit('setError', error);
  },
};