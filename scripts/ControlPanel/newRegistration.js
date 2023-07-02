const startScanButton = document.querySelector('.start__scan')
const largeScanButton = document.querySelector('.large__scan')

startScanButton.addEventListener('click', () => {
    ordersList()
})
function ordersList() {
    startScanButton.addEventListener('click', () => {
        startScanButton.innerText = 'RESTART SCAN'
        startScanButton.classList.remove('scan__started')
        largeScanButton.innerText = 'LARGE SCAN'
        return
    })
    const ordersPageQuery = JSON.parse(localStorage.getItem('ordersPage'))

    const scanStatusCount = document.querySelector('#scanStatusCount')
    const differentTagsCount = document.querySelector('#differentTagsCount')
    const totalTagsCount = document.querySelector('#totalTagsCount')
    const knownTagsCount = document.querySelector('#knownTagsCount')
    const unknownTagsCount = document.querySelector('#unknownTagsCount')
    const ignoredTagsCount = document.querySelector('#ignoredTagsCount')
    scanStatusCount.innerHTML = `<p>IDLE</p>`
    let state = []
    ordersPageQuery.forEach(list => {
        list.orders.forEach(order => {
            if(state.includes(order.rfid) === false){
                state.push(order.rfid)
            }
        })
    })
    differentTagsCount.innerHTML =
        `
        <p>${state.length}</p>
        `
    state = []
    ordersPageQuery.forEach(list => {
        list.orders.forEach(order => {
            state.push(order.rfid)
        })
    })
    totalTagsCount.innerHTML = `<p>${state.length}</p>`
    knownTagsCount.innerHTML = `<p>0</p>`
    state = []
    ordersPageQuery.forEach(list => {
        list.orders.forEach(order => {
            state.unshift(order)
            console.log(state)
        })
    })
    unknownTagsCount.innerHTML = `<p>${state.length}</p>`
    ignoredTagsCount.innerHTML = `<p>0</p>`
    startScanButton.innerText = 'STOP SCAN'
    startScanButton.classList.add('scan__started')
    largeScanButton.innerText = 'IGNORE THESE'



    const contentSection = document.querySelector('.section__inner')

    contentSection.innerHTML = `
        <div class="row__header">
            <div class="rfid__tag">
                <p>RFID tag</p>
            </div>
            <div class="last__seen">
                <p>Last Seen</p>
            </div>
            <div class="washes">
                <p>Washes</p>
            </div>
            <div class="client">
                <p>Client</p>
            </div>
            <div class="department">
                <p>Department</p>
            </div>
            <div class="speciality">
                <p>Speciality</p>
            </div>
            <div class="product">
                <p>Product</p>
            </div>
            <div class="status">
                <p>Status</p>
            </div>
            <div class="size">
                <p>Size</p>
            </div>
            <div class="color">
                <p>Color</p>
            </div>
            <div class="temp">
                <p>Temp</p>
            </div>
            <div class="weight">
                <p>Weight</p>
            </div>
            <div class="delete">
                <p>Delete</p>
            </div>
        </div>
        `
    state.forEach(listItem => {
        contentSection.innerHTML += `
            <div class="row__content">
                <div class="rfid__tag">
                    <p>${listItem.rfid}</p>
                </div>
                <div class="last__seen">
                    <p>${listItem.date}</p>
                </div>
                <div class="washes">
                    <p>${listItem.washes}</p>
                </div>
                <div class="client">
                    <p>${listItem.client}</p>
                </div>
                <div class="department">
                    <p>${listItem.department}</p>
                </div>
                <div class="speciality">
                    <p>${listItem.speciality}</p>
                </div>
                <div class="product">
                    <p>${listItem.item}</p>
                </div>
                <div class="status">
                    <p>${listItem.status}</p>
                </div>
                <div class="size">
                    <p>${listItem.size}</p>
                </div>
                <div class="color">
                    <p>${listItem.color}</p>
                </div>
                <div class="temp">
                    <p>${listItem.temp}</p>
                </div>
                <div class="weight">
                    <p>${listItem.weight}</p>
                </div>
                <div class="delete">
                    <img src="../../src/ControlPanel/Delete.png" alt="" id="${listItem.id}">
                </div>
            </div>
            `
    })
    const deleteButtons = document.querySelectorAll('.delete img');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const orderId = event.target.id;
            let orderIndex = 0
            ordersPageQuery.forEach(list => {
                orderIndex = list.orders.findIndex(order => order.id == orderId);
                list.orders.splice(orderIndex, 1);
            })
            localStorage.setItem('ordersPage', JSON.stringify(ordersPageQuery));
            ordersList();
        });
    });

    startScanButton.innerText = 'RESTART SCAN'
    startScanButton.classList.remove('scan__started')
    largeScanButton.innerText = 'LARGE SCAN'
}