<template>
  <v-card flat outlined class="mx-5 my-5" :loading="loading">
    <v-row>
      <v-col cols="3" class="mb-5">
          <v-list>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
              class="mx-4"
            ></v-text-field>
            <v-divider class="mx-5"></v-divider>
            <v-subheader
              v-if="allEquipment.length"
            >
              Equipos
            </v-subheader>
            <v-subheader
              v-if="!allEquipment.length"
            >
              No hay equipos disponibles
            </v-subheader>
            <div class="scroll-y equipment">
              <v-list-item-group
                v-model="selectedEquipmentIndex"
                color="primary"
              >
                <v-list-item
                  v-for="equipment in allEquipment"
                  :key="equipment.id"
                  class="pl-5 body-2"
                  @click="checkCompatibilities(equipment.id)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="equipment.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </div>
          </v-list>
      </v-col>
      <v-col cols="9">
        <BaseTable
          :headers="headers"
          :items="compatibilities"
          :loading="loading"
          :dots-menu-items="dotsMenuItems"
          :show-search-bar="false"
          class="ma-3"
          table-classes="ma-5 text-center"
          edit-mode
          edit-name="Editar compatibilidades"
          @deleteFile="deleteSelectedItem"
          @addCompatibility="showDialog = true"
          @editItem="setItemToEdit"
        >
          <template #[`item.sku`]="{ item }">
              <span> {{ item.sku }}</span>  
          </template>
        </BaseTable>
        <ConfigurationsCompatibilitiesManageCompatibility
          v-model="showDialog" 
          :item="itemToEdit"
          :config-equipment-id="equipmentId"
          :refresh-data="checkCompatibilities"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ListItems',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Tipo', value: 'compatibility_type', align: 'center' },
        { text: 'Nombre', sortable: false, value: 'name',  align: 'center' },
        { text: 'SKU', value: 'sku',  align: 'center' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir compatibilidad', action: 'addCompatibility', icon: 'mdi-plus' }
      ],
      selectedEquipmentIndex: null,
      equipmentId: null,
      allEquipment: [],
      compatibilities: [],
    }
  },
  async fetch() {
    await this.fetchEquipment();
  },
  computed: {
    ...mapGetters('configEquipment', ['getSimpleEquipment'])
  },
  watch: {
    search(val) {
      this.allEquipment = this.getSimpleEquipment
        .filter(blend => blend.name.toLowerCase().includes(val.toLowerCase()))
    }
  },
  methods: {
    async checkCompatibilities(equipmentId) {
      this.loading = true
      if(equipmentId) this.equipmentId = equipmentId
      this.compatibilities = await this.$store.dispatch(
        'configEquipmentCompatibility/fetchEquipmentCompatibility', 
        this.equipmentId
      );
      this.loading = false
    },
    async fetchEquipment() {
      const config = this.$route.params.config_id
      await this.$store.dispatch('configEquipment/fetchSimpleEquipment', { config } );
      this.allEquipment = [...this.getSimpleEquipment]
      this.loading = false
    },
    async deleteSelectedItem(compatibilityId) {
      await this.deleteItem(
        this.checkCompatibilities, 
        'configEquipmentCompatibility/deleteCompatibility', 
        compatibilityId
      )
    },
  },
}
</script>

<style scoped>
.select-product {
  text-align: center;
  margin-top: 130px;
  font-size: 24px;
  color: #00000038;
}
.equipment {
  height: 70vh;
}
</style>