function triangle(val1, type1, val2, type2) {
    const instruction = `
    *** Інструкція ***
    Використовуйте: triangle(значення1, "тип1", значення2, "тип2")
    Типи: "leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"
    Обмеження кутів: [0.1 - 89.99]
    `;

    // Функція для валідації кута
    const isValidAngle = (ang) => ang >= 0.1 && ang <= 89.99;

    // 1. Базова перевірка на числа
    if (typeof val1 !== 'number' || typeof val2 !== 'number' || val1 <= 0 || val2 <= 0) {
        console.error("Помилка! Значення мають бути додатними числами.");
        return "failed";
    }

    const toRad = (deg) => deg * (Math.PI / 180);
    const toDeg = (rad) => rad * (180 / Math.PI);

    let a, b, c, alpha, beta;

    // Розрахунки з інтегрованою перевіркою кутів
    if (type1 === "leg" && type2 === "leg") {
        a = val1; b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    } 
    else if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        let legVal = (type1 === "leg") ? val1 : val2;
        let hypVal = (type1 === "hypotenuse") ? val1 : val2;
        if (legVal >= hypVal) {
            console.error("Помилка! Катет не може бути більшим за гіпотенузу.");
            return "failed";
        }
        a = legVal; c = hypVal;
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    } 
    else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        let legVal = (type1 === "leg") ? val1 : val2;
        let angVal = (type1 === "adjacent angle") ? val1 : val2;
        if (!isValidAngle(angVal)) {
            console.error("Помилка! Кут " + angVal + " поза межами [0.1 - 89.99]");
            return "failed";
        }
        a = legVal; beta = angVal; alpha = 90 - beta;
        c = a / Math.cos(toRad(beta));
        b = Math.sqrt(c * c - a * a);
    } 
    else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        let legVal = (type1 === "leg") ? val1 : val2;
        let angVal = (type1 === "opposite angle") ? val1 : val2;
        if (!isValidAngle(angVal)) {
            console.error("Помилка! Кут " + angVal + " поза межами [0.1 - 89.99]");
            return "failed";
        }
        a = legVal; alpha = angVal; beta = 90 - alpha;
        c = a / Math.sin(toRad(alpha));
        b = Math.sqrt(c * c - a * a);
    } 
    else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        let hypVal = (type1 === "hypotenuse") ? val1 : val2;
        let angVal = (type1 === "angle") ? val1 : val2;
        if (!isValidAngle(angVal)) {
            console.error("Помилка! Кут " + angVal + " поза межами [0.1 - 89.99]");
            return "failed";
        }
        c = hypVal; alpha = angVal; beta = 90 - alpha;
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
    } 
    else {
        console.error("Помилка! Невірна пара типів.");
        return "failed";
    }

    // Остаточна перевірка отриманих кутів (про всяк випадок для катет-катет)
    if (!isValidAngle(alpha) || !isValidAngle(beta)) {
        console.error("Помилка! Розраховані кути виходять за межі допустимих.");
        return "failed";
    }

    console.log(`a = ${a.toFixed(4)}\nb = ${b.toFixed(4)}\nc = ${c.toFixed(4)}\nalpha = ${alpha.toFixed(4)}°\nbeta = ${beta.toFixed(4)}°`);
    return "success";
}

// Виведемо інструкцію відразу при завантаженні коду
console.log(`Функцію triangle завантажено. Тепер ви можете вводити команди прямо в цій консолі.
Приклад: triangle(7, "leg", 18, "hypotenuse")`);