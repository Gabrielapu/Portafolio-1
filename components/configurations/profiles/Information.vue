<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h5 class="text-h5">Informacion {{formData.name}}</h5>
        <span class="text-subtitle-2">Completa la información para identificar el perfil.</span>
      </v-col>
    </v-row>
    <v-form ref="form" v-model="isValidForm">
      <v-row>
        <v-col cols="6" class="d-flex flex-column pb-1">
          <h3 class="text-subtitle-1">Nombre del perfil</h3>
          <span class="text-body-2">Visible para identificación</span>
        </v-col>
        <v-col cols="6" class="pb-1">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-text-field 
                v-model="formData.name" outlined label="Nombre" :rules="rule"
                v-bind="attrs" v-on="on" @blur="saveData"
              />
            </template>
            <span> La información se guarda automáticamnete</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="6" class="d-flex flex-column pt-1">
          <h3 class="text-subtitle-1">Descripción</h3>
          <span class="text-body-2">Descripción del perfil</span>
        </v-col>
        <v-col cols="6" class="pt-1">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-text-field 
                v-model="formData.description" outlined 
                label="Descripción" :rules="rule" 
                v-bind="attrs" v-on="on" @blur="saveData"
              />
            </template>
            <span> La información se guarda automáticamnete</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProfileInformation',
  props: {
    refreshData: { type: Function, default: () => {} }
  },
  data() {
    return {
      rule: [v => !!v || 'Campo obligatiorio'],
      isValidForm: false,
      modifiedForm: false
    }
  },
  computed: {
    ...mapGetters('configProfile', ['getProfileData']),
    formData() {
      return JSON.parse(JSON.stringify(this.getProfileData))
    },
  },
  methods: {
    async saveData() {
      const validForm = this.$refs.form.validate()
      if(!validForm) return;
      const profile = {
        ...this.formData,
        config: this.$route.params.config_id
      }
      await this.$store.dispatch('configProfile/saveProfile', profile)
      await this.refreshData()
    }
  }
}
</script>
