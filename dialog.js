export default {
  data: () => ({
    dialog: {
      open: false,
      name: '',
      option: {},
      width: '100%',
    },
  }),
  methods: {
    /**
     * Toggles a dialog component's visibility and sets its properties.
     *
     * @function
     * @param {string} name - The name of the dialog.
     * @param {Object} option - Additional options for the dialog (optional).
     */
    toggleDialog(name = '', option = {}, width = '100%') {
      // Set the name of the dialog.
      this.dialog.name = name

      // Set additional options for the dialog.
      this.dialog.option = option

      // Set the width of the dialog.
      this.dialog.width = width

      // Toggle the visibility of the dialog.
      this.dialog.open = !this.dialog.open
    },
  },
}
