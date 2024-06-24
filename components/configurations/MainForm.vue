<template>
    <v-card flat class="elevation-1 ma-5 pa-15 ma-0">
      <v-form ref="form" v-model="isValidForm" @submit.prevent="saveData">
          <v-row>
            <v-col cols="3">
              <p class="mb-0 body-1 font-weight-bold">
                Nombre de la Configuración
              </p>
              <p class="body-2 ">
                Escribe nombre de la Configuración
              </p>
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="config.name"
                :counter="maxNameChars"
                :rules="nameRules"
                label="Nombre"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="3">
              <p class="mb-0 body-1 font-weight-bold">
                Descripción de la Configuración
              </p>
              <p class="body-2 ">
                Escribe descripción de la Configuración
              </p>
            </v-col>
            <v-col cols="9">
              <v-textarea
                v-model="config.description"
                :counter="maxDescChars"
                :rules="descRules"
                label="Descripción"
                outlined
                dense
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <p class="mb-0 body-1 font-weight-bold">
                Planta
              </p>
              <p class="body-2 ">
                Selecciona Planta correspondiente
              </p>
            </v-col>
            <v-col cols="9">
              <v-autocomplete
                v-model="config.plant"
                :items="plantList"
                :rules="[(v) => !!v || 'Planta es Requerida']"
                label="Planta"
                outlined
                dense
                required
              >
                <template #no-data>
                  <p>No hay datos disponibles</p>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn 
                type="submit"
                :disabled="!isValidForm || loading"
                :loading="loading"
                outlined
                class='blue--text gray'       
              >
                {{ submitButtonText }}
              </v-btn>
            </v-col>
          </v-row>
      </v-form>
    </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'MainForm',
  props: {
    toEditConfig: {
      type: Object,
      required: false,
      default() {
        return {
          name: '',
          description: '',
          plant: 2,
          tags: [],
          cells: []
        };
      }
    },
    editedIndex: {
      type: Number,
      required: false,
      default: -1,
    },
  },
  data() {
    return {
      submitButtonText: this.editedIndex === -1 ? 'Crear' : 'Editar',
      navTitle: this.editedIndex === -1 ? 'Crear Configuración' : 'Editar Configuración',
      swalTitle: this.editedIndex === -1 ? 'Configuración creada': 'Configuración editada',
      swalText: this.editedIndex === -1 ? 'La configuración ha sido creada exitosamente' : 'La configuración ha sido editada exitosamente',
      maxNameChars: 100,
      maxDescChars: 90,
      config: Object.assign({}, this.toEditConfig),
      nameRules: [
        (v) => !!v || 'Debe asignar un nombre.',
        (v) =>
          (v && v.length <= this.maxNameChars) ||
          `Nombre debe contener máximo ${this.maxNameChars} caracteres`,
      ],
      descRules: [
        (v) => !!v || 'Debe escribir una descripción.',
        (v) =>
          (v && v.length <= this.maxNameChars) ||
          `Descripción debe contener máximo ${this.maxDescChars} caracteres`,
      ],
      isValidForm: false,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      plantList: 'plant/getPlantListForSelect',
    }),
  },
  beforeMount() {
    this.changeTitle(this.navTitle);
  },
  methods: {
    ...mapActions({
      create: 'configuration/createConfig',
      edit: 'configuration/editConfig'
    }),
    ...mapMutations({
      changeTitle: 'global/setNavTitle'
    }),
    async saveData() {
      this.loading = true;
      this.$nuxt.$loading.start();
      try {
        if (this.editedIndex === -1) {
          await this.create(this.config);
        }
        else {
          await this.edit(this.config);
        }
        this.$nuxt.$loading.finish();
        this.loading = false;
        this.$router.push(`/plant/${this.config.plant}`);
        this.$swal.fire({
          title: this.swalTitle,
          text: this.swalText,
          icon: 'success',
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } catch ({ message }) {
        this.loading = false;
        this.$nuxt.$loading.finish();
        this.$swal.fire({
          title: '¡Error!',
          text: message,
          icon: 'error',
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    },
  }
}
</script>

