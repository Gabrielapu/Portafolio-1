<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="tiempo por actividad"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>         
      <v-col cols="4" class="d-flex flex-column">
        <h3>Tipo</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.activity_type" 
          :items="['Producto', 'Mezcla']" 
          outlined
          label="Tipo"
          :rules="rule"
          :disabled="!!form.id"
          @change="resetFields"
        />
      </v-col>
    </v-row>
    <v-row v-if="form.activity_type === 'Producto'">
      <v-col cols="4" class="d-flex flex-column">
        <h3>Producto</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configproduct" 
          :items="productsBySku" 
          outlined
          item-text="code"
          item-value="id" 
          :label="form.activity_type"
          :rules="rule"           
          :disabled="!!form.id"
        />
      </v-col>
    </v-row>
    <v-row v-if="form.activity_type === 'Mezcla'">
      <v-col cols="4" class="d-flex flex-column">
        <h3>Mezcla</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configblend" 
          :items="getSimpleBlends" 
          outlined
          item-text="name"
          item-value="id" 
          :label="form.activity_type"
          :rules="rule" 
          :disabled="!!form.id"           
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Actividad</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configactivity" 
          :items="getSimpleActivities" 
          outlined
          item-text="name"
          item-value="id" 
          label="Actividad"
          :rules="rule"
          :disabled="!!form.id"         
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
    </v-row>    
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageActivityTime',
  mixins: [CrudMixin],
  async fetch() {
    const filter = { config: this.$route.params.config_id }
    await this.$store.dispatch('configProducts/fetchSimpleProducts', filter);
    await this.$store.dispatch('configBlend/fetchSimpleBlends', filter);
  },
  methods: {
    async setData() {      
      const activityTime = {
        ...this.form,
        config: this.$route.params.config_id,
        configprofile: this.$route.params.profile_id
      }
      await this.saveData('configActivityTime/saveActivityTime', activityTime)
    },
    resetFields() {
      this.form.configblend = null
      this.form.configproduct = null
    },
  },
}
</script>