
import { mapGetters } from 'vuex'
export default {
  name: 'CrudMixin',
  props: {
    item: { type: Object, default: () => ({}) },
    value: { type: Boolean, required: true },
    refreshData: { type: Function, default: () => {} }
  },
  data() {
    return {
      form: {},
      loading: false,
      isValidForm: true,
      rule: [v => !!v || 'Campo obligatorio'],
      ruleIntField: [
        v => (!!v && v > 0) || 'Campo obligatorio mayor a 0',
        v => (!!v && v < 2000000) || 'El valor supera el límite permitido'
      ],
      ruleOnlyIntField: [
        v => (!!v && v >= 0) || 'Campo obligatorio mayor a 0',
        v => (!!v && v%1 === 0) || 'El valor no puede ser decimal'
      ],
      ruleWeekDay: [v => (v !== undefined && v !== '') || 'Campo obligatorio'],
      // Retorna desde 00:00 a 23:00
      dayHours: [...Array(24).keys()]
        .map(hour => hour.toString().length === 1 ? `0${hour}:00` : `${hour.toString()}:00` )
    }
  },
  computed: {
    ...mapGetters('configArea', ['getConfigAreas']),
    ...mapGetters('configBlend', ['getSimpleBlends']),
    ...mapGetters('configProducts', ['getSimpleProducts']),
    ...mapGetters('configEquipment', ['getSimpleEquipment']),
    ...mapGetters('configProfile', ['getProfiles']),
    ...mapGetters('colors', ['getColors']),
    ...mapGetters('configStage', ['getSimpleStages']),
    ...mapGetters('configActivity', ['getSimpleActivities']),
    ...mapGetters('configEquipmentSet', ['getSimpleEquipmentSet']),
    ...mapGetters('equipmentTypes', ['getEquipmentTypes']),
    ...mapGetters('equipmentUnits', ['getEquipmentUnits']),
    ...mapGetters('configTypeChange', ['getSimpleTypeChange']),
    ...mapGetters('configWash', ['getWashTypes']),
    productsBySku() {
      const products = JSON.parse(JSON.stringify(this.getSimpleProducts))
      return products.sort((a, b) => a.code.localeCompare(b.code))
    }
  },
  watch: {
    value() {
      this.form = JSON.parse(JSON.stringify(this.item))
    }
  },
  methods: {
    async saveData(endpoint, item) {
      if(!this.isValidForm) {
        this.$refs.baseCrudDialog.$refs.form.validate()
        return;
      }
      this.loading = true
      await this.$store.dispatch(endpoint, item);
      await this.refreshData();
      this.loading = false
      this.resetForm()
      this.$emit('input', false)
    },
    resetForm() {
      this.$refs.baseCrudDialog.$refs.form.reset()
    },
    closeModal() {
      this.resetForm()
      this.$emit('input', false)
    }
  },
}
