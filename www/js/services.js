angular.module('starter.services', ['firebase'])

.factory('Prizes', function($firebase, $firebaseArray) {

    var ref = new Firebase("https://surprize.firebaseio.com/prizes");
    var prizes = $firebaseArray(ref);
    var factory = {};

    factory.newDeck = function(deck,callback) {
        decks.$add({
            name: deck.name,
            cards: {}
        }).then(callback);
    };

    factory.addCards = function(ref2, newCards, callback) { //ref2 = /decks/:deckid
        var cards = $firebaseArray(ref2.child("cards"));
        angular.forEach(newCards, function(card) {
            cards.$add({
                left: card.left,
                term: card.term,
                right: card.right
            }).then(callback);
        })
    }

    factory.generateCard = function(term, sentence) {
        var i = sentence.indexOf(term)
        card = {}
        card.left = sentence.substring(0,i);
        card.term = term;
        card.right = sentence.substring(i+term.length);
        return card;
    }


    factory.getDeck = function(deckID) {
        angular.forEach(decks, function(deck) {
            if(deck.$id==deckID) {
                return deck;
            }
        });
    }

    factory.getCards = function(deckID) {
        return $firebaseArray(new Firebase("https://memoraize.firebaseio.com/decks/"+deckID+"/cards"));
    }

    factory.saveDeck = function(deck,callback) {
        decks.$save(deck).then(callback);
    }
    factory.decks = decks;
    return factory;
})
