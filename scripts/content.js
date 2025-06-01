/* Scrape the price of an amazon product
*/

// Respond to the request made by 'popup.js' track button.
chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    if (message.type === "GET_PRODUCT_INFO") {
        const title = document.querySelector("#productTitle")?.innerText.trim();
        const wholeElement = document.querySelector(".a-price-whole");
        const fraction = document.querySelector(".a-price-fraction")?.innerText.trim();
        const currencySym = document.querySelector(".a-price-symbol")?.innerText.trim();

        if (!title || !wholeElement || !fraction || !currencySym) {
            sendResponse({ error: "Not an amazon product page!"});
            return true;
        }

        // Remove dot and spaces from whole element.
        const clone = wholeElement.cloneNode(true);
        const decimal = clone.querySelector(".a-price-decimal")
        if (decimal) {
            decimal.remove();
        }
        const whole = clone.textContent.trim();

        sendResponse( {title, 
            price: { whole, fraction }, 
            url: window.location.href,
            currencySym
        });
        return true;
    }
});
/*
function extractAmazonPrice() {
    //Extract the price of product on this Amazon URL 
    const whole = document.querySelector(".a-price-whole")?.innerText;
    const fraction = document.querySelector(".a-price-fraction")?.innerText;
    return whole && fraction ? `${whole}.${fraction}` : null;
}

function extractProductInfo() {
    const title = document.querySelector("#productTitle")?.innerText;
    const whole = document.querySelector(".a-price-whole")?.innerText;
    const fraction = document.querySelector(".a-price-fraction")?.innerText;

    if (!(title && whole && fraction)) {
        return null;
    }
    
    return { title: title,
        price: {
            whole: whole,
            fraction: fraction
        },
        url: window.location.href
    };
}
*/

