const iconleftFeater = document.getElementsByClassName("iconleftFeater")[0];
const iconRigthFeater = document.getElementsByClassName("iconRigthFeater")[0];
const images = document.getElementsByClassName("imageJumbo")[0];
const textHeadJumboElement =
  document.getElementsByClassName("textHeadJumbo")[0];
const textJumboElement = document.getElementsByClassName("textJumbo")[0];

const imageJumbo = ["pangsit2.png", "pangsit1.png"];
const textHeadJumbo = ["pangsit", "mie dower"];
const textJumbo = [
  `"makanan yang dibuat dengan membungkus daging cincang dalam selembar adonan yang terbuat dari tepung. Pangsit sendiri merupakan salah satu kuliner Tionghoa yang dianggap representatif karna isiannya memiliki makna budaya"`,
  `"Perpaduan rasa pedas dari cabai dan gurih dari kaldu ayam, Packaging design yang menarik. Mie pangsit dower bisa dinikmati kapan saja dan di mana saja, cocok untuk yang suka mie pangsit yang enak."`,
];
let nomorJumboSlide = 0;
iconRigthFeater.addEventListener("click", function () {
  console.log(textHeadJumboElement);
  nomorJumboSlide++;
  function slide(index) {
    images.classList.add("fade");
    textHeadJumboElement.classList.add("fade-out-text");
    setTimeout(function () {
      images.src = `static/${imageJumbo[index]}`;
      textHeadJumboElement.innerHTML = `${textHeadJumbo[index]}`;
      textJumboElement.innerHTML = `${textJumbo[index]}`;
      images.style.animation = "fade-out 1s";
      textHeadJumboElement.classList.remove("fade-out-text");
      images.classList.remove("fade");
      setTimeout(() => {
        images.style.animation = "";
      }, 1000);
    }, 600);
  }
  if (nomorJumboSlide < imageJumbo.length) {
    slide(nomorJumboSlide);
  } else {
    nomorJumboSlide = 0;
    slide(nomorJumboSlide);
  }
  console.log(nomorJumboSlide);
});

iconleftFeater.addEventListener("click", function () {
  nomorJumboSlide--;
  function slide(index) {
    images.classList.add("fade");
    textHeadJumboElement.classList.add("fade-out-text");
    setTimeout(function () {
      images.src = `static/${imageJumbo[index]}`;
      textHeadJumboElement.innerHTML = `${textHeadJumbo[index]}`;
      textJumboElement.innerHTML = `${textJumbo[index]}`;
      images.style.animation = "fade-out 1s";
      textHeadJumboElement.classList.remove("fade-out-text");
      images.classList.remove("fade");
      setTimeout(() => {
        images.style.animation = "";
      }, 1000);
    }, 550);
  }

  if (nomorJumboSlide < 0) {
    nomorJumboSlide = imageJumbo.length - 1;
    slide(nomorJumboSlide);
    console.log("oke");
  } else {
    slide(nomorJumboSlide);
  }
  console.log(nomorJumboSlide);
});
