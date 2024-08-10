// import React, { useContext } from 'react'
// import myContext from '../../context/myContext'
// import Layout from '../../components/layout/Layout'
// import Loader from '../../components/loader/Loader'

// const Order = () => {

//   const userid = JSON.parse(localStorage.getItem('user')).user.uid
//   const context = useContext(myContext)
//   const { mode, loading, order } = context

//   return (
//     <Layout>
//       {loading && <Loader />}
//       {order.length > 0 ?
//         (<>
//           <div className=" h-full pt-10">
//             {
//               order.filter(obj => obj.userid == userid).map((order) => {
//                 // order.cartItems.map()
//                 return (
//                   <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
//                     {
//                       order.cartItems.map((item) => {
//                         return (
//                           <div className="rounded-lg md:w-2/3">
//                             <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
//                               <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
//                               <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                                 <div className="mt-5 sm:mt-0">
//                                   <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
//                                   <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
//                                   <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       })
//                     }
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </>)
//         :
//         (
//           <h2 className=' w-full text-center tex-2xl text-lime-600'>Not Order</h2>
//         )

//       }
//     </Layout>
//   )
// }

// export default Order


// title, price, imageUrl, category, date



import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";


const Order = () => {
  // user
  const user = JSON.parse(localStorage.getItem("users"));

  const context = useContext(myContext);
  const { loading, order, orderDelete } = context;

  return (
    <Layout>
      <div className=" container mx-auto px-4 py-5 lg:py-8 w-full h-full">

        {/* bottom  */}
        <div className="bottom ">
          {/* main 1 */}
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            {/* text  */}
            <h2 className=" text-2xl lg:text-3xl font-bold text-indigo-900">
              Order Details
            </h2>

            {/* main 2 */}

            <div className="flex justify-center relative top-10">
              {loading && <Loader />}
            </div>

            {order
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => {
                return (
                  <div key={index} className="div justify-center">
                    {order.cartItems.map((item, index) => {
                      const {
                        title, price, imageUrl, category, date,quantity
                      } = item;
                      // console.log(item);
                      return (
                        <div
                          key={index}
                          className="mt-5 flex flex-col overflow-hidden rounded-xl border border-indigo-100 md:flex-row"
                        >
                          {/* main 3  */}
                          <div className="w-full border-r border-indigo-100 bg-indigo-50 md:max-w-xs">
                            {/* left  */}
                            <div className="p-8">
                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                <div className="mb-4">
                                  <div className="text-sm font-semibold text-black">
                                    Order Id
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {/* {id} */}
                                    {id}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Date
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {date}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Total Amount
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    ₹ {price * quantity}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="text-sm font-semibold">
                                    Order Status
                                  </div>
                                  <div className="text-sm font-medium text-green-900 first-letter:uppercase">
                                    {order.status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* right  */}
                          <div className="flex-1">
                            <div className="p-8">
                              <ul className="-my-7 divide-y divide-gray-200">
                                <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                        src={productImageUrl}
                                        alt="img"
                                      />
                                    </div>

                                    <div className="ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-indigo-900">
                                          {title}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-indigo-500">
                                          {category}
                                        </p>
                                      </div>

                                      <p className="mt-4 text-sm font-medium text-indigo-500">
                                        x {quantity}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-indigo-900">
                                      ₹ {price}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
