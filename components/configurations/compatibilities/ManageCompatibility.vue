<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="compatibilidad"
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
          v-model="form.compatibility_type" 
          :items="['Producto', 'Mezcla']" 
          outlined
          label="Tipo"
          :rules="rule"
          @change="resetFields"    
        />
      </v-col>
    </v-row>
    <v-row v-if="form.compatibility_type === 'Producto'">
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
          :label="form.compatibility_type"
          :rules="rule"             
        />
      </v-col>
    </v-row>
    <v-row v-if="form.compatibility_type === 'Mezcla'">
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
          :label="form.compatibility_type"
          :rules="rule"             
        />
      </v-col>
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageCompatibility',
  mixins: [CrudMixin],
  props: {
    configEquipmentId: { type: Number, default: null }
  },
  async fetch() {
    const filter = { config: this.$route.params.config_id }
    await this.$store.dispatch('configProducts/fetchSimpleProducts', filter);
    await this.$store.dispatch('configBlend/fetchSimpleBlends', filter);
  },
  methods: {
    async setData() {
      const productCompatibility = {
        ...this.form,
        config: this.$route.params.config_id,
        configequipment: this.configEquipmentId,
        speed: 0
      }
      await this.saveData('configEquipmentCompatibility/saveCompatibility', productCompatibility)
    },
    resetFields() {
      this.form.configblend = null
      this.form.configproduct = null
    },
  },
}
</script>