# 🎯 **COMPLETE DOM MANIPULATION GUIDE**

## 📚 **What is DOM?**
**DOM = Document Object Model**
- It's a tree structure of your HTML page
- JavaScript can manipulate this tree
- Every HTML element is a "node" in the tree

```html
<!-- HTML Structure -->
<html>
  <head>
    <title>Page</title>
  </head>
  <body>
    <h1 id="title">Hello</h1>
    <div class="container">
      <p>Paragraph</p>
    </div>
  </body>
</html>
```

```
DOM Tree:
document
├── html
│   ├── head
│   │   └── title
│   └── body
│       ├── h1 (id="title")
│       └── div (class="container")
│           └── p
```

## 1. **GETTING ELEMENTS**

### **Single Elements**
```javascript
// Get by ID (returns ONE element)
const element = document.getElementById('myId');

// Get by CSS selector (returns FIRST matching element)
const element = document.querySelector('.myClass');
const element = document.querySelector('#myId');
const element = document.querySelector('div');
const element = document.querySelector('div.container p');

// Get specific elements
document.documentElement;    // <html> element
document.head;              // <head> element
document.body;              // <body> element
document.title;             // Page title (string)
```

### **Multiple Elements**
```javascript
// Get ALL elements with class (returns NodeList - like array)
const elements = document.getElementsByClassName('myClass');

// Get ALL elements by tag name
const elements = document.getElementsByTagName('p');

// Get ALL matching CSS selectors (returns NodeList)
const elements = document.querySelectorAll('.myClass');
const elements = document.querySelectorAll('div p');
```

### **Difference Between Methods:**
```javascript
// getElementById() - Fastest, for single elements
// querySelector() - More powerful, uses CSS selectors
// querySelectorAll() - Returns NodeList (not live)
// getElementsByClassName() - Returns HTMLCollection (live)
// getElementsByTagName() - Returns HTMLCollection (live)

// LIVE vs NOT LIVE:
// Live collections update automatically when DOM changes
// NodeList from querySelectorAll is NOT live
```

## 2. **TRAVERSING THE DOM**

### **Moving Up (Parents)**
```javascript
const element = document.querySelector('p');

element.parentElement;              // Direct parent
element.parentNode;                 // Parent node
element.closest('.container');      // Nearest ancestor matching selector

// Example: Find parent with class 'wrapper'
const wrapper = element.closest('.wrapper');
```

### **Moving Down (Children)**
```javascript
const parent = document.querySelector('.container');

parent.children;                    // All child ELEMENTS (HTMLCollection)
parent.childNodes;                  // All child NODES (includes text, comments)
parent.firstElementChild;           // First child element
parent.lastElementChild;            // Last child element
parent.firstChild;                  // First child node
parent.lastChild;                   // Last child node

// Get specific child
parent.children[0];                 // First child element
parent.children[parent.children.length - 1]; // Last child
```

### **Moving Sideways (Siblings)**
```javascript
const element = document.querySelector('.middle');

element.previousElementSibling;     // Previous element sibling
element.nextElementSibling;         // Next element sibling
element.previousSibling;            // Previous node sibling
element.nextSibling;                // Next node sibling

// Skip text nodes (use Element versions)
```

### **Checking Relationships**
```javascript
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

parent.contains(child);             // true if child is inside parent
child.parentElement === parent;     // Check if direct parent
```

## 3. **MODIFYING ELEMENTS**

### **Changing Content**
```javascript
const element = document.getElementById('myElement');

// Text content (recommended)
element.textContent = 'New text';           // Plain text, secure
element.innerText = 'New text';             // Respects CSS, slower
element.innerHTML = '<strong>HTML</strong>'; // Can insert HTML (careful!)

// Value for form elements
inputElement.value = 'New value';
textareaElement.value = 'New text';

// Example
const title = document.querySelector('h1');
title.textContent = 'Welcome to my site!';
```

### **Changing Attributes**
```javascript
const link = document.querySelector('a');

// Get attribute value
const href = link.getAttribute('href');

// Set attribute
link.setAttribute('href', 'https://new-link.com');
link.setAttribute('target', '_blank');
link.setAttribute('data-id', '123');

// Remove attribute
link.removeAttribute('target');

// Check if attribute exists
link.hasAttribute('href');          // true/false

// Data attributes
link.dataset.id;                    // Gets data-id="123"
link.dataset.userRole = 'admin';    // Sets data-user-role="admin"
```

### **Changing Styles**
```javascript
const element = document.querySelector('div');

// Inline styles (adds style="..." attribute)
element.style.color = 'red';
element.style.backgroundColor = 'blue'; // camelCase for CSS properties
element.style.fontSize = '20px';
element.style.display = 'none';
element.style.marginTop = '10px';

// Multiple styles at once
element.style.cssText = 'color: red; background: blue;';

// Get computed style (actual rendered style)
const style = window.getComputedStyle(element);
const color = style.getPropertyValue('color');

// Better: Use CSS classes
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('hidden'); // Adds if missing, removes if present
element.classList.contains('active'); // Check if has class
element.classList.replace('old', 'new');

// Example: Toggle dark mode
const body = document.body;
body.classList.toggle('dark-mode');
```

### **Changing Classes**
```javascript
const element = document.querySelector('div');

// Old way (overwrites all classes)
element.className = 'new-class';                     // Replaces all
element.className += ' additional-class';           // Adds to end

// Modern way (recommended)
element.classList.add('new-class');                  // Add class
element.classList.remove('old-class');               // Remove class
element.classList.toggle('active');                  // Toggle class
element.classList.contains('active');                // Check if has class
element.classList.replace('old', 'new');             // Replace class

// Multiple classes
element.classList.add('class1', 'class2', 'class3');
element.classList.remove('class1', 'class2');
```

## 4. **CREATING ELEMENTS**

### **Creating New Elements**
```javascript
// Create element
const newDiv = document.createElement('div');
const newPara = document.createElement('p');
const newImg = document.createElement('img');
const newButton = document.createElement('button');

// Set properties
newDiv.id = 'myDiv';
newDiv.className = 'container';
newDiv.textContent = 'Hello World';

newImg.src = 'image.jpg';
newImg.alt = 'Description';

newButton.textContent = 'Click me';
newButton.type = 'button';
```

### **Adding to DOM**
```javascript
const parent = document.querySelector('.container');
const newElement = document.createElement('p');
newElement.textContent = 'New paragraph';

// Append at the END
parent.appendChild(newElement);

// Insert at SPECIFIC position
const referenceElement = parent.children[2];
parent.insertBefore(newElement, referenceElement); // Before reference

// Insert at BEGINNING
parent.insertBefore(newElement, parent.firstChild);

// Insert ADJACENT HTML
parent.insertAdjacentHTML('beforebegin', '<p>Before</p>');
parent.insertAdjacentHTML('afterbegin', '<p>First Child</p>');
parent.insertAdjacentHTML('beforeend', '<p>Last Child</p>');
parent.insertAdjacentHTML('afterend', '<p>After</p>');

// Positions:
// beforebegin: Before the element itself
// afterbegin: Inside, before first child
// beforeend: Inside, after last child (same as append)
// afterend: After the element itself
```

### **Cloning Elements**
```javascript
const original = document.querySelector('.item');
const clone = original.cloneNode(true); // true = deep clone (with children)
const shallowClone = original.cloneNode(false); // false = without children

clone.id = 'item2'; // Change ID to avoid duplicate
parent.appendChild(clone);
```

### **Creating with Template Literals**
```javascript
// Fast way to create complex elements
const html = `
  <div class="card">
    <h3>${title}</h3>
    <p>${description}</p>
    <button class="btn">Learn More</button>
  </div>
`;

// Insert into DOM
container.innerHTML = html; // Replaces ALL content
container.insertAdjacentHTML('beforeend', html); // Appends
```

## 5. **REMOVING ELEMENTS**

```javascript
const element = document.querySelector('.remove-me');
const parent = element.parentElement;

// Remove element itself
element.remove(); // Modern way

// Remove through parent (older way)
parent.removeChild(element);

// Remove all children
while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}

// Clear content
parent.innerHTML = ''; // Quick but be careful
parent.textContent = ''; // Safer for text only
```

## 6. **WORKING WITH FORMS**

```javascript
const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const select = document.querySelector('select');
const checkbox = document.querySelector('input[type="checkbox"]');

// Get values
const textValue = input.value;
const selectedValue = select.value;
const isChecked = checkbox.checked;
const radioValue = document.querySelector('input[name="gender"]:checked')?.value;

// Set values
input.value = 'New text';
select.value = 'option2';
checkbox.checked = true;

// Form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Stop page reload
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Alternative: Manual collection
    const data = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        age: form.querySelector('#age').value
    };
    
    console.log(data);
});

// Form validation
input.addEventListener('input', () => {
    if (input.value.length < 3) {
        input.classList.add('invalid');
        input.setCustomValidity('Must be at least 3 characters');
    } else {
        input.classList.remove('invalid');
        input.setCustomValidity('');
    }
});
```

## 7. **ELEMENT PROPERTIES & METHODS**

### **Common Properties**
```javascript
const element = document.querySelector('div');

element.id;                     // Element ID
element.className;              // Class string
element.classList;              // DOMTokenList of classes
element.tagName;                // Tag name in uppercase ('DIV')
element.nodeName;               // Same as tagName
element.nodeType;               // 1 for element, 3 for text
element.textContent;            // Text content
element.innerHTML;              // HTML content
element.outerHTML;              // HTML of element itself
element.clientWidth;            // Width including padding
element.clientHeight;           // Height including padding
element.offsetWidth;            // Width including padding+border
element.offsetHeight;           // Height including padding+border
element.scrollWidth;            // Full scrollable width
element.scrollHeight;           // Full scrollable height
element.offsetTop;              // Distance from top of offsetParent
element.offsetLeft;             // Distance from left of offsetParent
element.scrollTop;              // How much scrolled vertically
element.scrollLeft;             // How much scrolled horizontally
```

### **Common Methods**
```javascript
element.focus();                // Focus on element
element.blur();                 // Remove focus
element.click();                // Simulate click
element.scrollIntoView();       // Scroll to element
element.scrollIntoView({ behavior: 'smooth' });
element.getBoundingClientRect(); // Position and size info
element.matches('.selector');   // Check if matches CSS selector
element.closest('.parent');     // Find closest ancestor
```

### **getBoundingClientRect()**
```javascript
const rect = element.getBoundingClientRect();

console.log(rect);
// {
//   x: 100,       // Left position relative to viewport
//   y: 200,       // Top position relative to viewport
//   width: 300,
//   height: 400,
//   top: 200,
//   right: 400,   // x + width
//   bottom: 600,  // y + height
//   left: 100
// }
```

## 8. **WORKING WITH EVENTS (Basic)**

```javascript
const button = document.querySelector('button');

// Add event listener
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log(event.target); // The clicked element
});

// Remove event listener (need named function)
function handleClick() {
    console.log('Clicked');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// Event object properties
element.addEventListener('click', (event) => {
    event.target;           // Element that triggered event
    event.currentTarget;    // Element with listener (same as 'this')
    event.type;             // Event type ('click')
    event.preventDefault(); // Stop default behavior
    event.stopPropagation(); // Stop bubbling to parents
});
```

## 9. **BATCH OPERATIONS**

### **Working with Multiple Elements**
```javascript
// Get all buttons
const buttons = document.querySelectorAll('.btn');

// Loop through NodeList
buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });
});

// Convert to array if needed
const buttonsArray = Array.from(buttons);
const buttonsArray2 = [...buttons]; // Spread operator

// Add to all elements
buttons.forEach(btn => btn.classList.add('styled'));

// Remove from all elements
buttons.forEach(btn => btn.classList.remove('inactive'));
```

### **Document Fragments (Performance)**
```javascript
// For adding MANY elements, use fragment (better performance)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
    const item = document.createElement('div');
    item.textContent = `Item ${i}`;
    fragment.appendChild(item);
}

// Add ALL at once (1 reflow instead of 100)
container.appendChild(fragment);
```

## 10. **PRACTICAL EXAMPLES**

### **Example 1: Toggle Dark Mode**
```javascript
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update button text
    toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️ Light Mode';
}
```

### **Example 2: Dynamic List**
```javascript
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const task = todoInput.value.trim();
    if (!task) return;
    
    // Create list item
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    li.innerHTML = `
        <span>${task}</span>
        <button class="delete-btn">×</button>
    `;
    
    // Add to list
    todoList.appendChild(li);
    
    // Clear input
    todoInput.value = '';
    todoInput.focus();
    
    // Save to localStorage
    saveTodos();
});

// Delete todo (event delegation)
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveTodos();
    }
});

function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item span').forEach(span => {
        todos.push(span.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
```

### **Example 3: Modal Window**
```javascript
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
```

### **Example 4: Tab System**
```javascript
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active from all
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active to clicked
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});
```

## 11. **PERFORMANCE TIPS**

```javascript
// 1. Cache DOM elements (don't query multiple times)
const button = document.querySelector('.btn'); // Do this once

// 2. Use event delegation for multiple elements
document.addEventListener('click', (e) => {
    if (e.target.matches('.delete-btn')) {
        // Handle delete
    }
    if (e.target.matches('.edit-btn')) {
        // Handle edit
    }
});

// 3. Batch DOM updates
const fragment = document.createDocumentFragment();
// Add elements to fragment first, then append once

// 4. Avoid forced reflows
// Bad: Reading then writing in loop
for (let i = 0; i < 100; i++) {
    element.style.left = element.offsetLeft + 10 + 'px'; // Reflow each time
}

// Better: Batch reads, then writes
const left = element.offsetLeft;
for (let i = 0; i < 100; i++) {
    // Calculate without reading DOM
}

// 5. Use class toggles instead of style changes
element.classList.add('hidden'); // Better
element.style.display = 'none'; // Okay, but less flexible
```

## 12. **COMMON PITFALLS**

```javascript
// 1. querySelector returns null if not found
const element = document.querySelector('.not-exist'); // null
// Always check:
if (element) {
    element.doSomething();
}

// 2. getElementById vs querySelector
document.getElementById('id'); // Returns null if not found
document.querySelector('#id'); // Also returns null

// 3. innerHTML security risk
element.innerHTML = userInput; // DANGEROUS - XSS attack!
element.textContent = userInput; // SAFE

// 4. Multiple elements with same ID (invalid HTML)
// IDs should be unique!

// 5. Forgetting to prevent form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Don't forget!
    // Handle form
});
```

## 13. **CHEAT SHEET**

### **Quick Reference**
```javascript
// GETTING
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('p')
element.children
element.parentElement

// CHANGING
element.textContent = 'text'
element.innerHTML = '<b>HTML</b>'
element.setAttribute('href', '#')
element.style.color = 'red'
element.classList.add('active')

// CREATING
document.createElement('div')
parent.appendChild(child)
parent.insertBefore(new, reference)

// REMOVING
element.remove()
parent.removeChild(child)

// EVENTS
element.addEventListener('click', handler)
element.removeEventListener('click', handler)
```

## 🎯 **PRACTICE EXERCISES**

### **Exercise 1: Basic Manipulation**
```javascript
// 1. Select the element with ID "header"
// 2. Change its text to "Welcome!"
// 3. Add a "highlight" class to it
// 4. Change its background color to yellow
```

### **Exercise 2: Create Shopping List**
```javascript
// 1. Create input and button
// 2. When button clicked, get input value
// 3. Create list item with that value
// 4. Add delete button to each item
// 5. Add item to list
// 6. Clear input
```

### **Exercise 3: Image Gallery**
```javascript
// 1. Create array of image URLs
// 2. Create thumbnail images
// 3. When thumbnail clicked, show large version
// 4. Add next/previous buttons
// 5. Add captions
```

## 🔧 **DEBUGGING TIPS**

```javascript
// 1. Check if element exists
console.log(element); // Should show element, not null

// 2. Check element properties
console.dir(element); // Shows all properties

// 3. Break complex operations
const parent = document.querySelector('.parent');
console.log('Parent:', parent);
const child = parent.querySelector('.child');
console.log('Child:', child);

// 4. Use browser DevTools
// - Right click → Inspect
// - Console tab for errors
// - Elements tab to see DOM
// - Event Listeners tab
```

## 📚 **NEXT STEPS**

After mastering DOM manipulation:
1. **Learn Event Handling** in depth
2. **Study ES6+ Features** (arrow functions, promises, async/await)
3. **Practice with Projects** (Todo app, calculator, weather app)
4. **Learn Fetch API** for server communication
5. **Explore JavaScript Frameworks** (React, Vue, Angular)

**Remember:** Practice is key! Build small projects every day. 🚀