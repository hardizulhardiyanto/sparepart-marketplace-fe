<template>
  <div>
    <v-app-bar color="primary" app fixed>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        color="white"
        @click="drawer = !drawer"
      />
      <div class="d-flex align-center">
        <v-icon color="white" :size="iconToolbar">mdi-home</v-icon>
      </div>
      <v-spacer></v-spacer>

      <!-- Desktop  -->
      <div class="hidden-sm-and-down align-center row justify-end">
        <!-- <div class="mr-5">
          <v-badge color="error" content="6" icon="mdi-lock" overlap>
            <a>
              <v-icon color="white" :size="iconToolbar">mdi-bell</v-icon>
            </a>
          </v-badge>
        </div> -->

        <div class="mr-3">
          <v-badge
            color="error"
            :content="cartList.length"
            overlap
            v-if="cartList.length > 0"
          >
            <a @click="transactionList()">
              <v-icon color="white" :size="iconToolbar"
                >mdi-cart-arrow-right</v-icon
              >
            </a>
          </v-badge>
          <a v-else @click="transactionList()">
            <v-icon color="white" :size="iconToolbar"
              >mdi-cart-arrow-right</v-icon
            >
          </a>
        </div>

        <v-menu offset-y :left="true" v-if="isLogin">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="primary elevation-0 button-font"
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar size="45" class="mr-3">
                <img alt="Avatar" :src="userProfile.addressImage" />
              </v-avatar>
              <h4 class="font-weight-bold white--text">
                {{ userProfile.username }}
              </h4>
            </v-btn>
          </template>
          <v-list class="mt-4 secondary">
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in profileDesktop"
                :key="i"
                @click="handleFn(item.method)"
                :class="item.method == $route.name && 'primary'"
              >
                <v-list-item-icon>
                  <v-icon
                    :color="item.method == $route.name ? 'white' : 'primary'"
                    v-text="item.icon"
                  ></v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :class="
                    item.method == $route.name ? 'white--text' : 'primary--text'
                  "
                >
                  <v-list-item-title>
                    <h3>
                      {{ item.title }}
                    </h3>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-btn class="primary elevation-0 button-font" @click="login()" v-else>
          <v-avatar size="45" class="mr-3">
            <v-icon size="45"> mdi-account-circle-outline </v-icon>
          </v-avatar>
          <h4 class="font-weight-bold white--text">Sign In</h4>
        </v-btn>
      </div>

      <!-- Mobile View -->
      <div class="text-center hidden-md-and-up">
        <v-menu offset-y :left="true">
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark v-bind="attrs" v-on="on" icon>
              <v-icon color="white">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list class="mt-1 secondary">
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in navIslogin"
                :key="i"
                @click="handleFn(item.method)"
                :class="item.method == $route.name && 'primary'"
              >
                <v-list-item-icon v-if="item.method === 'fetchLogout'">
                  <v-icon color="primary" :size="iconToolbar">{{
                    item.icon
                  }}</v-icon>
                </v-list-item-icon>
                <v-list-item-icon v-else-if="item.method === 'login'">
                  <v-icon color="primary" :size="iconToolbar">{{
                    item.icon
                  }}</v-icon>
                </v-list-item-icon>
                <v-list-item-icon v-else-if="item.method === 'profile'">
                  <v-avatar size="25">
                    <img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    />
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-icon v-else>
                  <v-badge color="error" content="6" icon="mdi-lock" overlap>
                    <a>
                      <v-icon color="primary" :size="iconToolbar">{{
                        item.icon
                      }}</v-icon>
                    </a>
                  </v-badge>
                </v-list-item-icon>
                <v-list-item-content
                  :class="
                    item.method == $route.name ? 'white--text' : 'primary--text'
                  "
                >
                  <v-list-item-title>
                    <h5>
                      {{ item.title }}
                    </h5>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      app
      dark
      :fixed="desktopDrawer"
      :permanent="desktopDrawer"
      class="secondary elevation-5"
    >
      <div class="d-flex justify-center">
        <v-layout>
          <v-flex class="d-flex justify-center" mt-3 mb-5>
            <img src="@/assets/img/spareparts3.png" :height="imgLogo + 'px'" />
          </v-flex>
        </v-layout>
      </div>

      <v-list dense nav class="font-weight-bold">
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in sideMenu"
            :key="i"
            @click="handleFn(item.method)"
            :class="item.method == $route.name && 'primary'"
          >
            <v-list-item-icon>
              <v-icon
                :color="item.method == $route.name ? 'white' : 'primary'"
                v-text="item.icon"
              ></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              :class="
                item.method == $route.name ? 'white--text' : 'primary--text'
              "
            >
              <v-list-item-title>
                <h3>
                  {{ item.title }}
                </h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item-content> -->
          <v-card class="primary pa-2">
            <v-text-field
              label="Search ..."
              @value="search"
              @input="onSearch"
            />
            <div>
              <span> Filter </span>
              <v-radio-group v-model="radioGroup">
                <v-radio
                  v-for="(n, i) in radioMenu"
                  :key="i"
                  :value="n.value"
                  @click="onFilter()"
                >
                  <template v-slot:label>
                    <div class="radio_label">
                      {{ n.label }}
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>
          </v-card>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navigation",

  components: {},

  data: () => ({
    search: "",
    radioGroup: 1,
    isLogin: false,
    drawer: false,
    clipped: false,
    radioMenu: [
      {
        label: "ASC",
        value: 1,
      },
      {
        label: "DESC",
        value: 2,
      },
    ],
    SideMenuUser: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        method: "home",
        path: "/",
      },
    ],

    SideMenuAdmin: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        method: "home",
        path: "/",
      },
      {
        title: "Inventory",
        icon: "mdi-view-list",
        method: "invetoryList",
        path: "/product",
      },
      {
        title: "Member",
        icon: "mdi-account-group",
        method: "memberList",
        path: "/member",
      },
    ],

    profileDesktop: [
      {
        title: "Profile",
        icon: "mdi-account",
        method: "profile",
      },
      {
        title: "Logout",
        icon: "mdi-logout-variant",
        method: "fetchLogout",
      },
    ],
    profileMobileLogin: [
      {
        title: "Notification",
        icon: "mdi-bell",
        method: "notifications",
      },
      {
        title: "Shopping Cart",
        icon: "mdi-cart-arrow-right",
        method: "messages",
      },
      {
        title: "Profile",
        icon: "mdi-message-text",
        method: "profile",
      },
      {
        title: "Logout",
        icon: "mdi-logout-variant",
        method: "fetchLogout",
      },
    ],
    profileMobileunLogin: [
      {
        title: "Sign In",
        icon: "mdi-logout-variant",
        method: "login",
      },
    ],
    id: 1092888374,
  }),

  computed: {
    ...mapGetters({
      userProfile: "user/getUser",
      isToken: "auth/getToken",
      cartList: "transaction/getCartList",
      listProduct: "product/getProduct",
    }),
    mobileDrawer() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    desktopDrawer() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    imgLogo() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 80;
        case "sm":
          return 80;
        default:
          return 85;
      }
    },
    iconToolbar() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 20;
      } else {
        return 28;
      }
    },
    navIslogin() {
      if (!this.isToken == false) {
        return this.profileMobileLogin;
      } else {
        return this.profileMobileunLogin;
      }
    },
    sideMenu() {
      if (!this.isToken == false && this.userProfile.role == 1) {
        return this.SideMenuAdmin;
      } else {
        return this.SideMenuUser;
      }
    },
    //not use
    filteredList() {
      if (this.search === "") return this.entries;
      return this.entries.filter((entry) => {
        return entry.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    onFilter() {
      this.$store.dispatch("product/fetchSortFilter", this.radioGroup);
    },
    onSearch(payload) {
      this.$store.dispatch("product/fetchSearch", payload);
    },
    fetchUsersProfile() {
      this.$store.dispatch("exceptionHandler/loading", true);
      this.$store
        .dispatch("user/fetchUsersProfile")
        .then((data) => {
          this.isLogin = true;
          this.$store.dispatch("exceptionHandler/loading", false);
        })
        .catch((error) => {
          this.$store.dispatch("exceptionHandler/error", error);
          this.$store.dispatch("exceptionHandler/loading", false);
        });
    },
    fetchLogout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.go();
      });
    },
    handleFn(fnName) {
      this[fnName]();
    },
    home() {
      this.$router.push("/").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },
    transactionList() {
      this.$router.push("/transaction").catch((error) => {
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
    profile() {
      this.$router.push("/profile").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },
    invetoryList() {
      this.$router.push("/product").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },
    memberList() {
      this.$router.push("/member").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },
    homeid() {
      const path = `/home/${this.id}`;
      this.$router.push(`${path}`); //examples route id
    },
  },

  created() {
    if (!this.isToken == false) {
      this.fetchUsersProfile();
    }
  },
};
</script>
<style scoped>
.hoverstyle {
  margin-left: 15;
}
.button-font {
  font-family: "Open Sans" !important;
}
.radio_label {
  font-size: 14px;
}
</style>