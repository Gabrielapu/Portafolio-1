<template>
  <div>
    <v-dialog :value="value" width="500" >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ type === 'singular' ? 'Eliminar registro' : 'Eliminar registros' }}
        </v-card-title>
        <v-card-text class="body-1 mt-5 black--text">
          {{
            type === 'singular' ?
            `¿Está seguro de eliminar el registro` + 
            `${getName}` + 
            `${getSku}?` :
            '¿Está seguro de eliminar los registros?'
          }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="deleteFile">
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteSelectedItems',
  props: {
    type: { type: String, default: 'singular' },
    item: { type: Object, default: () => {} },
    value: { type: Boolean, required: true },
  },
  computed: {
    getSku() {
      const sku = this.item.code || this.item.product_code || this.item.sku
      return sku ? ` - SKU: ${sku}`: ''  
    },
    getName() {
      const name = this.item.name || this.item.product_name
      return name ? ': ' + name : ''
    }
  },
  methods: {
    deleteFile() {
      this.type === 'singular' ? this.$emit('deleteFile') : this.$emit('deleteFiles')
      this.$emit('input', false)
    },
    closeDialog() {
      this.$emit('input', false); 
    }
  }
}
</script>
