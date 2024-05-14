export default {
  computed: {
    pipeIDR() {
      return (val) => {
        // if (val === 0) return 'Murah'
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(val)
      }
    },
    pipeDate() {
      return (val, format = 'DD-MM-YYYY') => this.$dayjs(val).format(format)
    },
    pipeFromNow() {
      return (val) => (val ? this.$dayjs(val).fromNow() : '-')
    },
    pipeWeight() {
      return (val) => {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    },
    pipeFormatBytes() {
      return (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`
      }
    },
  },
}
