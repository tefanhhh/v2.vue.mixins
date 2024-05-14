import debounce from 'lodash/debounce'
export default {
  methods: {
    autocompleteCreator(key = '', service = '') {
      const getData = async (keyword = '') => {
        this.autocomplete.loading[key] = true

        this.query[key] = {
          ...this.query[key],
          page: this.autocomplete.paging[key].page,
          keyword,
          perPage: this.autocomplete.paging[key].perPage,
        }
        const res = await this.autocompleteMemberAccessor(service)(
          ...this.params[key],
          this.query[key],
        )
        if (res.success) {
          const list = res.data.list.map(this.autocomplete.mapper[key])
          list.sort((a, b) => {
            const textA = a.text.toLowerCase()
            const textB = b.text.toLowerCase()
            if (textA < textB) return -1
            if (textA > textB) return 1
            return 0
          })
          if (res.data.paging.page === 1) {
            this.autocomplete.filter[key] = list
          } else {
            autocompleteConcatItems(list)
          }
          this.autocomplete.paging[key] = res.data.paging
        }
        this.autocomplete.loading[key] = false
      }

      const getDataByKeyword = debounce(async (keyword) => {
        if (this.autocomplete.behavior[key].initialFocusLoad) {
          resetPaging()
          await getData(keyword)
        }
      }, 500)

      const getDataByInfiniteLoad = async (ev) => {
        if (this.autocomplete.paging[key].next) {
          this.autocomplete.paging[key].page += 1
          await getData(this.autocomplete.searchInput[key])
          ev.loaded()
        } else ev.complete()
      }

      const getDataByAutocompleteFocus = async (force = null) => {
        if (force || !this.autocomplete.behavior[key].initialFocus) {
          this.autocomplete.behavior[key].initialFocus = true
          await getData()
          this.autocomplete.behavior[key].initialFocusLoad = true
        }
      }

      const autocompleteConcatItems = (items) => {
        this.autocomplete.filter[key].push(...items)
      }
      const addNewItem = (val) => {
        this.autocomplete.filter[key].unshift(val)
      }
      const resetPaging = () => {
        this.autocomplete.paging[key] = {
          count: 0,
          next: false,
          page: 1,
          perPage: 20,
          prev: false,
        }
      }
      const resetItems = () => {
        this.autocomplete.filter[key] = []
      }

      return {
        getData,
        resetPaging,
        addNewItem,
        resetItems,
        getDataByKeyword,
        getDataByInfiniteLoad,
        getDataByAutocompleteFocus,
      }
    },
    autocompleteMemberAccessor(member) {
      return member.split('.').reduce((acc, curr) => acc[curr], this)
    },
    autocompleteFilter(item, queryText) {
      return JSON.stringify(item)
        .toLowerCase()
        .includes(queryText.toLowerCase())
    },

    autocompleteIsEmptyAdd(val) {
      const _val = String(val).trim()
      if (_val.length === 0) return false
      else return true
    },
    autocompleteCanAddCloseOptions(key) {
      debounce(() => {
        this.autocomplete.menu[key].value = false
      }, 300)()
    },
    autocompleteCanAddUpdateSearchInput(key, val) {
      if (typeof val === 'string' && val) {
        if (this.autocomplete.menu[key].init) {
          this.autocomplete.menu[key].value = true
        }
        this.autocomplete.menu[key].init = true
      }
    }
  },
}
