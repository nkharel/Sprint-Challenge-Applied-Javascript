// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

let artArray = [];
axios.get("https://lambda-times-backend.herokuapp.com/articles")
    .then(response => {
        let allTopics = response.data.articles;
        let topics = Object.values(allTopics);
        let topicNames = Object.keys(allTopics);
        topics.forEach(topic => {

            topic.forEach(article => {
                for (let i=0; i<topicNames.length; i++){
                    let currentTopic = topicNames[i]
                    if (allTopics[currentTopic].includes(article)){
                        article["data-topic"] = currentTopic;
  
                    }
                }
                let cardParent = document.querySelector(".cards-container");
                let newCard = createCard(article);
                cardParent.appendChild(newCard);
                artArray.push(newCard);
                
            })
        }
            
            
        );
    })
    .catch(err => console.log(err))


function createCard(art) {
    let card = document.createElement("div");
    card.classList.add("card");
    if (art["data-topic"] !== "node"){
        card.classList.add(art["data-topic"]);
    } else if(art["data-topic"] === "node") {
        card.classList.add("node.js");
    }
    


    let headline = document.createElement("div");
    headline.classList.add("headline");
    headline.textContent = art.headline;

    let author = document.createElement("div");
    author.classList.add("author");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    let img = document.createElement("img");
    img.src = art.authorPhoto;

    let span = document.createElement("span");
    span.textContent = "By: " + art.authorName;

    imgContainer.appendChild(img);
    author.appendChild(imgContainer);
    author.appendChild(span);
    card.appendChild(headline);
    card.appendChild(author);

    return card;
}
