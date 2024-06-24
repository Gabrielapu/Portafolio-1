<template>
  <div class="mb-5">
    <v-row>
      <v-col cols="6" class=" pb-0">
        <h5 class="text-h5">Tipos de cambio {{equipmentName}}</h5>
      </v-col>
      <v-col cols="6" class="d-flex justify-end pb-0">
        <v-btn color="primary" class="d-none">
          <v-icon> mdi-plus </v-icon>
          Añadir
        </v-btn>
        <!-- <BaseDotsMenu :items="dotsMenuItems"/> -->
      </v-col>
      <v-col cols="12" class="pt-0">
        <BaseTable 
          :headers="headers"
          :items="getChangeTypeByEquipment"
          :loading="loading"
          :show-dots-menu="false"
          :show-search-bar="false"
          table-classes="outlined"
        >
          <template #[`item.name`]="{ item }">
            <v-chip color="primary" outlined>{{ item.name }}</v-chip>
          </template>
        </BaseTable>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ChangesTypes',
  props: {
    equipmentName: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      headers: [
        { text: 'Tipo', sortable: false, value: 'name', align: 'center' },
        { text: 'Tiempo (minutos)', sortable: false, value: 'time', align: 'center' },
        { text: 'Unidad', sortable: false, value: 'unit', align: 'center' },
      ],
      dotsMenuItems: [
        { title: 'Descargar Tabla', action: 'downloadTable', icon: 'mdi-download-outline' }
      ],
      loading: true,
    }
  },
  async fetch() {
    await this.fetchChangeTypeByEquipment();
    this.loading = false
  },
  computed: {
    ...mapGetters('configTypeChange', ['getChangeTypeByEquipment'])
  },
  methods: {
    deleteSelectedItems() {
      this.changesTypes = this.changesTypes.filter(set => !set.toBeDeleted)
    },
    async fetchChangeTypeByEquipment() {
      await this.$store.dispatch(
        'configTypeChange/fetchChangeTypeByEquipment',
        this.$route.params.equipment_id
      );
      this.changesTypes = JSON.parse(JSON.stringify(this.getChangeTypeByEquipment))
    }
  },
}
</script>