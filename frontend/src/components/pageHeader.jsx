/** Import React. */
import React from 'react'

/** Import Axios. */
import Axios from 'axios'

export default class PageHeader extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}

  }

  componentDidMount() {

    Axios.get('/api/data/server').then(response => {

      console.log(response.data.server)

    })

  }

  render() {

    return <header id="page-header">
           
           </header>

  }

}