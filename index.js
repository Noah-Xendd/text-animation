/*
    Author: Noah Imamkhan.
    Package name: nei-animation
    Version: 1.0.28
    GitHub link: https://github.com/Noah-Xendd/text-animation
*/

class NeiAnimation {
  constructor(settings) {
    this.settings = settings;
    this.foundElements = [];

    // Get instance of class (to load methods in anonymous functions)
    let self = this;

    // Load initial startup (no scroll yet)
    this.handleScroll();

    // Set global eventlistener on scroll
    window.addEventListener("scroll", function () {
      self.handleScroll();
    });
  }

  // Handle the scroll
  // Go through all elements to check if one is visible
  handleScroll() {
    let self = this;
    let textAnimationElements = document.querySelectorAll('[data-nei="show-text"]');
    let tiltAnimationElements = document.querySelectorAll('[data-nei="tilt"]');
    let fadeUpAnimationElements = document.querySelectorAll('[data-nei="fade-up"]');
    let fadeLeftAnimationElements = document.querySelectorAll('[data-nei="fade-left"]');

    if (textAnimationElements) {
      textAnimationElements.forEach((element) => {
        let el = element;

        self.isVisible(el, "showText");
      });
    }

    if (tiltAnimationElements) {
      tiltAnimationElements.forEach((element) => {
        let el = element;

        self.isVisible(el, "tilt");
      });
    }

    if (fadeUpAnimationElements) {
      fadeUpAnimationElements.forEach((element) => {
        let el = element;

        self.isVisible(el, "fadeUp");
      });
    }

    if (fadeLeftAnimationElements) {
      fadeLeftAnimationElements.forEach((element) => {
        let el = element;

        self.isVisible(el, "fadeLeft");
      });
    }
  }

  isVisible(el, type) {
    let self = this;

    // Check if visible or not
    const observer = new IntersectionObserver((entries) => {
      // Element is visible to user
      if (entries[0].isIntersecting) {
        if (type == "showText") {
          self.showTextAnimationElement(el);
        } else if (type == "tilt") {
          self.showTiltAnimationElement(el);
        } else if (type == "fadeUp") {
          self.showFadeUpAnimationElement(el);
        } else if (type == "fadeLeft") {
          self.showFadeLeftAnimationElement(el);
        }
      } else {
      }
    });

    // Observe the current element
    observer.observe(el);
  }

  // Show the element when visible
  // Add class to prepare for scroll animation
  showTextAnimationElement(el) {
    if (this.checkIfSentenceAlreadyAnimated(el) == true) {
      return;
    } else {
      el.setAttribute("data-nei-animation-id", Math.floor(Math.random()) * 9); // Needs to be here BEFORE disecting, or it breaks
      this.disectTextAnimationSentence(el);
    }
  }

  showTiltAnimationElement(el) {
    let alreadyAnimated = this.checkIfSentenceAlreadyAnimated(el);
    if (this.checkIfSentenceAlreadyAnimated(el) == true) {
      return;
    }

    el.setAttribute("data-nei-animation-id", Math.floor(Math.random()) * 9);

    this.animateTiltElement(el);
  }

  showFadeUpAnimationElement(el) {
    let alreadyAnimated = this.checkIfSentenceAlreadyAnimated(el);
    if (this.checkIfSentenceAlreadyAnimated(el) == true) {
      return;
    }

    el.setAttribute("data-nei-animation-id", Math.floor(Math.random()) * 9);

    this.animateFadeUpElement(el);
  }

  showFadeLeftAnimationElement(el) {
    let alreadyAnimated = this.checkIfSentenceAlreadyAnimated(el);
    if (this.checkIfSentenceAlreadyAnimated(el) == true) {
      return;
    }

    el.setAttribute("data-nei-animation-id", Math.floor(Math.random()) * 9);

    this.animateFadeLeftElement(el);
  }

  // Check if element is animated by checking if class
  checkIfSentenceAlreadyAnimated(el) {
    if (el.hasAttribute("data-nei-animation-id")) {
      return true;
    } else {
      el.classList.add("hide_animation");
    }
  }

  // Disect the sentence to make each word have scroll animation
  disectTextAnimationSentence(el) {
    el.style.position = "relative";
    el.style.width = "100%";

    // Set current height before absolute
    let height = el.clientHeight;
    el.style.height = height + "px";

    let sentence = el.outerHTML;

    const parser = new DOMParser();
    const s = parser.parseFromString(sentence, "text/html");
    let words = [];

    for (let ell of s.body.firstChild.childNodes) {
      if (ell.nodeType == 3 /* TEXT_NODE */) {
        words = words.concat(ell.nodeValue.trim().split(" ").filter(Boolean));
      } else if (ell.nodeType == 1 /* ELEMENT_NODE */) {
        words.push(ell.outerHTML);
      }
    }

    let newSentence = '<div class="animate_container">';

    let self = this;
    // Go through each word and add a span with individual class
    words.forEach((word, key) => {
      // Second last word does not need space because of full-stop
      if (self.settings.seperatedFullStop == true) {
        if (Object.is(words.length - 2, key)) {
          var updatedWord = `<span class="animate_word_preperation">${word}</span>`;
        } else {
          var updatedWord = `<span class="animate_word_preperation">${word}</span> `;
        }
      } else if (
        self.settings.seperatedFullStop == false ||
        self.settings.seperatedFullStop == undefined ||
        self.settings.seperatedFullStop == null
      ) {
        var updatedWord = `
                <span class="animate_word_preperation">${word}</span>   
            `;
      } else {
        var updatedWord = `
                <span class="animate_word_preperation">${word}</span> 
            `;
      }

      // Append new word to the new sentence
      newSentence += updatedWord;
    });

    newSentence += "</div>";
    el.innerHTML = newSentence;

    this.animateTextElement(el);
  }

  // Animate the element by adding classes to each word
  async animateTextElement(el) {
    el.classList.remove("hide_animation");
    // Adding global class to the whole sentence to create lift effect

    el.childNodes[0].classList.add("animate_sentence");

    let self = this;
    let wordAppearSpeed = this.settings.wordAppearSpeed ?? 60;

    // Cycle through each word in the sentence to add class with animation
    for (let i = 0; i < el.childNodes[0].childNodes.length; i++) {
      await self.sleep(wordAppearSpeed);

      if (el.childNodes[0].childNodes[i].className == "animate_word_preperation") {
        el.childNodes[0].childNodes[i].classList.add("animate_word_1");
        el.childNodes[0].childNodes[i].style.top = "0px";

        self.foundElements.push(el.getAttribute("data-nei-animation-id"));
      }
    }
  }

  async animateTiltElement(el) {
    el.classList.add("prepareTiltAnimation");
    await new Promise((r) => setTimeout(r, 100));

    el.classList.add("tiltAnimation");
  }

  async animateFadeUpElement(el) {
    if (el.hasAttribute("data-nei-delay")) {
      await this.sleep(el.getAttribute("data-nei-delay"));
    }

    el.classList.add("prepareFadeUpAnimation");

    await this.sleep(100);

    el.classList.add("fadeUpAnimation");
  }

  async animateFadeLeftElement(el) {
    if (el.hasAttribute("data-nei-delay")) {
      await this.sleep(el.getAttribute("data-nei-delay"));
    }

    el.classList.add("prepareFadeLeftAnimation");
    await this.sleep(100);

    el.classList.add("fadeLeftAnimation");
  }

  async sleep(ms = 100) {
    await new Promise((r) => setTimeout(r, ms));
  }
}

module.exports = NeiAnimation;
