import BasicStore from './basicStore'
import ResourceStore from './resourceStore'
import SettingStore from './settingStore'
import SnippetStore from './snippetStore'
import TagStore from './tagStore'
let basicStore = new BasicStore()
let settingStore = new SettingStore(basicStore)
let resourceStore = new ResourceStore(basicStore)
let snippetStore = new SnippetStore(basicStore)
let tagStore = new TagStore(basicStore, resourceStore)

export default {
    basicStore,
    resourceStore,
    settingStore,
    snippetStore,
    tagStore
}