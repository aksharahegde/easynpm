import { writable, derived } from 'svelte/store';

function createNotificationStore() {
	const _notifications: any = writable([]);

	function send(message: any, type = 'default', timeout: any) {
		_notifications.update((state: any) => {
            return [...state, { id: id(), type, message, timeout }];
        });
	}

	const notifications = derived(_notifications, ($_notifications: any, set) => {
		set($_notifications);
		if ($_notifications.length > 0) {
			const timer = setTimeout(() => {
				_notifications.update((state: void[]) => {
					state.shift();
					return state;
				});
			}, $_notifications[0].timeout);
			return () => {
				clearTimeout(timer);
			};
		}
	});
	const { subscribe } = notifications;

	return {
		subscribe,
		send,
		default: (msg: any, timeout: any) => send(msg, 'default', timeout),
		danger: (msg: any, timeout: any) => send(msg, 'danger', timeout),
		warning: (msg: any, timeout: any) => send(msg, 'warning', timeout),
		info: (msg: any, timeout: any) => send(msg, 'info', timeout),
		success: (msg: any, timeout: any) => send(msg, 'success', timeout)
	};
}

function id() {
	return '_' + Math.random().toString(36).substr(2, 9);
}

export const notifications = createNotificationStore();
