console.log('Sample java script');

const searchForm = document.querySelector('form');
const locationDoc = document.querySelector('input');
const msgOne = document.querySelector('#msgOne');
const msgTwo = document.querySelector('#msgTwo');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    if (locationDoc.value == '') {
        msgOne.textContent = 'Please provide the location.'
        return console.log('Please provide the location.')
    }
    fetch('/weather?location=' + locationDoc.value).then((response) => {
        console.log(response);
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
                console.error(data)
            } else {
                msgOne.textContent = ''
                msgTwo.textContent = 'Its ' + data.description + '. Temperature is ' + data.temperature + ' but it feels like ' + data.feelslike + '.'
            }
        })
    })
})