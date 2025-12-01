# 🎨 **Complete CSS Mastery Guide - Junior to Mid Level**

## 📚 **Table of Contents**
1. [CSS Basics & Syntax](#1-css-basics--syntax)
2. [Selectors Mastery](#2-selectors-mastery)
3. [Box Model](#3-box-model)
4. [Layout Systems](#4-layout-systems)
5. [Typography](#5-typography)
6. [Colors & Backgrounds](#6-colors--backgrounds)
7. [Positioning](#7-positioning)
8. [Flexbox Complete Guide](#8-flexbox-complete-guide)
9. [CSS Grid Complete Guide](#9-css-grid-complete-guide)
10. [Transitions & Animations](#10-transitions--animations)
11. [Responsive Design](#11-responsive-design)
12. [CSS Variables](#12-css-variables)
13. [Transforms](#13-transforms)
14. [Filters & Effects](#14-filters--effects)
15. [Pseudo-classes & Elements](#15-pseudo-classes--elements)
16. [Advanced Topics](#16-advanced-topics)
17. [Best Practices](#17-best-practices)

---

## 1. CSS BASICS & SYNTAX

### **Three Ways to Add CSS**

```css
/* 1. External CSS (Recommended) */
<link rel="stylesheet" href="styles.css">

/* 2. Internal CSS (in <head>) */
<style>
    body { color: #333; }
</style>

/* 3. Inline CSS (Avoid) */
<div style="color: red;">Text</div>
```

### **CSS Syntax**
```css
selector {
    property: value;    /* Declaration */
    property: value;    /* Each line ends with semicolon */
}

/* Example */
h1 {
    color: blue;
    font-size: 2rem;
    margin-bottom: 1em;
}
```

### **CSS Comments**
```css
/* Single line comment */

/*
  Multi-line
  comment
*/

/*! Important comment (shows in minified) */
```

### **CSS Units**
```css
/* Absolute Units (Use sparingly) */
px: pixels                    /* 16px */
pt: points (1pt = 1/72 inch) /* 12pt */
cm, mm, in: physical units   /* 2cm, 10mm, 1in */

/* Relative Units (Recommended) */
em: Relative to parent font-size    /* 2em = 2×parent */
rem: Relative to root font-size     /* 1.5rem = 1.5×16px */
%: Relative to parent               /* 50% = half of parent */
vw: 1% of viewport width           /* 50vw = half of screen width */
vh: 1% of viewport height          /* 100vh = full screen height */
vmin: 1% of smaller dimension      /* 100vmin = full screen smaller side */
vmax: 1% of larger dimension       /* 100vmax = full screen larger side */

/* Special Units */
fr: Fraction unit (Grid only)      /* 1fr */
ch: Width of "0" character         /* 60ch = ~60 characters */
ex: Height of "x" character        /* 2ex */
```

---

## 2. SELECTORS MASTERY

### **Basic Selectors**
```css
/* Element selector */
div { color: red; }

/* Class selector (most used) */
.class-name { color: blue; }
<p class="class-name">Text</p>

/* ID selector (use sparingly) */
#unique-id { color: green; }
<div id="unique-id">Content</div>

/* Universal selector */
* { margin: 0; padding: 0; } /* Reset */

/* Attribute selector */
[type="text"] { border: 1px solid #ccc; }
[disabled] { opacity: 0.5; }
[href^="https"] { color: green; } /* Starts with */
[href$=".pdf"]::after { content: " 📄"; } /* Ends with */
[class*="btn"] { padding: 10px; } /* Contains */
```

### **Combinator Selectors**
```css
/* Descendant selector (space) */
article p { color: #666; } /* All p inside article */

/* Child selector (>) */
ul > li { list-style: none; } /* Direct children only */

/* Adjacent sibling (+) */
h2 + p { margin-top: 0; } /* p immediately after h2 */

/* General sibling (~) */
h2 ~ p { color: blue; } /* All p after h2 */
```

### **Grouping Selectors**
```css
/* Apply same styles to multiple selectors */
h1, h2, h3 {
    font-family: 'Arial', sans-serif;
    color: #333;
}
```

### **Specificity Hierarchy (IMPORTANT!)**
```
Inline styles (1000) > ID (100) > Class (10) > Element (1)
```
```css
/* Specificity Examples */
#id .class p {}        /* 100 + 10 + 1 = 111 */
.class.class p {}      /* 10 + 10 + 1 = 21 */
div p {}               /* 1 + 1 = 2 */
p {}                   /* 1 */

/* !important (Nuclear option - Avoid!) */
p { color: red !important; } /* Wins over everything */
```

---

## 3. BOX MODEL

### **The Box Model Components**
```css
.box {
    /* Content */
    width: 300px;
    height: 200px;
    
    /* Padding (inside) */
    padding: 20px;                 /* All sides */
    padding: 10px 20px;           /* Top/Bottom, Right/Left */
    padding: 10px 20px 30px 40px; /* Top, Right, Bottom, Left */
    
    /* Border */
    border: 2px solid #333;       /* Shorthand */
    border-width: 2px;
    border-style: solid;
    border-color: #333;
    border-radius: 10px;          /* Rounded corners */
    
    /* Margin (outside) */
    margin: 20px auto;            /* Auto centers horizontally */
    margin-top: 10px;
    margin-bottom: 20px;
}
```

### **Box-Sizing**
```css
/* Default - width = content only */
* { box-sizing: content-box; } 
/* Total width = width + padding + border */

/* Modern approach - width includes padding & border */
* { box-sizing: border-box; } 
/* Total width = specified width */

/* Reset (Always use this!) */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```

### **Margin Collapse**
```css
/* Vertical margins collapse between siblings */
.sibling1 { margin-bottom: 30px; }
.sibling2 { margin-top: 20px; }
/* Actual gap = 30px (not 50px) */

/* No collapse: */
/* - Horizontal margins */
/* - Parent-child (if parent has border/padding) */
/* - Flex/Grid items */
```

### **Display Property**
```css
/* Block - Full width, new line */
display: block;    /* div, p, h1-h6, section, etc. */

/* Inline - Flows with text, no width/height */
display: inline;   /* span, a, strong, em */

/* Inline-block - Inline flow + block properties */
display: inline-block; /* Can set width/height */

/* None - Removed from flow */
display: none;     /* Element hidden completely */

/* Flex & Grid (Modern layouts) */
display: flex;
display: grid;

/* Table displays (Rarely used) */
display: table;
display: table-cell;
```

---

## 4. LAYOUT SYSTEMS

### **Positioning**
```css
/* Static - Default flow */
position: static;

/* Relative - Position relative to itself */
position: relative;
top: 10px;      /* Move down 10px from normal position */
left: 20px;     /* Move right 20px */
z-index: 10;    /* Stacking order */

/* Absolute - Relative to nearest positioned ancestor */
position: absolute;
top: 0;
right: 0;       /* Top-right corner of parent */

/* Fixed - Relative to viewport */
position: fixed;
bottom: 20px;
right: 20px;    /* Always visible */

/* Sticky - Hybrid of relative and fixed */
position: sticky;
top: 0;         /* Sticks when scrolled to top */
```

### **Centering Techniques**
```css
/* Horizontal center - Block elements */
.block {
    margin: 0 auto;
    width: 80%;
}

/* Horizontal center - Inline/Inline-block */
.parent {
    text-align: center;
}

/* Absolute center (Old way) */
.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Flexbox center (Modern) */
.parent {
    display: flex;
    justify-content: center;  /* Horizontal */
    align-items: center;      /* Vertical */
}

/* Grid center (Modern) */
.parent {
    display: grid;
    place-items: center;      /* Both axes */
}
```

---

## 5. TYPOGRAPHY

### **Font Properties**
```css
/* Font family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, sans-serif;
/* Always include fallbacks */

/* Font size */
font-size: 16px;              /* Absolute */
font-size: 1rem;              /* Relative to root */
font-size: 1.2em;             /* Relative to parent */
font-size: clamp(1rem, 2vw, 2rem); /* Fluid typography */

/* Font weight */
font-weight: 400;             /* Normal */
font-weight: 700;             /* Bold */
font-weight: bold;            /* Keyword */
font-weight: lighter;         /* Relative */

/* Font style */
font-style: normal;
font-style: italic;
font-style: oblique;

/* Line height */
line-height: 1.5;             /* Unitless - best for accessibility */
line-height: 24px;            /* Fixed */
line-height: 150%;            /* Percentage */

/* Letter spacing */
letter-spacing: 0.5px;
letter-spacing: 0.1em;
letter-spacing: normal;

/* Text transform */
text-transform: uppercase;
text-transform: lowercase;
text-transform: capitalize;
text-transform: none;

/* Text decoration */
text-decoration: none;        /* Remove underline from links */
text-decoration: underline;
text-decoration: line-through;
text-decoration: overline;
text-decoration: underline dotted;
```

### **Text Alignment & Spacing**
```css
/* Text alignment */
text-align: left;
text-align: right;
text-align: center;
text-align: justify;

/* Vertical alignment (inline elements) */
vertical-align: baseline;    /* Default */
vertical-align: middle;
vertical-align: top;
vertical-align: bottom;

/* Text indent */
text-indent: 2em;

/* White space handling */
white-space: normal;         /* Default */
white-space: nowrap;         /* No wrapping */
white-space: pre;            /* Preserve whitespace */
white-space: pre-wrap;       /* Wrap but preserve */
white-space: pre-line;       /* Collapse spaces, keep newlines */

/* Word handling */
word-break: normal;
word-break: break-all;       /* Break anywhere */
word-break: keep-all;        /* Don't break words */

word-wrap: normal;
word-wrap: break-word;       /* Break long words */

overflow-wrap: normal;
overflow-wrap: anywhere;     /* Modern alternative */

/* Text shadow */
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
/* offset-x | offset-y | blur-radius | color */
```

### **Web Fonts**
```css
/* Google Fonts (link in HTML) */
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

/* Self-hosted fonts */
@font-face {
    font-family: 'MyFont';
    src: url('myfont.woff2') format('woff2'),
         url('myfont.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap; /* Optional - FOIT/FOUT control */
}
```

---

## 6. COLORS & BACKGROUNDS

### **Color Formats**
```css
/* Named colors */
color: red;
color: transparent;

/* Hexadecimal */
color: #ff0000;      /* Red */
color: #f00;         /* Short form */
color: #ff000080;    /* With alpha (50% opacity) */

/* RGB/RGBA */
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5); /* 50% opacity */

/* HSL/HSLA (Human-friendly) */
color: hsl(0, 100%, 50%);    /* Hue, Saturation, Lightness */
color: hsla(0, 100%, 50%, 0.5);

/* CurrentColor */
border: 2px solid currentColor; /* Uses text color */

/* System colors */
color: Canvas;                /* Background color of app */
color: CanvasText;           /* Text color in app */
color: LinkText;             /* Unvisited link color */
```

### **Background Properties**
```css
/* Background color */
background-color: #f0f0f0;

/* Background image */
background-image: url('image.jpg');
background-image: linear-gradient(to right, red, blue);
background-image: radial-gradient(circle, red, blue);

/* Background position */
background-position: center;
background-position: 50% 50%;
background-position: 10px 20px;
background-position: left top;

/* Background size */
background-size: cover;      /* Fill container, maintain ratio */
background-size: contain;    /* Fit entire image */
background-size: 100% 100%;  /* Stretch */
background-size: 200px 100px; /* Specific size */

/* Background repeat */
background-repeat: no-repeat;
background-repeat: repeat-x;
background-repeat: repeat-y;
background-repeat: space;    /* Evenly spaced */
background-repeat: round;    /* Stretch to fill */

/* Background attachment */
background-attachment: scroll; /* Default */
background-attachment: fixed;  /* Parallax effect */
background-attachment: local;  /* Scroll with content */

/* Background clip/origin */
background-clip: border-box;  /* Default */
background-clip: padding-box;
background-clip: content-box;
background-clip: text;        /* Clip to text (webkit) */

background-origin: border-box;
background-origin: padding-box;
background-origin: content-box;

/* Background shorthand */
background: #000 url('bg.jpg') no-repeat center/cover fixed;

/* Multiple backgrounds */
background: 
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('bg.jpg') center/cover;
```

### **Gradients**
```css
/* Linear gradient */
background: linear-gradient(to right, red, blue);
background: linear-gradient(45deg, red, blue, green);
background: linear-gradient(to right, 
    red 0%, 
    red 50%, 
    blue 50%, 
    blue 100%);

/* Radial gradient */
background: radial-gradient(circle, red, blue);
background: radial-gradient(circle at top left, red, blue);

/* Conic gradient */
background: conic-gradient(red, yellow, green, blue, red);

/* Repeating gradients */
background: repeating-linear-gradient(
    45deg,
    red,
    red 10px,
    blue 10px,
    blue 20px
);
```

---

## 7. FLEXBOX COMPLETE GUIDE

### **Flex Container Properties**
```css
.container {
    display: flex;           /* or inline-flex */
    
    /* Direction & Wrapping */
    flex-direction: row;     /* left to right */
    flex-direction: row-reverse;
    flex-direction: column;  /* top to bottom */
    flex-direction: column-reverse;
    
    flex-wrap: nowrap;       /* Default - single line */
    flex-wrap: wrap;         /* Multi-line */
    flex-wrap: wrap-reverse;
    
    /* Shorthand for direction + wrap */
    flex-flow: row wrap;
    
    /* Main axis alignment */
    justify-content: flex-start;   /* Start of container */
    justify-content: flex-end;     /* End of container */
    justify-content: center;       /* Center items */
    justify-content: space-between;/* Equal space between */
    justify-content: space-around; /* Space around items */
    justify-content: space-evenly; /* Equal space all around */
    
    /* Cross axis alignment */
    align-items: stretch;     /* Default - fill container */
    align-items: flex-start;  /* Start of cross axis */
    align-items: flex-end;    /* End of cross axis */
    align-items: center;      /* Center on cross axis */
    align-items: baseline;    /* Align text baselines */
    
    /* Multi-line alignment */
    align-content: stretch;
    align-content: flex-start;
    align-content: flex-end;
    align-content: center;
    align-content: space-between;
    align-content: space-around;
}
```

### **Flex Item Properties**
```css
.item {
    /* Order control */
    order: 0;              /* Default */
    order: 1;              /* Higher = later */
    order: -1;             /* Lower = earlier */
    
    /* Growth factor */
    flex-grow: 0;          /* Default - won't grow */
    flex-grow: 1;          /* Will grow to fill space */
    flex-grow: 2;          /* Twice as much as flex-grow:1 */
    
    /* Shrink factor */
    flex-shrink: 1;        /* Default - will shrink */
    flex-shrink: 0;        /* Won't shrink */
    
    /* Base size */
    flex-basis: auto;      /* Default - natural size */
    flex-basis: 200px;     /* Fixed base size */
    flex-basis: 50%;       /* Percentage of container */
    
    /* Shorthand for grow, shrink, basis */
    flex: 0 1 auto;        /* Default */
    flex: 1;               /* flex: 1 1 0 */
    flex: 0 0 200px;       /* Fixed size, won't grow/shrink */
    flex: auto;            /* flex: 1 1 auto */
    flex: none;            /* flex: 0 0 auto */
    
    /* Self alignment (overrides align-items) */
    align-self: auto;      /* Default - uses container's align-items */
    align-self: stretch;
    align-self: flex-start;
    align-self: flex-end;
    align-self: center;
    align-self: baseline;
}
```

### **Common Flexbox Patterns**
```css
/* Perfect centering */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Equal height columns */
.equal-columns {
    display: flex;
}
.equal-columns > * {
    flex: 1;  /* All equal width */
}

/* Navigation bar */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Card layout with equal heights */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.card {
    flex: 1 1 300px; /* Grow, shrink, min 300px */
}

/* Sticky footer */
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.main {
    flex: 1; /* Takes remaining space */
}
```

---

## 8. CSS GRID COMPLETE GUIDE

### **Grid Container Properties**
```css
.container {
    display: grid;          /* or inline-grid */
    
    /* Define columns */
    grid-template-columns: 200px 1fr 200px;
    grid-template-columns: repeat(3, 1fr);        /* 3 equal columns */
    grid-template-columns: repeat(auto-fit, 200px);
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    
    /* Define rows */
    grid-template-rows: 100px auto 100px;
    grid-template-rows: repeat(2, minmax(100px, auto));
    
    /* Shorthand for rows/columns */
    grid-template: 
        "header header header" 80px
        "nav    main   aside"  1fr
        "footer footer footer" 60px
        / 200px 1fr 200px;
    
    /* Automatic rows/columns */
    grid-auto-rows: 100px;      /* New rows = 100px */
    grid-auto-columns: 1fr;     /* New columns = 1fr */
    grid-auto-flow: row;        /* Default */
    grid-auto-flow: column;
    grid-auto-flow: row dense;  /* Fill holes */
    
    /* Gaps (gutters) */
    gap: 20px;                  /* row-gap + column-gap */
    row-gap: 20px;
    column-gap: 30px;
    
    /* Alignment - justify-items (inline axis) */
    justify-items: stretch;     /* Default */
    justify-items: start;
    justify-items: end;
    justify-items: center;
    
    /* Alignment - align-items (block axis) */
    align-items: stretch;       /* Default */
    align-items: start;
    align-items: end;
    align-items: center;
    align-items: baseline;
    
    /* Shorthand for both */
    place-items: center stretch;
    
    /* Alignment - justify-content (entire grid) */
    justify-content: start;
    justify-content: end;
    justify-content: center;
    justify-content: space-between;
    justify-content: space-around;
    justify-content: space-evenly;
    
    /* Alignment - align-content */
    align-content: start;
    align-content: end;
    align-content: center;
    align-content: space-between;
    align-content: space-around;
    align-content: space-evenly;
    
    /* Grid template areas (Powerful!) */
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}
```

### **Grid Item Properties**
```css
.item {
    /* Placement by lines */
    grid-column-start: 1;
    grid-column-end: 3;     /* Spans columns 1-2 */
    grid-row-start: 1;
    grid-row-end: 3;
    
    /* Shorthand for column/row */
    grid-column: 1 / 3;     /* Same as above */
    grid-row: 1 / span 2;   /* Span 2 rows from line 1 */
    
    /* Placement by area */
    grid-area: header;      /* Use area name */
    grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
    
    /* Self alignment (overrides container) */
    justify-self: stretch;  /* Default */
    justify-self: start;
    justify-self: end;
    justify-self: center;
    
    align-self: stretch;
    align-self: start;
    align-self: end;
    align-self: center;
    
    /* Shorthand */
    place-self: center stretch;
}
```

### **Common Grid Patterns**
```css
/* Holy Grail Layout */
.holy-grail {
    display: grid;
    grid-template: 
        "header header header" 80px
        "nav    main   aside"  1fr
        "footer footer footer" 60px
        / 200px 1fr 200px;
    min-height: 100vh;
}
.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
.aside  { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive Card Grid */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

/* Masonry Layout (with columns) */
.masonry {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
    gap: 20px;
}
.masonry > * {
    grid-row: span 2; /* Each item spans 2 rows */
}

/* Calendar Layout */
.calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}
```

### **Grid Functions**
```css
/* Repeat function */
grid-template-columns: repeat(4, 1fr);
grid-template-columns: repeat(3, 100px 200px);
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

/* Minmax function */
grid-template-columns: minmax(200px, 1fr) 300px;
grid-template-rows: minmax(100px, auto);

/* Fit-content function */
grid-template-columns: fit-content(200px) 1fr;

/* Min-content, max-content */
grid-template-columns: min-content max-content;
```

---

## 9. TRANSITIONS & ANIMATIONS

### **CSS Transitions**
```css
.element {
    /* Transition shorthand */
    transition: all 0.3s ease 0.1s;
    /* property | duration | timing-function | delay */
    
    /* Individual properties */
    transition-property: opacity, transform;
    transition-property: all;               /* All animatable properties */
    
    transition-duration: 0.3s;
    transition-duration: 300ms;
    transition-duration: 0.5s, 0.2s;        /* Multiple durations */
    
    transition-timing-function: ease;       /* Default */
    transition-timing-function: linear;
    transition-timing-function: ease-in;
    transition-timing-function: ease-out;
    transition-timing-function: ease-in-out;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-timing-function: steps(4, jump-start);
    
    transition-delay: 0.1s;
    transition-delay: 0s, 0.2s;             /* Multiple delays */
}

/* Trigger transition on hover */
.button {
    background: blue;
    transition: background 0.3s ease;
}
.button:hover {
    background: darkblue;
}
```

### **CSS Animations**
```css
/* Define keyframes */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}

@keyframes complex {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }
    50% {
        opacity: 1;
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

/* Apply animation */
.element {
    /* Animation shorthand */
    animation: slideIn 0.5s ease 0.2s 3 alternate forwards;
    /* name | duration | timing-function | delay | 
       iteration-count | direction | fill-mode */
    
    /* Individual properties */
    animation-name: slideIn;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-delay: 0.2s;
    animation-iteration-count: 3;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-direction: reverse;
    animation-direction: alternate;     /* Forward then backward */
    animation-direction: alternate-reverse;
    animation-fill-mode: none;          /* Default */
    animation-fill-mode: forwards;      /* Keep last frame */
    animation-fill-mode: backwards;     /* Apply first frame immediately */
    animation-fill-mode: both;
    animation-play-state: running;
    animation-play-state: paused;       /* Pause animation */
}
```

### **Performance Tips**
```css
/* Animate these for performance */
transform: translate(), scale(), rotate(), skew()
opacity: 
filter: 

/* Avoid animating these (causes layout/paint) */
width, height, margin, padding
top, left, right, bottom
display, position
```

---

## 10. RESPONSIVE DESIGN

### **Viewport Meta Tag (HTML)**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Essential for mobile responsiveness -->
```

### **Media Queries**
```css
/* Basic structure */
@media media-type and (media-feature) {
    /* CSS rules */
}

/* Common breakpoints */
/* Mobile First Approach (Recommended) */

/* Small devices (default) - No media query */

/* Tablets and larger */
@media (min-width: 768px) { /* ≥768px */ }

/* Desktops */
@media (min-width: 992px) { /* ≥992px */ }

/* Large desktops */
@media (min-width: 1200px) { /* ≥1200px */ }

/* Alternative (Desktop First) */
@media (max-width: 1199px) { /* ≤1199px */ }
@media (max-width: 991px) { /* ≤991px */ }
@media (max-width: 767px) { /* ≤767px */ }

/* Common media features */
@media (min-width: 768px) { }
@media (max-width: 1024px) { }
@media (orientation: portrait) { }
@media (orientation: landscape) { }
@media (hover: hover) { /* Device supports hover */ }
@media (pointer: fine) { /* Mouse/trackpad */ }
@media (pointer: coarse) { /* Touch screen */ }
@media (prefers-color-scheme: dark) { /* Dark mode */ }
@media (prefers-reduced-motion: reduce) { /* Accessibility */ }

/* Combining queries */
@media (min-width: 768px) and (max-width: 1024px) { }
@media (min-width: 768px), (orientation: landscape) { /* OR */ }

/* Feature queries (Check CSS support) */
@supports (display: grid) {
    .container { display: grid; }
}

@supports not (display: grid) {
    .container { display: flex; }
}
```

### **Responsive Units & Functions**
```css
/* Fluid typography */
h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    /* min | preferred | max */
}

/* Fluid spacing */
.container {
    padding: clamp(1rem, 5vw, 3rem);
}

/* CSS Math functions */
.element {
    width: min(100%, 1200px);      /* Maximum of 1200px */
    width: max(300px, 50%);        /* Minimum of 300px */
    width: clamp(300px, 50%, 800px); /* Min 300px, preferred 50%, max 800px */
    
    /* Calculations */
    width: calc(100% - 2rem);
    height: calc(100vh - 80px);
}
```

### **Responsive Images**
```css
/* In CSS */
.responsive-img {
    max-width: 100%;
    height: auto;
}

/* Background images */
.responsive-bg {
    background-image: url('small.jpg');
}

@media (min-width: 768px) {
    .responsive-bg {
        background-image: url('large.jpg');
    }
}
```

---

## 11. CSS VARIABLES (Custom Properties)

```css
/* Define in :root (global) or any selector */
:root {
    /* Color palette */
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --danger-color: #e74c3c;
    --text-color: #333;
    --bg-color: #f8f9fa;
    
    /* Spacing scale */
    --spacing-xs: 0.25rem;   /* 4px */
    --spacing-sm: 0.5rem;    /* 8px */
    --spacing-md: 1rem;      /* 16px */
    --spacing-lg: 2rem;      /* 32px */
    --spacing-xl: 4rem;      /* 64px */
    
    /* Typography */
    --font-family-base: 'Inter', sans-serif;
    --font-size-base: 1rem;
    --line-height-base: 1.5;
    
    /* Layout */
    --max-width: 1200px;
    --border-radius: 8px;
    --box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-base: 300ms ease;
    --transition-slow: 500ms ease;
}

/* Use variables */
.element {
    color: var(--primary-color);
    padding: var(--spacing-md);
    font-family: var(--font-family-base);
    transition: transform var(--transition-base);
}

/* Fallback values */
.element {
    color: var(--custom-color, blue); /* Use blue if --custom-color not defined */
}

/* Override in specific contexts */
.dark-mode {
    --bg-color: #1a1a1a;
    --text-color: #fff;
}

/* Change with media queries */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #fff;
    }
}

/* Change with JavaScript */
document.documentElement.style.setProperty('--primary-color', '#ff0000');
```

---

## 12. TRANSFORMS

```css
.element {
    /* 2D Transforms */
    transform: translate(50px, 100px);  /* Move */
    transform: translateX(50px);
    transform: translateY(100px);
    transform: translate(50%);          /* Percentage of element's size */
    
    transform: scale(2);                /* Double size */
    transform: scale(1.5, 0.5);         /* X and Y separately */
    transform: scaleX(1.5);
    transform: scaleY(0.8);
    
    transform: rotate(45deg);           /* Rotate */
    transform: rotate(0.5turn);         /* Half turn */
    
    transform: skew(30deg, 20deg);      /* Skew */
    transform: skewX(30deg);
    transform: skewY(20deg);
    
    /* 3D Transforms */
    transform: translate3d(50px, 100px, 0);
    transform: translateZ(100px);
    
    transform: scale3d(1.5, 1.5, 1);
    transform: scaleZ(1.5);
    
    transform: rotate3d(1, 0, 0, 45deg); /* Rotate around X axis */
    transform: rotateX(45deg);
    transform: rotateY(45deg);
    transform: rotateZ(45deg);
    
    /* Multiple transforms (order matters!) */
    transform: translate(50px, 100px) rotate(45deg) scale(1.5);
    
    /* Transform origin */
    transform-origin: center;           /* Default */
    transform-origin: top left;
    transform-origin: 50% 50%;
    transform-origin: 100px 200px;
    transform-origin: 0 0;
    
    /* 3D perspective */
    perspective: 1000px;
    transform-style: preserve-3d;       /* For nested 3D transforms */
    backface-visibility: hidden;        /* Hide back of element */
}
```

---

## 13. FILTERS & EFFECTS

```css
.element {
    /* Blur */
    filter: blur(5px);
    
    /* Brightness */
    filter: brightness(150%);    /* Brighter */
    filter: brightness(50%);     /* Darker */
    
    /* Contrast */
    filter: contrast(200%);      /* More contrast */
    filter: contrast(50%);       /* Less contrast */
    
    /* Grayscale */
    filter: grayscale(100%);     /* Full black & white */
    filter: grayscale(0);        /* Normal */
    
    /* Sepia */
    filter: sepia(100%);         /* Vintage look */
    
    /* Hue rotation */
    filter: hue-rotate(90deg);   /* Shift colors */
    
    /* Invert */
    filter: invert(100%);        /* Negative image */
    
    /* Opacity */
    filter: opacity(50%);        /* 50% transparent */
    
    /* Saturate */
    filter: saturate(200%);      /* More vibrant */
    filter: saturate(50%);       /* Less vibrant */
    
    /* Drop shadow (different from box-shadow) */
    filter: drop-shadow(5px 5px 10px rgba(0,0,0,0.5));
    
    /* Multiple filters */
    filter: contrast(150%) saturate(200%) blur(2px);
    
    /* Backdrop filter (blur behind element) */
    backdrop-filter: blur(10px);
    backdrop-filter: brightness(0.8);
    
    /* Clip path (advanced shapes) */
    clip-path: circle(50% at center);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%); /* Triangle */
    
    /* Masking */
    mask-image: linear-gradient(black, transparent);
    -webkit-mask-image: linear-gradient(to right, black, transparent);
    
    /* Blend modes */
    mix-blend-mode: multiply;
    mix-blend-mode: screen;
    mix-blend-mode: overlay;
    mix-blend-mode: difference;
    
    background-blend-mode: multiply;
}
```

---

## 14. PSEUDO-CLASSES & ELEMENTS

### **Pseudo-classes (state selectors)**
```css
/* Link states */
a:link { }        /* Unvisited link */
a:visited { }     /* Visited link */
a:hover { }       /* Mouse over */
a:active { }      /* Being clicked */
a:focus { }       /* Keyboard focused */

/* Form states */
input:focus { }
input:disabled { }
input:read-only { }
input:required { }
input:optional { }
input:valid { }   /* Valid input */
input:invalid { } /* Invalid input */
input:checked { } /* Checked radio/checkbox */
input:indeterminate { } /* Partially checked */

/* Structural */
:first-child { }      /* First child of parent */
:last-child { }       /* Last child of parent */
:nth-child(2) { }    /* Second child */
:nth-child(2n) { }   /* Even children */
:nth-child(2n+1) { } /* Odd children */
:nth-child(even) { }
:nth-child(odd) { }
:nth-child(3n) { }   /* Every 3rd child */
:nth-last-child(2) { } /* Second from end */
:only-child { }      /* Only child of parent */

:first-of-type { }   /* First of its type */
:last-of-type { }    /* Last of its type */
:nth-of-type(2) { } /* Second of its type */
:only-of-type { }    /* Only one of its type */

:empty { }           /* Element with no children */

/* Content state */
:target { }          /* URL fragment target */
:root { }            /* Document root (html) */

/* User action */
:hover { }
:focus { }
:focus-visible { }   /* Only show focus when needed (keyboard) */
:focus-within { }    /* Element or descendant has focus */

/* Language */
:lang(en) { }        /* Element with lang="en" */

/* Negation */
:not(p) { }          /* All elements except p */
:not(.class) { }
:not(:first-child) { }

/* New pseudo-classes */
:is(header, nav, footer) { } /* Matches any in list */
:where(header, nav, footer) { } /* Same but zero specificity */
:has(.active) { }    /* Parent has child with .active */
```

### **Pseudo-elements (virtual elements)**
```css
/* ::before and ::after (MUST have content) */
.element::before {
    content: "→ ";    /* Required property */
    display: inline-block;
    margin-right: 0.5em;
}

.element::after {
    content: "";
    display: block;
    clear: both;
}

/* Content property values */
content: "";                    /* Empty */
content: "Text";                /* String */
content: attr(data-label);      /* Attribute value */
content: counter(chapter);      /* Counter value */
content: url(image.png);        /* Image */
content: open-quote;            /* Quote marks */
content: close-quote;
content: no-open-quote;
content: no-close-quote;

/* Other pseudo-elements */
::first-letter { }      /* Style first letter of element */
::first-line { }        /* Style first line of element */
::selection { }         /* User-selected text */
::placeholder { }       /* Input placeholder text */
::marker { }            /* List item marker */
::backdrop { }          /* Fullscreen backdrop */
```

---

## 15. ADVANCED TOPICS

### **CSS Custom Properties (Advanced)**
```css
/* Property fallbacks with @property */
@property --gradient-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}

/* Create animated gradient */
.element {
    --gradient-angle: 0deg;
    background: conic-gradient(
        from var(--gradient-angle),
        red, yellow, green, blue, red
    );
    animation: rotate 4s linear infinite;
}

@keyframes rotate {
    to { --gradient-angle: 360deg; }
}
```

### **CSS Counters**
```css
/* Number headings automatically */
body {
    counter-reset: section; /* Initialize counter */
}

h2::before {
    counter-increment: section; /* Increment counter */
    content: "Section " counter(section) ": ";
}

/* Nested counters */
ol {
    counter-reset: item;
}
li::before {
    counter-increment: item;
    content: counters(item, ".") " ";
}
```

### **CSS Functions**
```css
/* Color functions */
color: rgb(255 0 0 / 0.5);        /* Modern syntax */
color: hsl(0deg 100% 50% / 0.5);
color: oklch(70% 0.2 0deg);       /* New color space */

/* Math functions */
calc(100% - 2rem)
min(100%, 1200px)
max(300px, 50%)
clamp(300px, 50vw, 800px)

/* Gradient functions */
linear-gradient()
radial-gradient()
conic-gradient()
repeating-linear-gradient()

/* Shape functions */
circle()
ellipse()
polygon()
inset()

/* Filter functions */
blur()
brightness()
contrast()
grayscale()
hue-rotate()
```

### **CSS Logical Properties (RTL/LTR support)**
```css
/* Instead of left/right/top/bottom */
margin-inline-start: 1rem;  /* Left in LTR, Right in RTL */
margin-inline-end: 1rem;    /* Right in LTR, Left in RTL */
margin-block-start: 1rem;   /* Top */
margin-block-end: 1rem;     /* Bottom */

padding-inline: 1rem;       /* Left & Right */
padding-block: 1rem;        /* Top & Bottom */

border-inline-start: 1px solid;
border-inline-end: 1px solid;

/* Sizing */
inline-size: 200px;         /* Width */
block-size: 100px;          /* Height */
min-inline-size: 100px;
max-block-size: 500px;

/* Text alignment */
text-align: start;          /* Left in LTR, Right in RTL */
text-align: end;            /* Right in LTR, Left in RTL */

/* Float */
float: inline-start;
float: inline-end;

/* Positioning */
inset-inline-start: 0;
inset-inline-end: 0;
inset-block-start: 0;
inset-block-end: 0;
```

---

## 16. BEST PRACTICES

### **Performance Optimization**
```css
/* 1. Use efficient selectors */
/* Bad */
div nav ul li a { }
/* Good */
.nav-link { }

/* 2. Avoid expensive properties in animations */
/* Good */
transform: translateX(100px);
opacity: 0.5;
/* Bad */
width: 100px;
margin-left: 100px;

/* 3. Use will-change sparingly */
.element {
    will-change: transform; /* Hint browser for optimization */
}

/* 4. Optimize loading */
<link rel="preload" href="critical.css" as="style">
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">

/* 5. Use content-visibility for large pages */
.large-section {
    content-visibility: auto;
    contain-intrinsic-size: 500px;
}
```

### **Organization & Maintenance**
```css
/* CSS Methodologies */

/* BEM (Block Element Modifier) */
.block { }                    /* Main component */
.block__element { }           /* Child element */
.block--modifier { }          /* Modifier */

/* Example */
.button { }
.button--primary { }
.button__icon { }

/* ITCSS (Inverted Triangle CSS) */
/* 1. Settings: Variables, config */
/* 2. Tools: Mixins, functions */
/* 3. Generic: Reset, normalize */
/* 4. Elements: HTML tags */
/* 5. Objects: Layout patterns */
/* 6. Components: UI components */
/* 7. Utilities: Helper classes */

/* Utility-First (Tailwind approach) */
.mt-4 { margin-top: 1rem; }
.text-center { text-align: center; }
.bg-blue-500 { background: #3b82f6; }
```

### **Accessibility**
```css
/* 1. Focus styles */
:focus {
    outline: 3px solid #4285f4;
    outline-offset: 2px;
}

/* 2. Reduced motion */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

/* 3. High contrast */
@media (prefers-contrast: high) {
    .element {
        border: 2px solid currentColor;
    }
}

/* 4. Screen reader only */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

### **Common Patterns**
```css
/* Clearfix (for float layouts) */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

/* Aspect ratio boxes */
.aspect-ratio-16-9 {
    aspect-ratio: 16 / 9;
}
.aspect-ratio-1-1 {
    aspect-ratio: 1 / 1;
}

/* Truncate text */
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.truncate-multiline {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Visually hidden but accessible */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-track {
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
```

---

## 17. CSS RESET / NORMALIZE

```css
/* Modern CSS Reset */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    min-height: 100vh;
    line-height: 1.5;
    text-rendering: optimizeSpeed;
}

img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
}

input, button, textarea, select {
    font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
}

/* Remove animations for reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

---

## 🎯 **Learning Path Recommendation**

### **Week 1-2: Fundamentals**
- Box model, positioning, display
- Selectors, specificity
- Typography, colors

### **Week 3-4: Layouts**
- Flexbox (master this!)
- CSS Grid
- Responsive design

### **Week 5-6: Advanced**
- Animations & transitions
- CSS Variables
- Pseudo-classes/elements

### **Week 7-8: Real Projects**
- Build components
- Practice responsive patterns
- Learn debugging tools

---

## 🔧 **Essential Developer Tools**

1. **Browser DevTools** - F12
   - Inspect element
   - Mobile view
   - CSS debugging
   - Performance audits

2. **CSS Validator** - [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/)

3. **Autoprefixer** - Add vendor prefixes automatically

4. **CSS Minifier** - Reduce file size

---

## 💡 **Pro Tips**

1. **Mobile First** - Start with mobile styles, then enhance
2. **Use REM/EM** for scalability and accessibility
3. **Custom Properties** for theming and consistency
4. **BEM naming** for maintainable CSS
5. **Utility classes** for common patterns
6. **CSS Grid for 2D**, Flexbox for 1D layouts
7. **Test in multiple browsers**
8. **Use CSS variables for theming**
9. **Optimize critical CSS** for above-the-fold content
10. **Learn to use DevTools proficiently**

---

## 📚 **Resources to Continue Learning**

1. **MDN Web Docs** - Most comprehensive
2. **CSS-Tricks** - Tutorials & guides
3. **Frontend Masters** - Video courses
4. **Josh Comeau's CSS Course** - Interactive learning
5. **Kevin Powell's YouTube** - CSS tutorials
6. **CSSBattle** - Practice challenges

---

