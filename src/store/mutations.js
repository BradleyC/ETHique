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
  USE_CONTRACT(state, { contract, address }) {
    state.Contract = contract.at(address)
  },
  CLEAR_CONTRACT(state) {
    state.Contract = null
  },
  USE_ABI(state, abi) {
    state.abi = abi
  }
  // SET_W3DATA(state, w3Data) {
  //   state.w3Data = w3Data
  // }
}
