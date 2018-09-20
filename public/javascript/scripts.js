window.onload = function () {
    // listen for a form submit event
    let newCommentForm = document.getElementById("newComment");
    newCommentForm.addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();

        let comment = $(newCommentForm).serialize();

        // use axios to initialize a post request and send in the form data
        axios.post(`/movies/${comment.movieId}/reviews/comments`, comment)
        .then(function (response) {

            // we get the comment on a JSON format from the response
            let newComment = response.data.comment;
            newCommentForm.reset();

            $('#comments').prepend(
                `
                <div class="card">
                    <div class="card-block">
                        <p class="card-text">${newComment.content}</p>
                        <p>
                            <form method="POST" action="/reviews/comments/${newComment._id}?_method=DELETE">
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
        // // serialize the form data into an object
        // let comment = {};
        // const inputs = document.getElementsByClassName('form-control');
        // for (var i = 0; i < inputs.length; i++) {
        //     comment[inputs[i].name] = inputs[i].value;
        // };
        //
        // axios.post('/reviews/comments', comment)
        // .then(function (response) {
        //     // wait for the success response from the server
        //     console.log(response);
        //     // remove the information from the form
        //     // display the data as a new comment on the page
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     // handle any errors
        //     alert('There was a problem saving your comment. Please try again.')
        // });
        //
        // axios.post('/user', comment)
        // .then(function (response) {
        //     // wait for the success response from the server
        //     console.log(response);
        //     // remove the information from the form
        //     this.reset();
        //     // display the data as a new comment on the page
        //     document.getElementById('comments').prepend(
        //         `
        //         <div class="card">
        //             <div class="card-block">
        //                 <h4 class="card-title">${response.title}</h4>
        //                 <p class="card-text">${response.content}</p>
        //                 <p>
        //                     <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
        //                         <button class="btn btn-link" type="submit">Delete</button>
        //                     </form>
        //                 </p>
        //             </div>
        //         </div>
        //         `
        //     );
        // });

    document.getElementById('delete-comment').addEventListener('click', (e) => {
        console.log("click!")
        let commentId = this.getAttribute('data-comment-id')
        axios.delete(`/reviews/comments/${commentId}`)
        .then(response => {
            console.log(response)
            comment = document.getElementById(commentId)
            comment.parentNode.removeChild(comment); // OR comment.style.display = 'none';
        })
        .catch(error => {
            console.log(error)
            alert('There was an error deleting this comment.')
        });
    });
};
