<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="equipo"
    width="900"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
     <v-row>
      <v-col cols="2">
        <h3>Nombre</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field v-model="form.name" label="Nombre" outlined :rules="rule"/>
      </v-col>
      
      <v-col cols="2" class="d-flex flex-column pl-5">
        <h3>Tipo</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="form.equipment_type" 
          :items="getEquipmentTypes" 
          outlined
          label="Tipo"
          :rules="rule"           
        />
      </v-col>     
      <v-col cols="2" class="d-flex flex-column">
        <h3>Area</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="form.configarea" 
          :items="getConfigAreas" 
          outlined
          item-text="name"
          item-value="id" 
          label="Área"
          :rules="rule"             
        />
      </v-col>      
      <v-col cols="2" class="d-flex flex-column pl-5">
        <h3>Set</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="form.configequipmentset" 
          :items="getSimpleEquipmentSet" 
          outlined
          item-text="code"
          item-value="id" 
          label="Set"
          :rules="rule"             
        />
      </v-col>
      <v-col cols="2">
        <h3>Capacidad</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.capacity" type="number" label="Capacidad" outlined 
          :rules="ruleIntField"
        />
      </v-col>
      <v-col cols="2" class="pl-5">
        <h3>Capacidad nominal</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.rated_capacity" type="number" label="Capacidad nominal" outlined
          :rules="ruleIntField" @input="setEfficiency"
        />
      </v-col>
      <v-col cols="2">
        <h3>Capacidad Real</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.actual_capacity" type="number" label="Capacidad real" outlined
          :rules="ruleIntField" @input="setEfficiency"
        />
      </v-col> 
      <v-col cols="2" class="pl-5">
        <h3>Eficiencia</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.efficiency" type="number" label="Eficiencia (%)" outlined 
          :rules="ruleIntField"
          @input="setActualCapacity"
        />
      </v-col>
      <v-col cols="2" class="d-flex flex-column">
        <h3>Unidad</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="form.unit" 
          :items="getEquipmentUnits" 
          outlined
          label="Unidad"
          :rules="rule"             
        />
      </v-col>
      <v-col cols="2" class="d-flex flex-column pl-5">
        <h3>Día de inicio</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="form.start_day" 
          :items="weekDays" 
          outlined
          label="Día de inicio"
          item-text="name"
          item-value="id"
          :rules="ruleWeekDay"             
        />
      </v-col>
      <v-col cols="2" class="d-flex flex-column">
        <h3>Hora de inicio</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="form.start_hour" 
          :items="dayHours" 
          outlined
          label="Hora de inicio"
          :rules="rule"             
        >
        </v-select>
      </v-col>
      <v-col cols="2" class="d-flex flex-column pl-5">
        <h3>Día de fin</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="form.end_day" 
          :items="weekDays" 
          outlined
          label="Día de fin"
          item-text="name"
          item-value="id"
          :rules="ruleWeekDay"             
        />
      </v-col>
      <v-col cols="2" class="d-flex flex-column">
        <h3>Hora de fin</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="form.end_hour" 
          :items="dayHours" 
          outlined
          label="Hora de fin"
          :rules="rule"             
        >
        </v-select>
      </v-col>
      <v-col cols="2" class="pt-0 pl-5">
        <h3>Conexión verificada</h3>
      </v-col>
      <v-col cols="4" class="pl-0">
        <v-switch v-model="form.check_connection" class="mt-0" inset dense />
      </v-col>
      <v-col cols="2">
        <h3>Ponderador eficiencia</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.efficiency_weighter" type="number" label="Ponderador eficiencia" 
          outlined :rules="ruleIntField"
        />
      </v-col>  
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'
import weekdays from '@/components/utils/weekdays'

export default {
  name: 'ManageEquipment',
  mixins: [CrudMixin],
  data() {
    return {
      // Se usa el Lunes como 0 en este caso 
      weekDays: weekdays.weekDaysWithIdAndName.map(day => ({id: (day.id -1), name: day.name})),
    }
  },
  async fetch() {
    const filters = {
      config: this.$route.params.config_id,
      configprofile: this.$route.params.profile_id
    }
    await this.$store.dispatch('configEquipmentSet/fetchSimpleEquipmentSet', filters)
    await this.$store.dispatch('equipmentTypes/fetchEquipmentTypes')
    await this.$store.dispatch('equipmentUnits/fetchEquipmentUnits')
    await this.$store.dispatch('configArea/fetchConfigAreas', filters.config)
  },
  methods: {
    async setData() {
      const equipment = {
        ...this.form,
        efficiency: (this.form.efficiency / 100),
        start_hour: this.form.start_hour?.substring(0,2),
        end_hour: this.form.end_hour?.substring(0,2),
        rated_capacity: Math.round(this.form.rated_capacity),
        actual_capacity: Math.round(this.form.actual_capacity),
        config: this.$route.params.config_id,
        configprofile: this.$route.params.profile_id,
        plant: this.$route.params.plant_id
      }
      await this.saveData('configEquipment/saveEquipment', equipment)
    },
    setEfficiency() {
      if(this.form.actual_capacity && this.form.rated_capacity) {
        this.form.efficiency = (this.form.actual_capacity / this.form.rated_capacity) * 100
      }
    },
    setActualCapacity() {
      if(this.form.efficiency && this.form.rated_capacity) {
        this.form.actual_capacity = (this.form.efficiency / 100) * this.form.rated_capacity
      }
    }
  },
}
</script>