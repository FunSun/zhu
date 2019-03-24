import {getStore} from './common'
import ResourceStore from './resourceStore'
import SettingStore from './settingStore'
import SnippetStore from './snippetStore'
import TagStore from './tagStore'
let settingStore = new SettingStore()
let resourceStore = new ResourceStore()
let snippetStore = new SnippetStore()
let tagStore = new TagStore(resourceStore)

export default {
    basicStore: getStore(),
    resourceStore,
    settingStore,
    snippetStore,
    tagStore
}