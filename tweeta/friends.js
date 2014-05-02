"use strict";
var Profile = {}; //Application object
Profile.Friends = []; //array of friends
Profile.baseurl = "https://twitterprofile.firebaseio.com/";

Profile.addFriend = function(url){
    "use strict";
    var data = JSON.stringify({ friendsUrl: url });
    var method = "POST";
    var async = true;
    var sendurl = Profile.baseurl + "Profile/Friends/.json";
    Profile.MasterAJAX(sendurl, method, async, Profile.successCallback, data);
};

Profile.deleteFriend = function(key){
    "use strict";

    var data = "";
    var method = "DELETE";
    var async = true;
    var sendurl = Profile.baseurl + "Profile/Friends/" + key +".json";
    Profile.MasterAJAX(sendurl, method, async, Profile.successCallback, data);
};

Profile.updateFriend = function (url,key) {
    "use strict";

    var data = JSON.stringify({ friendsUrl: url });
    var method = "PUT";
    var async = true;
    var sendurl = Profile.baseurl + "Profile/Friends/" + key + ".json";
    Profile.MasterAJAX(sendurl, method, async, Profile.successCallback, data);
   
};

Profile.successCallback = function () {
    alert("Successfull Operation!");
};

Profile.readFriends = function (url) {
    "use strict";

    var data ="";
    var method = "GET";
    var async = false;
    url = url + "Profile/Friends/.json";
    var friends = Profile.MasterAJAX(url, method, async, Profile.readFriendsCallback, data);
    console.log("friends"+friends);
};

Profile.readFriendsCallback = function (requestResponse) {
    "use strict";

    //create an array of friends
    var data = JSON.parse(requestResponse);
    var friends = [];
    for (var k in data) {
        data[k].key = k;
        friends.push(data[k]);
    }
    
    return friends;
};

Profile.MasterAJAX = function (url, method, async, callback,data) {
    "use strict";
    var friends; //To be used during GET to return array of friends
    var request = new XMLHttpRequest();
    request.open(method, url, async);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            friends = callback(request.response);
        } else {
            alert("An Error Occurred");
        }
    };
    
    request.onerror = function () { 
        alert("Fatal Error");
    };
    request.send(data);

    return friends;
};
