import React from "react";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import Cart from "./Pages/Checkout/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import Notfound from "./Pages/Notfound";

const routes = [
    {
        path: "/",
        exact: true,
        main: ()=> <Home />
    },
    {
        path: "/Category/:id",
        exact: false,
        main: ({match})=><Category match={match} />
    },
    
    {
        path: "/Cart",
        exact: false,
        main :()=> <Cart />
    },
    {
        path: "/Checkout",
        exact: false,
        // match đễ đọc tham số trên url
        main: ()=> <Checkout />
    },
    
    {
        path: "",
        exact: false,
        main: ()=><Notfound />
    }
];

export default routes;