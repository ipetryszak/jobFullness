const url = 'https://jobs.github.com/positions.json?page=1';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let indexPosition = 0;
let jobPositions;

document.addEventListener('DOMContentLoaded',pageLoadedHandler);

const loadButton = document.querySelector('.button__load-more');
loadButton.style.display = 'none'
loadButton.addEventListener('click',loadMore);

function pageLoadedHandler(e) {
    fetch(proxyurl+url)
        .then(positions => positions.json())
        .then(positions => jobPositions = positions)
        .catch(err => console.log(err))
        .finally(() => {
            displayPositions();
            loadButton.style.display = 'block';
        });
}

function loadMore(event) {
    console.log(event);
    let posY = event.pageY - 70;
    console.log(`posY ${posY}`);
    displayPositions();
    window.scrollTo(0,posY);
}

function displayPositions() {
    let cont = jobPositions;
    console.log(cont);
    const contentParent = document.querySelector('.content');

    let i = 0;
    while(i < 12){
        const positionBox = document.createElement('div');
        positionBox.classList.add('position-box');

        const boxLogo = document.createElement('div');
        boxLogo.classList.add('position-box__logo');
        const img = document.createElement('img');
        img.src = cont[indexPosition].company_logo;
        img.alt = 'Company logo';
        boxLogo.appendChild(img);
        positionBox.appendChild(boxLogo);

        const publishedTime = document.createElement('div');
        publishedTime.classList.add('position-box__published-time');
        publishedTime.innerText = cont[indexPosition].type;
        positionBox.appendChild(publishedTime);

        const name = document.createElement('div');
        name.classList.add('position-box__name');
        name.textContent = cont[indexPosition].title;
        positionBox.appendChild(name);

        const company = document.createElement('div');
        company.classList.add('position-box__company');
        company.textContent = cont[indexPosition].company;
        positionBox.appendChild(company);

        const location = document.createElement('div');
        location.classList.add('position-box__location');
        location.textContent = cont[indexPosition].location;
        positionBox.appendChild(location);

        contentParent.appendChild(positionBox);
        setTimeout(() => {
            positionBox.style.opacity = '100%'
            if(img.clientWidth > img.clientHeight){
                img.style.maxwidth = '25rem';
                img.style.height = '3rem';
            }
        }, i*100);

        i++;
        indexPosition++;
    }
}