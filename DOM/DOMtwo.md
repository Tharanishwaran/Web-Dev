
# DOM Mastery Notes

## Lesson 1: Introduction to the DOM

### 1. Root Node of the DOM Tree
- The **true root** is the `document` object, not `<html>`.
- Structure:
```
document
  └── html
       ├── head
       └── body
```

### 2. JavaScript Object That Gives Access to the DOM
- The `document` object provides full access to the DOM.
- Examples:
```js
document.querySelector()
document.getElementById()
document.createElement()
```

### 3. document.body.children
- Returns a **live HTMLCollection** of all child elements inside `<body>`.
- Example:
```html
<body>
  <h1>Hello</h1>
  <p>World</p>
</body>
```
```js
document.body.children
// HTMLCollection(2) [h1, p]
```

---

## Lesson 2: Selecting Elements in the DOM

### 1. getElementById(id)
Selects an element by its ID.
```js
const titleEl = document.getElementById("title");
console.log(titleEl.textContent);
```

### 2. querySelector(selector)
Selects the **first** element matching the CSS selector.
```js
const infoEl = document.querySelector(".info");
console.log(infoEl.textContent);
```

### 3. querySelectorAll(selector)
Selects **all** elements matching the CSS selector, returns a NodeList.
```js
const allItems = document.querySelectorAll("li");
allItems.forEach(item => console.log(item.textContent));
```

### Difference between querySelector and querySelectorAll:
- `querySelector` → **S for Single** (first match only).
- `querySelectorAll` → All matches in a NodeList.

### Why use querySelector if getElementById exists?
- Works with ANY CSS selector: `.class`, `tag`, `[attribute=value]`, etc.
- More versatile for complex queries.

---

## Lesson 3: Styling Elements

You can change an element's styles directly in JavaScript using the `.style` property.

```js
element.style.color = "blue";
element.style.backgroundColor = "lightgray";
element.style.fontSize = "2rem";
```

⚠️ Use camelCase for CSS properties in JS:
- `backgroundColor` ✅
- `background-color` ❌

### Example:
```js
const title = document.getElementById("title");
title.style.color = "blue";
title.style.backgroundColor = "lightgray";
title.style.fontSize = "2rem";
```

### Practice:
```js
const box = document.getElementById("box");
box.style.width = "200px";
box.style.height = "200px";
box.style.border = "2px solid black";
box.style.backgroundColor = "yellow";
```