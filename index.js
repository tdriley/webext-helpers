export const setNamespace = ()=> {
    if (!('browser' in self)) self.browser = self.chrome
}

export const getActiveTab = async ()=> {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    return tabs[0]
}

setNamespace()