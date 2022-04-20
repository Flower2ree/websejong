let date = new Date();
var i = 1;
const renderCalender = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);
    
    dates.forEach((date, i) => {

        const condition = i >= firstDateIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';
        if (condition == 'this')
            dates[i] = `<div class="date"><span class=${condition}>${date}</span><br><br><input type='button' class='add-button' id=${viewMonth + 1}/${date} value='일정추가'/></div>`;
        else if (i >= lastDateIndex + 1)
            dates[i] = `<div class="date"><span class=${condition}>${date}</span><br><br><input type='button' class='add-button' id=${viewMonth + 2}/${date} value='일정추가'/></div>`;
        else
            dates[i] = `<div class="date"><span class=${condition}>${date}</span><br><br><input type='button' class='add-button' id=${viewMonth}/${date} value='일정추가'/></div>`;
    });
  

    document.querySelector('.dates').innerHTML = dates.join('');

    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }
    const buttons = document.querySelectorAll('.add-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            addToList("Day " + button.getAttribute('id') + " is planned.");

        }, false);
    });
};

renderCalender();



function addToList(text) {
    const list = document.querySelector('#planlist');

    const newListItem = document.createElement('li');


    newListItem.classList.add('list-item');

    newListItem.innerHTML = text + "<br><input type='text' value=''id='name" + i + "'><input type='button' value='add' onclick='add_textbox()' >";
    
    
    list.appendChild(newListItem);
}



const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalender();
};

const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalender();
};

const goToday = () => {
    date = new Date();
    renderCalender();
};





