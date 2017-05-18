void function (WebPerf) {
	'use strict'

	// API
	WebPerf.nt = function () {
		return compact(WebPerf.navigationTiming())
	}
	WebPerf.setLogger = function (logger) {
		this._logger = logger
	}

	// register when to log
	function log() {
		setTimeout(function () {
			if (typeof WebPerf._logger === 'function') WebPerf._logger()
		}, 1)
	}
	window.addEventListener('load', log, false)


	var ignores = /^(name|entryType|startTime|duration|navigationStart)$/

	function compact(timing) {
		var o = {}
		// console.log(timing)
		/** DEBUG_INFO_START **/
		o.T0 = WebPerf.t0
		/** DEBUG_INFO_END **/

		for (var key in timing) {
			if (ignores.test(key)) continue

			var val = timing[key]
			switch (typeof val) {
				/** DEBUG_INFO_START **/
				// handle `type`
				case 'string':
					val = val.charAt(0)
				/** DEBUG_INFO_END **/
				// fallthrough
				case 'number':
					o[abbr(key)] = val
			}
		}
		// console.log(o)
		return o
	}

	function abbr(name) {
		var x
		if (name.slice(-5) === 'Start') x = 0
		else if (name.slice(-3) === 'End') x = 1
		else x = ''

		switch (name.split(/[A-Z]/, 1)[0]) {
			case 'dom':
				return name.charAt(3) + x
			case 'connect':
				return 'O' + x
			case 'response':
				return 'P' + x
			case 'request':
				return 'Q' + x
			case 'secure':
				return 'S' + x
			case 'link':
				return 'N' + x
			// msFirstPaint
			case 'ms':
				return 'P'
			default:
				return name.charAt(0).toUpperCase() + x
		}
	}

	/** DEBUG_INFO_START **/
	WebPerf.__abbr = abbr
	/** DEBUG_INFO_END **/

}(window.SWP)
