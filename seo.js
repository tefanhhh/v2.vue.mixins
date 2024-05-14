export default {
  head() {
    // google
    const meta_google = [
      {
        hid: 'name',
        itemprop: 'name',
        content: this.seo.title,
      },
      {
        hid: 'description',
        itemprop: 'description',
        content: this.seo.description,
      },
      {
        hid: 'image',
        itemprop: 'image',
        content: this.seo.image,
      },
    ]

    // facebook
    const meta_facebook = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: this.seo.title,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: this.seo.description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: this.seo.image,
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: this.seo.url,
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: this.seo.type,
      },
    ]

    // twitter
    const meta_twitter = [
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: this.seo.title,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: this.seo.description,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: this.seo.image,
      },
    ]

    return {
      title: this.seo.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seo.description,
        },
        ...meta_google,
        ...meta_facebook,
        ...meta_twitter,
      ],
    }
  },
}
