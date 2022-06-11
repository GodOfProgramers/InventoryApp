const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get(){
  const rows = await db.query(
    `SELECT id, ProductName, PartNumber, ProductLabel, StartingInventory, InventoryReceived, InventoryShipped, InventoryOnHand, MinimumRequired 
    FROM products`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function create(product){
    const result = await db.query(
      `INSERT INTO products 
      (ProductName, PartNumber, ProductLabel, StartingInventory, InventoryReceived, InventoryShipped, InventoryOnHand, MinimumRequired) 
      VALUES 
      (${product.ProductName}, ${product.PartNumber}, ${product.ProductLabel}, ${product.StartingInventory}, ${product.InventoryReceived}, 
        ${product.InventoryShipped}, ${product.InventoryOnHand}, ${product.MinimumRequired})`
    );
  
    let message = 'Error in creating product';
  
    if (result.affectedRows) {
      message = 'Product created successfully';
    }
  
    return {message};
}


  async function update(id, product){
    const result = await db.query(
      `UPDATE products 
      SET ProductName="${product.ProductName}", 
      PartNumber=${product.PartNumber}, 
      ProductLabel="${product.ProductLabel}", 
      StartingInventory=${product.StartingInventory}, 
      InventoryReceived="${product.InventoryReceived}", 
      InventoryShipped=${product.InventoryShipped}, 
      InventoryOnHand="${product.InventoryOnHand}", 
      MinimumRequired=${product.MinimumRequired} 
      WHERE id=${id}` 
    );
  
    let message = 'Error in updating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language updated successfully';
    }
  
    return {message};
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM products WHERE id=${id}`
    );
  
    let message = 'Error in deleting product';
  
    if (result.affectedRows) {
      message = 'Product deleted successfully';
    }
  
    return {message};
}

async function removeMultiply(id){

    let idStr = id.join(",")

    const result = await db.query(
      `DELETE FROM products WHERE id IN (${idStr})`
    );
  
    let message = 'Error in deleting products';
  
    if (result.affectedRows) {
      message = 'Products deleted successfully';
    }
  
    return {message};
  }

module.exports = {
  get,
  create,
  update,
  remove,
  removeMultiply
}