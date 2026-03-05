<template lang="pug">
section.surface.banner-strip
  .banner-strip__lane
    p.section-label Current Round
    h2.banner-strip__event {{ event }}
  .banner-strip__data
    .banner-strip__stat
      span.banner-strip__label Format
      strong Grand Prix Weekend
    .banner-strip__stat
      span.banner-strip__label Goal
      strong Complete any full line
    .banner-strip__stat
      span.banner-strip__label Share Mode
      strong Screenshot ready
</template>

<script>
import cards from '@/assets/data/deck.json'

export default {
  name: 'Banner',
  data () {
    return {
      event: cards.event
    }
  }
}
</script>

<style lang="scss">
.banner-strip {
  display: grid;
  gap: 1rem;
  border-radius: 0.9rem;
  padding: 1.1rem 1.25rem;
}

.banner-strip__lane {
  display: grid;
  gap: 0.4rem;
}

.banner-strip__event {
  font-size: clamp(1.2rem, 2.8vw, 1.8rem);
  line-height: 1.05;
  letter-spacing: 0.01em;
}

.banner-strip__data {
  display: grid;
  gap: 0.75rem;
}

.banner-strip__stat {
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.85rem 1rem;
}

.banner-strip__label {
  display: block;
  color: var(--text-muted);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.banner-strip__stat strong {
  display: block;
  margin-top: 0.2rem;
  font-family: 'Oswald', sans-serif;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .banner-strip {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    align-items: center;
  }

  .banner-strip__data {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
