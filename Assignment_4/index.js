const express = require('express')
require("dotenv").config();
const mysql = require('mysql2')
const port = process.env.PORT
const app = express()
app.use(express.json())
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'mo',
    password: process.env.DB_PASSWORD,
    database: 'retail_store',
    port: '3306'
});
connection.connect((err) => {
    if (err)
        return err.message
    console.log(`connected to db`);

})
//Create a product
app.post("/Products", (req, res) => {
    const {
        ProductId,
        name,
        price,
        quantity,
        subblierId
    } = req.body

    const createPoductQuery = "INSERT INTO products(ProductId,name,price,quantity,subblierId) VALUES (?,?,?,?,?);"
    connection.query(createPoductQuery, [ProductId, name, price, quantity, subblierId], (err, result) => {
        if (err)
            return res.status(500).json(`internal error ${err.message}`)
        return res.status(201).json({ massege: 'created' })


    })
})

//Retrieve all products.
// app.get("/Products", (req, res) => {
//     connection.query("SELECT *FROM Products", (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         return res.status(200).json(result)


//     })
// })

//Retrieve a product by ID

// app.get("/Products/:id", (req, res) => {
//     const id = Number(req.params.id)
//     connection.query("SELECT *FROM Products WHERE ProductId = ?", [id], (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         return res.status(200).json(result)


//     })
// })

//Update a product

app.patch("/Products/:id", (req, res) => {
    const id = Number(req.params.id)
    const {
        ProductId,
        name,
        price,
        quantity,
        subblierId
    } = req.body

    const updatePoductQuery = "UPDATE `products` SET `name`=?,`price`=?,`quantity`=?,`subblierId`=? WHERE `ProductId`=?;"
    connection.query(updatePoductQuery, [name, price, quantity, subblierId, ProductId], (err, result) => {
        if (err)
            return res.status(500).json(`internal error ${err.message}`)
        if (result.affectedRows > 0) return res.status(201).json({ massege: 'updated' })



    })
})

//Delete a product

// app.delete("/Products/:id", (req, res) => {
//     const id = Number(req.params.id)
//     const deletePoductQuery = "DELETE FROM `products` WHERE ProductId = ?;"
//     connection.query(deletePoductQuery, [id], (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         if (result.affectedRows > 0) return res.status(201).json({ massege: 'deleted' })



//     })
// })
//________________________________________________________________

//Create a supplier.
app.post("/Subbliers", (req, res) => {
    const {
        subblierId,
        subblierName,

    } = req.body

    const createsubblierQuery = "INSERT INTO subbliers(subblierId,subblierName) VALUES (?,?);"
    connection.query(createsubblierQuery, [subblierId, subblierName], (err, result) => {
        if (err)
            return res.status(500).json(`internal error ${err.message}`)
        return res.status(201).json({ massege: 'created' })


    })
})


//Retrieve all suppliers.
// app.get("/Subbliers", (req, res) => {
//     connection.query("SELECT *FROM subbliers", (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         return res.status(200).json(result)


//     })
// })
//________________________________________________________________
// update supplier infromation :
app.patch("/Subbliers/:id", (req, res) => {
    const id = Number(req.params.id)
    const {
        
        subblierName,
        
    } = req.body

    const updatesupplierQuery = "UPDATE `suppliers` SET `subblierName`=? WHERE `subblierId`=?;"
    connection.query(updatesupplierQuery, [subblierName,id], (err, result) => {
        if (err)
            return res.status(500).json(`internal error ${err.message}`)
        if (result.affectedRows > 0) return res.status(201).json({ massege: 'updated' })



    })
})
//________________________________________________________________
//Delete a supplier.

app.delete("/Subbliers/:id", (req, res) => {
    const id = Number(req.params.id)
    const deleteSupplierQuery = "DELETE FROM `suppliers` WHERE subblierId = ?;"
    connection.query(deleteSupplierQuery, [id], (err, result) => {
        if (err)
            return res.status(500).json(`internal error ${err.message}`)
        if (result.affectedRows > 0) return res.status(201).json({ massege: 'deleted' })})})

//________________________________________________________________

// create sales

app.post("/Sales", (req, res) => {
    const {

        QuantitySold,
        SaleDate,
        ProductId,

    } = req.body

    const createsaleQuery = "INSERT INTO sales(QuantitySold,SaleDate,ProductId) VALUES (?,?,?);"
    connection.query(createsaleQuery, [QuantitySold, SaleDate, ProductId], (err, result) => {
        if (err)
            return res.status(500).json(`internal error ${err.message}`)
        return res.status(201).json({ massege: 'created' })


    })
})

//________________________________________________________________

//Add a Category column to the Products table.
app.put("/Products/addColumn", (req, res) => {
    const addingCategoryColumnQuery = "ALTER TABLE products ADD COLUMN category VARCHAR(100) ;"
    connection.query(addingCategoryColumnQuery, (err, result) => {
        if (err)
            return res.status(500).json(`error = ${err.message}`)
        return res.status(201).json('Table Modified')

    })
})
//________________________________________________________________
//Remove the Category column.
app.put("/Products/removeColumn", (req, res) => {
    const removeingColumnQuery = "ALTER TABLE products DROP COLUMN category;"
    connection.query(removeingColumnQuery, (err, result) => {
        if (err)
            return res.status(500).json(`error = ${err.message}`)
        return res.status(201).json('Table Deleted')

    })
})
//ALTER TABLE subbliers MODIFY  COLUMN subblierName VARCHAR(200) UNIQUE NOT NULL;
// ________________________________________________________________
//Change ContactNumber to VARCHAR
app.put("/Subbliers/modifyColumn", (req, res) => {
    const modifyColumnQuery = "ALTER TABLE subbliers MODIFY  COLUMN contactNumber VARCHAR(15) UNIQUE NOT NULL;"
    connection.query(modifyColumnQuery, (err, result) => {
        if (err)
            return res.status(500).json(`error = ${err.message}`)
        return res.status(201).json('Table Modified')

    })
})


//Add a NOT NULL constraint to ProductName.
app.put("/Products/modifyColumn", (req, res) => {
    const modifyColumnQuery = "ALTER TABLE products MODIFY  COLUMN name VARCHAR(255) UNIQUE NOT NULL;"
    connection.query(modifyColumnQuery, (err, result) => {
        if (err)
            return res.status(500).json(`error = ${err.message}`)
        return res.status(201).json('Table Modified')

    })
})

/**6-
 * INSERT INTO `subbliers`( `subblierName`, `contactNum`) VALUES (1,'FreshFoods','01001234567')
  INSERT INTO `products`( `name`, `price`, `quantity`, `subblierId`) VALUES (   'Milk',15.00,50,1)
  INSERT INTO `products`( `name`, `price`, `quantity`, `subblierId`) VALUES (   'Bread',10.00,30,1)
  INSERT INTO `products`( `name`, `price`, `quantity`, `subblierId`) VALUES (   'Eggs',20.00,40,1)

*/

//update the price of product
app.patch("/Products/upatePriceById/:id", (req, res) => {
    const id = Number(req.params.id)
    const {price} = req.body

    const updatePoductPriceQuery = "UPDATE `products` SET `price`=? WHERE `ProductId`=?;"
    connection.query(updatePoductPriceQuery, [price, id], (err, result) => {
        if (err)
            return res.status(500).json(`internal error ${err.message}`)
        if (result.affectedRows > 0) return res.status(200).json({ massege: 'updated' })



    })
})
//________________________________________________________________

// Delete product by name "Egg"

// app.delete("/Products/:name", (req, res) => {
//     const name = req.params.name
//     const deletePoductQuery = "DELETE FROM `products` WHERE name = ?;"
//     console.log("name:", name);
//     console.log("type:", typeof name);   
//     connection.query(deletePoductQuery, [name], (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         if (result.affectedRows > 0) return res.status(201).json({ massege: 'deleted' })



//     })
// })

//________________________________________________________________

//endpoint to retrieve the total quantity sold for each product using SQL aggregate functions
// app.get("/Products/quantities", (req, res) => {
//     connection.query("SELECT products.name,sales.QuantitySold FROM products JOIN sales ON products.ProductId=sales.ProductId;", (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         return res.status(200).json(result)


//     })
// })
//________________________________________________________________

//retrieve the product with the highest stock quantity
// app.get("/Products/quantities", (req, res) => {
//     connection.query("SELECT name,quantity FROM `products`", (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         return res.status(200).json(result)


//     })
// })
//________________________________________________________________
//retrieve suppliers whose names start with 'F'.
// app.get("/subbliers", (req, res) => {
//     const char=req.query.nameStartWith
//     connection.query("SELECT * FROM `subbliers` WHERE subblierName LIKE ? ;",[`${char}%`], (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         return res.status(200).json(result)


//     })
// })
//________________________________________________________________
//retrieve all products that have never been sold.

// app.get("/sales/haveNeverDone", (req, res) => {
//     connection.query("SELECT products.name FROM products LEFT JOIN sales ON products.ProductId=sales.ProductId WHERE sales.SaleId IS NULL ", (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         return res.status(200).json(result)


//     })
// })
//________________________________________________________________
// retrieve all sales including:Product name,Quantity sold,Sale date

// app.get("/sales", (req, res) => {
//     connection.query("SELECT products.name , sales.QuantitySold, sales.SaleDate FROM products RIGHT JOIN sales ON products.ProductId = sales.SaleId; ", (err, result) => {
//         if (err)
//             return res.status(500).json(`internal error ${err.message}`)
//         return res.status(200).json(result)


//     })
// })
//________________________________________________________________
// 14 - Creating a SQL script 
/** 
 * CREATE USER "store_manager" iDENTIFIED BY "@#DDGJFKHK"
 * ________________________________________________________
 * 
 * GRANT INSERT ON retail_store.* TO  store_manager 
 * GRANT INSERT ON retail_store.* TO  store_manager
 * GRANT INSERT ON retail_store.* TO  store_manager 
 * ________________________________________________________
 * 15
 * REVOKE UPDATE ON retail_store.* FROM  store_manager 
 * 
 * ________________________________________________________
 * 16
 * GRANT DELETE ON retail_store.sales TO  store_manager

*/

app.listen(port, () => {
    console.log("Server running on port 3000");
});

