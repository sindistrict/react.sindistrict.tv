/**
 * Import React.
 */

import React from 'react'



/** 
 * Import the component styles.
 */

import './forms.scss'



/**
 * @method Elements/Forms/Form
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [method] string
 * @param [action] string
 * @param [onSubmit] function
 * 
 * @return [<Form/>] Component
 */

export class Form extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}
    this.state.submitted = false

  }

  submitHandler = (e) => {

    e.preventDefault()

    let form = e.target
    let inputs = form.elements

    let data = {}

    for(let i = inputs.length - 1; i >= 0; i = i - 1) {

      if(inputs[i].name === '') continue;

      switch(inputs[i].nodeName) {

        case 'INPUT':
          switch(inputs[i].type) {
            case 'text':
            case 'hidden':
            case 'password':
            case 'email':
            case 'tel':
            case 'number':
            case 'search':
              data[inputs[i].name] = inputs[i].value
              break;
            case 'checkbox':
            case 'radio':
              data[inputs[i].name] = data[inputs[i].name] || []
              if(inputs[i].checked) {
                data[inputs[i].name].push(inputs[i].value)
              }
              break;
          }
          break;

        case 'TEXTAREA':
        case 'SELECT':
          data[inputs[i].name] = inputs[i].value
          break;

      }

    }

    this.setState({ submitted: true })
    if(this.props.onSubmit) this.props.onSubmit(e, data)

  }

  render() {

    return <form
           id={this.props.id || null}
           className={`form ${this.props.className || ''}`}
           method={this.props.method || 'POST'}
           action={this.props.action || '/'}
           onSubmit={this.submitHandler}>
           {this.props.children}
           </form>

  }

}



/**
 * @method Elements/Forms/Input
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [type] string
 * @param [value] string
 * @param [label] string
 * @param [required] boolean
 * @param [onClick] function
 * 
 * @return [<Input/>] Component
 */

export class Input extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}
    this.state.value = props.value || ''
    this.state.disabled = props.disabled || false

  }

  changeHandler = (e) => {

    this.setState({ value: e.target.value })
    if(this.props.onChange) this.props.onChange(e)

  }

  render() {

    return <fieldset className="input-wrapper">
            {this.props.label && 
            <label htmlFor={this.props.id}>{this.props.label}</label>}
            <input 
              id={this.props.id}
              className={`input ${this.props.className || ''}`}
              name={this.props.name}
              value={this.state.value}
              type={this.props.type || 'text'}
              required={this.props.required || false}
              disabled={this.state.disabled}
              onChange={this.changeHandler}/>
           </fieldset>

  }

}



/**
 * @method Elements/Forms/Textarea
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [value] string
 * @param [label] string
 * @param [required] boolean
 * @param [onClick] function
 * 
 * @return [<Textarea/>] Component
 */

export class Textarea extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}
    this.state.value = props.value || ''
    this.state.disabled = props.disabled || false

  }

  changeHandler = (e) => {

    this.setState({ value: e.target.value })
    if(this.props.onChange) this.props.onChange(e)

  }

  render() {

    return <fieldset className="textarea-wrapper">
             {this.props.label &&
             <label htmlFor={this.state.id}>{this.props.label}</label> }
             <textarea
               id={this.props.id}
               className={`textarea ${this.props.className || ''}`}
               name={this.props.name}
               value={this.state.value}
               required={this.props.required || false}
               disabled={this.state.disabled}
               onChange={this.changeHandler}/>
           </fieldset>

  }

}



/**
 * @method Elements/Forms/Select
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [value] string
 * @param [label] string
 * @param [disabled] boolean
 * @param [required] boolean
 * @param [onChange] function
 * 
 * @return [<Select/>] Component
 */

export class Select extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}
    this.state.value = props.value || ''

  }

  changeHandler = (e) => {

    this.setState({ value: e.target.value })
    if(this.props.onChange) this.props.onChange(e)

  }

  render() {

    return <fieldset className="select-wrapper">
             {this.props.label &&
             <label htmlFor={this.state.id}>{this.props.label}</label> }
             <select
               id={this.props.id}
               className={`select ${this.props.className || ''}`}
               name={this.props.name}
               value={this.state.value}
               required={this.props.required || false}
               disabled = {this.props.disabled || false}
               onChange={this.changeHandler}>
               {this.props.children}
             </select>
           </fieldset>

  }

}



/**
 * @method Elements/Forms/Button
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [value] string
 * @param [label] string
 * @param [disabled] boolean
 * @param [required] boolean
 * @param [onChange] function
 * 
 * @return [<Button/>] Component
 */

export class Button extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}

  }

  ClickHandler = (e) => {

    if(this.props.onClick) this.props.onClick(e)

  }

  render() {

    return <button
             id={this.props.id || null}
             className={`button ${this.props.className || ''}`}
             type={this.props.type || 'button'}
             disabled = {this.props.disabled || false}
             onClick={this.ClickHandler}>
             {this.props.children}
           </button>

  }

}



/**
 * @method Elements/Forms/CheckButton
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [value] string
 * @param [label] string
 * @param [disabled] boolean
 * @param [required] boolean
 * @param [onChange] function
 * 
 * @return [<Button/>] Component
 */

export class CheckButton extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}

  }

  changeHandler = (e) => {

    if(this.props.onChange) this.props.onChange(e)

  }

  render() {

    return <label
             id={this.props.id || null}
             className={`check-button ${this.props.className || ''}`}
             disabled = {this.props.disabled || false}>
             <input 
             type={this.props.type || 'checkbox'} 
             name={this.props.name} 
             value={this.props.value} 
             defaultChecked={this.props.checked || false}
             onChange={this.changeHandler}/>
             <span>{this.props.children}</span>
           </label>

  }

}



/**
 * @method Elements/Forms/Progress
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [value] string
 * @param [label] string
 * @param [disabled] boolean
 * @param [required] boolean
 * @param [onChange] function
 * 
 * @return [<Progress/>] Component
 */

export class Progress extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}

  }

  render() {

    const value = this.props.value || 0
    const max = this.props.max || 100
    const percent = (value / max * 100)

    return <div
             id={this.props.id || null}
             className={`progress ${this.props.className || ''}`}>
             <span style={{width: `${percent}%`}}></span>
           </div>

  }

}