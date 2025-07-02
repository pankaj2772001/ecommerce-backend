const {initializeData} = require("./db/db.connect")

initializeData()

const Product = require("./models/products.models")
const Category = require("./models/categories.models")

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


//! query to add new category

async function createCategory(newCategory) {

    try {

        const addCategory = new Category(newCategory)

        const saveCategory = await addCategory.save()

        return saveCategory

    } catch (error) {

        console.log("Failed to add new category", error)
        
    }
    
}

//! post route to add category

app.post('/categories', async (req, res) => {

    try {

        const addedCategory = await createCategory(req.body)

        if(addedCategory){

            res.status(201).json({message: "Category added successfully", addedCategory: addedCategory})
        }else{

            res.status(404).json({error: "Failed to add category"})
        }


    } catch (error) {

        res.status(500).json({error: "Failed to add category"})
        
    }
})




async function createProduct(newProduct) {

    try {

        const addProduct = new Product(newProduct)

        const saveProduct = await addProduct.save()

        return saveProduct

    } catch (error) {

        console.log("Failed to add new product", error)
        
    }
    
}

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

        const product = await Product.find().populate("category")

        return product
         
        
    } catch (error) {

        console.log("Failed to fetch product", error)
        
    }
}

getAllProducts()

app.get('/products', async (req, res) => {

    try {

        const product = await getAllProducts()

        if(product != 0){

            res.json({data: {products: product}})
        }
        
    } catch (error) {
        
    }
})




const PORT = process.env.PORT || 3000

app.listen(PORT,() => {

    console.log(`server is running on port ${PORT}`)
})