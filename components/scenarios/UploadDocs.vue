<template>
  <div>
    <v-row class="justify-center">
      <p class="text-h3">Carga Demanda e Inventario</p>
    </v-row>
    <v-row class="justify-center pb-5">
      <p class="text-h6">Subir archivos base para el escenario</p>
    </v-row>
    <v-row>
      <v-col cols="4">
        <UtilsUploadFile 
          :file-type="['.xlsx', '.csv']"
          :max-size-in-mb="15"
          title="Carga demanda" 
          @onFile="addFile($event, 'demand_file')"
        />
      </v-col>
      <v-col cols="4">
        <UtilsUploadFile 
          :file-type="['.xlsx', '.csv']"
          :max-size-in-mb="15"
          title="Carga inventario inicial" 
          @onFile="addFile($event, 'stock_file')"
        />
      </v-col>
      <v-col cols="4">
        <UtilsUploadFile 
          :file-type="['.xlsx', '.csv']"
          :max-size-in-mb="15"
          title="Carga mantenciones planificadas de máquinas" 
          @onFile="addFile($event, 'maintenance_file')"
        />
      </v-col>     
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'UploadDocs',
  methods: {
    addFile(file, field) {
      this.$emit('onFile', {file, field})
    }
  }
}
</script>
