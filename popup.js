//1. Get the URL input from user.
const trackButton = document.getElementById("trackBtn");

trackButton.addEventListener("click", trackPrice);

function trackPrice() {
    const productUrl = document.getElementById("productUrl").value.trim();

    if (!isValidAmazonUrl(productUrl)) {
        document.getElementById("statusMsg").textContent = "Invalid Amazon product URL!";
        return;
    }

    // Start tracking product price.
    document.getElementById("statusMsg").textContent = "Product tracking started!";
}

function isValidAmazonUrl(url) {
    /* Validate URL to ensure it is a valid product page. */
    const pattern = /^https?:\/\/(www\.)?amazon\.(com|ca|co\.uk|de|in|co\.jp)\/.*\/(gp\/product|dp)\/[A-Z0-9]{10}\/.*/i;

    return pattern.test(url);
}