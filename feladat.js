'use strict'

// 1. FELADAT

const alphabet = 'abcdefghijklmnopqrstuvwxyz '; 

const encryptMessage = function(message,key) {
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

const decryptMessage = function(encryptedMessage,key) {
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

console.log(encryptMessage('curiosity killed the cat','abcdefgijklmnopqrstuvwxyz'));
console.log(encryptMessage('early bird catches the worm','abcdefgijklmnopqrstuvwxyz'));
console.log(decryptMessage('cvtlsxoagjvuyzttqk yuyxq','abcdefgijklmnopqrstuvwxyz'));
console.log(decryptMessage('ebtobehq nkongrxvjsmb wtmql','abcdefgijklmnopqrstuvwxyz'));

// 2. FELADAT   

let words;
let wordsCopy;
const loadTxt = async function() {
    const res = await fetch("words.txt");
    const text = await res.text();
    words = text.split('\n');
    wordsCopy = text.split('\n');
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

// const findKey = function(encryptedMessage1, encryptedMessage2,knownWord) {
    
//     let knownLetters = knownWord.split('');
//     let msg1Letters = []
//     for (let i = 0; i < encryptedMessage1.length; i++) {
//         msg1Letters.push(encryptedMessage1[i])        
//     }
//     let msg2Letters = []
//     for (let i = 0; i < encryptedMessage2.length; i++) {
//         msg2Letters.push(encryptedMessage2[i])        
//     }

//     const maxLenght = Math.max(encryptedMessage1.length,encryptedMessage2.length);
//     let key = '';
//     let iterator = 0
//     while (key.length != maxLenght) {
//         if(iterator % 2 == 0){
//             console.log(knownLetters);
//             let partialKey = findPartialKey(knownLetters,msg1Letters)
//             let decryptedPartial2 = decryptMessage(encryptedMessage2.slice(0,knownLetters.length),partialKey)
//             let [foundWord] = wordsCopy.filter(word => word.startsWith(decryptedPartial2.trim()))
//             let partialKey2 = findPartialKey(foundWord.split(""),msg2Letters)
//             knownLetters = foundWord.split("")
//             knownLetters.push(" ")

//             key = partialKey2
//             console.log(iterator);
//         }
//         else{
//             console.log(knownLetters);
//             let partialKey = findPartialKey(knownLetters,msg2Letters)
//             console.log(partialKey);
//             let decryptedPartial1 = decryptMessage(encryptedMessage1.slice(0,knownWord.length),partialKey)
//             let [foundWord] = wordsCopy.filter(word => word.startsWith(decryptedPartial1.trim()))
//             let partialKey1 = findPartialKey(foundWord.split(""),msg1Letters)
//             knownLetters = foundWord.split("")
//             knownLetters.push(" ")
            
//             key = partialKey1
//             console.log(iterator);
            
//         }
//         wordsCopy = words
//         iterator++
//     }
// }


const findPartialKey = function(knownWord,message) {
    let partialKey = ""

    let knownLetters = knownWord.split("")
    knownLetters.push(" ")
    let msgLetters = message.split("")
    let letters = knownLetters
    letters.forEach((char,index) => {
        let pushedBy = alphabet.indexOf(msgLetters[index]) - alphabet.indexOf(char)
        pushedBy < 0 ? pushedBy = 27 - Math.abs(pushedBy) : pushedBy
        partialKey += alphabet[pushedBy]
    })

    return partialKey;
}

const message1 = "curiosity killed the cat"
const encryptedMessage1 = "ebtobehq nkongrxvjsmb wtmql";
const encryptedMessage2 = "cvtlsxoagjvuyzttqk yuyxq";
const knownWord = "early "

const checkDecrpytedWord = function(msg) {
    return words.filter(word => word === msg)
}

const kLetters = words.filter(word => word.startsWith("k"))
// console.log(kLetters);
let probableWords = []
kLetters.forEach(word => {
    const probableKey = findPartialKey(word,encryptedMessage2.slice(10,10 + word.length + 1 ))
    const decrypted = decryptMessage(encryptedMessage1.slice(10,10 + word.length),probableKey).trim()
    if (checkDecrpytedWord(decrypted).length > 0) {
        probableWords.push(decrypted)
    }
    const mostProbableWord = probableWords.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    }, '');
    console.log(mostProbableWord);
})


// const key = findKey(encryptedMessage1, encryptedMessage2,knownWord);

