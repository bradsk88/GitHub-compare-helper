chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

	chrome.declarativeContent.onPageChanged.addRules([
	  {
		conditions: [
		  new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {
				hostEquals: 'github.com',
				pathContains: 'commits'
			},
		  })
		],
		actions: [ new chrome.declarativeContent.ShowPageAction() ]
	  }
	]);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(changeInfo.url && changeInfo.url.includes('commits')) {
		if (changeInfo.url.includes('/pull/')) {
			injectPullRequestScripts();
		} else {
            injectProjectScripts();
        }
	}
});

function injectProjectScripts() {
	chrome.tabs.executeScript(null, {file: "common.js"});
	chrome.tabs.executeScript(null, {file: "script-project.js"});
	chrome.tabs.insertCSS(null, {file: "styles.css"});
}

function injectPullRequestScripts() {
	chrome.tabs.executeScript(null, {file: "common.js"});
	chrome.tabs.executeScript(null, {file: "script-pr.js"});
	chrome.tabs.insertCSS(null, {file: "styles.css"});
}
