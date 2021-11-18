import { observer } from "mobx-react-lite";

function TotalPurchases({ store }) {
  return (
    <div>{`Total amount of purchased products: ${store.purchasesLen}`}</div>
  );
}

export default observer(TotalPurchases);
