<template>
  <div class="text-center">
    <v-dialog
      :value="value"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          <v-icon color="success" class="mr-1"> {{icon}} </v-icon>
          <span class="success--text">{{title}}</span>
        </v-card-title>
        <v-card-text class="body-1 mt-5 black--text">
          {{text}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('input', false)">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="executePlan">
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmExecution',
  props: {
    value: { type: Boolean, required: true },
    title: { type: String, default: 'Calcular escenario' },
    icon: { type: String, default: 'mdi-check-circle-outline'},
    text: { 
      type: String, 
      default: 'Esta acción se puede tardar hasta 1 hora, '
          + 'si estas de acuerdo continua con el proceso.'
          + ' Recuerda actualizar periódicamente la página para verificar si finalizó la ejecución.' 
    }
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    value(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    executePlan() {
      this.$emit('executePlan')
      this.$emit('input', false)
    }
  },
}
</script>