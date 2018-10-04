export default {
  SET_METAMASK(state, bool) {
    state.metamask = bool
  },
  SET_RETRY(state, bool) {
    state.retried = bool
  },
  SET_CONNECTED(state, bool) {
    state.connected = bool
  },
  CLEAR_ACCOUNT(state) {
    state.account = null
  },
  USE_ACCOUNT(state, account) {
    state.account = account
  },
  USE_CONTRACT(state, contract) {
    state.Contract = contract
  },
  CLEAR_CONTRACT(state) {
    state.Contract = null
  },
  USE_ABI(state, abi) {
    state.abi = abi
  }
}
