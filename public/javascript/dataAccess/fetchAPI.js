// Functions used to get data from API

// API Base URL - the server address
const BASE_URL = 'http://localhost:8080';

// Get HTTP headers for requests to the api
let getHeaders = () => {
    // Return headers
    // Note that the access token is set in the Authorization: Bearer
    return new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
    });
} // end function


// Used to Initialise  requests and permit cross origin requests
// parameters: http method and body content note default values)
let fetchInit = (httpMethod = 'GET', bodyContent = '') => {
  let init = {
    method: httpMethod,
    credentials: 'include',
    headers: getHeaders(),
    mode: 'cors',
    cache: 'default',
  };

  if (bodyContent != '') {
    init.body = bodyContent
  }

  return init;
};


// Asynchronous Function getDataAsync from a url and return
// The init paramter defaults to GET_INIT
let getDataAsync = async (url, init = fetchInit()) => {
  // Try catch 
  try {
    // Call fetch and await the respose
    // Initally returns a promise
    const response = await fetch(url, init);
    // As Response is dependant on the fetch call, await must also be used here
    const json = await response.json();

    // Output result to console (for testing purposes) 
    console.log(json);

    // Call function( passing the json result) to display data in HTML page
    //displayData(json);
    return json;

    // catch and log any errors
  } catch (err) {
    console.log(err);
    return err;
  }
} // End function

export {
    getDataAsync,
    BASE_URL,
    fetchInit
};