let container = document.getElementById("app-paginator");

let hrefs = JSON.parse(
  '["' + container.getAttribute("hrefs").replaceAll(",", '","') + '"]'
);
console.log(hrefs)

let current = +container.getAttribute("current");


let nav = document.getElementById('t-nav').content;
let previous = document.getElementById('t-previous').content;
let active = document.getElementById('t-active').content;
let inactive = document.getElementById('t-inactive').content;
let dotdotdot = document.getElementById('t-dotdotdot').content;
let next = document.getElementById('t-next').content;


let isPrevious = current > 0;
if (isPrevious) {
  previous.children[0].children[0].href = hrefs[current - 1];

  var before = inactive.cloneNode(true);
  before.children[0].id = "before";
  before.children[0].children[0].href = hrefs[current - 1];
  before.children[0].children[0].textContent = current;
}

active.children[0].children[0].href = hrefs[current];
active.children[0].children[0].textContent = current +1;

let isNext = current < hrefs.length -1;
if (isNext) {
  next.children[0].children[0].href = hrefs[current + 1];
  
  var after = inactive.cloneNode(true);
  after.children[0].id = "after";
  after.children[0].children[0].href = hrefs[current + 1];
  after.children[0].children[0].textContent = current + 2;
}

let isDotDotDotBefore = current > 2;
let isDotDotDotAfter = hrefs.length - current > 2;

if (isPrevious) nav.children[0].appendChild(previous);
if (isDotDotDotBefore) nav.children[0].appendChild(dotdotdot);
if (isPrevious) nav.children[0].appendChild(before);
nav.children[0].appendChild(active);
if (isNext) nav.children[0].appendChild(after);
if (isDotDotDotAfter) nav.children[0].appendChild(dotdotdot);
if (isNext) nav.children[0].appendChild(next);

container.appendChild(nav.cloneNode(true));


document.getElementById('before')?.addEventListener("click", () => {
    window.location.href = hrefs[current - 1];
});

document.getElementById('after')?.addEventListener("click", () => {
    window.location.href = hrefs[current + 1];
});

document.getElementById('previous')?.addEventListener("click", () => {
    window.location.href = hrefs[current - 1];
});

document.getElementById('next')?.addEventListener("click", () => {
    window.location.href = hrefs[current + 1];
});