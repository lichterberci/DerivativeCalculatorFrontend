// log the pageview with their URL
export function GoogleLogPage (url: string): void {
	(window as any).gtag('config', process.env.FIREBASE_MEASUREMENT_ID, {
		page_path: url,
	})
}

// log specific events happening.
export function GoogleLogEvent (action: string, params: { [key: string]: any }) {
	(window as any).gtag('event', action, params)
}