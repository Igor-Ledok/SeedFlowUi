export class CreateProductDto
{
    name: string;
    categoryId: string;
    imageBase64: string;
    price: number;
    quantity: number;
    shortDescription: string;
    fullDescription: string;
    delivery: string;
    website: string;
    location: string;
}