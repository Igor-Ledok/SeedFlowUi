export interface ReturnProjectDto {
    project: ReturnProjectInfoDto;
    teamMembers: ReturnTeamMemberDto[];
    rewards: ReturnRewardDto[];
    projectPhoto: string[];
    descriptions: ReturnDescriptionDto[];
  }
  
  export interface ReturnProjectInfoDto {
    id: string;
    title: string;
    shortDescription: string;
    collectionAmount: number;
    collectedAmount?: number;
    collectionDuration: number;
    startDate: string;
    endDate: string;
    ban: boolean;
    finishedStatus: boolean;
  
    selectedCategoryId?: string; 
    selectedCategoryPhoto?: string;
  
    youTubeVideoUrl?: string;
    budgetPlan?: string;
    budgetPlanUrl?: string;
    mainPhotoUrl?: string;
    budgetArticles?: string;
    budgetArticlesUrl?: string;
  
    phone?: string;
    telegram?: string;
    viber?: string;
    linkedIn?: string;
    whatsApp?: string;
    email?: string;
  
    instagram?: string;
    facebook?: string;
    telegramChannel?: string;
    twitter?: string;
    linkedInGroup?: string;
  
    organizationName: string;
    edrpou: string;
    fullAddress: string;
    city: string;
    iban: string;
    bankName: string;
    mfo: string;
    signatory: string;
    contactnumber: string;
    contract: string;
  
    authorId: string;
    aurhorName: string;
  }
  
  export interface ReturnTeamMemberDto {
    id: string;
    name: string;
    role: string;
    phone?: string;
    viber?: string;
    telegram?: string;
    email?: string;
    urlPhoto?: string;
  }
  
  export interface ReturnRewardDto {
    id: string;
    amount: number;
    limit: number;
    collectedLimit?: number;
    collection?: number;
    description: string;
    photoUrl?: string;
    imageName?: string;
  }
  
  export interface ReturnDescriptionDto {
    id: string;
    titleDetailedDescription: string;
    detailedDescription: string;
  }
  