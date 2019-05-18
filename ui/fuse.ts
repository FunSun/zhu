import { FuseBox, CSSResourcePlugin, CSSPlugin, Sparky, CopyPlugin } from "fuse-box"

const DEV_PORT = 4445
const OUTPUT_DIR = "build"
const ASSETS = ["*.jpg", "*.png", "*.jpeg", "*.gif", "*.svg"]

// are we running in production mode?
const isProduction = process.env.NODE_ENV === "production"

// copy the renderer's html file into the right place
Sparky.task("copy-html", () => {
  return Sparky.src("src/index.html").dest(`${OUTPUT_DIR}/$name`)
})

// the default task
Sparky.task("ui", ["copy-html"], () => {
  // setup the producer with common settings
  const fuse = FuseBox.init({
    homeDir: "src",
    output: `${OUTPUT_DIR}/$name.js`,
    allowSyntheticDefaultImports: true,
    target: "browser@es6",
    log: isProduction,
    cache: !isProduction,
    sourceMaps: true,
    tsConfig: "tsconfig.json",
  })

  if (!isProduction) {
    fuse.dev({ port: DEV_PORT, httpServer: false })
  }

  const indexBundle = fuse
    .bundle("index")
    .instructions("> index.tsx +fuse-box-css")
    .plugin([CSSResourcePlugin({dist: OUTPUT_DIR + "/resources"}), CSSPlugin()])
    .plugin(CopyPlugin({ useDefault: false, files: ASSETS, dest: "assets", resolve: "assets/" }))

  // and watch & hot reload unless we're bundling for production
  if (!isProduction) {
    indexBundle.watch()
    indexBundle.hmr()
  }

  return fuse.run().then(() => {}).catch((err) => {console.log(err)})

})
