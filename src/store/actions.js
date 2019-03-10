import Web3 from 'web3'
import firebase from 'firebase'
import axios from 'axios'

const getAbiDeployedAddress = abi => {
  if (!abi) return ''
  const networks = abi.networks
  return networks[Math.max(...Object.keys(networks))].address
}

export default {
  // Connect to a known web3 provider
  // https://gist.github.com/bitpshr/076b164843f0414077164fe7fe3278d9#file-provider-enable-js
  // async connect({ commit, state, dispatch }) {
  async connect({ commit, dispatch }) {
    dispatch('initFirebase')
    let web3Provider = false
    if (process.env.RPC_PROVIDER.substring(0, 3) === 'wss') {
      web3Provider = new Web3.providers.WebsocketProvider(
        process.env.RPC_PROVIDER
      )
    } else if (process.env.RPC_PROVIDER.substring(0, 4) === 'http') {
      web3Provider = new Web3.providers.HttpProvider(process.env.RPC_PROVIDER)
    }
    // if (typeof window.web3 !== 'undefined') {
    //   web3Provider = window.web3.currentProvider
    //   try {
    //     // Not quite ready yet
    //     if (web3Provider.enable) await web3Provider.enable()
    //     // console.log('web3Provider', web3Provider)
    //     commit('SET_METAMASK', true)
    //   } catch (e) {
    //     console.log('e', e)
    //     commit('SET_METAMASK', false)
    //   }
    // } else if (!state.retried) {
    //   commit('SET_RETRY', true)
    //   setTimeout(() => {
    //     dispatch('connect')
    //   }, 1000)
    // }
    // if (state.retried && !web3Provider) {
    //   web3Provider = new Web3.providers.WebsocketProvider(
    //     process.env.RPC_PROVIDER
    //   )
    // }
    if (web3Provider) {
      window.web3 = new Web3(web3Provider)
      commit('SET_CONNECTED', true)
      dispatch('setAccountInterval')
      dispatch('mountContract')
    }
  },

  setAccountInterval({ dispatch }) {
    dispatch('checkAccount')
    setInterval(() => {
      dispatch('checkAccount')
    }, 3000)
  },

  checkAccount({ commit, state }) {
    window.web3.eth.getAccounts((error, accounts) => {
      console.log('genesis accounts:', accounts)
      console.log('USING account ' + state.account)
      console.log('Contract methods debug:', state.Contract)
      if (error) {
        console.error(error)
        console.log(commit, state)
      }
      // if (state.account !== accounts[0]) {
      //   commit('USE_ACCOUNT', accounts[0])
      // } else if (!accounts.length) {
      //   commit('USE_ACCOUNT', null)
      // }
    })
  },

  mountContract({ dispatch, commit, state }) {
    if (state.connected) {
      commit('CLEAR_CONTRACT')

      const address = getAbiDeployedAddress(state.abi)
      const contract = new window.web3.eth.Contract(state.abi.abi, address)
      commit('USE_CONTRACT', contract)
    } else {
      setTimeout(() => {
        dispatch('mountContract')
      }, 500)
    }
  },

  initFirebase({ commit }) {
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyBzhMRRg-EGNSXEr5l6CWy25NwQuE3F-D8',
      authDomain: 'ethique-7ac33.firebaseapp.com',
      databaseURL: 'https://ethique-7ac33.firebaseio.com',
      projectId: 'ethique-7ac33',
      storageBucket: 'ethique-7ac33.appspot.com',
      messagingSenderId: '333113931320'
    }
    firebase.initializeApp(config)
    var provider = new firebase.auth.TwitterAuthProvider()
    commit('SET_PROVIDER', provider)
  },
  handleLogin({ commit, dispatch, state }) {
    return new Promise(async (resolve, reject) => {
      var loginErr
      if (!state.provider) console.log('hello')
      if (!state.provider) return
      console.log(state.provider)
      var result = await firebase
        .auth()
        .signInWithPopup(state.provider)
        .catch(function(error) {
          console.log(error)
          loginErr = true
          reject(error)
          // Handle Errors here.
          // var errorCode = error.code
          // var errorMessage = error.message
          // The email of the user's account used.
          // var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential
          // ...
        })
      if (loginErr) return
      console.log(result)
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      // var token = result.credential.accessToken
      // var secret = result.credential.secret
      // The signed-in user info.
      // var user = result.user
      // ...
      commit('SET_TOKEN', {
        token: result.credential.accessToken,
        key: result.credential.secret
      })
      commit('SET_USER', { username: result.user.displayName })

      // Send to login API for contract account mgmt
      console.log(state.username)
      var params = {
        method: 'POST',
        url: `${process.env.SERVER}/login`,
        // headers: {
        //   Authorization: auth.id_token
        // }
        data: { handle: state.user.username }
      }
      var response = await new Promise(async (innerResolve, innerReject) => {
        axios(params)
          .then(response => {
            innerResolve(response)
          })
          .catch(error => {
            console.log(error)
            loginErr = true
            innerReject(error)
          })
      })
      console.log(response)
      var address = response.data
      commit('USE_ACCOUNT', address)
      console.log(state.account)
      var balance = await dispatch('getBalance')

      // Register New User
      var registeredUsers = await state.Contract.methods
        .getRegisteredUsers()
        .call({ from: state.account })
        .catch(error => {
          console.log(error)
          loginErr = true
          reject(error)
        })
      if (loginErr) return
      console.log('contract getRegisteredUsers() result: ', registeredUsers)
      for (var i = 0; i < registeredUsers.length; i++) {
        if (registeredUsers[i] === address) {
          reject('User already registered')
          alert('User already registered. Something is wrong.')
          return
        }
      }

      if (balance > 0) {
        resolve(response)
        return
      }

      var methodBuild = state.Contract.methods.registerUser(address)
      console.log(methodBuild)
      var uploadError
      var transResult = await dispatch('sendTransaction', methodBuild).catch(
        error => {
          console.log(error)
          uploadError = true
          reject(error)
        }
      )
      if (uploadError) return
      console.log(transResult)
      dispatch('getBalance')
      resolve(transResult)
    })
  }
}
