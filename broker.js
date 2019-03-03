// broker.js

task("build", "NODE_ENV=production ts-node fuse electron")
    .desc("typescript -> javascript")

task("dev", "ts-node fuse electron")

task("web", "ts-node fuse web")

task("pack", () => {
    shell("mkdir -p dist/zhu-ui/build")
    shell("cp ./package.json dist/zhu-ui/")
    shell("cp -r ./build/electron dist/zhu-ui/build/")
    process.chdir("dist")
    shell("zip -o zhu-ui.zip -r zhu-ui")
}).desc("pack electron")

task("luis", "luis")
    .desc("open luis notebook")


