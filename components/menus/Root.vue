<template>
  <div>
    <v-list nav>
      <!-- <v-img
        v-if="logoSideBar"
        :aspect-ratio="41/10"
        :src="require('/static/Logo.png')"
        class="img-logo mb-3 ml-2 mt-0"
        @click="$router.push({ path: '/'})"
      ></v-img> -->
      <v-list-item-subtitle class="nav-title">Navegación</v-list-item-subtitle>
    </v-list>
    <v-list nav class="nav-items" dense>
      <v-list-item :to="'/'">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Inicio </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
      <v-list-group :value="false" prepend-icon="mdi-menu">
        <template #activator>
          <v-list-item-title>Escenarios</v-list-item-title>
        </template>
        <v-list-item
          v-for="i in rootMenu"
          :key="i.title"
          :to="i.to_plan"
          class="text-center"
        >
          <v-list-item-title v-text="i.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false" prepend-icon="mdi-factory">
        <template #activator>
          <v-list-item-title>Plantas</v-list-item-title>
        </template> 
        <v-list-item
          v-for="i in rootMenu"
          :key="i.title"
          :to="i.to_config"
          class="text-center"
        >
          <v-list-item-title v-text="i.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RootMenu',
  data() {
    return {
      rootMenu: [
        {
          title: 'Planta 3',
          to_config: '/plant/1',
          to_plan: '/scenarios/plant/1',
        },
        {
          title: 'Planta 4',
          to_config: '/plant/2',
          to_plan: '/scenarios/plant/2',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      isHome: 'global/getIsHome',
      isForm: 'global/getIsForm'
    }),
    logoSideBar () {
      if (this.isHome + this.isForm === 1) {
        return true
      }
      else {
        return false
      }
    },
  }
}
</script>

<style scoped>
  .v-divider {
    position: relative;
    margin-top:200%;
    margin-left:10px;
    margin-right:10px;
  }
  .img-logo{
    width:70%;
    height:70%;
  }
  .nav-title {
    margin-left: 16px;
    color: gray;
    margin-bottom: 0;
    margin-top: 30px;
  }
  .nav-items {
    font-weight: 500;
  }
</style>