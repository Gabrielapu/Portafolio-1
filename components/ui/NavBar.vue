<template>
  <v-app-bar
    v-if="!isFullscreen"
    light
    app 
    clipped-left
    elevation="0"
    color=white
    style="border-bottom: 1px solid #d2d2d2 !important;"
  >
    <v-app-bar-nav-icon @click="goBack()"><v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon>
    <v-img
      :aspect-ratio="41/10"
      :src="require('/static/Logo.png')"
      contain
      max-height="40"
      max-width="164"
      class="cursor-pointer"
      @click="$router.push({ path: '/'})"
    ></v-img>

    <v-spacer></v-spacer>

    <v-toolbar-title class="font-weight-bold">{{navTitle}}</v-toolbar-title>

    <v-spacer></v-spacer>
    <ScenariosSaveButtons v-if="showSaveButtons" />
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "NavBar",
  computed: {
    ...mapGetters({
      navTitle: 'global/getNavTitle',
      isFullscreen: 'global/getIsFullscreen'
    }),
    showSaveButtons() {
      return this.$route.name === 'scenarios-add_scenario' ||
        this.$route.name === 'scenarios-scenario_id-edit_scenario'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
  .img-logo{
    width:1%;
    height:1%;
  }
</style>