/* pages */
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import Accessory from "./pages/Accessory";
import Digital from "./pages/Digital";
import ProductsDetails from "./pages/Productsdetails ";
import Cart from "./pages/Cart";
import Error from "./pages/Error";

/* component*/
import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
    min-height: 70vh;
`;

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Header />
            <Content>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fashion" element={<Fashion />} />
                    <Route path="/accessory" element={<Accessory />} />
                    <Route path="/digital" element={<Digital />} />
                    <Route path="/product/:id" element={<ProductsDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/*" element={<Error />} />
                </Routes>
            </Content>
            <Footer />
        </BrowserRouter>
    );
}
