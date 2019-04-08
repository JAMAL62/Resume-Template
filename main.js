
var uiConfig = {
 'signInSuccessUrl': '<url-to-redirect-to-on-success>',
 'signInOptions': [
 firebase.auth.EmailAuthProvider.PROVIDER_ID
 ],
 'tosUrl': '< Terms of service url>',
 };
 
 var auth = app.auth();
 var ui = new firebaseui.auth.AuthUI(auth);

 ui.start('#firebaseui-auth-container', uiConfig);
 