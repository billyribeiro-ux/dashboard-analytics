import { z } from 'zod';

export const AlertSeveritySchema = z.enum(['info', 'warn', 'high', 'critical']);
export type AlertSeverity = z.infer<typeof AlertSeveritySchema>;

export const AlertStatusSchema = z.enum(['active', 'acknowledged', 'snoozed', 'resolved']);
export type AlertStatus = z.infer<typeof AlertStatusSchema>;

export const AlertSchema = z.object({
	id: z.string(),
	severity: AlertSeveritySchema,
	status: AlertStatusSchema,
	title: z.string(),
	message: z.string(),
	timestamp: z.date(),
	source: z.string().optional(),
	affectedMetrics: z.array(z.string()).optional(),
	correlatedAlerts: z.array(z.string()).optional(),
	deepLink: z.string().optional(),
	assignedTo: z.string().optional(),
	snoozedUntil: z.date().optional()
});
export type Alert = z.infer<typeof AlertSchema>;

class AlertState {
	alerts = $state<Alert[]>([]);
	unreadCount = $derived(this.alerts.filter(a => a.status === 'active').length);
	criticalCount = $derived(this.alerts.filter(a => a.severity === 'critical' && a.status === 'active').length);
	highCount = $derived(this.alerts.filter(a => a.severity === 'high' && a.status === 'active').length);

	addAlert(alert: Alert) {
		this.alerts.unshift(alert);
	}

	acknowledgeAlert(alertId: string) {
		const alert = this.alerts.find(a => a.id === alertId);
		if (alert) {
			alert.status = 'acknowledged';
		}
	}

	snoozeAlert(alertId: string, until: Date) {
		const alert = this.alerts.find(a => a.id === alertId);
		if (alert) {
			alert.status = 'snoozed';
			alert.snoozedUntil = until;
		}
	}

	resolveAlert(alertId: string) {
		const alert = this.alerts.find(a => a.id === alertId);
		if (alert) {
			alert.status = 'resolved';
		}
	}

	assignAlert(alertId: string, assignee: string) {
		const alert = this.alerts.find(a => a.id === alertId);
		if (alert) {
			alert.assignedTo = assignee;
		}
	}

	getAlertsBySeverity(severity: AlertSeverity): Alert[] {
		return this.alerts.filter(a => a.severity === severity);
	}

	getActiveAlerts(): Alert[] {
		return this.alerts.filter(a => a.status === 'active');
	}

	clearResolvedAlerts() {
		this.alerts = this.alerts.filter(a => a.status !== 'resolved');
	}
}

export const alertState = new AlertState();
