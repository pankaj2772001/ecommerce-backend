const { initializeData } = require("./db/db.connect");

initializeData();

const Product = require("./models/products.models");
const Category = require("./models/categories.models");
const Wishlist = require("./models/wishlist.models");
const Address = require('./models/address.model')

const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const cors = require("cors");
const Cart = require("./models/cart.models");
const Order = require("./models/order.model");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

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
    const addProduct = new Product(newProduct);

    const saveProduct = await addProduct.save();

    return saveProduct;
  } catch (error) {
    console.log("Failed to add new product", error);
  }
}

//! route for adding products
app.post("/products", async (req, res) => {
  try {
    const addProduct = await createProduct(req.body);

    if (addProduct) {
      res.status(201).json({
        message: "Product added successfully",
        addedProduct: addProduct,
      });
    } else {
      res.status(404).json({ error: "Failed to add product" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

//! query for fetch all products

async function getAllProducts() {
  try {
    const product = await Product.find();

    return product;
  } catch (error) {
    console.log("Failed to fetch product", error);
  }
}

//route for fetching products
app.get("/products", async (req, res) => {
  try {
    const product = await getAllProducts();

    if (product != 0) {
      res.json({ data: { products: product } });
    } else {
      res.status(404).json({ error: "products not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

//query to addto wishlist

async function addToWishList(product) {
  try {
    const addProduct = new Wishlist(product);

    const saveProduct = await addProduct.save();

    return saveProduct;
  } catch (error) {
    console.log("Failed to add to cart", error);
  }
}

//route to add to wishlist

app.post("/wishlist", async (req, res) => {
  try {
    const product = await addToWishList(req.body);

    if (!product) {
      res.status(404).json({ error: "Failed to add to wishlist" });
    } else {
      res
        .status(202)
        .json({ message: "Successfully added to wishlist", item: product });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
});

async function getWishlistItems() {
  try {
    const allItems = await Wishlist.find().populate("product");
    console.log(allItems);
    return allItems;
  } catch (error) {
    console.log("Error fetching wishlist items:", error);
  }
}

app.get("/wishlist", async (req, res) => {
  try {
    const items = await getWishlistItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishlist items." });
  }
});

//query to removeWishList

async function removeWishListItems(itemId) {
  try {
    const deletedItem = await Wishlist.findByIdAndDelete(itemId);

    console.log(deletedItem);
  } catch (error) {}
}

//route for removeWishlist

app.delete("/wishList/:productId", async (req, res) => {
  try {
    const deletedItem = await removeWishListItems(req.params.productId);

    res.json(deletedItem);
  } catch (error) {
    res.json({ error: "Hello" });
  }
});

//query to for add to cart

async function addToCart(newItem) {
  try {
    const addedItem = new Cart(newItem);

    const saveItem = await addedItem.save();

    return saveItem;
  } catch (error) {}
}

app.post("/cart", async (req, res) => {
  try {
    const addedItem = await addToCart(req.body);

    if (!addedItem) {
      res.status(404).json({ error: "failed to add item to cart" });
    } else {
      res.status(200).json({ message: "Item added to cart successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to add item to cart" });
  }
});

//query to get allItems from Cart

async function getAllItemsFromCart() {
  try {
    const allItems = await Cart.find().populate("product", "title brand price originalPrice discountPercentage");

    return allItems;
  } catch (error) {}
}

// getAllItemsFromCart()

app.get("/cart", async (req, res) => {
  try {
    const allItems = await getAllItemsFromCart();
    console.log(allItems);
    res.json({ item: allItems });
  } catch (error) {}
});

async function updateCartItems(itemId, action) {
  const cartItem = await Cart.findById(itemId);

  try {
    if (action === "increement") {
      const updatedItemQty = await Cart.findByIdAndUpdate(
        itemId,
        { $inc: { quantity: 1 } },
        { new: true }
      );
      return updatedItemQty;
    } else if (action === "decreement") {
      if (cartItem.quantity > 1) {
        const updatedItemQty = await Cart.findByIdAndUpdate(
          itemId,
          { $inc: { quantity: -1 } },
          { new: true, runValidators: true }
        );
        return updatedItemQty;
      } else {
        return "min qty reached";
      }
    }
  } catch (error) {}
}

app.post("/cart/update/:cartItemId", async (req, res) => {
  try {
    const { action } = req.body;
    console.log(action);

    const updatedItem = await updateCartItems(req.params.cartItemId, action);

    if (updatedItem.quantity > 1) {
      console.log(updatedItem);
      res
        .status(200)
        .json({ message: "Quantity Updated", updateItem: updatedItem });
    } else {
      res.json({ message: "Minimum Qty Reached" });
    }
  } catch (error) {}
});


//query for remove item from cart

async function removeItemFromCart(itemId){

  try {

    const removedItem = await Cart.findByIdAndDelete(itemId)
    
    return removedItem
  } catch (error) {
    
  }
}

app.delete('/cart/:cartId', async (req,res) => {

  try {

    const removedItem = await removeItemFromCart(req.params.cartId)

    res.json(removedItem)
    
  } catch (error) {
    
  }
})

//query for adding new address

async function addNewAddress(newAddress){

  try {

    const address = new Address(newAddress)

    const saveAddress = await address.save()

    return saveAddress
    
  } catch (error) {

    console.log("failed to add new address")
    
  }


}

// route for adding new address

app.post("/address", async (req, res) => {

  try {

    const addedAddress = await addNewAddress(req.body)

    if(addedAddress.length !== 0){

res.status(200).json({message: "Address added successfully", address: addedAddress})

    }else{
  res.status(404).json({error: "Failed to add address"})

    }
  
    
  } catch (error) {

    res.status(500).json({error: "Failed to add address"})
    
  }
})

//query to updateAdd by id

async function updateAddress(addressId, dataToUpdate){

  try {

    const updatedAddress = await Address.findByIdAndUpdate(addressId, dataToUpdate, {new: true})

    return updatedAddress

    
  } catch (error) {

    console.log("Failed to update address", error)
  }
}

//route to updateAdd by id
app.post("/address/update/:addressId", async (req, res) => {


  try {

    
    const updatedAddress = await updateAddress(req.params.addressId, req.body)

    res.json({message: "Address Update Successfully", updatedAdd: updatedAddress})

    
  } catch (error) {
    
    res.status(500).json({error: "Failed to update address"})
  }
})

// query to get all Address

async function getAllAddress(){

  try {
    
    const allAddress = await Address.find()

    return allAddress

  } catch (error) {

    console.log("address not found")
    
  }
}

// route to get all Address

app.get('/address', async (req, res) => {

  try {

    const allAddress = await getAllAddress()

    if(allAddress.length != 0){

      res.json(allAddress)

    }else{

      res.json({error: "No address found"})
    }
    
  } catch (error) {

    res.status(500).json({error: "Failed to fetch address"})
    
  }
})


//query for deleting the adress

async function deleteAddress(addressId){

  try {

    const deletedAddress = await Address.findByIdAndDelete(addressId)

    return deletedAddress
    
  } catch (error) {
    console.log("Failed to delete address")
  }
}

//route for deleting address

app.delete('/address/:addressId', async (req, res) => {

  try {

    const deletedAdress = await deleteAddress(req.params.addressId)

    res.json({message: "Address deleted successfully"})
    
  } catch (error) {

    res.json({error: "Failed to delete address"})
    
  }
})

//query to create new Order

async function createNewOrder(newOrder){
  

  try {

    const order = new Order(newOrder)

    const saveOrder = await order.save()

    return saveOrder
    
  } catch (error) {

    console.log("Failed to add new order")
    
  }
}

// route to create new order

app.post('/order', async (req, res) => {

  try {

    const order = await createNewOrder(req.body)

    res.json(order)
    
  } catch (error) {
    
    res.status(500).json({error: "Failed to order items"})
  }
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
