<template>
  <v-btn
    v-if="color === undefined"
    class="mx-font-weight-bold primary btn_font"
    :disabled="disabled"
    :rounded="rounded"
    :large="large"
    @click="click"
    :block="block"
    >
    <v-icon left v-if="iconButton">{{icons}}</v-icon>
    {{ text }}
    </v-btn
  >
  <v-btn
    v-else
    class="mx-0 font-weight-bold"
    :disabled="disabled"
    :rounded="rounded"
    :large="large"
    dark
    @click="click"
    :block="block"
    :color="color"
    >{{ text }}</v-btn
  >
</template>

<script>
export default {
  props: {
    text: String,
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    iconButton: {
      type: Boolean,
      default: false,
    },
    icons: {
      type: String,
      default: undefined,
    },
  },

  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style>
.btn_font {
  font-family: "Open Sans" !important;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
  color: #1e304b !important;
}
</style>
