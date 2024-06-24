<template>
  <v-menu bottom left>
    <template #activator="{ on, attrs }">
      <div class="d-flex justify-space-between" v-bind="attrs" v-on="on">
        <span v-if="selectedItem" outlined>
          {{selectedItem.name}}
        </span>
        <v-icon>mdi-menu-down</v-icon>
      </div>
    </template>
    <div class="max-height">
      <v-list>
        <span class="text-caption ml-4">Seleccione {{relatedName}}</span>
        <v-list-item v-for="item, index in computedIems" :key="index">
          <v-list-item-content>
            <v-list-item-title
              class="cursor-pointer"
              :value="item.activity_id"
              @click="manageActivity(item)"
            >
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-menu>
</template>

<script>
export default {
  name: 'ActivitySelector',
  props: {
    value: { type: Number, default: null },
    activityByBatch: { type: Object, default: () => {} },
    items: { type: Array, default: () => [] },
    relatedName: { type: String, default: () => '' }
  },
  data() {
    return {
      selectedItem: {
        name: ''
      },
    }
  },
  fetch() {
    this.searchItem()
  },
  computed: {
    computedIems() {
      return JSON.parse(JSON.stringify(this.items))
    }
  },
  watch: {
    value() {
      this.searchItem()
    }
  },
  methods: {
    searchItem() {
      const item = this.items
        .find(item =>
          item.activity_id === this.value )
      if(item) {
        this.selectedItem = item
      } else {
        this.selectedItem = { name: `${this.relatedName}`}
      }
    },
    manageActivity(item) {
      this.selectedItem = item
      this.$emit('input', item.activity_id)
      this.$emit('selectedItem', item)
    }
  }
}
</script>

<style scoped>
.max-height {
  max-height: 400px;
}
</style>