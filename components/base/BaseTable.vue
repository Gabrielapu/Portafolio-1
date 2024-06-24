<template>
  <v-card flat :outlined="outlinedCard" :class="cardClasses">
    <v-card-title class="d-flex justify-space-between" :class="filtersContainerClasses">
      <div class="custom-width">
        <v-text-field
          v-if="showSearchBar"
          v-model="search"
          append-icon="mdi-magnify"
          :placeholder="searchBarLabel"
          single-line
          hide-details
        ></v-text-field>
        <slot v-if="!showSearchBar" name="table-title"></slot>
      </div>
      <div class="d-flex justify-end align-items-end">
        <BaseDeleteSelectedItems 
          v-if="value.length && showActionButtons"
          @deleteFiles="$emit('deleteFiles')"
        />
        <slot name="table-actions"></slot>
        <BaseDotsMenu
          v-if="showDotsMenu"
          :items="dotsMenuItems"
          :edit-mode="editMode"
          :edit-name="editName"
          @action="$emit($event)"
          @editMode="showActions"
        />
      </div>      
    </v-card-title>
    <v-data-table
      no-data-text="No hay datos disponibles"
      no-results-text="No hay coincidencias"
      :headers="computedHeaders"
      :items="items"
      :search="search"
      :loading="loading"
      :footer-props="footerData"
      :class="tableClasses"
      :show-select="showSelect || showSelectFromBatches"
      :value="value"
      @input="$emit('input', $event)"
    >
      <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
      <template #[`item.actions`]="{ item }">
        <div class="d-flex">
          <v-tooltip v-if="!restriction" top>
            <template #activator="{ on, attrs }">
              <v-btn icon color="grey" v-bind="attrs" v-on="on" @click="$emit('editItem', item)">
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
            </template>
            <span> Editar </span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn icon color="grey" v-bind="attrs" v-on="on" @click="openDeleteDialog(item)">
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
            <span> {{getDeleteText(item)}} </span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <ConfigurationsConfirmDelete 
      v-model="showDeleteDialog"
      :item="itemToBeDeleted"
      @deleteFile="$emit('deleteFile', itemToBeDeleted.id)"
    />
  </v-card>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    filtersContainerClasses: { type: String, default: '' },
    showSelectFromBatches: { type: Boolean, default: false },
    searchBarLabel: { type: String, default: '' },
    showSearchBar: { type: Boolean, default: true },
    dotsMenuItems: { type: Array, default: () => [] },
    tableClasses: { type: String, default: '' },
    outlinedCard: { type: Boolean, default: false},
    showDotsMenu: { type: Boolean, default: true},
    showFilters: { type: Boolean, default: true },
    cardClasses: { type: String, default: '' },
    showDots: { type: Boolean, default: true },
    editMode: { type: Boolean, default: false },
    editName: { type: String, default: 'Editar' },
    loading: { type: Boolean, default: true },
    headers: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] },
    value: { type: Array, default: () => [] }
  },
  data() {
    return { 
      search: '',
      footerData: {
        'show-first-last-page': true,
        'items-per-page-options': [10, 15, 20, -1],
        'items-per-page-all-text': 'Todas',
        'items-per-page-text': 'Items por página',
        'page-text': '{0}-{1} de {2}'
      },
      showSelect: false,
      showActionButtons: false,
      showDeleteDialog: false,
      itemToBeDeleted: {}
    }
  },
  computed: {
    computedHeaders() {
      if(this.showActionButtons) {
        return this.headers.map(header => ({
          ...header,
          class: '',
          cellClass: ''
        }))
      }
      return this.headers
    },
    getDeleteText() {
      return item => item.has_equipment 
        ? 'No se puede eliminar porque tiene equipos asociados' 
        : 'Eliminar'
    },
    restriction() {
      return this.$route.name === 'plant-plant_id-configurations-config_id-compatibilities'
    }
  },
  methods: {
    showActions() {
      this.showActionButtons = !this.showActionButtons
    },
    openDeleteDialog(item) {
      if(item.has_equipment) {
        return;
      }
      this.itemToBeDeleted = item
      this.showDeleteDialog = true
    }
  }
}
</script>

<style scoped>
.custom-width {
  width: 35% !important;
}
</style>