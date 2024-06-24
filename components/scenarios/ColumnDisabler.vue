<template>
  <v-menu max-width="300px" offset-y bottom left :close-on-content-click="false">
    <template #activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon>mdi-filter-variant</v-icon>
        Columnas activas
      </v-btn>
    </template>
    <template #default>
      <v-list>
        <small class="ml-5">Columnas activas</small>
        <v-list-item v-for="column, index in columns" :key="index">
          <v-list-item-title>{{column.name}}</v-list-item-title>
          <v-list-item-action>
            <v-switch
              v-model="column.enabled"
              inset dense
              @change="$emit('toggleColumn', column.name, column.enabled)" 
            ></v-switch>
          </v-list-item-action>
        </v-list-item>      
      </v-list>
    </template>    
  </v-menu>
</template>

<script>
export default {
  name: 'ColumnDisabler',
  data() {
    return {
      columns: [
        { name: 'Planta', enabled: true },
        { name: 'Configuración', enabled: true },
        { name: 'Agrupación', enabled: true },
        { name: 'Quiebre total', enabled: true },
        { name: 'Setup total', enabled: true },
      ]
    }
  },
}
</script>
