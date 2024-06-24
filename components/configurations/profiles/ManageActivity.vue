<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="actividad de perfil"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>         
      <v-col cols="4" class="d-flex flex-column">
        <h3>Etapa</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configstage" 
          :items="getSimpleStages" 
          outlined
          item-text="name"
          item-value="id" 
          label="Etapa"
          :rules="rule"             
        />
      </v-col>                                     
      <v-col cols="4" class="d-flex flex-column">
        <h3>Actividad</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field v-model="form.name" label="Actividad" outlined :rules="rule"/>
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Sucesor</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.successor" 
          :items="getSimpleActivities" 
          outlined
          item-text="name"
          item-value="id" 
          label="Sucesor"          
        />
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
      <v-col cols="4" class="pt-0">
        <h3>Espera</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-switch v-model="form.allows_waiting" class="mt-0" inset dense />
      </v-col>                
      <v-col cols="4" class="d-flex flex-column">
        <h3>Set 1</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.set_1" 
          :items="getSimpleEquipmentSet" 
          outlined
          item-text="code"
          item-value="id" 
          label="Set 1"
          :rules="rule"             
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Set 2</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.set_2" 
          :items="getSimpleEquipmentSet" 
          outlined
          item-text="code"
          item-value="id" 
          label="Set 2"      
        />
      </v-col>
    </v-row>    
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageActivity',
  mixins: [CrudMixin],
  data() {
    return {
      filters: {
        config: this.$route.params.config_id,
        configprofile: this.$route.params.profile_id
      }
    }
  },
  async fetch() { 
    await this.$store.dispatch('configStage/fetchSimpleProfileStages', this.filters)
    await this.$store.dispatch('configActivity/fetchSimpleActivities', this.filters)
    await this.$store.dispatch('configEquipmentSet/fetchSimpleEquipmentSet', this.filters)
  },
  methods: {
    async setData() {      
      const activity = {
        ...this.form,
        allows_waiting: this.form.allows_waiting || false,
        ...this.filters
      }
      await this.saveData('configActivity/saveActivity', activity)
      await this.$store.dispatch('configActivity/fetchSimpleActivities', this.filters)
    }
  },
}
</script>