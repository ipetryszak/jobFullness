const url = 'https://jobs.github.com/positions.json?page=1';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

document.addEventListener('DOMContentLoaded',pageLoadedHandler);

function pageLoadedHandler(e) {
    fetch(proxyurl+url)
        .then(positions => positions.json())
        .then(displayPositions)
        .catch(err => console.log(err));
}

function displayPositions(cont) {
    const contentParent = document.querySelector('.content');

    for(let i = 0; i < 12; i++) {

        const positionBox = document.createElement('div');
        positionBox.classList.add('position-box');
        contentParent.appendChild(positionBox);

        const boxLogo = document.createElement('div');
        boxLogo.classList.add('position-box__logo');
        const img = document.createElement('img');
        img.src = cont[i].company_logo;
        img.alt = 'Company logo';
        boxLogo.appendChild(img);
        positionBox.appendChild(boxLogo);

        const publishedTime = document.createElement('div');
        publishedTime.classList.add('position-box__published-time');
        publishedTime.innerText = cont[i].type;
        positionBox.appendChild(publishedTime);

        const name = document.createElement('div');
        name.classList.add('position-box__name');
        name.textContent = cont[i].title;
        positionBox.appendChild(name);

        const company = document.createElement('div');
        company.classList.add('position-box__company');
        company.textContent = cont[i].company;
        positionBox.appendChild(company);

        const location = document.createElement('div');
        location.classList.add('position-box__location');
        location.textContent = cont[i].location;
        positionBox.appendChild(location);
    }
}
