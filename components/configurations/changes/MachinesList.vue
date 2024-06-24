<template>
  <v-list class="border-radius-5 mt-5">
    <v-subheader> Equipos </v-subheader>
    <div class="scroll-y equipment">
      <v-list-item class="ml-0 body-2">
        <v-list-item-content>
          <v-list-item-title> Todos </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-checkbox v-model="allSelected" @change="selectAll"></v-checkbox>
        </v-list-item-action>
      </v-list-item>
      <v-list-item
        v-for="equipment in machines"
        :key="equipment.id"
        class="ml-0 body-2"
      >
        <v-list-item-content>
          <v-list-item-title v-text="equipment.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-checkbox v-model="equipment.selected" @change="sendFilters"></v-checkbox>
        </v-list-item-action>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MachinesList',
  data() {
    return {
      machines: [],
      allSelected: true
    }
  },
  fetch() {
    this.machines = JSON.parse(JSON.stringify(this.getSimpleEquipment))
  },
  computed: {
    ...mapGetters('configEquipment', ['getSimpleEquipment']),
  },
  watch: {
    machines: {
      handler(machines) {
        this.allSelected = machines.every(machine => machine.selected)
      },  
      deep: true
    }
  },
  methods: {
    selectAll() {
      this.machines.forEach(machine => { machine.selected = this.allSelected })
      this.sendFilters()
    },
    sendFilters() {
      this.$emit('selectedMachines', this.machines)
    }
  },
}
</script>

<style>
.equipment {
  max-height: 60vh;
  background-color: #F8F8F8;
  margin-left: 10px;
}
</style>