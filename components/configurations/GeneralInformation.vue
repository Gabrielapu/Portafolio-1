<template>
  <v-card :loading="loading" light flat outlined class="pa-5 mx-5 my-5">
    <v-form v-model="isValidForm" :disabled="loading">
      <v-row>
        <v-col cols="6" class="d-flex flex-column">
          <h3>Nombre de configuración</h3>
          <span>Visible para identificación</span>
        </v-col>
        <v-col cols="6">
          <v-text-field 
            v-model="form.name" :rules="nameRules"
            label="Nombre" outlined @blur="saveData"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" class="d-flex flex-column">
          <h3>Descripción de Configuración de Planta</h3>
          <span>En una línea. ¿Qué la diferencia?</span>
        </v-col>
        <v-col cols="6">
          <v-text-field 
            v-model="form.description" :rules="descriptionRules"
            label="Descripción" outlined @blur="saveData"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GeneralInformation',
  data() {
    return {
      form: {
        name: '',
        description: '',
        plant: 1,
        tags: [],
        cells: []
      },
      loading: true,
      maxDescriptionChars: 90,
      nameRules: [
        (v) => !!v || 'Debe asignar un nombre.',
        (v) =>
          (v && v.length <= 50) || 'Nombre debe contener máximo 50 caracteres',
      ],
      descriptionRules: [
        (v) => !!v || 'Debe asignar una descripción.',
        (v) =>
          (v && v.length <= this.maxDescriptionChars) ||
          `Descripción debe contener máximo ${this.maxDescriptionChars} caracteres`,
      ],
      isValidForm: false
    }
  },
  async fetch() {
    await this.loadData();
  },
  computed: {
    ...mapGetters('configuration', ['getConfiguration'])
  },
  methods: {
    setData() {
      this.form.name = this.getConfiguration.name;
      this.form.description = this.getConfiguration.description;
      this.form.plant = this.getConfiguration.plant;
      this.form.tags = this.getConfiguration.tags
      this.form.cells = this.getConfiguration.cells
    },
    async loadData() {
      const id = this.$route.params.config_id;
      await this.$store.dispatch('configuration/fetchConfiguration', id);
      this.setData();
      this.loading = false
    },
    async saveData() {
      if(!this.isValidForm) return;

      this.loading = true
      const configuration = {
        id: this.$route.params.config_id,
        name: this.form.name,
        description: this.form.description,
        plant: this.$route.params.plant_id,
        tags: this.form.tags.map(tag => ({
          id: tag.id || null,
          name: tag.name || tag
        })),
        cells: this.form.cells.map(cell => ({
          id: cell.id || null,
          name: cell.name || cell
        }))
      }
      await this.$store.dispatch('configuration/editConfiguration', configuration);
      this.loading = false
    }
  }
}
</script>
