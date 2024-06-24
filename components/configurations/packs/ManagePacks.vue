<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="pack"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>
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
          @change="fetchPackAndProducts"             
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Pack</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configproduct_pack" 
          :items="simpleProductsAsPacks"
          :disabled="!form.configarea"
          no-data-text="No hay packs disponibles"
          outlined
          item-text="code"
          item-value="id" 
          label="Pack"
          :rules="[v => (!!v && v !== form.configproduct) || 
            `Campo obligatorio. Debe ser distinto al producto`]"             
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Producto</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configproduct" 
          :items="simpleProducts"
          :disabled="!form.configarea" 
          outlined
          item-text="code"
          item-value="id" 
          label="Producto"
          :rules="[v => (!!v && v !== form.configproduct_pack) || 
            `Campo obligatorio. Debe ser distinto al pack`]"             
        />
      </v-col>      
      <v-col cols="4">
        <h3>Unidades por batch</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.units_per_batch" type="number" label="Unidades por batch" 
          outlined :rules="ruleIntField"
        />
      </v-col>
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManagePacks',
  mixins: [CrudMixin],
  data() {
    return {
      simpleProducts: [],
      simpleProductsAsPacks: []
    }
  },
  async fetch() {
    await this.$store.dispatch('configArea/fetchConfigAreas', this.$route.params.config_id);
  },
  watch: {
    async item(item) {
      if(item.id) {
        await this.fetchPackAndProducts()
      }
    }
  },
  methods: {
    async fetchPackAndProducts() {
      this.loading = true
      const config = this.$route.params.config_id
      const configarea = this.form.configarea
      const products = await this.$store.dispatch(
        'configProducts/fetchSimpleProducts', 
        { config, configarea, is_pack: 0 }
      );
      this.simpleProducts = JSON.parse(JSON.stringify(products))
        .sort((a, b) => a.code.localeCompare(b.code))
      const productsAsPack = await this.$store.dispatch(
        'configProducts/fetchSimpleProducts', 
        { config, configarea, is_pack: true }
      )
      this.simpleProductsAsPacks = JSON.parse(JSON.stringify(productsAsPack))
        .sort((a, b) => a.code.localeCompare(b.code))
      this.loading = false
    },
    async setData() {
      const pack = {
        ...this.form,
        config: this.$route.params.config_id
      }
      await this.saveData('configPack/savePack', pack)
    }
  },
}
</script>
