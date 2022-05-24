# NEI Animation

A simple, light-weight text animation package to animate each word separately or animate html elements on scroll visibility. A perfect way to make any website look more professional and modern. 

*This package is in beta, new features and updates will come.*

[![Image from Gyazo](https://i.gyazo.com/7660e613bce8596989375d81818b2033.gif)](https://gyazo.com/7660e613bce8596989375d81818b2033)

# Installation
You can either download the package files via GitHub or use the following command:
```js
npm i nei-animation
```

## Usage 

### Require the script and css file
```js
// Require package
var NeiAnimation = require('nei-animation');

// Require css styling
import 'nei-animation/style.css'
```

### Add data attributes
The main attribute is the `data-nei` attribute, here you define what animation you want upon visibility (see animation attributes):

```html
<h1 data-nei="show-text">This sentence will be animated word for word.</h1>
```

### Initiate the NeiAnimation class
```html
<script>
let animate = new NeiAnimation({
    wordAppearSpeed: 70 // Speed in ms, optional
});
</script>

```
# Attributes

All available attributes
| Attribute    | Example                | Usage                     |
|--------------|------------------------|---------------------------|
| `data-nei`   | `data-nei="show-text"` | Set the desired animation |
| `data-delay` | `data-nei-delay="200"` | Set delay in miliseconds  |

## Animation attributes
These are the attribute values that can be used for the `data-nei` attribute:

| Attribute | Example                | Usage                            |
|-----------|------------------------|----------------------------------|
| show-text | `data-nei="show-text"` | Animates text word for word      |
| fade-up   | `data-nei="fade-left"` | Animates element from left       |
| fade-left | `data-nei="fade-up"`   | Animates element from down to up |

# Issues

Feel free to report any issues on GitHub [here](https://github.com/Noah-Xendd/text-animation/issues).

# Discord

Join the discord server to ask for help, report fixes or suggest new features.

[![Discord](https://ps.w.org/wp-discord-post/assets/icon-256x256.png?rev=1641166)](https://discord.gg/WgvfWJGZkR)