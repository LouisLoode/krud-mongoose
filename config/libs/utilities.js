'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../env/'+env+'.js');

exports.randomString = function(size) {
    var liste = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
    var result = '';
    for (var i = 0; i < size; i++) {
        result += liste[Math.floor(Math.random() * liste.length)];
    }
    return result;
};
