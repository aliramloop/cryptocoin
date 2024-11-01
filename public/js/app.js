// const sendServerMessage = prompt("Input Your Message For Server :)")

// function sendMessageToServer(message){
//     fetch('/mess', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify( {message: message} )
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log('پاسخ:', data);
//       })
//       .catch(error => {
//         console.error('خطا:', error);
//       });
//       alert(message)   
// }

// sendMessageToServer(sendServerMessage)

function toggleDropdown(event) {
    event.stopPropagation();
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('active');
}

document.addEventListener('click', function (e) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('active');
});
