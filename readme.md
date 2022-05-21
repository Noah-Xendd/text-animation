# NEI Animation

A simple, light-weight text animation package to animate each word separately on scroll visibility. 

[![Image from Gyazo](https://i.gyazo.com/7660e613bce8596989375d81818b2033.gif)](https://gyazo.com/7660e613bce8596989375d81818b2033)
# Usage 

```html
<h1 id="title1">This sentence will be animated word for word.</h1>
```

```html
<script>
let animate = new NeiAnimation({
    elements: ['#title'], // Each element that needs to animate when visible to user.
    wordAppearSpeed: 70 // Speend in ms, optional
});
</script>

```