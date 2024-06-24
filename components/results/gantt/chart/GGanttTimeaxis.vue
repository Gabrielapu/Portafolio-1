<template>
  <div id="g-timeaxis">
    <div
      class="g-timeaxis-empty-space text-caption pl-2 mt-3 pr-2"
      :style="{
        width: `${rowLabelWidth.replace('%','') - 1}%`, 
        background: colors.background
      }"
    >
      Equipo
    </div>
    <div 
      class="g-timeaxis-days"
      :style="{ width: `${100-rowLabelWidth.replace('%','')}%` }"
    >
      <div 
        v-for="day in axisDays"
        :key="day.text"
        class="g-timeaxis-day"
        :style="{
          width: day.widthPercentage+'%', 
          background: colors.background,
          color: colors.text
        }"
      >
        <div class="g-timeaxis-title"></div>
        <div :style="{background: colors.background, color: colors.text}">
          <div 
            v-for="halfHour in day.ganttHalfHours"
            :key="halfHour.fullDatetime"
            class="g-timeaxis-hour"
          >
            <span class="g-hour-text" :style="{fontSize: hourFontSize}">
              {{getHour(halfHour.text)}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
export default {
  name:"GGanttTimeaxis",
  props: {
    chartStart: String,
    chartEnd: String,
    rowLabelWidth: String,
  },
  inject: ["colors"],
  data(){
    return {
      axisDays: [],
      hourCount: null,
      hourFontSize: "10px",
    }
  },
  mounted(){
    this.initAxisDaysAndHours()
  },
  methods: {
    goToToday() {
      const today = this.$dayjs().day()
      this.$root.$emit('today-gantt-chart', {
        start: `${this.$dayjs().day(today).format('YYYY-MM-DD')} 00:00`,
        end: `${this.$dayjs().day(today+1).format('YYYY-MM-DD')} 00:00`
      })
    },
    initAxisDaysAndHours(){
      this.axisDays = []
      const start = moment(this.chartStart)
      const end = moment(this.chartEnd)
      this.hourCount = Math.floor(end.diff(start, "hour", true))
      while(start.isBefore(end)){
        const hourCountOfDay = start.format("DD.MM.YYYY") == end.format("DD.MM.YYYY") 
          ? end.hour() 
          : 24 - start.hour()
        const widthPercentage = hourCountOfDay / this.hourCount * 100
        /* -1 because the last hour is not included 
        e.g if chartEnd=04:00 the last interval we display is between 03 and 04
          47 because i need to show half hours
        */
        const endHour = start.day() === end.day() ? end.hour()-1 : 47
        this.axisDays.push(this.getAxisDayObject(start, widthPercentage, endHour))
        start.add(1,"day").hour(0)
      }
    },
    getAxisDayObject(datetime, widthPercentage, endHour){
      const datetimeMoment = moment(datetime)
      const axisDayObject = {
        widthPercentage,
        value : datetime.format("YYYY-MM-DD"),
        ganttHalfHours : []
      }
      const startHour = datetimeMoment.hour()
      for(let i = 0; i <= (endHour - startHour); i++) {
        const halfHour ={
          text: datetimeMoment.format("HH:mm"),
          fullDatetime: datetimeMoment.format("DD.MM.YYYY HH:mm")
        }
        axisDayObject.ganttHalfHours.push(halfHour)
        datetimeMoment.add(30,"m")
      }
      return axisDayObject
    },
    getHour(hour) {
      let time = hour
      const hours = parseInt(hour.substring(0,2), 10)
      if(hours < 12) {
        time = `${hour} am`
      } else {
        time = `${hour} pm`
      }
      return time
    }
  },
  watch: {
    chartStart(){
      this.initAxisDaysAndHours()
    },
    chartEnd(){
      this.initAxisDaysAndHours()
    }
  }
}
</script>

<style scoped>
  #g-timeaxis, .g-timeaxis-days, .g-timeaxis-day, .g-timeaxis-day > div {
    display: flex;
    overflow: hidden;
  }
  #g-timeaxis {
    position: relative;
    top:0;
    width: 100%;
    height: 35px;
    min-height: 35px;
    background: white;
    z-index: 4;
    border-bottom: 1px solid #E0E0E0;
  }
  #g-timeaxis > .g-timeaxis-empty-space {
    width: 20%;    /* this has to be as wide as .ganttRowTitle in VGanttastic.css */
    height: 100%;
    background: #F5F5F5;
    color: #00000099;
    position: absolute;
    font-weight: bold; 
  }
  #g-timeaxis > .g-timeaxis-days {
    position: relative;
    width: 80%;
    border-left: 0.5px solid #E0E0E0;
    margin-left: 5.5%;
  }
  .g-timeaxis-day {
    height: 100%;
    flex-direction: column;
    background: #E0E0E0;
  }
  .g-timeaxis-day:nth-child(odd) {
    background: #E8E8E8;
  }
  .g-timeaxis-day > div:nth-child(1) { /* day text */
    height: 35%;
    justify-content: start;
    font-weight: bold;
    align-items: center;
    margin-left: 16px;
  }
  .g-timeaxis-day > div:nth-child(2) { /* hours of a day */
    align-items: flex-end;
    height: 50%;
    justify-content: space-between;
    background:#F5F5F5;
    padding-top:2px;
    color: #212121;
  }  
  .g-timeaxis-hour {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    opacity: 0.8;
    width: 100%;
    padding-left: 1.5px;
  }
  .g-timeaxis-title {
    display: flex !important;
    justify-content: space-between !important;
    margin-left: 30px;
    margin-top: 10px;
  }
  .g-hour-text {
    color: #00000099;
    font-weight: normal;
  }
</style>

