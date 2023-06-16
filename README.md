# google-calendar-api

## Docs
**POST /schedule**
```json
{
  "summary": "test", // Required field
  "description": "This is the description." // Required field
  // Optional fields:
  // "start": {
  //   "date": "16/06/2023",
  //   "time": "17:00"
  // },
  // "end": {
  //   "date": "16/06/2023",
  //   "time": "18:30"
  // },
  // "attendees": [
  //   {
  //     "email": "exemplo@gmail.com"
  //   }
  // ]
}
