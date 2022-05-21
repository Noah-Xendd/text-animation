# NEI Animation

A simple, light-weight text animation package to animate each word separately on scroll visibility. 

[![Image from Gyazo](https://i.gyazo.com/7660e613bce8596989375d81818b2033.gif)](https://gyazo.com/7660e613bce8596989375d81818b2033)
## Usage 


### Require the script and css file
```js
// require package
var NeiAnimation = require('nei-animation');

// Require css styling
import 'nei-animation/style.css'
```

### Add the `data-nei="animate"` to any element you wish to animate
```html
<h1 data-nei="animate">This sentence will be animated word for word.</h1>
```


### Initiate the NeiAnimation class
```html
<script>
let animate = new NeiAnimation({
    wordAppearSpeed: 70 // Speed in ms, optional
});
</script>

```