export const state = () => ({
  navTitle: null,
  isHome: null,
  isForm: null,
  isFullscreen: null,
});

export const getters = {
  getNavTitle: (state) => {
    return state.navTitle;
  },
  getIsHome: (state) => {
    return state.isHome;
  },
  getIsForm: (state) => {
    return state.isForm;
  },
  getIsFullscreen: (state) => {
    return state.isFullscreen
  }
};

export const mutations = {
  setNavTitle(state, newNavTitle) {
    state.navTitle = newNavTitle;
  },
  setIsHome(state, newIsHome) {
    state.isHome = newIsHome;
  },
  setIsForm(state, newIsForm) {
    state.isForm = newIsForm;
  },
  setIsFullscreen(state, newIsFullscreen) {
    state.isFullscreen = newIsFullscreen
  }
};

export const actions = {
  updateNavTitle({ commit }, newNavTitle) {
    commit('setNavTitle', newNavTitle);
  },
  updateIsHome({ commit }, newIsHome) {
    commit('setIsHome', newIsHome);
  },
  updateIsForm({ commit }, newIsForm) {
    commit('setIsForm', newIsForm);
  },
  updateIsFullscreen({ commit }, newIsFullscreen) {
    commit('setIsFullscreen', newIsFullscreen)
  }
};