angular.module('starter.services', ['firebase'])

.factory('Auth', function ($firebase, $firebaseAuth, $state, People) {
    console.log('poop');
    var ref = new Firebase("https://surprize.firebaseio.com");
    var factory = {};

    factory.auth = $firebaseAuth(ref);
    factory.login = function (service) {
        console.log('lurb meh');
        ref.authWithOAuthPopup(service, function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                People.newPerson(factory.auth.$getAuth().uid, function () {
                    $state.go('app.home');
                })
            }
        });
    }

    return factory;
})

.factory('Prizes', function ($firebase, $firebaseArray) {

    var ref = new Firebase("https://surprize.firebaseio.com/prizes");
    var factory = {};

    factory.prizes = $firebaseArray(ref);

    factory.newPrize = function (text, image, money, senderID, recipientID, callback) {
        factory.prizes.$add({
            text: text,
            image: image,
            money: money,
            senderID: senderID,
            recipientID: recipientID,
            date: date,
            read: false,
        }).then(callback);
    };

    factory.getPrize = function (prizeID) {
        return factory.prizes[prizeID];
    };

    factory.readPrize = function (prize) {
        prize.read = true;
        factory.prizes.$save(prize);

    };

    factory.getPersonPrizes = function (personID) {
        var personPrizes = [];
        angular.forEach(factory.prizes, function (prize) {
            if (event.personID == personID) {
                personPrizes.push(event);
            }
        });
        return personPrizes;
    }

    return factory;
})

.factory('Events', function ($firebase, $firebaseArray) {

    var ref = new Firebase("https://surprize.firebaseio.com/events");
    var factory = {};
    
    factory.events = $firebaseArray(ref);

    factory.newEvent = function (name, personID, callback) {
        factory.events.$add({
            name: name,
            personID: personID,
        }).then(callback);
    };

    factory.getEvent = function (eventID) {
        return factory.events[eventID];
    };

    factory.getPersonEvents = function (personID) {
        var personEvents = [];
        angular.forEach(factory.events, function (event) {
            if ((event.personID + "") == (personID + "") || event.personID == "") {
                personEvents.push(event);
            }
        });
        return personEvents;
    };

    return factory;
})

.factory('People', function ($firebase, $firebaseArray, Events) {

    var ref = new Firebase("https://surprize.firebaseio.com/people");
    var factory = {};
    factory.people = $firebaseArray(ref);

    factory.newPerson = function (name, callback) {
        factory.people.$add({
            name: name,
        }).then(callback);
    };

    factory.getPerson = function (personID) {
        return factory.people[personID];
    };

    return factory;
})
