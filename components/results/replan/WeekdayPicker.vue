<template>
  <v-menu bottom left>
    <template #activator="{ on, attrs }">
      <div class="d-flex justify-space-between" v-bind="attrs" v-on="on">
        <span v-if="value" outlined>
          {{value}}
        </span>
        <v-icon>mdi-menu-down</v-icon>
      </div>
    </template>
    <div class="max-height">
      <v-list>
        <v-list-item  v-for="day in weekdays" :key="day.id">
          <v-list-item-content>
            <v-list-item-title
              class="cursor-pointer"
              :value="day.id"
              @click="$emit('input', day.name)"
            >
              {{ day.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-menu>
</template>

<script>
import weekdays from '@/components/utils/weekdays'
export default {
  name: 'WeekdayPicker',
  props: {
    value: { type: String, default: null },
    relatedName: { type: String, default: () => '' }
  },
  data() {
    return {
      weekdays: weekdays.weekDaysWithIdAndName
    }
  }
}
</script>

<style scoped>
.max-height {
  max-height: 400px;
}
</style>