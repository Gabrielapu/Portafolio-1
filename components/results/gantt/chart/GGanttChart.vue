<template>
  <div 
    id="g-gantt-chart"
    :style="{width}"
  >
    <GGanttTimeaxis
      :chart-start="chartStart"
      :chart-end="chartEnd"
      :row-label-width="rowLabelWidth"
    />
    <GGanttGrid
      :chart-start="chartStart"
      :chart-end="chartEnd"
      :row-label-width="rowLabelWidth"
    />    
    <div id="g-gantt-rows-container">
      <slot/>   <!-- the g-gantt-row components go here -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import GGanttTimeaxis from './GGanttTimeaxis.vue'
import GGanttGrid from './GGanttGrid.vue'

export default {
  name: "GGanttChart",
  components:{
    GGanttTimeaxis,
    GGanttGrid
  },
  provide() {
    return {
      getHourCount: () => this.hourCount,
      ganttChartProps: this.$props,
      onBarEvent: (e, ganttBar) => this.onBarEvent(e, ganttBar),
    }
  },
  props:{
    chartStart: {
      type: String, 
      default: moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")
    },
    chartEnd: {
      type: String, 
      default: moment().startOf("day").add(12,"hours").format("YYYY-MM-DD HH:mm:ss")
    },
    rowLabelWidth: {type: String, default: "10%"},
    rowHeight: {type: Number, default: 40},
    width: {type: String, default: "100%"},   // the total width of the entire ganttastic component in %

  },
  data() {
    return {
      movedBarsInDrag: new Set()
    }
  },
  computed:{
    hourCount(){
      const momentChartStart = moment(this.chartStart)
      const momentChartEnd = moment(this.chartEnd)
      return Math.floor(momentChartEnd.diff(momentChartStart, "hour", true))
    },
  },
  methods: {
    onBarEvent({event, type, time}, ganttBar){
      this.$emit(`${type}-bar`, {event, bar: ganttBar.bar, time})
    }
  }
}
</script>

<style scoped>
  #g-gantt-chart{
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-bottom: 23px;
  }

  #g-gantt-chart >>> * {
    font-family: Roboto, Verdana;
  }

  #g-gantt-rows-container{
    position: relative;
  }
</style>