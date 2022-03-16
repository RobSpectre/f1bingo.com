<template>
  <div id="header" class="px-4 py-12 bg-auto bg-center">
    <div class="mt-64 inline-block align-middle">
      <span class="ml-3 shadow-sm rounded-md">
        <button type="button" class="inline-flex items-center px-4 py-2 border
          border-transparent text-sm leading-5 font-medium rounded-md
          text-white bg-blue hover:bg-orange focus:outline-none
          focus:shadow-outline-orange focus:border-orange
          active:bg-orange transition duration-150 ease-in-out uppercase"
          @click="resetBoard()">
          Reset
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import headerImage from '@/assets/header-1280x400.png'

export default {
  name: 'Header',
  methods: {
    resetBoard () {
      this.emitter.emit('reset-board', {})

      this.$gtag.event('Click', {
        event_category: 'Reset',
        event_label: 'Board'
      })
    }
  }
}
</script>

<style lang="scss">
#header {
  background-image: url('${headerImage}');
  height: 400px;
}
</style>
