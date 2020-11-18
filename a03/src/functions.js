import {sumToString, getIncreasingArray, maxAndMin, countArray} from "./mild/mild_1.js";
import {identifyVariable, identifyArray, removeKey, removeKeyNonDestructive, removeKeys} from "./mild/mild_2.js";
import {getMedian, getSum, getStatistics} from "./medium/medium_1.js";
import {searchHighPower, searchMpg, searchByYear, searchName} from "./medium/medium_3.js"
import mpg_data from "./medium/data/mpg_data.js";
import {multiplyBy, tenTimesFifty, tenTimes, repeatDemo, everyEven} from "./spicy/spicy_9.js"


// sumToString(3, 4)
// getIncreasingArray(45, 35)
// maxAndMin([3,3,5,21,3215,335,-151,-45])
// countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
// console.log(identifyVariable(3))
// console.log(identifyVariable(true))
// console.log(identifyVariable('string'))
// console.log(identifyArray([3,4,'some']))

// let obj = {
//     name: 'Mr. Boss',
//     title: 'boss',
//     age: 33,
//     password: 'pass123'
// };
// // removeKey(obj, 'password');
// // obj = removeKeyNonDestructive(obj, 'password');
// obj = removeKeys(obj, ['password', 'age']);
// console.log(obj)

// let array = [3,2,5,6,2,7,4,2,7,5];
// // let array = [3, 6, 7, 9, 1, 3, 8]
// console.log(getMedian(array)); // 4.5

// console.log(getSum([1, 2, 3, 4, 5]));

// console.log(getStatistics([3,2,4,5,5,5,2,6,7]))

// console.log(searchHighPower(mpg_data, 400, 275))

// console.log(searchName(mpg_data, "honda"))

// console.log(searchByYear(mpg_data, [2010, 2011]))

// console.log(multiplyBy(2)(3))

// tenTimesFifty()

// repeatDemo()

console.log(everyEven([1, 1, 0, 1, 1], x => x === 1))
