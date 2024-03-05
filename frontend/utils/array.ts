import { IProduct } from "@/interfaces/Product";

export function orderBy(products: IProduct[], by: 'title' | 'brand'): IProduct[] {
    const compare = (a: IProduct, b: IProduct): number => {
        if (a[by] < b[by]) return -1;
        if (a[by] > b[by]) return 1;
        return 0;
    };

    return products.sort(compare);
}