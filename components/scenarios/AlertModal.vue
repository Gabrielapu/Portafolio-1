<template>
  <div class="text-center">
    <v-dialog
      :value="value"
      width="800"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          <v-icon :color="color" class="mr-1"> 
            {{ color === 'warning' ? 'mdi-alert-outline' : 'mdi-close-circle-outline' }}
          </v-icon>
          <span :class="`${color}--text`">{{title}}</span>
        </v-card-title>
        <v-card-text v-if="alertData.data.warning" class="body-1 mt-5 black--text">
          <div v-for="warning, index in alertData.data.warnings" :key="index">
            <span class="font-weight-black"> 
              {{warning.message}}:
            </span>
            <ul v-if="warning.items" class="item-container">
              <li v-for="item, i in warning.items" :key="i">{{item}}</li>
            </ul>
          </div>
        </v-card-text>
        <v-card-text v-else class="body-1 mt-5 black--text">
          <span> {{alertData.data.message}} </span>
        </v-card-text>      
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('input', false)">
            Cancelar
          </v-btn>
          <v-btn 
            v-if="!alertData.data.error" 
            color="primary" 
            text 
            @click="alertData.trigger === 'calculate' ? executePlan() : saveModel()"
          >
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AlertModal',
  props: {
    value: { type: Boolean, required: true },
    alertData: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialog: false,
      title: '',
      color: '',
      excelTypesInSpanish: {
        demand: 'Demanda',
        maintenance: 'Mantenimiento',
        stock: 'Inventario'
      }
    };
  },
  fetch() {
    this.getDataFromError()
  },
  computed: {
    excelTypes() {
      return Object.keys(this.alertData.data).filter(key => !key.match(/warning|success/))
    }
  },
  watch: {
    value(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    executePlan() {
      this.$emit('executePlan')
      this.$emit('input', false)
    },
    saveModel() {
      this.$emit('saveData')
      this.$emit('input', false)
    },
    getDataFromError() {
      if(this.alertData.data.warning) {
        this.color = 'warning'
        this.title = 'Advertencia'
      }
      if(this.alertData.data.error) {
        this.color = 'error'
        this.title = 'Error'
      }
    },
  },
}
</script>

<style scoped>
.item-container {
  max-height: 100px; 
  overflow-x: auto;
  border: 1px solid rgb(218, 218, 218); 
  border-radius: 2px;
}
</style>