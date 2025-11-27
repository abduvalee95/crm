export class SocketClient {
	private socket: WebSocket | null = null;
	private url: string;
	private messageHandler: ((msg: any) => void) | null = null;

	constructor(url: string) {
		this.url = url;
	}

	connect() {
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		this.socket = new WebSocket(`${this.url}?token=${token}`);

		this.socket.onopen = () => {
			console.log('WebSocket Connected');
		};

		this.socket.onmessage = (msg) => {
			console.log('WebSocket Message', msg.data);
			if (this.messageHandler) {
				try {
					const parsedData = JSON.parse(msg.data);
					this.messageHandler(parsedData);
				} catch (e) {
					this.messageHandler(msg.data);
				}
			}
		};

		this.socket.onerror = (error) => {
			console.error('WebSocket Error', error);
		};

		this.socket.onclose = () => {
			console.log('WebSocket Disconnected');
		};
	}

	onMessage(handler: (msg: any) => void) {
		this.messageHandler = handler;
	}

	send(data: string | object) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			const payload = typeof data === 'string' ? data : JSON.stringify(data);
			this.socket.send(payload);
		} else {
			console.warn('WebSocket is not connected');
		}
	}

	close() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}
}
