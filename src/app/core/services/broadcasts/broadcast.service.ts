import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { BroadcastMessage } from '../../interfaces/broadcast-message';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private socket: Socket;
  private messagesSubject = new BehaviorSubject<BroadcastMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  // API URLs
  private sendBroadcastURL = environment.baseURL + 'broadcasts/send';
  private getMessagesURL = environment.baseURL + 'broadcasts/getMessages';
  private markAsReadURL = environment.baseURL + 'broadcasts/markAsRead';
  private getReadersURL = environment.baseURL + 'broadcasts/getReaders';
  private clearHistoryURL = environment.baseURL + 'broadcasts/clearHistory';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.initializeSocket();
  }

  private initializeSocket() {
    this.socket = io(environment.socketURL || environment.baseURL.replace('/api/', ''), {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('Connected to broadcast server');
      // Authenticate socket connection
      if (this.authService.isLoggedIn()) {
        const user = JSON.parse(localStorage.getItem('User') || '{}');
        this.socket.emit('authenticate', {
          userId: user._id,
          userEmail: user.email,
          isAdmin: user.isAdmin
        });
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from broadcast server');
    });

    // Listen for new broadcast messages
    this.socket.on('newBroadcast', (message: BroadcastMessage) => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([message, ...currentMessages]);
    });

    // Listen for message read notifications (for admins)
    this.socket.on('messageRead', (data: any) => {
      console.log('Message read by user:', data);
      // You can emit this to update admin UI if needed
    });

    // Listen for history cleared event
    this.socket.on('historyCleared', () => {
      this.messagesSubject.next([]);
    });
  }

  // Send broadcast message (admin only)
  sendBroadcast(message: string): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(this.sendBroadcastURL, { message });
  }

  // Get all broadcast messages
  getMessages(): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(this.getMessagesURL);
  }

  // Mark message as read
  markAsRead(messageId: string): Observable<BaseResponseModel> {
    return this.http.post<BaseResponseModel>(`${this.markAsReadURL}/${messageId}`, {});
  }

  // Get readers of a message (admin only)
  getReaders(messageId: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${this.getReadersURL}/${messageId}`);
  }

  // Clear all broadcast history (admin only)
  clearHistory(): Observable<BaseResponseModel> {
    return this.http.delete<BaseResponseModel>(this.clearHistoryURL);
  }

  // Update local messages state
  updateMessages(messages: BroadcastMessage[]) {
    this.messagesSubject.next(messages);
  }

  // Get current messages
  getCurrentMessages(): BroadcastMessage[] {
    return this.messagesSubject.value;
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Reconnect socket
  reconnect() {
    if (this.socket) {
      this.socket.connect();
    }
  }
}
