import { CommentReplyDto } from "./commentReplyDto";

export interface CommentDto {
    id: string;
    senderId: string;
    senderName: string;
    senderPhotoBase64: string;
    isDonator: boolean; // по умолчанию false
    projectId: string;
    message: string;
    createdAt: string;
    reply?: CommentReplyDto | null;
  }