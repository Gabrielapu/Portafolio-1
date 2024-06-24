<template>
  <div>
    <v-form ref="form" @input="$emit('input', $event)">
      <v-row class="justify-center">
        <p class="text-h3">Parámetros</p>
      </v-row>
      <v-row class="justify-center pb-14">
        <p class="text-h6">Parámetros función objetivo</p>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h3>Eficiencia</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model.number="form.efficiency" type="number" label="Eficiencia" 
            outlined :rules="ruleIntField"
          />
        </v-col>
        
        <v-col cols="2" class="d-flex flex-column pl-10">
          <h3>Venta perdida</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model.number="form.lost_sale" type="number" label="Venta perdida" 
            outlined :rules="ruleIntField"
          />
        </v-col>     
        <v-col cols="2" class="d-flex flex-column">
          <h3>Banda de quiebre</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model.number="form.break_band" type="number" label="Banda de quiebre" 
            outlined :rules="ruleIntField"
          />
        </v-col>      
        <v-col cols="2" class="d-flex flex-column pl-10">
          <h3>Banda media</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model.number="form.middle_band" type="number" label="Banda media" 
            outlined :rules="ruleIntField"
          />
        </v-col>
        <v-col cols="2">
          <h3>Banda máxima</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model.number="form.maximum_band" type="number" label="Banda máxima" 
            outlined :rules="ruleIntField"
          />
        </v-col>
        <v-col cols="2">
          <h3>Producto vencido</h3>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field 
            v-model.number="form.product_expired" type="number" 
            label="Producto vencido" outlined :rules="ruleIntField"
          />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'ParametersForm',
  props: {
    planParameters: { type: Object, default: () => {} }
  },
  data() {
    return {
      form: this.planParameters,
      ruleIntField: [v => (!!v && v >= 0) || 'Campo obligatorio mayor a 0'],
    }
  },
}
</script>
