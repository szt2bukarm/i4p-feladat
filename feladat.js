'use strict'

// 1. FELADAT

const alphabet = 'abcdefghijklmnopqrstuvwxyz '; 

const encrpytMessage = function(message,key) {
    let encryptedMessage = '';

    for (let i = 0; i < message.length; i++) {
        const messageIndex = alphabet.indexOf(message[i]);
        const keyIndex = alphabet.indexOf(key[i]);
        let index;
        
        if (messageIndex + keyIndex > 26) {
            index = (messageIndex + keyIndex) % 27;
            while (index > 26) {
                index = index % 27
            }
        } else {
            index = messageIndex + keyIndex
        }

        if (index == 27) index = 0
        console.log(index);
        encryptedMessage += alphabet[index];
    }

    return encryptedMessage;
}

const decrpytMessage = function(encryptedMessage,key) {
    let decrpytedMessage = "";

    for (let i = 0; i < encryptedMessage.length; i++) {
        const messageIndex = alphabet.indexOf(encryptedMessage[i]);
        const keyIndex = alphabet.indexOf(key[i]);

        let reverted;
        if (messageIndex == 0) reverted = 0;
        else reverted = messageIndex - keyIndex;
        console.log(reverted);
        decrpytedMessage += alphabet[reverted];
    }
    console.log(decrpytedMessage);
}

console.log(encrpytMessage('helloworld','abcdefgijkl'));
decrpytMessage('hfnosauzun','abcdefgijkl');
