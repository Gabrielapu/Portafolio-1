<template>
  <v-snackbar v-model="onError" color="error" timeout="-1">
    {{ requestError }}
    <template #action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="$store.dispatch('errors/setError', '')"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ErrorSnackBar',
  data() {
    return {
      snackbar: false,
    }
  },
  computed: {
    ...mapGetters('errors', ['requestError']),
    onError: {
      get() {
        return !!this.requestError
      },
      set() {
        return !!this.requestError
      }
    }
  }
}
</script>