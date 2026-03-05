<template lang="pug">
button(
  type='button'
  class='inline-flex items-center justify-center rounded-full border border-transparent shadow-md px-6 py-3 bg-tire-medium text-base font-medium text-darkgray uppercase transition-all duration-200 ease-out hover:bg-tire-soft hover:text-white hover:-translate-y-1 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tire-soft'
  @click='shareBoard()'
) {{ text }} 
  ShareIcon.ml-2.h-4.w-4.text-darkgray
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
    // mounted logic empty, removed clickShare EventListener hack since it breaks Safari user gesture tracking
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
        
        // Convert to image data using a Promise to preserve the async user-gesture context for iOS Safari
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        
        if (!blob) {
          console.error('Failed to create blob from canvas.');
          this.toast('Error creating image data.', { toastClassName: 'bg-red' });
          return;
        }
        
        if (this.isIOS()) {
          const file = new File([blob], 'image.png', { type: 'image/png' });
          
          if (navigator.share) {
            try {
              if (navigator.canShare && !navigator.canShare({ files: [file] })) {
                 this.toast('Sharing images is not supported on this browser.', { toastClassName: 'bg-red' });
                 return;
              }
              await navigator.share({
                title: 'f1bingo.com',
                text: 'Share your board!',
                files: [file]
              });

              this.$gtag.event('Click', {
                event_category: 'Share',
                event_label: 'Share Success'
              });
            } catch (error) {
              // Ignore AbortError which just means the user canceled the share sheet
              if (error.name !== 'AbortError') {
                this.toast(`Error sharing your board: ${error.message}`, { toastClassName: "bg-red" });
              }
              this.$gtag.event('Click', {
                event_category: 'Share',
                event_label: 'Share Failure'
              });
            }
          } else {
            this.toast('Web Share API not supported in this browser', { toastClassName: "bg-red" });
          }
        } else {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob 
              })
            ]);

            this.toast("Board copied to your clipboard!", { toastClassName: "bg-green" });
            console.log('Screenshot copied to clipboard successfully!');
            this.$gtag.event('Click', {
              event_category: 'Share',
              event_label: 'Share Success'
            });
          } catch(clipboardError) {
            console.error('Clipboard write failed:', clipboardError);
            this.toast(`Error copying to clipboard: ${clipboardError.message}`, { toastClassName: "bg-red" });

            this.$gtag.event('Click', {
              event_category: 'Share',
              event_label: 'Share Failure'
            });
          }
        }

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
