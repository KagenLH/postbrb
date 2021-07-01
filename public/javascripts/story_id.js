
const fetchComments = async () => {
    const id = document.querySelector('.story__title').id;  //this is the story_id
    const res = await fetch(`http://localhost:8085/api/stories/${id}/comments`);
    const {comments, user_id} = await res.json();

    //console.log(comments)

    // TODO: find a way to use user_id to show or not the buttons
    const commentContainer = document.querySelector('.comment__section') //TODO, add class
    const commentDivs = comments.map(( comment ) =>
        `<div class="comment">
            <div class="comment-usernamer">
                <h4>${comment.User.username}</h4>
            </div>
            <div class="comment-content">
                <p>${comment.content}</p>
            </div>
            <button class='comment-edit' id='${comment.id}' type='button'> edit </button>
            <button class='comment-delete' id='${comment.id}' type='button'> delete </button>
        </div>`
    );
    commentContainer.innerHTML = commentDivs.join('');
}


const makeComment = async (e) => {
    const id = document.querySelector('.story__title').id;  //this is the story_id
    const commentForm = document.querySelector('.commentForm');
    const formData = new FormData(commentForm);
    const content = formData.get('content');
    const body = {content};

    const res = await fetch(`http://localhost:8085/api/stories/${id}/comments/new`,{
        method: "post",  //all caps??
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (!res.ok) {
        throw res;
    }
    commentForm.reset();
    // const {comment} = await res.json();
}


const editComment = async (e) => {

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

const submitButton = document.querySelector('.postComment');




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
