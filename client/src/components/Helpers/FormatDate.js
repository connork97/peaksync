const datetimeString = `${signup.session.date}T${signup.session.time}:00`
const datetime = new Date(datetimeString)
const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
}

const formattedDateTime = datetime.toLocaleString('en-US', options)