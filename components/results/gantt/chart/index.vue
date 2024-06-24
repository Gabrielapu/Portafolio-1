<template>
  <div>
    <v-card class="border-bottom mt-3" flat>
      <v-row class="pt-0 px-4">
        <v-col cols="6" class="d-flex">
          <ResultsGanttAreaSelector 
            v-if="getPlanAreas.length" 
            class="mr-3" 
            @onSelectedArea="selectedArea = $event"
          />
          <ResultsGanttBatchSelector @onSelectedBatch="addFilter('batch', $event)"/>
        </v-col>
      </v-row>
      <v-row class="mb-2 px-4">
        <v-col cols="12">
          <ResultsGanttBlendSelector 
            :selected-area="selectedArea"          
            @onSelectedBlend="addFilter('blends', $event)" 
          />
        </v-col>
      </v-row>
    </v-card>
    <div v-if="loading" class="loader">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-card v-if="!loading" flat class="py-1 g-timeaxis-actions">
      <ResultsGanttWeekDays /> 
      <div class="d-flex align-center">
        <div class="zoom mr-3">
          <v-icon color="black" class="cursor-pointer" @click="zoomIn">
            mdi-plus
          </v-icon>
          <v-icon color="black" class="cursor-pointer" @click="zoomOut">
            mdi-minus
          </v-icon>
        </div>
        <span
          v-if="showToday" 
          class="text-body-2 font-weight-black cursor-pointer" 
          @click="goToToday"
        > 
          Hoy   
        </span>
      </div>
    </v-card>
    <div v-if="!loading" id="ganttastic-wrapper">
      <GGanttChart
        :chart-start="chartStart"
        :chart-end="chartEnd"
        :width="`${defaultWidth}%`"
        :row-label-width="`${rowLabelWidth}%`"
        :row-height="rowHeight"
      >
        <ResultsGanttChartGGanttRow2
          v-if="false"
          :row-list="rowList"
          :left-value="leftValue"
          @toggleChildren="toggleChildren"
        />
        <GGanttRow
          v-for="row in rowList"
          v-show="!row.hidden"
          :key="row.title"
          :label="row.label"
          :type="row.type"
          :bars="row.bar_list"
          :default-width="defaultWidth"
          bar-start="start_date"
          bar-end="end_date"
          @toggleChildren="toggleChildren"
        >
          <template #bar-label="{bar}">
            <img v-if="bar.image" height="20" width="20" class="mr-1">
            <span>{{bar.label}}</span>
          </template>
        </GGanttRow>
      </GGanttChart>
      <v-btn class="full-gantt" fab color="white" @click="setFullscreen">
        <v-icon color="primary"> 
          {{fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'}}
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GGanttChart from './GGanttChart.vue'
import GGanttRow from './GGanttRow.vue'
export default {
  name: 'MainChart',
  components: {
    GGanttChart,
    GGanttRow
  },
  provide() {
    return {
      colors: this.colors
    }
  },
  data(){
    return {
      chartStart: `${this.$route.query.start_date} 00:00`,
      chartEnd: `${this.$route.query.end_date} 00:00`,
      rowHeight: 35,
      rowLabelWidth: 6,
      defaultWidth: 180,
      rowList: [],
      activeFilters: {
        blends: false,
        batch: false
      },
      selectedArea: { },
      rowListCopy: [],
      fullscreen: false,
      loading: true,
      colors: {
        primary: "#eeeeee",
        secondary: "#E0E0E0",
        ternary: "#F5F5F5",
        hoverHighlight: "rgba(204, 216, 219, 0.5)",
        text: "#404040",
        background: "white"
      },
      leftValue: 0,
    }
  },
  async fetch() {
    await this.$store.commit('planArea/sePlanAreas', [])
    await this.fetchAreas()
  },
  computed: {
    ...mapGetters('global', ['getIsFullscreen']),
    ...mapGetters('ganttChart', ['getGanttData']),
    ...mapGetters('planArea', ['getPlanAreas']),
    showToday() {
      const today = this.$dayjs().day()
      return this.$dayjs(this.$dayjs().day(today).format('YYYY-MM-DD'))
        .isBetween(
          this.$route.query.start_date, 
          this.$dayjs(this.$route.query.plan_end_date), 
          'day', 
          '[]'
        ) 
    }
  },
  watch: {
    async selectedArea() {
      this.loading = true
      await this.fetchGanttData()
      this.loading = false
    },
  },
  updated() {
    this.horizontalScroll()
  },
  mounted() {
    this.$root.$on('gantt-range', (dates) => {
      this.chartStart = dates.start
      this.chartEnd = dates.end
    })
    this.$root.$on('today-gantt-chart', (dates) => {
      if(dates) {
        this.chartStart = dates.start
        this.chartEnd = dates.end
      }
    })
  },
  methods: {
    horizontalScroll() {
      const ganttWrapper = document.getElementById('ganttastic-wrapper')
      if(!ganttWrapper) return;
      
      let mouseDown = false;
      let startX, scrollLeft;

      const startDragging = function (e) {
        mouseDown = true;
        startX = e.pageX - ganttWrapper.offsetLeft;
        scrollLeft = ganttWrapper.scrollLeft;
      };

      const stopDragging = function (event) {
        mouseDown = false;
      };

      ganttWrapper?.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if(!mouseDown) { return; }
        const x = e.pageX - ganttWrapper.offsetLeft;
        const scroll = x - startX;
        ganttWrapper.scrollLeft = scrollLeft - scroll;
        this.leftValue = ganttWrapper.scrollLeft
      });

      ganttWrapper?.addEventListener('mousedown', startDragging, false);
      ganttWrapper?.addEventListener('mouseup', stopDragging, false);
      ganttWrapper?.addEventListener('mouseleave', stopDragging, false);
    },
    zoomIn() {
      this.defaultWidth += 20
    },
    zoomOut() {
      this.defaultWidth -= 20
    },
    goToToday() {
      const today = this.$dayjs().day()
      this.$root.$emit('today-gantt-chart', {
        start: `${this.$dayjs().day(today).format('YYYY-MM-DD')} 00:00`,
        end: `${this.$dayjs().day(today+1).format('YYYY-MM-DD')} 00:00`
      })
    },
    async fetchAreas() {
      await this.$store.dispatch(
        'planArea/fetchPlanAreas',
        this.$route.params.planification_id 
      );
      this.selectedArea = this.getPlanAreas
        .find(area => area.name === 'Postres')
    },
    async fetchGanttData() {
      await this.$store.dispatch(
        'ganttChart/fetchGanttData', 
        {
          planificationId: this.$route.params.planification_id,
          areaId: this.selectedArea.id
        }
      )
      this.rowList = this.getGanttData.slice(1)
      this.rowListCopy = JSON.parse(JSON.stringify(this.rowList))
      this.chartStart = `${this.getGanttData[0].data_start} 00:00`
      this.chartEnd = this.$route.query.end_date
    },
    setFullscreen() {
      this.fullscreen = !this.fullscreen
      this.defaultWidth -= 40
      this.$store.dispatch('global/updateIsFullscreen', this.fullscreen)
    },
    toggleChildren(parentName, val) {
      this.rowList = this.rowList.map(row => ({
        ...row,
        hidden: parentName === row.parent ? val : row.hidden,
      }))
    },
    addFilter(filter, value) {
      this.activeFilters[filter] = Array.isArray(value) && value?.length === 0
        ? !!value.length
        : value

      this.rowList = this.rowListCopy
        .map(row => ({
          ...row,
          bar_list: this.getBarList(row)
        }))
    },
    getBarList(row) {
      const blendFilter = this.activeFilters.blends
      const batchFilter = this.activeFilters.batch
      if (blendFilter && !batchFilter && row.bar_list) {
        return row.bar_list.filter(bar => blendFilter.includes(bar.blend.name))
      } 
      if (batchFilter && !blendFilter && row.bar_list) {
        return row.bar_list.filter(bar => batchFilter.name === bar.batch)
      } 
      if (blendFilter && batchFilter && row.bar_list) {
        return row.bar_list
          .filter(bar => batchFilter.name === bar.batch && blendFilter.includes(bar.blend.name))
      }
      return row.bar_list
    }
  }
}
</script>

<style scoped>
#ganttastic-wrapper{
  width: 100%;
  overflow-x: auto;
}
.g-timeaxis-actions {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding-right: 10px;
  padding-left: 10px;
}
.full-gantt {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2;
}
::-webkit-scrollbar {
  height: 10px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(209, 209, 209, 0.8);
  box-shadow: inset 0 0 1px rgba(0,0,0,0.5);
}
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
}
</style>