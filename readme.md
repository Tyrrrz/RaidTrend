# RaidTrend

[![Made in Ukraine](https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7)](https://vshymanskyy.github.io/StandWithUkraine)
[![Run](https://img.shields.io/github/workflow/status/Tyrrrz/RaidTrend/run/master)](https://github.com/Tyrrrz/RaidTrend/actions)
[![Discord](https://img.shields.io/discord/869237470565392384?label=discord)](https://discord.gg/2SUWKFnHSm)
[![Donate](https://img.shields.io/badge/donate-$$$-8a2be2.svg)](https://tyrrrz.me/donate)
[![Fuck Russia](https://img.shields.io/badge/fuck-russia-e4181c.svg?labelColor=000000)](https://twitter.com/Tyrrrz/status/1495972128977571848)

> 🟢 **Project status**: active<sup>[[?]](https://github.com/Tyrrrz/.github/blob/master/docs/project-status.md)</sup>

**RaidTrend** is a simple script that pulls historic air raid alert data for Ukrainian cities and regions from [`air_alert_ua` Telegram channel](https://t.me/air_alert_ua).

## Snapshots

Data snapshots are generated nightly using GitHub Actions.
You can download the data from the artifacts associated with the [latest run](https://github.com/Tyrrrz/RaidTrend/actions/workflows/run.yaml).

The format of data is as follows:

```json
[
  {
    "area": "Конотопський район",
    "start": "2022-04-13T11:56:44.000Z",
    "stop": "2022-04-13T12:22:14.000Z"
  },
  {
    "area": "м. Конотоп",
    "start": "2022-04-13T11:55:29.000Z",
    "stop": "2022-04-13T12:22:26.000Z"
  },
  {
    "area": "Чернігівська область",
    "start": "2022-04-13T06:00:47.000Z",
    "stop": "2022-04-13T13:01:50.000Z"
  }
]
```
