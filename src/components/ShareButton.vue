<template lang="pug">
.flex.flex-col.mt-5.justify-center.items-center(class='sm:mt-6')
  button.inline-flex.rounded-md.border.border-transparent.shadow-sm.px-4.py-2.bg-green.text-base.font-medium.text-white.uppercase.mt-14(type='button' class='hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow sm:text-sm sm:mt-24' @click='shareBoard()') {{ text }} 
    ShareIcon.ml-2.h-4.w-4.text-white
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
    async shareBoard() {
      try {
        // Find the app element to screenshot
        const appElement = document.getElementById('app');
        
        // Create a deep clone of the app element
        const clonedApp = appElement.cloneNode(true);
        
        // Apply styling to make it invisible but rendered
        clonedApp.style.position = 'absolute';
        clonedApp.style.top = '-9999px';
        clonedApp.style.left = '-9999px';
        clonedApp.style.width = '643px' 
        clonedApp.style.height = '1050px'
        
        // Append the clone to body
        document.body.appendChild(clonedApp);
        
        // Remove no-capture elements from the clone
        const elementsToRemove = clonedApp.querySelectorAll('.no-capture');
        elementsToRemove.forEach(el => {
          el.remove();
        });

        const footerText = clonedApp.querySelector('.change-for-screenshot')
        const originalFooterText = footerText.innerHTML
        footerText.innerHTML = "Play along at f1bingo.com"
        footerText.classList.remove('inter')
        footerText.classList.add('banner')

        const cellTexts = clonedApp.querySelectorAll('.celltext')

        cellTexts.forEach(el => {
          el.classList.remove('my-0', 'mx-2', 'inline-block')
          el.style.fontSize = '1.2rem'
          el.style.lineHeight = '1.3rem'
          el.style.verticalAlign = 'middle'
          el.style.display = 'inline'
        })
        
        // Set screenshot options for better quality
        const options = {
          logging: false,
          useCORS: true,
          backgroundColor: null,
        };
        
        // Capture screenshot of the clone
        const canvas = await html2canvas(clonedApp, options);
        
        // Remove the clone from the DOM
        document.body.removeChild(clonedApp);
        
        // Convert to image data
        const imageData = canvas.toDataURL('image/png');
        
        // Create a blob for clipboard API
        const res = await fetch(imageData);
        const blob = await res.blob();
        
        // Copy to clipboard
        setTimeout(() => {
          navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ])
        }, 0)

        // Notify user
        this.toast(
          "Board copied to your clipboard!",
          {toastClassName: "bg-green"}
        )
        
        return true;
      } catch (error) {
        console.error('Screenshot sharing failed:', error);
        this.toast(
          `Error copying to clipboard ${error}`,
          {toastClassName: "bg-red"}
        )
      }
    }
  }
}
</script>
