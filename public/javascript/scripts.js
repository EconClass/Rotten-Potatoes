window.onload = function () {
    //==============================CREATE==============================//
    // listen for a form submit event
    let newCommentForm = document.getElementById("newComment");
    newCommentForm.addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();

        // serialize the form data into an object
        let comment = $(newCommentForm).serialize();

        // use axios to initialize a post request and send in the form data
        axios.post(`/movies/${comment.movieId}/reviews/comments`, comment)
        .then(function (response) {

            // Comment is in a JSON format from the response
            let newComment = response.data.comment;
            newCommentForm.reset();

            $('#comments').prepend(
                `
                <div class="card">
                    <div class="card-block">
                        <h4 class="card-title">${newComment.title}</h4>
                        <p class="card-text">${newComment.content}</p>
                        <p>
                            <form method="POST" action="/movies/{{review.movieId}}/reviews/comments/${newComment._id}?_method=DELETE">
                                <button class="btn btn-link" type="submit">Delete</button>
                            </form>
                        </p>
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
    //==============================DELETE==============================//
    let d_comment = document.getElementById('deleteComment');

    document.getElementById('deleteComment').addEventListener('click', (e) => {
        console.log("click!");
        let commentId = d_comment.getAttribute('data-comment-id');
        let delComment = $(d_comment).serialize();
        axios.delete(`/movies/${delComment.movieId}/reviews/comments/${commentId}`)
        .then(response => {
            let comment = document.getElementById(commentId);
            comment.parentNode.removeChild(comment); // OR comment.style.display = 'none';
        })
        .catch(error => {
            console.log(error)
            alert('There was an error deleting this comment.')
        });
    });
};
