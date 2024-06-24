<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="producto final"
    width="900"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>
      <v-col cols="2">
        <h3>SKU</h3>
      </v-col>
      <v-col cols="10" class="pa-0">
        <v-text-field 
          v-model="form.code" outlined label="SKU"
          :rules="[
            v => !!v || 'Campo obligatorio',
            v => getSkuRule(v)
          ]"
        />
      </v-col>    
      <v-col cols="2" class="pl-5">
        <h3>Nombre</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field v-model="form.name" label="Nombre" outlined :rules="rule"/>
      </v-col>              
      <v-col cols="2" class="d-flex flex-column">
        <h3>Área</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-select
          v-model="form.configarea" 
          :items="getConfigAreas" 
          outlined
          item-text="name"
          item-value="id" 
          label="Área"
          :rules="rule"             
        />
      </v-col>              
      <v-col cols="2" class="pl-5">
        <h3>Stock mínimo</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.min_stock" type="number" label="Stock mínimo" outlined :rules="ruleIntField"
        />
      </v-col>              
      <v-col cols="2">
        <h3>Stock máximo</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.max_stock" type="number" label="Stock máximo" outlined :rules="ruleIntField"
        />
      </v-col>              
      <v-col cols="2" class="pl-5">
        <h3>Unidades por pack</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.units_per_pack" type="number" label="Unidades por pack" outlined 
          :rules="ruleIntField"
        />
      </v-col>              
      <v-col cols="2">
        <h3>Desfase</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.gap_days" type="number" label="Desfase" outlined :rules="ruleIntField"
        />
      </v-col>
      <v-col cols="2">
        <h3>Tiempo mínimo</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.minimum_production_time" type="number" label="Tiempo mínimo (mins.)" 
          outlined :rules="ruleIntField"
        />
      </v-col>
      <v-col cols="2">
        <h3>Priorización</h3>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-text-field 
          v-model="form.priorization" type="number" label="Priorización" 
          outlined :rules="ruleIntField"
        />
      </v-col>
      <v-col cols="2">
        <h3>Es pack</h3>
      </v-col>
      <v-col cols="4" class="pl-0">
        <v-switch v-model="form.is_pack" class="mt-0" inset dense />
      </v-col>
      <v-row v-if="!form.id" class="ma-0">
        <v-col cols="2">
          <h3>Vida útil</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model="form.useful_life" type="number" label="Vida útil" 
            outlined :rules="ruleIntField"
          />
        </v-col>
        <v-col cols="2">
          <h3>Porcentaje vida útil</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model="form.percentage_useful_life" type="number" label="Porcentaje vida útil" 
            outlined :rules="ruleOnlyIntField"
          />
        </v-col>
        <v-col cols="2">
          <h3>Días de seguridad</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model="form.safety_days" type="number" label="Días de seguridad" 
            outlined :rules="ruleOnlyIntField"
          />
        </v-col>
        <v-col cols="2">
          <h3>Vida útil final</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model="endUsefulLife" readonly type="number" label="Vida útil final" 
            outlined :rules="[v => (!!v && v >= 1) || 'Campo obligatorio mayor a 1']"
          />
        </v-col>
      </v-row>
      
    </v-row>
  </BaseCrudDialog>
</template>

<script>
import { mapGetters } from 'vuex'
import CrudMixin from '@/components/configurations/mixins/CrudMixin'

export default {
  name: 'ManageFinalProduct',
  mixins: [CrudMixin],
  computed: {
    ...mapGetters('configProducts', ['getProductSkus']),
    productSkusForEdit() {
      return this.getProductSkus.filter(sku => sku !== this.item.code)
    },
    endUsefulLife: {
      get() {
        return ((this.form.useful_life * this.form.percentage_useful_life) / 100) - this.form.safety_days 
      },
      set() {}
    },
  },
  methods: {
    getSkuRule(sku) {
      if(this.form.id) {
        return !!sku && !this.productSkusForEdit.includes(sku) || 'El SKU ya existe'
      } else {
        return !!sku && !this.getProductSkus.includes(sku) || 'El SKU ya existe'  
      }
    },
    async setData() {
      const product = {
        ...this.form,
        is_pack: this.form.is_pack || false,        
        plant: this.$route.params.plant_id,
        config: this.$route.params.config_id
      }
      if(!this.form.id) {
        product.end_useful_life = Math.round(this.endUsefulLife)
      }
      await this.saveData('configProducts/saveFinalProduct', product)
    }
  },
}
</script>