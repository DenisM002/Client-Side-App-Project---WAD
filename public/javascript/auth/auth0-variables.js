// Declare consts for Auth0 details required in this app
// api roles
const API_ROLES = {
    
    CREATE_POST: 'create:posts',
    READ_POST: 'read:posts',
    UPDATE_POST: 'update:posts',
    DELETE_POST: 'delete:posts'
};

// The Auth0 id for this app
const AUTH0_CLIENT_ID = 'pUhe4YOAhgUCpzhDQtdY0tTeY5cZJWiJ';

// Your Auth0 domain aka account/ tenant
const AUTH0_DOMAIN = 'serverside.eu.auth0.com';

// Users of this app require access to the API, identified by...
// This value is the 'Identifier' in your API settings
const AUDIENCE = 'projectAPI.com';

// Where Auth0 should return the token to after authentication
const AUTH0_CALLBACK_URL = 'http://localhost:3000';

// Initialise Auth0 connection with parameters defined above
const auth0WebAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    responseType: 'id_token token',
    audience: AUDIENCE
});

const auth0Authentication = new auth0.Authentication(auth0WebAuth, {
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID
});

// Export consts
export {
    API_ROLES,
    auth0WebAuth,
    auth0Authentication
}