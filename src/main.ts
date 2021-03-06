// logger as a builtin
import {replaceConsoleLog} from './lib/logger'
replaceConsoleLog()

import {FsConfigService} from './services/ConfigSerivce'
import KVService from './services/KVService'
import SearchService from './services/SearchService'
import PageService from './services/PageService'
import LinkService from './services/LinkService'
import WebService from './services/WebService'
import SlackBotService from './services/SlackBotService'

export async function init() {
}

async function main() {
  logger("main").info("start main")
  let confSvc = new FsConfigService()
  await confSvc.init()
  let kvSvc = new KVService(confSvc)
  await kvSvc.init()
  let schSvc = new SearchService()
  await schSvc.init()
  let pgSvc = new PageService(kvSvc, schSvc)
  await pgSvc.init()
  let linkSvc = new LinkService(kvSvc)
  await linkSvc.init()
  let webSvc = new WebService(confSvc, pgSvc, linkSvc)
  await webSvc.init()
  let slackSvc = new SlackBotService(pgSvc)
  await slackSvc.init()
  logger("main").info("init finished")
  process.on('SIGTERM', async () => {
    logger("main").info("begin graceful quit")
    await kvSvc.lastSync()
    logger("main").info("end graceful quit")
    process.exit()
  })
}

main().catch((err) => {
  logger("main").error(err)
})

process.on('SIGTERM', () => {
  
})