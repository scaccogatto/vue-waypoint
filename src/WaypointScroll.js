const WaypointScroll = {
  scrollElement: window,
  lastScrollX: 0,
  lastScrollY: 0,
  direction: {
    x: 'right',
    y: 'down'
  },
  setScrollElement (element) {
    WaypointScroll.scrollElement = element
    WaypointScroll.initPosition()
  },
  initPosition () {
    WaypointScroll.lastScrollX = WaypointScroll.getPositionX()
    WaypointScroll.lastScrollY = WaypointScroll.getPositionY()
  },
  getPositionX () {
    return (WaypointScroll.scrollElement !== window)
      ? WaypointScroll.scrollElement.scrollLeft : WaypointScroll.scrollElement.pageXOffset
  },
  getPositionY () {
    return (WaypointScroll.scrollElement !== window)
      ? WaypointScroll.scrollElement.scrollTop : WaypointScroll.scrollElement.pageYOffset
  },
  updateScrollDirection () {
    WaypointScroll.direction.x = WaypointScroll._mapperX(Math.sign(WaypointScroll.getPositionX() - WaypointScroll.lastScrollX))
    WaypointScroll.direction.y = WaypointScroll._mapperY(Math.sign(WaypointScroll.getPositionY() - WaypointScroll.lastScrollY))

    WaypointScroll.initPosition()
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
