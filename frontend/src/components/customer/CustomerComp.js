function CustomerComp({ customer }) {
  return (
    <div id="wrapperCustomer">
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Full Name:</strong>
            </td>
            <td>{`${customer.firstname} ${customer.lastname}`}</td>
          </tr>
          <tr>
            <td>
              <strong>City:</strong>
            </td>
            <td>{customer.city}</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
}

export default CustomerComp;
