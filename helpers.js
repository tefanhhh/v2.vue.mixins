export default {
  methods: {
    onChangePositionScroll() {
      const scrollOptions = {
        top: 0,
        behavior: 'smooth',
      }

      // Check if the browser supports smooth scrolling
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo(scrollOptions)
      } else {
        this.scrollToTop(scrollOptions)
      }
    },
    scrollToTop(scrollOptions) {
      if (scrollOptions.top === window.pageYOffset) {
        return
      }

      const duration = 400 // Duration of the scroll animation
      const start = window.pageYOffset
      const change = scrollOptions.top - start
      let currentTime = 0

      const animateScroll = () => {
        currentTime += 16
        const easing = easeInOutQuad(currentTime, start, change, duration)
        window.scrollTo(0, easing)
        if (currentTime < duration) {
          window.requestAnimationFrame(animateScroll)
        }
      }

      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) {
          return (c / 2) * t * t + b
        }
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
      }

      window.requestAnimationFrame(animateScroll)
    },
    onlyNumberKey(ev, max = null) {
      // Only ASCII character in that range allowed
      const ASCIICode = ev.which ? ev.which : ev.keyCode
      if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        ev.preventDefault()
        return false
      }
      if (max && !isNaN(ev?.target?.value)) {
        let val = `${ev?.target?.value}`
        val = `${val}${ev.key}`
        if (Number(val) > max) {
          ev.preventDefault()
          return false
        }
      }
      return true
    },
    generateYears(startYear, endYear) {
      const currentYear = endYear || new Date().getFullYear()
      const years = []
      startYear = startYear || 1970
      while (startYear <= currentYear) {
        years.push(startYear++)
      }
      return years
    },
    newShadeColor(hexColor, magnitude) {
      hexColor = hexColor.replace(`#`, ``)
      if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16)
        let r = (decimalColor >> 16) + magnitude
        r > 255 && (r = 255)
        r < 0 && (r = 0)
        let g = (decimalColor & 0x0000ff) + magnitude
        g > 255 && (g = 255)
        g < 0 && (g = 0)
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude
        b > 255 && (b = 255)
        b < 0 && (b = 0)
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`
      } else {
        return hexColor
      }
    },
    formatBytes(bytes, decimals = 2) {
      if (!+bytes) return '0 Bytes'
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`
    },
  },
}
