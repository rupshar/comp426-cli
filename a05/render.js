/**
 * Course: COMP 426
 * Assignment: a05
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
// import {heroicData} from './data.js';

export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    let html = `<section class="section">
                    <div style="background-color: ${hero.backgroundColor}; align-content: center;" class="card">
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
                        <p style="color: ${hero.color};" id="firstSeen">First Appearance: ${hero.firstSeen}</p>
                        <p class="subtitle" id="description">${hero.description}</p>
                        <button type="button" class="button is-dark" id="edit" name="${hero.id}">Edit</button>
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
    // TODO: Copy your code from a04 to render the hero edit form
    let html = `<div id="edit-form" class="edit-form">
                    <form style="background-color: ${hero.backgroundColor};">
                        <img src=\"${hero.img}\"/>
                        <br />
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
                        <button id="cancel" value="Cancel" name="${hero.id}" class="cancel">Cancel</button>
                        <button type="submit" id="save" value="Save" onClick="submitChanges()" name="${hero.id}" class="save">Save</button>
                    </form>
                </div>`
    return html
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    // let hero = heroicData[(event.currentTarget.name) - 1]
    console.log(typeof(event.currentTarget.name))
    let hero = heroicData.find(obj => obj.id === Number(event.currentTarget.name))
    console.log(hero)
    let html = renderHeroEditForm(hero)
    let $heroClass = $(this).closest(".card");
    $heroClass.replaceWith(html)
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    let hero = heroicData.find(obj => obj.id == Number(event.currentTarget.name))
    let html = renderHeroCard(hero)
    let $heroClass = $(this).closest(".edit-form");
    $heroClass.replaceWith(html)
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    let hero = heroicData.find(obj => obj.id == Number(event.currentTarget.name))
    
    hero.name = document.getElementById("hero_name_text").value

    hero.first = document.getElementById("first_name_text").value

    hero.last = document.getElementById("last_name_text").value

    hero.subtitle = document.getElementById("subtitle_text").value

    hero.description = document.getElementById("description_text").value

    hero.firstSeen.setUTCDate(document.getElementById("date_text").value)

    let html = renderHeroCard(hero)
    let $heroClass = $(this).closest(".edit-form");
    $heroClass.replaceWith(html)
};

// function submitChanges() {
//     let hero_name = document.getElementById("hero_name")
//     hero_name.innerHTML = document.getElementById("hero_name_text").value

//     let first_name = document.getElementById("first_name")
//     first_name.innerHTML = document.getElementById("first_name_text").value

//     let last_name = document.getElementById("last_name")
//     last_name.innerHTML = document.getElementById("last_name_text").value

//     let subtitle = document.getElementById("subtitle")
//     subtitle.innerHTML = document.getElementById("subtitle_text").value

//     let description = document.getElementById("description")
//     description.innerHTML = document.getElementById("description_text").value
// }

/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    let arr = []
    for(let i = 0; i < heroes.length; i++) {
        let test = renderHeroCard(heroes[i])
        arr.push(test)
    }
    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    $('#root').append(arr)
    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $("#root").on("click", "#edit", handleEditButtonPress);
    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $("#root").on("click", "#save", handleEditFormSubmit);
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $("#root").on("click", "#cancel", handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
