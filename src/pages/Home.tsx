import CarouselUI from "../components/CarouselUI";
import Products from "../components/Products";
import styled from "styled-components";

const Productwrap = styled.div`
    margin-bottom: 50px;
    h1 {
        font-weight: 700;
        font-size: 45px;
        text-align: center;
        margin-bottom: 20px;
    }
`;

export default function Home() {
    return (
        <div>
            <CarouselUI />
            <Productwrap>
                <h1>패션</h1>
                <Products
                    categoryFilter={["men's clothing", "women's clothing"]}
                    length={4}
                />
            </Productwrap>
            <Productwrap>
                <h1>액세사리</h1>
                <Products categoryFilter={["jewelery"]} length={4} />
            </Productwrap>
            <Productwrap>
                <h1>패션 디지털</h1>
                <Products categoryFilter={["electronics"]} length={4} />
            </Productwrap>
        </div>
    );
}
