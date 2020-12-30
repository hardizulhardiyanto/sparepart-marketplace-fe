<template>
  <default-layout>
    <template slot="header">
      <v-row class="mb-6" justify="end" no-gutters>
        <v-col lg="2" md="2">
          <v-card class="pa-2 d-flex justify-center secondary" outlined tile>
            <BaseButton
              color="error"
              text="cancel"
              :rounded="false"
              class="btn__p100"
              @click.native="fetchCancel()"
            />
          </v-card>
        </v-col>
        <v-col lg="2" md="2">
          <v-card class="pa-2 d-flex justify-center secondary" outlined tile>
            <BaseButton
              text="save"
              :rounded="false"
              class="btn__p100"
              :disabled="!isValid"
              @click.native="
                !$route.params.id == false
                  ? fetchChangesProduct()
                  : fetchSaveProduct()
              "
            />
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template slot="body">
      <v-row class="d-flex justify-space-between" flat tile>
        <v-col
          :xl="9"
          :lg="3"
          :md="12"
          :sm="4"
          :cols="12"
          class="pl-6 pr-6 pb-6 mt-7"
        >
          <div class="d-flex justify-center" flat tile>
            <img
              v-if="isImage"
              alt="Avatar"
              :src="require('@/assets/img/no-image.png')"
              height="200px"
              width="200px"
            />
            <img
              v-else
              alt="Product"
              :src="form.addressImage"
              height="200px"
              width="200px"
            />
          </div>
        </v-col>
        <v-col
          :xl="9"
          :lg="9"
          :md="12"
          :sm="8"
          :cols="12"
          class="pl-6 pr-6 pb-6"
        >
          <v-card-text class="d-flex flex-column" flat tile>
            <v-form v-model="isValid" method="POST">
              <v-row no-gutters class="d-flex justify-space-between">
                <v-col
                  :lg="6"
                  :md="12"
                  :sm="12"
                  :cols="12"
                  class="d-flex flex-column ma-1"
                >
                  <v-text-field
                    name="productName"
                    label="Nama Produk"
                    type="text"
                    v-model="form.productName"
                    :rules="[rules.required]"
                    clearable
                  ></v-text-field>
                </v-col>

                <v-col
                  :lg="3"
                  :md="12"
                  :sm="12"
                  :cols="12"
                  class="d-flex flex-column ma-1"
                >
                  <v-text-field
                    name="productPrice"
                    label="Harga"
                    type="number"
                    v-model="form.price"
                    :rules="[rules.required]"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col
                  :lg="2"
                  :md="12"
                  :sm="12"
                  :cols="12"
                  class="d-flex flex-column ma-1"
                >
                  <v-text-field
                    name="stock"
                    label="Stok"
                    type="number"
                    v-model="form.stock"
                    :rules="[rules.required]"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="d-flex justify-space-between">
                <v-col
                  :lg="8"
                  :md="12"
                  :sm="12"
                  :cols="12"
                  class="d-flex flex-column ma-1"
                >
                  <v-text-field
                    name="productDesc"
                    label="Deskripsi"
                    type="text"
                    v-model="form.productDesc"
                    :rules="[rules.required]"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col
                  :lg="3"
                  :md="12"
                  :sm="12"
                  :cols="12"
                  class="d-flex flex-column ma-1"
                >
                  <v-select
                    :items="itemsStatus"
                    v-model="form.status"
                    :rules="[rules.required]"
                    label="Status"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters class="d-flex justify-space-between">
                <v-col
                  :lg="5"
                  :md="9"
                  :sm="9"
                  :cols="12"
                  class="d-flex flex-column ma-1"
                >
                  <input
                    class="text_family"
                    accept="image/x-png,image/gif,image/jpeg"
                    type="file"
                    id="file"
                    ref="file"
                    v-on:change="submitFile()"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-col>
      </v-row>
    </template>
  </default-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CreateEditProduct",

  data: () => ({
    file: "",
    rules: {
      required: (value) => !!value || "Required.",
    },
    isValid: true,
    isImage: true,
    form: {},
    btnHeader: [
      {
        title: "Ubah Password",
        method: "changesPassword",
      },
      {
        title: "Ubah Profile",
        method: "changesProfile",
      },
    ],
    itemsStatus: ["Active", "In Active"],
  }),
  computed: {
    ...mapGetters({
      userProfile: "user/getUser",
      getProductId: "product/getProductById",
    }),
    mobileDrawer() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    submitFile() {
      this.file = this.$refs.file.files[0];
      this.loadingOn(true);

      this.$store
        .dispatch("fileUpload/barangImage", this.file)
        .then((data) => {
          this.form.addressImage = data.file_location;
          this.isImage = false;
          this.loadingOn(false);
        })
        .catch((error) => {
          this.errorProcess(error);
          this.loadingOn(false);
        });
    },
    fetchCancel() {
      this.file = "";
      this.isImage = true;
      this.form = {};
      this.$router.push({ name: "invetoryList" });
    },
    fetchSaveProduct() {
      if (this.form.status == "Active") {
        this.form.status = true;
      } else {
        this.form.status = false;
      }
      this.form.userId = this.userProfile.id;
      this.loadingOn(true);
      this.$store
        .dispatch("product/fetchSaveProduct", this.form)
        .then((data) => {
          let message = data.message;
          this.successProcess(message);
          this.loadingOn(false);
          this.$router.push({ name: "invetoryList" });
        })
        .catch((error) => {
          this.errorProcess(error);
          this.loadingOn(false);
        });
    },
    fetchChangesProduct() {
      if (this.form.status == "Active") {
        this.form.status = true;
      } else {
        this.form.status = false;
      }
      this.form.userId = this.userProfile.id;
      this.loadingOn(true);
      this.$store
        .dispatch("product/fetchUpdateProduct", this.form)
        .then((data) => {
          let message = data.message;
          this.$router.push({ name: "invetoryList" });
          this.successProcess(message);
          this.loadingOn(false);
        })
        .catch((error) => {
          this.errorProcess(error);
          this.loadingOn(false);
        });
    },
    fetchProductId(item) {
      this.loadingOn(true);
      this.$store
        .dispatch("product/fetchProductById", item.id)
        .then((response) => {
          this.isImage = false;
          this.form = response;
          this.file = response.addressImage;
          if (response.status == true) {
            this.form.status = "Active";
          } else {
            this.form.status = "In Active";
          }
          this.loadingOn(false);
        })
        .catch((error) => {
          this.loadingOn(false);
          this.errorProcess(error.message);
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
  },
  created() {
    if (!this.$route.params.id == false) {
      this.fetchProductId(this.$route.params);
    }
  },
};
</script>
<style scoped>
.btn__p100 {
  width: 90%;
}
.file-select > input[type="file"] {
  display: none;
}
.text_family {
  font-family: "Open Sans" !important;
}
</style>
