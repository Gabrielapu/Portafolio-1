<template>
  <div>
    <ScenariosDateFilter @date="filterByDate"/>
    <BaseTable 
      :headers="computedHeaders"
      :items="plans"
      :loading="$fetchState.pending"
      :show-dots-menu="false"
      search-bar-label="Buscar"
      filters-container-classes="mx-2"
      table-classes="ma-5"
    >
      <template #table-actions>     
        <!-- <ScenariosColumnDisabler @toggleColumn="toggleColumn"/> -->
        <!-- <ScenariosDotsMenu /> -->
      </template>
      <template #[`item.start_date`]="{ item }">
        {{ $dayjs(item.start_date).format('DD-MM-YYYY') }}
      </template>
      <template #[`item.total_break`]="{ item }">
        <span v-if="item.total_break && item.status === 'Ejecutado'">{{item.total_break | thousands_separator}}</span>
        <span v-else> - </span>
      </template>
      <template #[`item.total_setup`]="{ item }">
        {{item.total_setup && item.status === 'Ejecutado' ? item.total_setup : '-'}}
      </template>
      <template #[`item.action`]="{ item }">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn icon color="grey" v-bind="attrs" v-on="on" @click="deleteThisPlan(item)">
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </template>
          <span> Eliminar </span>
        </v-tooltip>
        <v-tooltip v-if="item.status === 'Error'" top>
          <template #activator="{ on, attrs }">
            <v-btn icon color="grey" v-bind="attrs" v-on="on">
              <v-icon color="primary" @click="openModal(item)"> 
                mdi-reload
              </v-icon>
            </v-btn>
          </template>
          <span> Ejecutar nuevamente </span>
        </v-tooltip>
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn icon color="grey" v-bind="attrs" v-on="on">
              <v-icon v-if="item.status === 'Creado'" color="primary" @click="openModal(item)"> 
                mdi-play-circle 
              </v-icon>
              
              <v-icon v-if="item.status === 'Ejecutado'" color="primary"> 
                mdi-checkbox-marked-circle-outline 
              </v-icon>
              <v-progress-circular
                v-if="item.status === 'En Proceso'"
                indeterminate
                color="primary"
                size="20"
              ></v-progress-circular>
              <v-icon v-if="item.status === 'Error'" color="red"> 
                mdi-window-close
              </v-icon>
            </v-btn>
          </template>
          <span> {{ states[item.status] || item.status_description }} </span>
        </v-tooltip>
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn icon color="grey" v-bind="attrs" v-on="on" @click="goToResults(item)">
              <v-icon 
                :color="item.status !== 'Ejecutado' ? 'grey' : 'success'"
              > 
                mdi-chart-bar
              </v-icon>
            </v-btn>
          </template>
          <span> 
            {{item.status !== 'Ejecutado' 
              ? 'Sin resultados disponibles' 
              : 'Ver resultados'}} 
          </span>
        </v-tooltip>
      </template>
    </BaseTable>
    <ScenariosConfirmExecution v-model="showDialog" @executePlan="runModel"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  name: 'MainTable',
  data() {
    return {
      search: '',
      headers: [
        { text: 'Nombre', value: 'name', align: 'left', sortable: false },
        { text: 'Estado', value: 'status', align: 'start' },
        { text: 'Planta', value: 'plant_name', align: 'start' },
        { text: 'Configuración', value: 'configuration_name', align: 'start' },        
        { text: 'Desde', value: 'start_date', align: 'left' },
        { text: 'Quiebre total', value: 'total_break', align: 'center' },
        { text: 'Setup total', value: 'total_setup', align: 'center' },
        { text: '', value: 'action', sortable: false, align: 'left' },
      ],
      dotsMenuItems: [
        { title: 'Descargar', action: 'downloadTable', icon: 'mdi-download' },
        { title: 'Duplicar', action: 'duplicateScenarios', icon: 'mdi-content-copy' },
        { title: 'Eliminar', action: 'deleteRows', icon: 'mdi-delete-outline' }
      ],
      states: {
        'Creado': 'Correr modelo',
        'En Proceso': 'Corriendo el modelo',
        'Ejecutado': 'Modelo ejecutado',
      },
      loading: false,
      dialog: false,
      active: true,
      checked: false,
      allChecked: false,
      hideColumn: null,
      plant: this.$route.params.plant_id,
      plans: [],
      filterData: {},
      showDialog: false,
      planToBeExecuted: {}
    };
  },
  async fetch() {
    await this.fetchPlans();
    await this.fetchPlanGroup();
  },
  computed: {
    ...mapState('planification', ['inExecutionPlanId']),
    ...mapGetters('planification', ['getLoadedPlans']),
    computedHeaders() {
      if(this.hideColumn) {
        return this.headers.map(header => ({
          ...header,
          class: header.text === this.hideColumn.text && !this.hideColumn.value 
            ? 'd-none'
            : '',
          cellClass: header.text === this.hideColumn.text && !this.hideColumn.value 
            ? 'd-none'
            : '',
        }))
      }
      return this.headers
    }
  },
  watch: {
    async inExecutionPlanId(planId) {
      if(planId) {
        this.plans = []
        await this.fetchPlans()
      }
      this.$store.commit('planification/setPlanId', null)
    },
  },
  methods: {
    ...mapActions({
      planEdit: 'planification/setPlan',
      planFetch: 'planification/setLoadedPlans',
      planFetchByPlant: 'planification/fetchPlansByPlant',
      deletePlan: 'planification/deletePlan',
      groupFetch: 'planGroup/fetchPlanGroups'
    }),
    openModal(item) {
      this.showDialog = true;
      this.planToBeExecuted = item;
    },
    async runModel() {
      const planification = this.planToBeExecuted
      const planIndex = this.plans.findIndex(plan => plan.id === planification.id)
      this.plans[planIndex].status = 'En Proceso'
      await this.$store.dispatch('planification/executePlanification', planification)
      this.plans = []
      await this.fetchPlans()
    },
    filterByDate({ seeBy, year, month, firstDateOfWeek, lastDateOfWeek}) {
      this.filterData = { seeBy, year, month, firstDateOfWeek, lastDateOfWeek };
      if(seeBy === 'Semanas') {
        this.plans = JSON.parse(JSON.stringify(this.getLoadedPlans))
          .filter(plan => this.$dayjs(plan.start_date).isBetween(
            firstDateOfWeek, lastDateOfWeek, 'day', '[]'
          )
        )
      }
      if(seeBy === 'Meses') {
        this.plans = JSON.parse(JSON.stringify(this.getLoadedPlans))
          .filter(plan => 
            parseInt(plan.start_date.substring(5, 7)) === month &&
            plan.start_date.substring(0, 4) === year.toString()
          )
      }
      if(seeBy === 'Año') {
        this.plans = JSON.parse(JSON.stringify(this.getLoadedPlans))
          .filter(plan => plan.start_date.substring(0, 4) === year.toString())
      }
    },
    toggleColumn(name, value) {
      const header = this.headers.find(header => header.text === name)
      this.hideColumn = { text: header?.text, value }
    },
    goToResults(planification) {
      this.$router.push({ 
        name: 'results-planification-planification_id-plant-plant_id-dashboard', 
        params: {
          planification_id: planification.id,
          plant_id: this.plant
        },
        query: {
          start_date: planification.start_date,
          end_date: this.$dayjs(planification.start_date).add(1, 'day').format('YYYY-MM-DD'),
          plan_end_date: planification.end_date
        }
      })
      this.$store.commit('global/setNavTitle', this.getTitle(planification))
    },
    getTitle(planification) {
      let currentMonth = this.$dayjs().format('MMMM')
      currentMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
      return `${currentMonth} - ${planification.plant_name}`
    },
    async fetchPlans() {
      if (this.plant === 0) {
        await this.planFetch();
      }
      else {
        await this.planFetchByPlant(this.plant);
        this.plans = JSON.parse(JSON.stringify(this.getLoadedPlans))
        this.filterByDate(this.filterData)
      }
    },
    async fetchPlanGroup(){
      await this.groupFetch();
    },
    async goToEditPlan(planId) {
      this.loading = true;
      this.$nuxt.$loading.start();
      await this.planEdit(planId)
      this.$nuxt.$loading.finish();
      this.loading = false;
      this.$router.push(`/scenarios/${planId}/edit_scenario/`);
    },
    async deleteThisPlan(item) {
      const result = await this.$swal.fire({
        title: '¿Desea eliminar este escenario?',
        text: `Está a punto de eliminar ${item.name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
        try {
          this.$nuxt.$loading.start();
          await this.deletePlan(item.id);
          await this.fetchPlans()
          this.$swal.fire({
            title: 'Escenario eliminado',
            text: 'El escenario ha sido borrado exitosamente',
            icon: 'success',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } catch ({ message }) {
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
        } finally {
          this.$nuxt.$loading.finish();
        }
      }
    }
  },
};
</script>
<style scoped>
.tooltip-results {
  padding: 0px !important;
  border: 1px solid gray !important;
}
</style>