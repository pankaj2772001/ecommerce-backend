const {initializeData} = require("./db/db.connect")

initializeData()

const Product = require("./models/products.models")
const Category = require("./models/categories.models")
const Wishlist = require("./models/wishlist.model")

const express = require('express')
require("dotenv").config()

const app = express()

app.use(express.json())

const cors = require('cors')

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))


// //! query to add new category

// async function createCategory(newCategory) {

//     try {

//         const addCategory = new Category(newCategory)

//         const saveCategory = await addCategory.save()

//         return saveCategory

//     } catch (error) {

//         console.log("Failed to add new category", error)
        
//     }
    
// }

// //! post route to add category

// app.post('/categories', async (req, res) => {

//     try {

//         const addedCategory = await createCategory(req.body)

//         if(addedCategory){

//             res.status(201).json({message: "Category added successfully", addedCategory: addedCategory})
//         }else{

//             res.status(404).json({error: "Failed to add category"})
//         }


//     } catch (error) {

//         res.status(500).json({error: "Failed to add category"})
        
//     }
// })

// //! query for fetch category from DB

// async function getAllCategory(){

//     try {

//         const category = await Category.find()

//         return category

//     } catch (error) {
        
//     }
// }

// //! get route to fetch categories

// app.get("/categories", async (req, res) => {

//     try {

//         const category = await getAllCategory()

//         if(category !=0 ){
//             res.json({data: {categories: category}})
//         }else{
//             res.status(404).json({error: "Categories not found"})
//         }

//     } catch (error) {
//         res.status(500).json({error: "Failed to fetch categories"})
//     }
// })



//! query to add product
async function createProduct(newProduct) {

    try {

        const addProduct = new Product(newProduct)

        const saveProduct = await addProduct.save()

        return saveProduct

    } catch (error) {

        console.log("Failed to add new product", error)
        
    }
    
}

//! route for adding products
app.post('/products', async (req, res) => {

    try {

        const addProduct = await createProduct(req.body)

        if(addProduct){

            res.status(201).json({message: "Product added successfully", addedProduct: addProduct})
        }else{

            res.status(404).json({error: "Failed to add product"})
        }


    } catch (error) {

        res.status(500).json({error: "Failed to add product"})
        
    }
})

//! query for fetch all products

async function getAllProducts(){

    try {

        const product = await Product.find()

        return product
         
        
    } catch (error) {

        console.log("Failed to fetch product", error)
        
    }
}



//route for fetching products
app.get('/products', async (req, res) => {

    try {

        const product = await getAllProducts()

        if(product != 0){

            res.json({data: {products: product}})
        }else{
            res.status(404).json({error: "products not found"})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch products"})
        
    }
})


//query to addto wishlist

async function addToWishList(product) {

    try {

        const addProduct = new Wishlist(product)

        const saveProduct = await addProduct.save()

        return saveProduct
        
    } catch (error) {

        console.log("Failed to add to cart", error)
        
    }
    
}

//route to add to wishlist

app.post("/wishlist", async (req, res) => {

    try {

        const product = await addToWishList(req.body)

        if(!product){

            res.status(404).json({error: "Failed to add to wishlist"})
        }else{

            res.status(202).json({message: "Successfully added to wishlist", item: product})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to add to wishlist"})
        
    }
})




const PORT = process.env.PORT || 3000

app.listen(PORT,() => {

    console.log(`server is running on port ${PORT}`)
})