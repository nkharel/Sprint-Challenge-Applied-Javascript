// Step 2: Create Tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-backend.herokuapp.com/topics
// Once the data is returned console.log it and review the structure.
// Iterate over the topics creating a new Tab component and add it to the DOM
// under the .topics element.
//
//  The tab component should look like this:
//    <div class="tab">topic here</div>

function createTab(topic){
    let tab = document.createElement("div");
    tab.classList.add("tab");
    tab.textContent = topic;
    return tab;
}

axios.get("https://lambda-times-backend.herokuapp.com/topics")
    .then(response => {
        response.data.topics.push("All");
        response.data.topics.map(topic => {
            let newTab = createTab(topic);
            document.querySelector(".topics").appendChild(newTab);
            newTab.addEventListener("click", e =>{
                if (topic !== "All"){
                    for (let i=0; i<artArray.length; i++){
                        // console.log(topic);
                        if (artArray[i].classList.contains(topic)){
                            artArray[i].style.display = "flex";
                        } else{
                            artArray[i].style.display = "none";
                        }
                    }
                } else {
                    for (let i=0; i<artArray.length; i++){
                        artArray[i].style.display = "flex";
                        
                    }
                }
                
            })
            
        })
    })
    .catch(err => {console.log(err)})