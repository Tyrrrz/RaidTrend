import { getMessages } from './telegram';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

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

  const timestamp = new Date();

  const timestampFormatted = [
    timestamp.getUTCFullYear(),
    timestamp.getUTCMonth() + 1,
    timestamp.getUTCDate()
  ].join('-');

  if (!existsSync('./output')) {
    await mkdir('./output');
  }

  await writeFile(`./output/${timestampFormatted}.json`, JSON.stringify(alerts, null, 2), {
    flag: 'w'
  });

  console.log(`Saved data to ./output/${timestampFormatted}.json`);
};

main().catch((err) => console.error('Error', err));
