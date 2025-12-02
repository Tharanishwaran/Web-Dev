// ========================================
// COMPLETE MONGODB INTERVIEW PREPARATION
// Entry Level - E-Commerce Database
// Run in MongoDB Shell or Compass
// ========================================

// ========================================
// 1. DATABASE OPERATIONS
// ========================================

// Show all databases
show dbs

// Create/Switch to database (created when you insert data)
use ecommerce_db

// Show current database
db

// Drop database
db.dropDatabase()

// ========================================
// 2. CREATE COLLECTIONS & INSERT DATA
// ========================================

// Create collection explicitly (optional - auto-created on insert)
db.createCollection("users")
db.createCollection("products")
db.createCollection("orders")

// Show all collections
show collections

// ========================================
// 3. INSERT DOCUMENTS
// ========================================

// Insert single document
db.users.insertOne({
  name: "Alice",
  email: "alice@example.com",
  password: "pass123",
  age: 28,
  address: {
    street: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  },
  createdAt: new Date()
})

// Insert multiple documents
db.users.insertMany([
  {
    name: "Bob",
    email: "bob@example.com",
    password: "bobpass",
    age: 32,
    address: {
      street: "456 Park Ave",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001"
    },
    createdAt: new Date()
  },
  {
    name: "Charlie",
    email: "charlie@example.com",
    password: "charlie123",
    age: 25,
    address: {
      street: "789 Lake Rd",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    },
    createdAt: new Date()
  },
  {
    name: "David",
    email: "david@example.com",
    password: "david456",
    age: 30,
    createdAt: new Date()
  },
  {
    name: "Emma",
    email: "emma@example.com",
    password: "emma789",
    age: 27,
    address: {
      city: "Chennai",
      state: "Tamil Nadu"
    },
    createdAt: new Date()
  }
])

// Insert products
db.products.insertMany([
  {
    name: "Laptop",
    description: "High performance laptop",
    price: 45000,
    stock: 10,
    category: "Electronics",
    tags: ["computers", "electronics", "tech"],
    specifications: {
      brand: "Dell",
      ram: "16GB",
      storage: "512GB SSD"
    },
    createdAt: new Date()
  },
  {
    name: "Mouse",
    description: "Wireless mouse",
    price: 500,
    stock: 50,
    category: "Electronics",
    tags: ["accessories", "electronics"],
    specifications: {
      brand: "Logitech",
      wireless: true
    },
    createdAt: new Date()
  },
  {
    name: "Keyboard",
    description: "Mechanical keyboard",
    price: 1500,
    stock: 30,
    category: "Electronics",
    tags: ["accessories", "gaming"],
    createdAt: new Date()
  },
  {
    name: "Monitor",
    description: "27 inch monitor",
    price: 12000,
    stock: 15,
    category: "Electronics",
    tags: ["displays", "electronics"],
    specifications: {
      size: "27 inch",
      resolution: "2K"
    },
    createdAt: new Date()
  },
  {
    name: "Office Chair",
    description: "Ergonomic chair",
    price: 8000,
    stock: 20,
    category: "Furniture",
    tags: ["furniture", "office"],
    createdAt: new Date()
  },
  {
    name: "Desk",
    description: "Wooden desk",
    price: 15000,
    stock: 5,
    category: "Furniture",
    tags: ["furniture", "office"],
    createdAt: new Date()
  }
])

// Insert orders
db.orders.insertMany([
  {
    userId: ObjectId(), // Replace with actual user _id
    items: [
      { productName: "Laptop", quantity: 1, price: 45000 },
      { productName: "Mouse", quantity: 1, price: 500 }
    ],
    totalAmount: 45500,
    status: "completed",
    orderDate: new Date("2025-01-15")
  },
  {
    userId: ObjectId(),
    items: [
      { productName: "Keyboard", quantity: 1, price: 1500 }
    ],
    totalAmount: 1500,
    status: "pending",
    orderDate: new Date("2025-02-01")
  },
  {
    userId: ObjectId(),
    items: [
      { productName: "Monitor", quantity: 1, price: 12000 }
    ],
    totalAmount: 12000,
    status: "shipped",
    orderDate: new Date("2025-02-10")
  }
])

// ========================================
// 4. FIND (READ) OPERATIONS
// ========================================

// Find all documents
db.users.find()

// Find all with pretty print
db.users.find().pretty()

// Find with condition (WHERE equivalent)
db.users.find({ name: "Alice" })

// Find one document
db.users.findOne({ name: "Alice" })

// Find by _id
db.users.findOne({ _id: ObjectId("your_id_here") })

// Find with multiple conditions (AND)
db.users.find({ name: "Bob", age: 32 })

// Find with OR condition
db.users.find({
  $or: [
    { name: "Alice" },
    { name: "Charlie" }
  ]
})

// Find by age range (BETWEEN equivalent)
db.users.find({ age: { $gte: 25, $lte: 30 } })
// $gte = greater than or equal, $lte = less than or equal

// Find products with price > 5000
db.products.find({ price: { $gt: 5000 } })

// Find products with price < 2000
db.products.find({ price: { $lt: 2000 } })

// Not equal ($ne)
db.users.find({ name: { $ne: "Alice" } })

// ========================================
// 5. COMPARISON OPERATORS
// ========================================

// $eq  - Equal to
db.products.find({ category: { $eq: "Electronics" } })

// $gt  - Greater than
db.products.find({ price: { $gt: 10000 } })

// $gte - Greater than or equal
db.products.find({ price: { $gte: 1500 } })

// $lt  - Less than
db.products.find({ price: { $lt: 1000 } })

// $lte - Less than or equal
db.products.find({ price: { $lte: 10000 } })

// $ne  - Not equal
db.products.find({ category: { $ne: "Furniture" } })

// $in  - Match any value in array (IN equivalent)
db.products.find({ category: { $in: ["Electronics", "Furniture"] } })

// $nin - Not in array
db.products.find({ category: { $nin: ["Furniture"] } })

// ========================================
// 6. PATTERN MATCHING (LIKE equivalent)
// ========================================

// Contains pattern (case sensitive)
db.users.find({ email: /example/ })

// Starts with 'A' (case insensitive)
db.users.find({ name: /^A/i })

// Ends with '.com'
db.users.find({ email: /\.com$/ })

// Contains 'Chair' anywhere
db.products.find({ name: /Chair/i })

// ========================================
// 7. PROJECTION (SELECT specific fields)
// ========================================

// Show only name and email (exclude _id)
db.users.find({}, { name: 1, email: 1, _id: 0 })

// Show all except password
db.users.find({}, { password: 0 })

// Combine filter + projection
db.users.find(
  { age: { $gte: 28 } },
  { name: 1, email: 1, age: 1, _id: 0 }
)

// ========================================
// 8. SORTING (ORDER BY equivalent)
// ========================================

// Sort by name ascending (1 = ASC)
db.users.find().sort({ name: 1 })

// Sort by age descending (-1 = DESC)
db.users.find().sort({ age: -1 })

// Sort by price descending
db.products.find().sort({ price: -1 })

// Sort by multiple fields
db.products.find().sort({ category: 1, price: -1 })

// ========================================
// 9. LIMIT & SKIP (Pagination)
// ========================================

// Get first 3 documents
db.products.find().limit(3)

// Skip first 2 documents
db.products.find().skip(2)

// Pagination: Page 2, 3 items per page
db.products.find().skip(3).limit(3)

// Combine filter, sort, limit
db.products.find({ category: "Electronics" })
  .sort({ price: -1 })
  .limit(3)

// ========================================
// 10. COUNT DOCUMENTS
// ========================================

// Count all documents
db.users.countDocuments()

// Count with condition
db.products.countDocuments({ category: "Electronics" })

// Count products with price > 5000
db.products.countDocuments({ price: { $gt: 5000 } })

// ========================================
// 11. DISTINCT (Unique values)
// ========================================

// Get unique categories
db.products.distinct("category")

// Get unique cities from nested field
db.users.distinct("address.city")

// ========================================
// 12. UPDATE OPERATIONS
// ========================================

// Update single document
db.users.updateOne(
  { name: "Alice" },
  { $set: { age: 29 } }
)

// Update multiple documents
db.products.updateMany(
  { category: "Electronics" },
  { $set: { inStock: true } }
)

// Increment value
db.products.updateOne(
  { name: "Laptop" },
  { $inc: { stock: 5 } }  // Increase stock by 5
)

// Decrement value
db.products.updateOne(
  { name: "Mouse" },
  { $inc: { stock: -10 } }  // Decrease stock by 10
)

// Update multiple fields
db.users.updateOne(
  { name: "Bob" },
  { 
    $set: { 
      age: 33,
      email: "bob.new@example.com"
    } 
  }
)

// Add field to document
db.users.updateOne(
  { name: "Charlie" },
  { $set: { phone: "9876543210" } }
)

// Remove field from document
db.users.updateOne(
  { name: "Charlie" },
  { $unset: { phone: "" } }
)

// Update nested field
db.users.updateOne(
  { name: "Alice" },
  { $set: { "address.city": "Pune" } }
)

// Upsert: Insert if not exists, update if exists
db.users.updateOne(
  { name: "Frank" },
  { $set: { email: "frank@example.com", age: 35 } },
  { upsert: true }
)

// ========================================
// 13. ARRAY OPERATIONS
// ========================================

// Push element to array
db.products.updateOne(
  { name: "Laptop" },
  { $push: { tags: "premium" } }
)

// Push multiple elements
db.products.updateOne(
  { name: "Laptop" },
  { $push: { tags: { $each: ["bestseller", "featured"] } } }
)

// Remove element from array
db.products.updateOne(
  { name: "Laptop" },
  { $pull: { tags: "premium" } }
)

// Add to array only if not exists (like Set)
db.products.updateOne(
  { name: "Mouse" },
  { $addToSet: { tags: "wireless" } }
)

// Find documents where array contains value
db.products.find({ tags: "electronics" })

// Find documents where array contains ALL values
db.products.find({ tags: { $all: ["electronics", "accessories"] } })

// Find by array size
db.products.find({ tags: { $size: 3 } })

// ========================================
// 14. DELETE OPERATIONS
// ========================================

// Delete single document
db.users.deleteOne({ name: "Frank" })

// Delete multiple documents
db.products.deleteMany({ category: "Furniture" })

// Delete all documents in collection
db.orders.deleteMany({})

// ========================================
// 15. AGGREGATION PIPELINE (Advanced)
// ========================================

// Count products per category (GROUP BY)
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 },
      avgPrice: { $avg: "$price" },
      totalStock: { $sum: "$stock" }
    }
  }
])

// Average price of all products
db.products.aggregate([
  {
    $group: {
      _id: null,
      averagePrice: { $avg: "$price" },
      maxPrice: { $max: "$price" },
      minPrice: { $min: "$price" },
      totalProducts: { $sum: 1 }
    }
  }
])

// Filter then group (WHERE + GROUP BY)
db.products.aggregate([
  { $match: { category: "Electronics" } },
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  }
])

// Group by category, then sort
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      totalValue: { $sum: { $multiply: ["$price", "$stock"] } },
      count: { $sum: 1 }
    }
  },
  { $sort: { totalValue: -1 } }
])

// Project specific fields in aggregation
db.products.aggregate([
  {
    $project: {
      name: 1,
      price: 1,
      discountedPrice: { $multiply: ["$price", 0.9] } // 10% off
    }
  }
])

// Unwind array (flatten)
db.products.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])

// Match + Group + Sort + Limit (complex query)
db.products.aggregate([
  { $match: { price: { $gt: 1000 } } },
  { 
    $group: { 
      _id: "$category", 
      avgPrice: { $avg: "$price" } 
    } 
  },
  { $sort: { avgPrice: -1 } },
  { $limit: 3 }
])

// ========================================
// 16. LOOKUP (JOIN equivalent)
// ========================================

// First, let's add userId references to orders
// Get user IDs first
db.users.find({}, { _id: 1, name: 1 })

// Update orders with proper user references (use actual ObjectIds)
// Example structure for orders with user reference:
db.orders.insertOne({
  userId: ObjectId("actual_user_id_here"),
  items: [
    { productName: "Laptop", quantity: 1, price: 45000 }
  ],
  totalAmount: 45000,
  status: "completed",
  orderDate: new Date()
})

// Lookup (LEFT JOIN) - Join users with orders
db.orders.aggregate([
  {
    $lookup: {
      from: "users",           // Collection to join
      localField: "userId",    // Field from orders
      foreignField: "_id",     // Field from users
      as: "userDetails"        // Output array name
    }
  }
])

// Lookup with unwind (flatten result)
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      "user.name": 1,
      "user.email": 1,
      totalAmount: 1,
      status: 1,
      orderDate: 1
    }
  }
])

// ========================================
// 17. INDEXES (Performance optimization)
// ========================================

// Create index on single field
db.users.createIndex({ email: 1 })  // 1 = ascending

// Create index on multiple fields (compound index)
db.products.createIndex({ category: 1, price: -1 })

// Create unique index
db.users.createIndex({ email: 1 }, { unique: true })

// Create text index for search
db.products.createIndex({ name: "text", description: "text" })

// Text search using text index
db.products.find({ $text: { $search: "laptop" } })

// Show all indexes
db.users.getIndexes()

// Drop index
db.users.dropIndex("email_1")

// Drop all indexes except _id
db.users.dropIndexes()

// ========================================
// 18. EXISTS & TYPE CHECKING
// ========================================

// Find documents where field exists
db.users.find({ address: { $exists: true } })

// Find documents where field doesn't exist
db.users.find({ phone: { $exists: false } })

// Check field type
db.users.find({ age: { $type: "number" } })
db.users.find({ name: { $type: "string" } })

// ========================================
// 19. LOGICAL OPERATORS
// ========================================

// AND (implicit - comma separated)
db.products.find({ category: "Electronics", price: { $lt: 10000 } })

// AND (explicit)
db.products.find({
  $and: [
    { category: "Electronics" },
    { price: { $lt: 10000 } }
  ]
})

// OR
db.products.find({
  $or: [
    { category: "Electronics" },
    { category: "Furniture" }
  ]
})

// NOT
db.products.find({ price: { $not: { $gt: 10000 } } })

// NOR (not matching any condition)
db.products.find({
  $nor: [
    { price: { $lt: 1000 } },
    { category: "Furniture" }
  ]
})

// Complex query with multiple operators
db.products.find({
  $and: [
    { 
      $or: [
        { category: "Electronics" },
        { category: "Furniture" }
      ]
    },
    { price: { $gte: 1000, $lte: 15000 } },
    { stock: { $gt: 0 } }
  ]
})

// ========================================
// 20. BULK OPERATIONS
// ========================================

// Bulk write operations
db.products.bulkWrite([
  {
    insertOne: {
      document: {
        name: "Webcam",
        price: 3000,
        category: "Electronics",
        stock: 25
      }
    }
  },
  {
    updateOne: {
      filter: { name: "Mouse" },
      update: { $set: { price: 550 } }
    }
  },
  {
    deleteOne: {
      filter: { name: "Webcam" }
    }
  }
])

// ========================================
// 21. COMMON INTERVIEW QUERIES
// ========================================

// Q1: Find products with price between 1000 and 10000
db.products.find({
  price: { $gte: 1000, $lte: 10000 }
}).sort({ price: 1 })

// Q2: Count products by category
db.products.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])

// Q3: Top 3 most expensive products
db.products.find()
  .sort({ price: -1 })
  .limit(3)
  .pretty()

// Q4: Products with stock less than 20
db.products.find(
  { stock: { $lt: 20 } },
  { name: 1, stock: 1, _id: 0 }
)

// Q5: Users from specific cities
db.users.find(
  { "address.city": { $in: ["Mumbai", "Delhi", "Bangalore"] } },
  { name: 1, "address.city": 1, _id: 0 }
)

// Q6: Average product price per category
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  },
  { $sort: { avgPrice: -1 } }
])

// Q7: Products containing 'electronics' tag
db.products.find(
  { tags: "electronics" },
  { name: 1, price: 1, tags: 1 }
)

// Q8: Find users older than 28
db.users.find(
  { age: { $gt: 28 } },
  { name: 1, age: 1, _id: 0 }
).sort({ age: 1 })

// Q9: Total inventory value per category
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      totalValue: { $sum: { $multiply: ["$price", "$stock"] } },
      totalProducts: { $sum: 1 }
    }
  },
  { $sort: { totalValue: -1 } }
])

// Q10: Products with missing description field
db.products.find(
  { description: { $exists: false } },
  { name: 1, price: 1 }
)

// Q11: Users with addresses (nested field exists)
db.users.find(
  { "address.city": { $exists: true } },
  { name: 1, "address.city": 1, _id: 0 }
)

// Q12: Second most expensive product
db.products.find()
  .sort({ price: -1 })
  .skip(1)
  .limit(1)

// Q13: Products price above average
db.products.aggregate([
  {
    $group: {
      _id: null,
      avgPrice: { $avg: "$price" }
    }
  }
])
// Then use the avgPrice in:
db.products.find({ price: { $gt: 8500 } }) // Replace 8500 with actual avg

// Q14: Count orders by status
db.orders.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

// Q15: Find duplicate emails (if any)
db.users.aggregate([
  { $group: { _id: "$email", count: { $sum: 1 } } },
  { $match: { count: { $gt: 1 } } }
])

// ========================================
// 22. DATE OPERATIONS
// ========================================

// Find orders from specific date
db.orders.find({ 
  orderDate: { 
    $gte: new Date("2025-01-01"), 
    $lt: new Date("2025-02-01") 
  } 
})

// Orders in last 30 days
db.orders.find({
  orderDate: {
    $gte: new Date(new Date().setDate(new Date().getDate() - 30))
  }
})

// Group orders by month
db.orders.aggregate([
  {
    $group: {
      _id: { 
        year: { $year: "$orderDate" },
        month: { $month: "$orderDate" }
      },
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: "$totalAmount" }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
])

// ========================================
// 23. BACKUP & RESTORE (Terminal commands)
// ========================================

/*
// Export database (run in terminal, not mongo shell)
mongodump --db ecommerce_db --out ./backup

// Export specific collection
mongodump --db ecommerce_db --collection users --out ./backup

// Export as JSON
mongoexport --db ecommerce_db --collection products --out products.json

// Import database
mongorestore --db ecommerce_db ./backup/ecommerce_db

// Import JSON
mongoimport --db ecommerce_db --collection products --file products.json
*/

// ========================================
// 24. DATABASE VALIDATION & SCHEMA
// ========================================

// Create collection with validation
db.createCollection("employees", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "salary"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "must be a valid email"
        },
        salary: {
          bsonType: "number",
          minimum: 10000,
          description: "must be a number >= 10000"
        }
      }
    }
  }
})

// ========================================
// 25. CLEANUP
// ========================================

// Drop collection
db.users.drop()
db.products.drop()
db.orders.drop()

// Drop database
db.dropDatabase()

// ========================================
// END OF MONGODB INTERVIEW PREP
// ========================================

/*
KEY DIFFERENCES: SQL vs MongoDB

SQL                     MongoDB
---------------------   ---------------------
Database                Database
Table                   Collection
Row                     Document
Column                  Field
Primary Key             _id (auto-generated)
Foreign Key             Reference (manual)
JOIN                    $lookup / Embedded docs
WHERE                   find({ field: value })
GROUP BY                $group
ORDER BY                sort()
LIMIT                   limit()
SELECT                  projection

PRACTICE TIPS:
1. Master find() with various filters
2. Learn aggregation pipeline ($match, $group, $lookup)
3. Understand when to use embedded vs referenced documents
4. Practice CRUD operations
5. Know difference between updateOne and updateMany
6. Understand array operations ($push, $pull, $addToSet)
7. Learn to create efficient indexes

RUN THIS FILE:
- Open MongoDB Shell: mongosh
- Copy and paste sections one by one
- Or load file: load("complete_mongodb_interview_prep.js")
*/

