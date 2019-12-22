const fs = require("fs")

const mysql = require("mysql")

const myconfig = require("./config.json")

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: myconfig.password,
	database: "tioj_production"
})

connection.connect((err) => {
	if (err) throw console.log(err)
})

let contest_start_time = ""

let runs = []

function get_runs() {
	return new Promise((resolve, reject) => {
		connection.query(`select * from submissions where contest_id=${myconfig.contest_id}`, (err, res, fields) => {
			if (err) return reject(err)
			for (let i in res) {
				let d = new Date(res[i].created_at)
				let subtime = Math.floor((d - contest_start_time) / 1000 / 60 + 0.00000001)
				runs.push({id: res[i].id,
					   team: res[i].user_id - 14,
					   problem: res[i].problem_id - 11,
					   result: (res[i].result == 'AC' ? 'Yes' : 'No'),
					   submissionTime: subtime
				})
			}
			runs = { "runs": runs }
			return resolve(runs)
		})
	})
}

connection.query(`select * from contests where id=${myconfig.contest_id}`, (err, res, fields) => {
	if (err) throw err
	contest_start_time = res[0].start_time
	get_runs().then((runs) => {
		fs.writeFileSync("runs.json", JSON.stringify(runs))
		process.exit(0)
	}).catch(err => { throw err })
})

