<template>
  <v-app>
    <Navigation v-if="isLogin" />
    <BaseLoading />
    <BaseAlert />
    <v-main>
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "App",

  components: {
    Navigation,
  },

  data: () => ({}),
  computed: {
    isLogin() {
      if (this.$route.name == "login") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>