import ResourceStore from './resourceStore'
import UIStore from './uiStore'
let us = new UIStore()
let rs = new ResourceStore(us)
export default {
    resourceStore: rs,
    uiStore: us
}