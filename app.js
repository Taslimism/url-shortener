const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const shortid = require("shortid");

let url = {};

const domain =
	port === 3000 ? "http://localhost:3000/" : "https://sortly.herokuapp.com/";

app.use(express.static("static"));
app.use(express.json());

app.get("/:shortUrlId", (req, res) => {
	const longUrl = url[req.params.shortUrlId];
	res.redirect(longUrl);
});

app.get("/url/all", (req, res) => {
	const urls = [...Object.keys(url)];
	const lastUrl = domain + urls[urls.length - 1];

	return res.json({ url: lastUrl });
});

app.post("/", (req, res) => {
	const longUrl = req.body.longUrl;
	const shortUrlId = shortid.generate();
	url[shortUrlId] = longUrl;

	res.send({ shortUrl: `${domain}${shortUrlId}` });
});

app.listen(port, () => {
	console.log(`Server up and running on port ${port}`);
});
