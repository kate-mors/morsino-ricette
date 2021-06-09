const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    ingredients: "flour, milk, eggs",
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    ingredients: "some super tasty thing",
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    ingredients: "milk, ice",
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    ingredients: "bread & butter",
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    ingredients: "eggs",
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    ingredients: "bisquits",
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    ingredients: "bacon, eggs",
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    ingredients: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    ingredients: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    ingredients: 39.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const getData = function () {
  return fetch(
    "https://sheet.best/api/sheets/1a4aae65-a4ce-4b44-b99e-19896f0a2f37"
  )
    .then((response) => response.json())
    .then((data) => {
      const ricette = [...data];
      displayMenuItems(ricette);
      displayMenuBtns(ricette);
    });
};

// get parent element
const sectionCenter = document.querySelector(".section-center");
const containerBtns = document.querySelector(".btn-container");

const displayMenuItems = function (items) {
  let displayMenu = items.map(function (item) {
    return `<article class="ricetta">
              <div class="article-top">
                <img src=${item.img} alt=${item.title} class="photo" />
                <header>
                  <ul class="item-tags">
                    <li>${item.category}</li>
                  </ul>
                  <h3 class="item-name">
                    <a class="item-opener">${item.title}</a>
                  </h3>
                  <div class="item-data">
                    <h4 class="item-ingredients-number">${item.ingtotale}</h4>
                    <h4 class="item-portions-number">${item.porzioni}</h4>
                    <h4 class="item-cooking-time">${item.tempo}</h4>
                  </div>
                </header>
              </div>
              <div class="article-bottom opened">
                <dl class="item-ingreduents-list">
                  <div>
                    <dt>${item.ingnome}</dt>
                    <dd>${item.ingnum}</dd>
                  </div>
                </dl>
                <p class="item-text">
                  ${item.desc}
                </p>
              </div>
            </article>`;
  });

  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
};

const displayMenuBtns = function (items) {
  const categories = items.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["tutto"]
  );

  const categoryBtns = categories
    .map(function (category) {
      return `<button type="button" class="filter-btn" data-id=${category}>${category}</button>`;
    })
    .join("");

  containerBtns.innerHTML = categoryBtns;

  // filter items
  const filterBtns = containerBtns.querySelectorAll(".filter-btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory = items.filter(function (menuItem) {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        displayMenuItems(items);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
};

// load items
window.addEventListener("DOMContentLoaded", function () {
  getData();
});

const body = document.querySelector("body");
const itemBottom = document.querySelector(".article-bottom");

body.addEventListener("click", function (event) {
  if (event.target.matches(".item-opener")) {
    console.log(event.target);
    itemBottom.classList.toggle("opened");
  }
});
