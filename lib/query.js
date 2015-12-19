// Query.load loads SQL from a file

exports.load = path => fs.readFileSync(`./queries/${path}`).toString("utf8");