'use strict'

// 1. FELADAT

const alphabet = 'abcdefghijklmnopqrstuvwxyz '; 

const encrpytMessage = function(message,key) {
    let encryptedMessage = '';

    for (let i = 0; i < message.length; i++) {
        const messageIndex = alphabet.indexOf(message[i]);
        const keyIndex = alphabet.indexOf(key[i]);
        let index;
        messageIndex + keyIndex > 27 ? index = messageIndex + keyIndex % 27 : index = messageIndex + keyIndex
        console.log(index);
        console.log(alphabet[index]);
        encryptedMessage += alphabet[index];
    }

    return encryptedMessage;
}

console.log(encrpytMessage('helloworld','abcdefgijkl'));