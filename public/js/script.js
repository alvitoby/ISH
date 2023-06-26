const items = document.querySelectorAll('.item')
const totalItems = items.length
let currentItemIndex = 0
let intervalId

const expand = (item, i) => {
  items.forEach((it, ind) => {
    if (i === ind) return
    it.clicked = false
  })
  gsap.to(items, {
    width: item.clicked ? '15vw' : '8vw',
    duration: 2,
    // ease: 'elastic(1, .6)'
  })

  item.clicked = !item.clicked
  gsap.to(item, {
    width: item.clicked ? '42vw' : '15vw',
    duration: 2.5,
    // ease: 'elastic(1, .3)'
  })
}

const autoExpand = () => {
  const currentItem = items[currentItemIndex]
  expand(currentItem, currentItemIndex)

  currentItemIndex++
  if (currentItemIndex >= totalItems) {
    currentItemIndex = 0
  }
}

const startAutoExpand = () => {
  if (!intervalId) {
    intervalId = setInterval(autoExpand, 4000)
  }
}

const stopAutoExpand = () => {
  clearInterval(intervalId)
  intervalId = null
}

items.forEach((item, i) => {
  item.clicked = false
  item.addEventListener('click', () => {
    stopAutoExpand()
    expand(item, i)
    setTimeout(startAutoExpand, 5000)
  })
})

startAutoExpand()

//-----------
//Our Client
//-----------
document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel-logo-client");
  const cardWidth = carousel.querySelector(".card-logo-client").offsetWidth;
  const dotsContainer = document.querySelector(".dot-pagination");
  
  const images = Array.from(carousel.querySelectorAll(".card-logo-client"));
  const numImages = images.length;
  const numVisibleImages = 2; // Jumlah gambar yang ingin ditampilkan
  
  // Menghitung jumlah titik paginasi yang dibutuhkan
  const numDots = Math.ceil(numImages / numVisibleImages);
  
  const dots = Array.from({ length: numDots }).map(() => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);
    return dot;
  });

  let currentIndex = 0;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${
      currentIndex * cardWidth * numVisibleImages
    }px)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= numDots) {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function previousSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = numDots - 1;
    }
    updateCarousel();
  }

  const leftArrow = document.getElementById("left");
  const rightArrow = document.getElementById("right");

  leftArrow.addEventListener("click", previousSlide);
  rightArrow.addEventListener("click", nextSlide);
});