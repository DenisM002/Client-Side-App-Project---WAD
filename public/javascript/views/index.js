// Functions which generate page content, event handlers, what to load etc.

// Import all exports from postData
import * as postData from '../dataAccess/postData.js';
import { Post } from '../models/post.js';

// Auth0 dependencies
import { API_ROLES } from '../auth/auth0-variables.js';
import { checkAuth } from '../auth/jwtAuth.js';

// Import dependencies required to manage user login, etc.
import { auth0WebAuth, auth0Authentication } from '../auth/auth0-variables.js';
import { getAccessToken, checkSession, saveAuthResult, checkStatus } from '../auth/jwtAuth.js';

/*
// Function to display ownerPage.html page if logged in as owner
let displayOwnerAccess = () => {

   // check user permissions
    // Does the token contain these roles?
    // const showUpdate = checkAuth(API_ROLES.UPDATE_ORDER);
    // const showDelete = checkAuth(API_ROLES.DELETE_ORDER);
    // const showAdd = checkAuth(API_ROLES.CREATE_ORDER);
    const showRead = checkAuth(API_ROLES.READ_ORDER)

    // Show button if user has permission to add products
    if (showRead) {
      document.getElementById('ownerAccessBtn').innerHTML = '<a  class="nav-link" href="ownerPage.html">Owner Access<span class="sr-only"></span></a>';
    } else {
      document.getElementById('ownerAccessBtn').style.display = 'none';
    }
}
*/

// Create post cards
// Display in web page
let displayPosts = ((posts) => {
  getUserProfile();

  let postCards;

  // Check user permission
  const showUpdate = checkAuth(API_ROLES.UPDATE_POST);
  console.log(`Admin?: ${showUpdate}`);

  // Returns true if user is logged in
  if (showUpdate){
      // Use the Array map method to iterate through the array of products (in json format)
      postCards = posts.map(postCard => {
      postCard = `<div class="card mt-3">
                    <div class="card-body">
                      <div>
                        <h4 class="mt-2 card-title"> ${postCard.post_title} </h4>
                        <h6 class="card-subtitle m-2 text-muted">By ${postCard.user_id}</h6>
                        <hr>
                          <div class="card-text mt-4"> 
                            ${postCard.post_body}
                          </div>
                          <div class="adminBtns float-right">
                            <button id="${postCard._id}" type="button" class="btn btn-success editPostBtn p-md-3 mx-2 mt-2 float-end bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#newPostFormStatic"> Edit</button>
                            <button id="${postCard._id}" type="button" class="btn btn-warning deletePostBtn p-md-3 mx-2 mt-2 float-end bi bi-trash" > Delete post</button>
                          </div>
                        </div>
                      </div>
                    </div>`;
      return postCard;

  }) } else {
    postCards = posts.map(postCard => {
      postCard = `<div class="card mt-3">
                    <div class="card-body">
                      <div>
                        <h4 class="mt-2 card-title"> ${postCard.post_title} </h4>
                        <h6 class="card-subtitle m-2 text-muted">By ${postCard.user_id}</h6>  
                        <hr>
                        <div class="card-text mt-4"> 
                            ${postCard.post_body}
                          </div>
                          <div class="adminBtns">
                          </div>
                        </div>
                      </div>
                    </div>`;
      return postCard;
    })
  };

    // Set the innerHTML of the postCards root element = rows
    // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
    document.getElementById('postCards').innerHTML = postCards.join('');

    // Add event listener to button - 'Create Post' and call functions 
    const savePostButton = document.getElementById('createPostSaveBtn');
    const cancelPostButton = document.getElementById('cancelPostBtn');
    const editPostButtons = document.getElementsByClassName('editPostBtn');
    const deletePostButtons = document.getElementsByClassName('deletePostBtn');

    const adminButton = document.getElementById('showAdminBtns')

    savePostButton.addEventListener("click", addOrUpdatePost);
    adminButton.addEventListener("click", reloadPage);

    // Show admin buttons 

    cancelPostButton.addEventListener("click", resetForm);

    // Edit Button
    for (let i = 0; i < editPostButtons.length; i++) {
      editPostButtons[i].addEventListener("click", preparePostUpdate);
      deletePostButtons[i].addEventListener("click", deletePost);
    }
  
});


let getUserProfile = async () => {
  try {

    auth0Authentication.userInfo(getAccessToken(), (err, usrInfo) => {
      if (err) {
          // handle error
          console.error('Failed to get userInfo');
          return;
      }

      // Output result to console (for testing purposes)
      
      //console.log(usrInfo);
      let userName = usrInfo.name;
      /*
      let userEmail = usrInfo.email;
      let userNickname = usrInfo.nickname;
      let dateJoined= usrInfo.updated_at;
      // dateJoined is just the date, no timestamp
      let userJoined = dateJoined.substr(0,10);
      */
      //let userName = usrInfo.sub;
      document.getElementById("user_id").value = userName;

    
      console.log(`User ID: ${userName}`);
     });

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
};


// Setup post form for Update and Add Post
function postFormSetup(title) {
  // reset the form and change the title
  document.getElementById('postForm').reset(); // <-----Post Form id!!
  document.getElementById('modalTitle').innerHTML = title;
  // form reset doesn't work for hidden inputs!!
  // do this to reset previous id if set
  document.getElementById("_id").value = 0;
  //document.getElementById("user_id").value = ;
} // End function


// Creates Post object from Modal form inputs
let getPostFormData = () => {
  return new Post(
    document.getElementById("_id").value,
    document.getElementById("post_title").value,
    document.getElementById("post_body").value,
    document.getElementById("user_id").value,
  );
};

// When a post is selected for update/ editing
// get by id and fill out the form
async function preparePostUpdate() {
  try {

    // 1. Get post by id
    const post = await postData.getPostById(this.id);

    // 2. Set form defaults
    postFormSetup(`Update Post ID: ${post._id}`);
    
    // 3. Fill out the form
    document.getElementById("_id").value = post._id;
    document.getElementById("post_title").value = post.post_title;
    document.getElementById("post_body").value = post.post_body;
    document.getElementById("user_id").value = post.user_id;
    
    
  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
} // End function

// Create PostDetails object
let addOrUpdatePost = async () => {
  document.getElementById('modalTitle').innerHTML = "New Post";

  const newPost = getPostFormData();
    // log to console
  console.log(newPost);

  postData.createOrUpdatePost(newPost);
  loadPosts()

  // End function
  console.log(newPost);
  loadPosts()
};

// Delete post by id
async function deletePost() {
  const result = await postData.deletePostById(this.id);
  if (result === true) {
      loadPosts();
  }
}

// Fix Form Title bug
async function resetForm() {
  document.getElementById('modalTitle').innerHTML = "New Post";
}

function reloadPage() {
  location.reload()
}


// STARTING FUNCTION!!!!!
// PUT ON LOAD EVENTLISTENERS HERE!!!!
// Load and display posts on home page
let loadPosts = async () => {
  try {

    const posts = await postData.getPosts();
    //pass json data for display
    displayPosts(posts);
    document.getElementById('postForm').reset(); // <-----Post Form id!!

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
};


// When this script is loaded, get things started by calling loadPosts()
loadPosts();