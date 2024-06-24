<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="set de equipo"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>
      <v-col cols="4">
        <h3>Código</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.code" 
          label="Código" 
          outlined 
          :rules="[
            v => !!v || 'Campo obligatorio',
            v => (!!v && !existCode) || 'El código ya existe'
          ]"
        />
      </v-col>
      
      <v-col cols="4">
        <h3>Descripción</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field v-model="form.description" outlined label="Descripción" :rules="rule"/>
      </v-col>            
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import { mapGetters } from 'vuex'
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageEquipmentSet',
  mixins: [CrudMixin],
  computed: {
    ...mapGetters('configEquipmentSet', ['getSetCodes']),
    existCode() {
      const codes = JSON.parse(JSON.stringify(this.getSetCodes))
        .filter(c => c !== this.item.code)
      return codes.includes(this.form.code)
    }
  },
  methods: {
    async setData() {      
      const equipmentSet = {
        ...this.form,
        config: this.$route.params.config_id,
        configprofile: this.$route.params.profile_id
      }
      await this.saveData('configEquipmentSet/saveEquipmentSet', equipmentSet)
    }
  },
}
</script>