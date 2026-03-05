<template lang="pug">
canvas(ref="canvas" class="particles-canvas")
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps, computed } from 'vue'

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  intensity: {
    type: Number,
    default: 3
  }
})

const canvas = ref(null)
let ctx = null
let animationFrameId = null
let particles = []
let width = 0
let height = 0

// Configuration based on intensity
// Level 3: Fast
// Level 4: Faster
// Level 5: Warp Speed
const config = computed(() => {
    if (props.intensity >= 5) return { count: 100, speed: 12, length: 40 }
    if (props.intensity === 4) return { count: 80, speed: 8, length: 30 }
    return { count: 60, speed: 4, length: 20 }
})

class Particle {
  constructor() {
    this.reset(true)
  }

  reset(initial = false) {
    const cx = width / 2
    const cy = height / 2
    const cfg = config.value

    // Spawn randomly around the circle
    const angle = Math.random() * Math.PI * 2
    
    // Empty Circle: Spawn at the edge of the "void" (minRadius)
    // Reduced by 1/3 from 0.35 -> 0.24
    const minRadius = Math.min(width, height) * 0.24
    const maxDist = Math.min(width, height) / 2
    
    // If initial, fill the screen, otherwise spawn at the "event horizon"
    const dist = initial ? minRadius + Math.random() * (maxDist - minRadius) : minRadius + Math.random() * 10
    
    this.x = cx + Math.cos(angle) * dist
    this.y = cy + Math.sin(angle) * dist
    
    this.angle = Math.atan2(this.y - cy, this.x - cx)

    // Base speed from config
    this.speed = cfg.speed + Math.random() * (cfg.speed / 2)
    this.accel = 1.10 
    
    this.baseLength = cfg.length + Math.random() * 20
    this.length = this.baseLength
    
    this.baseWidth = 0.5 + Math.random() * 1.0 
    this.width = this.baseWidth
    
    this.opacity = 0
    this.color = '#00a0de' // Wet tire blue
    
    if (initial) {
        this.opacity = Math.random()
        this.speed *= (1 + Math.random())
    }
  }

  update() {
    const vx = Math.cos(this.angle) * this.speed
    const vy = Math.sin(this.angle) * this.speed
    
    this.x += vx
    this.y += vy
    
    this.speed *= this.accel
    
    // Calculate distance from center for scaling
    const cx = width / 2
    const cy = height / 2
    const dx = this.x - cx
    const dy = this.y - cy
    const dist = Math.sqrt(dx*dx + dy*dy)
    const maxDist = Math.max(width, height) / 1.4
    const minRadius = Math.min(width, height) * 0.24
    
    const distRatio = Math.min((dist - minRadius) / (maxDist - minRadius), 1)

    // Dynamic Scaling
    this.width = this.baseWidth * (1 + distRatio * 2) 
    this.length = this.baseLength * (1 + distRatio * 10)

    // Fade in/out logic
    if (dist < minRadius) {
        this.opacity = 0
    } else if (dist < minRadius + 30) {
        this.opacity += 0.2
    } else if (dist > maxDist - 50) {
        this.opacity -= 0.15
    }
    
    // Reset if out of bounds
    if (this.x < -150 || this.x > width + 150 || this.y < -150 || this.y > height + 150 || (this.opacity <= 0 && dist > minRadius + 50)) {
      this.reset()
    }
    
    this.opacity = Math.max(0, Math.min(1, this.opacity))
  }

  draw() {
    if (this.opacity <= 0.01) return

    const cx = width / 2
    const cy = height / 2
    const minRadius = Math.min(width, height) * 0.24 // Consistent 24%

    // Calculate Head distance
    const dx = this.x - cx
    const dy = this.y - cy
    const headDist = Math.sqrt(dx*dx + dy*dy)

    // If head is inside void, don't draw
    if (headDist < minRadius) return

    const len = Math.min(this.length, 300)
    let bx = this.x - Math.cos(this.angle) * len
    let by = this.y - Math.sin(this.angle) * len

    // Calculate Tail distance
    const tdx = bx - cx
    const tdy = by - cy
    const tailDist = Math.sqrt(tdx*tdx + tdy*tdy)

    // If tail is inside void, clamp it to the edge
    if (tailDist < minRadius) {
        bx = cx + Math.cos(this.angle) * minRadius
        by = cy + Math.sin(this.angle) * minRadius
    }

    ctx.beginPath()
    ctx.globalAlpha = this.opacity
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.width
    ctx.lineCap = 'round'

    ctx.moveTo(this.x, this.y)
    ctx.lineTo(bx, by)
    ctx.stroke()

    ctx.globalAlpha = 1.0
  }
}

const initParticles = () => {
  particles = []
  for (let i = 0; i < config.value.count; i++) {
    particles.push(new Particle());
  }
};

const animate = () => {
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Force a clean void in the center using destination-out
  // This guarantees nothing is drawn in the middle 24%
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  const cx = width / 2;
  const cy = height / 2;
  const minRadius = Math.min(width, height) * 0.24;
  ctx.arc(cx, cy, minRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  animationFrameId = requestAnimationFrame(animate);
};

const handleResize = () => {
  if (canvas.value) {
    const parent = canvas.value.parentElement
    width = parent.clientWidth
    height = parent.clientHeight
    canvas.value.width = width
    canvas.value.height = height
    initParticles()
  }
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    handleResize()
    window.addEventListener('resize', handleResize)
    animate()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationFrameId)
})
// No watch needed as logic is static
</script>

<style scoped>
.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
