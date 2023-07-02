const userQuery = JSON.parse(localStorage.getItem('user'))

const nameHolder = document.querySelector('.left__main')
nameHolder.innerHTML =
    `
    <h1>Hello <span>${userQuery.name}</span></h1>
    <p>Here is your control panel</p>
    `

const buttonNewRegistration = document.querySelector('#newRegistration')
const newRegistrationImage = document.querySelector('#newRegistrationImage')
const imgNR = document.querySelector('#imgNR')
const imgNRS = document.querySelector('#imgNRS')
buttonNewRegistration.addEventListener('click', () => {
    buttonNewRegistration.classList.add('button__active')
    newRegistrationImage.classList.add('image__selected')
    imgNR.style.display = 'none'
    imgNRS.style = ''
    window.location.href = './newRegistration.html'
})
const buttonDelivery = document.querySelector('#delivery')
const deliveryImage = document.querySelector('#deliveryImage')
const imgD = document.querySelector('#imgD')
const imgDS = document.querySelector('#imgDS')
buttonDelivery.addEventListener('click', () => {
    buttonDelivery.classList.add('button__active')
    deliveryImage.classList.add('image__selected')
    imgD.style.display = 'none'
    imgDS.style = ''
    window.location.href = './delivery.html'
})
const buttonTreatment = document.querySelector('#treatment')
const treatmentImage = document.querySelector('#treatmentImage')
const imgT = document.querySelector('#imgT')
const imgTS = document.querySelector('#imgTS')
buttonTreatment.addEventListener('click', () => {
    buttonTreatment.classList.add('button__active')
    treatmentImage.classList.add('image__selected')
    imgT.style.display = 'none'
    imgTS.style = ''
    window.location.href = './treatment.html'
})
const buttonEditing = document.querySelector('#editing')
const editingImage = document.querySelector('#editingImage')
const imgE = document.querySelector('#imgE')
const imgES = document.querySelector('#imgES')
buttonEditing.addEventListener('click', () => {
    buttonEditing.classList.add('button__active')
    editingImage.classList.add('image__selected')
    imgE.style.display = 'none'
    imgES.style = ''
    window.location.href = './editing.html'
})
const buttonColorSorting = document.querySelector('#colorSorting')
const colorSortingImage = document.querySelector('#colorSortingImage')
const imgCS = document.querySelector('#imgCS')
const imgCSS = document.querySelector('#imgCSS')
buttonColorSorting.addEventListener('click', () => {
    buttonColorSorting.classList.add('button__active')
    colorSortingImage.classList.add('image__selected')
    imgCS.style.display = 'none'
    imgCSS.style = ''
    window.location.href = './colorSorting.html'
})
const buttonResidentSorting = document.querySelector('#residentSorting')
const residentSortingImage = document.querySelector('#residentSortingImage')
const imgRS = document.querySelector('#imgRS')
const imgRSS = document.querySelector('#imgRSS')
buttonResidentSorting.addEventListener('click', () => {
    buttonResidentSorting.classList.add('button__active')
    residentSortingImage.classList.add('image__selected')
    imgRS.style.display = 'none'
    imgRSS.style = ''
    window.location.href = './residentSorting.html'
})