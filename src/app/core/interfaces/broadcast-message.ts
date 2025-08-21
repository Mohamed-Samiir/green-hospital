export interface BroadcastMessage {
  _id?: string;
  message: string;
  senderName: string;
  createdAt: Date;
  isRead: boolean;
  readersCount?: number;
  readers?: MessageReader[];
}

export interface MessageReader {
  userEmail: string;
  userName: string;
  readAt: Date;
}

export interface BroadcastMessageResponse {
  messageId: string;
  message: string;
  senderName: string;
  createdAt: Date;
  readers: MessageReader[];
  readersCount: number;
}
