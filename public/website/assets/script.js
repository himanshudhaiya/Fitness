const acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    const panel = this.nextElementSibling;

    if (panel.style.display == "block") {
      panel.style.display = "none";
      this.parentElement.style.border = "1px solid #a7a7a7";
    } else {
      panel.style.display = "block";
      this.parentElement.style.border = "1px solid #27648a";
    }
  });
}

let items = document.querySelectorAll(".carousel .carousel-item");

items.forEach((el) => {
  const minPerSlide = 4;
  let next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const fitnessImages = [
  {
    id: 1,
    src: "/website/assets/images/fitness.png",
    alt: "fitness1",
  },
  {
    id: 2,
    src: "/website/assets/images/fitness2.jpg",
    alt: "fitness2",
  },
  {
    id: 3,
    src: "/website/assets/images/fitness3.jpg",
    alt: "fitness3",
  },
  {
    id: 4,
    src: "/website/assets/images/fitness4.jpg",
    alt: "fitness4",
  },
  {
    id: 5,
    src: "/website/assets/images/fitness5.jpg",
    alt: "fitness5",
  },
  {
    id: 6,
    src: "/website/assets/images/fitness6.jpg",
    alt: "fitness6",
  },
];

const featureList = document.querySelector(".features-list");
// console.log(featureList.children);
const featureItems = featureList.children;
const imageBox = document.querySelector(".feature-image-box");

const dotContainer = document.querySelector(".dot-container");
const dots = dotContainer.children;
console.log(dots);

let j, p;

for (j = 0; j < featureItems.length; j++) {
  featureItems[j].addEventListener("click", function () {
    // console.log(this.classList);
    if (this.classList.contains("feature-item")) {
      this.classList.remove("feature-item");
      this.classList.add("feature-item-selected");
    }

    for (let k = 0; k < featureItems.length; k++) {
      if (
        featureItems[k].classList.contains("feature-item-selected") &&
        !featureItems[k].isSameNode(this)
      ) {
        featureItems[k].classList.remove("feature-item-selected");
        featureItems[k].classList.add("feature-item");
        if (dots[k].classList.contains("dot-filled")) {
          dots[k].classList.remove("dot-filled");
          dots[k].classList.add("dot");
        }
      } else if (
        featureItems[k].classList.contains("feature-item-selected") &&
        featureItems[k].isSameNode(this)
      ) {
        imageBox.innerHTML = `<img class="img-fluid" src="${fitnessImages[k].src}" alt="${fitnessImages[k].alt}">`;
        dots[k].classList.remove("dot");
        dots[k].classList.add("dot-filled");
      }
    }
  });
}

// slider
