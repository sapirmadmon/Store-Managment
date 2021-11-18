const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StoreDB',
  password: '1234',
  port: 5432,
});

const getAllProducts = async () => {
  // retrieve data from ALL columns of the 'products' table.
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
  } catch (error) {
    return error;
  }
};

const getProductById = async (id) => {
    try {
      const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [
        id,
      ]);
      return rows[0];
    } catch (error) {
         return error;
    }
}

//get all products by id of customer
const getAllProductsByIdCustomer = async (idCustomer) => {
  try {
      const {rows} = await pool.query('SELECT purchases.*, products.* FROM purchases INNER JOIN products ON purchases.product_id = products.id WHERE purchases.customer_id = $1', [
        idCustomer,
      ]);
      return rows;
  }catch(error) {
      return error;
  }
};

const updateProduct = async (id, prod) => {
  const data = await pool.query(
    'UPDATE products SET name=$1, price=$2, quantity=$3 WHERE id=$4',
    [prod.name, prod.price, prod.quantity, id]
  );
  return 'updated';
};

const deleteProduct = async (id) => {
  const data = await pool.query('delete from products where id=$1', [id]);
  return 'deleted';
};

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProductsByIdCustomer,
  };