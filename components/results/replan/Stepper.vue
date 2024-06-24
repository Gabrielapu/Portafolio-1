<template>
  <div>
    <ResultsReplanToolBar
      :minimize-modal="minimizeModal"
      :close-modal="closeModal"
      @fullscreen="$emit('fullscreen', $event)"
    />
    <ResultsReplanProgressReplan
      v-if="replanning"
      :fullscreen="fullscreen"
    />
    <v-stepper
      v-if="!replanning"
      v-model="stepper"
      flat tile
      :min-height="fullscreen ? '95vh' : '76vh'
    ">
      <v-stepper-header class="mt-5 mx-5">

        <v-stepper-step
          :color="getColor(firstStep)"
          :complete="stepper > firstStep"
          step="1"
        >
          Inicio
          <small>Selección fecha y hora</small>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step
          :color="getColor(secondStep)"
          :complete="stepper > secondStep"
          step="2"
        >
          Batches
          <small>Selección batches en curso</small>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step
          :color="getColor(thirdStep)"
          :complete="stepper > thirdStep"
          step="3"
        >
          Actividades
          <small>Edición horas de inicio y término</small>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step
          :color="getColor(fourthStep)"
          :complete="stepper > fourthStep"
          step="4"
        >
          Actualizar Input
          <small>Opcionales</small>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <ResultsReplanStepOne />
        </v-stepper-content>
        <v-stepper-content step="2">
          <ResultsReplanStepTwo :current-step="stepper"/>
        </v-stepper-content>
        <v-stepper-content step="3">
          <ResultsReplanStepThree />
        </v-stepper-content>
        <v-stepper-content step="4">
          <ResultsReplanStepFour @files="setFiles"/>
        </v-stepper-content>
      </v-stepper-items>
      <ResultsReplanStepButtons
        v-model="stepper"
        :files="files"
        class="buttons-class"
        @replan="replan"
      />
    </v-stepper>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'ReplanStepper',
  props: {
    minimizeModal: {
      type: Function,
      default: () => undefined
    },
    closeModal: {
      type: Function,
      default: () => undefined
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stepper: 1,
      replanning: false,
      files: [],
      firstStep: 1,
      secondStep: 2,
      thirdStep: 3,
      fourthStep: 4,
      activities: [],
    }
  },
  mounted() {
    this.$root.$on('activities', (activities) => {
      this.activities = activities
    })
  },
  computed: {
    ...mapState('replanning', ['firstStepTime']),
  },
  methods: {
    getColor(stepNumber) {
      return this.stepper > stepNumber ? 'success' : 'primary'
    },
    async replan() {
      this.replanning = true
      await this.$store.dispatch(
        'planification/loadModifiedFiles',
        {
          planificationId: this.$route.params.planification_id,
          files: this.files
        }
      )
      this.$store.dispatch(
        'planification/executeReplanification',
        {
          planification_id: this.$route.params.planification_id,
          day: this.firstStepTime.selectedDay.id,
          hour: this.firstStepTime.selectedHour,
          activities: this.activities.map(activity => ({
            id: activity.id,
            starting_day: activity.starting_day,
            starting_time: activity.starting_time,
            ending_day: activity.ending_day,
            ending_time: activity.ending_time,
            activity_id: activity.activity_id,
            sku: activity.sku
          }))
        }
      )
    },
    setFiles(files) {
      this.files = files
    }
  }
}
</script>

<style scoped>
.v-stepper__header {
  box-shadow: none;
  background: #FAFAFA;
  border-radius: 5px;
}
.v-stepper__step__step {
  background: white;
  color: #1e88e5;
  box-shadow: 1px;
}
.buttons-class {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 16px;
}
</style>
