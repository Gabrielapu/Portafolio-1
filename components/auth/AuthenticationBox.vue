<template>
  <v-container fluid fill-height class="d-flex justify-center align-center flex-column">
    <v-card class="elevation-5 px-15" width="600px" height="550px" color="#FAFAFA">
      <v-card-title class="d-flex justify-center flex-column my-10">
        <!-- <v-img :src="require('/static/Logo.png')" max-height="40" max-width="164" /> -->
        <div class="d-flex flex-column align-center">
          <h1 class="text-h5 mt-4"> {{form.title}} </h1>
          <span class="body-2 mt-2 text-center"> {{form.subtitle}} </span>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="boxForm" @submit.prevent="callFn(form.function)">
          <component 
            :is="field.component"
            v-for="(field, index) in form.fields" 
            :key="index"
            v-model="field.value"
            :rules="field.rules"
            :type="getFieldType(field.type)"
            :label="field.label"
            :placeholder="field.placeholder || ''"
            outlined
            validate-on-blur
            :append-icon="getAppendIcon"
            @keydown.enter.prevent="callFn(form.function)"
            @click:append="showPassword = !showPassword"
          />
        </v-form>              
        <span v-if="error" class="d-block text-center error--text">
          {{error}}
        </span>
        <div v-if="passwordErrors.length">
          <span 
            v-for="error, index in passwordErrors" :key="index" 
            class="d-block text-left error--text"
          >
            {{error}}
          </span>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-center flex-column">
        <v-spacer></v-spacer>
        <v-btn 
          type="submit"
          color="primary"
          depressed
          :disabled="loading"
          class="px-15"
          @click="callFn(form.function)"
        >
          {{ loading ? form.button_data.loading_text : form.button_data.text }}
          <v-progress-circular
            v-if="loading"
            :size="20"
            class="ml-1"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-btn>
        <div class="d-flex justify-center align-center cursor-pointer">
          <v-icon v-if="form.small_action.text === 'Volver'" class="mt-3 mr-1" small> 
            mdi-arrow-left 
          </v-icon>
          <small class="caption mt-3" @click="callFn(form.small_action.action)">
            {{form.small_action.text}}
          </small>          
        </div>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="showAlert" color="success" timeout="3000">
      La contraseña se modificó con éxito
      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showAlert = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: 'AuthenticationBox',
  props: {
    form: { type: Object, default: () => {}},
    setLoginForm: { type: Function, default: () => {}},
    setResetPasswordFormWithEmail: { type: Function, default: () => {}},
    setResetPasswordFormWithCode: { type: Function, default: () => {}},
    setUpdatePasswordForm: { type: Function, default: () => {}},
  },
  data() {
    return {
      error: '',
      loading: false,
      showAlert: false,
      code: '',
      showPassword: false,
      passwordErrors: []
    }
  },
  computed: {
    getAppendIcon() {
      if(this.form.name === 'updatePasswordForm') {
        return this.showPassword ? 'mdi-eye' : 'mdi-eye-off'
      }
      return ''
    }
  },
  methods: {
    getFieldType(fieldType) {
      if(this.form.name === 'updatePasswordForm') {
        return this.showPassword ? 'text' : 'password'
      }
      return fieldType
    },
    async callFn(fn) {
      await this[fn]()
    },
    validateForm() {
      return this.$refs.boxForm.validate()
    },
    clearSnackbar() {
      this.$store.commit('errors/setError', '')
    },
    async sendEmailWithCode() {
      if(!this.validateForm()) return;
      this.loading = true
      const email = this.form.fields.find(field => field.type === 'email').value
      const error = await this.$store.dispatch('resetPassword/sendCodeToEmail', email )
      this.loading = false
      if(error) return
      this.clearSnackbar()
      this.setResetPasswordFormWithCode()
    },
    async sendCode() {
      if(!this.validateForm()) return;
      this.loading = true
      this.code = this.form.fields.find(field => field.label === 'Código').value
      const error = await this.$store.dispatch('resetPassword/sendCodeToBeValidated', {code: this.code} )
      this.loading = false
      if(error) return
      this.clearSnackbar()
      this.setUpdatePasswordForm()
    },
    async updatePassword() { // eslint-disable-line
      if(!this.validateForm()) return;
      this.loading = true
      const newPassword = this.form.fields[0].value
      const error = await this.$store.dispatch(
        'resetPassword/sendNewPassword', 
        { newPassword, code: this.code } 
      )
      this.loading = false
      if(error) {
        this.passwordErrors = error.response.data.password
        return;
      }
      this.passwordErrors = []
      this.clearSnackbar()
      this.showAlert = true
      this.setLoginForm()
    },
    async userLogin() {
      if(!this.validateForm()) return;
      this.error = false
      try {
        this.loading = true

        const loginData = {
          email: this.form.fields[0].value,
          password: this.form.fields[1].value,
        }

        let userId = null
        await this.$auth.loginWith('local', { data: loginData }).then(res => {
          const { user_id } = VueJwtDecode.decode(res.data.access) // eslint-disable-line
          userId = user_id // eslint-disable-line
        })
        const user = await this.$axios.get(`user/${userId}`)
        this.$auth.$storage.setUniversal('user', user.data, true)
        this.$auth.setUser(user.data)
      } catch (err) {
        this.error = 'Credenciales inválidas'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
