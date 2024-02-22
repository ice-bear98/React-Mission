import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        textBgColor: string;
        headerBgColor: string;
        headerTextColor: string;
        textColor: string;
        footerBgColor: string;
        inputBgColor: string;
        border: string;
        borderLine: string;
        hover: string;
        SearchBgColor: string;
        SearchHoverColor: string;
    }
}
