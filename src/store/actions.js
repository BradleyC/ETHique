import Web3 from 'web3'
// import Web3Data from 'web3data-js'
// import dotenv from 'dotenv'
// dotenv.load()

const getAbiDeployedAddress = abi => {
  const networks = abi.networks
  return networks[Math.max(...Object.keys(networks))].address
}

export default {
  // Connect to either a known web3 provider, or fallback to rinkeby
  connect({ commit, state, dispatch }) {
    let web3Provider = false
    if (typeof window.web3 !== 'undefined') {
      web3Provider = window.web3.currentProvider // window.web3.givenProvider?
      commit('SET_METAMASK', true)
    } else if (!state.retried) {
      commit('SET_RETRY', true)
      setTimeout(() => {
        dispatch('connect')
      }, 1000)
    }
    if (state.retried && !web3Provider) {
      web3Provider = new Web3(
        window.web3.givenProvider || `ws://${process.env.RPC_PROVIDER}`
      )
    }
    if (web3Provider) {
      window.web3 = new Web3(web3Provider)
      commit('SET_CONNECTED', true)
      dispatch('setAccountInterval')
      dispatch('mountContract')
      dispatch('initializeWeb3Data')
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
      if (error) console.error(error)
      if (state.account !== accounts[0]) {
        commit('USE_ACCOUNT', accounts[0])
      } else if (!accounts.length) {
        commit('USE_ACCOUNT', null)
      }
    })
  },

  mountContract({ dispatch, commit, state }) {
    if (state.connected) {
      commit('CLEAR_CONTRACT')
      commit('USE_CONTRACT', {
        contract: window.web3.eth.contract(state.abi.abi),
        address: getAbiDeployedAddress(state.abi.abi)
      })
      setTimeout(() => {
        dispatch('myExample')
      }, 500)
    } else {
      setTimeout(() => {
        dispatch('mountContract')
      }, 500)
    }
  }
  // },
  //
  // initializeWeb3Data({ commit }) {
  //   commit(
  //     'SET_W3DATA',
  //     new Web3Data({
  //       apiKey: process.env.API_KEY,
  //       blockchainId: '1c9c969065fcd1cf' /* Ethereum-mainnet */
  //     })
  //   )
  // }
  //
  // getAddressInfo({ state }, addressHash) {
  //   return state.w3Data
  //     .addresses(addressHash)
  //     .info()
  //     .retrieve()
  // }
}
