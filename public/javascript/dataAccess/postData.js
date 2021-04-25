// Contains functions for Post data

// Imports all exports from fetchAPI
// Allows usage of GET_INIT, getDataAsync, etc
import * as api from './fetchAPI.js';



// Gets post data and returns to index.js
let getPosts = async () => {
    try {
  
      // get products data - note only one parameter in function call
      const posts = await api.getDataAsync(`${api.BASE_URL}/posts`);
      return posts;
      
   } // catch and log any errors
   catch (err) {
     console.log(err);
   }
};


// Get an post by it's id
let getPostById = async (id) => {
  try {
    // get products data - note only one parameter in function call
    return await api.getDataAsync(`${api.BASE_URL}/posts/${id}`);
  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
} // End Functions


let createOrUpdatePost = async (formPost) => {
  // url for api call
  const url = `${api.BASE_URL}/posts`
  // New product = POST, Update = PUT or PATCH
  let httpMethod = 'POST';
  // log to console
  console.log('Create post:', formPost);

  // Check if new or update
  // Only existing products have formPost._id > 0
  if (formPost._id > 0) {
      httpMethod = 'PUT';
  }
  // build the request object - note: POST
  // reqBodyJson added to the req body
  const request = api.fetchInit(httpMethod, JSON.stringify(formPost));

try {
  // Call fetch and await the respose
  // fetch url using request object
  const response = await api.getDataAsync(url, request);
  const json = await response.data;
  // Output result to console (for testing purposes)
  console.log(json);

    // catch and log any errors
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Delete post by id using an HTTP DELETE request
let deletePostById = async (id) => {
  // url for delete post endpoint
  const url = `${api.BASE_URL}/posts/${id}`;
  // Build the request object
  const request = api.fetchInit('DELETE');

  // Confirm delete
  if (confirm("Are you sure?")) {
    try {
      // call the api and get a result
      return await api.getDataAsync(url, request);
      // catch and log any errors
    } catch (err) {
      console.log(err);
      return err;
    }
  }
} // End Function


  

export {
    getPosts,
    createOrUpdatePost,
    getPostById,
    deletePostById
};