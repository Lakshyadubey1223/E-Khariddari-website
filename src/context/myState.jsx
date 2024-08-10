import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../firebase/FirebaseConfig";

function MyState(props) {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  // ********************* Get Product Function ***************************//
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // ********************** Add Product Section  **********************//
  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product Add successfully");
      setTimeout(() => {
        window.location.href = "/admin-dashboard";
      }, 800);
      getProductData();
      // closeModal()
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const edithandle = (item) => {
    setProducts(item);
  };

useEffect(() => {
  getProductData();
}, []);


  // update product
  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/admin-dashboard";
      }, 800);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setProducts("");
  };

  //delete product
  const deleteProduct = async (item) => {
    setLoading(true);

    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      // toast.success('Product Deleted Falied')
      console.log(error);
      setLoading(false);
    }
  };
   

//*************** order details
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "order"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

    //delete order function
    const orderDelete = async (id) => {
      setLoading(true)
      try {
          await deleteDoc(doc(fireDB, 'order', id))
          toast.success('Order Deleted successfully')
          getAllOrderFunction();
          setLoading(false)
      } catch (error) {
          console.log(error)
          setLoading(false)
      }
    }

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        deleteProduct,
        edithandle,
        updateProduct,
        order,
        user,
        searchkey, 
        setSearchkey,
        filterType, 
        setFilterType,
        filterPrice, 
        setFilterPrice,
        orderDelete
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;



// function myState(props) {
//   const [mode, setMode] = useState('light');

//   const toggleMode = () => {
//       if (mode === 'light') {
//           setMode('dark');
//           document.body.style.backgroundColor = "rgb(17, 24, 39)"
//       }
//       else {
//           setMode('light');
//           document.body.style.backgroundColor = "white"
//       }
//   }

//   const [loading, setLoading] = useState(false);

//   const [products, setProducts] = useState({
//       title: null,
//       price: null,
//       imageUrl: null,
//       category: null,
//       description: null,
//       time: Timestamp.now(),
//       date: new Date().toLocaleString(
//           "en-US",
//           {
//               month: "short",
//               day: "2-digit",
//               year: "numeric",
//           }
//       )
//   });

//   const addProduct = async () => {
//       if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
//           return toast.error("all fields are required")
//       }

//       setLoading(true)

//       try {
//           const productRef = collection(fireDB, 'products');
//           await addDoc(productRef, products)
//           toast.success("Add product successfully");
//           setTimeout(() => {
//               window.location.href = '/dashboard'
//           }, 800);
//           getProductData();
//           setLoading(false)
//       } catch (error) {
//           console.log(error);
//           setLoading(false)
//       }
//       // setProducts("")


//   }

//   const [product, setProduct] = useState([]);

//   const getProductData = async () => {

//       setLoading(true)

//       try {
//           const q = query(
//               collection(fireDB, 'products'),
//               orderBy('time')
//           );

//           const data = onSnapshot(q, (QuerySnapshot) => {
//               let productArray = [];
//               QuerySnapshot.forEach((doc) => {
//                   productArray.push({ ...doc.data(), id: doc.id });
//               });
//               setProduct(productArray);
//               setLoading(false)
//           });

//           return () => data;

//       } catch (error) {
//           console.log(error)
//           setLoading(false)
//       }

//   }

//   useEffect(() => {
//       getProductData();
//   }, []);

//   // update product function

//   const edithandle = (item) => {
//       setProducts(item)
//   }

//   const updateProduct = async () => {
//       setLoading(true)
//       try {

//           await setDoc(doc(fireDB, 'products', products.id), products)
//           toast.success("Product Updated successfully")
//           setTimeout(() => {
//               window.location.href = '/dashboard'
//           }, 800);
//           getProductData();
//           setLoading(false)

//       } catch (error) {
//           console.log(error)
//           setLoading(false)
//       }
//   }

//   // delete product

//   const deleteProduct = async (item) => {
//       setLoading(true)
//       try {
//           await deleteDoc(doc(fireDB, 'products', item.id))
//           toast.success('Product Deleted successfully')
//           getProductData();
//           setLoading(false)
//       } catch (error) {
//           console.log(error)
//           setLoading(false)
//       }
//   }


//   const [order, setOrder] = useState([]);

//   const getOrderData = async () => {
//       setLoading(true)
//       try {
//           const result = await getDocs(collection(fireDB, "order"))
//           const ordersArray = [];
//           result.forEach((doc) => {
//               ordersArray.push(doc.data());
//               setLoading(false)
//           });
//           setOrder(ordersArray);
//           console.log(ordersArray)
//           setLoading(false);
//       } catch (error) {
//           console.log(error)
//           setLoading(false)
//       }
//   }

//   const [user, setUser] = useState([]);

//   const getUserData = async () => {
//       setLoading(true)
//       try {
//           const result = await getDocs(collection(fireDB, "users"))
//           const usersArray = [];
//           result.forEach((doc) => {
//               usersArray.push(doc.data());
//               setLoading(false)
//           });
//           setUser(usersArray);
//           console.log(usersArray)
//           setLoading(false);
//       } catch (error) {
//           console.log(error)
//           setLoading(false)
//       }
//   }

//   useEffect(() => {
//       getOrderData();
//       getUserData();
//   }, []);

//   const [searchkey, setSearchkey] = useState('')
//   const [filterType, setFilterType] = useState('')
//   const [filterPrice, setFilterPrice] = useState('')

//   return (
//       <MyContext.Provider value={{
//           mode, toggleMode, loading, setLoading,
//           products, setProducts, addProduct, product,
//           edithandle, updateProduct, deleteProduct, order,
//           user, searchkey, setSearchkey,filterType,setFilterType,
//           filterPrice,setFilterPrice
//       }}>
//           {props.children}
//       </MyContext.Provider>
//   )
// }

// export default myState