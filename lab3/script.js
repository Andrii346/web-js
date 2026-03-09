(function () {
    let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

    console.log("=== ЧАСТИНА 1: Сортування за першою літерою 'J' ===");
    for (let i = 0; i < names.length; i++) {
        let firstLetter = names[i].charAt(0).toLowerCase();
        if (firstLetter === 'j') {
            byeSpeaker.speak(names[i]);
        } else {
            helloSpeaker.speak(names[i]);
        }
    }
    console.log("\n=== ЧАСТИНА 2: Сортування за сумою ASCII-кодів ===");
    console.log("Анотація: Підраховуємо суму ASCII-кодів усіх літер імені. Якщо сума > 400 — виводимо Goodbye, інакше — Hello.");

    for (let i = 0; i < names.length; i++) {
        let currentName = names[i];
        let asciiSum = 0;
        for (let j = 0; j < currentName.length; j++) {
            asciiSum += currentName.charCodeAt(j);
        }
        let nameWithSum = currentName + " (Сума: " + asciiSum + ")";
        if (asciiSum > 400) {
            byeSpeaker.speak(nameWithSum);
        } else {
            helloSpeaker.speak(nameWithSum);
        }
    }

})();