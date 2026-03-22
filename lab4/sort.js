

const SortLib = {    
    handleUndefined: function(arr) {
        let cleanArr = [];
        let undefCount = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                undefCount++;
            } else {
                cleanArr.push(arr[i]);
            }
        }
        if (undefCount > 0) {
            console.log(`Знайдено та винесено в кінець ${undefCount} undefined-елементів.`);
        }
        return { cleanArr, undefCount };
    },
    restoreUndefined: function(arr, undefCount) {
        for (let i = 0; i < undefCount; i++) {
            arr.push(undefined);
        }
        return arr;
    },    
    logStats: function(name, stats, isAscending) {
        const order = isAscending ? "Зростання" : "Спадання";
        console.log(`=== ${name} (${order}) ===`);
        console.log(`Порівнянь: ${stats.comp}`);
        console.log(`Обмінів/Переміщень: ${stats.swap}`);
    },    
    bubbleSort: function(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this.handleUndefined(array);
        let n = cleanArr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                stats.comp++;
                let condition = isAscending ? cleanArr[j] > cleanArr[j + 1] : cleanArr[j] < cleanArr[j + 1];
                if (condition) {
                    let temp = cleanArr[j];
                    cleanArr[j] = cleanArr[j + 1];
                    cleanArr[j + 1] = temp;
                    stats.swap++;
                }
            }
        }
        this.logStats('Метод обміну (Bubble Sort)', stats, isAscending);
        return this.restoreUndefined(cleanArr, undefCount);
    },
    selectionSort: function(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this.handleUndefined(array);
        let n = cleanArr.length;

        for (let i = 0; i < n - 1; i++) {
            let targetIdx = i;
            for (let j = i + 1; j < n; j++) {
                stats.comp++;
                let condition = isAscending ? cleanArr[j] < cleanArr[targetIdx] : cleanArr[j] > cleanArr[targetIdx];
                if (condition) {
                    targetIdx = j;
                }
            }
            if (targetIdx !== i) {
                let temp = cleanArr[i];
                cleanArr[i] = cleanArr[targetIdx];
                cleanArr[targetIdx] = temp;
                stats.swap++;
            }
        }
        this.logStats('Метод мінімальних елементів (Selection)', stats, isAscending);
        return this.restoreUndefined(cleanArr, undefCount);
    },
    insertionSort: function(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this.handleUndefined(array);
        let n = cleanArr.length;

        for (let i = 1; i < n; i++) {
            let key = cleanArr[i];
            let j = i - 1;
            
            stats.comp++;
            while (j >= 0 && (isAscending ? cleanArr[j] > key : cleanArr[j] < key)) {
                cleanArr[j + 1] = cleanArr[j];
                stats.swap++;
                j--;
                if (j >= 0) stats.comp++;
            }
            cleanArr[j + 1] = key;
            stats.swap++;
        }
        this.logStats('Метод вставок (Insertion)', stats, isAscending);
        return this.restoreUndefined(cleanArr, undefCount);
    },    
    shellSort: function(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this.handleUndefined(array);
        let n = cleanArr.length;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = cleanArr[i];
                let j;
                
                stats.comp++;
                for (j = i; j >= gap && (isAscending ? cleanArr[j - gap] > temp : cleanArr[j - gap] < temp); j -= gap) {
                    cleanArr[j] = cleanArr[j - gap];
                    stats.swap++;
                    if (j - gap >= gap) stats.comp++;
                }
                cleanArr[j] = temp;
                stats.swap++;
            }
        }
        this.logStats('Метод Шелла (Shell Sort)', stats, isAscending);
        return this.restoreUndefined(cleanArr, undefCount);
    },
    quickSort: function(array, isAscending = true) {
        let stats = { comp: 0, swap: 0 };
        let { cleanArr, undefCount } = this.handleUndefined(array);

        function partition(arr, left, right) {
            let pivot = arr[Math.floor((left + right) / 2)];
            let i = left - 1;
            let j = right + 1;      
            while (true) {
                do {
                    i++;
                    stats.comp++;
                } while (isAscending ? arr[i] < pivot : arr[i] > pivot);
                do {
                    j--;
                    stats.comp++;
                } while (isAscending ? arr[j] > pivot : arr[j] < pivot);
                if (i >= j) return j;
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                stats.swap++;
            }
        }
        function sort(arr, left, right) {
            if (left < right) {
                let p = partition(arr, left, right);
                sort(arr, left, p);
                sort(arr, p + 1, right);
            }
        }
        if (cleanArr.length > 0) {
            sort(cleanArr, 0, cleanArr.length - 1);
        }
        this.logStats('Метод Хоара (Quick Sort)', stats, isAscending);
        return this.restoreUndefined(cleanArr, undefCount);
    }
};