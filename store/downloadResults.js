import { saveAs } from 'file-saver';

export const state = () => ({});
export const getters = {};
export const mutations = {};

export const actions = {
  async downloadExcels({ dispatch }, { planificationId, endpoint }) {
    const url = `downloadresults/${planificationId}/${endpoint}/`
    try {
      const { data } = await this.$axios.get(url, { responseType: "blob" })
      saveAs(new Blob([data]), `${endpoint}.xlsx`)
    } catch (error) {
      dispatch('errors/setError', 'Error al descargar resultados', { root: true })
      return error;
    }
  },
};