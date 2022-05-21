class NeiAnimation {

  constructor(settings) {

    this.settings = settings;
    this.foundElements = [];

    // Get instance of class (to load methods in anonymous functions)
    let self = this;

    // Load initial startup (no scroll yet)
    this.handleScroll()

    // Set global eventlistener on scroll
    window.addEventListener('scroll', function() {

      self.handleScroll()
    });
  }


  // Handle the scrol
  // Go through all elements to check if one is visible
  handleScroll() {
    // let elements = this.settings.elements;
    let self = this;
    let elements = document.querySelectorAll('[data-nei="animate"]');
    
    elements.forEach((element) => {
     
      let el = element;
      
      self.isVisible(el)
    })
  }

  isVisible(el) {
    let self = this;

    // Check if visible or not
    const observer = new IntersectionObserver((entries) => {

      // Element is visible to user
      if (entries[0].isIntersecting) {

        self.showElement(el);
      } else {

      }
    });

    // Observe the current element
    observer.observe(el);
  }


  // Show the element when visible
  // Add class to prepare for scroll animation
  showElement(el) {

    el.classList.add('animate_scroll')

    this.disectSentence(el);
  }

  // Check if element is animated by checking if class
  // 'animate_sentence' has already been added.
  checkIfSentenceAlreadyAnimated(el) {
    if (el.getElementsByClassName('animate_sentence')[0]) {
      return true;
    } else {

      return false
    }
  }

  // Disect the sentence to make each word have scroll animation
  disectSentence(el) {

    if (this.checkIfSentenceAlreadyAnimated(el)) return;

    el.style.position = "relative";

    // Set current height before absolute
    let height = el.clientHeight;
    el.style.height = height + "px";

    let sentence = el.outerHTML;

    const parser = new DOMParser();
    const s = parser.parseFromString(sentence, 'text/html');
    let words = [];


    for (let ell of s.body.firstChild.childNodes) {
      if (ell.nodeType == 3 /* TEXT_NODE */) {
        words = words.concat(ell.nodeValue.trim().split(' ').filter(Boolean));
      }
      else if (ell.nodeType == 1 /* ELEMENT_NODE */) {
        words.push(ell.outerHTML);
      }
    }

    let newSentence = '<div class="animate_container">';

    
    // Go through each word and add a span with individual class
    words.forEach((word, key) => {

      // Second last word does not need space because of full-stop
      if (this.settings.seperatedFullStop == true) {
        if (Object.is(words.length - 2, key)) {
          var updatedWord = `<span class="animate_word_preperation">${word}</span>`;
         
        } else {
          var updatedWord = `<span class="animate_word_preperation">${word}</span> `;
        }
      } else if (this.settings.seperatedFullStop == false) {

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

    this.animateElement(el);
  }

  // Animate the element by adding classes to each word
  async animateElement(el) {

    // Adding global class to the whole sentence to create lift effect

    el.childNodes[0].classList.add('animate_sentence');

    let self = this;
    let wordAppearSpeed = this.settings.wordAppearSpeed ?? 60;

    // Cycle through each word in the sentence to add class with animation
    for (let i = 0; i < el.childNodes[0].childNodes.length; i++) {
      await new Promise(r => setTimeout(r, wordAppearSpeed));

      if (el.childNodes[0].childNodes[i].className == "animate_word_preperation") {
    
        el.childNodes[0].childNodes[i].classList.add("animate_word_1")
        el.childNodes[0].childNodes[i].style.top = "0px";

        self.foundElements.push(el.id)
      }
    }
  }
}


module.exports = NeiAnimation;