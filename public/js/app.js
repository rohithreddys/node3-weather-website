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
     let url = '/weather?address=' + encodeURIComponent(location)
     fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Error'
                messageTwo.textContent = data.error
                // console.log(data.error)
            } else {
            //    console.log(data.location)
            //    console.log(data.temperature)
               messageOne.textContent = data.address
               messageTwo.textContent = data.weather
            }
        })
    })
   
 })
 