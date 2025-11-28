function App() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Lesson 1: Colors in Tailwind</h1>
      
      {/* Text style */}
      <p className="text-base text-red-800">This is normal</p> 

      {/* Background colors */}
      <section className="bg-white p-6 rounded-lg shadow mb-7">
        <h2 className="text-2xl font-bold mb-4">Background colors</h2>
        
        <div className="space-y-3">
          <div className="bg-red-500 text-white p-4 rounded">
            Red Background
          </div>

          <div className="bg-blue-500 text-white p-4 rounded-lg">
            Blue background
          </div>
        </div>   
      </section>

      {/* Flexbox basics */}
      <section className="bg-white p-6 rounded-lg shadow mb-7">
        <h1 className="text-3xl font-bold mb-8">Lesson 3: Flexbox Layout</h1>
        
        {/* Horizontal Layout */}
        <div className="flex gap-4">
          <div className="bg-blue-500 text-white p-4 rounded">Box 1</div>
          <div className="bg-green-500 text-white p-4 rounded">Box 2</div>
          <div className="bg-red-500 text-white p-4 rounded">Box 3</div>
        </div>
      </section>

      {/* Rounded Corners */}
      <section className="bg-white p-6 rounded-lg shadow mb-7">
        <h1 className="text-3xl font-bold mb-8">Lesson 4: Rounded Corners</h1>
        
        {/* Different rounded sizes */}
        <div className="flex gap-4 mb-8">
          <div className="bg-blue-500 text-white p-4  rounded-sm">Small Round</div>
          <div className="bg-green-500 text-white p-4 rounded-md">Medium Round</div>
          <div className="bg-red-500 text-white p-4 rounded-lg">Large Round</div>
        </div>

        {/* Fully rounded (pill shape) */}
        <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700">
          Click Me (Pill Button)
        </button>
      </section>

      {/* Shadow effects */}
      <section className="bg-blue-100 p-6 rounded-lg shadow mb-7">
        <h1 className="text-3xl font-bold mb-8">Lesson 5: Shadows</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow-m rounded-lg">
            <h3 className="font-bold">Small Shadow</h3>
            <p className="text-gray-600">shadow-sm</p>
          </div>
          
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="font-bold">Medium Shadow</h3>
            <p className="text-gray-600">shadow-md</p>
          </div>
          
          <div className="bg-white p-6 shadow-xl rounded-lg">
            <h3 className="font-bold">Large Shadow</h3>
            <p className="text-gray-600">shadow-lg</p>
          </div>
          
          <div className="bg-white p-6 shadow-xl rounded-lg">
            <h3 className="font-bold">Extra Large</h3>
            <p className="text-gray-600">shadow-xl</p>
          </div>
          
          <div className="bg-white p-6 shadow-2xl rounded-lg">
            <h3 className="font-bold">2XL Shadow</h3>
            <p className="text-gray-600">shadow-2xl</p>
          </div>
          
          <div className="bg-white p-6 shadow-inner rounded-lg">
            <h3 className="font-bold">Inner Shadow</h3>
            <p className="text-gray-600">shadow-inner</p>
          </div>
        </div>
      </section>
      
      <section className="bg-white p-6 rounded-lg shadow mb-7"> 
        <h1 className="text-3xl font-bold mb-8">Lesson 7: Width, Height & Spacing</h1>

        {/* Width Examples * */}
        <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Width Classes</h2>
        <div className="bg-blue-500 w-32 h-12 mb-2 rounded text-white flex items-center justify-center ">
          w-32
        </div>
        <div className="bg-blue-500 w-64 h-12 mb-2 rounded text-white flex items-center justify-center">
         w-64 (16rem)
        </div>
        <div className="bg-blue-500 w-1/2 h-12 mb-2 rounded text-white flex items-center justify-center">
        w-1/2 (50%)
         </div>
         <div className="bg-blue-500 w-full h-12 mb-2 rounded text-white flex items-center justify-center">
         w-full (100%)
         </div> 
        </div>
        
       {/* Margin and padding examples */}
       <div>
    <h2 className="text-xl font-bold mb-4">Margin & Padding</h2>
    <div className="bg-yellow-200 p-8 rounded-lg">
      <p className="font-bold mb-2">This box has p-8 (padding)</p>
      <div className="bg-red-500 text-white p-4 mb-4 rounded">
        Inside box with p-4
      </div>
      <div className="bg-red-500 text-white p-4 mt-8 rounded">
        Inside box with mt-8 (margin-top)
      </div>
    </div>
  </div>
</section>


<section className="bg-pink-100 p-6 rounded-lg shadow mb-7">
<h1 className="text-3xl font-bold mb-8">Lesson 8: Interactive states</h1>

{/* hover examples */}
<div className="mb-8">
   
   <h2 className="text-xl font-bold mb-4">Hover Effects</h2>

   <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-900">
    Hover me (color Change)
   </button>

   <button className="bg-green-500 text-white px-6 py-3 rounded-lg mr-4 hover:scale-110 transition">
   Hover me (Scale Up)
   </button>

   <button className="bg-purple-500 text-white px-6 py-3 rounded-lg mt-5 hover:shadow-2xl transition">
      Hover me (Shadow Grows)
    </button>

</div>

{/* Focus Examples */}
<div className="mb-8">
<h2 className="text-xl font-bold mb-4">Focus States (Click on inputs)</h2>

<input 
  
  type="text"
  placeholder="click me"
  className="border-2 border-gray-300 p-3 rounded-lg w-full mb-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
 
 ></input>
  <input 
      type="text" 
      placeholder="Focus with green ring"
      className="border-2 border-gray-300 p-3 rounded-lg w-full focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-200"
    />

{/* Active State */}
<div className="mb-8">
    <h2 className="text-xl font-bold mb-4">Active State (Hold click)</h2>
    
    <button className="bg-red-500 text-white px-6 py-3 rounded-lg active:bg-red-800 active:scale-95">
      Press and Hold Me
    </button>
  </div>

 <button className="bg-red-200 p-5 active:bg-red-800 m-5">Press Me</button>

 <button className="hover:scale-110 transition">Smooth Animation</button>
 </div>
</section>

<section className="bg-orange-100 p-6 rounderd-kg shadow mb-7">
<h1 className="text-3xl font-bold mb-8">Lesson 9: Background Gradients</h1>  
  {/* Simple Gradients */}
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4">Simple Linear Gradients</h2>
    
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 rounded-lg mb-4 flex items-center justify-center">
      <p className="text-white font-bold text-xl">Left to Right</p>
    </div>
    
    <div className="bg-gradient-to-b from-green-400 to-blue-500 h-32 rounded-lg mb-4 flex items-center justify-center">
      <p className="text-white font-bold text-xl">Top to Bottom</p>
    </div>
    
    <div className="bg-gradient-to-br from-pink-500 to-orange-400 h-32 rounded-lg flex items-center justify-center">
      <p className="text-white font-bold text-xl">Diagonal (Bottom-Right)</p>
    </div>
  </div>

  {/* Three Color Gradients */}
  <div className="text-xl font-bold mb-4"> 
    
    <h1 className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 h-32 rounded-lg mb-4 flex items-center justify-center">Three color Gradients (via) </h1>
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 h-32 rounded-lg mb-4 flex items-center justify-center">
      <p className="text-white font-bold text-xl">Purple → Pink → Red</p>
    </div>
    <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 h-32 rounded-lg flex items-center justify-center">
      <p className="text-white font-bold text-xl">Cyan → Blue → Purple</p>
    </div>

    {/* Gradient Button */}
  <div>
    <h2 className="text-xl font-bold mb-4">Gradient Buttons</h2>
    
    <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:from-green-500 hover:to-blue-600 shadow-lg">
      Hover Me!
    </button>
  </div>

    </div>
</section>

  
  <section className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg shadow mb-7 ">
   <h1 className="text-3xl front-bold mb-8">Lesson 10:complete Responsive card</h1>


{/* Professional product card */}
<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 

{/* card 1 */}
<div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">


{/* image section */}

<div className="bg-gradient-to-r from-blue-550 to purple-600 h-48 flex items-center justify-center">
<p className="text-white text-2xl font-bold">Product Image</p>
</div>

 {/* Content Section */}
 <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">New</span>
          <span className="text-gray-500 text-sm">⭐ 4.8</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Premium Product</h3>
        <p className="text-gray-600 text-sm mb-4">
          This is a high-quality product with amazing features that will improve your life.
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-400 text-sm line-through">$99.99</p>
            <p className="text-3xl font-bold text-green-600">$79.99</p>
          </div>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm font-bold">20% OFF</span>
        </div>
        
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition">
          Add to Cart
        </button>
      </div>
    </div>
    
    {/* Card 2 */}
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 h-48 flex items-center justify-center">
        <p className="text-white text-2xl font-bold">Product Image</p>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">Sale</span>
          <span className="text-gray-500 text-sm">⭐ 4.9</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Featured Product</h3>
        <p className="text-gray-600 text-sm mb-4">
          Limited edition product with exclusive features. Get yours today!
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-400 text-sm line-through">$149.99</p>
            <p className="text-3xl font-bold text-green-600">$99.99</p>
          </div>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm font-bold">33% OFF</span>
        </div>
        
        <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition">
          Add to Cart
        </button>
      </div>
    </div>
    
  </div>
</section>

    </div>
  )
}

export default App;