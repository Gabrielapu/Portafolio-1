<template>
  <v-menu disabled bottom left>
    <template #activator="{ on, attrs }">
      <div class="d-flex justify-space-between" v-bind="attrs" v-on="on">
        <span v-if="selectedItem" outlined>
          {{selectedItem.name || selectedItem.description}}
        </span>
        <v-icon class="d-none">mdi-menu-down</v-icon>
      </div>
    </template>
    <div class="max-height">
      <v-list>
        <span class="text-caption ml-4">{{relatedName}}</span>
        <v-list-item  v-for="item in computedIems" :key="item.id">
          <v-list-item-content>
            <v-list-item-title
              class="cursor-pointer"
              @click="selectedItem = item"
            >{{ item.name || item.description }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-menu>
</template>

<script>
export default {
  name: 'SuccessorSelector',
  props: {
    selectedItemId: {
      type: Number,
      default: null
    },
    items: {
      type: Array,
      default: () => []
    },
    relatedName: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      selectedItem: {
        name: ''
      },
    }
  },
  fetch() {
    const item = this.items
      .find(item => item.id === this.selectedItemId )
      if(this.relatedName === 'set') console.log(item)
    if(item) {
      this.selectedItem = item
    } else {
      this.selectedItem = { name: `${this.relatedName}`}
    }
  },
  computed: {
    computedIems() {
      return JSON.parse(JSON.stringify(this.items))
    }
  },
  watch: {
    selectedItemId(newValue) {
      this.$emit('input', newValue)
    }
  },
}
</script>

<style scoped>
.max-height {
  max-height: 400px;
}
</style>