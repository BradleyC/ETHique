import axios from 'axios'

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
    getBalance: getBalance,
    sendTransaction: sendTransaction,
    interactTransaction: interactTransaction
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

function sendTransaction({ rootState }, transaction) {
  console.log(rootState.Contract._address)
  var params = {
    method: 'POST',
    url: `${process.env.SERVER}/transact`,
    headers: {
      Authorization: rootState.idToken
    },
    data: {
      contract: rootState.Contract._address,
      clientId: rootState.user.username,
      transaction: transaction.encodeABI()
    }
  }
  console.log(params)
  return new Promise((resolve, reject) => {
    axios(params)
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        console.log(e)
        reject(e)
      })
  })
}

async function interactTransaction({ rootState }, recipient) {
  // First retrieve recipient reference
  var params = {
    method: 'POST',
    url: `${process.env.SERVER}/login`,
    data: { handle: recipient }
  }
  var loginErr
  var response = await new Promise(async (innerResolve, innerReject) => {
    axios(params)
      .then(innerResponse => {
        innerResolve(innerResponse)
      })
      .catch(error => {
        console.log(error)
        loginErr = true
        innerReject(error)
      })
  })
  if (loginErr) return
  console.log(response)
  var address = response.data
  // Then do Contract token transfer
  console.log(address, rootState.Contract)
}
