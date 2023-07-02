JSON.parse(localStorage.getItem('user'))
checkUser()
function checkUser() {
    if (JSON.parse(localStorage.getItem('user'))) {
        return
    } else {
        window.location.href = '../../ControlPanel.html'
    }
}

const leaveAccountButton = document.querySelector('#leaveAccount')
const tooltip = document.querySelector('.tooltip')
leaveAccountButton.addEventListener('click', () => {
    localStorage.removeItem('user')
    checkUser()
})
leaveAccountButton.addEventListener('mouseenter', () => {
    tooltip.classList.add('tooltip__shown')
})
leaveAccountButton.addEventListener('mouseleave', () => {
    tooltip.classList.remove('tooltip__shown')
})

setInterval(checkScanner, 10000);

function checkScanner() {
    const scannerStatus = localStorage.getItem('scanner')

    if(scannerStatus == 'offline'){
        const dialogError = document.querySelector('.dialog__error')
        dialogError.classList.add('dialog__shown')
    } else {
        const dialogError = document.querySelector('.dialog__error')
        dialogError.classList.remove('dialog__shown')
    }
}