import * as sanitizeHtml from 'sanitize-html'
export default {
  methods: {
    sanitize(val) {
      const sanitized = sanitizeHtml(val, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
          img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
        },
      })
      return sanitized
    },
    sanitizeClearHtmlTags(val) {
      const sanitized = sanitizeHtml(val, {
        allowedTags: [],
        allowedAttributes: [],
      })
      return sanitized
    },
  },
}
