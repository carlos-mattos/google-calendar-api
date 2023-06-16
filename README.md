# google-calendar-api

## Docs
**POST /schedule**
```json
{
  "summary": "test",
  "description": "This is the description."
  "start": {
     "date": "16/06/2023",
     "time": "17:00"
  },
   "end": {
     "date": "16/06/2023",
     "time": "18:30"
   },
   "attendees": [ // optional field 
     {
       "email": "exemplo@gmail.com"
     }
   ]
}
