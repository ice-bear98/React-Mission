import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { theme as themeState } from "../recoil/themeAtom";
import { IProduct, cartState, productsList } from "../recoil/cartItemAtom";
import React, { useState } from "react";

const Container = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    z-index: 1;
    align-items: center;
    justify-content: space-between;
    box-shadow: 10px 5px 10px rgba(0, 0, 0, 0.3);
    background-color: ${(props) => props.theme.headerBgColor};
    color: ${(props) => props.theme.headerTextColor};
    width: 100%;
    height: 80px;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    margin: 0px auto;
`;

const HeaderRight = styled(HeaderLeft)`
    position: relative;

    form {
        margin: 0px 10px;
        input {
            width: 250px;
            height: 40px;
            border: none;
            border-radius: 10px;
            background-color: ${(props) => props.theme.textBgColor};
            padding-left: 15px;
        }
    }
`;

const Toggle = styled.div`
    margin-left: 10px;
`;

const Title = styled.div`
    margin-left: 10px;
    font-weight: 700;
    font-size: 20px;
`;

const Nav = styled.ul`
    display: flex;
    font-weight: 700;
    li {
        margin-left: 15px;
    }
`;

const ThemeBtn = styled.button`
    background-color: inherit;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;

const Cart = styled.div`
    position: relative;

    div {
        width: 30px;
        height: 20px;
        border-radius: 10px;
        position: absolute;
        top: -10px;
        left: 15px;
        background-color: #ef4444;
        color: white;
        text-align: center;
    }
`;

const SearchList = styled.div`
    background-color: ${(props) => props.theme.SearchBgColor};
    position: absolute;
    bottom: -320px;
    width: 250px;
    height: 300px;
    border: 0.1px solid rgba(0, 0, 0, 0.1);
    border-top: none;
    max-height: 300px;
    overflow-y: scroll;
`;

const List = styled.div`
    padding: 10px;

    &:hover {
        background-color: ${(props) => props.theme.SearchHoverColor};
    }
`;

export default function Header() {
    const [searchResult, setSearchResult] = useState<IProduct[]>([]);
    const [theme, setTheme] = useRecoilState(themeState);
    const productList = useRecoilValue(productsList);
    const cartItems = useRecoilValue(cartState);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const handleProductDetail = (id: Number) => {
        navigate(`/product/${id}`);
        setInputValue("");
        setSearchResult([]);
    };

    const totalQuantity = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (!inputValue) {
            setSearchResult([]);
            return;
        }

        const regex = new RegExp(`${inputValue}`, "gi");
        const filteredProductList = productList.filter((product) =>
            regex.test(product.title)
        );
        console.log(filteredProductList);
        setSearchResult(filteredProductList);
    };
    return (
        <Container>
            <HeaderLeft>
                <Toggle>
                    <FontAwesomeIcon icon={faBars} />
                </Toggle>
                <Title>
                    <Link to="/">React Shop</Link>
                </Title>
                <Nav>
                    <li>
                        <Link to="/fashion">패션</Link>
                    </li>
                    <li>
                        <Link to="/accessory">액세서리</Link>
                    </li>
                    <li>
                        <Link to="/digital">디지털</Link>
                    </li>
                </Nav>
            </HeaderLeft>
            <HeaderRight>
                <ThemeBtn onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <FontAwesomeIcon icon={faSun} size="2x" />
                    ) : (
                        <FontAwesomeIcon icon={faMoon} size="2x" />
                    )}
                </ThemeBtn>
                <form>
                    <input
                        type="search"
                        placeholder="검색"
                        value={inputValue}
                        onChange={(e) => {
                            handleChange(e);
                            setInputValue(e.target.value);
                        }}
                    />
                    {searchResult.length > 0 && (
                        <SearchList>
                            {searchResult.map((product) => (
                                <List
                                    key={product.id}
                                    onClick={() =>
                                        handleProductDetail(product.id)
                                    }
                                >
                                    {product.title}
                                </List>
                            ))}
                        </SearchList>
                    )}
                </form>
                <Cart>
                    <Link to="/cart">
                        <FontAwesomeIcon icon={faBagShopping} size="2x" />
                    </Link>
                    <div>{totalQuantity}</div>
                </Cart>
            </HeaderRight>
        </Container>
    );
}
