<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="velocidad de equipo"
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
          label="Producto"
          :rules="rule"             
        />
      </v-col>

      <v-col cols="4">
        <h3>Velocidad</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.speed" type="number" label="Velocidad" outlined 
          :rules="ruleIntField"
        />
      </v-col>

      <v-col cols="4">
        <h3>Velocidad real</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.real_speed" type="number" label="Velocidad real" outlined 
          :rules="ruleIntField"
        />
      </v-col>

      <v-col cols="4" class="d-flex flex-column">
        <h3>Unidad</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.unit" 
          :items="['kg/hr','unid/hr']" 
          outlined
          label="Unidad"
          :rules="rule"             
        />
      </v-col>
      
      <v-col cols="4">
        <h3>Eficiencia</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.efficiency" type="number" label="Eficiencia" outlined 
          :rules="[v => (!!v && v >= 1 && v <= 100) || 'Ingrese números de 1 a 100']"
        />
      </v-col>
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageEquipmentSpeed',
  mixins: [CrudMixin],
  async fetch() {
    const filter = { config: this.$route.params.config_id }
    await this.$store.dispatch('configProducts/fetchSimpleProducts', filter);
    await this.$store.dispatch('configEquipment/fetchSimpleEquipment', filter);
  },
  methods: {
    async setData() {
      const equipmentSpeed = {
        ...this.form,
        efficiency: (this.form.efficiency / 100),
        config: this.$route.params.config_id,
      }
      await this.saveData('configEquipmentSpeed/saveEquipmentSpeed', equipmentSpeed)
    }
  },
}
</script>
