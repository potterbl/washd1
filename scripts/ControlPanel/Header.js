const backButton = document.querySelector('.back')
if(backButton){
    backButton.addEventListener('click', () => {
        window.location.href='./index.html'
    })
}

const languageSection = document.querySelector('.language')
const languageChoose = document.querySelector('.select__language')

languageSection.addEventListener('click', () => {
    languageChoose.classList.toggle('show__language__choose')
})

const shownEn = document.querySelector('#showEn')
const shownNor = document.querySelector('#showNor')
const shownLi = document.querySelector('#showLi')
const shownUa = document.querySelector('#showUa')

const selectEn = document.querySelector('#selectEn')
const selectNor = document.querySelector('#selectNor')
const selectLi = document.querySelector('#selectLi')
const selectUa = document.querySelector('#selectUa')
selectEn.addEventListener('click', () => {localStorage.setItem('language', 'en'); updateLanguages()})
selectNor.addEventListener('click', () => {localStorage.setItem('language', 'nor'); updateLanguages()})
selectLi.addEventListener('click', () => {localStorage.setItem('language', 'li'); updateLanguages()})
selectUa.addEventListener('click', () => {localStorage.setItem('language', 'ua'); updateLanguages()})
updateLanguages()
function updateLanguages() {
    const languageQuery = localStorage.getItem('language')
    if (languageQuery == 'en') {
        shownEn.style.display = 'block'
        shownNor.style.display = 'none'
        shownLi.style.display = 'none'
        shownUa.style.display = 'none'
    } else if (languageQuery == 'nor') {
        shownEn.style.display = 'none'
        shownNor.style.display = 'block'
        shownLi.style.display = 'none'
        shownUa.style.display = 'none'
    } else if (languageQuery == 'li') {
        shownEn.style.display = 'none'
        shownNor.style.display = 'none'
        shownLi.style.display = 'block'
        shownUa.style.display = 'none'
    } else if (languageQuery == 'ua') {
        shownEn.style.display = 'none'
        shownNor.style.display = 'none'
        shownLi.style.display = 'none'
        shownUa.style.display = 'block'
    }

    if (languageQuery == 'en') {
        selectEn.classList.add('chosen__language')
        selectNor.classList.remove('chosen__language')
        selectLi.classList.remove('chosen__language')
        selectUa.classList.remove('chosen__language')
    } else if (languageQuery == 'nor') {
        selectEn.classList.remove('chosen__language')
        selectNor.classList.add('chosen__language')
        selectLi.classList.remove('chosen__language')
        selectUa.classList.remove('chosen__language')
    } else if (languageQuery == 'li') {
        selectEn.classList.remove('chosen__language')
        selectNor.classList.remove('chosen__language')
        selectLi.classList.add('chosen__language')
        selectUa.classList.remove('chosen__language')
    } else if (languageQuery == 'ua') {
        selectEn.classList.remove('chosen__language')
        selectNor.classList.remove('chosen__language')
        selectLi.classList.remove('chosen__language')
        selectUa.classList.add('chosen__language')
    }
}