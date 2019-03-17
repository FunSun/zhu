import { inject, observer } from "mobx-react"

export function bindWith(stores:string[], comp:(props:any)=>React.ReactElement<any>) {
    return inject(...stores)(observer(comp))
}
