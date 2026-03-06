<template lang="pug">
div(
  v-if='winConditionMet && !winnerCardClosed'
  class="winner-modal absolute inset-0 overflow-hidden flex items-center justify-center p-4 rounded-[1rem]"
  aria-labelledby='modal-title'
  role='dialog'
  aria-modal='true'
)
  div#winner.surface-strong.winner-panel.no-capture
    svg.winner-panel__spray-art(
      viewBox='0 0 420 320'
      preserveAspectRatio='none'
      aria-hidden='true'
    )
      defs
        linearGradient#champagne-stream-gradient(x1='0%' y1='0%' x2='100%' y2='0%')
          stop(offset='0%' stop-color='rgba(255,255,255,0.98)')
          stop(offset='18%' stop-color='rgba(255,247,222,0.94)')
          stop(offset='48%' stop-color='rgba(255,226,163,0.56)')
          stop(offset='100%' stop-color='rgba(255,208,112,0)')
        radialGradient#champagne-drop-gradient(cx='35%' cy='35%' r='70%')
          stop(offset='0%' stop-color='rgba(255,255,255,0.98)')
          stop(offset='45%' stop-color='rgba(255,244,212,0.88)')
          stop(offset='100%' stop-color='rgba(255,213,130,0.1)')
        linearGradient#bottle-body-gradient(x1='0%' y1='0%' x2='0%' y2='100%')
          stop(offset='0%' stop-color='rgba(54, 92, 44, 0.78)')
          stop(offset='35%' stop-color='rgba(23, 70, 20, 0.96)')
          stop(offset='100%' stop-color='rgba(9, 28, 10, 0.98)')
        linearGradient#bottle-neck-gradient(x1='0%' y1='0%' x2='0%' y2='100%')
          stop(offset='0%' stop-color='rgba(34, 36, 38, 0.98)')
          stop(offset='100%' stop-color='rgba(8, 10, 12, 0.98)')
        linearGradient#bottle-foil-gradient(x1='0%' y1='0%' x2='100%' y2='100%')
          stop(offset='0%' stop-color='rgba(239, 215, 120, 0.98)')
          stop(offset='55%' stop-color='rgba(193, 162, 73, 0.98)')
          stop(offset='100%' stop-color='rgba(141, 111, 34, 0.98)')
        linearGradient#bottle-band-gradient(x1='0%' y1='0%' x2='0%' y2='100%')
          stop(offset='0%' stop-color='rgba(25, 29, 31, 0.98)')
          stop(offset='100%' stop-color='rgba(9, 11, 13, 0.98)')
        linearGradient#bottle-label-gradient(x1='0%' y1='0%' x2='0%' y2='100%')
          stop(offset='0%' stop-color='rgba(247, 242, 228, 0.96)')
          stop(offset='100%' stop-color='rgba(225, 216, 191, 0.96)')
        filter#champagne-soft-glow(x='-40%' y='-40%' width='180%' height='180%')
          feGaussianBlur(stdDeviation='6')
      g.winner-panel__spray-rig
        g.winner-panel__spray-effect
          g.winner-panel__spray-cloud(filter='url(#champagne-soft-glow)')
            ellipse.winner-panel__spray-plume(cx='317' cy='177' rx='24' ry='16')
            ellipse.winner-panel__spray-plume.winner-panel__spray-plume--wide(cx='263' cy='143' rx='82' ry='22')
          g.winner-panel__spray-streams
            path.winner-panel__stream.winner-panel__stream--primary(
              d='M325 188 C 303 162, 252 121, 177 71'
            )
            path.winner-panel__stream.winner-panel__stream--secondary(
              d='M325 188 C 297 149, 236 103, 139 47'
            )
            path.winner-panel__stream.winner-panel__stream--tertiary(
              d='M325 188 C 306 171, 263 157, 209 155'
            )
          g.winner-panel__spray-drops
            circle.winner-panel__spray-drop(cx='325' cy='188' r='5' style='--tx:-120px; --ty:-112px; --delay:0s; --duration:1.65s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='4' style='--tx:-148px; --ty:-82px; --delay:0.12s; --duration:1.58s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='7' style='--tx:-106px; --ty:-142px; --delay:0.22s; --duration:1.78s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='3.5' style='--tx:-164px; --ty:-94px; --delay:0.34s; --duration:1.5s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='8' style='--tx:-92px; --ty:-122px; --delay:0.46s; --duration:1.9s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='4.5' style='--tx:-176px; --ty:-62px; --delay:0.62s; --duration:1.46s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='6' style='--tx:-120px; --ty:-156px; --delay:0.78s; --duration:1.84s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='3.5' style='--tx:-138px; --ty:-132px; --delay:0.94s; --duration:1.7s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='5.5' style='--tx:-102px; --ty:-98px; --delay:1.08s; --duration:1.62s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='8.5' style='--tx:-86px; --ty:-148px; --delay:1.24s; --duration:1.92s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='4' style='--tx:-156px; --ty:-54px; --delay:1.38s; --duration:1.42s;')
            circle.winner-panel__spray-drop(cx='325' cy='188' r='5' style='--tx:-116px; --ty:-116px; --delay:1.52s; --duration:1.68s;')
        g.winner-panel__bottle-rig(transform='translate(332 252) rotate(-24)')
          g.winner-panel__bottle-graphic
            rect.winner-panel__bottle-collar(x='-15' y='-74' width='30' height='18' rx='4')
            rect.winner-panel__bottle-neck(x='-12' y='-58' width='24' height='18' rx='7')
            ellipse.winner-panel__bottle-mouth(cx='0' cy='-58' rx='12' ry='4.8')
            path.winner-panel__bottle-foil(d='M-15 -54 L15 -54 L20 -6 C22 16 18 36 11 54 L-11 54 C-18 36 -22 16 -20 -6 Z')
            path.winner-panel__bottle-foil-shine(d='M8 -46 C14 -16 15 18 9 48')
            path.winner-panel__bottle-shoulder-band(d='M-38 36 L38 36 L48 58 L24 82 L0 60 L-24 82 L-48 58 Z')
            path.winner-panel__bottle-shoulder-trim(d='M-28 42 L-10 58 L-20 73')
            path.winner-panel__bottle-shoulder-trim.winner-panel__bottle-shoulder-trim--right(d='M28 42 L10 58 L20 73')
            circle.winner-panel__bottle-seal(cx='0' cy='58' r='8')
            path.winner-panel__bottle-body(d='M-46 60 C-62 104 -60 174 -36 248 L36 248 C60 174 62 104 46 60 C40 40 28 19 15 6 L-15 6 C-28 19 -40 40 -46 60 Z')
            rect.winner-panel__bottle-band-stripe(x='-49' y='142' width='98' height='6' rx='2')
            rect.winner-panel__bottle-band(x='-49' y='148' width='98' height='18' rx='3')
            rect.winner-panel__bottle-main-label(x='-42' y='167' width='84' height='62' rx='6')
            path.winner-panel__bottle-label-rule(d='M-34 186 H34')
            path.winner-panel__bottle-label-rule.winner-panel__bottle-label-rule--lower(d='M-30 210 H30')
            path.winner-panel__bottle-highlight(d='M15 14 C24 44 26 102 19 164 C15 206 10 228 2 240')
    button.winner-panel__close(
      @click="closeWinnerCard"
      type='button'
      aria-label='Close winner modal'
    )
      svg.w-5.h-5(xmlns="http://www.w3.org/2000/svg", fill="none", viewBox="0 0 24 24", stroke-width="2", stroke="currentColor")
        path(stroke-linecap="round", stroke-linejoin="round", d="M6 18 18 6M6 6l12 12")
    p.section-label Bingo Achieved
    h3#modal-title.winner-panel__title That's P1! 
    .winner-panel__actions
      ShareButton(text="Share Win")
</template>

<script>
import ShareButton from '@/components/ShareButton.vue'

export default {
  name: 'WinnerCard',
  components: {
    ShareButton
  },
  props: {
    selectedSquares: Array,
    winConditionMet: Boolean,
    winnerCardClosed: Boolean
  },
  methods: {
    closeWinnerCard () {
      this.$gtag.event('Click', {
        event_category: 'UX',
        event_label: 'closeWinnerCard'
      })

      return this.$emit('closeWinnerCard')
    }
  }
}
</script>

<style lang="scss">
.winner-modal {
  z-index: 20;
  background: rgba(3, 6, 10, 0.68);
  backdrop-filter: blur(12px);
}

.winner-panel {
  position: relative;
  display: grid;
  gap: 0.9rem;
  width: min(100%, 28rem);
  overflow: hidden;
  padding: 1.5rem;
  border-radius: 0.9rem;
  background:
    linear-gradient(135deg, rgba(255, 196, 81, 0.16), transparent 35%),
    linear-gradient(180deg, rgba(10, 16, 24, 0.96), rgba(10, 12, 18, 0.98));
  animation:
    victoryPopIn 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards,
    victoryPulse 2.2s ease-in-out 0.55s infinite alternate;
}

.winner-panel::before {
  content: '';
  position: absolute;
  inset: auto -8% -24% auto;
  width: 16rem;
  height: 16rem;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(255, 214, 140, 0.18) 0%, rgba(255, 214, 140, 0.06) 40%, transparent 74%);
  filter: blur(22px);
  opacity: 0.9;
  pointer-events: none;
}

.winner-panel > * {
  position: relative;
  z-index: 1;
}

.winner-panel__spray-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.winner-panel__spray-art,
.winner-panel__spray-art * {
  pointer-events: none;
}

.winner-panel__spray-rig {
  transform-origin: 325px 188px;
  animation: champagneBottleShake 7.25s ease-in-out infinite;
}

.winner-panel__spray-effect {
  transform-origin: 325px 188px;
  transform: rotate(2deg);
}

.winner-panel__spray-cloud {
  transform-origin: 325px 188px;
}

.winner-panel__spray-plume {
  fill: rgba(255, 245, 217, 0.76);
  transform-origin: 325px 188px;
  animation: champagnePlume 1.55s ease-out infinite;
}

.winner-panel__spray-plume--wide {
  fill: rgba(255, 234, 182, 0.34);
  animation-duration: 1.78s;
  animation-delay: 0.14s;
}

.winner-panel__stream {
  fill: none;
  stroke: url(#champagne-stream-gradient);
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 10px rgba(255, 224, 160, 0.22));
  stroke-dasharray: 32 108;
  animation: champagneStream 0.95s linear infinite;
}

.winner-panel__stream--primary {
  stroke-width: 16;
}

.winner-panel__stream--secondary {
  stroke-width: 10;
  animation-duration: 0.82s;
  animation-delay: 0.12s;
  opacity: 0.9;
}

.winner-panel__stream--tertiary {
  stroke-width: 7;
  animation-duration: 0.74s;
  animation-delay: 0.24s;
  opacity: 0.72;
}

.winner-panel__spray-drop {
  fill: url(#champagne-drop-gradient);
  stroke: rgba(255, 255, 255, 0.28);
  stroke-width: 0.8;
  transform-box: fill-box;
  transform-origin: center;
  animation: champagneDrop var(--duration) cubic-bezier(0.16, 0.66, 0.21, 1) infinite;
  animation-delay: var(--delay);
}

.winner-panel__bottle-rig {
  transform-origin: 0 -58px;
}

.winner-panel__bottle-graphic {
  opacity: 0.92;
}

.winner-panel__bottle-collar,
.winner-panel__bottle-shoulder-band,
.winner-panel__bottle-band {
  fill: url(#bottle-band-gradient);
}

.winner-panel__bottle-foil {
  fill: url(#bottle-foil-gradient);
  stroke: rgba(255, 246, 209, 0.2);
  stroke-width: 1;
}

.winner-panel__bottle-foil-shine {
  fill: none;
  stroke: rgba(255, 245, 211, 0.28);
  stroke-width: 3.2;
  stroke-linecap: round;
  opacity: 0.72;
}

.winner-panel__bottle-neck {
  fill: url(#bottle-neck-gradient);
}

.winner-panel__bottle-mouth {
  fill: rgba(22, 24, 26, 0.98);
  filter: drop-shadow(0 0 8px rgba(255, 226, 160, 0.12));
}

.winner-panel__bottle-body {
  fill: url(#bottle-body-gradient);
  stroke: rgba(255, 234, 189, 0.12);
  stroke-width: 1.2;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.22));
}

.winner-panel__bottle-shoulder-trim {
  fill: none;
  stroke: rgba(214, 180, 88, 0.96);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.88;
}

.winner-panel__bottle-seal {
  fill: rgba(154, 22, 17, 0.96);
  stroke: rgba(88, 10, 8, 0.82);
  stroke-width: 1.2;
}

.winner-panel__bottle-band-stripe {
  fill: rgba(237, 234, 220, 0.9);
}

.winner-panel__bottle-main-label {
  fill: url(#bottle-label-gradient);
  stroke: rgba(194, 175, 117, 0.72);
  stroke-width: 1.2;
}

.winner-panel__bottle-label-rule {
  fill: none;
  stroke: rgba(123, 104, 54, 0.46);
  stroke-width: 1.3;
  stroke-linecap: round;
}

.winner-panel__bottle-highlight {
  fill: none;
  stroke: rgba(255, 244, 211, 0.22);
  stroke-width: 5.5;
  stroke-linecap: round;
}

.winner-panel__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;
  color: var(--text-main);
}

.winner-panel__title {
  font-size: clamp(2.2rem, 7vw, 3rem);
  line-height: 0.9;
}

.winner-panel__copy {
  color: var(--text-muted);
  line-height: 1.45;
}

.winner-panel__actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.2rem;
}

@keyframes victoryPopIn {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes victoryPulse {
  0% {
    box-shadow: 0 0 0 1px rgba(255, 196, 81, 0.08), 0 25px 60px rgba(0, 0, 0, 0.38);
  }
  100% {
    box-shadow: 0 0 0 1px rgba(255, 196, 81, 0.22), 0 30px 75px rgba(255, 91, 77, 0.22);
  }
}

@keyframes champagnePlume {
  0% {
    transform: rotate(-8deg) scale(0.24);
    opacity: 0;
  }
  18% {
    opacity: 0.82;
  }
  56% {
    opacity: 0.34;
  }
  100% {
    transform: rotate(-8deg) scale(1.02);
    opacity: 0;
  }
}

@keyframes champagneStream {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -140;
  }
}

@keyframes champagneDrop {
  0% {
    transform: translate3d(0, 0, 0) scale(0.34);
    opacity: 0;
  }
  14% {
    opacity: 0.96;
  }
  70% {
    opacity: 0.54;
  }
  100% {
    transform: translate3d(var(--tx), var(--ty), 0) scale(1);
    opacity: 0;
  }
}

@keyframes champagneBottleShake {
  0%,
  100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(1.5px);
  }
  75% {
    transform: translateY(-1px);
  }
}
</style>
