<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="mezcla"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>            
      <v-col cols="4">
        <h3>Nombre</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field v-model="form.name" label="Nombre" outlined :rules="rule"/>
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Perfil</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configprofile" 
          :items="getProfiles" 
          outlined
          item-text="name"
          item-value="id" 
          label="Perfil"
          :rules="rule"             
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Area</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.configarea" 
          :items="getConfigAreas" 
          outlined
          item-text="name"
          item-value="id" 
          label="Área"
          :rules="rule"             
        />
      </v-col>
      <v-col cols="4" class="d-flex flex-column">
        <h3>Color</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-select
          v-model="form.color" 
          :items="getColors" 
          outlined
          item-text="name"
          item-value="id" 
          label="Color"
          :rules="rule"             
        >
          <template #append>
            <v-avatar
              v-if="form.color"
              :color="getColor"
              :style="`border: 1px solid ${getBorderColor};`"
              size="20"
            ></v-avatar>
          </template>
          <template #item="{ item }">
            <v-avatar
              :color="item.color_code"
              :style="`border: 1px solid ${item.border_color_code};`"
              size="20"
            ></v-avatar>
            <span class="ml-2"> {{item.name}} </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="4">
        <h3>Residencia</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.residence_time" type="number" label="Residencia" outlined 
          :rules="ruleIntField"
        />
      </v-col> 
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageBlends',
  mixins: [CrudMixin],
  async fetch() {
    await this.$store.dispatch('colors/fetchColors')
  },
  computed: {
    getColor() {
      return this.getColors.find(color => color.id === this.form.color)?.color_code
    },
    getBorderColor() {
      return this.getColors.find(color => color.id === this.form.color)?.border_color_code
    }
  },
  methods: {
    async setData() {
      const blend = {
        ...this.form,
        config: this.$route.params.config_id,
        plant: this.$route.params.plant_id
      }
      await this.saveData('configBlend/saveBlend', blend)
    }
  },
}
</script>
