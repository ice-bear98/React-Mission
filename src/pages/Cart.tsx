import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, priceState } from "../recoil/cartItemAtom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Course = styled.div`
    color: ${(props) => props.theme.textColor};
    margin: 0px auto;
    margin-bottom: 80px;
    margin-top: 30px;
    max-width: 1500px;
`;

const CartContainer = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.textColor};
`;

const TotalPrice = styled.div`
    display: flex;
    div {
        font-size: 26px;
        line-height: 50px;
    }

    button {
        color: white;
        margin-left: 10px;
        height: 50px;
        width: 130px;
        border: none;
        border-radius: 10px;
        background-color: #570df8;
        &:hover {
            cursor: pointer;
            background-color: #4406cb;
        }
        &:active {
            transition: 0.1s ease-in;
            transform: scale(0.95);
        }
    }
`;

const CartWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const NotProduct = styled.div`
    color: ${(props) => props.theme.textColor};
    p {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 30px;
    }

    button {
        height: 50px;
        width: 130px;
        border: none;
        color: white;
        border-radius: 10px;
        background-color: #570df8;
        &:hover {
            cursor: pointer;
            background-color: #4406cb;
        }
        &:active {
            transition: 0.1s ease-in;
            transform: scale(0.95);
        }
    }
`;

const ProductWrap = styled.div`
    display: flex;
    margin-bottom: 20px;
    img {
        background-color: white;
        padding: 30px;
        width: 200px;
        height: 250px;
        border-radius: 15px;
        &:hover {
            cursor: pointer;
        }
    }
`;

const ButtonWrap = styled.div`
    display: flex;
    div {
        height: 50px;
        width: 40px;
        text-align: center;
        line-height: 50px;
    }
    button {
        height: 50px;
        width: 40px;
        border: none;

        background-color: #570df8;
        color: white;
        &:hover {
            cursor: pointer;
            background-color: #4406cb;
        }
        &:active {
            transition: 0.1s ease-in;
            transform: scale(0.95);
        }
    }
    button:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    button:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px;
    h1 {
        font-size: 24px;
        font-weight: 700;
        &:hover {
            cursor: pointer;
        }
    }

    p {
        font-size: 40px;
    }
`;

const ModalContainer = styled.div`
    position: fixed;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
    position: absolute;
    width: 500px;
    height: 200px;
    padding: 25px;
    border-radius: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    p:first-child {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 15px;
    }
    p:last-child {
        font-weight: 500;
    }
`;

const ModalBtnWrap = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 50px;
    button {
        border-radius: 10px;
        margin-right: 5px;
    }
    button:first-child {
        width: 50px;
        height: 50px;
        background-color: #570df8;
        color: white;
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
        width: 100px;
        height: 50px;
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

export default function Cart() {
    const [cartItem, setCartItem] = useRecoilState(cartState);
    const totalPrice = useRecoilValue(priceState);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const handelHome = () => {
        navigate(`/`);
    };
    const handelProductsDetail = (id: Number) => {
        navigate(`/product/${id}`);
    };

    const clear = () => {
        setCartItem([]);
    };

    const increase = (id: number) => {
        setCartItem((cartList) =>
            cartList.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrease = (id: number) => {
        setCartItem((cartList) => {
            const cartItem = cartList.find((item) => item.id === id);
            if (!cartItem || cartItem.quantity === 1) {
                return cartList.filter((item) => item.id !== id);
            }
            return cartList.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    return (
        <div>
            <Course>홈 &gt; 장바구니</Course>
            <CartContainer>
                <CartWrap>
                    {cartItem.length > 0 ? (
                        cartItem.map((item) => (
                            <ProductWrap key={item.id}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    onClick={() =>
                                        handelProductsDetail(item.id)
                                    }
                                />
                                <ProductInfo>
                                    <h1
                                        onClick={() =>
                                            handelProductsDetail(item.id)
                                        }
                                    >
                                        {item.title}
                                    </h1>
                                    <p>
                                        ${item.price * item.quantity} ($
                                        {item.price})
                                    </p>
                                    <ButtonWrap>
                                        <button
                                            onClick={() => decrease(item.id)}
                                        >
                                            -
                                        </button>
                                        <div>{item.quantity}</div>
                                        <button
                                            onClick={() => increase(item.id)}
                                        >
                                            +
                                        </button>
                                    </ButtonWrap>
                                </ProductInfo>
                            </ProductWrap>
                        ))
                    ) : (
                        <NotProduct>
                            <p>장바구니의 물품이 없습니다.</p>
                            <button onClick={handelHome}>쇼핑하러 이동</button>
                        </NotProduct>
                    )}
                </CartWrap>
                <TotalPrice>
                    <div>총: ${totalPrice.toFixed(0)}</div>
                    <button onClick={openModal}>구매하기</button>
                </TotalPrice>
                {isOpen && (
                    <ModalContainer>
                        <Modal>
                            <p>정말로 구매하시겠습니까?</p>
                            <p>장바구니의 모든 상품들이 삭제됩니다.</p>
                            <ModalBtnWrap>
                                <button onClick={clear}>네</button>
                                <button onClick={closeModal}>아니요</button>
                            </ModalBtnWrap>
                        </Modal>
                    </ModalContainer>
                )}
            </CartContainer>
        </div>
    );
}
