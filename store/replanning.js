export const state = () => ({
  firstStepTime: {},
});

export const mutations = {
  setTime(state, firstStepTime) {
    state.firstStepTime = firstStepTime;
  },
};

export const actions = {
  setFirstStepTime({ commit }, firstStepTime) {
    commit('setTime', firstStepTime);
  }
}