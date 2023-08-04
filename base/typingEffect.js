// Get the pre-typed paragraph element
const preTypedParagraph = document.getElementById('typing-effect');

// Function to simulate reading content from an external file (simulated using Fetch API)
async function readContentFromFile() {
  try {
    const response = await fetch('content.txt');
    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Error reading content from file:', error);
    return '';
  }
}

// Function to simulate typing effect for each character
async function typeText() {
  const content = await readContentFromFile();
  if (!content) return; // Return if content is empty or could not be fetched

  let index = 0;
  preTypedParagraph.innerText = ''; // Clear the existing text in the paragraph

  function typeNextChar() {
    if (index < content.length) {
      preTypedParagraph.innerText += content.charAt(index);
      index++;
      preTypedParagraph.innerHTML += '<span class="pointer"></span>';
      setTimeout(typeNextChar, 10); // Adjust the typing speed (milliseconds per character)
    }
  }

  // Start the typing effect
  typeNextChar();
}

// Start the typing effect after a delay
setTimeout(typeText, 1000); // Adjust the delay before starting the typing effect (milliseconds)
