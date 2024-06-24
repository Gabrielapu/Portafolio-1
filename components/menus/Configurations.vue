<template>
  <v-treeview
    :items="configMenu"
    item-key="name"
    open-on-click
    activatable
    hoverable
    shaped
    dense
    class="mt-5 ml-3"
    active-class="text-primary"
  >
    <template #label="{ item }">
      <div class="cursor-pointer m-0 p-0" @click="goToRoute(item.to)">{{item.name}}</div>
    </template>
  </v-treeview>
</template>

<script>
export default {
  name: 'ConfigurationsMenu',
  data() {
    return {
      configMenu: [
        {
          name: 'Planta',
          children: [
            {              
              name: 'Información General', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/general_information`
            },
            {              
              name: 'Áreas', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/areas` 
            },
            {              
              name: 'Compatibilidades', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/compatibilities`
            },
          ],
        },
        {
          name: 'Productos',
          children: [
            {              
              name: 'Mezclas', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/blends` 
            },
            {               
              name: 'Producto final', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/final_products`
            },
            {               
              name: 'Vida útil', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/useful_life`
            },
            {               
              name: 'Packs', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/packs`
            },
            {               
              name: 'Producto - Mezcla', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/product_blend`
            },
            {               
              name: 'Perfiles', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/profiles` 
            }
          ],
        },
        {          
          name: 'Equipos',
          children: [
            {                
              name: 'Sets de Equipos', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/equipment_sets` 
            },
            {                
              name: 'Lista de Equipos', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/equipment` 
            },
            {                
              name: 'Velocidad', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/speed` 
            },
            {                
              name: 'Conexiones', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/connections` 
            },
            {
              name: 'Cambios', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/changes`
            },
            {                
              name: 'Lavados', 
              to: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/wash` 
            }
          ],
        },
      ]
    }
  },
  methods: {
    goToRoute(route) {
      if(route) {
        this.$router.push(route)
      }
    }
  }
}
</script>
