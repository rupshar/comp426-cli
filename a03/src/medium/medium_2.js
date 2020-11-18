import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: avg_mpg(mpg_data),
    allYearStats: all_year_stats(mpg_data),
    ratioHybrids: ratio_hybrids(mpg_data),
};

function avg_mpg(array) {
    let sum_city = 0
    let sum_highway = 0
    for(let i = 0; i < array.length; i++) {
        sum_city += array[i].city_mpg
        sum_highway += array[i].highway_mpg
    }
    let avg_city = sum_city * 1.0 / array.length
    let avg_highway = sum_highway * 1.0 / array.length
    let ret_obj = {city: avg_city, highway: avg_highway}
    return ret_obj
}

function all_year_stats(array) {
    let years = new Array()
    for(let i = 0; i < array.length; i++) {
        years.push(array[i].year)
    }
    let ret_obj = getStatistics(years)
    return ret_obj
}

function ratio_hybrids(array) {
    let hybrids = 0
    let is_hybrid = new Array()
    for(let i = 0; i < array.length; i++) {
        is_hybrid.push(array[i].hybrid)
    }
    for(let i = 0; i < is_hybrid.length; i++) {
        if(is_hybrid[i]) {
            hybrids++
        }
    }
    let ratio = (hybrids * 1.0) / array.length
    return ratio
}


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: maker_hybrids(mpg_data),
    avgMpgByYearAndHybrid: avg_mpg_by_year_and_hybrid(mpg_data)
};

function maker_hybrids(array) {
    let hybrids = array.filter((vehicle) => { return vehicle.hybrid })
    let makes = new Array()
    let arr = new Array()
    for(let i = 0; i < hybrids.length; i++) {
        if(!(arr.includes(hybrids[i].make))) {
            arr.push(hybrids[i].make)
        }
    }
    for(let i = 0; i < arr.length; i++) {
        makes.push({make: arr[i], hybrids: new Array()})
    }
    for(let i = 0; i < hybrids.length; i++) {
        for(let j = 0; j < makes.length; j++) {
            if(hybrids[i].make == makes[j].make) {
                makes[j].hybrids.push(hybrids[i].id)
            }
        }
    }
    makes.sort((a, b) => (b.hybrids.length > a.hybrids.length) ? 1 : -1)
    return makes
}

function avg_mpg_by_year_and_hybrid(array) {
    let ret_obj = new Object()
    let years = new Array()
    let used_years = new Array()
    for(let i = 0; i < array.length; i++) {
        if(!(years.includes(array[i].year))) {
            years.push(array[i].year)
        }
    }
    for(let i = 0; i < years.length; i++) {
        ret_obj[years[i]] = {hybrid: undefined, notHybrid: undefined}
    }

    for(let i = 0; i < array.length; i++) {
        let current_year = 0
        if(!(used_years.includes(array[i].year))) {
            used_years.push(array[i].year)
            current_year = array[i].year
            let mpg_cars = array.filter((car) => car.year == current_year)
            let mpg_cars_hyb = mpg_cars.filter((vehicle) => { return vehicle.hybrid })
            let mpg_cars_not_hyb = mpg_cars.filter((vehicle) => { return !vehicle.hybrid})
            ret_obj[current_year].hybrid = avg_mpg(mpg_cars_hyb)
            ret_obj[current_year].notHybrid = avg_mpg(mpg_cars_not_hyb)
        }
    }
    return ret_obj
}
