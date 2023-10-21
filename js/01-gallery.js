import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");

galleryRef.addEventListener("click", onCurrentImgClick);

setGallery(galleryItems);

function createItem({ preview, original, description }) {
  return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>`;
}

function setGallery(galleryItems) {
  galleryRef.innerHTML = galleryItems
    .map((galleryItem) => {
      return createItem(galleryItem);
    })
    .join("");
}

function onCurrentImgClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img class="gallery__image-big" src="${event.target.dataset.source}">`,
    {
      onShow: () => window.addEventListener("keydown", onKeydownEsc),
      onClose: () => window.removeEventListener("keydown", onKeydownEsc),
    }
  );

  const onKeydownEsc = (event) => {
    if (event.code === "Escape") {
      instance.close();
    }
  };

  instance.show();
}

console.log(galleryItems);
