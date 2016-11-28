'use strict';

app.controller('HomeCtrl', function(Auth, $scope, Like, uid) {

	var home = this;
	home.currentIndex = null;

	var maxAge = null;
	var men = null; 
	var women = null;
	var currentUid = uid; 

	function init() {
		home.profiles = [];

		maxAge = JSON.parse(window.localStorage.getItem('maxAge')) || 25;

		men = JSON.parse(window.localStorage.getItem('men'));
		men = men === null? true : men; 

		women = JSON.parse(window.localStorage.getItem('women'));
		women = women === null? true : women; 

		Auth.getProfilesByAge(maxAge).$loaded().then(function(data) {
			for(var i = 0; i < data.length; i++) {
				var item = data[i];

				if((item.gender == 'male' && men) || (item.gender == 'female' && women)) {
					home.profiles.push(item);
				}

			}

			if (home.profiles.length > 0) {
				home.currentIndex = home.profiles.length - 1; 

			}

		}); 
	}


	$scope.$on('$ionicView.enter', function(e) {
		init();
	});

	home.nope = function(index) {
		home.cardRemoved(index);
		console.log('Nope');
	};

	home.like = function(index, like_uid) {
		Like.addLike(currentUid, like_uid);
		home.cardRemoved(index);
		console.log('Like');
	};

	home.cardRemoved = function(index) {
		home.profiles.splice(index, 1);

		if (home.profiles.length > 0) {
				home.currentIndex = home.profiles.length - 1; 

			}
	}



});