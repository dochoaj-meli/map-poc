import * as items from '../mocks/items.json'

export default () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(items.results)
        }, 250)
    })
}