export default {
  name: 'ListItemsMixin',
  data() {
    return {
      search: '',
      loading: true,
      showDialog: false,
      itemToEdit: {},
      profileId: this.$route.params.profile_id
    }
  },
  watch: {
    showDialog(val) {
      if(!val) this.itemToEdit = {}
    }
  },
  methods: {
    async deleteItem(refreshEndpoint, endpoint, itemId) {
      this.loading = true
      await this.$store.dispatch(endpoint, itemId);
      await refreshEndpoint();
      this.loading = false
    },
    setItemToEdit(item) {
      this.itemToEdit = item
      this.showDialog = true
    },
  },
}
