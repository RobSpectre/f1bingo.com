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
          stop(offset='0%' stop-color='rgba(121,90,35,0.84)')
          stop(offset='18%' stop-color='rgba(92,70,31,0.98)')
          stop(offset='100%' stop-color='rgba(42,34,15,0.98)')
        linearGradient#bottle-foil-gradient(x1='0%' y1='0%' x2='0%' y2='100%')
          stop(offset='0%' stop-color='rgba(197,165,90,0.96)')
          stop(offset='100%' stop-color='rgba(112,84,31,0.96)')
        filter#champagne-soft-glow(x='-40%' y='-40%' width='180%' height='180%')
          feGaussianBlur(stdDeviation='6')
      g.winner-panel__spray-cloud(filter='url(#champagne-soft-glow)')
        ellipse.winner-panel__spray-plume(cx='322' cy='202' rx='26' ry='17')
        ellipse.winner-panel__spray-plume.winner-panel__spray-plume--wide(cx='276' cy='169' rx='86' ry='24')
      g.winner-panel__spray-streams
        path.winner-panel__stream.winner-panel__stream--primary(
          d='M322 221 C 302 194, 254 146, 176 86'
        )
        path.winner-panel__stream.winner-panel__stream--secondary(
          d='M322 221 C 294 176, 242 120, 132 58'
        )
        path.winner-panel__stream.winner-panel__stream--tertiary(
          d='M322 221 C 304 204, 264 182, 202 170'
        )
      g.winner-panel__spray-drops
        circle.winner-panel__spray-drop(cx='322' cy='221' r='5' style='--tx:-120px; --ty:-112px; --delay:0s; --duration:1.65s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='4' style='--tx:-148px; --ty:-82px; --delay:0.12s; --duration:1.58s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='7' style='--tx:-106px; --ty:-142px; --delay:0.22s; --duration:1.78s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='3.5' style='--tx:-164px; --ty:-94px; --delay:0.34s; --duration:1.5s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='8' style='--tx:-92px; --ty:-122px; --delay:0.46s; --duration:1.9s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='4.5' style='--tx:-176px; --ty:-62px; --delay:0.62s; --duration:1.46s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='6' style='--tx:-120px; --ty:-156px; --delay:0.78s; --duration:1.84s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='3.5' style='--tx:-138px; --ty:-132px; --delay:0.94s; --duration:1.7s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='5.5' style='--tx:-102px; --ty:-98px; --delay:1.08s; --duration:1.62s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='8.5' style='--tx:-86px; --ty:-148px; --delay:1.24s; --duration:1.92s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='4' style='--tx:-156px; --ty:-54px; --delay:1.38s; --duration:1.42s;')
        circle.winner-panel__spray-drop(cx='322' cy='221' r='5' style='--tx:-116px; --ty:-116px; --delay:1.52s; --duration:1.68s;')
      g.winner-panel__bottle-graphic(transform='translate(325 224) rotate(18)')
        rect.winner-panel__bottle-neck(x='-11' y='-44' width='22' height='40' rx='6')
        rect.winner-panel__bottle-foil(x='-13' y='-63' width='26' height='22' rx='6')
        ellipse.winner-panel__bottle-mouth(cx='0' cy='-42' rx='11' ry='4.5')
        path.winner-panel__bottle-body(d='M-30 0 C-33 46 -31 82 -18 116 L18 116 C31 82 33 46 30 0 Z')
        rect.winner-panel__bottle-label(x='-17' y='34' width='34' height='28' rx='8')
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

.winner-panel__spray-cloud {
  transform-origin: 322px 221px;
}

.winner-panel__spray-plume {
  fill: rgba(255, 245, 217, 0.76);
  transform-origin: 322px 221px;
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

.winner-panel__bottle-graphic {
  opacity: 0.84;
}

.winner-panel__bottle-neck {
  fill: url(#bottle-body-gradient);
}

.winner-panel__bottle-foil {
  fill: url(#bottle-foil-gradient);
}

.winner-panel__bottle-mouth {
  fill: rgba(255, 234, 190, 0.92);
  filter: drop-shadow(0 0 10px rgba(255, 226, 160, 0.22));
}

.winner-panel__bottle-body {
  fill: url(#bottle-body-gradient);
  stroke: rgba(255, 234, 189, 0.12);
  stroke-width: 1.2;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.22));
}

.winner-panel__bottle-label {
  fill: rgba(214, 180, 104, 0.88);
  stroke: rgba(255, 236, 188, 0.2);
  stroke-width: 1;
}

.winner-panel__bottle {
  position: absolute;
  right: -0.85rem;
  bottom: -1.4rem;
  width: 5.8rem;
  height: 10.5rem;
  border-radius: 1.4rem 1.4rem 1.9rem 1.9rem;
  background:
    linear-gradient(180deg, rgba(121, 90, 35, 0.78) 0%, rgba(87, 66, 28, 0.96) 18%, rgba(49, 42, 18, 0.98) 100%);
  border: 1px solid rgba(255, 222, 155, 0.1);
  box-shadow:
    inset 0 1px 0 rgba(255, 239, 197, 0.18),
    inset -12px 0 24px rgba(0, 0, 0, 0.24),
    0 10px 24px rgba(0, 0, 0, 0.26);
  transform: rotate(18deg);
  opacity: 0.72;
}

.winner-panel__bottle::before {
  content: '';
  position: absolute;
  top: -1.3rem;
  left: 1.95rem;
  width: 1.55rem;
  height: 2.2rem;
  border-radius: 0.45rem 0.45rem 0.25rem 0.25rem;
  background:
    linear-gradient(180deg, rgba(165, 133, 58, 0.98), rgba(102, 80, 34, 0.98));
  box-shadow: inset 0 1px 0 rgba(255, 236, 188, 0.14);
}

.winner-panel__bottle::after {
  content: '';
  position: absolute;
  top: -0.5rem;
  left: 1.82rem;
  width: 1.8rem;
  height: 0.58rem;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(255, 214, 124, 0.9), rgba(252, 233, 184, 0.9));
  box-shadow: 0 0 14px rgba(255, 215, 138, 0.22);
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
</style>
