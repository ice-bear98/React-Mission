import styled from "styled-components";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import jeansImage from "../assets/bluejeans.jpeg";
import digitalImage from "../assets/digital.jpeg";
import marketImage from "../assets/market.jpeg";

const CarouselItem = styled.div`
    height: 700px;
`;

const StyledImage = styled.img`
    position: relative;
    display: block;
`;

const ImageInfo = styled.div`
    position: absolute;
    top: 50%;
    left: 20%;
    transition: translateY(-50%);
    width: 300px;
    max-width: 600px;
    padding: 20px;
    text-align: center;

    h2 {
        font-size: 30px;
        font-weight: 800;
        color: #ffffff;
    }
    p {
        font-size: 15px;

        color: #ffffff;
    }
`;

const LinkWrap = styled.div`
    margin: 10px 0px 0px 0px;
    padding: 10px 10px;
    line-height: 25px;
    font-size: 16px;
    width: 120px;
    height: 50px;

    background-color: #6d6c6a;
    border-radius: 10px;
    transition: 0.3s ease-in;
    color: #ffffff;
    &:hover {
        background-color: #313641;
    }
`;

const imageData = [
    {
        alt: "fashion",
        title: "물빠진 청바지!",
        text: "이제 막 도착한 패션 청바지를 구경해 보세요.",
        url: jeansImage,
        link: "/fashion",
    },

    {
        alt: "image2",
        title: "신속한 업무처리!",
        text: "다양한 디지털 상품을 둘러보세요.",
        url: digitalImage,
        link: "/digital",
    },

    {
        alt: "image3",
        title: "신선한 식품!",
        text: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
        url: marketImage,
        link: "/*",
    },
];

export default function CarouselUI() {
    return (
        <Carousel>
            {imageData.map((image, index) => (
                <CarouselItem key={index}>
                    <StyledImage src={image.url} alt={image.alt} />
                    <ImageInfo>
                        <h2>{image.title}</h2>
                        <p>{image.text}</p>

                        <LinkWrap>
                            <Link to={image.link}>바로가기 &rarr;</Link>
                        </LinkWrap>
                    </ImageInfo>
                </CarouselItem>
            ))}
        </Carousel>
    );
}
