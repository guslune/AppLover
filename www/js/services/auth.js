'use strict';

app.factory('Auth', function($firebaseAuth, $firebaseObject, $state) {
    var auth = $firebaseAuth();

    var Auth = {
        login: function() {
            return auth.$signInWithPopup('facebook');
        },

        logout: function() {
            return auth.$signOut();
        }       

    };

    auth.$onAuthStateChanged(function(authData) {
        if(authData) {
            console.log('Logged in!');
        } else {
            $state.go('login');
            console.log('You need to login.');
        }
    });

    return Auth;

});