import type { Component, StyleValue } from 'vue'
import { Teleport, h } from 'vue'

export interface FloatingOptions {
  duration?: number
}
export function createFloating<T extends Component>(component: T, options: FloatingOptions = {}) {
  const {
    duration = 1000,
  } = options
  const metadata = reactive<any>({
    props: {},
    attrs: {},
  })

  const proxyEl = ref<HTMLElement | null>()

  // eslint-disable-next-line vue/one-component-per-file
  const container = defineComponent({
    setup() {
      let rect = $ref<DOMRect | undefined>()
      const style = computed((): StyleValue => {
        const fixed: StyleValue = {
          transition: ` all ${duration || 0}ms ease-in-out`,
          position: 'fixed',
        }
        if (!rect || !proxyEl.value) {
          return {
            ...fixed,
            opacity: 0,
            transform: 'translateY(-100px)',
            pointerEvents: 'none',
          }
        }
        return {
          ...fixed,
          left: `${rect.left ?? 0}px`,
          top: `${rect.top ?? 0}px`,
        }
      })

      function update() {
        rect = proxyEl.value?.getBoundingClientRect()
      }

      useMutationObserver(proxyEl, update, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })

      useEventListener('resize', update)
      watchEffect(update)

      let landed = $ref(false)
      let landing: any
      function liftOff() {
        clearTimeout(landing)
        landed = false
      }

      function land() {
        landed = true
      }

      watch(proxyEl, (el) => {
        liftOff()
        update()
        if (el)
          land()
      })

      const rootEl = ref<HTMLDivElement>()

      return () => {
        return h('div', {
          ref: rootEl,
          style: style.value,
        }, [
          h(Teleport, {
            to: proxyEl.value || 'body',
            disabled: !!(landed && proxyEl.value),
          }),
          [h(component, metadata.attrs)],
        ])
      }
    },
  }) as T

  // eslint-disable-next-line vue/one-component-per-file
  const proxy = defineComponent({
    setup(props, ctx) {
      const attrs = useAttrs()
      const el = ref<HTMLElement>()
      metadata.attrs = attrs

      onMounted(() => {
        proxyEl.value = el.value
      })

      onBeforeUnmount(() => {
        // proxyEl.value = undefined
      })

      return () => h('div', { ref: el }, [
        ctx.slots.default ? h(ctx.slots.default) : null,
      ])
    },
  }) as T

  return {
    container,
    proxy,
  }
}
