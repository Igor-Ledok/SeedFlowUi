export class CreateChatDto {
    authorId?: string;
    projectId?: string;
  
    constructor(authorId?: string, projectId?: string) {
      this.authorId = authorId;
      this.projectId = projectId;
    }
  }
  