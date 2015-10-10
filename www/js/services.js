angular.module('starter.services', ['firebase'])

.factory('Prizes', function($firebase, $firebaseArray) {

    var ref = new Firebase("https://surprize.firebaseio.com/prizes");
    var prizes = $firebaseArray(ref);
    var factory = {};

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
    var people = $firebaseArray(ref);
    var factory = {};

    factory.newPerson = function(name,username,password,callback) {
        prizes.$add({
            name: name,
            username: username,
            password: password,
        }).then(callback);
    };
    
    factory.getPerson = function(personID) {
        return people[personID];
    };
        
    return factory;
})

.factory('Events', function($firebase, $firebaseArray) {

    var ref = new Firebase("https://surprize.firebaseio.com/events");
    var events = $firebaseArray(ref);
    var factory = {};

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