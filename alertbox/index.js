const showAlertButton = document.getElementById('show-alert');
const alertBox = document.getElementById('alert-box');
const confirmButton = document.getElementById('confirm-btn');

showAlertButton.addEventListener('click', () => {
    alertBox.style.display = 'block'; // نمایش alert box
});

confirmButton.addEventListener('click', () => {
    alertBox.style.display = 'none'; // پنهان کردن alert box
});
