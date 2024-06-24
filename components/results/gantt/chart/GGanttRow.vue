<template>
  <div
    ref="g-gantt-row"
    class="g-gantt-row"
    :style="{height: `${$parent.rowHeight}px`}"
    v-on="$listeners"
  >
    <div class="g-gantt-row-label" :style="rowLabelStyle">
      <span class="text-body-2">{{label}}</span>
      <v-icon 
        v-if="type === 'parent'"
        @click="hiddenChildrens = !hiddenChildrens"
      >
        {{hiddenChildrens ? 'mdi-menu-left' : 'mdi-menu-down'}}
      </v-icon>
    </div>
    <div class="g-row-divider"></div>
    <div
      ref="barContainer"
      class="g-gantt-row-bars-container"
      :style="barsContainerStyle"
    > 
      <GGanttBar
        v-for="(bar, index) in bars"
        :key="`ganttastic_bar_${index}`"
        ref="ganttBar"
        :row-label="label"
        :bar="bar"
        :bar-start="barStart"
        :bar-end="barEnd"
        :bar-container="barContainer"
        :all-bars-in-row="bars"
      >
        <template #bar-label="{bar}">
          <slot name="bar-label" :bar="bar"/>
        </template>
      </GGanttBar>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import GGanttBar from './GGanttBar.vue'
import { mapGetters } from 'vuex'

export default {
  name: "GGanttRow",
  components:{
    GGanttBar
  },

  props:{
    label: { type: String, default: "Row" },
    bars: { type: Array, default: () => [] },
    type: { type: String, default: '' },
    // property name of the bar objects that represents the start datetime
    barStart: { type: String, required: true },
    // property name of the bar objects that represents the end datetime, 
    barEnd: { type: String, required: true },
    defaultWidth: { type: Number, default: 250 },
  },
  inject: ["ganttChartProps", "colors"],
  data(){
    return {
      barContainer: {},
      hiddenChildrens: false
    }
  },
  computed:{
    ...mapGetters('global', ['getIsFullscreen']),
    rowLabelStyle(){
      return {
        width: `${this.ganttChartProps.rowLabelWidth.replace('%','') -0.5}%`,
        height: this.ganttChartProps.rowHeight,
        background: this.colors.background,
        color: this.colors.text,
        'border-top': this.type === 'parent' ? '0.5px solid #dbdbdb' : ''
      }
    },
    barsContainerStyle(){
      return {
        'border-top': this.type === 'parent' ? '0.5px solid #eaeaea' : '',
        width: `${100 - this.ganttChartProps.rowLabelWidth.replace('%','')}%`,
        'border-bottom': this.type === 'parent' ? '0.5px solid #eaeaea' : ''
      }
    },
  },
  mounted() {
    this.onWindowResize()
    window.addEventListener("resize", this.onWindowResize)
  },
  methods:{
    onWindowResize(){
      // re-initialize the barContainer DOMRect variable, which will trigger 
      // re-rendering in the gantt bars
      this.barContainer = this.$refs?.barContainer?.getBoundingClientRect()
    }
  },
  watch:{
    'ganttChartProps.rowLabelWidth' : function(){
      this.onWindowResize() 
    },
    hiddenChildrens() {
      this.$emit('toggleChildren', this.label, this.hiddenChildrens)
    },
    defaultWidth() {
      this.onWindowResize()
    }
  }
}
</script>

<style scoped>
  .g-gantt-row{
    display: flex;
    width: 100%;
    height: 40px;
    transition: background-color 0.2s;
  }
  .g-gantt-row > .g-gantt-row-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    background: #FFF;
    font-size: 0.9em;
    z-index: 3;
    overflow: hidden;
    padding-left: 10px;
  }
  .g-gantt-row > .g-gantt-row-bars-container{
    position: relative;
    width: 70%;
  }
  .g-row-divider {
    width: 0.5%; 
    background-color: #F9F9F9;
    border-left: 0.5px solid #E0E0E0;
  }
</style>