<template>
  <div>
    <v-row justify="start" v-if="searchItem">
      <v-col :md="4" :cols="12">
        <v-text-field
          autocapitalize
          type="text"
          v-model="search"
          @input="textToUpper"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="dataSource"
      :items-per-page="5"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      class="elevation-1 mt-4"
    >
      <template v-slot:item.addressImage="{ item }">
        <v-img
          :src="item.addressImage"
          :alt="item.addressImage"
          height="100px"
          width="100px"
        ></v-img>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-row justify="center">
          <v-btn icon @click.native="changeItem(item)">
            <v-icon color="primary" class="mr-3">edit</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="error" @click.native="deleteItem(item)">delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-row>
      </template>
    </v-data-table>

    <BaseConfirm
      :baseConfirm="confirmDelete"
      :title="confirmDeleteTitle"
      :text="confirmDeleteText"
      @close="closeConfirmDelete"
      @confirm="confirmDeleteItem"
    />
  </div>
</template>
<script>
export default {
  name: "BaseTable",

  props: {
    headers: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dataSource: {
      type: Array,
      default: () => {
        return [];
      },
    },
    searchItem: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },

  data: () => ({
    footerProps: { "items-per-page-options": [5, 10, 15, 30, 50, 100] },
    search: "",
    confirmDelete: false,
    deletedItem: {},
    confirmDeleteTitle: "Hapus Item",
    confirmDeleteText: "Apakah anda yakin ingin menghapus item ini?",
  }),

  methods: {
    textToUpper(val) {
      this.search = val.toUpperCase();
    },
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
    openDetail(item, header) {
      this.$emit("openDetail", item, header);
    },
    changeItem(item) {
      this.$emit("change", item);
    },
    deleteItem(item) {
      this.confirmDelete = true;
      this.deletedItem = item;
    },
    closeConfirmDelete() {
      this.confirmDelete = false;
    },
    confirmDeleteItem() {
      this.$emit("deleteItem", this.deletedItem);
      this.confirmDelete = false;
      this.deletedItem = {};
    },
  },
};
</script>