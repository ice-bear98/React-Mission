import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = styled.div`
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ErrorTitle = styled.div`
    margin-bottom: 30px;
    color: ${(props) => props.theme.textColor};
    h1 {
        text-align: center;
        font-size: 200px;
        font-weight: 700;
    }
    span {
        font-size: 50px;
        font-weight: 500;
    }
`;

const Navi = styled.div`
    background-color: #570df8;
    color: white;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    line-height: 70px;
    border-radius: 10px;
    width: 170px;
    height: 70px;
`;

export default function Error() {
    const navigate = useNavigate();
    return (
        <ErrorPage>
            <ErrorTitle>
                <h1>404</h1>
                <span>페이지를 찾을 수 없습니다.</span>
            </ErrorTitle>
            <Navi onClick={() => navigate("/")}>메인 으로</Navi>
        </ErrorPage>
    );
}
