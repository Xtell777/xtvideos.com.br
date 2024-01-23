<script>
// Get the video element
const video = document.getElementById("video");

// Get the video title element
const videoTitle = document.getElementById("video-title");

// Get the video description element
const videoDescription = document.getElementById("video-description");

// Get the video views element
const videoViews = document.getElementById("video-views");

// Get the video date element
const videoDate = document.getElementById("video-date");

// Get the like button element
const likeButton = document.getElementById("like-button");

// Get the like count element
const likeCount = document.getElementById("like-count");

// Get the dislike button element
const dislikeButton = document.getElementById("dislike-button");

// Get the dislike count element
const dislikeCount = document.getElementById("dislike-count");

// Get the subscribe button element
const subscribeButton = document.getElementById("subscribe-button");

// Get the comment title element
const commentTitle = document.getElementById("comment-title");

// Get the comment form element
const commentForm = document.getElementById("comment-form");

// Get the comment input element
const commentInput = document.getElementById("comment-input");

// Get the comment button element
const commentButton = document.getElementById("comment-button");

// Get the comment list element
const commentList = document.getElementById("comment-list");

// Define a function to format the number of views
function formatViews(number) {
    return numeral(number).format("0,0") + " visualizações";
}

// Define a function to format the date
function formatDate(date) {
    return "Publicado em " + moment(date).format("DD/MM/YYYY");
}

// Define a function to format the time
function formatTime(date) {
    return moment(date).fromNow();
}

// Define a function to create a comment element
function createComment(comment) {
    // Create a div element for the comment
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    // Create an img element for the comment avatar
    const commentAvatar = document.createElement("img");
    commentAvatar.classList.add("comment-avatar");
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = "Avatar do usuário";

    // Create a div element for the comment content
    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");

    // Create a span element for the comment user
    const commentUser = document.createElement("span");
    commentUser.classList.add("comment-user");
    commentUser.textContent = comment.user;

    // Create a p element for the comment text
    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.textContent = comment.text;

    // Create a span element for the comment time
    const commentTime = document.createElement("span");
    commentTime.classList.add("comment-time");
    commentTime.textContent = formatTime(comment.date);

    // Create a span element for the comment reply
    const commentReply = document.createElement("span");
    commentReply.classList.add("comment-reply");
    commentReply.textContent = "Responder";

    // Append the elements to the comment content
    commentContent.appendChild(commentUser);
    commentContent.appendChild(commentText);
    commentContent.appendChild(commentTime);
    commentContent.appendChild(commentReply);

    // Append the elements to the comment div
    commentDiv.appendChild(commentAvatar);
    commentDiv.appendChild(commentContent);

    // Return the comment div
    return commentDiv;
}

// Define a function to load the video data from the local storage
function loadVideoData() {
    // Get the video data from the local storage
    const videoData = localStorage.getItem("videoData");

    // If the video data exists, parse it and return it
    if (videoData) {
        return JSON.parse(videoData);
    }

    // Otherwise, return an empty object
    return {};
}

// Define a function to save the video data to the local storage
function saveVideoData(data) {
    // Stringify the data and store it in the local storage
    localStorage.setItem("videoData", JSON.stringify(data));
}

// Define a function to update the video views
function updateVideoViews() {
    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // If the data has a property with the video title, increment the views by one
    if (data[title]) {
        data[title].views++;
    } else {
        // Otherwise, create a new property with the video title and initialize the views to one
        data[title] = {
            views: 1,
            likes: 0,
            dislikes: 0,
            comments: []
        };
    }

    // Save the video data
    saveVideoData(data);

    // Update the video views element with the formatted views
    videoViews.textContent = formatViews(data[title].views);
}

// Define a function to update the video rating
function updateVideoRating(event) {
    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // Get the button that was clicked
    const button = event.target;

    // Get the value of the button
    const value = parseInt(button.dataset.value);

    // If the value is 1, increment the likes by one
    if (value === 1) {
        data[title].likes++;
    } else {
        // Otherwise, increment the dislikes by one
        data[title].dislikes++;
    }

    // Save the video data
    saveVideoData(data);

    // Update the like count and dislike count elements with the formatted numbers
    likeCount.textContent = numeral(data[title].likes).format("0,0");
    dislikeCount.textContent = numeral(data[title].dislikes).format("0,0");
}

// Define a function to update the comment list
function updateCommentList() {
    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // Get the comments array
    const comments = data[title].comments;

    // Clear the comment list element
    commentList.innerHTML = "";

    // Loop through the comments array
    for (const comment of comments) {
        // Create a comment element for each comment object
        const commentElement = createComment(comment);

        // Append the comment element to the comment list element
        commentList.appendChild(commentElement);
    }

    // Update the comment title element with the number of comments
    commentTitle.textContent = comments.length + " Comentários";
}

// Define a function to add a new comment
function addComment(event) {
    // Prevent the default behavior of the event
    event.preventDefault();

    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // Get the comment input value
    const commentText = commentInput.textContent;

    // If the comment input is not empty
    if (commentText) {
        // Create a new comment object with the user avatar, user name, comment text and comment date
        const newComment = {
            avatar: "avatar.png",
            user: "Usuário",
            text: commentText,
            date: new Date()
        };

        // Push the new comment object to the comments array
        data[title].comments.push(newComment);

        // Save the video data
        saveVideoData(data);

        // Update the comment list
        updateCommentList();

        // Clear the comment input
        commentInput.textContent = "";
    }
}

// Define a function to handle the comment reply
function handleCommentReply(event) {
    // Get the element that was clicked
    const element = event.target;

    // If the element matches the comment reply selector
    if (element.matches(".comment-reply")) {
        // Get the comment content element
        const commentContent = element.closest(".comment-content");

        // Get the comment user element
        const commentUser = commentContent.querySelector(".comment-user");

        // Get the comment user name
        const commentUserName = commentUser.textContent;

        // Set the comment input value to mention the comment user name
        commentInput.textContent = "@" + commentUserName + " ";

        // Focus the comment input
        commentInput.focus();
    }
}

// Add an event listener for the video loaded data event
video.addEventListener("loadeddata", function() {
    // Get the video element
const video = document.getElementById("video");

// Get the video title element
const videoTitle = document.getElementById("video-title");

// Get the video description element
const videoDescription = document.getElementById("video-description");

// Get the video views element
const videoViews = document.getElementById("video-views");

// Get the video date element
const videoDate = document.getElementById("video-date");

// Get the like button element
const likeButton = document.getElementById("like-button");

// Get the like count element
const likeCount = document.getElementById("like-count");

// Get the dislike button element
const dislikeButton = document.getElementById("dislike-button");

// Get the dislike count element
const dislikeCount = document.getElementById("dislike-count");

// Get the subscribe button element
const subscribeButton = document.getElementById("subscribe-button");

// Get the comment title element
const commentTitle = document.getElementById("comment-title");

// Get the comment form element
const commentForm = document.getElementById("comment-form");

// Get the comment input element
const commentInput = document.getElementById("comment-input");

// Get the comment button element
const commentButton = document.getElementById("comment-button");

// Get the comment list element
const commentList = document.getElementById("comment-list");

// Define a function to format the number of views
function formatViews(number) {
    return numeral(number).format("0,0") + " visualizações";
}

// Define a function to format the date
function formatDate(date) {
    return "Publicado em " + moment(date).format("DD/MM/YYYY");
}

// Define a function to format the time
function formatTime(date) {
    return moment(date).fromNow();
}

// Define a function to create a comment element
function createComment(comment) {
    // Create a div element for the comment
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    // Create an img element for the comment avatar
    const commentAvatar = document.createElement("img");
    commentAvatar.classList.add("comment-avatar");
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = "Avatar do usuário";

    // Create a div element for the comment content
    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");

    // Create a span element for the comment user
    const commentUser = document.createElement("span");
    commentUser.classList.add("comment-user");
    commentUser.textContent = comment.user;

    // Create a p element for the comment text
    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.textContent = comment.text;

    // Create a span element for the comment time
    const commentTime = document.createElement("span");
    commentTime.classList.add("comment-time");
    commentTime.textContent = formatTime(comment.date);

    // Create a span element for the comment reply
    const commentReply = document.createElement("span");
    commentReply.classList.add("comment-reply");
    commentReply.textContent = "Responder";

    // Append the elements to the comment content
    commentContent.appendChild(commentUser);
    commentContent.appendChild(commentText);
    commentContent.appendChild(commentTime);
    commentContent.appendChild(commentReply);

    // Append the elements to the comment div
    commentDiv.appendChild(commentAvatar);
    commentDiv.appendChild(commentContent);

    // Return the comment div
    return commentDiv;
}

// Define a function to load the video data from the local storage
function loadVideoData() {
    // Get the video data from the local storage
    const videoData = localStorage.getItem("videoData");

    // If the video data exists, parse it and return it
    if (videoData) {
        return JSON.parse(videoData);
    }

    // Otherwise, return an empty object
    return {};
}

// Define a function to save the video data to the local storage
function saveVideoData(data) {
    // Stringify the data and store it in the local storage
    localStorage.setItem("videoData", JSON.stringify(data));
}

// Define a function to update the video views
function updateVideoViews() {
    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // If the data has a property with the video title, increment the views by one
    if (data[title]) {
        data[title].views++;
    } else {
        // Otherwise, create a new property with the video title and initialize the views to one
        data[title] = {
            views: 1,
            likes: 0,
            dislikes: 0,
            comments: []
        };
    }

    // Save the video data
    saveVideoData(data);

    // Update the video views element with the formatted views
    videoViews.textContent = formatViews(data[title].views);
}

// Define a function to update the video rating
function updateVideoRating(event) {
    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // Get the button that was clicked
    const button = event.target;

    // Get the value of the button
    const value = parseInt(button.dataset.value);

    // If the value is 1, increment the likes by one
    if (value === 1) {
        data[title].likes++;
    } else {
        // Otherwise, increment the dislikes by one
        data[title].dislikes++;
    }

    // Save the video data
    saveVideoData(data);

    // Update the like count and dislike count elements with the formatted numbers
    likeCount.textContent = numeral(data[title].likes).format("0,0");
    dislikeCount.textContent = numeral(data[title].dislikes).format("0,0");
}

// Define a function to update the comment list
function updateCommentList() {
    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // Get the comments array
    const comments = data[title].comments;

    // Clear the comment list element
    commentList.innerHTML = "";

    // Loop through the comments array
    for (const comment of comments) {
        // Create a comment element for each comment object
        const commentElement = createComment(comment);

        // Append the comment element to the comment list element
        commentList.appendChild(commentElement);
    }

    // Update the comment title element with the number of comments
    commentTitle.textContent = comments.length + " Comentários";
}

// Define a function to add a new comment
function addComment(event) {
    // Prevent the default behavior of the event
    event.preventDefault();

    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // Get the comment input value
    const commentText.comment;
// Define a function to add a new comment
function addComment(event) {
    // Prevent the default behavior of the event
    event.preventDefault();

    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // Get the comment input value
    const commentText = commentInput.textContent;

    // If the comment input is not empty
    if (commentText) {
        // Create a new comment object with the user avatar, user name, comment text and comment date
        const newComment = {
            avatar: "avatar.png",
            user: "Usuário",
            text: commentText,
            date: new Date()
        };

        // Push the new comment object to the comments array
        data[title].comments.push(newComment);

        // Save the video data
        saveVideoData(data);

        // Update the comment list
        updateCommentList();

        // Clear the comment input
        commentInput.textContent = "";
    }
}

// Define a function to handle the comment reply
function handleCommentReply(event) {
    // Get the element that was clicked
    const element = event.target;

    // If the element matches the comment reply selector
    if (element.matches(".comment-reply")) {
        // Get the comment content element
        const commentContent = element.closest(".comment-content");

        // Get the comment user element
        const commentUser = commentContent.querySelector(".comment-user");

        // Get the comment user name
        const commentUserName = commentUser.textContent;

        // Set the comment input value to mention the comment user name
        commentInput.textContent = "@" + commentUserName + " ";

        // Focus the comment input
        commentInput.focus();
    }
}

// Add an event listener for the video loaded data event
video.addEventListener("loadeddata", function() {
    // Get the video data
    const data = loadVideoData();

    // Get the video title
    const title = videoTitle.textContent;

    // If the data has a property with the video title
    if (data[title]) {
        // Update the like count and dislike count elements with the formatted numbers
        likeCount.textContent = numeral(data[title].likes).format("0,0");
        dislikeCount.textContent = numeral(data[title].dislikes).format("0,0");
    }

    // Update the video views element with the formatted views
    videoViews.textContent = formatViews(data[title].views);
});

// Add an event listener for the video ended event
video.addEventListener("ended", updateVideoViews);

// Add an event listener for the like button click event
likeButton.addEventListener("click", updateVideoRating);

// Add an event listener for the dislike button click event
dislikeButton.addEventListener("click", updateVideoRating);

// Add an event listener for the comment form submit event
commentForm.addEventListener("submit", addComment);

// Add an event listener for the comment list click event
commentList.addEventListener("click", handleCommentReply);

// Update the video date element with the formatted date
videoDate.textContent = formatDate(new Date());

// Update the comment list when the page loads
updateCommentList();
<script>
