const date = require('date-and-time');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StoreDB',
  password: '1234',
  port: 5432,
});

const getAllPurchases = async () => {
  try {
   // const {rows} = await pool.query('SELECT purchases.*, customers.firstname, customers.lastname, products.name FROM ((purchases INNER JOIN customers ON purchases.customer_id = customers.id) INNER JOIN products ON purchases.product_id = products.id)');
    const {rows} = await pool.query('SELECT purchases.*, customers.firstname, customers.lastname, products.name FROM purchases JOIN products ON purchases.product_id = products.id JOIN customers ON purchases.customer_id = customers.id'
    );
    return rows;
  } catch (error) {
    return error.massage;
  }
};

const getAllPurchasesByProduct = async (idProduct) => {
    try {

        const {rows} = await pool.query('SELECT purchases.*, customers.* FROM purchases INNER JOIN customers ON purchases.customer_id = customers.id WHERE purchases.product_id = $1', [
            idProduct,
        ]);

        return rows;
    }catch(error) {
        return error;
    }
};

const addPurchaseOfCustomer = async (pur) => {
   try {
    const curDate = new Date();
    const data = await pool.query(
      'INSERT INTO purchases(customer_id, product_id, date) VALUES ($1, $2, $3)',[pur.customer_id, pur.product_id, date.format(curDate,'YYYY-MM-DD')]);
     return {"customer_id": pur.customer_id, "product_id": pur.product_id, "date": date.format(curDate,'YYYY-MM-DD')};
    
  } catch(error) {
    return error.massage;
  }
    
  };

  
const deletePurchasesByProdId = async (id) => {
    const data = await pool.query('delete from purchases where product_id=$1', [id]);
    return 'deleted';
};

const deletePurchasesByCustomerId = async (id) => {
  const data = await pool.query('delete from purchases where customer_id=$1', [id]);
  return 'deleted';
};


module.exports = {
    getAllPurchases,
    getAllPurchasesByProduct,
    addPurchaseOfCustomer,
    deletePurchasesByProdId,
    deletePurchasesByCustomerId,
  };