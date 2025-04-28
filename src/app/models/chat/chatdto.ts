export class ChatDto {
    id: string;
    authorId: string;
    donaterId: string;
    name: string;
    photoBase64: string;
    createdAt: Date;
    messages?: ChatMessageDto[];

    constructor(data: any) {
        this.id = data.id;
        this.authorId = data.authorId;
        this.donaterId = data.donaterId;
        this.createdAt = new Date(data.createdAt);
        this.name = data.name;
        this.photoBase64 = data.photoBase64;
        this.messages = data.messages ? data.messages.map((msg: any) => new ChatMessageDto(msg)) : [];
    }
}

export class ChatMessageDto {
    id: string;
    authorId: string;
    message: string;
    createdAt: Date;

    constructor(data: any) {
        this.id = data.id;
        this.authorId = data.authorId;
        this.message = data.message;
        this.createdAt = new Date(data.createdAt);
    }
}
