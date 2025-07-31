const { log } = require('console')
const http = require('http')

const server = http.createServer((req,res)=>{
    res.end('hlo mil gya response')
})

server.listen(4000,()=>{
    console.log('yes friend, i think your server is started');
})