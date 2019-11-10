/** Import React. */
import React from 'react'

/** Import Axios. */
import Axios from 'axios'

export default class SetupForm extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}

  }

  render() {

    return <form>
             <input required type="text"/>
             <input required type="password"/>
             <button type="submit">Login</button>
           </form>

  }

}