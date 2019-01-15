import { observable, action, flow,  } from 'mobx'
import * as _ from 'lodash'
import UIStore from './uiStore'
import SettingStore from './settingStore'
import axios from 'axios'

export default class EditorStore {
    @observable curTab: number = 0
    @observable tabs: string[] = []
    @observable curDirty: boolean = false
    @observable curContent: string = ""
    articles: any[] = []
    us: UIStore
    ss: SettingStore

    constructor(us: UIStore, ss: SettingStore) {
        this.us = us
        this.ss = ss
    }

    @action
    switchTab(n:number) {
        this.curTab = n
        this.curContent = this.articles[n].content
        this.curDirty = this.articles[n].dirty
    }

    @action
    bufferContent(content: string) {
        let article = this.articles[this.curTab]
        article.content = content
        this.curContent = content
        article.dirty = true
        this.curDirty = true
    }

    @action
    openEditor() {
        if (this.articles.length === 0) {
            this.newAritcle()
        }
        this.us.showArticleEditor()
    }

    @action
    newAritcle() {
        let article = {
            id: "NEW-" + Date.now().toString(),
            title: "New",
            content: "",
            dirty: false
        }    
        this.articles.push(article)
        let tabs = this.tabs as any
        tabs.replace(this.computeTabs(this.articles))
        this.curTab = this.articles.length - 1
        this.curDirty = article.dirty
        this.curContent = article.content
    }

    @action
    editArticle(id:string, content: string) {
        for (let i=0; i< this.articles.length; i++) {
            let article = this.articles[i]
            if (article.id === id) {
                this.curTab = i
                this.curContent = article.content
                this.curDirty = article.dirty
                this.us.showArticleEditor()
                return
            }
        }
        let article = {
            id: id,
            title: this.calcTitle(content),
            content: content,
            dirty: false
        }
        this.articles.push(article)
        let tabs = this.tabs as any
        tabs.replace(this.computeTabs(this.articles))
        this.curTab = this.tabs.length - 1
        this.curDirty = article.dirty
        this.curContent = article.content

        this.us.showArticleEditor()
    }

    @action
    closeTab(n:number) {
        this.articles.splice(n, 1)
        let tabs = this.tabs as any
        tabs.replace(this.computeTabs(this.articles))
        if (this.articles.length === 0) {
            this.us.hideArticleEditor()
            this.curTab = 0
            return
        }
        if (n === this.curTab) {
            if (n >= this.articles.length) {
                this.curTab = this.articles.length - 1
            }
        } else {
            if (n < this.curTab) {
                this.curTab -= 1
            }
        }
        let article = this.articles[this.curTab]
        this.curContent = article.content
        this.curDirty = article.dirty
    }

    saveCurrent = flow(function * saveCurrent(content: string): any {
        let article = this.articles[this.curTab]
        try {
            let body:any
            if (_.startsWith(article.id, 'NEW-')) {
                body = {
                    title: "",
                    content: content
                }
            } else {
                body = {
                    id: article.id,
                    title: "",
                    content: content
                }
            }
            let res = yield axios.post(this.ss.server + '/resources/article', body)
            // in case of race conditon
            let curArticle = this.articles[this.curTab]
            if (curArticle === article) {
                this.curDirty = false
            }
            // in case of new article
            if (_.startsWith(article.id, 'NEW')) {
                article.id = res.data.id
            }
            article.dirty = false
            article.title = this.calcTitle(article.content)
            this.tabs.replace(this.computeTabs(this.articles))
            this.us.notify("保存成功")
        } catch(err) {
            this.us.notify("保存失败", "error")    
            console.log(err)
        }
    })
    
    calcTitle(content: string) {
        return content.slice(0, 10)
    }

    computeTabs(articles: any[]): any[] {
        return _.map(articles, (article) => article.title)
    }
}