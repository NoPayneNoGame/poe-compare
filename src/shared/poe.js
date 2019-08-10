import axios from 'axios'

const baseUrl = 'https://www.pathofexile.com'

/**
 * @param {String} accountName The user's account
 * @param {String} characterName The user's character
 */
export async function getItems (accountName, characterName) {
  // async functions always return a promise and allows you to use `await`
  if (!accountName || !characterName) {
    return {
      error: true,
      data: {
        status: 400,
        statusText: 'accountName and characterName cannot be null'
      }
    }
  }

  try {
    // await is a way of getting data from a promise easier
    // instead of `axios.get('...').then(function (response) { resolve(response.data) })`
    // we just do `response = await axios.get('...')`
    const response = await axios.get(`${baseUrl}/character-window/get-items?accountName=${accountName}&character=${characterName}`)
    return response.data
  } catch (error) {
    // error is a big http response/request object, so this breaks out the vals we need
    // The equivalent version is:
    // const status = error.response.status; const statusText = error.response.statusText; ...;
    // and this is much more consise
    const { status, statusText, data } = error.response

    // data here is similar to above, but the opposite
    // The equivalent version is:
    // data: { status: status, statusText: statusText, data: data }
    // which is redundant
    return {
      error: true,
      data: {
        status,
        statusText,
        data
      }
    }
  }
}

/**
 * @param {String} accountName The user's account
 * @param {String} characterName The user's character
 */
export async function getPassiveTree (accountName, characterName) {
  if (!accountName || !characterName) {
    return {
      error: true,
      data: {
        status: 400,
        statusText: 'accountName and characterName cannot be null'
      }
    }
  }

  return {
    error: true,
    data: {
      status: 501,
      statusText: 'getPassiveTree not implemented.'
    }
  }
}

// Export the functions in an object so you can do
// `import poe from 'poe'; poe.getItems(...);`
// You can also go `import { getItems } from 'poe'; getItems(...)`
// if you only need a few functions
export default {
  getItems,
  getPassiveTree
}
