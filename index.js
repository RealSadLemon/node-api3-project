// require your server and launch it
const server = require('./api/server');

server.listen(7000, () => {
    console.log(`Server on http://localhost:7000`)
})