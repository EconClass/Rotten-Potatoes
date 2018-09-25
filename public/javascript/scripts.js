window.onload = function() {
//=======================================CREATE=======================================//
    // listen for a form submit event
    let newCommentForm = document.getElementById("newComment");
    newCommentForm.addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();

        let movieId = document.getElementById("movieId").getAttribute("value")

        // serialize the form data into an object
        let comment = $(newCommentForm).serialize();
        console.log(comment);

        // use axios to initialize a post request and send in the form data
        axios.post(`/reviews/comments`, comment)
        .then(function (response) {
            console.log(response);
            // Comment is in a JSON format from the response
            let newComment = response.data.comment;
            let index = document.querySelectorAll('.card').length // **Assign unique index to every comment card**
            console.log(index)
            newCommentForm.reset();
            let comment_1 = document.getElementById('comment');

            $(comment_1).prepend(
                `
                <div class="card" id="${newComment._id}">
                    <div class="card-block">
                        <h4 class="card-title">${newComment.title}</h4>
                        <p class="card-text">${newComment.content}</p>
                        <!-- Delete link -->
                        <p><button class="btn btn-link" id="deleteComment-${index}" type="button" onclick="deleteComment(${index});" data-comment-id=${newComment._id}>Delete</button></p>
                    </div>
                </div>
                `
            );
        })
        .catch(function (error) {
            console.log(error);
            alert('There was a problem saving your comment. Please try again.')
        });
    });
}

//=======================================DELETE=======================================//
    // addEventListener() attatches listener to pre-existing element
    // function accesses index created in HTML to iterate through comments and delete by index
function deleteComment(index) {
    console.log("click!");
    let commentId = document.getElementById("deleteComment-" + index).getAttribute('data-comment-id');
    console.log(commentId);
    axios.delete(`/reviews/comments/${commentId}`)
    .then(response => {
        let comment = document.getElementById(commentId);
        comment.parentNode.removeChild(comment); // OR comment.style.display = 'none';
    })
    .catch(error => {
        console.log(error)
        alert('There was an error deleting this comment.')
    });
}
