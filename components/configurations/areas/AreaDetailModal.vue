<template>
  <div class="text-center">
    <v-dialog v-model="showDialog" persistent max-width="800px">
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          retain-focus-on-click
          text
          v-bind="attrs"
          v-on="on"
          @click="getAreaDetail"
        >
          Ver Detalles
        </v-btn>
      </template>

      <v-card :loading="loading" light>
        <v-card-title class="text-h5 grey lighten-2">
          Detalles {{area.name}}
        </v-card-title>
        <v-form v-model="isValidForm" ref="form" :disabled="loading">
          <v-card-text>
            <v-row class="mt-5">
              <v-col cols="12">
                <v-text-field v-model="form.name" disabled outlined label="Nombre" />
                <v-text-field 
                  v-model="form.description" :rules="descRules" outlined label="Descripción"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="d-flex flex-column">
                <h3>Color</h3>
                <span>Selecciona color del área</span>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="form.color"
                  :items="colors"
                  label="Color"
                  item-value="id"
                  item-text="name"
                  outlined
                >
                  <template #selection="{ attrs, item }">
                    <v-avatar size="20" v-bind="attrs" :color="item.color_code" />
                    <span class="ml-2"> {{ item.name }} </span>
                  </template>
                  <template #item="{ item }">
                    <v-avatar 
                      size="20" 
                      :color="item.color_code"
                      :style="`border: 1px solid ${item.border_color_code};`"
                    />
                    <span class="ml-2"> {{item.name}} </span>
                  </template>
                </v-select>
              </v-col>              
            </v-row>
          </v-card-text>
        </v-form>
        <v-card-actions class="d-flex justify-end pb-5 mr-2">
            <v-btn color="error" outlined @click="showDialog = false"> Cancelar </v-btn>
            <v-btn color="primary" @click="saveData"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AreaDetailModal',
  props: {
    area: {
      type: Object,
      default: () => {}
    },
    colors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showDialog: false,
      loading: false,
      isValidForm: false,
      form: {
        name: '',
        description: '',
        color: '',
      },
      descRules: [ (v) => !!v || 'Debe asignar una descripción.' ]
    }
  },
  computed: {
    ...mapGetters('configArea', ['areaDetail']),
  },
  watch: {
    showDialog(val) {
      if(!val) this.$refs.form.reset()
    }
  },
  methods: {
    async getAreaDetail() {
      this.loading = true
      await this.$store.dispatch(
        'configArea/fetchConfigArea', 
        this.area.id
      )
      this.setData()
      this.loading = false
    },
    async saveData() {
      this.$refs.form.validate()
      if(!this.isValidForm) return;
      this.loading = true
      const areaDetail = {
        id: this.$route.params.config_id,
        name: this.form.name,
        description: this.form.description,
        color: this.form.color
      }
      await this.$store.dispatch('configArea/editAreaDetail', areaDetail)
      await this.$store.dispatch('configArea/fetchConfigAreas', areaDetail.id);
      this.showDialog = false
    },
    setData() {
      this.form.name = this.areaDetail.name;
      this.form.description = this.areaDetail.description;
      this.form.cells = this.areaDetail.cells
      this.form.color = this.areaDetail.color
    }
  }
}
</script>
