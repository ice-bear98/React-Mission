import { Link, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productsList, cartState, Product } from "../recoil/cartItemAtom";

import styled from "styled-components";
import { useMemo } from "react";

const Course = styled.div`
    color: ${(props) => props.theme.textColor};
    margin: 25px auto;
    max-width: 1500px;
`;

const ProductContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto;
    max-width: 1500px;
    color: ${(props) => props.theme.textColor};
`;

const ProductImg = styled.div`
    background-color: white;
    img {
        width: 500px;
        height: 300px;
        padding: 25px;
    }
`;

const ProductInfo = styled.div`
    padding: 30px;
    h1 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
        span {
            font-size: 14px;
            margin-left: 15px;
            background-color: #37cdbe;
            border-radius: 10px;
            padding: 0px 5px;
            font-weight: 600;
        }
    }
    div:first-child {
        margin-bottom: 20px;
    }
    p {
        margin-bottom: 20px;
    }
`;

const ProductBtnWrap = styled.div`
    display: flex;

    button:first-child {
        font-weight: 700;
        background-color: #570df8;
        color: white;
        width: 140px;
        height: 50px;
        border-radius: 10px;
        margin-right: 10px;
        &:hover {
            cursor: pointer;
            background-color: #4406cb;
        }
        &:active {
            transition: 0.1s ease-in;
            transform: scale(0.95);
        }
    }
    button:last-child {
        font-weight: 700;
        width: 140px;
        height: 50px;
        border-radius: 10px;
        border: ${(props) => props.theme.borderLine};
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.color};
        &:hover {
            cursor: pointer;
            transition: 0.2s ease-in-out;
            background-color: ${(props) => props.theme.hover};
            color: white;
        }
        &:active {
            transition: 0.1s ease-in;
            transform: scale(0.95);
        }
    }
`;

export default function Products() {
    const { id } = useParams();
    const products = useRecoilValue(productsList);
    const setCartItems = useSetRecoilState(cartState);

    const product = useMemo(
        () => products.find((product) => product.id.toString() === id),
        [id]
    );

    const addCart = () => {
        setCartItems((oldCart: Product[]) => {
            if (!product) return oldCart;

            const hasItem = oldCart.find((item) => item.id === product.id);
            if (hasItem) {
                return oldCart.map((item) =>
                    item.id === product?.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...oldCart, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <div>
            <Course>홈 &gt; {product?.title}</Course>
            <ProductContainer>
                <ProductImg>
                    <img
                        src={product?.image}
                        alt={product?.title}
                        style={{ maxWidth: "100%" }}
                    />
                </ProductImg>
                <ProductInfo>
                    <h1>
                        {product?.title}
                        <span>NEW</span>
                    </h1>

                    <p>{product?.description}</p>

                    <div>
                        <div>평점 들어올곳</div>
                        {product?.rating.rate} ({product?.rating.count} reviews)
                    </div>

                    <p>${product?.price}</p>

                    <ProductBtnWrap>
                        <button onClick={addCart}>장바구니에 담기</button>
                        <button>
                            <Link to="/cart">장바구니로 이동</Link>
                        </button>
                    </ProductBtnWrap>
                </ProductInfo>
            </ProductContainer>
        </div>
    );
}
