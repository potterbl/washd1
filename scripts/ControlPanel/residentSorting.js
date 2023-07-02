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
    startScan.style = ''
    subHeader.innerHTML =
        `
            <div class="left">
                <h3>Scan a textile to start sorting or select a sorting field and manage</h3>
            </div>
            <div class="right">
                <select id="sortField">
                    <option value="" hidden>Select sort field</option>
                    <option value="status">Status</option>
                    <option value="weight">Weight</option>
                    <option value="temp">Temp</option>
                    <option value="washes">Washes</option>
                    <option value="size">Size</option>
                    <option value="color">Color</option>
                </select>
            </div>
    `
    let state = []
    ordersPageQuery.forEach(listItem => {
        listItem.orders.forEach(order => {
            if(order.department === sortingLocation){
                state.push(order)
            }
        })
    })
    let sortFieldValue = ''
    const sortFieldSelect = document.querySelector('#sortField')
    sortFieldSelect.addEventListener('change', () => {
        let statuses = []
        let sizes = []
        let colors = []
        const actionsQuery = JSON.parse(localStorage.getItem('actions'))
        actionsQuery.forEach(status => statuses.push(status.action))
        const sizesQuery = JSON.parse(localStorage.getItem('sizes'))
        sizesQuery.forEach(size => sizes.push(size.size))
        const colorsQuery = JSON.parse(localStorage.getItem('colors'))
        colorsQuery.forEach(color => colors.push(color.name))

        sortFieldValue = sortFieldSelect.value
        if (sortFieldValue === 'status'){
            state.sort((a, b) => {
                const indexA = statuses.indexOf(a.status);
                const indexB = statuses.indexOf(b.status);
                return indexA - indexB;
            });
        } else if (sortFieldValue === 'size'){
            state.sort((a, b) => {
                const indexA = sizes.indexOf(a.size);
                const indexB = sizes.indexOf(b.size);
                return indexA - indexB;
            });
        } else if (sortFieldValue === 'size'){
            state.sort((a, b) => {
                const indexA = colors.indexOf(a.color);
                const indexB = colors.indexOf(b.color);
                return indexA - indexB;
            });
        } else {
            state.sort((a, b) => {
                const indexA = parseInt(a[sortFieldValue]);
                const indexB = parseInt(b[sortFieldValue]);
                return indexA - indexB;
            });
        }
        fillContent(state)
    })
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