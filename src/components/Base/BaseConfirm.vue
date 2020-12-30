<template>
  <v-dialog v-model="dialogState" max-width="290">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>
        {{text}}
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  @click.native="close">Tidak</v-btn>
        <v-btn  color="primary" depressed @click="confirm">Ya</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BaseConfirm",
  props: {
    baseConfirm: { type: Boolean, default: false },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    closeAfterConfirm: { type: Boolean, default: true}
  },
  computed: {
    dialogState: {
      get() {
        return this.baseConfirm;
      },
      set(val) {
        this.$emit("updateDialog", val);
      }
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      if ( this.closeAfterConfirm ){
        this.$emit("close");
      }
      this.$emit("confirm");
    }
  },
  watch: {
    baseConfirm(value) {
      if (!value) {
        this.$emit("close");
      }
    }
  }
};
</script>
