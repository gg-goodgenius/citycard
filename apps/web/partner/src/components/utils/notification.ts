import { MessageInstance } from 'antd/es/message/interface';
type NotificatonType = 'get' | 'patch' | 'add' | 'delete';

type StatusObject = Record<Status, string>;

const notificationText: Record<NotificatonType, StatusObject> = {
	add: {
		error: 'Ошибка при добавлении данных',
		success: 'Успешная загрузка',
	},
	delete: {
		error: 'Ошибка при удалении данных',
		success: 'Успешная загрузка',
	},
	get: {
		error: 'Ошибка при загрузке данных',
		success: 'Успешная загрузка',
	},
	patch: {
		error: 'Ошибка при обновлении данных',
		success: 'Успешная загрузка',
	},
};

export type Notifications = {
	error: (type: NotificatonType, message?: string) => void;
	success: (type: NotificatonType, message?: string) => void;
};

type Status = 'error' | 'success';

export const showErrorNotification = (
	type: NotificatonType,
	messageApi: MessageInstance,
	status: Status,
	message?: string,
) => {
	const getType = notificationText[type];

	let content = getType[status];

	if (message) {
		content += ` (${message})`;
	}

	messageApi.open({
		type: status,
		content,
	});
};

export const getNotificationMethods = (messageApi: MessageInstance): Notifications => ({
	error: (type: NotificatonType, message?: string) => showErrorNotification(type, messageApi, 'error', message),
	success: (type: NotificatonType, message?: string) => showErrorNotification(type, messageApi, 'success', message),
});

