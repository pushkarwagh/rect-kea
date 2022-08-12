import { actions, kea, path, reducers, listeners, afterMount, beforeUnmount, selectors, key } from 'kea'

import type { counterLogicType } from './counterLogicType'

export const counterLogic = kea<counterLogicType>([
  path(['App', 'Counter', 'counterLogic']),
  actions({
    increment: true,
    decrement: true,
  }),
  reducers({
    counter: [
      0,
      {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
      },
    ],
  }),
  listeners(({ actions }) => ({
    increment: async (_, breakpoint) => {
      console.log('inside listener increment?')
      await breakpoint(1000)
      // actions.decrement()
      console.log('after breakpoint increment listener!')
    },
    decrement: async (_, breakpoint) => {
      console.log('inside listener decrement?')
      await breakpoint(1000)
      // actions.increment()
      console.log('after breakpoint decrement listener!')
    },
  })),
  // afterMount(({ actions, cache }) => {
  //   cache.incInterval = window.setInterval(() => {
  //     actions.increment()
  //   }, 3000)
  //   cache.decInterval = window.setInterval(() => {
  //     actions.decrement()
  //   }, 5000)
  // }),
  // beforeUnmount(({ cache }) => {
  //   cache.incInterval && window.clearInterval(cache.incInterval)
  //   cache.decInterval && window.clearInterval(cache.decInterval)
  // }),
  selectors({
    counterColor: [(s) => [s.counter], (counter) => (counter < 0 ? 'red' : counter > 5 ? 'skyblue' : 'yellowgreen')],
  }),
])
