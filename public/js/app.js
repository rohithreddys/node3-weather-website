console.log('Client side js file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



 weatherForm.addEventListener('submit', (e) => {
     e.preventDefault()
     const location = search.value
     //console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
     let url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
     fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Error'
                messageTwo.textContent = data.error
                // console.log(data.error)
            } else {
            //    console.log(data.location)
            //    console.log(data.temperature)
               messageOne.textContent = data.location
               messageTwo.textContent = `The temperature is ${data.temperature}\u00B0C, pressure is ${data.pressure}bar and the humidity is ${data.humidity}`
            }
        })
    })
   
 })
 