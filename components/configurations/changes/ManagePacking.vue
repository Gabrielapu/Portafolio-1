<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="envasado"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>      
      <v-col cols="4" class="d-flex flex-column">
        <h3>Producto 1</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configproduct_1" 
          :items="productsBySku"
          outlined
          item-text="code"
          item-value="id" 
          label="Producto 1"
          :rules="rule"             
        />
      </v-col> 
      <v-col cols="4" class="d-flex flex-column">
        <h3>Producto 2</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configproduct_2" 
          :items="productsBySku"
          outlined
          item-text="code"
          item-value="id" 
          label="Producto 2"
          :rules="rule"             
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
          @change="fetchChangeTypes"
        />
      </v-col>    
      <v-col cols="4" class="d-flex flex-column">
        <h3>Tipo de cambio</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configtypechange" 
          :items="getSimpleTypeChange"
          no-data-text="Sin cambios disponibles"
          outlined
          item-text="name"
          item-value="id" 
          label="Tipo de cambio"
          :disabled="!form.configequipment"
        />
      </v-col>         
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManagePacking',
  mixins: [CrudMixin],
  watch: {
    async item(item) {
      if(item.id) {
        await this.fetchChangeTypes()
      }
    }
  },
  methods: {
    async fetchChangeTypes() {
      await this.$store.dispatch('configTypeChange/fetchSimpleTypeChange', {
        config: this.$route.params.config_id,
        configequipment: this.form.configequipment
      });
    },
    async setData() {      
      const change = {
        ...this.form,
        config: this.$route.params.config_id,
      }
      await this.saveData('configPackingChange/savePackingChange', change)
    }
  },
}
</script>