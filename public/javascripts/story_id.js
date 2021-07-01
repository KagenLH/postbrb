
const fetchComments = async () => {
    const idForStory = document.querySelector('.story__title');
    const id = idForStory.id
    const res = await fetch(`http://localhost:8085/api/stories/${id}/comments`); //TODO: FIX URL
    const {comments, user_id} = await res.json();

    console.log(comments)

    // find a way to use user_id to show or not the buttons

    const commentContainer = document.querySelector('.comment__section') //TODO, add class
    const commentDivs = comments.map(( comment ) =>   // User or user?? or plural?
        `<div class="comment">
            <div class="comment-usernamer">
                <h4>${comment.User.username}</h4>
            </div>
            <div class="comment-content">
                <p>${comment.content}</p>
            </div>
            <button class='comment-edit' id='${comment.id}' type='button'> edit </button>
            <button class='comment-delete id='${comment.id}' type='button'> delete </button>
        </div>`
    );

    commentContainer.innerHTML = commentDivs.join('');
}

const makeComment = async () => {
    const res = await fetch(``);
    const {comment} = await res.json();

}


const editComment = async () => {

    const res = await fetch(`http://localhost:8085/api/stories/id/comments/edit`, {
        method: "put",  //all caps??
    });

    const {comment} = await res.json();
}


document.addEventListener("DOMContentLoaded", async () => {
    try{
        await fetchComments();
    } catch (err){
        //how to handle error?
    }
})

const editButton = document.querySelectorAll('.comment-edit');
editButton.forEach(button => {
    button.addEventListener('click', async (e) => {
        try{
            await editComment();
        } catch(err) {
            //how to handle error?
        }

    })
})

