const addNewItem(content) {
    const l = document.createElement('li');
    l.innerText = content
    l.classList.add('item');

    const ul = document.querySelector('#items');
    ul.append(l)

    l.addEventListener('click', () => {
        l.classList.toggle('done');
    })
}
addNewItem('boof');
addNewItem('working okay?');

const inp = document.querySelector('#my-inp');
inp.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
        addNewItem(ev.value);
        ev.value = ""
    }
});