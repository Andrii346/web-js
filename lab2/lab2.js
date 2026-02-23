





let car1 = new Object();
car1.color = "blue";
car1.maxSpeed = 220;
car1.driver = new Object();
car1.driver.name = "Прізвище Ім'я"; 
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;


let car2 = {
    color: "red",
    maxSpeed: 180,
    driver: {
        name: "Прізвище Ім'я", 
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2
};


car1.drive = function() {
    console.log("I am not driving at night");
};
car2.drive = function() {
    console.log("I can drive anytime");
};

console.log("--- Виклик методів drive() ---");
car1.drive();
car2.drive();


function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
    
    
    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let nightStatus = this.driver.nightDriving ? "drives at night" : "does not drive at night";
            console.log(`Driver ${this.driver.name} ${nightStatus} and has ${this.driver.experience} years of experience`);
        }
    };
}


Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};


console.log("--- Виклик методу trip() для Truck ---");
let truck1 = new Truck("white", 5000, 80, "Volvo", "FH16");
let truck2 = new Truck("black", 6000, 75, "MAN", "TGX");

truck1.AssignDriver("Петрович Петро", true, 5);  
truck2.AssignDriver("Іанович Іван", false, 10); 

truck1.trip();
truck2.trip();








class Square {
    constructor(a) {
        this.a = a;
    }
    static help() {
        console.log("Квадрат - це правильний чотирикутник, у якого всі сторони і кути рівні (по 90 градусів).");
    }
    length() {
        console.log(`Сума довжин сторін (периметр): ${4 * this.a}`);
    }
    square() {
        console.log(`Площа фігури: ${this.a * this.a}`);
    }
    info() {
        console.log(`\n--- Характеристика: Квадрат ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Кути: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}


class Rectangle extends Square {
    constructor(a, b) {
        super(a); 
        this.b = b;
    }
    static help() {
        console.log("Прямокутник - це чотирикутник, у якого всі кути прямі, а протилежні сторони рівні.");
    }
    length() {
        console.log(`Сума довжин сторін (периметр): ${2 * (this.a + this.b)}`);
    }
    square() {
        console.log(`Площа фігури: ${this.a * this.b}`);
    }
    info() {
        console.log(`\n--- Характеристика: Прямокутник ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Кути: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}



class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(); 
        this.a = a;         
        this.alpha = alpha; 
        this.beta = beta;   
    }
    
    
    get a() { return this._a; }
    set a(value) { this._a = value; }
    
    get alpha() { return this._alpha; }
    set alpha(value) { this._alpha = value; }
    
    get beta() { return this._beta; }
    set beta(value) { this._beta = value; }

    static help() {
        console.log("Ромб - це паралелограм, у якого всі сторони рівні.");
    }
    length() {
        console.log(`Сума довжин сторін (периметр): ${4 * this.a}`);
    }
    square() {
        
        let rad = this.alpha * (Math.PI / 180);
        let area = (this.a * this.a * Math.sin(rad)).toFixed(2);
        console.log(`Площа фігури: ${area}`);
    }
    info() {
        console.log(`\n--- Характеристика: Ромб ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Кути: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        this.length();
        this.square();
    }
}


class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }
    static help() {
        console.log("Паралелограм - це чотирикутник, у якого протилежні сторони попарно паралельні.");
    }
    
    square() {
        
        let rad = this.alpha * (Math.PI / 180);
        let area = (this.a * this.b * Math.sin(rad)).toFixed(2);
        console.log(`Площа фігури: ${area}`);
    }
    info() {
        console.log(`\n--- Характеристика: Паралелограм ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Кути: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        this.length();
        this.square();
    }
}


console.log("\n--- Виклик методів help() ---");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();


let mySquare = new Square(5);
let myRectangle = new Rectangle(5, 10);
let myRhombus = new Rhombus(6, 120, 60);
let myParallelogram = new Parallelogram(6, 8, 150, 30);

mySquare.info();
myRectangle.info();
myRhombus.info();
myParallelogram.info();








function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}


let triangleDefault = Triangular(); 
let triangleEquilateral = Triangular(10, 10, 10);
let triangleCustom = Triangular(6, 8, 10);

console.log("\n--- Трикутники ---");
console.log("Default:", triangleDefault);
console.log("Equilateral:", triangleEquilateral);
console.log("Custom:", triangleCustom);


function PiMultiplier(multiplier) {
    return function() {
        return Math.PI * multiplier;
    };
}


let mulBy2 = PiMultiplier(2);
let mulBy2_3 = PiMultiplier(2/3);
let divideBy2 = PiMultiplier(0.5); 

console.log("\n--- Множення PI ---");
console.log("PI * 2 =", mulBy2());
console.log("PI * (2/3) =", mulBy2_3());
console.log("PI / 2 =", divideBy2());


function Painter(color) {
    return function(obj) {
        if (obj && obj.type) {
            console.log(`Color: ${color}, Type: ${obj.type}`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}


let PaintBlue = Painter("blue");
let PaintRed = Painter("red");
let PaintYellow = Painter("yellow");


let obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
let obj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
let obj3 = { maxSpeed: 180, color: "purple", isCar: true };

console.log("\n--- Тестування Painter ---");
console.log("Object 1:");
PaintBlue(obj1); PaintRed(obj1); PaintYellow(obj1);

console.log("Object 2:");
PaintBlue(obj2); PaintRed(obj2); PaintYellow(obj2);

console.log("Object 3:");
PaintBlue(obj3); PaintRed(obj3); PaintYellow(obj3);