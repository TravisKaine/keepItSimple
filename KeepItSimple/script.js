const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}


function zoomImage(imageSrc) {
  const zoomedImage = document.getElementById('zoomed-image');
  zoomedImage.src = imageSrc;

  // Show the zoomed image container
  const zoomedContainer = document.getElementById('zoomed-image-container');
  zoomedContainer.style.display = 'flex'; // Ensure the container is displayed
  zoomedContainer.style.opacity = 1; // Ensure the container is fully visible
  zoomedContainer.style.pointerEvents = 'auto'; // Enable pointer events

  // Hide the photo wheel
  const photoWheel = document.getElementById('photo-wheel');
  photoWheel.style.display = 'none';

  const zoomedText = document.createElement('div');
    zoomedText.classList.add('zoomed-image-text');

    // Check if there is already a text element, if yes, remove it
    const existingTextElement = document.querySelector('.zoomed-image-text');
    if (existingTextElement) {
        existingTextElement.remove();
    }

    // Append the text to the zoomed image container
    zoomedContainer.appendChild(zoomedText);
}

function backToWheel() {
  // Show the photo wheel
  const photoWheel = document.getElementById('photo-wheel');
  photoWheel.style.display = 'block';

  // Hide the zoomed image container
  const zoomedContainer = document.getElementById('zoomed-image-container');
  zoomedContainer.style.opacity = 0; // Hide the container
  zoomedContainer.style.pointerEvents = 'none'; // Disable pointer events

  // Remove the zoomed image text element
  const existingTextElement = document.querySelector('.zoomed-image-text');
  if (existingTextElement) {
      existingTextElement.remove();
  }
}

// Add event listener to the back-to-wheel button
document.getElementById('back-to-wheel').addEventListener('click', backToWheel);


const images = document.querySelectorAll('.image');
images.forEach(image => {
  image.addEventListener('click', () => {
    // Call the zoomImage function passing the image source
    const text = image.dataset.text;
    zoomImage(image.src, text);
  });
});

function zoomOutToPhotoWheel() {
  // Hide the zoomed image container
  const zoomedContainer = document.getElementById('zoomed-image-container');
  zoomedContainer.style.opacity = 0; // Hide the container
  zoomedContainer.style.pointerEvents = 'none'; // Disable pointer events

  // Show the photo wheel
  const photoWheel = document.getElementById('photo-wheel');
  photoWheel.style.display = 'block';
}

// Get reference to the Travis button
const travisButton = document.querySelector('.logo-text');

// Add click event listener to the Travis button
travisButton.addEventListener('click', zoomOutToPhotoWheel);


//touch 

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

