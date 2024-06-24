<template>
  <div>
    <v-card min-height="500px" :loading="loading" flat outlined class="mx-5 my-5">
      <v-row v-if="!getProfiles.length" class="justify-center mt-5">
        <h4>No hay perfiles disponibles</h4>
      </v-row>
      <v-row v-if="!!getProfiles.length">
        <v-col cols="3" class="mt-5 d-flex flex-column align-start">
          <span class="ml-5 text-h6">Listado de perfiles</span>
          <v-btn color="primary" class="ml-5 mt-2" @click="showDialog = true">
            <v-icon> mdi-plus </v-icon> 
            Nuevo
          </v-btn>
        </v-col>
        <v-col cols="9">
          <v-list>
            <v-list-item
              v-for="profile in getProfiles"
              :key="profile.id"
            > 
              <v-list-item-content>
                <v-list-item-title v-text="profile.name" />
                <v-list-item-subtitle v-text="profile.description" />
                <v-divider class="mt-3"></v-divider>
              </v-list-item-content>
              <v-list-item-action class="d-flex flex-row">
                <v-btn 
                  color="warning"
                  class="black--text mr-2"                
                  @click="$router.push({ 
                    name: 'plant-plant_id-configurations-config_id-profiles-profile_id',
                    params: {
                      plant_id: $route.params.plant_id,
                      config_id: $route.params.config_id, 
                      profile_id: profile.id 
                    }
                  })"
                >
                  Editar
                </v-btn>
                <v-tooltip v-if="profile.has_blend" top>
                  <template #activator="{ on, attrs }">
                    <v-btn color="white" v-bind="attrs" v-on="on">
                      Eliminar
                    </v-btn>
                  </template>
                  <span> No se puede eliminar el perfil porque tiene mezclas asociadas </span>
                </v-tooltip>
                <v-btn v-if="!profile.has_blend" color="error" @click="showConfirmDialog(profile)">
                  Eliminar
                </v-btn>
                <v-btn color="primary" class="ml-2" @click="duplicateProfile(profile.id)">
                  Duplicar
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
    <ConfigurationsProfilesAddProfile
      v-model="showDialog"
      :refresh-data="fetchProfiles"
    />
    <ConfigurationsConfirmDelete 
      v-model="showDeleteDialog"
      :item="itemToBeDeleted"
      @deleteFile="deleteProfile"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PreparationsList',
  data() {
    return {
      loading: true,
      showDialog: false,
      showDeleteDialog: false,
      itemToBeDeleted: {}
    }
  },
  async fetch() {
    await this.fetchProfiles();
  },
  computed: {
    ...mapGetters('configProfile', ['getProfiles'])
  },
  methods: {
    async fetchProfiles() {
      await this.$store.dispatch(
        'configProfile/fetchProfiles', 
        this.$route.params.config_id
      );
      this.loading = false
    },
    showConfirmDialog(profile) {
      this.itemToBeDeleted = profile
      this.showDeleteDialog = true
    },
    async deleteProfile() {
      await this.$store.dispatch('configProfile/deleteProfile', this.itemToBeDeleted.id)
      await this.fetchProfiles()
    },
    async duplicateProfile(profileId) {
      await this.$store.dispatch('configProfile/duplicateProfile', profileId)
      await this.fetchProfiles()
    }
  }
}
</script>

<style scoped>
.v-application .text-h6 {
  font-weight: 400;
}
</style>