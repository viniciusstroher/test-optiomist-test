
const express = require('express')
const app = express()

let mutex = {}

const exists = (key) => {
    if (!mutex[key]) {
        return false
    }
    return true
}

const addMutex = (key) => {
    if (!exists(key)) {
        mutex[key] = key
    }
}

app.set('json spaces', 4)

app.get('/', (req, res) => {

    if (req && req.query && !req.query.id) {
        return res
                .json({
                    message: 'need id query'
                })
    }
    
    const date = new Date().toISOString()
    const key = req.query.id
    
    if (exists(key)) {
        console.log(`[${date}] Request - ${key} - not inserted`)

        return res
                .json({
                    alreadyExists: true,
                    key
                })
    }

    addMutex(key)
    
    console.log(`[${date}] Request - ${key} - inserted`)

    return res.json({
                    inserted: true,
                    key
                })
})


app.get('/persisted', (req, res) => {
    res.json(mutex)
})

app.get('/reset', (req, res) => {
    mutex = {}
    res.json(mutex)
})

app.listen(3000)

const date = new Date().toISOString()

console.log(`[${date}] started at 3000`)