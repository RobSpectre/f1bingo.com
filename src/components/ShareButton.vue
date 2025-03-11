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
  mounted () {
    document.addEventListener('clickShare', async (e) => {
      const file = new File([e.detail], 'image.png', { type: 'image/png' });
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'f1bingo.com',
            text: 'Share your board!',
            files: [file]
          });

          this.$gtag.event('Click', {
            event_category: 'Share',
            event_label: 'Share Success'
          })
        } catch (error) {
          this.toast(`Error sharing your board: ${error.message}`, { toastClassName: "bg-red" });
        }
          this.$gtag.event('Click', {
            event_category: 'Share',
            event_label: 'Share Failure'
          })
      } else {
        this.toast('Web Share API not supported in this browser', { toastClassName: "bg-red" });
        this.$gtag.event('Click', {
          event_category: 'Share',
          event_label: 'Share Failure'
        })
      }
    })
  },
  methods: {
    isIOS() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
      // Check for iOS devices: iPhone, iPad, iPod
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
      }
      
      // Additional check for iOS 13+ iPad which uses desktop user-agent
      if (/Macintosh/.test(userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1) {
        return true;
      }
      
      return false;
    },
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
        canvas.toBlob(async (blob) => {
          if (!blob) {
            console.error('Failed to create blob from canvas.');
            this.toast('Error creating image data.', { toastClassName: 'bg-red' });
            return;
          }
          
          if (this.isIOS()) {
            try {
              const event = new CustomEvent('clickShare', { detail: blob } )
              document.dispatchEvent(event)

            } catch (clipboardError) {
              console.error('Clipboard write failed:', clipboardError); // Detailed error log
              this.toast(`Error copying to clipboard: ${clipboardError.message}`, { toastClassName: "bg-red" });
            }
          } else {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({
                  'image/png': blob 
                })
              ])

              this.toast("Board copied to your clipboard!", { toastClassName: "bg-green" });
              console.log('Screenshot copied to clipboard successfully!'); // Success log
              this.$gtag.event('Click', {
                event_category: 'Share',
                event_label: 'Share Success'
              })
            } catch(clipboardError) {
              console.error('Clipboard write failed:', clipboardError); // Detailed error log
              this.toast(`Error copying to clipboard: ${clipboardError.message}`, { toastClassName: "bg-red" });

              this.$gtag.event('Click', {
                event_category: 'Share',
                event_label: 'Share Failure'
              })
            }
          }
        }, 'image/png')

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
