const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StoreDB',
  password: '1234',
  port: 5432,
});

const getAllCustomers = async () => {
    // retrieve data from ALL columns of the 'products' table.
    try {
      const { rows } = await pool.query('SELECT * FROM customers');
      return rows;
    } catch (error) {
      return error;
    }
  };

  const getCustomerById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM customers WHERE id = $1', [
      id,
    ]);
    return rows[0];
  };

  
const updateCustomer = async (id, customer) => {
    const data = await pool.query(
      'UPDATE customers SET firstname=$1, lastname=$2, city=$3 WHERE id=$4',
      [customer.firstname, customer.lastname, customer.city, id]
    );
    return 'customer updated';
  };

const deleteCustomer = async (id) => {
    const data = await pool.query('delete from customers where id=$1', [id]);
    return 'customer deleted';
  };

module.exports = {
    getAllCustomers,
    getCustomerById,
    deleteCustomer,
    updateCustomer,
  };