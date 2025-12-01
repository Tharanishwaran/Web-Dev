# 📚 **Complete HTML Tags Reference - Junior to Mid Level**

## 📋 **Basic Document Structure**
```html
<!DOCTYPE html>           <!-- Declares HTML5 document -->
<html lang="en">          <!-- Root element, lang attribute for accessibility -->
<head>                    <!-- Document metadata -->
    <meta charset="UTF-8"> <!-- Character encoding -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title> <!-- Browser tab title -->
</head>
<body>                    <!-- Visible page content -->
</body>
</html>
```

## 🏗️ **Structural Tags (Semantic HTML5)**

### **Main Page Sections**
```html
<!-- Header - Introductory content -->
<header>
    <h1>Website Logo</h1>
    <nav>Navigation</nav>
</header>

<!-- Navigation - Major navigation blocks -->
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</nav>

<!-- Main content - Unique content of the document -->
<main>
    <article>Blog post</article>
    <section>Related content section</section>
</main>

<!-- Article - Self-contained composition -->
<article>
    <h2>Blog Post Title</h2>
    <p>Content...</p>
</article>

<!-- Section - Thematic grouping -->
<section>
    <h2>Chapter 1</h2>
    <p>Chapter content...</p>
</section>

<!-- Aside - Tangentially related content -->
<aside>
    <h3>Related Articles</h3>
    <p>Sidebar content...</p>
</aside>

<!-- Footer - Footer for its nearest ancestor -->
<footer>
    <p>Copyright 2024</p>
</footer>
```

### **When to use which:**
- **`<article>`**: Blog post, news article, forum post, product card
- **`<section>`**: Chapters, tabbed content, grouped content with heading
- **`<div>`**: Generic container when no semantic element fits
- **`<main>`**: Only one per page, main content (NOT inside header/footer/nav/aside)

## 📝 **Text Content Tags**

### **Headings (Hierarchy is crucial!)**
```html
<h1>Main Title - Only ONE per page</h1>  <!-- SEO & accessibility critical -->
<h2>Section Title</h2>                  <!-- Subsections -->
<h3>Sub-section</h3>                    <!-- Under h2 -->
<h4>Small heading</h4>                  <!-- Rarely used -->
<h5>Even smaller</h5>                   <!-- Very rare -->
<h6>Tiny heading</h6>                   <!-- Almost never used -->
```

### **Paragraphs & Text**
```html
<p>This is a paragraph of text.</p>

<!-- Line break within text -->
<p>First line<br>Second line</p>

<!-- Horizontal rule -->
<hr> <!-- Thematic break between sections -->

<!-- Preformatted text (preserves whitespace) -->
<pre>
    function hello() {
        console.log("Hello");
    }
</pre>

<!-- Code snippets -->
<code>const x = 10;</code>

<!-- Keyboard input -->
<kbd>Ctrl + C</kbd>

<!-- Sample output -->
<samp>Error: File not found</samp>

<!-- Variable -->
<var>x</var> = <var>y</var> + 2
```

### **Quotations**
```html
<!-- Inline quote -->
<q>Short inline quotation</q>

<!-- Block quote -->
<blockquote cite="source-url">
    <p>Long quotation from another source.</p>
    <footer>— Author Name</footer>
</blockquote>

<!-- Citation -->
<cite>Book or Article Title</cite>
```

### **Text Formatting**
```html
<!-- IMPORTANT: Use semantic tags over style tags -->

<em>Emphasized text</em>            <!-- Screen readers change tone -->
<strong>Important text</strong>      <!-- Screen readers emphasize -->
<small>Fine print, disclaimers</small>
<mark>Highlighted text</mark>        <!-- Like a highlighter -->
<del>Deleted text</del>              <!-- <del datetime="2024-01-01">Old price</del> -->
<ins>Inserted text</ins>             <!-- <ins datetime="2024-01-01">New price</ins> -->
<sub>Subscript</sub>                 <!-- H<sub>2</sub>O -->
<sup>Superscript</sup>               <!-- E = mc<sup>2</sup> -->

<!-- Old style tags (avoid, use CSS instead) -->
<b>Bold (style only)</b>             <!-- Use <strong> for importance -->
<i>Italic (style only)</i>           <!-- Use <em> for emphasis -->
<u>Underline (avoid)</u>             <!-- Can confuse with links -->
<s>Strikethrough</s>                 <!-- Use <del> for deleted content -->
```

## 🔗 **Link & Navigation Tags**

```html
<!-- Basic link -->
<a href="https://example.com">Visit Example</a>

<!-- Link with target -->
<a href="page.html" target="_blank">Open in new tab</a>

<!-- Email link -->
<a href="mailto:email@example.com">Send Email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call us</a>

<!-- Download link -->
<a href="file.pdf" download>Download PDF</a>

<!-- Anchor link -->
<a href="#section-id">Jump to section</a>
<!-- Target element -->
<section id="section-id">Content</section>

<!-- Link relationships -->
<a href="style.css" rel="stylesheet">CSS</a>
<a href="https://example.com" rel="nofollow noopener noreferrer">External</a>
<!-- nofollow: Don't pass SEO juice -->
<!-- noopener noreferrer: Security for target="_blank" -->
```

## 🖼️ **Media Tags**

### **Images**
```html
<!-- Essential image -->
<img src="image.jpg" alt="Description for screen readers">

<!-- With dimensions -->
<img src="image.jpg" alt="Description" width="300" height="200">

<!-- Responsive images -->
<img src="image.jpg" alt="Description" 
     srcset="image-320w.jpg 320w,
             image-480w.jpg 480w,
             image-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px">

<!-- Lazy loading -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- Figure with caption -->
<figure>
    <img src="chart.png" alt="Sales chart">
    <figcaption>Figure 1: Quarterly sales data</figcaption>
</figure>
```

### **Audio & Video**
```html
<!-- Audio player -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    Your browser does not support audio.
</audio>

<!-- Video player -->
<video controls width="600">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <track src="subtitles.vtt" kind="subtitles" srclang="en" label="English">
    Your browser does not support video.
</video>

<!-- Embed external content -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID" 
        title="YouTube video"
        width="560" 
        height="315"
        allowfullscreen>
</iframe>
```

## 📊 **List Tags**

```html
<!-- Unordered list (bullets) -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3
        <ul>            <!-- Nested list -->
            <li>Sub-item 1</li>
        </ul>
    </li>
</ul>

<!-- Ordered list (numbers/letters) -->
<ol>
    <li>First item</li>
    <li>Second item</li>
</ol>

<!-- Custom list markers -->
<ol type="A">           <!-- A, B, C... -->
<ol type="a">           <!-- a, b, c... -->
<ol type="I">           <!-- I, II, III... -->
<ol type="i">           <!-- i, ii, iii... -->
<ol start="10">         <!-- Start from 10 -->
<ol reversed>           <!-- Count down -->

<!-- Description list (name-value pairs) -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>

<!-- Menu list (navigation/toolbars) -->
<menu>
    <li><button>Save</button></li>
    <li><button>Undo</button></li>
</menu>
```

## 📋 **Table Tags**

```html
<table>
    <!-- Caption (optional but recommended) -->
    <caption>Monthly Sales Report</caption>
    
    <!-- Column groups -->
    <colgroup>
        <col span="2" style="background-color: #f0f0f0">
        <col style="background-color: #e0e0e0">
    </colgroup>
    
    <!-- Table header -->
    <thead>
        <tr>
            <th scope="col">Month</th>      <!-- scope for accessibility -->
            <th scope="col">Sales</th>
            <th scope="col">Profit</th>
        </tr>
    </thead>
    
    <!-- Table body -->
    <tbody>
        <tr>
            <th scope="row">January</th>    <!-- Row header -->
            <td>$10,000</td>
            <td>$2,000</td>
        </tr>
        <tr>
            <th scope="row">February</th>
            <td>$12,000</td>
            <td>$2,500</td>
        </tr>
    </tbody>
    
    <!-- Table footer -->
    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>$22,000</td>
            <td>$4,500</td>
        </tr>
    </tfoot>
</table>
```

## 📝 **Form Tags**

### **Basic Form Structure**
```html
<form action="/submit" method="POST" enctype="multipart/form-data">
    
    <!-- Fieldset for grouping -->
    <fieldset>
        <legend>Personal Information</legend>
        
        <!-- Label association -->
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required>
        
        <!-- Label wrapping -->
        <label>
            Email:
            <input type="email" name="email" required>
        </label>
    </fieldset>
</form>
```

### **Input Types**
```html
<!-- Text inputs -->
<input type="text" placeholder="Enter text">
<input type="password" placeholder="Password">
<input type="email" placeholder="email@example.com">
<input type="tel" placeholder="Phone number">
<input type="url" placeholder="https://example.com">
<input type="search" placeholder="Search...">

<!-- Numbers -->
<input type="number" min="1" max="100" step="1">
<input type="range" min="0" max="100" value="50">

<!-- Date & Time -->
<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="week">

<!-- File upload -->
<input type="file" accept=".jpg,.png,.pdf" multiple>

<!-- Hidden field -->
<input type="hidden" name="user_id" value="123">

<!-- Color picker -->
<input type="color" value="#ff0000">
```

### **Other Form Elements**
```html
<!-- Textarea -->
<textarea rows="4" cols="50" placeholder="Enter message..."></textarea>

<!-- Select dropdown -->
<select name="country">
    <option value="">Select country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <optgroup label="Asia">
        <option value="in">India</option>
        <option value="jp">Japan</option>
    </optgroup>
</select>

<!-- Multi-select -->
<select name="skills" multiple size="4">
    <option value="js">JavaScript</option>
    <option value="py">Python</option>
</select>

<!-- Data list (autocomplete) -->
<input list="browsers" name="browser">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
</datalist>

<!-- Checkboxes -->
<label>
    <input type="checkbox" name="subscribe" checked>
    Subscribe to newsletter
</label>

<!-- Radio buttons (same name groups them) -->
<label>
    <input type="radio" name="gender" value="male">
    Male
</label>
<label>
    <input type="radio" name="gender" value="female">
    Female
</label>

<!-- Buttons -->
<button type="submit">Submit</button>
<button type="reset">Reset</button>
<button type="button">Regular Button</button>
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<input type="button" value="Click me">

<!-- Progress bar -->
<progress value="70" max="100">70%</progress>

<!-- Meter -->
<meter value="0.6" min="0" max="1">60%</meter>

<!-- Output element -->
<output name="result" for="a b">0</output>
```

## 🎨 **Interactive & Scripting Tags**

```html
<!-- Details disclosure widget -->
<details>
    <summary>Click to expand</summary>
    <p>Hidden content revealed here.</p>
</details>

<!-- Dialog modal -->
<dialog id="modal">
    <p>This is a modal dialog</p>
    <button onclick="document.getElementById('modal').close()">Close</button>
</dialog>

<!-- Template (hidden content for JS) -->
<template id="user-template">
    <div class="user">
        <h2></h2>
        <p></p>
    </div>
</template>

<!-- Slot for web components -->
<slot name="header">Default header</slot>

<!-- Script tag -->
<script>
    // Inline JavaScript
    console.log('Hello');
</script>
<script src="app.js" defer></script>
<!-- defer: Load after HTML, execute in order -->
<!-- async: Load async, execute when ready -->

<!-- NoScript content -->
<noscript>
    <p>Please enable JavaScript to use this site.</p>
</noscript>

<!-- Canvas for drawing -->
<canvas id="myCanvas" width="200" height="100"></canvas>

<!-- SVG graphics -->
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="red" />
</svg>
```

## 📍 **Meta & Link Tags (in `<head>`)**

```html
<!-- Character encoding (MUST be first) -->
<meta charset="UTF-8">

<!-- Viewport for responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Page description (SEO) -->
<meta name="description" content="Page description for search engines">

<!-- Keywords (less important now) -->
<meta name="keywords" content="HTML, CSS, JavaScript">

<!-- Author -->
<meta name="author" content="Your Name">

<!-- Open Graph (Facebook/LinkedIn) -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="image.jpg">
<meta property="og:url" content="https://example.com">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">

<!-- Robots -->
<meta name="robots" content="index, follow">
<!-- index/noindex: Allow/disallow indexing -->
<!-- follow/nofollow: Allow/disallow following links -->

<!-- Refresh/redirect -->
<meta http-equiv="refresh" content="5;url=https://example.com">

<!-- Theme color -->
<meta name="theme-color" content="#ffffff">

<!-- Link tags -->
<link rel="stylesheet" href="styles.css">
<link rel="icon" href="favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="manifest" href="manifest.json"> <!-- PWA -->
```

## 🔧 **Global Attributes (Work on MOST tags)**

```html
<!-- Core attributes -->
<div id="unique-id"></div>               <!-- Must be unique -->
<div class="class1 class2"></div>        <!-- Multiple classes -->
<div style="color: red;"></div>          <!-- Inline CSS (avoid) -->
<div title="Tooltip text"></div>         <!-- Tooltip on hover -->

<!-- Accessibility -->
<div aria-label="Description"></div>     <!-- For screen readers -->
<div role="button" tabindex="0"></div>   <!-- ARIA roles -->
<div tabindex="0"></div>                 <!-- Make div focusable -->
<div hidden></div>                       <!-- Hide element -->

<!-- Data attributes -->
<div data-user-id="123" 
     data-role="admin"
     data-custom-info='{"status":"active"}'>
</div>

<!-- Content Editable -->
<div contenteditable="true"></div>       <!-- Make editable -->

<!-- Translation -->
<div translate="no">Brand names</div>    <!-- Don't translate -->

<!-- Spell check -->
<textarea spellcheck="true"></textarea>

<!-- Drag and drop -->
<div draggable="true"></div>
<div dropzone="copy"></div>

<!-- Event handlers (use JavaScript instead) -->
<div onclick="handleClick()"></div>      <!-- Avoid inline handlers -->
```

## 🎯 **HTML Entities (Special Characters)**

```html
&nbsp;      <!-- Non-breaking space -->
&lt;         <!-- < Less than -->
&gt;         <!-- > Greater than -->
&amp;        <!-- & Ampersand -->
&quot;      <!-- " Double quote -->
&apos;      <!-- ' Apostrophe -->
&copy;      <!-- © Copyright -->
&reg;       <!-- ® Registered -->
&trade;     <!-- ™ Trademark -->
&euro;      <!-- € Euro -->
&pound;     <!-- £ Pound -->
&yen;       <!-- ¥ Yen -->
&cent;      <!-- ¢ Cent -->
&deg;       <!-- ° Degree -->
```

## 📌 **Essential Tags by Use Case**

### **For SEO & Accessibility (MUST USE):**
```html
<title>Descriptive Title</title>
<meta name="description" content="...">
<h1>Main Heading</h1>
<header>, <nav>, <main>, <footer>
<img alt="description">
<a aria-label="description">
<button> instead of <div> for buttons
```

### **For Forms (Most Used):**
```html
<form>, <input>, <label>, <button>
<fieldset>, <legend> for grouping
<select>, <option>, <textarea>
<input type="email|password|number|date">
```

### **For Layout (Common Patterns):**
```html
<div>           <!-- Generic container -->
<header>        <!-- Page header -->
<nav>           <!-- Navigation -->
<main>          <!-- Main content -->
<section>       <!-- Content sections -->
<article>       <!-- Self-contained content -->
<aside>         <!-- Sidebar -->
<footer>        <!-- Footer -->
```

### **For Media (Modern Web):**
```html
<img srcset="..." sizes="..." loading="lazy">
<video controls>
<audio controls>
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <img src="small.jpg" alt="...">
</picture>
```

### **For Tables (Data Display):**
```html
<table>
<caption>
<thead>, <tbody>, <tfoot>
<tr>, <th>, <td>
<colgroup>, <col>
```

## ⚠️ **Common Mistakes to Avoid**

1. **Don't skip headings hierarchy** (h1 → h3 without h2)
2. **Don't use `<div>` for everything** (use semantic tags)
3. **Don't forget `alt` attributes** on images
4. **Don't use `<br>` for spacing** (use CSS margin/padding)
5. **Don't nest block elements in inline elements**
6. **Don't use tables for layout** (use CSS Grid/Flexbox)
7. **Always close your tags** (except void elements)
8. **Use `label` with `for` attribute** for form inputs

## ✅ **HTML5 Semantic Cheat Sheet**

| Tag | Purpose | When to Use |
|-----|---------|-------------|
| `<header>` | Introductory content | Page header, article header |
| `<nav>` | Navigation links | Main menu, table of contents |
| `<main>` | Dominant content | Unique content, only one per page |
| `<article>` | Independent content | Blog post, news article, forum post |
| `<section>` | Thematic grouping | Chapters, grouped content with heading |
| `<aside>` | Related content | Sidebars, pull quotes, advertisements |
| `<footer>` | Closing content | Page footer, article footer |
| `<figure>` | Self-contained flow | Images, code snippets, diagrams |
| `<figcaption>` | Figure caption | Caption for `<figure>` |
| `<time>` | Date/time | Published dates, event times |
| `<mark>` | Highlighted text | Search results, important snippets |
| `<progress>` | Progress indicator | Loading, file upload |
| `<meter>` | Scalar measurement | Disk usage, ratings |
| `<details>` | Disclosure widget | FAQ, show/hide content |
| `<summary>` | Details summary | Heading for `<details>` |

## 🔍 **Void Elements (Self-closing)**
```html
<br>          <!-- Line break -->
<hr>          <!-- Horizontal rule -->
<img>         <!-- Image -->
<input>       <!-- Form input -->
<meta>        <!-- Metadata -->
<link>        <!-- Link to resources -->
<area>        <!-- Image map area -->
<base>        <!-- Base URL -->
<col>         <!-- Table column -->
<embed>       <!-- External content -->
<source>      <!-- Media source -->
<track>       <!-- Text track -->
<wbr>         <!-- Word break opportunity -->
```

## 📚 **Learning Priority Order**

### **Week 1: Essential (Must Know)**
```html
<!DOCTYPE html>, <html>, <head>, <body>
<title>, <meta>, <link>
<h1>-<h6>, <p>, <a>, <img>
<div>, <span>
<ul>, <ol>, <li>
```

### **Week 2: Forms & Structure**
```html
<form>, <input>, <label>, <button>
<textarea>, <select>, <option>
<header>, <nav>, <main>, <footer>
<section>, <article>, <aside>
```

### **Week 3: Media & Tables**
```html
<audio>, <video>, <source>
<table>, <tr>, <th>, <td>
<thead>, <tbody>, <tfoot>
<iframe>
```

### **Week 4: Advanced & Semantic**
```html
<figure>, <figcaption>
<time>, <mark>, <progress>
<details>, <summary>
<template>, <slot>
<canvas>, <svg>
```

## 💡 **Pro Tips:**
1. **Validate your HTML** at [validator.w3.org](https://validator.w3.org)
2. **Use semantic HTML** for better SEO and accessibility
3. **Keep nesting shallow** (avoid deep nesting)
4. **Use comments** `<!-- Comment -->` for complex sections
5. **Indent consistently** (2 or 4 spaces, not tabs)
6. **Close all tags** (except void elements)
7. **Use lowercase** for tag names
8. **Quote all attributes** `class="name"` not `class=name`

## 📖 **Remember:**
- **HTML** = Structure & Content
- **CSS** = Presentation & Style  
- **JavaScript** = Behavior & Interactivity


