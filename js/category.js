const url = "https://kea-alt-del.dk/t7/api/categories";

//fetch data
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    gotData(data);
  });

//loop through
function gotData(data) {
  data.forEach(showCategory);
}
function showCategory(category) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);

  copy.querySelector(".articleName").textContent = category.category;
  copy.querySelector(
    "a"
  ).href = `../pages/productlist.html?category=${category.category}`;

  const parent = document.querySelector("#Accessories");
  parent.appendChild(copy);
}
