angular.module('starter.services', ['firebase'])

.factory('Auth', function($firebaseAuth, People){
    var ref = new Firebase("https://surprize.firebaseio.com/people");
    var factory = {};
    
    factory.auth = $firebaseAuth(ref);
    factory.login = function(service) {
        ref.authWithOAuthPopup(service, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                authCtrl.error=error;
            } else {
                People.newPerson(auth.$getAuth().uid, function() {
                    $state.go('app.home');
                })
            }
        });
    }
    
    return factory;
})

.factory('Prizes', function($firebase, $firebaseArray) {

    var ref = new Firebase("https://surprize.firebaseio.com/prizes");
    var factory = {};
    
    factory.prizes = $firebaseArray(ref);

    factory.newPrize = function(text,image,money,senderID,recipientID,callback) {
        prizes.$add({
            text: text,
            image: image,
            money: money,
            senderID: senderID,
            recipientID: ecipientID,
            date: date,
            read: false,
        }).then(callback);
    };

    factory.getPrize = function(prizeID) {
        return prizes[prizeID];
    };
    
    factory.readPrize(prize) {
        prize.read = true;
        prizes.$save(prize);
        
    };
    
    factory.getPersonPrizes = function(personID) {
        var personPrizes = [];
        angular.forEach(prizes, function(prize) {
            if(event.personID==personID) {
                personPrizes.push(event);
            }
        });
        return personPrizes;
    }
    
    return factory;
})

.factory('People', function($firebase, $firebaseArray, Events) {

    var ref = new Firebase("https://surprize.firebaseio.com/people");
    var factory = {};
    factory.people = $firebaseArray(ref);

    factory.newPerson = function(name,callback) {
        people.$add({
            name: name,
        }).then(function);
    };
    
    factory.getPerson = function(personID) {
        return people[personID];
    };
        
    return factory;
})

.factory('Events', function($firebase, $firebaseArray) {

    var ref = new Firebase("https://surprize.firebaseio.com/events");
    var factory = {};
    factory.events = $firebaseArray(ref);

    factory.newEvent = function(name,personID,callback) {
        events.$add({
            name: name,
            personID: personID,
        }).then(callback);
    };
    
    factory.getEvent = function(eventID) {
        return events[eventID];
    };
    
    factory.getPersonEvents = function(personID) {
        var personEvents = [];
        angular.forEach(events, function(event) {
            if((event.personID+"")==(personID+"") || event.personID=="") {
                personEvents.push(event);
            }
        });
        return personEvents;
    };
    
    return factory;
})