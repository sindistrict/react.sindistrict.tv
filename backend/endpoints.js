const Axios = require('axios')
const Path = require('path')
const XML2JS = require('xml2js')
const LowDB = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const Adapter = new FileSync(Path.join(__dirname, '../database.json'))

module.exports = (Server) => {


  
  /**
   * @method GET
   * @endpoint /api/status
   * @description Checks the installation/setup status of the server.
   */

  Server.get('/api/status', (request, result) => {

    const Database = LowDB(Adapter)
    result.json({ "installed": Database.has("server.installed").value() })

  })



  Server.get('/api/data/server', (request, result) => {

    const Database = LowDB(Adapter)
    const server = Database.get('server').value()

    result.json({server, status: 200})

  })

  Server.get('/api/data/server/:library', (request, result) => {



  })

  Server.get('/api/data/server/:library/:section', (request, result) => {



  })



  /**
   * @method GET
   * @endpoint /api/plex/servers
   * @description Fetch all servers owned by the user.
   */

  Server.get('/api/plex/servers', (request, result) => {

    if(request.header('authToken')) {

      let servers = []

      Axios.get('https://plex.tv/pms/servers', {

        headers: {'X-Plex-Token': request.header('authToken')}

      }).then(response => {

        const Parser = new XML2JS.Parser()
        Parser.parseStringPromise(response.data).then(data => {
          
          for(let [key, server] of Object.entries(data.MediaContainer.Server)) {

            servers.push(server.$)

          }

          result.json({"servers": servers, "status": 200})

        }).catch(error => result.json({"servers": false, "status": 500, error}))

      }).catch(error => result.json({"servers": false, "status": 401, error}))

    }else{

      result.json({"servers": false, "status": 401})

    }

  })



  Server.get('/api/plex/servers/:host::port/libraries', (request, result) => {

    if(request.header('authToken')) {

      if(['host', 'port'].every(param => {return param in request.params})) {

        let host = request.params.host
        let port = request.params.port

        Axios.get(`http://${host}:${port}/library/sections`, {

          headers: {'X-Plex-Token': request.header('authToken')}

        }).then(response => {

          result.json({"libraries": response.data.MediaContainer.Directory, "status": 200})

        }).catch(error => {

          result.json({"libraries": false, "status": 401, error})

        })

      }else{

        result.json({"libraries": false, "status": 501})

      }

    }else{

      result.json({"libraries": false, "status": 401})

    }

  })



  Server.get('/api/plex/servers/:host::port/libraries/:library/:section', (request, result) => {

    if(request.header('authToken')) {

      if(['host', 'port', 'library', 'section'].every(param => {return param in request.params})) {

        let host = request.params.host
        let port = request.params.port
        let library = request.params.library
        let section = request.params.section

        Axios.get(`http://${host}:${port}/library/sections/${library}/${section}`, {

          headers: {'X-Plex-Token': request.header('authToken')}

        }).then(response => {

          let directory = []
          let metadata = response.data.MediaContainer.Metadata || response.data.MediaContainer.Directory

          Object.keys(metadata).map(i => {

            metadata[i]['uuid'] = metadata[i].ratingKey || metadata[i].key

            if(section === "all") {

              if('art' in metadata[i]) {

                metadata[i].background = `http://${host}:${port}/photo/:/transcode?url=${metadata[i].art}&width=1920&height=1920&X-Plex-Token=`
  
              }
  
              if('thumb' in metadata[i]) {
  
                metadata[i].poster = `http://${host}:${port}/photo/:/transcode?url=${metadata[i].thumb}&width=480&height=480&X-Plex-Token=`
  
              }

            }else{

              if(['newest', 'unwatched', 'recentlyAdded', 'recentlyViewed', 'onDeck'].includes(section)) {

                metadata[i] = metadata[i].ratingKey || metadata[i].key

              }

            }

            directory.push(metadata[i])

          })

          result.json({"section": directory, "status": 200})

        }).catch(error => {

          result.json({"section": false, "status": 401, error})

        })

      }else{

        result.json({"section": false, "status": 501})

      }

    }else{

      result.json({"section": false, "status": 401})

    }

  })



  Server.post('/api/setup', (request, result) => {

    const Database = LowDB(Adapter)

    if(!Database.has("server.installed").value()) {

      if(['owner', 'server'].every(param => {return param in request.body})) {

        Database.set('owner', request.body.owner).write()
        Database.set('server', request.body.server).write()

        result.json({"setup": true, "status": 200})

      }else{

        result.json({"setup": false, "status": 405})

      }

    }else{

      result.json({"setup": false, "status": 405})

    }

  })



  Server.post('/api/login', (request, result) => {

    if(['login', 'password'].every(param => {return param in request.body})) {

      Axios({
        method: 'post',
        url: 'https://plex.tv/users/sign_in.json',
        data: {user: request.body},
        headers: {'X-Plex-Client-Identifier': 'sindistrict.tv'}
      }).then(response => {

        result.json({"account": response.data.user, "status": 200})

      }).catch(error => result.json({"account": false, "status": 401, error}))

    }else{

      result.json({"account": false, "status": 401})

    }

  })



  Server.post('/api/authenticate', (request, result) => {

    if(request.body.authToken) {
      
      Axios.get('https://plex.tv/users/account', {

        headers: {'X-Plex-Token': request.body.authToken}

      }).then(response => {

        const Parser = new XML2JS.Parser()
        Parser.parseStringPromise(response.data).then(data => {

          result.json({"account": data.user.$})

        }).catch(error => {

          result.json({"account": false, "status": 500, error})

        })

      }).catch(error => {

        result.json({"account": false, "status": 401, error})

      })

    }else{

      result.json({"account": false, "status": 401})

    }

  })



  Server.post('/api/plex/webhooks', (request, result) => {

    console.log(request.body)

  })



}