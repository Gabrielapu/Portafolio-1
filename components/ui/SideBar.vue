<template>
  <v-navigation-drawer
    app
    clipped
    permanent
    :mini-variant="mini"
    :mini-variant-width="getIsFullscreen ? '1' : '90'"
    :width="getIsFullscreen ? '1' : '256'"
  >
    <template v-if="!inRoot && !inConfiguration" #prepend>
      <div class="d-flex justify-start ml-3">
        <v-card flat width="25px" class="ma-1">
          <v-icon dense @click="mini = !mini">
            {{mini ? `mdi-menu` : `mdi-menu-open`}}
          </v-icon>
        </v-card>
      </div>    
    </template>
    <div class="scroll">
      <MenusRoot v-if="inRoot" />
      <MenusConfigurations v-if="inConfiguration"/>
      <MenusResults v-if="inResults" :mini="mini"/>
    </div>
    <AuthUserInfo class="absolute" :mini="mini"/>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBar',
  data() {
    return {
      mini: false,
    }
  },
  computed: {
    ...mapGetters('global', ['getIsFullscreen']),
    inConfiguration() {
      return this.$route.params.config_id
    },
    inScenarios() {
      return this.$route.name === 'scenarios-add_scenario' ||
        this.$route.name === 'scenarios-scenario_id-edit_scenario'
    },
    inRoot() {
      return !this.inConfiguration && !this.inScenarios && !this.inResults
    },
    inResults() {
      return this.$route.name?.includes('results')
    }
  },
  watch: {
    inRoot() {
      this.mini = false
    }
  }
}
</script>

<style scoped>
.absolute {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 250px);
}
::-webkit-scrollbar {
  display: none;
}
</style>
