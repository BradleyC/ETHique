export default {
  getters: {
    balance: state => state.balance
  },
  mutations: {
    UPDATE_BALANCE: setBalance
  },
  state: {
    balance: 0
  },
  actions: {
    getBalance: getBalance
  }
}

function getBalance({ commit, rootState }) {
  return new Promise(async (resolve, reject) => {
    var balanceError
    var balance = await rootState.Contract.methods
      .balanceOf(rootState.account)
      .call({ from: rootState.account })
      .catch(error => {
        console.log(error)
        balanceError = true
        reject(error)
      })
    if (balanceError) return
    console.log(balance)
    commit('UPDATE_BALANCE', balance)
    resolve(balance)
  })
}

function setBalance(state, newBalance) {
  state.balance = Number(newBalance)
}
