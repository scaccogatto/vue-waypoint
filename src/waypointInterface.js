const GOING_IN = 'in'
const GOING_OUT = 'out'

const going = visibilityRatio => visibilityRatio > 0 ? GOING_IN : GOING_OUT

const DIRECTION_TOP = 'top'
const DIRECTION_RIGHT = 'right'
const DIRECTION_BOTTOM = 'bottom'
const DIRECTION_LEFT = 'left'

const direction = (boundingClientRect, oldBoundingClientRect) => {
  if (boundingClientRect.y < oldBoundingClientRect.y) return DIRECTION_TOP
  if (boundingClientRect.x > oldBoundingClientRect.x) return DIRECTION_RIGHT
  if (boundingClientRect.y > oldBoundingClientRect.y) return DIRECTION_BOTTOM
  if (boundingClientRect.x < oldBoundingClientRect.x) return DIRECTION_LEFT
}

const mapEntry = entry => {
  const { boundingClientRect, intersectionRatio, intersectionRect, isIntersecting, rootBounds, target, time } = entry
  const oldBoundingClientRect = VueWaypoint.$_getBoundingClientRect(entry) // ?

  return {
    el: target,
    going: going(intersectionRatio),
    direction: direction(boundingClientRect, oldBoundingClientRect),
    _entry: entry
  }
}

export {
  going,
  GOING_IN,
  GOING_OUT,
  direction,
  DIRECTION_TOP,
  DIRECTION_RIGHT,
  DIRECTION_BOTTOM,
  DIRECTION_LEFT
}
