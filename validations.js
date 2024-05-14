export default {
  computed: {
    isEmailValid() {
      return (email) => {
        if (typeof email === 'string' && email.length > 0) {
          const re = /\S+@\S+\.\S+/g
          return re.test(email)
        }
        return true
      }
    },
    isPhoneNumberValid() {
      return (val) => {
        const re = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g
        return (
          String(val)?.length >= 10 && String(val)?.length <= 13 && re.test(val)
        )
      }
    },
    isPasswordValid() {
      return (val) => {
        return String(val)?.length >= 8
      }
    },
    isAddressValid() {
      return (val) => {
        return String(val)?.length >= 10
      }
    },
  },
  methods: {
    allObjectMemberTrue(val, conditions = []) {
      const result = Object.values(val).every((it) => {
        if (typeof it === 'object' && it !== null && !Array.isArray(it)) {
          return this.allObjectMemberTrue(it)
        }
        return (
          it !== null &&
          it !== undefined &&
          it !== '' &&
          conditions.every((it2) => it2 !== it)
        )
      })
      return result
    },
  },
}
