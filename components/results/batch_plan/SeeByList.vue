<template>
  <div class="d-flex">
    <v-menu bottom left>
      <template #activator="{ on, attrs }">
        <div class="d-flex justify-space-between align-center" v-bind="attrs" v-on="on">
          <span class="text-body-2 text--secondary mr-2">{{filterName}}:</span>
          <span 
            v-if="value"
            class="text-body-2 primary--text font-weight-medium" 
          >
            {{value.name}}
          </span>
          <v-icon>mdi-chevron-down</v-icon>
        </div>
      </template>
      <v-card style="max-height: 400px;">
        <v-list dense >
          <v-list-item v-for="item in items" :key="item.id" @click="$emit('input', item)">
            <v-list-item-title class="cursor-pointer">
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'SeeByList',
  props: {
    value: { type: Object, default: () => {}},
    items: { type: Array, default: () => [] },
    filterName: { type: String, default: ''}
  }
}
</script>
