let createElement = (elTag, elClass) => {
    let element = document.createElement(elTag);
    if (elClass) {
        element.classList.add(elClass)
    }
    return element;
}

let createRep = (repData) => {
    let repEl = createElement('li', 'repos');
    repEl.innerHTML = `<span class='rep-name'>${repData.name}</span>`;
    repList.append(repEl)

    let repSave = createElement('li', 'repos-save')
    let btnRemove = createElement('button', 'btn-remove');
    btnRemove.innerHTML = 'X'
    repSave.innerHTML = `<h3 class='rep-name'>Название репозитория: ${repData.name} </h3> <p class='rep-owner-name'>Владелец: ${repData.owner.login}</p> 
                          <p>⭐ ${repData.stargazers_count}</p> `;
    repSave.append(btnRemove)

    repEl.addEventListener('click', () => {
        saveList.append(repSave)
        searchInput.value = ''
        clearRep()
    })

    btnRemove.addEventListener('click', () => {
        repSave.remove()
    })
}


let app = document.getElementById('app');
let searchInput = createElement('input', 'search-input');
let searchCounter = createElement('span', 'search-counter');
let main = createElement('div', 'main');
let repWrapper = createElement('div', 'wrapper');
let repList = createElement('ul', 'rep-list');
let saveListContainer = createElement('div', 'saveContainer');
let saveList = createElement('ul', 'save-list')

repWrapper.append(repList);
saveListContainer.append(saveList);
main.append(repWrapper);
main.append(saveListContainer);
app.append(searchInput);
app.append(searchCounter)
app.append(main);

let searchEvent = () => {
    searchInput.addEventListener('keyup', debounce(search, 300))
}

let clearRep = () => {
    repList.innerHTML = '';
}

let debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args)
    }
}

let api = async () => {
 try {
   return await fetch(`https://api.github.com/search/repositories?q=${searchInput.value}&per_page=5`)
    .then((res) => {
        res.json().then(res => {
            res.items.forEach(el => createRep(el));
        })
    })
 } catch (e) {
     console.log('error' + e)
 } 
}

let search = () => {
    if (searchInput.value) {
        clearRep();
        api(searchInput.value)
    } else {
        clearRep();
    }

}





searchEvent()


