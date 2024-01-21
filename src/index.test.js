import { promback } from "./index.js"

const mockPromiseFunc = (arg1, arg2)=> {
    return new Promise((resolve, reject)=> {
        if (arg1===arg2) {
            resolve('good')
        } else {
            reject('bad')
        }
    })
}

const mockCallbackFunc = (arg1, arg2, callback)=> {
    if (arg1===arg2) callback('good')
}

test('promback: a func that returns a promise resolves correctly', async () => {
    await expect( promback(mockPromiseFunc, [true, true]) ).resolves.toBe('good')
})

test('promback: a func that returns a promise rejects correctly', async () => {
    await expect( promback(mockPromiseFunc, [true, false]) ).rejects.toBe('bad')
})

test('promback: a func that expects a callback resolves a promise', async () => {
    await expect( promback(mockCallbackFunc, [true, true]) ).resolves.toBe('good')
})
