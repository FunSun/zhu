import { FuseBox, CSSResourcePlugin, CSSPlugin, Sparky, CopyPlugin, ReplacePlugin } from "fuse-box"
import { spawn } from "child_process"
let pjson = require("./package.json")

const DEV_PORT = 4445
const ELECTRON_OUTPUT_DIR = "build/electron"
const ASSETS = ["*.jpg", "*.png", "*.jpeg", "*.gif", "*.svg"]

// are we running in production mode?
const isProduction = process.env.NODE_ENV === "production"

// copy the renderer's html file into the right place
Sparky.task("copy-electron-html", () => {
  return Sparky.src("src/renderer/index.html").dest(`${ELECTRON_OUTPUT_DIR}/$name`)
})

// the default task
Sparky.task("electron", ["copy-electron-html"], () => {
  // setup the producer with common settings
  const fuse = FuseBox.init({
    homeDir: "src",
    output: `${ELECTRON_OUTPUT_DIR}/$name.js`,
    allowSyntheticDefaultImports: true,
    target: "electron",
    log: isProduction,
    cache: !isProduction,
    sourceMaps: true,
    tsConfig: "tsconfig.json",
  })

  // start the hot reload server
  if (!isProduction) {
    fuse.dev({ port: DEV_PORT, httpServer: false })
  }

  // bundle the electron main code
  const mainBundle = fuse
    .bundle("main")
    .target("server")
    .instructions("> [main/main.ts]")
    // inject in some configuration
    .plugin(
      ReplacePlugin({
        "process.env.HOMEPAGE": pjson.homepage ? `"${pjson.homepage}"` : "null",
      }),
    )

  // and watch unless we're bundling for production
  if (!isProduction) {
    mainBundle.watch()
  }

  // bundle the electron renderer code
  const rendererBundle = fuse
    .bundle("renderer")
    .instructions("> [renderer/index.tsx] +fuse-box-css")
    .plugin([CSSResourcePlugin({dist: ELECTRON_OUTPUT_DIR + "/resources"}), CSSPlugin()])
    .plugin(CopyPlugin({ useDefault: false, files: ASSETS, dest: "assets", resolve: "assets/" }))

  // and watch & hot reload unless we're bundling for production
  if (!isProduction) {
    rendererBundle.watch()
    rendererBundle.hmr()
  }

  let env = Object.create( process.env )
  env.PLUGIN = 'withplugin'
  // when we are finished bundling...
  return fuse.run().then(() => {
    if (!isProduction) {
      // startup electron
      spawn("node", [`${__dirname}/node_modules/electron/cli.js`, __dirname], {
        stdio: "inherit",
        env: env
      }).on("exit", code => {
        console.log(`electron process exited with code ${code}`)
        process.exit(code)
      })
    }
  })
})
