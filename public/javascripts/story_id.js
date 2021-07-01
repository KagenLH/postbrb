
const fetchComments = async () => {
    const id = document.querySelector('.story__title').id;  //this is the story_id
    const res = await fetch(`http://localhost:8085/api/stories/${id}/comments`);
    const {comments, user_id} = await res.json();

    console.log(comments)

    // TODO: find a way to use user_id to show or not the buttons
    const commentContainer = document.querySelector('.comment__section') //TODO, add class
    const commentDivs = comments.map(( comment ) =>
        `<div class="comment">
            <div class="comment-usernamer">
                <img src='${comment.User.avatarUrl}' class="comment__avatarIcon">
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


const createComment = async (e) => {
    const id = document.querySelector('.story__title').id;  //this is the story_id
    const commentForm = document.querySelector('.commentForm');
    const formData = new FormData(commentForm);
    const content = formData.get('content');
    const body = {content};

    const res = await fetch(`http://localhost:8085/api/stories/${id}/comments/new`,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        },
    });
    const test = await res.json();  // needed so the db will store the comment before the next function displays all the comments.
    if (!res.ok) {
        throw res;
    }
    commentForm.reset();
}


// const editComment = async (e) => {
//     const id = document.querySelector('.story__title').id;  //this is the story_id

//     const res = await fetch(`http://localhost:8085/api/stories/${e.id}/comments/edit`, {
//         method: "PUT",
//     });

//     const {comment} = await res.json();
// }


const deleteComment = async (e) => {
    const sid = document.querySelector('.story__title').id;  //this is the story_id
    const id = e.id;
    console.log('in tth function')
    console.log(sid,e)
    const res = await fetch(`http://localhost:8085/api/stories/${sid}/comments/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw res;
    }

    const test = await res.json(); //does nothing
}


document.addEventListener("DOMContentLoaded", async () => {

    try{
        await fetchComments();
    } catch (err){
        //how to handle error?
    }

    const commentForm = document.querySelector('.commentForm');
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try{
            await createComment(e);
            await fetchComments();
        }catch(err){
            //how to handle error?
        }
    })

    const deleteButton = document.querySelectorAll('.comment-delete');
    deleteButton.forEach( button => {
        button.addEventListener('click', async (e) => {
            console.log('in event listener')
            console.log(e)
            try{
                await deleteComment(e);
                await fetchComments();
            } catch(err) {
                //how to handle error?
            }

        })
    })

})
