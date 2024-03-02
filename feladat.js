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
        if (messageIndex - keyIndex < 0) reverted = messageIndex - keyIndex + 27
        else reverted = messageIndex - keyIndex;
        decrpytedMessage += alphabet[reverted];
    }
    return decrpytedMessage;
}

console.log(encrpytMessage('helloworld','abcdefgijkl'));
console.log(decrpytMessage('hfnosauzun','abcdefgijkl'));

// 2. FELADAT

let words;
const loadTxt = async function() {
    const res = await fetch("words.txt");
    const text = await res.text();
    words = text.split('\n');
}
await loadTxt()
console.log(words);