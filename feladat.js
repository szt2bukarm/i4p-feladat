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

// console.log(encrpytMessage('curiosity killed the cat','abcdefgijklmnopqrstuvwxyz'));
// console.log(encrpytMessage('early bird catches the worm','abcdefgijklmnopqrstuvwxyz'));
// console.log(decrpytMessage('cvtlsxoagjvuyzttqk yuyxq','abcdefgijklmnopqrstuvwxyz'));
console.log(decrpytMessage('ebtob ','abcdef'));

// 2. FELADAT   

let words;
const loadTxt = async function() {
    const res = await fetch("words.txt");
    const text = await res.text();
    words = text.split('\n');
}
await loadTxt()
console.log(words);
    // early
    // ebtob
    // cvtls
// const findKey = function(msg1,msg2,words,knownWord) {
//     let key = "";
//     let knownLetters = knownWord.split('');


//     console.log(knownLetters);
//     let 
//     for (let i = 0; i < knownWord.length; i++) {
//         // check msg1
//         let pushBy;

//     }

//     // console.log(pushByIndex);
// }

function findKey(encryptedMessage1, encryptedMessage2,words,knownWord) {
    let key = '';
    let knownLetters = knownWord.split('');
    let msg1Letters = []
    console.log(knownLetters);
    for (let i = 0; i < knownWord.length; i++) {
        msg1Letters.push(encryptedMessage1[i])        
    }
    console.log(msg1Letters);
    
    let partialKey = ""
    knownLetters.forEach((char,index) => {
        let pushedBy = alphabet.indexOf(msg1Letters[index]) - alphabet.indexOf(char)
        pushedBy < 0 ? pushedBy = 27 - Math.abs(pushedBy) : pushedBy
        partialKey += alphabet[pushedBy]

    })
    
    console.log(decrpytMessage(encryptedMessage1.slice(0,knownWord.length),partialKey));
    console.log(decrpytMessage(encryptedMessage2.slice(0,knownWord.length),partialKey));
}

const encryptedMessage1 = "ebtobehq nkongrxvjsmb wtmql";
const encryptedMessage2 = "cvtlsxoagjvuyzttqk yuyxq";
const knownWord = "early "

const key = findKey(encryptedMessage1, encryptedMessage2,words,knownWord);

