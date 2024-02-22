import { useRecoilValue } from "recoil";
import { productsList } from "../recoil/cartItemAtom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Suspense } from "react";

const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    max-width: 1500px;
    place-items: center;
    margin-left: auto;
    margin-right: auto;
`;

const Product = styled.div`
    width: 400px;
    height: 600px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: ${(props) => props.theme.border};
    background-color: white;

    text-align: center;
    overflow: hidden;
    &:hover {
        cursor: pointer;
        img {
            transition: 0.5s;
            transform: scale(1.2);
        }
    }
`;

const ProductImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    img {
        max-width: 50%;
        max-height: 60%;
    }
`;

const ProductInfo = styled.div`
    height: 20%;
    padding: 20px;
    background-color: ${(props) => props.theme.textBgColor};
    color: ${(props) => props.theme.textColor};
    h3 {
        font-weight: 700;
        margin-bottom: 20px;
    }
`;

interface ProductsProps {
    categoryFilter: string[];
    length?: number;
}

export default function Products({ categoryFilter, length }: ProductsProps) {
    const products = useRecoilValue(productsList);
    const navigate = useNavigate();

    const handleProductDetail = (id: Number) => {
        navigate(`/product/${id}`);
    };

    const filteredProducts = products
        .filter((product) => categoryFilter.includes(product.category))
        .slice(0, length ? length : products.length);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductContainer>
                {filteredProducts.map((product) => (
                    <Product
                        key={product.id}
                        onClick={() => handleProductDetail(product.id)}
                    >
                        <ProductImage>
                            <img src={product.image} alt={product.title} />
                        </ProductImage>
                        <ProductInfo>
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                        </ProductInfo>
                    </Product>
                ))}
            </ProductContainer>
        </Suspense>
    );
}
