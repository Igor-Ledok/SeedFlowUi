export interface TopicDto {
    id: string;
    name: string;
    categories: CategoryDto[];
  }
  
  export interface CategoryDto {
    id: string;
    name: string;
    photo?: string;
    topicId: number;

    checked?: boolean;
  }
  