<template lang="pug">
aside.senna-tribute(aria-label='Tribute to Ayrton Senna')
  .senna-tribute__mark(aria-hidden='true')
    span(v-for='color in colors' :key='color' :style="{ background: color }")
  h2.senna-tribute__title Obrigado, Ayrton
  p.senna-tribute__facts
    span 1960–1994
    span Three-time World Champion
    span Won at Interlagos in 1991 and 1993
</template>

<script>
import { HELMET_COLORS } from '@/tributes/senna'

export default {
  name: 'SennaTribute',
  data () {
    return { colors: HELMET_COLORS }
  }
}
</script>

<style lang="scss">
.senna-tribute {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.9rem;
  margin: 0 0 1.1rem;
  padding: 0 0.15rem;
}

/* The helmet stripe as a small mark: yellow over green over blue. */
.senna-tribute__mark {
  display: grid;
  gap: 2px;
  width: 3rem;
}

.senna-tribute__mark span {
  display: block;
  height: 3px;
}

.senna-tribute__mark span:first-child {
  height: 6px;
}

.senna-tribute__title {
  font-family: 'Tomorrow', 'Oswald', sans-serif;
  font-size: clamp(1.35rem, 2.6vw, 1.85rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.01em;
  color: var(--sp-ink, #1b1a18);
}

.senna-tribute__facts {
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--sp-ink-soft, #45413b);
}

.senna-tribute__facts span + span::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 0.65rem;
  vertical-align: middle;
  background: var(--sp-green, #00843d);
}

@media (max-width: 640px) {
  .senna-tribute {
    margin-bottom: 0.85rem;
  }

  .senna-tribute__mark {
    width: 2.25rem;
  }

  .senna-tribute__facts {
    margin-left: 0;
    flex-basis: 100%;
    font-size: 0.88rem;
  }

  .senna-tribute__facts span:last-child {
    flex-basis: 100%;
  }

  .senna-tribute__facts span:last-child::before {
    display: none;
  }
}
</style>
