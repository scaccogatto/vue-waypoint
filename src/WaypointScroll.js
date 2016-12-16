const WaypointScroll = {
  lastScrollX: window.scrollX,
  lastScrollY: window.scrollY,
  direction: {
    x: 'right',
    y: 'down'
  },
  updateScrollDirection () {
    WaypointScroll.direction.x = WaypointScroll._mapperX(Math.sign(window.scrollX - WaypointScroll.lastScrollX))
    WaypointScroll.direction.y = WaypointScroll._mapperY(Math.sign(window.scrollY - WaypointScroll.lastScrollY))

    WaypointScroll.lastScrollX = window.scrollX
    WaypointScroll.lastScrollY = window.scrollY
  },
  getScrollDirection () {
    return WaypointScroll.direction
  },
  _mapperX (sign) {
    if (sign > 0) return 'right'
    if (sign < 0) return 'left'
    return undefined
  },
  _mapperY (sign) {
    if (sign > 0) return 'down'
    if (sign < 0) return 'up'
    return undefined
  }
}

export default WaypointScroll
