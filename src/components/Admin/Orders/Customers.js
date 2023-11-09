import { useDispatch, useSelector } from "react-redux";
import OrdersStats from "./OrdersStatistics";
import { useEffect } from "react";
import { fetchOrdersAction } from "../../../redux/slices/orders/ordersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";

export default function Customers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);
  const {
    orders: { orders },
    loading,
    error,
  } = useSelector((state) => state?.orders);
  console.log(orders);

  const uniqueCustomers = orders?.filter((item, idx) => {
    return orders?.map((customer) => customer?.id).indexOf(item.id) === idx;
  });
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>

      <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
        All Customers [{uniqueCustomers?.length}]
      </h3>
      <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        {loading ? (
          <LoadingComponent />
        ) : uniqueCustomers?.length <= 0 ? (
          <NoDataFound />
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Full name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Country
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  City
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Phone
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Postal Code
                </th>
                {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {uniqueCustomers?.map((order) => (
                <tr key={order?.user?.email}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {order?.user?.fullname}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {order?.user?.email}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {order?.user?.shippingAddress?.country}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {order?.user?.shippingAddress?.city}
                  </td>
                  <td className="py-4 pl-3 pr-4  text-sm font-medium sm:pr-6">
                    {order?.user?.shippingAddress?.phone}
                  </td>
                  <td className="py-4 pl-3 pr-4  text-sm font-medium sm:pr-6">
                    {order?.user?.shippingAddress?.postalCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
