import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BroadcastService } from 'src/app/core/services/broadcasts/broadcast.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { BroadcastMessage, MessageReader } from 'src/app/core/interfaces/broadcast-message';

@Component({
  selector: 'app-broadcast-panel',
  templateUrl: './broadcast-panel.component.html',
  styleUrls: ['./broadcast-panel.component.css']
})
export class BroadcastPanelComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  broadcastForm: FormGroup;
  messages: BroadcastMessage[] = [];
  isLoading = false;
  isShowReadersDialog = false;
  selectedMessageReaders: MessageReader[] = [];
  selectedMessageInfo: any = {};

  private messagesSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private broadcastService: BroadcastService,
    public authService: AuthService,
    private alertify: AlertifyService,
    private translate: TranslateService,
    private confirmationService: ConfirmationService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadMessages();
    this.subscribeToMessages();
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
    this.broadcastService.disconnect();
  }

  buildForm() {
    this.broadcastForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]]
    });
  }

  get f() {
    return this.broadcastForm.controls;
  }

  subscribeToMessages() {
    this.messagesSubscription = this.broadcastService.messages$.subscribe(
      (messages: BroadcastMessage[]) => {
        this.messages = messages;
        setTimeout(() => this.scrollToBottom(), 100);
      }
    );
  }

  loadMessages() {
    this.isLoading = true;
    this.broadcastService.getMessages().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.messages = res.data || [];
          this.broadcastService.updateMessages(this.messages);
          setTimeout(() => this.scrollToBottom(), 100);
        } else {
          this.alertify.error(res.message || 'حدث خطأ أثناء جلب الرسائل');
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.alertify.error('حدث خطأ أثناء جلب الرسائل');
        this.isLoading = false;
      }
    });
  }

  sendBroadcast() {
    if (this.broadcastForm.valid && this.authService.isAdmin()) {
      const message = this.f['message'].value.trim();

      this.broadcastService.sendBroadcast(message).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.alertify.success('تم إرسال الرسالة بنجاح');
            this.broadcastForm.reset();
          } else {
            this.alertify.error(res.message || 'حدث خطأ أثناء إرسال الرسالة');
          }
        },
        error: (error) => {
          this.alertify.error('حدث خطأ أثناء إرسال الرسالة');
        }
      });
    } else {
      this.broadcastForm.markAllAsTouched();
    }
  }

  markAsRead(message: BroadcastMessage) {
    if (!message.isRead && message._id) {
      this.broadcastService.markAsRead(message._id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            // Update local message state
            const messageIndex = this.messages.findIndex(m => m._id === message._id);
            if (messageIndex !== -1) {
              this.messages[messageIndex].isRead = true;
              this.broadcastService.updateMessages([...this.messages]);
            }
            this.alertify.success('تم تحديد الرسالة كمقروءة');
          } else {
            this.alertify.error(res.message || 'حدث خطأ أثناء تحديد الرسالة كمقروءة');
          }
        },
        error: (error) => {
          this.alertify.error('حدث خطأ أثناء تحديد الرسالة كمقروءة');
        }
      });
    }
  }

  viewReaders(message: BroadcastMessage) {
    if (this.authService.isAdmin() && message._id) {
      this.broadcastService.getReaders(message._id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.selectedMessageReaders = res.data.readers || [];
            this.selectedMessageInfo = {
              message: res.data.message,
              senderName: res.data.senderName,
              createdAt: res.data.createdAt,
              readersCount: res.data.readersCount
            };
            this.isShowReadersDialog = true;
          } else {
            this.alertify.error(res.message || 'حدث خطأ أثناء جلب قائمة القراء');
          }
        },
        error: (error) => {
          this.alertify.error('حدث خطأ أثناء جلب قائمة القراء');
        }
      });
    }
  }

  clearHistory() {
    if (this.authService.isAdmin()) {
      this.confirmationService.confirm({
        key: 'confirmClearHistory',
        message: 'هل أنت متأكد من حذف جميع رسائل البث؟ لا يمكن التراجع عن هذا الإجراء.',
        acceptLabel: this.translate.instant('GENERIC.CONFIRM'),
        rejectLabel: this.translate.instant('GENERIC.IGNORE'),
        accept: () => {
          this.broadcastService.clearHistory().subscribe({
            next: (res) => {
              if (res.isSuccess) {
                this.messages = [];
                this.broadcastService.updateMessages([]);
                this.alertify.success(res.message || 'تم حذف جميع الرسائل بنجاح');
              } else {
                this.alertify.error(res.message || 'حدث خطأ أثناء حذف الرسائل');
              }
            },
            error: (error) => {
              this.alertify.error('حدث خطأ أثناء حذف الرسائل');
            }
          });
        }
      });
    }
  }

  hideReadersDialog() {
    this.isShowReadersDialog = false;
    this.selectedMessageReaders = [];
    this.selectedMessageInfo = {};
  }

  private scrollToBottom() {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  formatDate(date: Date): string {
    // Use Arabic Egypt locale which provides Gregorian calendar with Arabic numerals
    // This is better than ar-SA which defaults to Hijri calendar
    const dateObj = new Date(date);

    try {
      // ar-EG uses Gregorian calendar with Arabic numerals - perfect for Arabic UI
      return dateObj.toLocaleString('ar-EG', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
        calendar: 'gregory' // Explicitly specify Gregorian calendar
      });
    } catch (error) {
      // Fallback to en-GB if ar-EG is not available
      return dateObj.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }
  }

  getUnreadCount(): number {
    return this.messages.filter(m => !m.isRead).length;
  }

  trackByMessageId(index: number, message: BroadcastMessage): string {
    return message._id || index.toString();
  }
}
