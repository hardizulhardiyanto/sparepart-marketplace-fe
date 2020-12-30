<template>
  <v-container>
    <v-card
      elevation="2"
      color="secondary"
      height="100%"
      class="pa-2 mx-lg-auto"
    >
      <v-row justify="end" no-gutters>
        <slot name="header" />
      </v-row>
      <div>
        <slot name="body"/>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "BaseLayout",
};
</script>