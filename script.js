const docs = document.getElementById("docs");

const JsonPath = "./data.json";
const DocsTitle = "ドキュメント一覧";

// Json attributes
// {
//  "slug": "string",
//  "title": "string",
//  "description": "string",
//  "path": "string",
//  "published": boolean,
//  "createdAt": "string"
//  "updatedAt": "string"
// }

// 書類についてまとめられているJSONファイルを読み取り、出力する
async function fetchJson() {
  const response = await fetch(JsonPath, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(
      `ドキュメント一覧の取得に失敗しました: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  data.sort((a, b) => {
    if (a.updatedAt === b.updatedAt) {
      return a.createdAt < b.createdAt ? 1 : -1;
    }

    return a.updatedAt < b.updatedAt ? 1 : -1;
  });

  data.forEach((doc) => {
    doc.createdAt = formatDate(doc.createdAt);
    doc.updatedAt = formatDate(doc.updatedAt);
  });

  return data;
}

// 日付の文字列を受け取り日本表記の文字列にして出力する
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");

  return `${year}年${Number(month)}月${Number(day)}日`;
}

// 書類リストをページに作成する
async function createDocList() {
  try {
    const jsonData = await fetchJson();
    // リストを生成
    const myDocsList = document.createElement("div");
    const myDocsTitle = document.createElement("h2");

    // リストのクラス付とタイトルを設定
    myDocsList.classList.add("list");
    myDocsTitle.textContent = DocsTitle;

    jsonData.forEach((data) => {
      // リストアイテムを生成
      const myDocsItem = document.createElement("div");
      const myItemLink = document.createElement("a");
      const myItemDesc = document.createElement("div");
      const myItemDate = document.createElement("div");
      const myItemCreatedAt = document.createElement("p");
      const myItemUpdatedAt = document.createElement("p");

      // クラス付けを行う
      myDocsItem.classList.add("item");
      myItemDesc.classList.add("desc");
      myItemDate.classList.add("date");

      // 書類のタイトルにURLを貼り付ける
      myItemLink.textContent = data.title;
      myItemLink.href = data.path.replace("index.md", "");
      // 書類の説明を追加
      myItemDesc.textContent = data.description;
      // 書類の作成更新日時を追加
      myItemCreatedAt.textContent = `作成: ${data.createdAt}`;
      myItemUpdatedAt.textContent = `更新: ${data.updatedAt}`;

      // 日付を日付リストに追加
      myItemDate.appendChild(myItemCreatedAt);
      myItemDate.appendChild(myItemUpdatedAt);

      // 書類データをアイテムに追加
      myDocsItem.appendChild(myItemLink);
      myDocsItem.appendChild(myItemDesc);
      myDocsItem.appendChild(myItemDate);
      myDocsList.appendChild(myDocsItem);
    });

    // アイテムをリストに追加
    docs.appendChild(myDocsTitle);
    docs.appendChild(myDocsList);
  } catch (error) {
    console.error(error);
    docs.textContent =
      "ドキュメント一覧を読み込めませんでした。時間をおいて再度お試しください。";
  }
}

createDocList();
