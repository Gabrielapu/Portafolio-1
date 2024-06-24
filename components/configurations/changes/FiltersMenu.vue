<template>
  <v-menu  offset-x min-width="500px" top left :close-on-content-click="false">
    <template #activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon>mdi-filter-variant</v-icon> Filtros </v-btn>
    </template>
    <template #default>
      <div class="d-flex">
        <v-list width="60%">
          <small class="ml-4">Productos</small>
          <p v-if="!products.length" class="ml-9 mt-5"> No hay productos disponibles </p>
          <div v-if="!!products.length" class="scroll-y products">
            <v-list-item v-for="product in products" :key="product.id">
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-list-item-title v-bind="attrs" v-on="on">
                    {{product.name}}
                  </v-list-item-title>
                </template>
                <span>{{product.name}}</span>
              </v-tooltip>              
              <v-list-item-action>
                <v-checkbox v-model="product.selected" @change="sendFilter"></v-checkbox>
              </v-list-item-action>
            </v-list-item>
          </div>            
        </v-list>
        <v-list width="40%">
          <small class="ml-4">Equipos</small>
          <p v-if="!machines.length" class="ml-9 mt-5"> No hay equipos disponibles </p>
          <div v-if="!!machines.length" class="scroll-y machines">
            <v-list-item v-for="machine in machines" :key="machine.id">
              <v-list-item-title>{{machine.name}}</v-list-item-title>
              <v-list-item-action>
                <v-checkbox v-model="machine.selected" @change="sendFilter"></v-checkbox>
              </v-list-item-action>
            </v-list-item>
          </div>            
        </v-list>
      </div>
    </template>    
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FiltersMenu',
  props: {
    setLoading: {
      type: Function,
      default: () => {}
    },
  },
  data() {
    return {
      products: [],
      machines: [],
    }
  },
  async fetch() {
    await this.fetchProductsByConfig();
    await this.fetchEquipments();
    this.setLoading(false)
  },
  computed: {
    ...mapGetters('configProducts', ['getSimpleProducts']),
    ...mapGetters('configEquipment', ['getSimpleEquipment']),
  },
  methods: {
    sendFilter() {
      const arrProducts = this.products.filter(prod => prod.selected).map(prod => prod.name)
      const arrMachines = this.machines
        .filter(machine => machine.selected)
        .map(machine => machine.name)
      this.$emit('toFilter', { machines: arrMachines, products: arrProducts })
    },
    async fetchProductsByConfig() {
      const filter = { config: this.$route.params.config_id }
      await this.$store.dispatch('configProducts/fetchSimpleProducts', filter);
      this.products = JSON.parse(JSON.stringify(this.getSimpleProducts))
    },
    async fetchEquipments() {
      const filters = {
        config: this.$route.params.config_id,
      }
      await this.$store.dispatch('configEquipment/fetchSimpleEquipment', filters)
      this.machines = JSON.parse(JSON.stringify(this.getSimpleEquipment))
    }
  },
}
</script>

<style scoped>
.products { height: 250px; }
.machines { height: 250px;}
</style>