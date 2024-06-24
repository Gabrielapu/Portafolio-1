<template>
  <div class="d-flex flex-column align-center">
    <h5 class="text-h5">Actualizar Input</h5>
    <span class="subtitle-1">
      Si alguno de los siguientes ha variado, puedes subir nuevos archivos.
    </span>
    <div class="d-flex align-center justify-center mt-10">
      <UtilsUploadFile 
        class="mr-10" 
        width="300px" 
        title="Proyección de Demanda" 
        @onFile="addFile($event, 'demand_file')"
      />
      <UtilsUploadFile 
        class="mr-10" 
        width="300px" 
        title="Estimación de Inventario" 
        @onFile="addFile($event, 'stock_file')"
      />
      <UtilsUploadFile 
        width="300px" 
        title="Mantenciones Programadas" 
        @onFile="addFile($event, 'maintenance_file')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepFour',
  data() {
    return {
      files: [],
    }
  },
  methods: {
    addFile(file, field) {
      const fullFile = { file, field}
      this.files = this.files.filter(file => file.field !== fullFile.field)
      this.files.push(fullFile)

      this.$emit('files', this.files)      
    }
  }
}
</script>
