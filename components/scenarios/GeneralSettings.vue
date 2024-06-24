<template>
  <v-form ref="form" v-model="isValidForm" >
    <v-row class="justify-center">
      <v-alert
        v-if="!isValidForm && showAlert"
        color="primary"
        icon="mdi-information-outline"
        type="error"
        min-width="100%"
      >
        Faltan campos que completar
      </v-alert>
    </v-row>
    <v-row class="justify-center">
      <p class="text-h3">Ajustes Generales</p>
    </v-row>
    <v-row class="justify-center pb-14">
      <p class="text-subtitle-1">
        Completa la información para identificar el escenario.
      </p>
    </v-row>
    <v-row class="">
      <v-col cols="3">
        <p class="mb-0 body-1 font-weight-bold">
          Nombre del escenario
        </p>
        <p class="body-2 ">
          Escribe nombre del escenario
        </p>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="plan.name"
          :counter="maxNameChars"
          :rules="nameRules"
          label="Nombre"
          outlined
          light
          required
          @blur="validateForm"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="3">
        <p class="mb-0 body-1 font-weight-bold">
          Periodo del escenario
        </p>
        <p class="body-2 ">
          Selecciona el lunes de la semana elegida
        </p>
      </v-col>
      <v-col cols="9">
        <v-menu
          ref="datePickerMenu"
          v-model="datePickerMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          light
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              label="Rango de Fechas"
              prepend-inner-icon="mdi-calendar"
              outlined
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="currentMonday"
            show-current
            no-title
            scrollable
            :allowed-dates="allowedDates"
            :first-day-of-week="1"
            locale="es-cl"
            cols="6"
          />            
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <p class="mb-0 body-1 font-weight-bold">
          Planta
        </p>
        <p class="body-2 ">
          Selecciona Planta correspondiente
        </p>
      </v-col>
      <v-col cols="9">
        <v-radio-group v-model="plan.plant" mandatory row>
          <v-radio 
            v-for="plant in plantList" 
            :key="plant.value" 
            :label="plant.text" 
            :value="plant.value"
          />
        </v-radio-group>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'GeneralSettings',
  props: {
    planProp: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isValidForm: false,
      showAlert: false,
      minDate: null,
      maxNameChars: 100,
      plan: this.planProp,
      nameRules: [
        (v) => !!v || 'Debe asignar un nombre.',
        (v) =>
          (v && v.length <= this.maxNameChars) ||
          `Nombre debe contener máximo ${this.maxNameChars} caracteres`,
      ],
      datePickerMenu: false,
      range: [this.planProp.start_date, this.planProp.end_date],
      currentMonday: this.$dayjs().day(1).format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapGetters({
      plantList: 'plant/getPlantListForSelect',
      tagList: 'planTag/getPlanTagListForSelect',
    }),
    dateRangeText () {
      const textRange = this.range.map(date => dayjs(date).format('DD-MM-YYYY'));
      return textRange.join(' ~ ');
    },
  },
  watch: {
    currentMonday(val) {
      this.range = [val, this.$dayjs(val).day(28).format('YYYY-MM-DD') ]
      this.plan.start_date = this.range[0]
      this.plan.end_date = this.range[1]
    }
  },
  methods: {
    allowedDates(val) {
      const MONDAY = 1
      return this.$dayjs(val).day() === MONDAY
    },
    validateForm() {
      const valid = !!this.plan.name 
      this.showAlert = valid
      this.$emit('isValid', valid)
    },
    validate() {
      return this.$refs.form.validate()
    }
  },
}
</script>
