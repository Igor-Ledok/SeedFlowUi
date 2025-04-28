export class ReturnProductListDto
{
    id: string;
    name: string;
    categoryId: string;
    categoryName: string;
    categoryImageBase64: string;
    imageBase64: string;
    date: string;
    price: number;
    quantity: number;
    shortDescription: string;
    isFavourite: boolean;
}