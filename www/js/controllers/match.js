'use strict';

app.controller('MatchCtrl', function(Match, Auth, uid) {

	var matc = this;
	matc.list = [];

	Match.allMatchesByUser(uid).$loaded().then(function(data) {
		for (var i = 0; i < data.length; i++) {
			var item = data[i];

			Auth.getProfile(item.$id).$loaded().then(function(profile) {
				matc.list.push(profile);
			});
		}
	});
})