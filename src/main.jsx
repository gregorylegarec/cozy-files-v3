import 'babel-polyfill'

import './styles/main'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, hashHistory } from 'react-router'
import cozy from 'cozy-client-js'
import { I18n } from './lib/I18n'

import filesApp from './reducers'
import AppRoute from './components/AppRoute'

cozy.init({
  cozyURL: 'http://cozy.local:8080/',
  token: 'TODO'
})

const context = window.context
const lang = document.documentElement.getAttribute('lang') || 'en'

const loggerMiddleware = createLogger()

const store = createStore(
  filesApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

document.addEventListener('DOMContentLoaded', () => {
  render((
    <I18n context={context} lang={lang}>
      <Provider store={store}>
        <Router history={hashHistory} routes={AppRoute} />
      </Provider>
    </I18n>
  ), document.querySelector('[role=application]'))
})
