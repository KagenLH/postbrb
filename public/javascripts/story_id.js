
const fetchComments = async (url) => {

    const id = document.querySelector('.story__title').id;  //this is the story_id
    const res = await fetch(`${url}/api/stories/${id}/comments`);
    const {comments, user_id} = await res.json();

    // TODO: find a way to use user_id to show or not the buttons
    const commentContainer = document.querySelector('.comment__section');

    const commentDivs = comments.map(( comment ) =>
        `<div class="comment" id='comment-${comment.id}'>
            <div class="comment-username">
                <img src='${comment.User.avatarUrl}' class="comment__avatarIcon"> ${comment.User.username}
            </div>
            <div class="comment-content">
                <p>${comment.content}</p>
            </div class="edit-delete">
                <button class='comment-edit' id='${comment.id}' type='button'> edit </button>
                <button class='comment-delete' id='${comment.id}' type='button'></button>
        </div>`
    );
    const commentAmount = commentDivs.length;
    const commentHeader = document.querySelector('.comment__comment-title');
    commentHeader.innerHTML = `Comments (${commentAmount})`;
    commentContainer.innerHTML = commentDivs.join('');

    const deleteButton = document.querySelectorAll('.comment-delete');
    deleteButton.forEach( button => {
        button.addEventListener('click', async (e) => {

            try{
                await deleteComment(e.target.id,url);
                await fetchComments(url);
            } catch(err) {
                //how to handle error?
            }

        })
    })
}


const createComment = async (e, url) => {
    const id = document.querySelector('.story__title').id;  //this is the story_id
    const commentForm = document.querySelector('.commentForm');
    const formData = new FormData(commentForm);
    const content = formData.get('content');
    const body = {content};

    const res = await fetch(`${url}/api/stories/${id}/comments/new`,{
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


const deleteComment = async (commentId,url) => {
    const sid = document.querySelector('.story__title').id;  //this is the story_id
    const res = await fetch(`${url}/api/stories/${sid}/comments/${commentId}`, {     // change URL FOR DEPLOYMENT
        method: "DELETE",
    });

    if (!res.ok) {
        throw res;
    }
    document.querySelector(`#comment-${commentId}`).remove();
}


document.addEventListener("DOMContentLoaded", async () => {

    const url = document.querySelector('#hidden-url').value;
    try{
        await fetchComments(url);
    } catch (err){
        //how to handle error?
    }

    const commentForm = document.querySelector('.commentForm');
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try{
            await createComment(e, url);
            await fetchComments(url);
        }catch(err){
            //how to handle error?
        }
    });
});
