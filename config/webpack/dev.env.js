var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER: '"https://od8h51vl3b.execute-api.eu-west-2.amazonaws.com/test/v1"',
  RPC_PROVIDER: '"http://104.248.242.64:8003"'
  // TWITTER: '"W3ZNv1aXsgdy3IvG4z9RWYHmg"'
})
