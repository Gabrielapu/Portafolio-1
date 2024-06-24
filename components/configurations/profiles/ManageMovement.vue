<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="movimiento"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>         
      <v-col cols="4" class="d-flex flex-column">
        <h3>Actividad 1</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configactivity_1" 
          :items="getSimpleActivities" 
          outlined
          item-text="name"
          item-value="id" 
          label="Actividad 1"
          :rules="rule"             
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Etapa 1</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configstage_1" 
          :items="getSimpleStages" 
          outlined
          item-text="name"
          item-value="id" 
          label="Etapa 1"
          :rules="rule"             
        />
      </v-col>                                     
      <v-col cols="4" class="d-flex flex-column">
        <h3>Actividad 2</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configactivity_2" 
          :items="getSimpleActivities" 
          outlined
          item-text="name"
          item-value="id" 
          label="Actividad 2"
          :rules="rule"             
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Etapa 2</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configstage_2" 
          :items="getSimpleStages" 
          outlined
          item-text="name"
          item-value="id" 
          label="Etapa 2"
          :rules="rule"             
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
      const movement = {
        ...this.form,
        config: this.$route.params.config_id,
        configprofile: this.$route.params.profile_id
      }
      await this.saveData('configMovement/saveMovement', movement)
    }
  },
}
</script>