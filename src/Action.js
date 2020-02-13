export function creatSet(payload) {
    return {
        type: 'set',
        payload
    }
}

export function creatAdd(payload) {
    return {
        type: 'add',
        payload
    }
}

export function creatRemove(payload) {
    return {
        type: 'remove',
        payload
    }
}

export function creatToggle(payload) {
    return {
        type: 'toggle',
        payload
    }
}
