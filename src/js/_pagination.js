customElements.define(
  "app-paginator",
  class extends HTMLElement {
    get current() {
      return this.getAttribute("current");
    }

    get hrefs() {
      return JSON.parse(
        '["' + this.getAttribute("hrefs").replaceAll(",", '","') + '"]'
      );
    }

    constructor() {
      super();

      let template = document.getElementById("app-paginator").content;
      let template2 = document.getElementById("previous-template").content;

      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.cloneNode(true));
      shadowRoot.appendChild(template2.cloneNode(true));
    }

    connectedCallback() {
      console.log(this.current);
      console.log(this.hrefs);

      this.#createPaginator();
    }

    #createPaginator() {
      let slots = this.#getSlots();
      // this.#setupSlots(slots);
    }

    #setupSlots(slots) {
      let isPrevious = this.current > 0;
      console.log(slots.previous)
      if (isPrevious) {
        slots.previous.firstChild.href = this.hrefs[this.current - 1];

        let before = slots.inactive.cloneNode(true);
        before.firstChild.href = this.hrefs[this.current - 1];
        before.firstChild.textContent = this.current - 1;
      }

      slots.active.firstChild.href = this.hrefs[this.current];
      slots.active.firstChild.textContent = this.current;

      let isNext = this.current < this.hrefs.length;
      if (isNext) {
        slots.next.firstChild.href = this.hrefs[this.current + 1];

        let after = slots.inactive.cloneNode(true);
        after.firstChild.href = this.hrefs[this.current + 1];
        after.firstChild.textContent = this.current + 1;
      }

      let isDotDotDotBefore = this.current > 2;
      let isDotDotDotAfter = this.hrefs.length - this.current > 2;

      if (isPrevious) slots.nav.appendChild(slots.previous);
      if (isDotDotDotBefore) slots.nav.appendChild(slots.dotdotdot);
      if (isPrevious) slots.nav.appendChild(before);
      slots.nav.appendChild(slots.active);
      if (isNext) slots.nav.appendChild(after);
      if (isDotDotDotAfter) slots.nav.appendChild(slots.dotdotdot);
      if (isNext) slots.nav.appendChild(slots.next);
    }

    #getSlots() {
        console.log(this.shadowRoot.getElementById("previous-a"))
        console.log(document.getElementById("previous-a"))
      let nav = this.shadowRoot.getElementById("nav");
      let previous = this.shadowRoot.getElementById("previous");
      let next = this.shadowRoot.getElementById("next");
      let active = this.shadowRoot.getElementById("active");
      let inactive = this.shadowRoot.getElementById("inactive");
      let dotdotdot = this.shadowRoot.getElementById("dotdotdot");

      previous.remove();
      next.remove();
      active.remove();
      inactive.remove();
      dotdotdot.remove();

      return {
        nav,
        previous,
        next,
        active,
        inactive,
        dotdotdot,
      };
    }

    #appendButton(container, number, href) {
      // let x = this.shadowRoot.getElementById('abc');
      // x.remove();
      // console.log(x)
      // let template = document.getElementById("previous-template").content;
      //
      // // container.appendChild(template.cloneNode(true));
      // container.appendChild(x);
      // const a = document.createElement('a');
      // a.href = href;
      // a.classList = "text-red-300"
      // a.textContent = number+1;
      // container.appendChild(a);
    }
  }
);
