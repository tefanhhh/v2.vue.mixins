<template>
  <div>
    <div v-if="label" class="mb-2">
      <p v-if="heading" class="h6--xsmall mb-0 dark--text">
        {{ label }} <span v-if="required" class="red--text">*</span>
      </p>
      <p v-else class="p--default mb-0">
        {{ label }}<span v-if="required" class="red--text">*</span>
      </p>
      <p v-if="subLabel" class="p--default mb-0">{{ subLabel }}</p>
    </div>
    <v-autocomplete
      :ref="autocompleteRef"
      class="rounded-xl"
      :placeholder="`${placeholder || `Input ${label}`}`"
      :loading="loading"
      v-bind="$attrs"
      @keypress.enter="onEnter"
      v-on="$listeners"
    >
      <!-- Please Check this issue if confusing about this multiple template -->
      <!-- https://github.com/vuetifyjs/vuetify/issues/12583 -->
      <template v-for="slotWithProps in parentSlots" #[slotWithProps]="props">
        <slot :name="slotWithProps" v-bind="props" />
      </template>
      <template v-for="slotWithOutProps in whitelistKeys" #[slotWithOutProps]>
        <slot :name="slotWithOutProps" />
      </template>

      <template v-if="canAddItem" #no-data>
        <div class="mt-2">
          <v-btn
            type="button"
            text
            color="primary"
            class="font-weight-bold text-capitalize justify-start"
            block
            :loading="loading"
            @click="
              () => {
                $emit('add:item', $refs[autocompleteRef].$refs.input.value)
                onEnter()
              }
            "
          >
            <v-icon left>add</v-icon>
            Tambahkan baru
          </v-btn>
        </div>
      </template>
    </v-autocomplete>
    <span
      v-if="hintText"
      class="p--small darkGrey--text text--lighten-1 mt-1"
      style="font-style: italic"
      >{{ hintText }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => '',
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    required: {
      type: Boolean,
      default: () => false,
    },
    heading: {
      type: Boolean,
      default: () => true,
    },
    loading: Boolean,
    canAddItem: Boolean,
    autocompleteRef: {
      type: String,
      default: () => 'autocompleteRef',
    },
    subLabel: {
      type: String,
      default: () => '',
    },
    hintText: {
      type: String,
      default: () => '',
    },
    hasTemplatePropsSlot: Boolean,
  },

  setup(props, ctx) {
    const whitelistKeys = [
      'append',
      'append-item',
      'append-outer',
      'label',
      'no-data',
      'prepend',
      'prepend-inner',
      'prepend-item',
      'progress',
    ]
    const parentSlots = Object.keys(ctx.slots).filter(
      (v) => !whitelistKeys.includes(v),
    )
    return { parentSlots }
  },
  data: () => ({
    whitelistKeys: [
      'append',
      'append-item',
      'append-outer',
      'label',
      'prepend',
      'prepend-inner',
      'prepend-item',
      'progress',
    ],
  }),

  methods: {
    onEnter(ev) {
      if (this.canAddItem) {
        ev?.preventDefault()
        const val = String(
          this.$refs[this.autocompleteRef].$refs.input.value,
        ).trim()
        if (val.length > 0) {
          const snack = [
            'Data Berhasil Ditambahkan',
            'success lighten-3',
            'success--text',
            'check_circle',
          ]
          this.$store.dispatch('snack', snack)
        }
      }
    },
  },
}
</script>
