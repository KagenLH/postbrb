window.addEventListener("load", (event)=>{
    
})

document.addEventListener("DOMContentLoaded", async () => {

    const cards = document.querySelectorAll(".overall-box");
    cards.forEach(card=>{
        card.addEventListener("click", e=>{
            // console.log(e.target.id.split("-")[2]);
            window.location.href = `/stories/${card.id.split("-")[2]}`;
        })
    })
})
