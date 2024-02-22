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
const Course = styled.div`
    color: ${(props) => props.theme.textColor};
    margin: 25px auto;
    max-width: 1500px;
`;

export default function Accessory() {
    return (
        <div>
            <Course>홈 &gt; 액세사리</Course>
            <Productwrap>
                <h1>액세사리</h1>
                <Products categoryFilter={["jewelery"]} />
            </Productwrap>
        </div>
    );
}
