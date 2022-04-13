import { getMessages } from './telegram';
import { writeFile } from 'fs/promises';

interface Alert {
  area: string;
  start: Date;
  stop: Date;
}

const main = async () => {
  const alerts: Alert[] = [];
  const areaAlertStarts = new Map<string, Date>();

  for await (const message of getMessages('air_alert_ua')) {
    console.log('Processing message', message);

    const status =
      message.text.indexOf('Повітряна тривога') >= 0
        ? 'start'
        : message.text.indexOf('Відбій тривоги') >= 0
        ? 'stop'
        : null;

    if (!status) {
      console.log('Unknown status');
      continue;
    }

    const areas = RegExp('(?:(?:Повітряна тривога)|(?:Відбій тривоги)) в (.+)', 'i')
      .exec(message.text)?.[1]
      ?.split(' та ')
      .map((s) => s.trim());

    if (!areas) {
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

  await writeFile('output.json', JSON.stringify(alerts, null, 2));
  console.log('Saved data to output.json');
};

main().catch((err) => console.error('Error', err));
