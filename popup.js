
var cardNumber = "123456789";
var cardPassword = "123";

var orderStatus = "";
var STATUS_ADD_TO_CART = "STATUS_ADD_TO_CART";
var urls = ["https://www.dellrefurbished.com/dell-business-dock-wd15-308381.html"];

function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
    });
}

window.addEventListener('load', function () {

	// chrome.storage.local.get(['BOOKING_CARD_NUMBER', 'BOOKING_CARD_PASSWORD'], function(items) {
      document.getElementById('cardNumber').value = cardNumber;
      document.getElementById('cardPassword').value = cardPassword;
 //    });

	injectTheScript();

	document.getElementById('saveConfig').addEventListener('click', function() {
		cardNumber = document.getElementById('cardNumber').value;
		cardPassword = document.getElementById('cardPassword').value;
		// chrome.storage.local.set({'BOOKING_CARD_NUMBER': cardNumber, 'BOOKING_CARD_PASSWORD': cardPassword}, function() {
  //     		console.log('Settings saved');
  //   	});
	});

	document.getElementById('addToCart').addEventListener('click', function() {
		addToCart(urls);
	});	
});


function addToCart(urls) {
	var tabs = [];
    for (bookingUrl in urls) {
    	chrome.tabs.create({'url': "https://www.dellrefurbished.com/dell-business-dock-wd15-308381.html"}, function (tab) {
    		tabs.push(tab);
    	});
    }

    checkProductStatus(tabs);
}

function checkProductStatus(tabs) {
	for (tab in tabs) {
		if (tab.status === 'complete') {
			console.log(tab.id);
		}
	}
}
