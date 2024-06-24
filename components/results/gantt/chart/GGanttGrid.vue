<template>
  <div 
    class="g-grid-container"
    :style="{
      left: rowLabelWidth,
      width: `${100-(rowLabelWidth).replace('%','')}%`
    }"
  >
    <div 
      v-for="(hour, index) in allHours"
      :key="index"
      :class="{
        'g-grid-line': true,
        'g-grid-line-highlighted': getHighlightedHour(hour)
      }"
    />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "GGanttGrid",  
  props: {
    chartStart: { type: String, default: '' },
    chartEnd: { type: String, default: '' },
    rowLabelWidth: {type: String, default: ''},
  },
  data() {
    return {
      highlightedHour: new Date().toLocaleString(
        'es-CL', { timeStyle: 'short' }
      )
    }
  },
  computed: {
    allHours(){
      const momentChartStart = moment(this.chartStart)
      const momentChartEnd = moment(this.chartEnd)
      const res = []
      while(momentChartStart.isSameOrBefore(momentChartEnd)){
        res.push(momentChartStart.format('HH:mm'))
        momentChartStart.add(30,"m")
      }
      return res
    }
  },
  methods: {
    getHighlightedHour(hour) {
      const hourNow = parseInt(this.highlightedHour.substring(0,2))
      const minutesNow = parseInt(this.highlightedHour.slice(-2))

      const argHour = parseInt(hour.substring(0,2))
      const argMinutes = parseInt(hour.slice(-2), 10)

      return (hourNow === argHour) &&
        ((argMinutes === 0 && minutesNow < 30) ||
        (argMinutes === 30 && minutesNow >= 30))
    }
  },
}
</script>

<style scoped>
  .g-grid-container{
    position: absolute;
    top: 0;
    left: 30%; /* must correspond to width of row title */
    width: 70%;
    height: calc(100% - 23px);
    display: flex;
    justify-content: space-between;
    background: #F9F9F9;
  }
  .g-grid-line{
    width: 1px;
    height: 100%;
    background: #eaeaea;
  }
  .g-grid-line-highlighted {
    background: #D32F2F;
    box-shadow: 0px 0px 0px 0.5px #D32F2F;
  }
</style>
