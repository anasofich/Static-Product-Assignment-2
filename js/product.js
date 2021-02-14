const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

const url = "https://kea-alt-del.dk/t7/api/products/" + id;
//fetch data
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    showProduct(data);
  });

//populate the page
function showProduct(product) {
  console.log(product);
  document.querySelector(".breadcrumbs .category").textContent =
    product.category;
  document.querySelector(".breadcrumbs .productname").textContent =
    product.productdisplayname;
  document.querySelector(
    "img.productimage"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  document.querySelector("img.productimage").alt = product.id;
  document.querySelector("h2").textContent = product.productdisplayname;
  document.querySelector(".price").textContent = product.price + " DKK";
  document.querySelector(".hidden").textContent = product.price + " DKK";
  if (product.soldout) {
    document.querySelector("#productBox").classList.add("soldOut");
  }

  if (product.discount) {
    document.querySelector("h3.hidden").classList.remove("hidden");
    document.querySelector(".price").textContent =
      product.price - product.price * (product.discount / 100) + " DKK";
  }
  document.querySelector(".brandName").textContent = product.brandname;
  document.querySelector(".colorProduct").textContent = product.basecolour;
  document.querySelector(".productionYear").textContent =
    product.productionyear;
}
