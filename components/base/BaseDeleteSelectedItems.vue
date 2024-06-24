<template>
  <div>
    <v-btn text @click="showDialog = true">
      <v-icon> mdi-delete </v-icon>
      Eliminar seleccionados
    </v-btn>
    <ConfigurationsConfirmDelete 
      v-model="showDialog" 
      type="plural" 
      @deleteFiles="$emit('deleteFiles')"
    />
  </div>
</template>

<script>
export default {
  name: 'DeleteSelectedItems',
  data() {
    return {
      showDialog: false
    }
  },
}
</script>
