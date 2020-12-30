<template>
  <v-dialog v-model="dialog" persistent :max-width="width">
    <v-card>
      <v-card-title>
        <slot name="form-title">
          <h2>{{ formTitle }}</h2>
        </slot>
      </v-card-title>

      <v-card-text>
        <slot name="form"></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div v-if="edit === true">
          <v-btn flat @click.native="close">Batal</v-btn>
          <v-btn flat color="primary" @click.native="save">Simpan</v-btn>
        </div>
        <div v-else>
          <v-btn flat @click.native="close">Tutup</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    width: String,
    formTitle: String,
    dialog: Boolean,
    edit: {
      type: Boolean,
      default: true
    }
  },
  
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save");
    }
  }
};
</script>

