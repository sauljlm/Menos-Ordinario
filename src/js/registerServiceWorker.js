// Only register service worker in production version.
/*
if (process.env.NODE_ENV === 'production') {
	// Check that service workers are supported.
	if ('serviceWorker' in navigator) {
		// Use the window load event to keep the page load performant.
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/sw.js');
		});
	}
}
*/

// Check that service workers are supported.
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant.
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js');
    });
}