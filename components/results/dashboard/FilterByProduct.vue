<template>
  <div class="d-flex align-center mx-4">
    <v-autocomplete
      v-model="selectedProduct"
      item-text="full_name"
      item-value="id"
      placeholder="Seleccione un producto"
      no-data-text="Sin resultados"
      prepend-icon="mdi-magnify"
      :items="products"
    ></v-autocomplete>
    <div class="d-flex justify-space-start ml-4">
      <v-icon 
        class="outlined"
        :disabled="firstProduct === selectedProduct || !selectedProduct" 
        @click="navigate('prev')"
      >
        mdi-chevron-left
      </v-icon>
      <v-icon 
        class="outlined mr-2" 
        :disabled="lastItem === selectedProduct || !selectedProduct" 
        @click="navigate('next')"
      >
        mdi-chevron-right
      </v-icon>
      <v-menu bottom left>
        <template #activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on"> mdi-dots-horizontal </v-icon>
        </template>
        <div>
          <v-list dense>
            <v-list-item @click="downloadImg()"> Descargar PNG </v-list-item>
          </v-list>
        </div>
      </v-menu>
    </div>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
export default {
  name: 'FilterByProduct',
  props: {
    areaName: { type: String, default: '' },
    products: { type: Array, default: () => [] },
    firstProduct: { type: Number }
  },
  data() {
    return {
      selectedProduct: null
    }
  },
  computed: {
    lastItem() {
      return this.products[this.products.length - 1]?.id
    }
  },
  watch: {
    firstProduct:  {
      handler(id) {
        this.selectedProduct = id
      },
      immediate: true
    },
    selectedProduct:  {
      handler(id) {
        this.$emit('selectedProduct', id)
      },
      immediate: true
    },
  },
  methods: {
    navigate(action) {
      const index = this.products
        .findIndex(product => product.id === this.selectedProduct)
      this.selectedProduct = action === 'prev' 
        ? this.products[index - 1].id
        : this.products[index + 1].id
    },
    downloadImg() {
      const areaName = this.areaName
      domtoimage.toBlob(document.getElementById('canvas'))
        .then(function(blob) {
          saveAs(blob, `${areaName}.png`);
        });
    },
  },
}
</script>
