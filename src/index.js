module.exports = function solveSudoku(matrix) {

    //Бектрекинг
    function solve(grid, row, col) {          //grid везде передается по ссылке, вместо 0 заполняется число
        let cell = findUnassignedLocation(grid, row, col);  //поиск ячейки с 0
        row = cell[0];
        col = cell[1];

        // base case: if no empty cell
        if (row === -1) {              //вернулось значение по умолчанию, значит ячеек с 0 нет
            return true;               //выходим из функции
        }

        for (let num = 1; num <= 9; num++) {      //перебираем числа от 1 до 9 для подстановки в ячейку с 0

            if ( noConflicts(grid, row, col, num) ) {  //проверка нет ли числа в строке, столбце и 3х3
                grid[row][col] = num;

                if ( solve(grid, row, col) ) {     //вызываем эту функцию снова до проверки есть ли ячейки с нулями
                    return true;
                }

                // mark cell as empty (with 0)
                grid[row][col] = 0;                 //при появлении конфликта в функции noConflicts, подставленное ранее число обратно возвращаем в 0 и по циклу for пробуем подставлять следующее число
            }
        }

        // trigger back tracking
        return false;           //когда на определенной итерации заходим в тупик (ни одно число не подходит), выходим из этой итерации и возвращаемся в исходную точку на уровень рекурсии выше - пробуем в ячейке до этого подставлять другое число
    }

    function findUnassignedLocation(grid, row, col) {  //поиск одной ячейки с 0 (первой встречающейся)
        let done = false;
        let res = [-1, -1];   //присвоили по умолчанию, в случа,если не меняются значения, ячеек с 0 нет - судоку заполнено

        while (!done) {
            if (row === 9) {      //проверка до 9 строк
                done = true;
            }
            else {
                if (grid[row][col] === 0) { //если в ячейке 0, передаем значение ее стролбца и строки
                    res[0] = row;
                    res[1] = col;
                    done = true;
                }
                else {
                    if (col < 8) {      //проверка по столбцим внутри строки до 9
                        col++;
                    }
                    else {               //если 9 столбик, переходим на новую строку на 1 столбик
                        row++;
                        col = 0;
                    }
                }
            }
        }

        return res;
    }

    function noConflicts(grid, row, col, num) {     //проверка нет ли числа в строке, столбце и 3х3
        return isRowOk(grid, row, num) && isColOk(grid, col, num) && isBoxOk(grid, row, col, num);
    }

    function isRowOk(grid, row, num) {    //есть ли такое число по другим столбцам внутри данной строки?
        for (let col = 0; col < 9; col++)
            if (grid[row][col] === num)
                return false;

        return true;
    }

    function isColOk(grid, col, num) {     //есть ли такое число по другим строкам внутри данного столбца?
        for (let row = 0; row < 9; row++)
            if (grid[row][col] === num)
                return false;

        return true;
    }

    function isBoxOk(grid, row, col, num) {    //проверка есть ли число в квадрате 3х3
        row = Math.floor(row / 3) * 3;      //получаем значения row 0,3,6
        col = Math.floor(col / 3) * 3;      //получаем значения col 0,3,6

        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 3; c++)
                if (grid[row + r][col + c] === num)       // соответсвенно проверяются значения col+0,1,2 и row+0,1,2
                    return false;

        return true;
    }

    solve(matrix, 0,0 );
    return matrix;
};
