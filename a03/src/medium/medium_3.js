import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    let ret_arr = new Array()
    for(let i = 0; i < car_data.length; i++) {
        if(car_data[i].horsepower >= minHorsepower && car_data[i].torque >= minTorque) {
            ret_arr.push(car_data[i])
        }
    }
    ret_arr.sort((a, b) => (a.horsepower > b.horsepower) ? -1 : 1)
    return ret_arr
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    let ret_arr = new Array()
    for(let i = 0; i < car_data.length; i++) {
        if(car_data[i].city_mpg >= minCity && car_data[i].highway_mpg >= minHighway) {
            ret_arr.push(car_data[i])
        }
    }
    ret_arr.sort((a, b) => (a.highway_mpg > b.highway_mpg) ? -1 : 1)
    return ret_arr
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    let ret_arr = new Array()
    for(let i = 0; i < car_data.length; i++) {
        if(car_data[i].id.toLowerCase().includes(searchTerm.toLowerCase())) {
            ret_arr.push(car_data[i])
        }
    }
    return ret_arr
}


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
    let ret_arr = new Array()
    for(let i = 0; i < car_data.length; i++) {
        if(years.includes(car_data[i].year)) {
            ret_arr.push(car_data[i])
        }
    }
    ret_arr.sort((a, b) => (a.year > b.year) ? -1 : 1)
    return ret_arr
}
