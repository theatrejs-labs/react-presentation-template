export const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}

export const every = (timeout: number, cb: () => void) => {
    setInterval(cb, timeout)
}