function triangle(val1, type1, val2, type2) {
    console.log(`
    *** Інструкція з використання функції triangle ***
    Функція приймає 4 аргументи: значення1, тип1, значення2, тип2.
    Доступні типи аргументів:
    - "leg": катет
    - "hypotenuse": гіпотенуза
    - "adjacent angle": прилеглий до катета кут
    - "opposite angle": протилежний до катета кут
    - "angle": гострий кут (використовується тільки у парі з гіпотенузою)
    
    Всі кути вказуються у градусах.
    `);

    const allowedTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    if (!allowedTypes.includes(type1) || !allowedTypes.includes(type2)) {
        console.log("Помилка! Невірний тип аргументу. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    if (typeof val1 !== 'number' || typeof val2 !== 'number' || val1 <= 0 || val2 <= 0) {
        return "Помилка! Значення аргументів мають бути додатними числами.";
    }

    const toRad = (deg) => deg * (Math.PI / 180);
    const toDeg = (rad) => rad * (180 / Math.PI);

    let a, b, c, alpha, beta;


    if (type1 === "leg" && type2 === "leg") {
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = toDeg(Math.atan(b / a));
    }

    else if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {

        let legVal = (type1 === "leg") ? val1 : val2;
        let hypVal = (type1 === "hypotenuse") ? val1 : val2;

        if (legVal >= hypVal) return "Помилка! Катет не може бути більшим або рівним гіпотенузі.";

        a = legVal;
        c = hypVal;
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c))
        beta = toDeg(Math.acos(a / c));
    }

    else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        let legVal = (type1 === "leg") ? val1 : val2;
        let angVal = (type1 === "adjacent angle") ? val1 : val2;

        if (angVal >= 90) return "Помилка! Гострий кут має бути меншим за 90 градусів.";


        a = legVal;
        beta = angVal;
        alpha = 90 - beta;
        
        c = a / Math.cos(toRad(beta));
        b = c * Math.sin(toRad(beta))
    }

    else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        let legVal = (type1 === "leg") ? val1 : val2;
        let angVal = (type1 === "opposite angle") ? val1 : val2;

        if (angVal >= 90) return "Помилка! Гострий кут має бути меншим за 90 градусів.";
        
        a = legVal;
        alpha = angVal;
        beta = 90 - alpha;

        c = a / Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha))
    }

    else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        let hypVal = (type1 === "hypotenuse") ? val1 : val2;
        let angVal = (type1 === "angle") ? val1 : val2;

        if (angVal >= 90) return "Помилка! Гострий кут має бути меншим за 90 градусів.";

        c = hypVal;
        alpha = angVal;
        beta = 90 - alpha;

        a = c * Math.sin(toRad(alpha))
        b = c * Math.cos(toRad(alpha))
    } 
    
    else {
        console.log("Помилка! Несумісна пара типів аргументів. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    console.log("Результати розрахунку:");
    console.log(`a (катет) = ${a.toFixed(4)}`);
    console.log(`b (катет) = ${b.toFixed(4)}`);
    console.log(`c (гіпотенуза) = ${c.toFixed(4)}`);
    console.log(`alpha (кут навпроти a) = ${alpha.toFixed(4)}°`);
    console.log(`beta (кут навпроти b) = ${beta.toFixed(4)}°`);

    return "success";
}
triangle(3, "leg", 4, "leg");