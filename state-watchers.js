import debounce from 'lodash/debounce'
export default {
  methods: {
    /**
     * A debounced function that handles changes to a filter in a Vue component.
     *
     * @param {Object} ev - An object representing the filter change.
     * @param {Function} callback - A function to be called after handling the filter change.
     * @param {boolean} [resetPaging=true] - Whether to reset the paging to the first page.
     * @param {Object} paging - An object representing the paging state.
     */
    filterChange: debounce(function (
      ev,
      callback,
      resetPaging = true,
      paging,
      callbackParams = [],
      optionalCallbacks = [],
    ) {
      let isValid = false
      for (const key in ev) {
        if (this.$route.query[key] !== ev[key]) {
          isValid = true
          break
        }
      }
      if (isValid) {
        const query = {
          ...this.$route.query,
          ...ev,
        }
        for (const q in query) {
          if (!query[q]) {
            delete query[q]
          }
        }
        if (resetPaging) {
          paging.page = 1
          query.page = 1
        }
        this.$router.replace({
          query,
        })
      }

      callback.apply(null, callbackParams)
      for (const cb of optionalCallbacks) {
        cb()
      }
      if (this.infiniteLoading?.identifier) {
        this.infiniteLoading.identifier++
      }
    },
    300),
    /**
     * Updates the component's properties based on the query parameters from the current route.
     *
     * @param {Object} this.$route.query - The query parameters from the current route.
     */
    updatePropertiesFromRouteQuery() {
      // Destructure page and activeTab, and collect the rest of the query parameters.
      const { page, activeTab, ...rest } = this.$route.query

      // Iterate through the remaining query parameters.
      for (const q in rest) {
        // Check if the form property with the same name exists.
        if (typeof this.form[q] !== 'undefined') {
          // Update the form property with the value from the route query.
          this.form[q] = this.$route.query[q]
        }
      }

      // Check if there are no remaining query parameters and 'page' is defined.
      if (Object.keys(rest).length === 0 && page) {
        // Check if the component has a paging table.
        if (this.table.paging) {
          // Update the paging page with the 'page' value from the route query.
          this.table.paging.page = Number(page)
        }
      } else if (page && page !== '1') {
        // If 'page' is defined and not equal to '1', update the route to set 'page' to '1'.
        this.$router.replace({
          query: {
            ...this.$route.query,
            page: 1,
          },
        })
      }

      // Check if 'activeTab' is defined and update the component's activeTab property.
      if (activeTab) {
        this.activeTab = activeTab
      }
    },
  },
  created() {
    this.updatePropertiesFromRouteQuery()
  },
}
