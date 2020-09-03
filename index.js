// const server = require('./server')

// server.listen(8001, () => {
//     console.log('\n** Server Running on localhost:8001 **\n')
// })



require('dotenv').config()
// code away! ok!
const server = require('./server')

const port = process.env.PORT || 8000

server.listen(port, () => {
    console.log(`\n* Server Running on http://localhost:${port} *\n`)
})

