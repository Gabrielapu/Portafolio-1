<template>
  <div>
    <div 
      @click="$refs.uploadInput.click()" 
      @drop="onDrop"
      @dragover.prevent
    >
      <input
        id="uploadInput"
        ref="uploadInput"
        type="file"
        multiple
        :accept="fileType.join(', ')"
        class="d-none"            
        @change.prevent="onChange"
      />
        <div 
          v-if="!fileToUpload" 
          class="upload-box cursor-pointer"
          :style="`width: ${width}; height: ${height};`"
        >
          <span class="subtitle-1">{{title}}</span>
          <span class="caption"> Arrastra y suelta archivo aquí o </span>
          <span class="caption primary--text cursor-pointer"> selecciona un archivo </span>
          <br>
          <span class="caption"> 
            <v-icon size="20" class="rotate primary--text" >mdi-attachment</v-icon>
            Tipo de archivo: {{fileType.join(', ')}} 
          </span>
        </div>
        <div 
          v-else 
          class="uploaded-box cursor-pointer"
          :style="`width: ${width}; height: ${height};`"
        >
          <div class="d-flex align-center mx-3">
            <v-icon size="60" color="success"> mdi-check-circle </v-icon>
            <span class="subtitle-1 ml-5">{{title}}</span>
          </div>
          <span class="text-caption mt-2">{{fileToUpload.name}}</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',
  props: { 
    title: {
      type: String,
      default: 'Carga'
    },
    fileType: {
      type: Array,
      default: () => ['.xlsx', '.csv']
    },
    maxSizeInMb: {
      type: Number,
      default: 15
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '130px'
    },
    withAvatar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileToUpload: null
    }
  },
  watch: {
    fileToUpload(file) {
      this.$emit('onFile', file)
    }
  },
  methods: {
    onChange(event) {
      event.preventDefault();
      this.fileToUpload = event.target.files[0]
    },
    onDrop(event) {
      event.preventDefault()
      this.fileToUpload = event.dataTransfer.files[0]
    }
  }
}
</script>

<style scoped>
.upload-box {
  border-radius: 10px;
  border: 2px dashed gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 15px;
}
.uploaded-box {
  border-radius: 10px;
  border: 1px solid #E8F5E9;
  background: #4CAF5005;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.rotate {
  transform: rotate(-45deg);
}
</style>