// broker.js

task("build", "NODE_ENV=production npx ts-node fuse electron")
    .desc("typescript -> javascript")

task("dev", "ts-node fuse electron")

task("run", "npx electron .")

task("pack", "npx electron-builder").desc("pack electron")


