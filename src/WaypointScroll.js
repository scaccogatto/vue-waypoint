const WaypointScroll = {
  lastScrollX: window.pageXOffset,
  lastScrollY: window.pageYOffset,
  direction: {
    x: 'right',
    y: 'down'
  },
  updateScrollDirection () {
    WaypointScroll.direction.x = WaypointScroll._mapperX(Math.sign(window.pageXOffset - WaypointScroll.lastScrollX))
    WaypointScroll.direction.y = WaypointScroll._mapperY(Math.sign(window.pageYOffset - WaypointScroll.lastScrollY))

    WaypointScroll.lastScrollX = window.pageXOffset
    WaypointScroll.lastScrollY = window.pageYOffset
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
