export class ReturnProductDto
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
    fullDescription: string;
    delivery: string;
    website: string;
    location: string;
    isFavourite: boolean;
}