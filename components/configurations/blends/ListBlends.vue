<template>
  <div>
    <BaseTable
      :headers="headers"
      :items="blends"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar Código o Nombre"
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar Mezcla"
      @deleteFile="deleteSelectedItem"
      @addBlend="showDialog = true"
      @editItem="setItemToEdit"
      @cleanFilters="cleanFilters"
    >
      <template #table-actions>     
        <ConfigurationsBlendsFiltersMenu ref="filterComponent" @toFilter="addFilter"/>
      </template>
      <template #[`item.configprofile_name`]="{ item }">
        <router-link :to="getRoute(item)">
          {{item.configprofile_name}}
        </router-link>
      </template>
      <template v-if="getColors.length" #[`item.color`]="{ item }">
        <v-avatar 
          size="30" 
          :color="getColor(item.color)" 
          :style="`border: 1px solid ${getBorderColor};`"
        />
      </template>
    </BaseTable>
    <ConfigurationsBlendsManageBlends
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchBlends"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ListBlends',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Id', sortable: false, value: 'id' },
        { text: 'Nombre Mezcla', sortable: false, value: 'name' },
        { text: 'Área', value: 'configarea_name' },
        { text: 'Perfil', value: 'configprofile_name' },
        { text: 'Color', value: 'color' },
        { text: 'Residencia', value: 'residence_time' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Limpiar Filtros', action: 'cleanFilters', icon: 'mdi-eraser' },
        { title: 'Añadir mezcla', action: 'addBlend', icon: 'mdi-plus' }
      ],
      blends: [],
      filters: [],
    }
  },
  async fetch() {
    await this.fetchBlends();
    this.loading = false
  },
  computed: {
    ...mapGetters('configBlend', ['getBlends']),
    ...mapGetters('colors', ['getColors']),
    getRoute() {
      return blend => `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/profiles/${blend.configprofile}`
    },
    getColor() {
      return blendColor => this.getColors.find(color => color.id === blendColor)?.color_code
    },
    getBorderColor() {
      return blendColor => this.getColors.find(color => color.id === blendColor.color)?.border_color_code
    }
  },
  methods: {
    addFilter(event) {
      const areas = event.find(area => area.name === 'Areas').filterItems
      const profiles = event.find(profiles => profiles.name === 'Perfiles').filterItems

      const conditions = {
        areas: blend => areas.includes(blend.configarea_name),
        profiles: blend => profiles.includes(blend.configprofile_name) 
      }
      
      this.filters = []
      if(areas.length) {
        this.filters.push(conditions.areas)
      }
      if(profiles.length) {
        this.filters.push(conditions.profiles)
      }

      this.blends = this.getBlends
        .filter(blend => this.filters.every(filter => filter(blend)))
    },
    cleanFilters() {
      this.copyBlends()
    },
    copyBlends() {
      this.blends = JSON.parse(JSON.stringify(this.getBlends))
      this.$refs.filterComponent.loadItems()
    },
    async fetchBlends() {
      await this.$store.dispatch(
        'configBlend/fetchBlends', 
        this.$route.params.config_id
      );
      this.copyBlends()
    },
    async deleteSelectedItem(blendId) {
      await this.deleteItem(
        this.fetchBlends, 
        'configBlend/deleteBlend', 
        blendId
      )
    },
  }
}
</script>
