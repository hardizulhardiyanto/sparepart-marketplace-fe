<template>
  <v-dialog v-model="loading" fullscreen>
    <v-container fill-height pa-0 ma-0 fluid class="loading">
      <v-layout column align-center justify-center>
        <!-- <h2 class="mb-2">Silahkan Tunggu</h2> -->
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          class="primary"
        />
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import { mapGetters } from 'vuex';
export default {
  name: 'BaseLoading',
  components: {
    HalfCircleSpinner,
  },
  computed: {
    ...mapGetters({
      loading: "exceptionHandler/getLoading",
    }),
  },
};
</script>

<style scoped>
.loading {
  background-color: transparent;
}
</style>

