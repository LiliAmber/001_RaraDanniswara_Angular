//mengubah semua request http jdi https
function requireHTTPS(req, res, next) {
    if(!req.secure 
        && req.get('x-forwarded-proto') !== 'https' //khusus untuk server yang di deploy di heroku
    ) {
        return res.redirect('https://' + req.get('host') + req.url)
    }
    next()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.use(requireHTTPS) //komen line ini kalo run di local
app.use(express.static('./dist/todo'))

app.get('/*', (req, res) => 
    res.sendFile('index.html', {root: './dist/todo'})
)

app.listen(port, () => {
    console.log(`Todo app listening to http://localhost:${port}`)
})