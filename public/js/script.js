const cards = document.querySelectorAll('.card')

for(let card of cards){
    card.addEventListener('click', function(){
        const recitaIndex = card.getAttribute('id')
        window.location = `/receita/${recitaIndex}`
    })

}

const showHides = document.getElementsByClassName('topic');
for (let showHide of showHides) {
    const buttonSpan = showHide.querySelector('a');

    buttonSpan.addEventListener('click', () => {
        if (buttonSpan.innerHTML == "ESCONDER") {
            showHide.querySelector('.topic-content').classList.add('hidden');
            buttonSpan.innerHTML = "MOSTRAR"
        } else {
            showHide.querySelector('.topic-content').classList.remove('hidden');
            buttonSpan.innerHTML = "ESCONDER"
        }
    });
}


