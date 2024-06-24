<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="fullscreen"
    width="1366px"
    :origin="origin"
    persistent
    transition="scale-transition"
  >
    <template #activator="{ on, attrs }">
      <v-btn rounded height="56px" color="ml-1" v-bind="attrs" v-on="on">
        <v-icon color="primary"> mdi-refresh </v-icon> 
        <span v-if="!mini" class="ml-2 primary--text">Replanificar</span>
      </v-btn>
    </template>
    <ResultsReplanStepper 
      :minimize-modal="minimizeModal"
      :close-modal="closeModal"
      :fullscreen="fullscreen"
      @fullscreen="fullscreen = $event"
    />    
  </v-dialog>
</template>

<script>
export default {
  name: 'MainModal',
  props: {
    mini: { type: Boolean, default: false }
  },
  data() {
    return {
      dialog: false,
      fullscreen: false,
      origin: 'center center'
    }
  },
  methods: {
    minimizeModal() {
      this.origin = 'right bottom'
      this.dialog = false
    },
    closeModal() {
      this.origin = 'center center' 
      this.dialog = false
    }
  }
}
</script>

