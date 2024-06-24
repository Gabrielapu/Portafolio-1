<template>
  <v-app :value="isHome">
    <div v-if="isHome">
      <UiSideBar />
    </div>
    <div v-else-if="isForm">
      <UiNavBar />
    </div>
    <div v-else>
      <UiNavBar />
      <UiSideBar />
    </div>
    <UtilsErrorSnackBar />
    <v-main class="grey lighten-5 black--text">
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import capitalizeFirstChar from '@/mixins/capitalizeFirstChar'

Vue.mixin(capitalizeFirstChar)

export default {
  name: 'DefaultLayout',
  async fetch() {
    if(!this.user?.id) {
      const userId = JSON.parse(localStorage.getItem('auth.user')).id
      if(userId) {
        const user = await this.$axios.get(`user/${userId}/`)
        this.$auth.$storage.setUniversal('user', user.data, true)
        this.$auth.setUser(user.data)
      }
    }
  },
  computed: {
    ...mapGetters({
      isHome: 'global/getIsHome',
      isForm: 'global/getIsForm',
    }),
    ...mapState({
      user: state => state.auth.user
    })
  }
}
</script>
