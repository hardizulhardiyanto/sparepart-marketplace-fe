<template>
  <div>
    <v-snackbar v-model="errSnackbar" color="error" :top="true" :right="true">
      <div
        class="text_family font-weight-bold row justify-space-between align-center"
      >
        <div class="white--text">
          {{ errMessage }}
        </div>
        <v-btn dark text @click="errSnackbar = false"> Close </v-btn>
      </div>
    </v-snackbar>
    <v-snackbar
      v-model="successSnackBar"
      :top="true"
      :right="true"
      color="primary"
    >
      <div
        class="text_family font-weight-bold row justify-space-between align-center"
      >
        <div class="white--text">
          {{ successMessage }}
        </div>
        <v-btn dark text @click="successSnackBar = false"> Close </v-btn>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseAlert",

  data: () => ({
    isValid: true,
    errSnackbar: false,
    successSnackBar: false,
  }),

  computed: {
    ...mapGetters({
      errMessage: "exceptionHandler/getErrorMessage",
      successMessage: "exceptionHandler/getSuccessMessage",
      errVisibility: "exceptionHandler/getErrorVisibility",
      successVisibility: "exceptionHandler/getSuccessVisibility",
    }),
  },

  watch: {
    errVisibility() {
      this.errSnackbar = true;
    },
    successVisibility() {
      this.successSnackBar = true;
    },
  },
};
</script>
<style scoped>
.text_family {
  font-family: "Open Sans" !important;
}
</style>