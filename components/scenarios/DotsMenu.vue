<template>
  <v-menu bottom left>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" @click="callFn(item)">
        <v-icon class="mr-2">{{item.icon}}</v-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'DotsMenu',
  data() {
    return {
      items: [
        { 
          title: 'Descargar', 
          action: 'downloadTable', 
          icon: 'mdi-download' 
        },
        { 
          title: 'Duplicar', 
          action: 'duplicateScenarios', 
          icon: 'mdi-content-copy' 
        },
        { 
          title: 'Eliminar', 
          action: 'deleteRows', 
          icon: 'mdi-delete-outline' 
        }
      ],
    }
  },
  methods: {
    callFn(item) {
      this[item.action](item)
    }
  }
}
</script>

<style>

</style>