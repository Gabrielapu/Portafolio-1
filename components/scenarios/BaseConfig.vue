<template>
  <div>
    <v-row class="justify-center">
      <p class="text-h3">Configuración base</p>
    </v-row>
    <v-row class="justify-center pb-14">
      <p class="text-h6">Selección configuración de planta.</p>
    </v-row>
    <v-row>
      <v-col cols="3">
        <p class="mb-0 body-1 font-weight-bold">
          Configuración
        </p>
        <p class="body-2 ">
          Selecciona Configuración correspondiente
        </p>
      </v-col>
      <v-col cols="9">
        <v-autocomplete
          v-model="plan.config"
          :items="configList"
          :rules="[(v) => !!v || 'Configuración es Requerida']"
          label="Configuración"
          outlined
          light
          required
          @change="validateForm"
        >
          <template #no-data>
            <p>No hay datos disponibles</p>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-divider class="mb-10"></v-divider>
    <ScenariosParameters 
      :plan-parameters="planParameters"
      @input="isValidParametersForm = $event; validateForm()
    "/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BaseConfig',
  props: {
    planProp: {
      type: Object,
      default: () => {}
    },
    planParameters: { type: Object, default: () => {} }
  },
  data() {
    return {
      isValidParametersForm: false
    }
  },
  computed: {
    ...mapGetters({
      configList: 'configuration/getConfigListForSelect'
    }),
    plan() {
      return this.planProp;
    }
  },
  methods: {
    validateForm() {
      const valid = !!this.plan.config && this.isValidParametersForm
      this.$emit('isValid', valid)
    },
  }
}
</script>
