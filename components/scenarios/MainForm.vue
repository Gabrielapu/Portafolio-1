<template>
  <v-form ref="ScenarioForm" v-model="isValidForm" @submit.prevent="saveData">
    <v-progress-linear :value="progress"></v-progress-linear>
    <div class="pl-5 pt-10 pr-5 content">
      <v-tabs centered>
        <v-tab :disabled="loading">
          <v-avatar color="primary" size="25" class="mr-2"> 
            <span class="white--text">1</span>
          </v-avatar>
          Ajustes Generales
          <v-icon v-if="validGeneralSettings" right> mdi-check </v-icon>
        </v-tab>
        <v-tab :disabled="loading">
          <v-avatar color="primary" size="25" class="mr-2"> 
            <span class="white--text">2</span>
          </v-avatar>
          Demanda e Inventario
          <v-icon v-if="validDemandInventory" right> mdi-check </v-icon>
        </v-tab>
        <v-tab :disabled="loading">
          <v-avatar color="primary" size="25" class="mr-2"> 
            <span class="white--text">3</span>
          </v-avatar>
          Configuración
          <v-icon v-if="validBaseConfig" right> mdi-check </v-icon>
        </v-tab>

        <v-tab-item active-class="container">
          <ScenariosGeneralSettings 
            ref="generalSettings"
            class="mt-10" 
            :plan-prop="plan"
            @isValid="validGeneralSettings = $event" 
          />
        </v-tab-item>
        <v-tab-item active-class="container">
          <ScenariosUploadDocs class="mt-10" @onFile="addFile"/>
        </v-tab-item>
        <v-tab-item active-class="container">
          <ScenariosBaseConfig 
            class="mt-10" 
            :plan-prop="plan"
            :plan-parameters="planParameters"
            @isValid="validBaseConfig = $event"
          />
        </v-tab-item>
      </v-tabs>
    </div>
    <ScenariosConfirmExecution v-model="showDialog" @executePlan="executePlan"/>
    <ScenariosAlertModal 
      v-if="showAlertDialog"
      v-model="showAlertDialog" 
      :alert-data="alertData" 
      @executePlan="executePlan"
      @saveData="saveData"
    />
  </v-form>
</template>

<script>

export default {
  name: 'MainForm',
  props: {
    toEditScenario: {
      type: Object,
      required: false,
      default() {
        return {
          name: '',
          start_date: this.$dayjs().day(1).format('YYYY-MM-DD'),
          end_date: this.$dayjs().day(28).format('YYYY-MM-DD'),
          plant: 2,
          plangroup: null,
          tags: null,
          config: null,
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
      showDialog: false,
      validGeneralSettings: false,
      validDemandInventory: false,
      validBaseConfig: false,
      submitButtonText: this.editedIndex === -1 ? 'Crear' : 'Editar',
      navTitle: this.editedIndex === -1 
        ? 'Crear Escenario' 
        : 'Editar Escenario',
      postUrl: this.editedIndex === -1 
        ? 'planification/createPlan' 
        : 'planification/editPlan',
      swalTitle: this.editedIndex === -1 
        ? 'Escenario creado' 
        : 'Escenario editado',
      swalText: this.editedIndex === -1 
        ? 'El escenario ha sido creado exitosamente' 
        : 'El escenario ha sido editado exitosamente',
      formTitle: 'Ajustes Generales',
      plan: Object.assign({}, this.toEditScenario),
      isValidForm: false,
      loading: false,
      files: [],
      runPlan: false,
      showAlertDialog: false,
      alertData: {},
      planParameters: {
        efficiency: 12,
        lost_sale: 15,
        break_band: 10,
        middle_band: 5,
        maximum_band: 5,
        product_expired: 20,
      },
    };
  },
  computed: {
    validForm() {
      return this.validGeneralSettings && 
        this.validDemandInventory && 
        this.validBaseConfig;
    },
    completeLoadFiles() {
      const completedScore = 30;
      const maxFiles = 3
      return this.files.filter(file => file.file).length === maxFiles ? completedScore : 0;
    },
    completeGeneralSettings() {
      const completedScore = 50;
      return this.validGeneralSettings ? completedScore : 0;
    },
    completeBaseConfig() {
      const completedScore = 20;
      return this.validBaseConfig ? completedScore : 0;
    },
    progress() {
      return this.completeLoadFiles + this.completeGeneralSettings + this.completeBaseConfig;
    }
  },
  watch: {
    validForm(val) {
      this.$root.$emit('isValidForm', val);
    }
  },
  beforeMount() {
    this.changeTitle();
  },
  mounted() {
    this.$root.$on('saveScenario', async () => {
      const response = await this.validateExcels()
      const { success, warnings, errors } = this.checkExcels(response);
      this.alertData = { data: response.data, trigger: 'save' }
      this.showAlertDialog = warnings || errors
      if(success) this.saveData()
    })
    this.$root.$on('calculateScenario', async () => {
      const response = await this.validateExcels()
      const { success, warnings, errors } = this.checkExcels(response);
      this.alertData = { data: response.data, trigger: 'calculate' }
      this.showAlertDialog = warnings || errors
      this.showDialog = !!success;
    })
  },  
  methods: {
    async validateExcels() {
      return await this.$store.dispatch(
        'planification/validateExcels',
        { files: this.files, configId: this.plan.config }
      );
    },
    checkExcels(excelsInfo) {
      const { data } = excelsInfo
      const success = !!data.success
      const warnings = !!data.warning
      const errors = !!data.error
      return { success, warnings, errors }
    },
    executePlan() {
      this.runPlan = true
      this.saveData()
    },
    addFile(fileArg) {
      this.files = this.files.filter(file => file.field !== fileArg.field)
      this.files.push(fileArg)
      if(this.files.filter(file => file.file).length === 3) {
        this.validDemandInventory = true
      } else {
        this.validDemandInventory = false
      }
    },
    changeTitle() {
      this.$store.commit('global/setNavTitle', this.navTitle)
    },
    async saveData() {
      const valid = this.$refs.generalSettings?.validate()
      if(!valid) return
      this.loading = true;
      this.$nuxt.$loading.start();
      this.plan.tags = []
      try {        
        this.$root.$emit('creatingPlanification')
        const { data } = await this.$store.dispatch(this.postUrl, this.plan);
        await this.$store.dispatch(
          'planification/sendParameters', 
          { 
            planificationId: data.id,
            parameters: this.planParameters
          }
        )
        await this.$store.dispatch(
          'planification/loadFiles', 
          { files: this.files, planificationId: data.id }
        );
        if(this.runPlan) {
          this.$store.dispatch('planification/executePlanification', data)
        }
        this.$nuxt.$loading.finish();
        this.loading = false;
        this.$router.push({path: `/scenarios/plant/${this.$route.query.plant}/`})
        this.$swal.fire({
          title: this.swalTitle,
          text: this.swalText,
          icon: 'success',
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000
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
          timer: 2000
        });
        this.$router.push({path: `/scenarios/plant/${this.$route.query.plant}/`})
      }
    },
  },
}
</script>

<style scoped>
.content {
  height: 94vh;
  background-color: white;
}
</style>