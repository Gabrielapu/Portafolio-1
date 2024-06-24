<template>
  <v-sheet
    color="#FAFAFA"
    class="d-flex flex-wrap justify-space-between mx-5"
  >
    <v-skeleton-loader width="300" :type="type" class="mb-5"/>
    <v-skeleton-loader width="300" :type="type" class="mb-5"/>
    <v-skeleton-loader width="300" :type="type" class="mb-5"/>
    <v-skeleton-loader width="300" :type="type" class="mb-5"/>
    <v-skeleton-loader width="300" :type="type" class="mb-5"/>
  </v-sheet>
</template>

<script>
export default {
  name: 'BaseSkeletonLoader',
  props: {
    type: { type: String, default: 'card'}
  }
}
</script>