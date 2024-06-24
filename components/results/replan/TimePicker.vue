<template>
  <div class="d-flex">
    <span>{{value}}</span>
    <v-menu 
      top 
      right 
      offset-y
      max-width="290px" 
      min-width="290px" 
      ampm-in-title
      :nudge-right="20" 
      :close-on-content-click="false" 
    >
      <template #activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on"> mdi-dots-vertical </v-icon>
      </template>
      <v-time-picker :value="value" format="24hr" scrollable @change="$emit('input', $event)"/>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    value: { type: String, required: true },  
  }
}
</script>
