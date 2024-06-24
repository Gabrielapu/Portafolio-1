<template>
  <div>
    <span class="text-body-2 text--secondary mr-2">Mezclas: </span>
    <v-progress-circular
      v-if="loading"
      :size="20"
      class="ml-1"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-chip 
      v-for="blend in blends" 
      :key="blend.id" 
      class="mr-2 mb-1"
      :color="blend.color_code"
      :style="`border: 1px solid ${blend.border_color_code};`"
      small
      @click="addBlend(blend.name)"
    >
      {{blend.name}}
      <v-icon v-if="isBlendSelected(blend)" size="15" right>
        mdi-checkbox-marked-circle-outline
      </v-icon>
    </v-chip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BlendSelector',
  props: {
    selectedArea: { type: Object, default: () => {} }
  },
  data() {
    return {
      loading: true,
      selectedBlends: []
    }
  },
  async fetch() {
    await this.fetchBlends();
    this.loading = false
  },
  computed: {
    ...mapGetters('planBlend', ['getBlends']),
    isBlendSelected() {
      return blend => this.selectedBlends
        .find(selectedBlend => selectedBlend === blend.name)
    },
    blends() {
      return this.getBlends.filter(blend => blend.planarea_name === this.selectedArea.name)
    }
  },
  watch: {
    selectedBlends(selectedBlends) {
      this.$emit('onSelectedBlend', selectedBlends)
    }
  },  
  methods: {
    async fetchBlends() {
      await this.$store.dispatch(
        'planBlend/fetchBlends', 
        this.$route.params.planification_id
      );
    },
    addBlend(selectedBlend) {
      const isBlendSelected = this.selectedBlends.find(blend => blend === selectedBlend)
      isBlendSelected
        ? this.selectedBlends = this.selectedBlends
          .filter(blend => blend !== selectedBlend)
        : this.selectedBlends.push(selectedBlend)
    }
  },
}
</script>
