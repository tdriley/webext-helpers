export const setBrowserNamespace = ()=> {
    if (!('browser' in self)) self.browser = self.chrome
}

export const getCurrentTab = async ()=> {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    return tabs[0]
}

// Accept a func that may expect a callback, or may return a promise, and always return a promise.
export const promback = (func, args)=> {
    return new Promise((resolve, reject)=> {
        // Call the func with this promise's resolve as the callback.
        const p = func(...args, resolve)

        // Func returned a promise, resolve this func's promise with the data.
        typeof p.then==='function' && p.then(data=> resolve(data))
    })
}

export const goToTab = async (url)=> {
    const splitUrl = url.split('#')
    const hashSegment = splitUrl[1] ? `#${splitUrl[1]}` : ''
    const queryUrl = splitUrl[0]
    const targetUrl = queryUrl + hashSegment // Isn't this just the same as the original url arg?

    const tabs = await browser.tabs.query({ url: queryUrl, currentWindow: true })
    if (tabs.length) {
        await browser.tabs.update(tabs[0].id, { active: true, url: targetUrl })
        return { result: 'switched', tab: tabs[0] }
    } else {
        const tab = await browser.tabs.create({ url: targetUrl })
        await browser.windows.update(tab.windowId, { focussed: true })
        return { result: 'opened', tab: tab }
    }
}

setBrowserNamespace()