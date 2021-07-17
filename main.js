'use strict'

/**
 * Wolfram Alpha Developer AppID Keys. Since Each free key only allows 2000 API calls a month.
 */
const appid = [
	'26LQEH-YT3P6T3YY9',
	'K49A6Y-4REWHGRWW6',
	'J77PG9-UY8A3WQ2PG',
	'P3WLYY-2G9GA6RQGE',
	'P7JH3K-27RHWR53JQ',
	'L349HV-29P5JV8Y7J',
	'77PP56-XLQK5GKUAA',
	'59EQ3X-HE26TY2W64',
	'8Q68TL-QA8W9GEXAA',
	'KQRKKJ-8WHPY395HA',
	'AAT4HU-Q3RETTGY93',
	'7JKH84-T648HW2UV9',
	'WYEQU3-2T55JP3WUG',
	'T2XT8W-57PJW3L433',
	'2557YT-52JEY65G9K',
	'UVPKUJ-X9Q365R7E3',
	'W85VHP-E6WH3U78EE',
	'W33433-AKRV98E5AT',
	'3A3P8J-XA4UTGKAH5',
	'QGK5UA-HGUK7AP5LY',
	'8EL8GA-7W6EVYTQ5X',
	'W4TUXQ-GA2H8KUULA',
	'UGHH75-YPX2RVU4E4',
]

/**
 * a CORS workaround. We make requests from a proxy.
 */
const CORSProxy = `https://lin2jing4-cors-${new Date().getDay()}.herokuapp.com/`

const fixedEncodeURI = string => (
	encodeURIComponent(string)
		.replace(
			/[-_.!~*'()]/g,
			char => '%' + char.charCodeAt(0).toString(16)
		)
)

const $ = selector => document.querySelector(selector)
const body = $('body')
const input = $('input')
const main = $('main')

/**
 * Query body
 * 
 * @param {*} podstate 
 */
const query = async (podstate, s) => {

	/**
	 * If the following step by step query fails this will show.
	 */
	/* main.innerHTML = `
		<iframe src=https://www.wolframalpha.com/input/?i=${fixedEncodeURI(input.value)}>
	` */
	/**
	 * NOTE: Input query is URL Encoded.
	 */
	const url = `
		${CORSProxy} api.wolframalpha.com/v2/query?
		&appid = ${appid[Date.now() % appid.length]}
		&input = ${location.hash = fixedEncodeURI(document.title = input.value)}
		&output = json
		&podstate = Step-by-step+solution
		&podstate = Step-by-step
		&podstate = Show+all+steps
		&podstate = ${podstate?.replaceAll(' ', '+')}
		&format = image, plaintext
		&scantimeout = 30
		&podtimeout = 30
		&formattimeout = 30
		&parsetimeout = 30
		&totaltimeout = 30
	`
	const response = await fetch(
		url.replaceAll(' ', '')
	)
	const json = await response.json()
	/* $('pre').innerHTML = JSON.stringify(json) */
	if (json.queryresult.success)
		main.innerHTML = ''
	json.queryresult?.pods?.forEach(
		pod => {
			main.innerHTML += '<header>' + pod.title + '</header>'
			pod.states?.forEach(
				state => {
					if (state.states) {
						var h = '<select onchange=query(this.value,this.value)>'
						var i = 0;
						state.states.forEach(_state => {
							h += '<option value="">' + _state.name + '</option>'
						});
						h += '</select>'

						for (let index = 0; index < array.length; index++) {
							const element = array[index];
							
						}

						main.innerHTML += h;
					}
				}
			)
			pod.subpods?.forEach(
				subpod => {
					main.innerHTML += `
						<details>
							<summary></summary>
							<pre>${subpod.plaintext}</pre>
						</details>
						<img src=${subpod.img?.src}>
					`
				}
			)
		}
	)
}

// $('form').onsubmit = async event => {
// 	event.preventDefault()
// 	query()
// }

/* window.onhashchange = event => {
	input.focus()
	input.value = decodeURIComponent(location.hash.slice(1))
} */
/* 
window.onhashchange() */


/* if (input.value) {
	query()
} else {
	fetch(CORSProxy)
} */

/* $('select').onchange = async event => {
	const url = `
		${CORSProxy} wolframalpha.com/examples/
		StepByStep ${event.target.value} -content.html
	`
	const response = await fetch(url.replaceAll(' ', ''))
	const text = await response.text()
	main.innerHTML = text
		.replaceAll('/input/?i=', '#')
		.replaceAll('&amp;lk=3', '')
		.replaceAll('+', ' ')
	main.querySelector('a').remove()
	event.target.value = 'Examples'
}

body.className = localStorage.getItem('body.className') */