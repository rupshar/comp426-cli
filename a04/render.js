/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    let html = `<section class="section">
                    <div style="background-color: ${hero.backgroundColor};">
                        <img src=\"${hero.img}\"/>
                        <h1 style="color: ${hero.color};" id="hero_name">
                            ${hero.name}
                        </h1>
                        <p class="subtitle has-text-gray is-italic" id="subtitle">\"${hero.subtitle}\"</p>
                        <span>
                            <p class="subtitle has-text-weight-bold" style="display: inline-block;">Alter Ego:</p>
                            <p id="first_name" style="display: inline-block;">${hero.first}</p>
                            <p id="last_name" style="display: inline-block;">${hero.last}</p>
                        </span>
                        <p style="color: ${hero.color};">First Appearance: ${hero.firstSeen}</p>
                        <p class="subtitle" id="description">${hero.description}</p>
                        <button class="button is-dark">Edit</button>
                    </div>
                </section>`
    return html
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    let html = `<section class = "section">
                    <form style="background-color: ${hero.backgroundColor};">
                        <strong>Hero Name</strong>
                        <input type="text" id="hero_name_text" value=\"${hero.name}\" />
                        <br />
                        <strong>First Name</strong>
                        <input type="text" id="first_name_text" value=\"${hero.first}\" />
                        <br />
                        <strong>Last Name</strong>
                        <input type="text" id="last_name_text" value=\"${hero.last}\" />
                        <br />
                        <strong>Subtitle</strong>
                        <input type="text" id="subtitle_text" value=\"${hero.subtitle}\" />
                        <br />
                        <strong>Description</strong>
                        <textarea id="description_text" rows="8" cols="30">${hero.description}</textarea>
                        <br />
                        <strong>Date</strong>
                        <input type="text" id="date_text" value=\"${hero.firstSeen}\" style="width: 365px;"/>
                        <br />
                        <button class="button is-dark" type="submit" value="Cancel">Cancel</button>
                        <button class="button is-dark" type="submit" value="Save" onClick="submitChanges()">Save</button>
                    </form>
                </section>`
    return html
};

function submitChanges() {
    let hero_name = document.getElementById("hero_name")
    hero_name.innerHTML = document.getElementById("hero_name_text").value

    let first_name = document.getElementById("first_name")
    first_name.innerHTML = document.getElementById("first_name_text").value

    let last_name = document.getElementById("last_name")
    last_name.innerHTML = document.getElementById("last_name_text").value

    let subtitle = document.getElementById("subtitle")
    subtitle.innerHTML = document.getElementById("subtitle_text").value

    let description = document.getElementById("description")
    description.innerHTML = document.getElementById("description_text").value
}

/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    let arr = []
    for(let i = 0; i < heroes.length; i++) {
        let test = renderHeroCard(heroes[i])
        arr.push(test)
    }
    // TODO: Append the hero cards to the $root element
    $('#root').append(arr)
    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()
    let edit_form = renderHeroEditForm(randomHero)
    $('#root').append(edit_form)
    // TODO: Append the hero edit form to the $root element
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
