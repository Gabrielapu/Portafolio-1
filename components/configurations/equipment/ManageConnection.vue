<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="conexión"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Area</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configarea" 
          :items="getConfigAreas" 
          outlined
          item-text="name"
          item-value="id" 
          label="Área"
          :rules="rule"  
          @change="fetchEquipmentByArea"          
        />
      </v-col>           
      <v-col cols="4" class="d-flex flex-column">
        <h3>Máquina 1</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configequipment_1" 
          :items="getSimpleEquipment" 
          outlined
          item-text="name"
          item-value="id" 
          label="Máquina 1"
          :rules="rule"
          :disabled="!form.configarea"
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Máquina 2</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configequipment_2" 
          :items="getSimpleEquipment" 
          outlined
          item-text="name"
          item-value="id" 
          label="Máquina 2"
          :rules="rule"
          :disabled="!form.configarea"
        />
      </v-col>
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageConnection',
  mixins: [CrudMixin],
  async fetch() {
    await this.$store.dispatch('configArea/fetchConfigAreas', this.$route.params.config_id);
  },
  watch: {
    async item(item) {
      if(item.id) {
        await this.fetchEquipmentByArea()
      }
    }
  },
  methods: {
    async fetchEquipmentByArea() {
      const filters = {
        config: this.$route.params.config_id,
        configarea: this.form.configarea
      }
      await this.$store.dispatch('configEquipment/fetchSimpleEquipment', filters)
    },
    async setData() {      
      const connection = {
        ...this.form,
        config: this.$route.params.config_id,
        configprofile: this.$route.params.profile_id
      }
      await this.saveData('configEquipmentConnection/saveEquipmentConnection', connection)
    }
  },
}
</script>