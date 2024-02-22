import { selector, atom } from "recoil";

interface IRating {
    readonly rate?: number;
    readonly count?: number;
}
export interface IProduct {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly category: string;
    readonly price: number;
    readonly image: string;
    readonly rating: IRating;
}
export type Product = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
};

export const cartState = atom<Product[]>({
    key: "cartState",
    default: [],
});

export const productsList = selector<IProduct[]>({
    key: "productsList",
    get: async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            return (await response.json()) || [];
        } catch (error) {
            console.log(`Error: \n${error}`);
            return [];
        }
    },
});

export const priceState = selector({
    key: "priceState",
    get: ({ get }) => {
        const cartList = get(cartState);
        return cartList.reduce(
            (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
            0
        );
    },
});
