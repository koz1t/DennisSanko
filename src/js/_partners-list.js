const partnersList = document.querySelector('.about-section__partners-list');
const images = partnersList.querySelectorAll('img');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const spacing = 50; // 50px spacing
const imgHeight = 100; // Set a fixed height for all images
let totalWidth = 0;

// Load all images and calculate total width
let loadedImages = 0;
images.forEach(img => {
  img.onload = function () {
    const aspectRatio = img.width / img.height;
    const imgWidth = imgHeight * aspectRatio;
    totalWidth += imgWidth + spacing;
    loadedImages++;
    if (loadedImages === images.length) {
      createCanvas();
    }
  };
});

function createCanvas() {
  // Set canvas dimensions
  canvas.width = totalWidth;
  canvas.height = imgHeight;

  // Draw images on canvas
  let x = 0;
  images.forEach(img => {
    const aspectRatio = img.width / img.height;
    const imgWidth = imgHeight * aspectRatio;
    ctx.drawImage(img, x, 0, imgWidth, imgHeight);
    x += imgWidth + spacing;
  });

  // Convert canvas to image and set as background
  const imgData = canvas.toDataURL('image/png');
  partnersList.style.backgroundImage = `url(${imgData})`;

  // Log the dimensions of the image
  console.log(`Original image dimensions: ${canvas.width}x${canvas.height}`);

  // Get the height of the container
  const containerHeight = partnersList.clientHeight;

  // Calculate the proportional width based on the container height
  const proportionalWidth = (canvas.width / canvas.height) * containerHeight;

  // Log the proportional dimensions
  console.log(`Proportional image dimensions based on container height: ${proportionalWidth}x${containerHeight}`);

  // Create the keyframes dynamically
  const styleSheet = document.styleSheets[0];
  const keyframes = `
    @keyframes scrollBackground {
      from {
        background-position: 0 0;
      } 
      to {
        background-position: ${proportionalWidth}px 0;
      }
    }
  `;
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  // Apply the animation
  partnersList.style.animation = `scrollBackground 30s linear infinite`;
}