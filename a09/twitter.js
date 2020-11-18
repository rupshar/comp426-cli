const renderTwitter = function() {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    const $homePage = $('.homePage')

    let beginningHtml = renderHomePage()

    $homePage.append(beginningHtml)

    // let beginningHtml = renderHomePage()

    // $root.append(beginningHtml)

    // let tweetFeed = renderTweets()

    renderTweets();

    // const $tweetField = $('.tweets')

    // $tweetField.append(tweetFeed)

    $homePage.on('click', '.newTweet', composeTweet);
    $homePage.on('click', '.refresh', refreshTimeline);
    $homePage.on('click', '.cancel', returnToActionButton);
    $homePage.on('click', '.submit', postTweet);

};

$(function() {
    renderTwitter();
});

function composeTweet() {
    let html= `<script>
                    function checkMaxCharacters(textarea, checker, maxLength) {
                        var countfield = document.getElementById(checker);
                        if ( textarea.value.length > maxLength ) {
                            textarea.value = textarea.value.substring( 0, maxLength );
                            return false;
                        } else {
                            countfield.value = maxLength - textarea.value.length;
                        }
                    }
                </script> 

                <div class="actions">
                    <div class="editZone">
                        <input disabled maxlength="3" size="3" value="280" id="checker">
                        <textarea onkeyup="checkMaxCharacters(this, 'checker', 280)" id="newTweet" rows="8" cols="30" maxlength = "280" placeholder="Compose your tweet here"></textarea>
                    </div>
                    <br />
                    <div class="buttons">
                        <button class="cancel" type="cancel" value="Cancel">Cancel</button>
                        <button class="submit" type="save" value="Save">Submit</button>
                    </div>
               </div>`
    $('.actions').replaceWith(html)
}

function returnToActionButton() {
    let html = `<div class="actions">
                    <button class="newTweet"><i class="fa fa-twitter"></i></button>
                    <button class="refresh"><i class="fa fa-refresh"></i></button>
                </div>`
    $('.actions').replaceWith(html)
    renderTweets()
}

async function postTweet() {
    let tweet = $('#newTweet').val();

    await axios ({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        data: {
            "type": "tweet",
            "body": tweet,
        },
        withCredentials: true,
    });
    returnToActionButton();
}

async function deleteTweet(event) {
    let toBeDeleted = event.currentTarget.name;

    $(`.tweetContainer${toBeDeleted}`).remove();

    await axios({
        method: 'delete',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + toBeDeleted,
        withCredentials: true, 
    })
    //renderTweets();
}

function refreshTimeline() {
    renderTweets()
}

function editTweet(event) {
    let id = event.currentTarget.value;
    let text = event.currentTarget.getAttribute('data-text');
    let liked = event.currentTarget.getAttribute('data-liked');
    let author = event.currentTarget.getAttribute('data-author');

    let html = `<script>
                    function checkMaxCharacters(textarea, checker, maxLength) {
                        var countfield = document.getElementById(checker);
                        if ( textarea.value.length > maxLength ) {
                            textarea.value = textarea.value.substring( 0, maxLength );
                            return false;
                        } else {
                            countfield.value = maxLength - textarea.value.length;
                        }
                    }
                </script> 
                <div class = edit${id}>
                    <input disabled maxlength="3" size="3" value="280" id="checker">
                    <textarea onkeyup="checkMaxCharacters(this, 'checker', 280)" maxlength = "280" class="newTweet${id}" name = "${id}" rows="8" cols="30">${text}</textarea>
                    <button class="cancel${id}" type="cancel" data-text=${text} data-liked=${liked} data-author=${author} value="${id}">Cancel</button>
                    <button class="post${id}" type="save" value="${id}">Submit</button>
                </div>`

    $(`.buttons${id}`).replaceWith(html)
    $(`.cancel${id}`).on("click", editCancel)
    $(`.post${id}`).on("click", editPost)
}

function editCancel(event){
    renderTweets()
}

async function editPost(event) {
    let changedTweetID = event.currentTarget.value
    let newTweet = $(`.newTweet${changedTweetID}`).val();
    await axios ({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + changedTweetID,
        withCredentials: true,
        data: {
            "body": newTweet,
        },
    });
    renderTweets();
}

async function likeTweet(event) {
    let likedStatus = event.currentTarget.id;
    let toBeLiked = event.currentTarget.name;
    
    if(likedStatus == "true") {
        await axios ({
            method: 'put',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + toBeLiked + '/unlike',
            withCredentials: true,
        });
        renderTweets();
    } else if(likedStatus == "false") {
        await axios ({
            method: 'put',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + toBeLiked + '/like',
            withCredentials: true,
        });
        renderTweets();
    }

}

function retweetTweet(event) {
    let id = event.currentTarget.name;
    let author = event.currentTarget.value;
    let text = event.currentTarget.getAttribute('data-text');

    let html = `<script>
                    function checkMaxCharacters(textarea, checker, maxLength) {
                        var countfield = document.getElementById(checker);
                        if ( textarea.value.length > maxLength ) {
                            textarea.value = textarea.value.substring( 0, maxLength );
                            return false;
                        } else {
                            countfield.value = maxLength - textarea.value.length;
                        }
                    }
                </script> 
                <div class = retweet${id}>
                    <input disabled maxlength="3" size="3" value="280" id="checker">
                    <textarea class="textAreaRetweet${id}" onkeyup="checkMaxCharacters(this, 'checker', 280)" maxlength = "280" name = "${id}" rows="8" cols="30" value="${author}" placeholder="Compose your retweet here"></textarea>
                    <button class="cancelRetweet${id}" type="cancel" value="${id}">Cancel</button>
                    <button class="postRetweet${id}" name="${id}" type="save" value="${author}">Submit</button>
                </div>`

    $(`.buttons${id}`).replaceWith(html)
    $(`.cancelRetweet${id}`).off().on("click", retweetCancel)
    $(`.postRetweet${id}`).off().on("click", retweetPost)
}

function retweetCancel(event) {
    renderTweets()
}

async function retweetPost(event) {
    let id = event.currentTarget.name

    let retweet = $(`.textAreaRetweet${id}`).val()

    try {
        await axios ({
            method: 'post',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
                "type": "retweet",
                "parent": `${id}`,
                "body": `${retweet}`,
            }
        })     
        renderTweets();
    } catch(error) {
        retweetCancel();
    }

}

function replyToTweet(event) {
    let id = event.currentTarget.name;
    let author = event.currentTarget.value;
    let text = event.currentTarget.getAttribute('data-text');

    let html = `<script>
                    function checkMaxCharacters(textarea, checker, maxLength) {
                        var countfield = document.getElementById(checker);
                        if ( textarea.value.length > maxLength ) {
                            textarea.value = textarea.value.substring( 0, maxLength );
                            return false;
                        } else {
                            countfield.value = maxLength - textarea.value.length;
                        }
                    }
                </script> 
                <div class = reply${id}>
                    <input disabled maxlength="3" size="3" value="280" id="checker">
                    <textarea class="textAreaReply${id}" onkeyup="checkMaxCharacters(this, 'checker', 280)" maxlength = "280" name = "${id}" rows="8" cols="30" value="${author}" placeholder="Compose your reply here"></textarea>
                    <button class="cancelReply${id}" type="cancel" value="${id}">Cancel</button>
                    <button class="postReply${id}" type="save" name="${id}" value="${author}">Submit</button>
                </div>`

    $(`.buttons${id}`).replaceWith(html)
    $(`.cancelReply${id}`).off().on("click", replyCancel)
    $(`.postReply${id}`).off().on("click", replyPost)
}

function replyCancel(event) {
    renderTweets()
}

async function replyPost(event) {
    let id = event.currentTarget.name

    let reply = $(`.textAreaReply${id}`).val()

    try{
        await axios ({
            method: 'post',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
                "type": "reply",
                "parent": `${id}`,
                "body": `${reply}`,
            }
        }) 
        renderTweets();
    } catch {
        replyCancel();
    } 
}

function renderHomePage() {

    let html = `<div class="homePage">
                    <div class="container">
                        <h1>COMP 426: Twitter</h1>
                        <h3>Designed by Rupin Sharma</h3>
                    </div>
                    <div class="actions">
                        <button class="newTweet"><i class="fa fa-twitter"></i></button>
                        <button class="refresh"><i class="fa fa-refresh"></i></button>
                    </div>
                    <div class="tweets">
                        <h1>Your Timeline</h1>
                    </div>
                </div>`

    return html

}

export async function renderTweets() {
    const res = await axios ({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
    })
    let bodies = res.data

    const $tweetField = $('.tweets')

    let $root = $('#root')

    $tweetField.empty()

    for(let i = 0; i < 50; i++) {
        let tweet = ""
        let date = new Date(bodies[i].updatedAt);

        if(bodies[i].isMine && bodies[i].type != "retweet") {
            tweet = `<div class="tweetContainer${bodies[i]["id"]}" type="tweet">
                        <div class="authorName">
                            <h1>${bodies[i].author}</h1>
                        </div>
                        <div class="tweetBody">
                            ${bodies[i].body}
                        </div>
                        <div class="statistics">
                            <p class="likeCount">Likes: ${bodies[i].likeCount}</p>
                            <p class="retweetCount">Retweets: ${bodies[i].retweetCount}</p>
                            <p class="updatedAt">Last Updated At: ${date}</p>
                        </div>
                        <div class="buttons${bodies[i]["id"]}">
                            <button class="retweetButton${bodies[i]["id"]}" type="retweetButton" name=${bodies[i]["id"]} value=${bodies[i]["author"]} data=${bodies[i]["body"]}><i class="fa fa-retweet"></i></button>
                            <button class="editTweet${bodies[i]["id"]}" type="editButton" value = ${bodies[i]["id"]} data-author=${bodies[i]["author"]} data-liked=${bodies[i].isLiked} name="edit${bodies[i]["id"]}" data-text="${bodies[i]["body"]}"><i class="fa fa-pencil"></i></button>
                            <button class="replyButton${bodies[i]["id"]}" type="replyButton" name=${bodies[i]["id"]} value=${bodies[i]["author"]} data-text=${bodies[i]["body"]}><i class="fa fa-reply"></i></button>
                            <button class="deleteTweet${bodies[i]["id"]}" type="deleteButton" name=${bodies[i]["id"]}><i class="fa fa-trash"></i></button>    
                        </div>
                    </div>`
            $tweetField.append(tweet)
            $tweetField.one("click", `.likeButton${bodies[i]["id"]}`, likeTweet)
            $tweetField.one("click", `.retweetButton${bodies[i]["id"]}`, retweetTweet)
            $tweetField.one("click", `.replyButton${bodies[i]["id"]}`, replyToTweet)
            $(`.deleteTweet${bodies[i]["id"]}`).on("click", deleteTweet)
            $(`.editTweet${bodies[i]["id"]}`).on("click", editTweet)
        } else if(bodies[i].isMine && bodies[i].type == "retweet") {

            let parentTweet=bodies[i]["parent"]

            let retweet_text = ""

            if (parentTweet === undefined) {
                retweet_text = "Retweet was deleted"
            } else {
                let parentAuthor = parentTweet["author"]
                let parentBody = parentTweet["body"]
                retweet_text = `Retweet of ${parentAuthor}'s tweet: ${parentBody}`
            }

            tweet = `<div class="tweetContainer${bodies[i]["id"]}" type="tweet">
                        <div class="authorName">
                            <h1>${bodies[i].author}</h1>
                        </div>
                        <div class="tweetBody">
                            <p>${bodies[i].body}</p>
                        </div>
                        <div class="statistics">
                            <p class="likeCount">Likes: ${bodies[i].likeCount}</p>
                            <p class="retweetCount">Retweets: ${bodies[i].retweetCount}</p>
                            <p class="updatedAt">Last Updated At: ${date}</p>
                        </div>
                        <div class="buttons${bodies[i]["id"]}">
                            <button class="retweetButton${bodies[i]["id"]}" type="retweetButton" name=${bodies[i]["id"]} value=${bodies[i]["author"]} data=${bodies[i]["body"]}><i class="fa fa-retweet"></i></button>
                            <button class="editTweet${bodies[i]["id"]}" type="editButton" value = ${bodies[i]["id"]} data-author=${bodies[i]["author"]} data-liked=${bodies[i].isLiked} name="edit${bodies[i]["id"]}" data-text="${bodies[i]["body"]}"><i class="fa fa-pencil"></i></button>
                            <button class="replyButton${bodies[i]["id"]}" type="replyButton" name=${bodies[i]["id"]} value=${bodies[i]["author"]} data-text=${bodies[i]["body"]}><i class="fa fa-reply"></i></button>
                            <button class="deleteTweet${bodies[i]["id"]}" type="deleteButton" name=${bodies[i]["id"]}><i class="fa fa-trash"></i></button>
                        </div>
                        <div class="retweetBody">
                            <p><i class="fa fa-retweet"></i> ${retweet_text}</p>
                        </div>
                    </div>`
            $tweetField.append(tweet)
            $tweetField.one("click", `.likeButton${bodies[i]["id"]}`, likeTweet)
            $tweetField.one("click", `.retweetButton${bodies[i]["id"]}`, retweetTweet)
            $tweetField.one("click", `.replyButton${bodies[i]["id"]}`, replyToTweet)
            $(`.deleteTweet${bodies[i]["id"]}`).on("click", deleteTweet)
            $(`.editTweet${bodies[i]["id"]}`).on("click", editTweet)
        } else if(!bodies[i].isMine && bodies[i].type == "retweet") {

            let parentTweet=bodies[i]["parent"]

            let retweet_text = ""

            if (parentTweet === undefined) {
                retweet_text = "Retweet was deleted"
            } else {
                let parentAuthor = parentTweet["author"]
                let parentBody = parentTweet["body"]
                retweet_text = `Retweet of ${parentAuthor}'s tweet: ${parentBody}`
            }

            let likeStatus = bodies[i].isLiked
            let likeText = ""

            if(likeStatus) {
                likeText = `<i class="fa fa-heart"></i> You've liked this tweet.`
            } else {
                likeText = `<i class="fa fa-heart-o"></i>  You haven't liked this tweet.`
            }

            tweet = `<div class="tweetContainer${bodies[i]["id"]}" type="tweet">
                        <div class="authorName">
                            <h1>${bodies[i].author}</h1>
                        </div>
                        <div class="tweetBody">
                            ${bodies[i].body}
                        </div>
                        <div class="statistics">
                            <p class="likeCount">Likes: ${bodies[i].likeCount}</p>
                            <p class="retweetCount">Retweets: ${bodies[i].retweetCount}</p>
                            <p class="updatedAt">Last Updated At: ${date}</p>
                        </div>
                        <div class="buttons${bodies[i]["id"]}">
                            <button class="likeButton${bodies[i]["id"]}" type="likeButton" name=${bodies[i]["id"]} id=${bodies[i].isLiked}><i class="fa fa-heart"></i></button>
                            <button class="retweetButton${bodies[i]["id"]}" type="retweetButton" name=${bodies[i]["id"]} value=${bodies[i]["author"]} data=${bodies[i]["body"]}><i class="fa fa-retweet"></i></button>
                            <button class="replyButton${bodies[i]["id"]}" type="replyButton" name=${bodies[i]["id"]} value=${bodies[i]["author"]} data-text=${bodies[i]["body"]}><i class="fa fa-reply"></i></button>
                        </div>
                        <div class="retweetBody">
                            <p><i class="fa fa-retweet"></i> ${retweet_text}</p>
                            <p class="Liked">${likeText}</p>
                        </div>
                    </div>`
            $tweetField.append(tweet)
            $tweetField.one("click", `.likeButton${bodies[i]["id"]}`, likeTweet)
            $tweetField.one("click", `.retweetButton${bodies[i]["id"]}`, retweetTweet)
            $tweetField.one("click", `.replyButton${bodies[i]["id"]}`, replyToTweet)
        } else if(!bodies[i].isMine && bodies[i].type != "retweet") {

            let likeStatus = bodies[i]["isLiked"]
            let like_text = ""

            if(likeStatus) {
                like_text = `<i class="fa fa-heart"></i> You've liked this tweet.`
            } else {
                like_text = `<i class="fa fa-heart-o"></i> You haven't liked this tweet.`
            }

            tweet = `<div class="tweetContainer${bodies[i]["id"]}" type="tweet">
                        <div class="authorName">
                            <h1>${bodies[i].author}</h1>
                        </div>
                        <div class="tweetBody">
                            ${bodies[i].body}
                        </div>
                        <div class="statistics">
                            <p class="likeCount">Likes: ${bodies[i].likeCount}</p>
                            <p class="retweetCount">Retweets: ${bodies[i].retweetCount}</p>
                            <p class="updatedAt">Last Updated At: ${date}</p>
                        </div>
                        <div class="buttons${bodies[i]["id"]}">
                            <button class="likeButton${bodies[i]["id"]}" type="likeButton" name=${bodies[i]["id"]} id=${bodies[i].isLiked}><i class="fa fa-heart"></i></button>
                            <button class="retweetButton${bodies[i]["id"]}" type="retweetButton" name=${bodies[i]["id"]} value=${bodies[i]["author"]} data-text=${bodies[i]["body"]}><i class="fa fa-retweet"></i></button>
                            <button class="replyButton${bodies[i]["id"]}" type="replyButton" name=${bodies[i]["id"]} value=${bodies[i]["author"]} data-text=${bodies[i]["body"]}><i class="fa fa-reply"></i></button>
                        </div>
                        <div class="retweetBody">
                            <p class="Liked">${like_text}</p>
                        </div>
                    </div>`
            $tweetField.append(tweet)
            $tweetField.one("click", `.likeButton${bodies[i]["id"]}`, likeTweet)
            $tweetField.one("click", `.retweetButton${bodies[i]["id"]}`, retweetTweet)
            $tweetField.one("click", `.replyButton${bodies[i]["id"]}`, replyToTweet)
        }
        
    }
}



// function renderTweetsTest() {
//     let tweets= new Array()
//     let tweet = ""
//     for(let i = 0; i < 2; i++) {
//         if(i === 0) {
//             tweet = `<div class="tweetContainer">
//                         <div class="authorName">
//                             <h2>Rupin Sharma</h2>
//                         </div>
//                         <div class="tweetBody">
//                             Wow, what a great tweet
//                         </div>
//                         <div class="statistics">
//                             <p class="likeCount">Likes: 12</p>
//                             <p class="retweetCount">Retweets: 14</p>
//                             <p class="Liked">You like this tweet: false</p>
//                         </div>
//                         <div class="buttons">
//                             <button class="likeButton"><i class="fa fa-heart"></i></button>
//                             <button class="retweetButton"><i class="fa fa-retweet"></i></button>
//                             <button class="deleteTweet"><i class="fa fa-trash"></i></button>
//                             <button class="editTweet"><i class="fa fa-pencil"></i></button>
//                         </div>
//                     </div> <br />`
//         } else {
//             tweet = `<div class="tweetContainer">
//                         <div class="authorName">
//                             <h2>Rupin Sharma</h2>
//                         </div>
//                         <div class="tweetBody">
//                             Wow, what a great tweet
//                         </div>
//                         <div class="statistics">
//                             <p class="likeCount">Likes: 12</p>
//                             <p class="retweetCount">Retweets: 14</p>
//                             <p class="Liked">You like this tweet: false</p>
//                         </div>
//                         <div class="buttons">
//                             <button class="likeButton"><i class="fa fa-heart"></i></button>
//                             <button class="retweetButton"><i class="fa fa-retweet"></i></button>
//                             <button class="deleteTweet"><i class="fa fa-trash"></i></button>
//                             <button class="editTweet"><i class="fa fa-pencil"></i></button>
//                         </div>
//                     </div> <br />`
//         }
//         tweets.push(tweet)
//     }
    

//     return tweets

// }




{/* <button class="likeButton${bodies[i]["id"]}" name=${bodies[i]["id"]} id=${bodies[i].isLiked}><i class="fa fa-heart"></i></button>
                            <button class="retweetButton${bodies[i]["id"]}" name=${bodies[i]["id"]} data=${bodies[i]["body"]}><i class="fa fa-retweet"></i></button>
                             */}


                            //  <br /> <br /> <h4> Retweeted ${author}'s tweet: </h4> <p>${retweetedTweet}</p>

                            // <p class="Created">Last Edited At: ${month}/${day}/${year} ${hour}:${minute}:${seconds}</p>