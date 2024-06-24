export const state = () => ({
  movements: [],
});

export const getters = {
  getMovements: (state) => state.movements
};
export const mutations = {
  setMovements(state, movements) {
    state.movements = movements;
  }
};
export const actions = {
  async fetchActivityMovements({ commit, dispatch }, profileId) {
    const url = `configmovement?configprofile=${profileId}`
    try {
      const { data } = await this.$axios.get(url);
      if (data) commit('setMovements', data);
    } catch (error) {
      dispatch('errors/setError', 'Error al obtener movimientos', { root: true })
      return error;
    }
  },
  async saveMovement({ dispatch }, movement) {
    try {
      if(movement.id) {
        await this.$axios.patch(`configmovement/${movement.id}/`, movement)
        return;
      }
      await this.$axios.post('configmovement/', movement)
    } catch (error) {
      dispatch('errors/setError', 'Error al guardar movimiento', { root: true })
      return error;
    }
  },
  async deleteMovement({ dispatch }, movement ) {
    try {
      await this.$axios.delete(`configmovement/${movement}/`)
    } catch (error) {
      dispatch('errors/setError', 'Error al eliminar movimiento', { root: true })
      return error;
    }
  }
};