# DOM Mastery – Lesson 1 Notes

## 🧠 What is the DOM?

DOM stands for **Document Object Model**. It is a programming interface provided by the browser that allows JavaScript to interact with and manipulate the HTML structure.

- When a browser loads an HTML page, it creates a **tree-like structure** (DOM Tree) representing the document.
- Each HTML tag becomes a **node** in the tree.
- JavaScript accesses this tree through the **`document`** object.

---

## 🌳 DOM Tree Analogy

The DOM structure looks like a family tree:

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        └── p
```

- `document` is the **root** JavaScript object.
- `<html>` is the root HTML element, child of `document`.

---

## 🛠️ What Can You Do with the DOM?

Using JavaScript, you can:
- Change content: `element.textContent`, `element.innerHTML`
- Change style: `element.style`
- Create elements: `document.createElement()`
- Remove elements: `element.remove()`
- Access elements: `document.querySelector()`, etc.
- Listen for events: `element.addEventListener()`

---

## ✅ Practice Tasks

### 1. Inspect the DOM
- Open any webpage
- Right-click → Inspect → Elements tab
- View the live DOM tree

### 2. Use the Console
```js
document.body
document.title
document.body.children
```

---

## 💡 Quiz

1. **What is the root node of the DOM tree?**
   - ✅ `document` (not `<html>`)
2. **What JavaScript object gives access to the DOM?**
   - ✅ `document`
3. **What happens when you write `document.body.children`?**
   - ✅ Returns an HTMLCollection of all the child elements inside `<body>`

---

## ❓ Bonus: How is `document` created without writing JS?

- The browser automatically creates the `document` object as it loads an HTML file.
- It parses the HTML → builds the DOM → creates the `document` object.
- Even without writing any JS, you can access `document` in the console.
