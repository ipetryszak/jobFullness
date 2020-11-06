const url = 'https://jobs.github.com/positions.json?page=1';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let indexPosition = 0;
let jobPositions;

document.addEventListener('DOMContentLoaded',pageLoadedHandler);

const loadButton = document.querySelector('.button__load-more');
loadButton.style.display = 'none'
loadButton.addEventListener('click',displayPositions);

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

function displayPositions() {
    let cont = jobPositions;
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
        i++;
        indexPosition++;
    }
}

