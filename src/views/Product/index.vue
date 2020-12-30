<template>
  <default-layout>
    <template slot="header">
      <v-row class="mb-6" justify="end" no-gutters>
        <v-col lg="2" sm="2">
          <v-card class="pa-2 d-flex justify-center secondary" outlined tile>
            <BaseButton text="create" @click="createPage()" class="btn__p100" />
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template slot="body">
      <BaseTable
        :headers="headers"
        :dataSource="listProduct"
        @change="changeItem"
        @deleteItem="deleteItem"
      />
    </template>
  </default-layout>
</template>

<script>
export default {
  name: "inventoryList",

  data: () => ({
    dialog: false,
    listProduct: [],
    headers: [
      {
        text: "Nama Produk",
        align: "start",
        sortable: true,
        value: "productName",
      },
      { text: "Harga", value: "price" },
      { text: "Stok", value: "stock" },
      { text: "Deskripsi", value: "productDesc" },
      { text: "Produk", value: "addressImage" },
      { text: "Status", value: "status" },
      { text: "Action", value: "action" },
    ],
  }),
  methods: {
    createPage() {
      this.$router.push("/product/create").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },

    deleteItem(item) {
      let idProduct = item.id;
      this.$store
        .dispatch("product/fetchDeleteProduct", idProduct)
        .then(() => {
          this.successProcess(`Berhasil Menghapus Barang ${idProduct}`);
        })
        .catch((error) => {
          this.errorProcess(error.message);
        })
        .finally(() => {
          this.fetchAllList();
        });
    },

    fetchAllList() {
      this.loadingOn(true);
      this.$store
        .dispatch("product/fetchProductList")
        .then((data) => {
          let list = data.results.data;
          let listChanges = list.map((el) => {
            if (!el.status) {
              el.status = "In Active";
            } else {
              el.status = "Active";
            }
            return el;
          });
          this.listProduct = listChanges;
          this.loadingOn(false);
        })
        .catch((error) => {
          this.errorProcess(error.message);
          this.loadingOn(false);
        });
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

    changeItem(item) {
      const path = `/product/${item.id}`;
      this.$router.push(`${path}`);
    },
  },

  created() {
    this.fetchAllList();
  },
};
</script>

<style scoped>
.btn__p100 {
  width: 100%;
}
.text_family {
  font-family: "Open Sans" !important;
}
</style>