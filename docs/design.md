# Design & CSS

For our styles, we're using SCSS and CSS modules, which you can activate by adding the `lang="scss"` and `module` attributes to style tags in Vue components:

```html
<style lang="scss" module>
  /* Styles go here */
</style>
```

## SCSS

SCSS is a superset of CSS, meaning any valid CSS is _also_ valid SCSS. This allows you to easily copy properties from other sources, very much in the CodePilot.ai spirit. 😄 It also means you can stick to writing the CSS you're still comfortable with while you're learning to use more advanced SCSS features.

I specifically recommend reading about:

* [Variables](http://sass-lang.com/guide#topic-2)
* [Nesting](http://sass-lang.com/guide#topic-3)
* [Operators](http://sass-lang.com/guide#topic-8)

Just those features cover at least 95% of use cases.

## Importing global modules

To import files from `node_modules` using aliases, Webpack's [css-loader](https://github.com/webpack-contrib/css-loader) requires adding `~` to the beginning of a module name to denote that it's an global (not relative) file reference. For example:

```scss
@import '~font-awesome/scss/font-awesome';
```

## Design variables and tooling

All our [variables](https://sass-lang.com/guide#topic-2), [placeholder classes](https://sass-lang.com/guide#topic-7), [mixins](https://sass-lang.com/guide#topic-6), and other design tooling are in the `src/design` folder. Each of these files define variables, prefixed with the name of the file, then combined in `src/design/index.scss`. This combined file is aliased as `@design` for convenience and can be imported into SCSS using:

```scss
@import '~@design';
```

This makes all our design variables available in your component or SCSS file.

> NOTE: The `src/design` folder should never contain code that compiles to actual CSS, as that CSS would be duplicated across every component the file is imported into.

## CSS modules

As mentioned earlier, every Vue component should be a CSS module. That means the classes you define are not _actually_ classes. When you write:

```html
<style lang='scss' module>
.inputLabel {
  /* ... */
}

.input {
  /* ... */
}
</style>
```

You're actually defining values on a `$style` property of the Vue instance such as:

```js
$style: {
  inputLabel: 'base-input_inputLabel__3EAebB_0',
  input: 'base-input_input__3EAebB_1'
}
```

These values contain automatically generated classes with:

* the filename of the component
* the name of the class
* a random hash

Do you know what that means?! You can _never_ accidentally write styles that interfere with another component. You also don't have to come up with clever class names, unique across the entire project. You can use class names like `.input`, `.container`, `.checkbox`, or whatever else makes sense within the isolated scope of the component - just like you would with JavaScript variables.

## Sharing SCSS variables with JavaScript

If you ever need to expose the value of an SCSS variable to your JavaScript, you _can_ with CSS module exports! For example, assuming you have this variable defined:

```scss
$size-grid-padding: 1.3rem;
```

You could import our design tooling, then use CSS modules' `:export` it:

```html
<style lang="scss" module>
@import '~@design';

:export {
  grid-padding: $size-grid-padding;
}
</style>
```

Then you can access the value using `this.$style['grid-padding']`.

If you need access from outside a Vue component (e.g. in a Vuex module), you can do so in `src/design/index.scss`. See that file for specific instructions.

## Global CSS

Typically, only [`src/app.vue`](src/app.vue) should ever contain global CSS and even that should only include base element styles and utility classes (e.g. for grid management).

## Linting & formatting

This project uses Stylelint and Prettier to eliminate errors and formatting inconsistencies. See [linting.md](linting.md) for details.

## FAQ

**Why use SCSS instead of plain CSS or another CSS preprocessor?**

CSS preprocessors offer a lot of additional power - just having a browser-independent way to use variables is invaluable. But SCSS has some other advantages over competing preprocessors:

* SCSS it a superset of CSS, which means:
  * You can copy and paste valid CSS into SCSS and it will always be valid.
  * There's a gentler learning curve, as devs can write the same CSS they're used to, gradually incorporating more SCSS features as they're needed.
* It's well-supported by both Stylelint and Prettier, eliminating nearly all arguments over code style.
