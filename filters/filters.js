import Vue from 'vue';

Vue.filter('thousands_separator', (value) => {
  if (value === null || value === undefined) {
    return '0';
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
})
