# webext-helpers
Cross-browser helper utility functions for MV3 & MV2 web extensions.

## Usage
First install as a project dependency: 

```npm install webext-helpers --save```

## Functions
 - `setBrowserNamespace`

Normalise the top-level web extension namespace as `browser`, so you can access `chrome.whatever.func()` as `browser.whatever.func()` in all browsers. Requires the `tabs` permission in `manifest.json`.

```javascript
    import { setBrowserNamespace } from "webext-helpers"

    setBrowserNamespace()

    // All web extension function calls can now start with browser.
```

 - `getCurrentTab`

Get the currently active tab in the current window. Requires the `tabs` permission in `manifest.json`.

```javascript
    import { getCurrentTab } from "webext-helpers"

    const activeTab = await getActiveTab()
    // Do what you want with the active tab.
    console.log(activeTab.url)
```

 - `promback`

Allows you to use `Promise` syntax with any web extension function (useful for browser differences in MV2 where Firefox expects promises and Chrome expects callbacks). You should provide the function ref and an array of arguments to call it with.

```javascript
    import { promback } from "webext-helpers"

    promback( browser.tabs.create, [{ url: 'https://github.com/tdriley/webext-helpers#readme' }]).then(data=> {
        console.log(data)
        // data will be whatever is resolved by the promise (Firefox), or whatever is provided to the callback func (Chrome).
    })
```

 - `goToTab`
Check if there is a tab open in the current window with the provided URL. If not, open a new tab with the URL. Requires the `tabs` permission in `manifest.json`.

```javascript
    import { goToTab } from "webext-helpers"

    const result = await goToTab('https://github.com/tdriley/webext-helpers#readme')

    // result will be an object containing `result` and `tab` props. The `result` prop will be "switched" if the tab was switched, or "opened" if the tab was opened. The `tab` prop will be the tab object of the tab that was switched to or opened.
```
