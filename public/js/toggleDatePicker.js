const date = document.getElementsByClassName('date');
const datepicker = document.getElementsByClassName('datepicker');

for (let i = 0; i < date.length; i += 1) {
    date[i].addEventListener('click', () => {
        datepicker[i].showPicker();
    });
};