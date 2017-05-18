void function () {
	'use strict'

	var WebPerf = {}

	WebPerf.navigationTiming = tryNT() || fallback()

	function tryNT() {
		var perf = window.performance
		if (!perf || !perf.timing) return false

		// IE9 bug: navigationStart is 0 when redirect, so fallback to fetchStart
		WebPerf.t0 = perf.timing.navigationStart || perf.timing.fetchStart

		return function () {
			var t0 = WebPerf.t0, timing = perf.timing, nav = perf.navigation

			// prepare data to match Navigation Timing Level 2
			var entry = {
				/** DEBUG_INFO_START **/
				name: location.href,
				entryType: 'navigation',
				startTime: 0,
				duration: timing.loadEventEnd - t0,
				/** DEBUG_INFO_END **/
			}

			/** DEBUG_INFO_START **/
			entry.redirectCount = nav.redirectCount
			switch (nav.type) {
				case nav.TYPE_NAVIGATE:
					entry.type = 'navigate'
					break
				case nav.TYPE_RELOAD:
					entry.type = 'reload'
					break
				case nav.TYPE_BACK_FORWARD:
					entry.type = 'back_forward'
					break
				default:
					entry.type = nav.type
			}
			/** DEBUG_INFO_END **/

			// get first paint timestamp from Chrome's private API
			if ('chrome' in window && typeof window.chrome.loadTimes === 'function') {
				var loadTimes = window.chrome.loadTimes()
				entry.msFirstPaint = Math.round(loadTimes.firstPaintTime * 1000)
			}
			// transform data to match Navigation Timing Level 2
			for (var k in timing) {
				if (
					// ignore props on Object.prototype
					!entry[k] &&
					// only navigation attributes,
					// ignore others like toJSON on IE
					typeof timing[k] === 'number' &&
					// ignore navigationStart attribute
					k !== 'navigationStart' &&
					// ignore attributes return 0 value
					timing[k]
				) {
					entry[k] = timing[k] - t0
				}
			}
			return entry
		}
	}

	function fallback() {
		return function () {
			return {}
		}
	}

	// exports
	window.SWP = WebPerf

}()
