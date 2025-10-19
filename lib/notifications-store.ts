const notifications: any[] = []

export function addNotification(studentEmail: string, issueId: string, message: string) {
  const notification = {
    id: Date.now().toString(),
    studentEmail,
    issueId,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  }
  notifications.push(notification)
  return notification
}

export function getNotifications(studentEmail: string) {
  return notifications.filter((n) => n.studentEmail === studentEmail)
}

export function markNotificationAsRead(notificationId: string) {
  const notification = notifications.find((n) => n.id === notificationId)
  if (notification) {
    notification.read = true
  }
}

export function getUnreadCount(studentEmail: string) {
  return notifications.filter((n) => n.studentEmail === studentEmail && !n.read).length
}
