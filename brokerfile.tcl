task build {
    global env
    set env(NODE_ENV) production
    spawn npx ts-node fuse electron
    interact
} "typescript -> javascript"

task dev {
    spawn ts-node fuse electron
    interact
}

task run {
    spawn npx electron .
    interact
}

task pack {
    spawn npx electron-builder
    interact
} "pack electron"



