

console.log("=== ПОЧАТОК ТЕСТУВАННЯ ===", "font-size: 16px; color: green;");
function cloneArray(arr) {
    return Array.from(arr); 
}
console.log("\n*** 1.2.3 НЕРОЗРІДЖЕНИЙ МАСИВ (100 елементів) ***", "font-size: 14px; background: #eee;");
const denseArray = Array.from({length: 100}, () => Math.floor(Math.random() * 1000));
console.log("Оригінал (перші 10):", cloneArray(denseArray).slice(0, 10).join(', ') + '...');
let resBubble = SortLib.bubbleSort(cloneArray(denseArray), true);
let resSelection = SortLib.selectionSort(cloneArray(denseArray), true);
let resInsertion = SortLib.insertionSort(cloneArray(denseArray), true);
let resShell = SortLib.shellSort(cloneArray(denseArray), true);
let resQuick = SortLib.quickSort(cloneArray(denseArray), true);
let resQuickDesc = SortLib.quickSort(cloneArray(denseArray), false);
console.log("\n*** 1.2.4 РОЗРІДЖЕНИЙ МАСИВ (100 елементів) ***", "font-size: 14px; background: #eee;");
const sparseArray = new Array(100);
for(let i = 0; i < 100; i++) {
    if(Math.random() > 0.2) { 
        sparseArray[i] = Math.floor(Math.random() * 1000);
    }
}
SortLib.bubbleSort(cloneArray(sparseArray), true);
SortLib.selectionSort(cloneArray(sparseArray), true);
SortLib.insertionSort(cloneArray(sparseArray), true);
SortLib.shellSort(cloneArray(sparseArray), true);
let resQuickSparse = SortLib.quickSort(cloneArray(sparseArray), true);
console.log("\nРезультат Хоара для розрідженого масиву (останні 25 елементів, щоб побачити undefined):");
console.log(resQuickSparse.slice(-25));