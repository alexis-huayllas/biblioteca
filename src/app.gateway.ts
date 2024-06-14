// app.gateway.ts
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3008,{cors:{origin:'*'}})
export class AppGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('adminAlert')
  handleAdminAlert(client: any, message: any): void {
    console.log('admin alert');
    //console.log('client', client.handshake.headers.accept );
    console.log('message',message);
    this.server.emit('userAlert', message);
  }

  @SubscribeMessage('userMessage')
  handleUserMessage(client: any, message: any): void {
    console.log('user message');
    //console.log('client', client.handshake.headers.accept );
    console.log('message',message);
    this.server.emit('adminMessage', message);
  }

  @SubscribeMessage('adminReply')
  handleAdminReply(client: any, message: any): void {
    console.log('admin reply');
    //console.log('client', client.handshake.headers.accept );
    console.log('message',message);
    this.server.emit('userReply', message);
  }
}
