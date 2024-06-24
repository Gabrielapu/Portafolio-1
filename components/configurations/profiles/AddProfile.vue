<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="null"
    :is-valid-form="isValidForm"
    title="perfil"
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
        <h3>Descripción</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field v-model="form.description" outlined label="Descripción" :rules="rule"/>
      </v-col>            
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'AddFinalPrductsa',
  mixins: [CrudMixin],
  methods: {
    async setData() {
      const profile = {
        ...this.form,
        config: this.$route.params.config_id
      }
      await this.saveData('configProfile/saveProfile', profile)
    }
  },
}
</script>