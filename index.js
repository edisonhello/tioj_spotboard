const fs = require("fs")

const mysql = require("mysql")

const myconfig = require("config.json")

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: myconfig.password,
	database: "tioj_production"
})

connection.connect((err) => {
	if (err) throw console.log(err)
})

let runs = []

connection.query('select id,result,problem_id,user_id,contest_id,created_at from submissions where contest_id=2', (err, res, fields) => {
	if (err) throw err
	for (let i in res) {
		let d = new Date(res[i].created_at)
		let st = new Date("2019-12-21T22:00:00.000Z")
		let subtime = Math.floor((d - st) / 1000 / 60 + 0.00000001)
		runs.push({id:res[i].id,
			   team:res[i].user_id - 14,
			   problem:res[i].problem_id - 11,
			   result:(res[i].result=='AC' ? 'Yes' : 'No'),
			   submissionTime:subtime
		})
	}
	runs = { "runs": runs }
	fs.writeFileSync("runs.json", JSON.stringify(runs))
	process.exit(0)
})

