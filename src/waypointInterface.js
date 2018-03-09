const GOING_IN = 'in'
const GOING_OUT = 'out'

const going = visibilityRatio => visibilityRatio > 0 ? GOING_IN : GOING_OUT

const DIRECTION_TOP = 'top'
const DIRECTION_RIGHT = 'right'
const DIRECTION_BOTTOM = 'bottom'
const DIRECTION_LEFT = 'left'

const direction = (boundingClientRect, oldBoundingClientRect) => {
  if (boundingClientRect.top < oldBoundingClientRect.top) return DIRECTION_TOP
  if (boundingClientRect.left > oldBoundingClientRect.left) return DIRECTION_RIGHT
  if (boundingClientRect.top > oldBoundingClientRect.top) return DIRECTION_BOTTOM
  if (boundingClientRect.left < oldBoundingClientRect.left) return DIRECTION_LEFT
}

const extractWaypointData = node => node._waypointData

const extractOldBoundingClientRect = (node, defaultBoundingClientRect) => {
  const nodeData = extractWaypointData(node)
  return typeof nodeData !== 'undefined' ? nodeData : defaultBoundingClientRect
}

const mapEntry = entry => {
  const { boundingClientRect, intersectionRatio, target } = entry
  const oldBoundingClientRect = extractOldBoundingClientRect(target, boundingClientRect)

  // save current rect
  target._waypointData = boundingClientRect

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
  DIRECTION_LEFT,
  mapEntry
}
