<template>
  <div>
    <div 
      :id="`g-gantt-bar-${barId}`"
      class="g-gantt-bar"
      :style="barStyle"
      @mouseenter.stop="onMouseenter($event)"
      @mouseleave.stop ="onMouseleave($event)"
      @click="fixTooltip = !fixTooltip"
    >
      <div class="g-gantt-bar-label">
        <slot name="bar-label" :bar="bar">
          {{barConfig.label || ""}}
        </slot>
      </div>
    </div>
    <transition name="fade" mode="out-in" >
      <div 
        v-if="!barConfig.noTooltip && (showTooltip || fixTooltip)"
        class="g-gantt-tooltip"
        :style="tooltipStyle"
      >
        <span v-if="tooltipInViewportBottom" class="arrow up" :style="arrowStyle"></span>
        <span> Equipo: {{rowLabel}} </span>  
        <span class="d-flex align-center"> 
          Mezcla: 
          <div 
            class="color-indicator"
            :style="{background: barStyle.background || barStyle.background_color}"
          />
          {{bar.blend.name}}
        </span>       
        <span v-if="bar.sku"> SKU: {{bar.sku}}</span>
        <span> Batch: {{bar.batch}} </span> 
        <span> Actividad: {{bar.activity}} </span> 
        <span> Inicio: {{bar[barStart] | TimeFilter}} </span> 
        <span> Fin: {{bar[barEnd] | TimeFilter}} </span>
        <span v-if="!tooltipInViewportBottom" class="arrow down" :style="arrowStyle"></span>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
export default {
  name: "GGanttBar",
  props:{
    bar: {type: Object},
    barStart: {type: String}, // property name of the bar objects that represents the start datetime
    barEnd: {type: String}, // property name of the bar objects that represents the end datetime,
    barContainer: [Object, DOMRect],
    rowLabel: {type: String}
  },
  inject: [
    "getHourCount",
    "ganttChartProps",
    "onBarEvent",
  ],
  data(){
    return {
      showTooltip: false,
      tooltipTimeout: null,
      fixTooltip: false,
      tooltipInViewportBottom: true,
      tooltipInViewportRight: true,
      tooltipInViewPortLeft: true,
      tooltipWidth: (`Actividad: ${this.bar.activity}`.length) * 5.3
    }
  },
  computed:{
    // use these computed moment objects to work with the bar's start/end dates:
    // instead of directly mutating them:
    arrowStyle() {
      return {
        left: this.tooltipInViewportRight ? '0px' : `${this.tooltipWidth}px`
      }
    },
    barId() {
      return `${this.rowLabel}-${this.bar.start_date}` 
    },
    barStartMoment:{
      get(){
        return moment(this.bar[this.barStart])
      },
      set(value){
        this.bar[this.barStart] = moment(value).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    barEndMoment: {
      get(){
        return moment(this.bar[this.barEnd])
      },
      set(value){
        this.bar[this.barEnd] = moment(value).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    barConfig(){
      if(this.bar.gantt_bar_config) {
        return {
          ...this.bar.gantt_bar_config,
          background: this.bar.gantt_bar_config.isShadow 
            ? "grey" 
            : this.bar.gantt_bar_config.background || this.bar.gantt_bar_config.background_color,
          opacity: this.bar.gantt_bar_config.isShadow 
            ? "0.3" 
            : this.bar.gantt_bar_config.opacity,
          border: `1px solid ${this.bar.gantt_bar_config.border_color}`
        }
      }
      return {}
    },
    barStyle(){
      const xStart = this.mapTimeToPosition(this.barStartMoment)
      const xEnd = this.mapTimeToPosition(this.barEndMoment)
      return {
        ...(this.barConfig || {}),
        left: `${xStart}px`,
        width: `${xEnd - xStart}px`,
        height: `${this.ganttChartProps.rowHeight - 6}px`,
        zIndex: this.barConfig.zIndex
      }
    },
    tooltipStyle(){      
      return {
        left: this.getLeftValue(),
        [
          this.tooltipInViewportBottom
            ? 'top' 
            : 'bottom'
        ]:`${this.ganttChartProps.rowHeight}px`,
      }
    },
    chartStartMoment(){
      return moment(this.ganttChartProps.chartStart)
    },
    chartEndMoment(){
      return moment(this.ganttChartProps.chartEnd)
    }
  },
  methods:{
    getLeftValue() {
      const xStart = this.mapTimeToPosition(this.barStartMoment)
      const xEnd = this.mapTimeToPosition(this.barEndMoment)
      const integerBarStyleLeft = parseInt(this.barStyle.left.slice(0,-2))

      if (!this.tooltipInViewportRight && this.tooltipInViewPortLeft) {
        return `${xStart - this.tooltipWidth}px`;
      }
      if (this.tooltipInViewportRight && !this.tooltipInViewPortLeft) {
        return `${xEnd * 0.7}px`;
      }
      if(this.tooltipInViewportRight && this.tooltipInViewPortLeft && integerBarStyleLeft >= 0) {
        return this.barStyle.left
      }
      return `${window.innerWidth / 2}px`
    },
    inViewportTooltip() {
      /* Permite evaluar la posicion del tooltip en base a la barra para reposicionarlo si se esconde */
      const barPosition = document
        .getElementById(`g-gantt-bar-${this.barId}`)?.getBoundingClientRect()
      
      const TOOLTIP_WIDTH = this.tooltipWidth
      const TOOLTIP_HEIGHT = 120 // 120px
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const windowWidth = window.innerWidth || document.documentElement.clientWidth

      const inViewportOnRight = (barPosition.right + TOOLTIP_WIDTH) <= (windowWidth)
      const inViewportOnBottom = (barPosition.bottom + TOOLTIP_HEIGHT) <= windowHeight
      const inViewportOnLeft = barPosition.left >= 250

      return { inViewportOnRight, inViewportOnBottom, inViewportOnLeft }
    },
    onMouseenter(e){
      const inViewPort = this.inViewportTooltip()
      this.tooltipInViewportBottom = inViewPort.inViewportOnBottom
      this.tooltipInViewportRight =  inViewPort.inViewportOnRight
      this.tooltipInViewPortLeft = inViewPort.inViewportOnLeft

      if(this.tooltipTimeout){
        clearTimeout(this.tooltipTimeout)
      }
      this.tooltipTimeout = setTimeout(() => this.showTooltip = true, 100)
      this.onBarEvent({event: e, type: e.type}, this)
    },
    onMouseleave(e){
      clearTimeout(this.tooltipTimeout)
      this.showTooltip = false
      this.onBarEvent({event: e, type: e.type}, this)
    },
    mapTimeToPosition(time){
      const hourDiffFromStart = moment(time).diff(this.chartStartMoment, "hour", true)
      return (hourDiffFromStart / this.getHourCount()) * this.barContainer?.width
    },
  },
  filters:{
    TimeFilter(value){
      return moment(value).format("HH:mm")
    }
  }
}
</script>

<style scoped>
  .g-gantt-bar {
    position: absolute;
    top: 2px;
    left: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    width: 300px;
    height: 34px;
    border-radius: 15px;
    background: #79869c;
    overflow: hidden;
  }
  .g-gantt-bar-label {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 14px 0 14px;   /* 14px is the width of the handle */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .g-gantt-bar-label > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .g-gantt-bar-label img {
    pointer-events: none;
  }
  .g-gantt-tooltip{
    position: absolute;
    background: rgb(54, 54, 54);
    color: white;
    z-index: 30000000000000000;
    font-size: 0.75em;
    padding: 3px;
    border-radius: 3px;
    transition: opacity 0.1s;
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  .arrow {
    position: absolute;
    border-style: solid;
  }
  .arrow.up {
    border-color: transparent transparent rgb(54, 54, 54) transparent;
    border-width: 5px;
    margin-left: 5px;
    top: -10px;
  }
  .arrow.down {
    border-color: rgb(54, 54, 54) transparent transparent transparent;
    border-width: 5px;
    margin-left: 5px;
    bottom: -10px;
  }
  .color-indicator {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    margin-right: 5px;
    margin-left: 4px;
  }
  .fade-enter-active {
    animation: fade-in .1s;
  }
  .fade-leave-active {
    animation: fade-in .1s reverse;
  }  
  @keyframes fade-in {
    from {
      opacity: 0;
    } to {
      opacity: 1;
    }
  }
</style>