<template>
  <v-menu 
    :offset-y="offsetY"
    :offset-x="offsetX" 
    :min-width="minWidth" 
    :bottom="bottom" 
    :left="left" 
    :top="top"
    :right="right"
    :close-on-content-click="closeOnContentClick"
  >
    <template #activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon>mdi-filter-variant</v-icon> Filtros </v-btn>
    </template>
    <template #default>
      <v-card>
        <v-row>
          <v-col v-for="item, index in items" :key="index" :cols="cols">
            <v-list>
              <small class="ml-4">{{item.name}}</small>
              <p v-if="!item.filterItems.length" class="ml-9 mt-5"> No hay disponibles </p>
              <div 
                v-if="!!item.filterItems.length" 
                class="scroll-y" 
                :style="`height: ${listHeight}`"
              >
                <v-list-item v-for="filterItem in item.filterItems" :key="filterItem.id">
                  <v-tooltip v-if="tooltip" top>
                    <template #activator="{ on, attrs }">
                      <v-list-item-title v-bind="attrs" v-on="on">
                        {{filterItem.name}}
                      </v-list-item-title>
                    </template>
                    <span>{{filterItem.name}}</span>
                  </v-tooltip>
                  <v-list-item-title v-else> {{filterItem.name}} </v-list-item-title>       
                  <v-list-item-action>
                    <v-checkbox v-model="filterItem.selected" @change="sendFilter"/>
                  </v-list-item-action>
                </v-list-item>
              </div>            
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </template>    
  </v-menu>
</template>

<script>

export default {
  name: 'BaseFiltersMenu',
  props: {
    items: { type: Array, default: () => [], },
    minWidth: { type: String, default: '500px' },
    offsetY: { type: Boolean, default: false },
    offsetX: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false },
    left: { type: Boolean, default: false },
    top: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    closeOnContentClick: { type: Boolean, default: false },
    listHeight: { type: String, default: '200px' },
    tooltip: { type: Boolean, default: false },
  },
  data() {
    return {
      maxColumns: 12
    }
  },
  computed: {
    cols() { return this.maxColumns / this.items.length }
  },
  methods: {
    sendFilter() {
      const modifiedItems = this.items.map(item => {
        return {
          name: item.name,
          filterItems: item.filterItems
            .filter(filterItem => filterItem.selected)
            .map(filterItem => filterItem.name)
        }
      })
      this.$emit('toFilter', modifiedItems)
    },
  },
}
</script>

<style scoped>
.v-menu__content {
  overflow-y: hidden;
}
</style>