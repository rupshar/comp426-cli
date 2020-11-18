/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    let sum = a + b
    let final_result = a + " + " + b + " = " + sum;
    return final_result;
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    // let arr = new Array((endNumber + 1) - startNumber);
    // for(let i = 0; i < arr.length; i++) {
    //     arr[i] = i + startNumber;
    // }
    // return arr
    let arr = new Array()
    if(startNumber > endNumber) {
        return arr
    }
    let start = startNumber
    arr.push(start)
    start++
    while(start <= endNumber) {
        arr.push(start)
        start++
    }
    return arr
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    let ret_obj = {min: Math.min.apply(Math, numbers), max: Math.max.apply(Math, numbers)}
    return ret_obj
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let ret_obj = {}
    for(let i = 0; i < array.length; i++) {
        if(!(array[i] in ret_obj)) {
            ret_obj[array[i]] = 1
        }
        else {
            ret_obj[array[i]]++
        }
    }
    return ret_obj
}
