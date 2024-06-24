<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h5 class="text-h5">Equipo</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="py-0">
        <v-text-field v-model="formData.id" outlined readonly label="ID"/>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field v-model="formData.name" outlined readonly label="Nombre equipo"/>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field v-model="formData.equipment_type" outlined readonly label="Tipo"/>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field v-model="formData.configarea_name" outlined readonly label="Área"/>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field v-model="formData.configequipmentset_name" outlined readonly label="Set"/>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field v-model="formData.capacity" outlined readonly label="Capacidad"/>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field v-model="formData.rated_capacity" outlined readonly label="Capacidad Nominal"/>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field v-model="formData.efficiency" outlined readonly label="Eficiencia"/>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field v-model="formData.actual_capacity" outlined readonly label="Capacidad Real"/>
      </v-col>
      <v-col cols="6" class="py-0"> 
        <v-text-field v-model="formData.unit" outlined readonly label="Unidades / Hora"/>
      </v-col>
      <v-col cols="6" class="py-0"> 
        <v-text-field v-model="formData.start_day_name" outlined readonly label="Día de inicio"/>
      </v-col>
      <v-col cols="6" class="py-0"> 
        <v-text-field v-model="formData.start_hour" outlined readonly label="Hora de inicio"/>
      </v-col>
      <v-col cols="6" class="py-0"> 
        <v-text-field v-model="formData.end_day_name" outlined readonly label="Día de inicio"/>
      </v-col>
      <v-col cols="6" class="py-0"> 
        <v-text-field v-model="formData.end_hour" outlined readonly label="Hora de inicio"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import weekdays from '@/components/utils/weekdays'

export default {
  name: 'BasicData',
  data() {
    return {
      weekDays: weekdays.weekDaysWithIdAndName.map(day => ({id: (day.id -1), name: day.name}))
    }
  },
  props: {
    information: {
      type: Object,
      default: () => {}
    }
  },
  async fetch() {
    await this.fetchEquipmentTypes()
  },
  computed: {
    ...mapGetters('configArea', ['getConfigAreas']),
    ...mapGetters('configEquipmentSet', ['getEquipmentSet']),
    ...mapGetters('equipmentTypes', ['getEquipmentTypes']),
    formData() {
      return JSON.parse(JSON.stringify(this.information))
    },
  },
  methods: {
    async fetchEquipmentTypes() {
      await this.$store.dispatch('equipmentTypes/fetchEquipmentTypes')
    }
  }
}
</script>
