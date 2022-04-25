/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
require('dotenv').config()

module.exports = (on, config) => {

  config.defaultCommandTimeout = 10000
  // copy any needed variables from process.env to config.env
  config.env.react_app_server_url = 'https://sukellusilmo-back-test.herokuapp.com'
  config.env.adminusername = 'admintest'
  config.env.adminpassword = 'adminpassword'
  // config.env.adminusername = process.env.ADMIN_USERNAME
  // config.env.adminpassword = process.env.ADMIN_PASSWORD

  // do not forget to return the changed config object!
  return config
}