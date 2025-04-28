export class CreatePurchasedOrderDto {
    buyerId: string;
    purchasedProducts: PurchasedProductDto[];
    totalPrice: number;
    useBonus: boolean;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    deliveryCountry: string;
    paymentMethod: string;
    deliveryMethod: string;
    deliveryInformation: string;
    paymentType: string;
}

export class PurchasedProductDto {
    productId: string;
    quantity: number;     // Было string, стало number
    totalPrice: number;    // Было string, стало number
}