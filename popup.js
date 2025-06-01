document.getElementById("trackBtn").addEventListener("click", trackPrice);

async function trackPrice() {
    /* Track price of amazon product on current tab/window on chrome. */

    // Get the current active window/tab on chrome.
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];


    try {
        // Send message to content.js to request product info on that amazon product page.
        const response = await chrome.tabs.sendMessage(tab.id, { type: "GET_PRODUCT_INFO" });

        if (!response || response.error) {
            alert("This window is not an amazon product page!")
            return;
        }

        // Test by displaying the scraped product info.
        const output = document.getElementById("output");
        output.innerHTML = `<p> <a href="${response.url}">${response.title}</a>: ${response.currencySym}${response.price.whole}.${response.price.fraction}.</p>`;
    } catch (err) {
        document.getElementById("statusMsg").textContent = "Refresh the amazon page and try again!";
    }

};