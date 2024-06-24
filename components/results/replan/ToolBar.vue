<template>
  <v-toolbar
    color="#424242"
    dark
    height="52px"
  >
    <v-toolbar-title class="subtitle-1">Replanificación</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="fullscreen = !fullscreen">
      <v-icon :class="{ 'rotate-180': fullscreen }">mdi-open-in-new</v-icon>
    </v-btn>
    <v-btn icon @click="closeModal">
      <v-icon>mdi-window-close</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    minimizeModal: { type: Function, default: () => {} },
    closeModal: { type: Function, default: () => {} }
  },
  data() {
    return {
      fullscreen: false
    }
  },
  watch: {
    fullscreen(val) {
      this.$emit('fullscreen', val)
    }
  }
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg)
}
</style>