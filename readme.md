# RaidTrend

[![Made in Ukraine](https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7)](https://vshymanskyy.github.io/StandWithUkraine)
[![Run](https://img.shields.io/github/workflow/status/Tyrrrz/RaidTrend/Run/master?label=export)](https://github.com/Tyrrrz/RaidTrend/actions)
[![Discord](https://img.shields.io/discord/869237470565392384?label=discord)](https://discord.gg/2SUWKFnHSm)
[![Donate](https://img.shields.io/badge/donate-$$$-8a2be2.svg)](https://tyrrrz.me/donate)
[![Fuck Russia](https://img.shields.io/badge/fuck-russia-e4181c.svg?labelColor=000000)](https://twitter.com/Tyrrrz/status/1495972128977571848)

> 🟢 **Project status**: active<sup>[[?]](https://github.com/Tyrrrz/.github/blob/master/docs/project-status.md)</sup>

**RaidTrend** is a simple project that pulls historic air raid alert data for Ukrainian cities and regions from [`air_alert_ua` Telegram channel](https://t.me/air_alert_ua).

You can find my analysis of the data [here](https://observablehq.com/@tyrrrz/raidtrend).

## Snapshots

Data snapshots are generated nightly using GitHub Actions.
You can download the data from the artifacts associated with the [latest run](https://github.com/Tyrrrz/RaidTrend/actions/workflows/run.yaml).

The format of data is as follows:

- `output.json`

```json
[
  {
    "area": "Київ",
    "areaTranslit": "Kyiv",
    "start": "2022-04-07T10:04:32.000Z",
    "stop": "2022-04-07T10:31:18.000Z"
  },
  {
    "area": "Львівська область",
    "areaTranslit": "Lvivska oblast",
    "start": "2022-04-07T10:07:37.000Z",
    "stop": "2022-04-07T10:32:08.000Z"
  },
  {
    "area": "Житомирська область",
    "areaTranslit": "Zhytomyrska oblast",
    "start": "2022-04-07T10:05:09.000Z",
    "stop": "2022-04-07T10:32:31.000Z"
  }
]
```

- `output-grouped.json`

```json
[
  {
    "area": "Київ",
    "areaTranslit": "Kyiv",
    "alerts": [
      {
        "start": "2022-03-15T16:19:20.000Z",
        "stop": "2022-03-15T18:52:28.000Z"
      },
      {
        "start": "2022-03-15T23:33:47.000Z",
        "stop": "2022-03-16T03:41:56.000Z"
      },
      {
        "start": "2022-03-16T04:12:47.000Z",
        "stop": "2022-03-16T04:54:31.000Z"
      }
    ]
  },
  {
    "area": "Львівська область",
    "areaTranslit": "Lvivska oblast",
    "alerts": [
      {
        "start": "2022-03-15T16:17:29.000Z",
        "stop": "2022-03-15T17:16:23.000Z"
      },
      {
        "start": "2022-03-16T00:50:53.000Z",
        "stop": "2022-03-16T03:24:08.000Z"
      },
      {
        "start": "2022-03-17T02:16:46.000Z",
        "stop": "2022-03-17T02:53:45.000Z"
      }
    ]
  },
  {
    "area": "Житомирська область",
    "areaTranslit": "Zhytomyrska oblast",
    "alerts": [
      {
        "start": "2022-03-15T16:11:25.000Z",
        "stop": "2022-03-15T16:54:23.000Z"
      },
      {
        "start": "2022-03-15T18:08:22.000Z",
        "stop": "2022-03-15T18:35:56.000Z"
      },
      {
        "start": "2022-03-15T23:34:54.000Z",
        "stop": "2022-03-16T03:40:20.000Z"
      }
    ]
  }
]
```
