import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export function useElementResize(target: Ref<HTMLElement | null>, callback: () => void) {
  let observer: ResizeObserver | undefined

  onMounted(() => {
    if (!target.value) {
      return
    }

    observer = new ResizeObserver(() => callback())
    observer.observe(target.value)
    window.addEventListener('resize', callback)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener('resize', callback)
  })
}

export function observeResize(target: HTMLElement, callback: () => void) {
  const observer = new ResizeObserver(() => callback())
  const disconnect = observer.disconnect.bind(observer)

  observer.observe(target)
  window.addEventListener('resize', callback)

  observer.disconnect = () => {
    disconnect()
    window.removeEventListener('resize', callback)
  }

  return observer
}
