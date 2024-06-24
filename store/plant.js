export const state = () => ({
    plantList: [],
  });
  
export const getters = {
  getPlants: (state) => state.plantList,
  getPlantListForSelect(state) {
    return state.plantList.map((plant) => ({
      value: plant.id,
      text: plant.name,
    }));
  },
};
export const mutations = {
  set(state, newPlantList) {
    state.plantList = newPlantList;
  }
};
export const actions = {
  async fetchPlants({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('plant/');
      if (data) commit('set', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener plantas', { root: true })
      return error;
    }
  },
};