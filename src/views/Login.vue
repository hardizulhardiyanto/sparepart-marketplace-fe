<template>
  <v-card
    class="d-flex align-center justify-center mb-6 secondary"
    flat
    tile
    height="100%"
  >
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <v-flex>
                  <v-img
                    class="ml-3"
                    contain
                    height="7rem"
                    position="center"
                    src="@/assets/img/spareparts3.png"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <div v-if="!isRegister">
              <v-card-text>
                <p class="text_family">Sign in with your email and password:</p>
                <v-form v-model="isValid" method="post">
                  <v-text-field
                    outline
                    label="Email"
                    type="email"
                    v-model="form.email"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    outline
                    hide-details
                    label="Password"
                    type="password"
                    v-model="form.password"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-divider class="mt-6"></v-divider>
              <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
                <div>
                <a> Not a Member ?</a>
                <a @click="registerPage()" class="blue--text"> Sign Up /</a>
                <a @click="home()" class="red--text"> Back</a>
                </div>
                <v-spacer></v-spacer>
                <BaseButton
                  text="Login"
                  :large="$vuetify.breakpoint.smAndUp"
                  :iconButton="true"
                  icons="lock"
                  :disabled="!isValid"
                  @click.native="submitLogin()"
                />
              </v-card-actions>
            </div>
            <div v-else>
              <v-card-text>
                <p class="text_family">Register your account:</p>
                <v-form v-model="isValid" method="POST">
                  <v-text-field
                    outline
                    name="username"
                    label="Username"
                    type="text"
                    v-model="form.username"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    outline
                    hide-details
                    name="email"
                    label="Email"
                    type="email"
                    v-model="form.email"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    outline
                    hide-details
                    name="password"
                    label="Password"
                    type="password"
                    v-model="form.password"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    class="pr-12"
                    v-model="form.addressImage"
                    name="addressImage"
                    label="Address Image"
                    type="text"
                    v-show="false"
                  ></v-text-field>
                  <div class="row justify-center mt-5">
                    <v-avatar size="145" v-if="addressImage">
                      <img alt="Avatar" :src="addressImage" />
                    </v-avatar>
                    <v-avatar size="125" v-else>
                      <v-icon size="125"> mdi-account-circle-outline </v-icon>
                    </v-avatar>
                  </div>
                  <v-card class="mx-auto mt-3">
                    <div class="large-12 medium-12 small-12 cell">
                      <label class="file-select">
                        <div class="select-button">
                          <span v-if="file" class="text_family"
                            >Selected File: {{ file.name }}</span
                          >
                          <span class="text_family" v-else>Select Picture</span>
                        </div>
                        <input
                          class="text_family"
                          style="padding: 10px"
                          accept="image/x-png,image/gif,image/jpeg"
                          type="file"
                          id="file"
                          ref="file"
                          v-on:change="submitFile()"
                        />
                      </label>
                    </div>
                  </v-card>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
                <BaseButton
                  text="Back"
                  color="error"
                  :large="$vuetify.breakpoint.smAndUp"
                  @click.native="registerPage()"
                />
                <v-spacer></v-spacer>
                <BaseButton
                  text="Sign In"
                  :iconButton="true"
                  icons="lock"
                  :large="$vuetify.breakpoint.smAndUp"
                  :disabled="!isValid"
                  @click.native="submitRegister()"
                />
              </v-card-actions>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    value: File,
  },
  data: () => ({
    isValid: true,
    file: "",
    form: {
      email: "",
      password: ""
    },
    password: null,
    email: null,
    isRegister: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  computed: {
    ...mapGetters({
      addressImage: "fileUpload/getAddressImage",
    }),
  },
  methods: {
    home() {
      this.$router.push("/").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },
    registerPage() {
      this.isRegister = !this.isRegister;
    },
    submitLogin() {
      this.$store.dispatch("exceptionHandler/loading", true);
      this.$store
        .dispatch("auth/login", this.form)
        .then((data) => {
          let message = data.message;
          this.form = {}
          this.$store.dispatch("exceptionHandler/loading", false);
          if (data.results) {
            this.$router.push({ name: "home" });
          }
        })
        .catch((error) => {
          this.$store.dispatch("exceptionHandler/error", error);
          this.$store.dispatch("exceptionHandler/loading", false);
        });
    },
    submitRegister() {
      this.$store.dispatch("exceptionHandler/loading", true);
      this.$store
        .dispatch("auth/register", this.form)
        .then((data) => {
          this.form = {}
          let message = data.message;
          this.$store.dispatch("exceptionHandler/loading", false);
          this.isRegister = !this.isRegister;
        })
        .catch((error) => {
          this.$store.dispatch("exceptionHandler/error", error);
          this.$store.dispatch("exceptionHandler/loading", false);
        });
    },
    submitFile() {
      this.file = this.$refs.file.files[0];
      this.$store.dispatch("exceptionHandler/loading", true);
      this.$store
        .dispatch("fileUpload/userImage", this.file)
        .then((data) => {
          this.form.addressImage = this.addressImage;
          this.$store.dispatch("exceptionHandler/loading", false);
        })
        .catch((error) => {
          this.$store.dispatch("exceptionHandler/error", error);
          this.$store.dispatch("exceptionHandler/loading", false);
        });
    },
  },
  
};
</script>
<style scoped>
.v-card {
  border-radius: 4px;
}

.v-card__title {
  text-transform: uppercase;
  font-family: "Open Sans" !important;
}
.text_family {
  font-family: "Open Sans" !important;
}
.v-btn {
  font-family: "Open Sans" !important;
}
</style>