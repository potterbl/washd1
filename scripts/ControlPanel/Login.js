const loginForm = document.querySelector('.login__form')

const ordersPageQuery = JSON.parse(localStorage.getItem('ordersPage'))

loginForm.innerHTML =
    `
    <select id="usernameEmail">
        <option value="" hidden>Select user</option>
        ${ordersPage.flatMap(ordersPage => ordersPage.accounts.map(account => `
            <option value="${account.emailUsername}">${account.emailUsername}</option>
        `)).join('')}
    }).join('')}
    </select>
    <div class="input__wrapper">
        <input type="text" id="password">
        <p>Password</p>
    </div>
    `
let login = ''
let password = ''
let passwordInput = document.querySelector('#password')
let loginSelect = document.querySelector('#usernameEmail')
loginSelect.addEventListener('change', () => {login = loginSelect.value})
passwordInput.addEventListener('keyup', () => {password = passwordInput.value})

const loginButton = document.querySelector('#login')
loginButton.addEventListener('click', () => {
    ordersPage.forEach(orderPage => {
        orderPage.accounts.forEach(account => {
            if(account.password == password){
                window.location.href = './pages/ControlPanel/index.html'
                localStorage.setItem('user', JSON.stringify(account))
                console.log(account)
            }
        })
    })
})

const activeLang = document.querySelector('.active__lang')
const flagNor = document.querySelector('#langNor')
const flagEn = document.querySelector('#langEn')
const flagLi = document.querySelector('#langLi')
const flagUa = document.querySelector('#langUa')
flagNor.addEventListener('click', () => {
    activeLang.style = 'transform: translateX(0)'
    localStorage.setItem('language', 'nor')
})
flagEn.addEventListener('click', () => {
    activeLang.style = 'transform: translateX(60px)'
    localStorage.setItem('language', 'en')
})
flagLi.addEventListener('click', () => {
    activeLang.style = 'transform: translateX(120px)'
    localStorage.setItem('language', 'li')
})
flagUa.addEventListener('click', () => {
    activeLang.style = 'transform: translateX(180px)'
    localStorage.setItem('language', 'ua')
})