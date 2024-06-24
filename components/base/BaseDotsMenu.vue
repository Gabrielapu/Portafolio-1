<template>
  <v-menu :close-on-content-click="false" bottom :left="left" :right="right">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list width="260px">
      <v-list-item v-for="(item, i) in items" :key="i" @click="emitFunction(item)">
        <v-icon class="mr-2">{{ item.icon }}</v-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-switch 
          v-if="item.action === 'editMode'" 
          v-model="item.value" 
          class="ml-2"
          inset 
          dense
        ></v-switch>
      </v-list-item>
      <v-list-item v-if="editMode">
        <v-icon class="mr-2">{{ editItem.icon }}</v-icon>
        <v-list-item-title>
          {{ editItem.value ? editItem.title1 : editName }}
        </v-list-item-title>
        <v-switch 
          v-model="editItem.value" 
          class="ml-2"
          inset 
          dense
          @click="$emit('editMode')"
        ></v-switch>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'BaseDotsMenu',
  props: {
    editMode: { type: Boolean, default: false },
    editName: { type: String, default: 'Editar' },
    items: { type: Array, default: () => [] },
    right: { type: Boolean, default: false },
    left: { type: Boolean, default: true },
  },
  data() {
    return {
      editItem: { 
        title1: 'Guardar Cambios',
        action: 'editMode', 
        icon: 'mdi-content-save-outline',
        value: false
      }
    }
  },
  methods: {
    emitFunction(item) {
      this.$emit('action', item.action)
    },
  }
}
</script>