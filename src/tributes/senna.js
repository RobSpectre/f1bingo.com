// One-off Ayrton Senna tribute for the 2026 São Paulo Grand Prix weekend.
// To remove it: delete this folder and SennaTribute.vue, then remove the
// `senna` imports and lines in App.vue, Board.vue and Particles.vue.

// Thursday of race week through Monday night in São Paulo (UTC).
export const TRIBUTE_START = Date.parse('2026-11-05T00:00:00Z')
export const TRIBUTE_END = Date.parse('2026-11-10T03:00:00Z')

// The deck square that gets the helmet-colour treatment.
export const TRIBUTE_SQUARE_TEXT = 'Senna tribute'

// Helmet colours, used for the stripe and the square's burst.
export const HELMET_COLORS = ['#ffd21f', '#1fa04f', '#2f6fd6']

export function isSennaTributeActive (now = Date.now(), search = '') {
  const params = new URLSearchParams(search)

  // ?tribute=senna previews it outside the race weekend; ?tribute=off hides it.
  if (params.get('tribute') === 'senna') return true
  if (params.get('tribute') === 'off') return false

  return now >= TRIBUTE_START && now < TRIBUTE_END
}
