// polyfill
import {} from 'intersection-observer'
import { mapEntry } from './waypointInterface'

const defaultObserverOptions = {}

const observerCallback = (entries, callback) => entries.forEach(entry => entryCallback(entry, callback))

const entryCallback = (entry, callback) => callback(mapEntry(entry))

const createObserver = (callback, options) => new window.IntersectionObserver(callback, options)

const addObserver = (el, callback, options = defaultObserverOptions) => {
  const observer = createObserver((entries, observer) => observerCallback(entries, callback), options)

  observer.observe(el)
  return observer
}

const removeObserver = (observer, el) =>  observer.unobserve(el)

export { addObserver, removeObserver }
