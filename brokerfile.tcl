task build {
    spawn npx tsc
    interact
} "typescript -> javascript"

task build-ui {
    cd ui
    global env
    set env(NODE_ENV) production
    spawn npx ts-node fuse ui
    interact
    cd ..
    file delete -force ./build/ui
    file copy -force ui/build ./build/ui
}

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



