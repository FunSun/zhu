export function storeSetting(k: string, v:any) {
    window.localStorage.setItem("settings." + k, JSON.stringify(v))
}

export function loadSetting(k: string) {
    let raw = window.localStorage.getItem("settings."+k)
    if (!raw) {
        return null
    }
    return JSON.parse(raw)
}

export function defaultSetting(k:string, v:any) {
    if (!loadSetting(k)) {
        storeSetting(k, v)
    }
}