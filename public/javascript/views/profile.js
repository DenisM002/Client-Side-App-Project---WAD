// Functions profile page use

// Auth0 dependencies
import { auth0WebAuth, auth0Authentication } from '../auth/auth0-variables.js';
import { getAccessToken, checkSession, saveAuthResult, checkStatus, checkAuth } from '../auth/jwtAuth.js';


// Starting function
let loadProfile = async () => {
  try {

    auth0Authentication.userInfo(getAccessToken(), (err, usrInfo) => {
      if (err) {
          // handle error
          console.error('Failed to get userInfo');
          return;
      }

      // Output result to console (for testing purposes)
      console.log(usrInfo);
      let userName = usrInfo.name;
      let userEmail = usrInfo.email;
      let userNickname = usrInfo.nickname;
      let dateJoined= usrInfo.updated_at;
      // dateJoined is just the date, no timestamp
      let userJoined = dateJoined.substr(0,10);
      let userId = usrInfo.sub;
      
      // Insert into profile page
      document.getElementById('username').innerHTML = userName;
      document.getElementById('userSince').innerHTML = userJoined;
      document.getElementById('userEmail').innerHTML = userEmail;
      document.getElementById('userNickname').innerHTML = userNickname;
      document.getElementById('userId').innerHTML = userId;

     });

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
};

if (checkStatus()) {
  loadProfile();
} else { 
  location.replace("index.html")
};