interface Logger {
    debug(format:any, ...params:any[]):void
    info(format:any, ...params:any[]):void
    warn(format:any, ...params:any[]):void
    error(format:any, ...params:any[]):void    
}


declare function logger(ns?:string): Logger
