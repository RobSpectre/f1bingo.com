<template lang="pug">
div#app.app-shell
  .app-shell__grid
  .app-shell__glow.app-shell__glow--left
  .app-shell__glow.app-shell__glow--right
  main.app-shell__content
    Board
    Footer
</template>

<script>
import Footer from '@/components/Footer.vue'
import Board from '@/components/Board.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Board
  }
}
</script>

<style lang="scss">
.app-shell {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
}

.app-shell--capture {
  width: 760px;
  min-height: auto;
  padding: 1.5rem;
  border-radius: 1.35rem;
  box-sizing: border-box;
  isolation: isolate;
  background:
    radial-gradient(circle at top, rgba(109, 215, 255, 0.14), transparent 34%),
    radial-gradient(circle at 85% 15%, rgba(255, 91, 77, 0.16), transparent 24%),
    linear-gradient(180deg, #08111c 0%, #05070b 42%, #040506 100%);
}

.app-shell__content {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  display: flex;
  max-width: 1180px;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0 2rem;
}

.app-shell--capture .app-shell__content {
  max-width: none;
  gap: 1rem;
  padding: 0;
}

.app-shell__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 88px 88px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55), transparent 85%);
  pointer-events: none;
}

.app-shell__glow {
  position: absolute;
  width: 32rem;
  height: 32rem;
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.18;
  pointer-events: none;
}

.app-shell__glow--left {
  top: -8rem;
  left: -8rem;
  background: #6dd7ff;
}

.app-shell__glow--right {
  top: 12rem;
  right: -10rem;
  background: #ff5b4d;
}

@media (min-width: 768px) {
  .app-shell {
    padding: 1.5rem;
  }

  .app-shell__content {
    gap: 1.25rem;
    padding-top: 1.25rem;
  }
}
</style>
