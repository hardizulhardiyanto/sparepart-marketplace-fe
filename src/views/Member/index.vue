<template>
  <default-layout>
    <template slot="header">
      <v-row class="mb-6" justify="end" no-gutters>
        <v-col lg="2" sm="2">
          <v-card class="pa-2 d-flex justify-center secondary" outlined tile>
            <BaseButton
              text="checkout"
              class="btn_w"
              @click="checkoutCart()"
              :disabled="getCartList.length < 1"
            />
            <!-- <v-btn :disabled="true"> checkout </v-btn> -->
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template slot="body">
     <BaseTable
     :headers="headers"
     />

    </template>
  </default-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "member",

  data: () => ({
    listCartAll: [],
    totalSum: 0,
    dialog: false,
    listProduct: [],
    headers: [
      {
        text: "Username",
        align: "start",
        sortable: true,
        value: "username",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Profile",
        value: "addressImage",
      },
      { text: "Action", value: "actionremove", align: "center" },
    ],
  }),

  computed: {
    ...mapGetters({
      getCartList: "transaction/getCartList",
      isToken: "auth/getToken",
      isUser: "user/getUser",
    }),
  },

  methods: {
    fetchAllCart() {
      let injectData;
      if (!localStorage.tempCart) {
        injectData = this.getCartList.map((el) => {
          el.quantity = 0;
          el.totalbuy = 0;
          el.sumtotalbuy = 0;
          return el;
        });
      } else {
        injectData = JSON.parse(localStorage.getItem("tempCart"));
        this.$store.dispatch("transaction/fetchUpdateCart", injectData);
        this.totalSum = localStorage.getItem("sumTotal");
      }
      this.listCartAll = injectData;
    },

    addQuantity(item) {
      let init = 0;
      let dataIn = this.listCartAll.map((el) => {
        if (el.id == item.id) {
          el.quantity = el.quantity += 1;
          el.totalbuy = el.quantity * el.price;
        }
        init += el.totalbuy;
        return el;
      });
      this.totalSum = init;
      this.$store.dispatch("transaction/fetchUpdateCart", dataIn).then(() => {
        this.listCartAll = dataIn;
      });
    },

    minsQuantity(item) {
      let init = 0;
      let dataIn = this.listCartAll.map((el) => {
        if (el.id == item.id) {
          el.quantity = el.quantity -= 1;
          el.totalbuy = el.quantity * el.price;
        }
        init += el.totalbuy;
        return el;
      });
      this.totalSum = init;
      this.$store.dispatch("transaction/fetchUpdateCart", dataIn).then(() => {
        this.listCartAll = dataIn;
      });
    },

    removeCart(item) {
      if (!localStorage.tempCart == false) {
        localStorage.removeItem("tempCart");
        localStorage.removeItem("sumTotal");
      }
      const found = this.listCartAll.filter((el) => el.id !== item.id);
      let init = 0;
      let dataIn = this.listCartAll.map((el) => {
        if (el.id == item.id) {
          el.quantity = 0;
          el.totalbuy = 0;
          el.cartOn = false;
        }
        init += el.totalbuy;
        return el;
      });
      this.totalSum = init;
      this.$store.dispatch("transaction/fetchUpdateCart", found).then(() => {
        this.listCartAll = found;
      });
    },

    checkoutCart() {
      if (!this.isToken) {
        this.login();
        let setTempCart = JSON.stringify(this.getCartList);
        localStorage.setItem("tempCart", setTempCart);
        localStorage.setItem("sumTotal", this.totalSum);
      } else {
        this.loadingOn(true);
        this.listCartAll.map((el) => {
          el.stock = el.stock - el.quantity;
          this.$store
            .dispatch("product/fetchUpdateProduct", el)
            .catch((error) => {
              this.errorProcess(error);
              this.loadingOn(false);
            });
        });

        this.listCartAll.map((el) => {
          (el.idBarang = el.id),
            (el.userId = this.isUser.id),
            (el.total = el.totalbuy);
          this.$store
            .dispatch("transaction/fetchSaveTransaction", el)
            .then((data) => {
              this.removeCart(el);
              let message = "Process Buy Success";
              this.successProcess(message);
              this.loadingOn(false);
              this.home();
            })
            .catch((error) => {
              this.errorProcess(error);
              this.loadingOn(false);
            });
        });
      }
    },

    updateListCart(item) {
      this.listCartAll = item;
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

    //routemove
    home() {
      this.$router.push("/").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },
    login() {
      this.$router.push("/login").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },
  },

  created() {
    this.fetchAllCart();
  },
};
</script>

<style scoped>
.btn_w {
  width: 100%;
}
.text_family {
  font-family: "Open Sans" !important;
}
</style>