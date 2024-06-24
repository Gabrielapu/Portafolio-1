<template>
  <v-card min-height="500px" :loading="loading" flat outlined class="mx-5 my-5">
    <v-row v-if="!areas.length" class="justify-center mt-5">
      <h4>No hay áreas disponibles</h4>
    </v-row>
    <v-row v-if="!!areas.length">
      <v-col cols="3" class="mt-5">
        <span class="ml-5 title-font">Listado de áreas</span>
      </v-col>
      <v-col cols="9">
        <v-list>
          <v-list-item v-for="area in areas" :key="area.id"> 
            <v-avatar
              :color="area.color_code"
              size="55"
              class="mr-4 mb-1"
              :style="`border: 1px solid ${area.border_color_code};`"
            >
              <span class="gray--text">
                {{area.name.substring(0,2).toUpperCase()}}
              </span>
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="area.name" />
              <v-list-item-subtitle v-text="area.description" />
              <v-divider class="mt-3"></v-divider>
            </v-list-item-content>
            <v-list-item-action>
              <ConfigurationsAreasAreaDetailModal :area="area" :colors="getColors"/>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ListAreas',
  props: {
    configId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true
    }
  },
  async fetch() {
    await this.fetchConfigAreas();
    await this.fetchColors();
  },
  computed: {
    ...mapGetters('configArea', ['getConfigAreas']),
    ...mapGetters('colors', ['getColors']),
    areas() {
      return this.getConfigAreas
    }
  },
  methods: {
    async fetchConfigAreas() {
      await this.$store.dispatch('configArea/fetchConfigAreas', this.configId);
      this.loading = false
    },
    async fetchColors() {
      await this.$store.dispatch('colors/fetchColors')
    }
  }
}
</script>

<style scoped>
.title-font {
  font-size: 20px;
}
</style>