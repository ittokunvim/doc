const docs = document.getElementById("docs");

const JsonPath = "./data.json";
const DocsTitle = "ドキュメント一覧";

// Json attributes
// {
//  "slug": "string",
//  "title": "string",
//  "path": "string",
//  "published": boolean,
//  "createdAt": "string"
//  "updatedAt": "string"
// }

async function fetchJson() {
	try {
		const response = await fetch(JsonPath, { cache: "no-store" });
		const data = await response.json();
		data.sort((a, b) => {
			if (a.updatedAt === b.updatedAt) {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else {
				return a.updatedAt < b.updatedAt ? 1 : -1;
			}
		});
		data.forEach((doc) => {
			doc.createdAt = formatDate(doc.createdAt);
			doc.updatedAt = formatDate(doc.updatedAt);
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
		const myItemDate = document.createElement("div");
		const myItemCreatedAt = document.createElement("p");
		const myItemUpdatedAt = document.createElement("p");

		myDocsItem.classList.add("item");
		myItemDate.classList.add("date");
		myItemLink.textContent = data.title;
		myItemLink.href = data.path.replace("index.md", "");
		myItemCreatedAt.textContent = `作成: ${data.createdAt}`;
		myItemUpdatedAt.textContent = `更新: ${data.updatedAt}`;

		myItemDate.appendChild(myItemCreatedAt);
		myItemDate.appendChild(myItemUpdatedAt);

		myDocsItem.appendChild(myItemLink);
		myDocsItem.appendChild(myItemDate);
		myDocsList.appendChild(myDocsItem);
	});

	docs.appendChild(myDocsTitle);
	docs.appendChild(myDocsList);
}

createDocList();
