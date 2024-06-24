<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="producto - mezcla"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>
      <v-col cols="4">
        <h3>Unidades</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.units" outlined label="Unidades" :rules="ruleIntField" type="number"
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Área</h3>
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
          @change="fetchBlendsAndProducts"         
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Mezcla</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configblend" 
          :items="getSimpleBlends" 
          :disabled="!getSimpleBlends.length || !form.configarea"
          outlined
          item-text="name"
          item-value="id" 
          label="Mezcla"
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
          :disabled="!getSimpleProducts.length || !form.configarea"
          outlined
          item-text="code"
          item-value="id" 
          label="Producto"
          :rules="rule"             
        />
      </v-col>
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageProductBlend',
  mixins: [CrudMixin],
  watch: {
    async item(item) {
      if(item.id) {
        await this.fetchBlendsAndProducts()
      }
    }
  },
  methods: {
    async fetchBlendsAndProducts() {
      const filters = {
        config: this.$route.params.config_id,
        configarea: this.form.configarea
      }
      this.loading = true
      await this.$store.dispatch('configProducts/fetchSimpleProducts', filters);
      await this.$store.dispatch('configBlend/fetchSimpleBlends', filters);
      this.loading = false
    },
    async setData() {
      const productBlend = {
        ...this.form,
        plant: this.$route.params.plant_id,
        config: this.$route.params.config_id
      }
      await this.saveData('configProductBlend/saveProductBlend', productBlend)
    }
  },
}
</script>