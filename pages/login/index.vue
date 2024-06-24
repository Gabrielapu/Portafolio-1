<template>
  <AuthAuthenticationBox 
    :form="form"
    :set-login-form="setLoginForm"
    :set-reset-password-form-with-email="setResetPasswordFormWithEmail"
    :set-reset-password-form-with-code="setResetPasswordFormWithCode"
    :set-update-password-form="setUpdatePasswordForm"
  />
</template>

<script>
import { VTextField } from 'vuetify/lib'

export default {
  name: 'LogIn',
  layout: 'login',
  data() {
    return {
      loginForm: {
        name: 'loginForm',
        fields: [
          { 
            component: VTextField,
            label: 'Usuario', 
            placeholder: 'Nombre de usuario',
            type: 'text', 
            value: '',
            rules: [
              (v) => !!v || 'Debe ingresar un nombre de usuario',
            ]
          },
          { 
            component: VTextField,
            label: 'Contraseña', 
            placeholder: '',
            type: 'password', 
            value: '',
            rules: [
              (v) => !!v || 'Debe ingresar la contraseña'
            ]
          }
        ],
        button_data: {
          text: 'Iniciar sesión',
          loading_text: 'Iniciando sesión',
        },
        function: 'userLogin',
        small_action: {
          text: 'Recuperar contraseña',
          action: 'setResetPasswordFormWithEmail'
        },
      },
      resetPasswordFormWithEmail: {
        name: 'resetPasswordFormWithEmail',
        title: 'Restablecer contraseña',
        subtitle: 'Se te enviará un código a tu correo ' 
          + 'electrónico para continuar con el processo',
        fields: [
          { 
            component: VTextField,
            label: 'Correo electrónico', 
            placeholder: 'Correo electrónico',
            type: 'email', 
            value: '',
            rules: [
              (v) => !!v.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/) || 
              'Debe ingresar un email válido',
            ]
          }
        ],
        button_data: {
          text: 'Enviar código',
          loading_text: 'Enviando...',
        },
        function: 'sendEmailWithCode',
        small_action: {
          text: 'Volver',
          action: 'setLoginForm'
        },
      },
      resetPasswordFormWithCode: {
        name: 'resetPasswordFormWithCode',
        title: 'Restablecer contraseña',
        subtitle: 'Escribe el código que se te envio al correo electrónico',
        fields: [
          { 
            component: VTextField,
            label: 'Código', 
            type: 'text', 
            value: '',
            rules: [
              (v) => !!v || 'Debe ingresar el código',
            ]
          }
        ],
        button_data: {
          text: 'Continuar',
          loading_text: 'Continuando...',
        },
        function: 'sendCode',
        small_action: {
          text: 'Volver',
          action: 'setResetPasswordFormWithEmail'
        },
      },
      updatePasswordForm: {
        name: 'updatePasswordForm',
        title: 'Actualizar contraseña',
        fields: [
          { 
            component: VTextField,
            label: 'Nueva contraseña', 
            type: 'password', 
            value: '',
            rules: [
              (v) => !!v || 'Debe ingresar una contraseña',
            ],
            hideIcon: 'mdi-eye-off-outline',
            showIcon: 'mdi-eye-outline'
          },
          { 
            component: VTextField,
            label: 'Repetir contraseña', 
            type: 'password', 
            value: '',
            rules: [
              (v) => !!v || 'Debe ingresar una contraseña igual a la anterior',
              (v) => v === this.updatePasswordForm.fields[0].value || 
                'Las contraseñas no coinciden',
            ]
          }
        ],
        button_data: {
          text: 'Finalizar',
          loading_text: 'Finalizando...',
        },
        function: 'updatePassword',
        small_action: {
          text: 'Volver',
          action: 'setResetPasswordFormWithCode'
        },
      },
      form: {},
      error: false,
    }
  },
  created() {
    this.form = this.loginForm
  },
  methods: {
    setResetPasswordFormWithEmail() {
      this.form = this.resetPasswordFormWithEmail
    },
    setResetPasswordFormWithCode() {
      this.form = this.resetPasswordFormWithCode
    },
    setUpdatePasswordForm() {
      this.form = this.updatePasswordForm
    },
    resetValues() {
      this.resetPasswordFormWithEmail.fields[0].value = ''
      this.resetPasswordFormWithCode.fields[0].value = ''
      this.updatePasswordForm.fields.forEach(field => {field.value = ''})
    },
    setLoginForm() {
      this.resetValues()
      this.form = this.loginForm
    }
  }
}
</script>