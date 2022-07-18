const form = document.querySelector(".form");
const input = document.querySelector(".url");
const button = document.querySelector(".submit-button");
const formContainer = document.querySelector(".form-container");
let btn;
let copybtn;
const hostname = window.location.hostname;
const port = window.location.port;
let url =
	hostname === "localhost"
		? `http://localhost:${port}/`
		: "https://sortly.herokuapp.com/";
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const { name, value } = input;
	if (!value) {
		return;
	}
	console.log(e);
	const formData = {
		[name]: value,
	};
	console.log(formData);

	const options = {
		method: "POST",
		headers: new Headers({
			"Content-Type": "application/json",
		}),
		body: JSON.stringify(formData),
	};

	fetch(url, options)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			input.value = data.shortUrl;
			button.disabled = true;
			btn = document.createElement("button");
			formContainer.appendChild(btn);
			btn.classList.add("copy-btn");
			btn.textContent = "Copy";
			copybtn = document.querySelector(".copy-btn");
			copybtn.addEventListener("click", () => {
				btn.textContent = "Copied";
				setTimeout(() => (btn.textContent = "Copy"), 4000);
				input.select();
				document.execCommand("copy");
			});
			input.addEventListener("input", (e) => {
				if (e.target.value != "") return;
				button.disabled = false;
				formContainer.removeChild(btn);
			});
			attachToPrev(value);
		})
		.catch((error) => console.log(error));
});

const prevUrlContainer = document.querySelector(".previous-container");

async function attachToPrev(value) {
	try {
		const data = await fetch(url + "url/all");
		const res = await data.json();
		console.log(res, res.url);
		const outerDiv = document.createElement("div");
		outerDiv.classList.add("previous");
		const innerDiv0 = document.createElement("div");
		innerDiv0.classList.add("bigurl");
		const input = document.createElement("input");
		input.setAttribute("readonly", "true");
		input.classList.add("shorturl");
		const copyBtn = document.createElement("button");
		copyBtn.classList.add("prev-copy-btn");

		innerDiv0.textContent = value;
		input.value = res.url;
		copyBtn.textContent = "Copy";

		outerDiv.appendChild(innerDiv0);
		outerDiv.appendChild(input);
		outerDiv.appendChild(copyBtn);
		prevUrlContainer.appendChild(outerDiv);
		copyBtn.addEventListener("click", () => {
			copyBtn.textContent = "Copied";
			setTimeout(() => (copyBtn.textContent = "Copy"), 4000);
			input.select();
			document.execCommand("copy");
		});
	} catch (error) {
		console.log(error);
	}
}
