import { actions, kea, path, reducers, afterMount } from 'kea'
// import { loaders } from 'kea-loaders'

import type { dropbookLogicType } from './dropdownlogicType'

export const dropbookLogic = kea<dropbookLogicType>([
  path(['App', 'book', 'dropbookLogic']),
//   loaders(({ values, props }) => ({
//   })),
  actions({
    add: (dr) => ({ dr }),
  }),
  reducers({
    users: [
      [],
      {
        add: (_, { dr }) => dr,
      },
    ],
  }),
  afterMount(async ({ actions, cache }) => {
    console.log('--------mounted')

    const url = `https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8`
    const response = await window.fetch(url)

    const json = await response.json()

    if (response.status === 200) {
      console.log('---json \n', json)
      actions.add(json)
    } else {
      console.log('---error \n', json.message)
    }
  }),
])
