<template>
  <v-dialog :value="value" :width="width" persistent>
    <v-card :loading="loading">
      <v-card-title class="text-h5 grey lighten-2">
        {{ formId ? 'Editar' : 'Agregar' }} {{title}}
      </v-card-title>
      <v-card-text class="body-1 mt-5 black--text mt-7">
        <v-form ref="form" :value="isValidForm" @input="$emit('input', $event)">
          <slot></slot>
        </v-form>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn :disabled="loading" color="primary" text @click="$emit('closeModal')">
          Cancelar
        </v-btn>
        <v-btn :disabled="loading" color="primary" text @click="$emit('setData')">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'BaseCrudDialog',
  props: {
    value: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    formId: { type: Number, default: null || undefined },
    title: { type: String, default: ''},
    isValidForm: { type: Boolean, default: false },
    width: { type: String, default: '600' }
  }
}
</script>