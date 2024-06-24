<template>
  <div class="row-container" :style="{ 'left': `${leftValue}px` }">
    <div v-for="row in rowList" :key="row.title">
      <div
        class="g-gantt-row2"
        v-on="$listeners"
      >
        <div class="g-gantt-row-label2" :style="rowLabelStyle">
          <span class="text-body-2">{{row.label}}</span>
          <v-icon 
            v-if="row.type === 'parent'"
            @click="hiddenChildrens = !hiddenChildrens"
          >
            {{hiddenChildrens ? 'mdi-menu-left' : 'mdi-menu-down'}}
          </v-icon>
        </div>
        <div class="g-row-divider2"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "GGanttRow2",
  props:{
    rowList: { type: Array, default: () => [] },
    leftValue: { type: Number, default: 0 }
  },
  inject: ["ganttChartProps", "colors"],
  data(){
    return {
      hiddenChildrens: false
    }
  },
  computed:{
    rowLabelStyle(){
      return {
        width: `${this.ganttChartProps.rowLabelWidth.replace('%','') -0.5}%`,
        height: this.ganttChartProps.rowHeight,
        background: this.colors.background,
        color: this.colors.text,
        'border-top': this.type === 'parent' ? '0.5px solid #dbdbdb' : ''
      }
    },
  },
  watch:{
    hiddenChildrens() {
      this.$emit('toggleChildren', this.label, this.hiddenChildrens)
    },
  }
}
</script>

<style scoped>
  .row-container {
    position: absolute;
    width: 100%;
  }
  .g-gantt-row2 {
    width: 100%;
    height: 35px;
    display: flex;
    transition: background-color 0.2s;
  }
  .g-gantt-row2 > .g-gantt-row-label2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #FFF;
    font-size: 0.9em;
    z-index: 3;
    overflow: hidden;
    padding-left: 10px;
  }
  /* .g-gantt-row > .g-gantt-row-bars-container{
    position: relative;
    width: 70%;
  } */
  .g-row-divider2 {
    width: 0.5%; 
    background-color: #F9F9F9;
    border-left: 0.5px solid #E0E0E0;
  }
</style>