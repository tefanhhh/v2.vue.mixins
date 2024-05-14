<template>
  <v-dialog
    v-bind="$attrs"
    persistent
    scrollable
    :width="width"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <div
      :class="{
        'dialog--max-height': !$vuetify.breakpoint.smAndDown,
      }"
    >
      <component
        :is="`dialog-content-${name}`"
        v-if="name"
        v-bind="{
          divider: divider,
          option: option,
        }"
        @close="close"
        @submit="submit"
        @change:option="optionChange"
      />
    </div>
  </v-dialog>
</template>
<script>
/**
 * Vue 2 component representing a dialog with dynamic content.
 *
 * @component
 * @prop {string} name - The name of the dialog.
 * @prop {string} width - The width of the dialog.
 * @prop {boolean} divider - Indicates whether to display a divider in the dialog.
 * @prop {Object} option - An object containing various options for the dialog content.
 * @event close - Emitted when the dialog is closed.
 * @event submit - Emitted when the dialog content is submitted.
 * @event change:option - Emitted when the `option` prop is changed.
 */
export default {
  props: {
    name: {
      type: String,
      default: () => '',
    },
    width: {
      type: [String, Number],
      default: () => '1140',
    },
    divider: {
      type: Boolean,
      default: () => true,
    },
    option: {
      type: Object,
      default: () => ({
        image:
          'https://lajoe-assets.s3.ap-southeast-1.amazonaws.com/Group%20%283%291680662982626831035.svg',
        title: 'Pendaftaran Akun Kamu Berhasil!',
        subtitle: 'Kamu Bisa Mulai Salurkan Barang Tak Terpakaimu',
        buttonConfirmationText: 'Mulai Salurkan Barang',
        titleClass: '',
        subtitleClass: '',
      }),
    },
  },
  watch: {
    option: {
      handler() {},
      deep: true,
    },
    width: {
      handler() {},
      deep: true,
    },
  },
  methods: {
    /**
     * Emits the 'close' event when the dialog is closed.
     *
     * @method
     * @param {Event} ev - The close event.
     */
    close(ev) {
      this.$emit('close', ev)
    },

    /**
     * Emits the 'submit' event when the dialog content is submitted.
     *
     * @method
     * @param {Event} ev - The submit event.
     */
    submit(ev) {
      this.$emit('submit', ev)
    },

    /**
     * Emits the 'change:option' event when the 'option' prop is changed.
     *
     * @method
     * @param {Event} ev - The change event.
     */
    optionChange(ev) {
      this.$emit('change:option', ev)
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .v-dialog {
  background-color: #ffffff !important;
}
.dialog--max-height {
  max-height: 90vh !important;
}
</style>
