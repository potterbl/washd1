const startScan = document.querySelector('.start__scan')
startScan.style.display = 'none'

const subHeader = document.querySelector('.sub__header')

const ordersPageQuery = JSON.parse(localStorage.getItem('ordersPage'))

let state = []
ordersPageQuery.forEach(orderList => {
    orderList.orders.forEach(order => {
        if(state.includes(order.department) === false){
            state.push(order.department)
        }
    })
})
subHeader.innerHTML =
    `
            <div class="left">
                <h3>Select sorting location</h3>
            </div>
            <div class="right">
                <select id="sortingLocation">
                    <option value="" hidden>Select location</option>
                    ${state.map(resident => {
        return `<option value="${resident}">${resident}</option>`
    })}
                </select>
            </div>
    `
let sortingLocation = ''
const sortingLocationSelect = document.querySelector('#sortingLocation')
sortingLocationSelect.addEventListener('change', () => {
    sortingLocation = sortingLocationSelect.value
    let state = []
    ordersPageQuery.forEach(listItem => {
        listItem.orders.forEach(order => {
            if(order.department === sortingLocation){
                state.push(order)
            }
        })
    })
    startScan.style = ''
        let colors = []
        const colorsQuery = JSON.parse(localStorage.getItem('colors'))
        colorsQuery.forEach(color => colors.push(color.name))

        state.sort((a, b) => {
            const indexA = colors.indexOf(a.color);
            const indexB = colors.indexOf(b.color);
            return indexA - indexB;
        });
        fillContent(state)
    startScan.addEventListener('click', () => {
        fillContent(state)
    })
})
function fillContent(state) {
    const contentSectionInner = document.querySelector('.section__inner')
    contentSectionInner.innerHTML = ''
    state.forEach(order => {
        contentSectionInner.innerHTML +=
            `
                    <div class="order__item">
                        <div class="order__section">
                            <div class="left">
                                <p>RFID tag</p>
                            </div>
                            <div class="right">
                                <p>${order.rfid}</p>
                            </div>
                        </div>
                        <div class="order__section">
                            <div class="left">
                                <p>Speciality</p>
                            </div>
                            <div class="right">
                                <p>${order.speciality}</p>
                            </div>
                        </div>
                        <div class="order__section">
                            <div class="left">
                                <p>Set</p>
                            </div>
                            <div class="right">
                                <p>${order.date}</p>
                            </div>
                        </div>
                        <div class="order__section">
                            <div class="left">
                                <p>Product</p>
                            </div>
                            <div class="right">
                                <p>${order.item}</p>
                            </div>
                        </div>
                        <div class="order__section">
                            <div class="left">
                                <p>Number of washes</p>
                            </div>
                            <div class="right">
                                <p>${order.washes}</p>
                            </div>
                        </div>
                        <div class="order__section">
                            <div class="left">
                                <p>Color</p>
                            </div>
                            <div class="right">
                                <p>${order.color}</p>
                            </div>
                        </div>
                        <div class="order__section">
                            <div class="left">
                                <p>Customer</p>
                            </div>
                            <div class="right">
                                <p>${ordersPageQuery.find(listItem => listItem.orders.find(orderCheck => orderCheck === order)).customer}</p>
                            </div>
                        </div>
                        <div class="order__section">
                            <div class="left">
                                <p>Temperature</p>
                            </div>
                            <div class="right">
                                <p>${order.temp}</p>
                            </div>
                        </div>
                    </div>
                `
    })
}