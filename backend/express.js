const Express = require('express')
const Parser = require('body-parser')
const Cors = require('cors')
const Path = require('path')
const FS = require('fs')

/** Check if the database.json file exists. */
FS.access(Path.join(__dirname, '../database.json'), FS.F_OK, (err) => {

  /** Create the database.json file if it doesn't exist. */
  if(err) FS.closeSync(FS.openSync(Path.join(__dirname, '../database.json'), 'w'))

  /** Create the server. */
  const Server = Express()

  /** Allow CORS. */
  Server.use(Cors())

  /** Parse JSON HTTP requests. */
  Server.use(Parser.urlencoded({ extended: false }))
  Server.use(Parser.json({ limit: '5mb' }))

  /** Import API endpoints. */
  require(Path.join(__dirname, 'endpoints.js'))(Server)

  /** Listen for API requests on port 5000. */
  Server.listen(process.env.PORT || 5000)

})