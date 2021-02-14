const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
console.log(category);
document.querySelector("h1").textContent = category;
document.querySelector(".breadcrumbs .category").textContent = category;

const url = "https://kea-alt-del.dk/t7/api/products?category=" + category;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  //console.log(data);
  data.forEach(showProduct);
}

function showProduct(product) {
  // console.log(product);
  //grab the template
  const template = document.querySelector("#productDisplayTemplate").content;

  //clone it
  const copy = template.cloneNode(true);

  //change content
  copy.querySelector(
    ".subtle"
  ).textContent = `${product.articletype} | ${product.brandname}`;
  copy.querySelector("h2").textContent = product.productdisplayname;

  const pLinks = copy.querySelectorAll(".productLink");
  pLinks.forEach(addNewLink);

  function addNewLink(item) {
    item.href = `product.html?id=${product.id}`;
  }

  copy.querySelector(".price").textContent = product.price + " DKK";
  copy.querySelector(".hidden").textContent = product.price + " DKK";
  copy.querySelector(
    "img.productimage"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector("img.productimage").alt = product.id;

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }

  if (product.discount) {
    copy.querySelector("p.hidden").classList.remove("hidden");
    copy.querySelector(".price").textContent =
      product.price - product.price * (product.discount / 100) + " DKK";
  }

  //grab parent
  const parent = document.querySelector("#productGrid");

  //append
  parent.appendChild(copy);
}
