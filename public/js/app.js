console.log('Client side java script is loaded !')

// This fetch() function is only used at client-side javascript for fetching data from specific url.
/* fetch('http://localhost:3000/weather?address=ahmedabad').then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            console.log(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    console.log(location)

    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                messageOne.textContent = data.error
                console.log(data.error)
            }
            else{
              console.log(data.location)
              console.log(data.forecast)
              messageOne.textContent = data.location
              messageTwo.textContent = data.forecast
            }
        })
    })
})