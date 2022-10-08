# Dsign2
Reborn dsign with more better features.
```html
<p class="hover:color-green">Hover me to change color</p>
<p class="#color-red">This text is red when dark mode is enabled</p>
```

# Installation
```js
<script src="https://cdn.jsdelivr.net/gh/dlvdls18/Dsign2@main/src/dsign2.js"></script>
```

# Migration
Steps to migrate from [Dsign](https://github.com/dlvdls18/Dsign) to Dsign2.

- Dsign2 **removed the template feature** which is you cannot create your template however, **template feature will be added again soon** with better and easy usage. **If you use template, you need to**
  1. Remove the `Dsign(...)` function you have used
  2. Remove the `data-dsign` attributes
  3. You need to manually add the template in every elements that uses templates (optional)
- Remove Dsign script
  1. To prevent style conflict between Dsign and Dsign2, remove the Dsign script

And now you are done!

# What's New
Difference between Dsign and Dsign2.

|Feature|Dsign|Dsign2|
|:-----:|:---:|:----:|
|Classes|✓|✓|
|Attributes|✓|✓|
|Template|✓| |
|Dark Mode| |✓|
|Accurate Property Selection| |✓|
|Selectors| |✓|
|Pseudo-selectors| |✓|
|Suffix safe usage| |✓|
|Automatic reload| |✓|

---

New features in Dsign2 with descriptions.

## Dark Mode
You can now use two different styles, light and dark.

## Accurate Property Selection
```
Example class:
list-style-type-none
```
As you can see, `list-style-type` is the property while `none` is the value.
Dsign is lazy which is the first property to find, is the property to be added.

> I don't understand.

Basically, this class can result a bug.

Dsign will read it as:
```
list-style: type-none;
```

while Dsign2 will read it as:
```
list-style-type: none;
```

> But why?

As i said, the first property to match, is the property to be added.
Which means Dsign automatically selects `list-style` since it is the first one before `list-style-type`.

**Dsign does not check if the selected property is right.**

But in Dsign2, it will check until the loop is done.

## Selectors
Since style attributes and style prototype does not support selectors,
I use a style element instead, which support selectors.

For example, I want to make a text that turns red when hovered.
I can simply type:
```html
<p class="hover:color-red">Hello, World</p>
```

> What if my color is **rgb**?

Use attribute instead.
```html
<p hover:color="rgb(255, 0, 0)">Hello, World</p>
```

## Pseudo-selectors
Again,
style element supports both selectors and pseudo-selectors.

```html
<input type="text" placeholder="Red" class="placeholder::color-red">
```

## Suffix safe usage
Properties with suffixes `--blahblah` is now supported in Dsign2.
Dsign does not support it so it can caused a bug or it may not work,
but with Dsign2, you can use suffixes without length limit. `--hello-world`

## Automatic relaod
In Dsign, you need to manually call the function `Dsign` to reload all the styles,
but in Dsign2, it is automatic using `requestAnimatiomFrame`.

> Dsign2 is not even an animation

Yeah, but recalling the same function will cause **recursion**.
Even though it is for animation, We can still use it for anything.

# Features coming soon
## Template
So no DRY.

## Shortcut keywords
Instead of `text-align-center`,
Why don't we use `x-gn-center`?
I'm gonna implement this soon.

# Documentations
## Styling with classes
To style your element, use this pattern:
```
property-value
```
Don't worry, properties with hypens will be safe as long as accurate selection is accurate.

For example:
```
<!-- without Dsign2 -->
<p style="color:red; text-align:center">Bad</p>
<!-- with Dsign2 -->
<p class="color-red text-align-center">Good</p>
```

### Using selectors and pseudo-selectors
Use these patterns:
```
selector:property-value
pseudo-selector::property-value
```
which will be converted to
```css
...:selector { property: value }
...::pseudo-selector { property: value }
```

### Using dark mode
Use these patterns:
```
#property-value
#selector:property-value
#pseudo-selector::property-value
```
If dark mode is disabled, these properties will not be applied.
Same way with light mode.

## Styling with attributes
To style with attributes, use this pattern:
```
property="value"
```

### Using selectors and pseudo-selectors
Use these patterns:
```
selector:property="value"
pseudo-selector::property="value"
```

### Using dark mode
Use these patterns:
```
#property="value"
#selector:property="value"
#pseudo-selector::property="value"
```

## Enabling and Disabling dark mode
Modify the variable `Dsign2.isDark` with boolean.
If the value is not a boolean, it can cause an error.

# ...
Yeah, it's a long gap, I did not post 3 months ago, and now, I have a new idea which is this (Dsign Reborn).
Bye, thanks for using my repository!
