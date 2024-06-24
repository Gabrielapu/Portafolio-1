<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="etapa"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>         
      <v-col cols="4" class="d-flex flex-column">
        <h3>Etapa</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field v-model="form.name" label="Etapa" outlined :rules="rule"/>
      </v-col>       
      <v-col cols="4" class="d-flex flex-column">
        <h3>Etapa sucesor</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.successor" 
          :items="getSimpleStages" 
          outlined
          no-data-text="Sin items disponibles"
          item-text="name"
          item-value="id" 
          label="Etapa Sucesor"   
        />
      </v-col>         
    </v-row>    
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageMovements',
  mixins: [CrudMixin],
  methods: {
    async setData() {      
      const filters = {
        config: this.$route.params.config_id,
        configprofile: this.$route.params.profile_id
      }
      const stage = {
        ...this.form,
        ...filters
      }
      await this.saveData('configStage/saveStage', stage)
      await this.$store.dispatch('configStage/fetchSimpleProfileStages', filters)
    }
  },
}
</script>