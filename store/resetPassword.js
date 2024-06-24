export const state = () => ({});
export const getters = {};
export const mutations = {
};
export const actions = {
  async sendCodeToEmail({ dispatch }, email) {
    try {
      await this.$axios.post('password_reset/', { email });
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error al enviar correo, puede que no exista', 
        { root: true }
      )
      return error;
    }
  },
  async sendCodeToBeValidated({ dispatch }, { code }) {
    try {
      await this.$axios.post('password_reset/validate_token/', { token: code });
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error de código, revisa si esta correcto o solicita uno nuevo.', 
        { root: true }
      )
      return error;
    }
  },
  async sendNewPassword({ dispatch }, { code, newPassword}) {
    try {
      await this.$axios.post('password_reset/confirm/', { token: code, password: newPassword });
    } catch (error) {
      dispatch(
        'errors/setError', 
        'Error al cambiar la contraseña, intentalo nuevamente.', 
        { root: true }
      )
      return error;
    }
  },
};