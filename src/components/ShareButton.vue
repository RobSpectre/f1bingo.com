<template lang="pug">
button.control-button.control-button--primary(
  type='button'
  @click='shareBoard()'
)
  | {{ text }}
  ShareIcon.ml-2.h-4.w-4
</template>

<script>
import html2canvas from 'html2canvas-pro'

import { ShareIcon } from '@heroicons/vue/24/solid'

import { useToast } from 'vue-toastification'

import { boardStore } from '@/store/board'

export default {
  name: 'ShareButton',
  components: {
    ShareIcon
  },
  setup() {
    const game = boardStore()

    const toast = useToast()

    return { game, toast }
  },
  props: {
    text: String
  },
  methods: {
    async tryClipboardCopy (blob) {
      if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
        return false
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ])

      return true
    },
    async createScreenshotBlob () {
      const appElement = document.querySelector('.app-shell')

      if (!appElement) {
        throw new Error('Could not find the board to capture.')
      }

      const clonedApp = appElement.cloneNode(true)
      const captureFrame = document.createElement('div')

      captureFrame.style.position = 'absolute'
      captureFrame.style.top = '-9999px'
      captureFrame.style.left = '-9999px'
      captureFrame.style.boxSizing = 'border-box'

      clonedApp.id = 'app-share-capture'
      clonedApp.classList.add('app-shell--capture')

      captureFrame.appendChild(clonedApp)
      document.body.appendChild(captureFrame)

      try {
        const elementsToRemove = captureFrame.querySelectorAll('.no-capture, .winner-modal, .particles-container, .particles-canvas')
        elementsToRemove.forEach(el => {
          el.remove()
        })

        const footerText = captureFrame.querySelector('.change-for-screenshot')
        if (footerText) {
          footerText.textContent = 'Play along at f1bingo.com'
        }

        const canvas = await html2canvas(clonedApp, {
          logging: false,
          useCORS: true,
          backgroundColor: null
        })

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))

        if (!blob) {
          throw new Error('Error creating image data.')
        }

        return blob
      } finally {
        document.body.removeChild(captureFrame)
      }
    },
    async shareBoard() {
      try {
        const blob = await this.createScreenshotBlob()
        const copied = await this.tryClipboardCopy(blob)

        if (!copied) {
          throw new Error('Clipboard image sharing is not supported on this browser.')
        }

        this.toast('Board copied to your clipboard!', { toastClassName: 'theme-toast theme-toast--success' })
        this.$gtag.event('Click', {
          event_category: 'Share',
          event_label: 'Clipboard Share Success'
        })

        return true
      } catch (error) {
        console.error('Screenshot sharing failed:', error)
        this.toast(`Error sharing your board: ${error.message || error}`, { toastClassName: 'theme-toast theme-toast--error' })
        this.$gtag.event('Click', {
          event_category: 'Share',
          event_label: 'Share Failure'
        })
      }
    }
  }
}
</script>
