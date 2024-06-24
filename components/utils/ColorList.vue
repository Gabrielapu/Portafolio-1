<template>
  <v-menu bottom left>
    <template #activator="{ on, attrs }">
      <div class="d-flex" v-bind="attrs" v-on="on">
        <div 
          v-if="selectedColor" 
          :style="getSelectedStyle(selectedColor)"
          class="mr-5"
        ></div>
        <v-icon>mdi-menu-down</v-icon>
      </div>
    </template>
    <v-list dense>
      <span class="text-caption ml-4">Selecciona {{relatedName}}</span>
      <v-list-item  v-for="color in getColors" :key="color.id">
          <div :style="getListStyle(color)"></div>
          <v-list-item-title
            class="cursor-pointer"
            @click="selectedColor = color"
          >{{ color.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ColorList',
  props: {
    relatedName: {
      type: String,
      default: 'color'
    },
    itemColor: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectedColor: this.itemColor,
    }
  },
  computed: {
    ...mapGetters('colors', ['getColors']),
    getListStyle() {
      return color => `
        background-color: ${color.color_code}; 
        width: 23px; 
        height: 20px;
        border-radius: 4px;
        border: 2px solid ${color.border_color_code};
        margin-right: 5px;
      `
    },
    getSelectedStyle() {
      return color => `
        background-color: ${color.color_code}; 
        width: 20px; 
        height: 20px;
        border-radius: 50%;
        border: 2px solid ${color.border_color_code};
        margin-right: 5px;
      `
    },
  },
  watch: {
    selectedColor(val) {
      this.$emit('selectedColor', val)
    }
  },
}
</script>