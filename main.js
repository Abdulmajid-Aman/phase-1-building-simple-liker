// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}


let likeHearts = document.querySelectorAll('.like-glyph')

likeHearts.forEach(likeHeart => likeHeart.addEventListener('click', (event) => {
  mimicServerCall().then(() => {
    if(likeHeart.textContent === EMPTY_HEART) {
      likeHeart.textContent = FULL_HEART;
      likeHeart.classList.add('activated-heart');
    } else {
      likeHeart.textContent = EMPTY_HEART;
      likeHeart.classList.remove('activated-heart');
    }
  })
  .catch((error) => {
    // Toggle the heart back to its original state
    if(likeHeart.textContent === FULL_HEART) {
      likeHeart.textContent = EMPTY_HEART;
      likeHeart.classList.remove('activated-heart');
    } else {
      likeHeart.textContent = FULL_HEART;
      likeHeart.classList.add('activated-heart');
    }
    
    // Display error modal
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = error;
    modal.classList.remove('hidden');
    
    // Hide error modal after 3 seconds
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 3000);
  },)}))
