const docs = document.getElementById("docs");

const JsonPath = "./data.json";
const DocsTitle = "ドキュメント一覧";

// Json attributes
// {
//  "slug": "string",
//  "title": "string",
//  "path": "string",
//  "createdAt": "string"
// }

async function fetchJson() {
	try {
		const response = await fetch(JsonPath, { cache: "no-store" });
		const data = await response.json();
		data.sort((a, b) => {
			return a.createdAt < b.createdAt ? 1 : -1;
		});
		data.forEach((doc) => {
			doc.createdAt = formatDate(doc.createdAt);
		});
		return data;
	} catch (error) {
		console.error(error);
	}
}

function formatDate(createdAt) {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

async function createDocList() {
	const jsonData = await fetchJson();
	const myDocsList = document.createElement("div");
	const myDocsTitle = document.createElement("h2");

	myDocsList.classList.add("list");
	myDocsTitle.textContent = DocsTitle;

	jsonData.forEach((data) => {
		const myDocsItem = document.createElement("div");
		const myItemLink = document.createElement("a");
		const myItemDate = document.createElement("p");

		myDocsItem.classList.add("item");
		myItemLink.textContent = data.title;
		myItemLink.href = data.path.replace("index.md", "");
		myItemDate.textContent = data.createdAt;

		myDocsItem.appendChild(myItemLink);
		myDocsItem.appendChild(myItemDate);
		myDocsList.appendChild(myDocsItem);
	});

	docs.appendChild(myDocsTitle);
	docs.appendChild(myDocsList);
}

createDocList();
