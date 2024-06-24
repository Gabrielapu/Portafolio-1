<template>
  <BaseCrudDialog 
    ref="baseCrudDialog"
    :value="value" 
    :loading="loading" 
    :form-id="form.id"
    :is-valid-form="isValidForm"
    title="vida útil"
    @closeModal="closeModal"
    @setData="setData"
    @input="isValidForm = $event"
  >
    <v-row>
      <v-col cols="4">
        <h3>SKU</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.code" outlined label="SKU" 
          :rules="[
            v => !!v || 'Campo obligatorio',
            v => (!!v && !existSku) || 'El SKU ya existe'
          ]"
        />
      </v-col>    
      <v-col cols="4" class="pl-5">
        <h3>Nombre</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field v-model="form.name" label="Nombre" outlined :rules="rule"/>
      </v-col>
      <v-col cols="4">
        <h3>Vida útil</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.useful_life" type="number" label="Vida útil" 
          outlined :rules="ruleIntField"
        />
      </v-col>
      <v-col cols="4">
        <h3>Porcentaje vida útil</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.percentage_useful_life" type="number" label="Porcentaje vida útil" 
          outlined :rules="ruleOnlyIntField"
        />
      </v-col>
      <v-col cols="4">
        <h3>Días de seguridad</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="form.safety_days" type="number" label="Días de seguridad" 
          outlined :rules="ruleOnlyIntField"
        />
      </v-col>
      <v-col cols="4">
        <h3>Vida útil final</h3>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-text-field 
          v-model="endUsefulLife" readonly type="number" label="Vida útil final" 
          outlined :rules="[v => (!!v && v >= 1) || 'Campo obligatorio mayor a 1']"
        />
      </v-col>
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
    endUsefulLife: {
      get() {
        return ((this.form.useful_life * this.form.percentage_useful_life) / 100) - this.form.safety_days 
      },
      set() {}
    },
    existSku() {
      const codes = JSON.parse(JSON.stringify(this.getProductSkus))
        .filter(c => c !== this.item.code)
      return codes.includes(this.form.code)
    }
  },
  methods: {
    async setData() {
      const product = {
        ...this.form,
        end_useful_life: Math.round(this.endUsefulLife),
        plant: this.$route.params.plant_id,
        config: this.$route.params.config_id
      }
      await this.saveData('configProducts/saveFinalProduct', product)
    }
  },
}
</script>