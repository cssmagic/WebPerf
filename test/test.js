var swp = SWP.nt()
var webperf = WebPerf.nt()
_.each(webperf, function (value, key) {
	if (!(key in swp)) console.warn('missing key: ' + key)
	if (swp[key] === value) console.log('right key: ' + key)
	if (swp[key] !== value) console.error('wrong key: ' + key)
})
