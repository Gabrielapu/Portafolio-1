<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="tipo de cambio"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>
      <v-col cols="4">
        <h3>Nombre</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field v-model="form.name" label="Nombre" outlined :rules="rule"/>
      </v-col>
      
      <v-col cols="4">
        <h3>Tiempo</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.time" type="number" label="Tiempo (minutos)" outlined 
          :rules="ruleIntField"
        />
      </v-col>   
      <v-col cols="4" class="d-flex flex-column">
        <h3>Máquina</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configequipment" 
          :items="getSimpleEquipment" 
          outlined
          item-text="name"
          item-value="id" 
          label="Máquina"
          :rules="rule"
        />
      </v-col>        
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageChangeTypes',
  mixins: [CrudMixin],
  methods: {
    async setData() {      
      const typeChange = {
        ...this.form,
        unit: 'Minutos',
        config: this.$route.params.config_id,
      }
      await this.saveData('configTypeChange/saveTypeChange', typeChange)
    }
  },
}
</script>