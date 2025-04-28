import { CategoryDto } from "../project/topic.interface";

export class FilterRequestDto { 
    startSum: number;
    endSum: number;
    categories: CategoryDto[];
}