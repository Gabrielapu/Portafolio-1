<template>
  <div class="d-flex flex-column">
    <v-btn color="primary" text :class="mini ? 'ma-0 pa-0' : 'mb-5 mx-2' " @click="logout">
      Cerrar <br v-if="mini"> sesión
    </v-btn>
    <v-divider class="mb-2 mx-4"></v-divider>
    <div class="d-flex justify-center">
      <v-avatar
        color="primary"
        size="50"
        :class=" mini ? '' : 'mr-1'"
      >
        <span class="white--text">{{getInitials}}</span>
      </v-avatar>
      <div v-if="!mini" class="font-weight-bold">
        <span> {{user.first_name}} {{user.last_name}}</span>
        <br>
        <small> {{user.email}} </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    mini: {
      type: Boolean, default: false
    }
  },
  computed: {
    getInitials() {
      /* eslint-disable */
      let initials = 'UN'
      if (this.$auth.user) {
        const { first_name, last_name} = this.$auth.user
        if(first_name && last_name) {
          initials = `${first_name.substring(0,1)}${last_name.substring(0,1)}` 
        } else if(first_name) {
          initials = first_name.substring(0,2)
        }
      }
      return initials.toUpperCase()
    },
    user() {
      return this.$auth.user
    }
  },
  methods: {
    logout() {
      this.$auth.$storage.setUniversal('user', false)
      this.$auth.logout()
    }
  }
}
</script>