import { getMessages } from './telegram';
import { writeFile } from 'fs/promises';

const getAlerts = async () => {
  const alerts = [];
  const areaAlertStarts = new Map<string, Date>();

  for await (const message of getMessages('air_alert_ua')) {
    console.log('Processing message', message);

    const status = message.text.includes('Повітряна тривога')
      ? 'start'
      : message.text.includes('Відбій тривоги')
      ? 'stop'
      : null;

    if (!status) {
      console.log('Unknown status');
      continue;
    }

    const areas = RegExp(
      '(?:(?:Повітряна тривога)|(?:Відбій тривоги)) в (?:м\\. )?([^\\.]+?)(?:\\.|\n)',
      'i'
    )
      .exec(message.text)?.[1]
      ?.split(' та ')
      .map((s) => s.trim());

    if (!areas || areas.length <= 0) {
      console.log('Unknown areas');
      continue;
    }

    for (const area of areas) {
      // If alert has started - record the timestamp.
      // If alert has stopped - pop the start timestamp and yield entry.

      if (status === 'start') {
        areaAlertStarts.set(area, message.timestamp);
      } else {
        const start = areaAlertStarts.get(area);

        if (!start) {
          console.log(`Alert not started for ${area}`);
          continue;
        }

        areaAlertStarts.delete(area);

        const alert = {
          area,
          start,
          stop: message.timestamp
        };

        alerts.push(alert);
        console.log('Processed alert', alert);
      }
    }
  }

  console.log(`Processed ${alerts.length} alerts`);
  return alerts;
};

const main = async () => {
  const alerts = await getAlerts();

  // Save raw data
  await writeFile('output.json', JSON.stringify(alerts, null, 2));
  console.log('Saved data to output.json');

  // Save grouped data
  const alertGroups = [...new Set(alerts.map((alert) => alert.area))]
    .map((area) => {
      const alertsForArea = alerts
        .filter((alert) => alert.area === area)
        .map((alert) => ({ start: alert.start, stop: alert.stop }));

      return { area, alerts: alertsForArea };
    })
    .sort((a, b) => a.area.localeCompare(b.area));

  await writeFile('output-grouped.json', JSON.stringify(alertGroups, null, 2));
  console.log('Saved grouped data to output-grouped.json');
};

main().catch((err) => console.error('Error', err));
