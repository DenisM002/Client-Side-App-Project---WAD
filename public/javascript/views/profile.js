// Functions profile page use

// Auth0 dependencies
import { auth0WebAuth, auth0Authentication } from '../auth/auth0-variables.js';
import { getAccessToken, checkSession, saveAuthResult, checkStatus } from '../auth/jwtAuth.js';


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
      let userEmail = usrInfo.email;
      console.log(userEmail);
      let userId = usrInfo.sub;
      document.getElementById('results').innerHTML = `<pre>${JSON.stringify(usrInfo, null, 2)}</pre>`;
      document.getElementById('resultsEmail').innerHTML = `Email: ${userEmail}`;
      document.getElementById('resultsId').innerHTML = `User ID: ${userId}`;
      let userName = usrInfo.name;
      document.getElementById('resultsId').innerHTML = `Username: ${userName}`;
      


  });

  } // catch and log any errors
  catch (err) {
    console.log(err);
  }
};

loadProfile();