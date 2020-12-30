<template>
  <default-layout>
    <template slot="header">
      <v-row class="mb-6" justify="end" no-gutters v-if="!isEdit">
        <v-col lg="2" md="2">
          <v-card class="pa-2 d-flex justify-center secondary" outlined tile>
            <BaseButton
              color="error"
              text="cancel"
              :rounded="false"
              class="btn__p100"
              @click.native="onChangesProfile()"
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
              @click.native="fetchSubmitProfile()"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mb-6" justify="end" no-gutters v-else>
        <v-col lg="2" md="2">
          <v-card class="pa-2 d-flex justify-center secondary" outlined tile>
            <BaseButton
              text="Changes Profile"
              :rounded="false"
              class="btn__p100"
              :disabled="!isValid"
              @click.native="onChangesProfile()"
            />
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template slot="body">
      <v-row class="d-flex justify-space-between" flat tile>
        <v-col
          :xl="9"
          :lg="4"
          :md="12"
          :sm="4"
          :cols="12"
          class="pl-6 pr-6 pb-6"
        >
          <div class="d-flex justify-center mt-2" flat tile>
            <v-avatar size="150">
              <v-avatar size="150" v-if="form.addressImage">
                <img alt="Avatar" :src="form.addressImage" />
              </v-avatar>
              <v-avatar size="150" v-else>
                <v-icon size="125"> mdi-account-circle-outline </v-icon>
              </v-avatar>
            </v-avatar>
          </div>
          <div class="d-flex justify-center mt-2" flat tile color="red">
            <v-col
              :lg="12"
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
                :disabled="isEdit"
                v-on:change="submitFile()"
              />
            </v-col>
          </div>
        </v-col>
        <v-col
          :xl="9"
          :lg="8"
          :md="12"
          :sm="8"
          :cols="12"
          class="pl-6 pr-6 pb-6"
        >
          <v-card-text class="d-flex flex-column" flat tile>
            <v-row no-gutters class="d-flex justify-space-between">
              <v-col
                :lg="6"
                :md="12"
                :sm="12"
                :cols="12"
                class="d-flex flex-column ma-1"
              >
                <v-text-field
                  name="username"
                  label="Username"
                  type="text"
                  v-model="form.username"
                  :readonly="isEdit"
                ></v-text-field>
              </v-col>

              <v-col
                :lg="5"
                :md="12"
                :sm="12"
                :cols="12"
                class="d-flex flex-column ma-1"
              >
                <v-text-field
                  name="email"
                  label="Email"
                  type="email"
                  v-model="form.email"
                  :readonly="isEdit"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="d-flex justify-space-between">
              <v-col
                :lg="6"
                :md="12"
                :sm="12"
                :cols="12"
                class="d-flex flex-column ma-1"
              >
                <v-text-field
                  name="password"
                  label="Password"
                  type="password"
                  v-model="form.password"
                  :disabled="true"
                ></v-text-field>
              </v-col>
              <v-col
                :lg="5"
                :md="12"
                :sm="12"
                :cols="12"
                class="d-flex flex-column ma-1"
              >
                <v-select
                  :items="itemsRole"
                  v-model="role"
                  disabled
                  label="Role"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
      <v-card class="pa-3">
        <v-card-title>
         <h6> Riwayat Transaksi </h6>
        </v-card-title>
        <BaseTable
          :headers="headers"
          :dataSource="listProduct"
          :searchItem="false"
        />
      </v-card>
    </template>
  </default-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "profile",

  data: () => ({
    form: {},
    role: null,
    listProduct: [],
    isValid: true,
    isEdit: true,
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
    itemsRole: ["admin", "user"],
    headers: [
      {
        text: "Nama Produk",
        align: "start",
        sortable: true,
        value: "productName",
      },
      { text: "Harga", value: "price" },
      { text: "Quantity", value: "quantity", align: "center" },
      { text: "Total", value: "total" },
      { text: "Produk", value: "addressImage", align: "start" },
    ],
  }),
  computed: {
    ...mapGetters({
      addressImage: "fileUpload/getAddressImage",
      userProfile: "user/getUser",
    }),
    mobileDrawer() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  methods: {
    onChangesProfile(){
      this.isEdit = !this.isEdit
    },
    fetchProfile() {
      this.loadingOn(true);
      this.$store
        .dispatch("user/fetchUsersProfile")
        .then((data) => {
          this.form = this.userProfile;
          if (this.form.role == 1) {
            this.role = "admin";
          } else {
            this.role = "user";
          }
          this.fetchHistory(this.form.id);
        })
        .catch((error) => {
          this.errorProcess(error);
          this.loadingOn(false);
        });
    },

    fetchHistory(userid) {
      this.$store
        .dispatch("transaction/fetchTransactionHistoryById", userid)
        .then((data) => {
          this.listProduct = data;
          this.loadingOn(false);
        })
        .catch((error) => {
          this.$store.dispatch("exceptionHandler/error", error);
          this.errorProcess(error);
          this.loadingOn(false);
        });
    },

    fetchSubmitProfile() {
      this.loadingOn(true);
      if (this.form.role == 'admin') {
        this.form.role = 1
      } else {
        this.form.role = 2
      }
      let dataProfile = this.form

      this.$store
        .dispatch("user/fetchChangesProfile", dataProfile)
        .then((data) => {
          this.successProcess(data.message)
          this.fetchProfile();
          this.isEdit = !this.isEdit
        })
        .catch((error) => {
          this.$store.dispatch("exceptionHandler/error", error);
          this.errorProcess(error);
          this.loadingOn(false);
        });
    },

    submitFile() {
      this.file = this.$refs.file.files[0];
      this.loadingOn(true);

      this.$store
        .dispatch("fileUpload/barangImage", this.file)
        .then((data) => {
          this.form.addressImage = data.file_location;
          this.loadingOn(false);
        })
        .catch((error) => {
          this.errorProcess(error);
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
  },

  created() {
    this.fetchProfile();
  },
};
</script>
<style scoped>
.btn__p100 {
  width: 90%;
}
.theme--light.v-text-field.v-text-field--disabled:not(.v-text-field--label) {
  color: #1e304b !important;
}
</style>
