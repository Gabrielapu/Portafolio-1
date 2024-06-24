<template>
  <v-card :loading="loading" flat outlined class="ma-4">
    <v-container fluid>
      <v-row>
        <v-col cols="3 mt-15">
          <div class="fixed">
            <v-tabs class="mt-5" vertical light>
              <v-tab @click="scrollTo('basic-data')"> Información </v-tab>
              <v-tab @click="scrollTo('connections')"> Conexiones </v-tab>
              <v-tab @click="scrollTo('changes-types')"> Tipos de cambio</v-tab>
              <v-tab @click="scrollTo('changes')"> Cambios </v-tab>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="9">
          <v-container fluid>
            <v-breadcrumbs class="pa-0 mb-12" :items="breadcrumbItems"/>
            <ConfigurationsEquipmentDetailsBasicData
              id="basic-data"
              :information="getOneQuipmentData"
            />
            <v-divider class="mb-10"></v-divider>
            <ConfigurationsEquipmentDetailsConnections 
              id="connections"
              :equipment-name="getOneQuipmentData.name"
            />
            <v-divider class="mb-10"></v-divider>
            <ConfigurationsEquipmentDetailsChangesTypes 
              id="changes-types"
              :equipment-name="getOneQuipmentData.name"
            />
            <v-divider class="mb-10"></v-divider>
            <ConfigurationsEquipmentDetailsChanges 
              id="changes"
              :equipment-name="getOneQuipmentData.name"
            />
            <v-divider class="mb-10"></v-divider>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainForm',
  data() {
    return {
      loading: true,
      breadcrumbItems: [
        {
          text: 'Lista de equipos',
          disabled: false,
          href: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/equipment`,
        },
        {
          text: '',
          disabled: true,
          href: '',
        }
      ]
    }
  },
  async fetch() {
    await this.fetchOneEquipmentData();
    await this.fetchConfigAreas();
    await this.fetchEquipmentSet();
    this.loading = false
  },
  computed: {
    ...mapGetters('configEquipment', ['getOneQuipmentData'])
  },
  methods: {
    async fetchOneEquipmentData() {
      await this.$store.dispatch(
        'configEquipment/fetchOneEquipmentData',
        this.$route.params.equipment_id
      );
      const item = this.breadcrumbItems.find(item => item.disabled)
      item.text = this.getOneQuipmentData.name
    },
    async fetchConfigAreas() {
      await this.$store.dispatch(
        'configArea/fetchConfigAreas', 
        this.$route.params.config_id
      );
    },
    async fetchEquipmentSet() {
      await this.$store.dispatch(
        'configEquipmentSet/fetchEquipmentSet', 
        this.$route.params.config_id
      );
    },
    scrollTo(id) {
      const element = document.getElementById(id);
      const top = element.offsetTop;
      window.scrollTo(0, top);
    }
  },
}
</script>

<style scoped>
.custom {
  max-height: 500px;
}
.fixed {
  position: fixed;
  top: 200px;
  left: 310px;
}
</style>
<style>
.v-application .text-subtitle-1 {
  font-weight: 500;
}
.v-application .text-h5 {
  font-weight: 500;
}
</style>
