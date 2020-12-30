<template>
  <default-layout>
    <template slot="body">
      <v-row no-gutters>
        <v-flex xs12 sm4 md6 lg3 v-for="(n, i) in itemsProduct" :key="i">
          <br />
          <v-card class="pa-2 ma-1">
            <v-img
              contain
              class="white--text"
              height="150px"
              :src="n.addressImage"
            >
            </v-img>
            <v-card-title>
              <div class="align-center">
                <span class="blue--text" :style="`font-size:${titleName}vw`">{{
                  n.productName
                }}</span>
                <br />
                <v-card
                  class="d-flex justify-space-between align-center"
                  flat
                  tile
                >
                  <h6 class="black--text">Rp.{{ n.price }}</h6>
                </v-card>
                <v-card
                  class="d-flex justify-space-between align-center"
                  flat
                  tile
                >
                  <!-- <subtitle class="black--text">Stok : {{ n.stock }}</subtitle> -->
                  <h6 class="grey--text text-darken-1" style="size: 1px">
                    Stok : {{ n.stock }}
                  </h6>
                </v-card>
              </div>
            </v-card-title>
            <v-card-actions>
              <BaseButton
                v-if="n.cartOn"
                text="Added"
                class="mx-auto"
                color="primary"
              />
              <BaseButton
                v-else
                text="add to cart"
                class="mx-auto"
                color="green"
                @click="fetchAddCart(n)"
              />
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-row>
      <v-card v-if="itemsProduct.length == 0">
        <v-card-title class="row">
          <p class="line-1 anim-typewriter">No results...</p>
        </v-card-title>
      </v-card>
    </template>
  </default-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dashboard",

  data: () => ({
    loading: undefined,
    selection: 1,
    itemsProduct: [],
  }),
  computed: {
    ...mapGetters({
      isToken: "auth/getToken",
      getCartList: "transaction/getCartList",
      listProduct: "product/getProduct",
      searchList: "product/getSearchlist",
    }),
    display_price() {
      return this.price * this.reduc;
    },
    titleName() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 5;
        case "sm":
          return 2.5;
        case "md":
          return 2.5;
        default:
          return 1.5;
      }
    },
  },
  watch: {
    searchList(val) {
      if (val === "") return (this.itemsProduct = this.listProduct);
      return (this.itemsProduct = this.listProduct.filter((entry) => {
        return entry.productName.toLowerCase().includes(val.toLowerCase());
      }));
    },
  },
  methods: {
    colchange() {
      this.color = this.color === "blue" ? "grey lighten-2" : "blue";
    },
    reserve(item) {
      const found = this.itemsProduct.find((el) => el.id == item);
      if (found) {
        this.loading = item;
        setTimeout(() => (this.loading = false), 2000);
      }
    },
    fetchAllList() {
      this.loadingOn(true);
      let fromListCart = this.getCartList;
      this.$store
        .dispatch("product/filterProductList", fromListCart)
        .then((data) => {
          this.itemsProduct = this.listProduct;
          this.loadingOn(false);
        })
        .catch((error) => {
          this.errorProcess(error.message);
          this.loadingOn(false);
        });
    },
    fetchAddCart(items) {
      this.$store.dispatch("transaction/fetchAddCart", items);
      let updateList = this.itemsProduct.map((el) => {
        if (el.id == items.id) {
          el.cartOn = true;
        }
        return el;
      });
      this.itemsProduct = updateList;
    },
    loadingOn(val) {
      this.$store.dispatch("exceptionHandler/loading", val);
    },

    successProcess(message) {
      this.$store.dispatch("exceptionHandler/success", { message });
    },

    errorProcess(message) {
      this.$store.dispatch("exceptionHandler/error", message);
    },
  },
  created() {
    this.fetchAllList();
  },
};
</script>

<style scoped>
.line-1 {
  margin-top: 14px;
  text-align: start;
  white-space: nowrap;
  overflow: hidden;
}

/* Animation */
.anim-typewriter {
  animation: typewriter 4s steps(44) 1s 1 normal both,
    blinkTextCursor 500ms steps(44) infinite normal;
}
@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 24em;
  }
}
@keyframes blinkTextCursor {
  from {
    border-right-color: rgba(255, 255, 255, 0.75);
  }
  to {
    border-right-color: transparent;
  }
}
</style>