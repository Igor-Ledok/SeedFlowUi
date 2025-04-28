export interface ProjectList {
    id: string;
    title: string;
    shortDescription: string;
    mainPhotoUrl: string;
    collectionAmount: number;
    collectedAmount?: number;
    collectionDuration: number;
    favorite: boolean;
    startDate: string;
    endDate: string;
    category: string;
    categoryName: string;
    categoryPhotoUrl: string;
    teamsCount: number;
    rewardsCount: number;
  }
