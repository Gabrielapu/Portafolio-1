<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="lavado"
    width="800"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Equipo</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configequipment" 
          :items="getSimpleEquipment" 
          outlined
          item-text="name"
          item-value="id" 
          label="Equipo"
          :rules="rule"             
        />
      </v-col>

      <v-col cols="4">
        <h3>Tiempo</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.timewashed" type="number" label="Tiempo (minutos)" outlined 
          :rules="ruleIntField"
        />
      </v-col>

      <v-col cols="4" class="d-flex flex-column">
        <h3>Tipo de lavado</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configtypewashed" 
          :items="getWashTypes" 
          outlined
          item-text="name"
          item-value="id" 
          label="Tipo de lavado"
          :rules="rule"
          @change="resetFields"  
        />
      </v-col>
    </v-row>
    <v-row v-if="requireNumber">
      <v-col cols="4">
        <h3>Número</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.number" type="number" label="Número" outlined 
          :rules="ruleIntField"
        />
      </v-col>
    </v-row>
    <v-row v-if="requireDaysAndHour">
      <v-col cols="4">
        <h3>Días</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.days_formatted" 
          :items="weekDaysForWash" 
          item-text="name"
          item-value="value" 
          multiple
          outlined
          label="Días"      
          :rules="dayRule"    
        >
        </v-select>
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Hora</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.hour" 
          :items="dayHours" 
          outlined
          label="Hora"        
          :rules="rule"
        >
        </v-select>
      </v-col>      
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageWash',
  mixins: [CrudMixin],
  data() {
    return {
      weekDaysForWash: [
        { value: 'L', name: 'Lunes' },
        { value: 'M', name: 'Martes' },
        { value: 'W', name: 'Miércoles' },
        { value: 'J', name: 'Jueves' },
        { value: 'V', name: 'Viernes' },
        { value: 'S', name: 'Sábado' },
        { value: 'D', name: 'Domingo' },
      ],
      washMessage: 'Campo obligatorio en este tipo de lavado'
    }
  },
  async fetch() {
    const filter = { config: this.$route.params.config_id }
    await this.$store.dispatch('configEquipment/fetchSimpleEquipment', filter);
    await this.$store.dispatch('configWash/fetchWashTypes', filter.config);
  },
  computed: {
    requireNumber() {
      // ids de los lavados que deben tener numero (getWashTypes)
      const washedIdsWithNRequired = /1|4|5|6/
      return this.form.configtypewashed?.toString().match(washedIdsWithNRequired)
    },
    requireDaysAndHour() {
      const AS_INPUT = 2
      return this.form.configtypewashed === AS_INPUT  
    },
    dayRule() {
      return [v => !!v?.length || 'Campo obligatorio']
    }
  },
  methods: {
    async setData() {     
      const wash = {
        ...this.form,
        days: this.getDays(),
        number: this.form.number || null,
        hour: this.form.hour || null,
        config: this.$route.params.config_id,
      }
      await this.saveData('configWash/saveWash', wash)
    },
    getDays() {
      const WEEKDAYS = 7
      let days = null
      if(this.form.days_formatted?.length) {
        days = this.form.days_formatted.length === WEEKDAYS 
          ? 'Todos' 
          : this.form.days_formatted.join(';')
        return days
      }
      return days
    },
    resetFields() {
      this.$refs.baseCrudDialog.$refs.form.resetValidation()
      this.form.days_formatted = null
      this.form.hour = null
      this.form.number = null
    }
  },
}
</script>
