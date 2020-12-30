<template>
  <div>
    <v-container grid-list-md px-0 pt-2 pb-1>
      <!-- search filter -->
      <v-layout row wrap>
        <slot name="search" />
      </v-layout>
      <!-- content data -->
      <!-- <v-layout v-if="loading" justify-center pt-2>
          <v-progress-circular :size="70" :width="7" color="orange" indeterminate></v-progress-circular>
      </v-layout>-->
      <v-layout row wrap v-if="items.length > 0">
        <v-flex xs12 md6 lg6 mb-1 v-for="(item, key) in items" :key="key">
          <slot name="item" :item="item"></slot>
        </v-flex>
      </v-layout>
      <v-layout justify-center pt-2 v-else></v-layout>
      <!-- button show more -->
      <v-layout row wrap v-if="!loading && listFooter == true">
        <v-flex xs12 v-if="items.length < totalItems">
          <BaseButton
            :text="`Show More`"
            :round="false"
            :block="true"
            :large="true"
            @click="showMore"
          ></BaseButton>
        </v-flex>
        <v-flex xs12 pt-2 class="text-xs-center" v-else-if="items.length > 0">-Tidak ada data lagi-</v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["items", "totalItems", "loading", "listFooter"],
  methods: {
    showMore() {
      // this.loading = true;
      this.$emit("showMore");
    }
  }
};
</script>
