const startScanButton = document.querySelector('.start__scan')
const largeScanButton = document.querySelector('.large__scan')
const deleteFilterButton = document.querySelector('.delete__filter')
let changedRows = 0
startScanButton.addEventListener('click', () => {
    ordersList()
})
largeScanButton.addEventListener('click', () => {
    showDialog()
})
const sectionHeader = document.querySelector('.section__header')
function showDialog() {
    const dialog = document.querySelector('.dialog')
    const dialogContent = document.querySelector('.dialog__content')

    dialog.style.display = 'flex'

    dialog.addEventListener('click', (e) => {
        if (e.target !== dialog) {
            return;
        }
        dialogContent.innerHTML = '';
        dialog.style = 'display: none';
    })
    const ordersPageQuery = JSON.parse(localStorage.getItem('ordersPage'))

    dialogContent.innerHTML =
        `
        <div class="dialog__header">
            <h2>Edit textile</h2>
            <img src="../../src/ControlPanel/Cancel.png" alt="">
        </div>
        <div class="dialog__body dialog__body__fully">
            <select id="company">
                <option hidden value="">Select company</option>
                ${ordersPageQuery.map(list => {
                    return `<option value="${list.id}">${list.customer}</option>`
                })}
            </select>
        </div>
        <button id="nextButton">Next</button>
        `
    let companyId = ''
    const closeDialog = document.querySelector('.dialog__header img')
    closeDialog.addEventListener('click', () => {
        dialogContent.innerHTML = '';
        dialog.style = 'display: none';
    })
    const companySelect = document.querySelector('#company')
    companySelect.addEventListener('change', () => {companyId = companySelect.value})
    const nextButton = document.querySelector('#nextButton')
    nextButton.addEventListener('click', () => {
        if(companyId === ''){
            return
        }
        const colorsQuery = JSON.parse(localStorage.getItem('colors'))
        const sizesQuery = JSON.parse(localStorage.getItem('sizes'))
        const actionsQuery = JSON.parse(localStorage.getItem('actions'))
        dialogContent.innerHTML =
            `
            <div class="dialog__header">
                <h2>Edit textile</h2>
                <img src="../../src/ControlPanel/Cancel.png" alt="">
                </div>
            <div class="dialog__body">
                <div class="select__wrapper">
                    <select id="product">
                        <option hidden value="">Select product</option>
                        ${ordersPageQuery[companyId].orders.map(order => {
                            return `<option value="${order.id}">${order.item}</option>`
                        })}
                    </select>
                    <p>Select product</p>
                </div>
                <div class="select__wrapper">
                    <select id="color">
                        <option hidden value="">Select color</option>
                        ${colorsQuery.map(color => {
                            return `<option style="background-color: ${color.value}" value="${color.name}">${color.name}</option>`
                        })}
                    </select>
                    <p>Select color</p>
                </div>
                <div class="select__wrapper">
                    <select id="size">
                        <option hidden value="">Select size</option>
                        ${sizesQuery.map(size => {
                            return `<option value="${size.size}">${size.size}</option>`
                        })}
                    </select>
                    <p>Select size</p>
                </div>
                <div class="select__wrapper">
                    <select id="action">
                        <option hidden value="">Select action</option>
                        ${actionsQuery.map(action => {
                            return `<option value="${action.action}">${action.action}</option>`
                        })}
                    </select>
                    <p>Select action</p>
                </div>
                <div class="input__wrapper">
                    <input type="text" id="weight">
                    <p>Weight (g)</p>
                </div>
                <div class="input__wrapper">
                    <input type="text" id="washes" placeholder="Unlimited">
                    <p>Max Number of WasheS</p>
                </div>
            </div>
            <button id="saveButton">Save</button>
            `
        let product = ''
        let color = ''
        let size = ''
        let action = ''
        let weight = ''
        let washes = ''
        let productSelect = document.querySelector('#product')
        productSelect.addEventListener('change', () => {product = productSelect.value})
        let colorSelect = document.querySelector('#color')
        colorSelect.addEventListener('change', () => {color = colorSelect.value})
        let sizeSelect = document.querySelector('#size')
        sizeSelect.addEventListener('change', () => {size = sizeSelect.value})
        let actionSelect = document.querySelector('#action')
        actionSelect.addEventListener('change', () => {action = actionSelect.value})
        let weightInput = document.querySelector('#weight')
        weightInput.addEventListener('input', () => {weight = weightInput.value})
        let washesInput = document.querySelector('#washes')
        washesInput.addEventListener('input', () => {washes = washesInput.value})
        let saveButton = document.querySelector('#saveButton')
        saveButton.addEventListener('click', () => {
            color !== '' ? ordersPageQuery[companyId].orders[product].color = color : ordersPageQuery[companyId].color = ordersPageQuery[companyId].color
            size !== '' ? ordersPageQuery[companyId].orders[product].size = size :  ordersPageQuery[companyId].size =  ordersPageQuery[companyId].size
            action !== '' ? ordersPageQuery[companyId].orders[product].status = action : ordersPageQuery[companyId].status = ordersPageQuery[companyId].status
            weight !== '' ? ordersPageQuery[companyId].orders[product].weight = weight : ordersPageQuery[companyId].weight = ordersPageQuery[companyId].weight
            washes !== '' ? ordersPageQuery[companyId].orders[product].washes = washes : ordersPageQuery[companyId].washes = ordersPageQuery[companyId].washes
            localStorage.setItem('ordersPage', JSON.stringify(ordersPageQuery))
            dialog.style.display = ''
            dialogContent.innerHTML = ''
            ordersListMore()
        })

        const closeDialog = document.querySelector('.dialog__header img')
        closeDialog.addEventListener('click', () => {
            dialogContent.innerHTML = '';
            dialog.style = 'display: none';
        })
    })
}
function ordersList() {
    startScanButton.addEventListener('click', () => {
        startScanButton.innerText = 'START SCAN'
        startScanButton.classList.remove('scan__started')
        largeScanButton.style = ''
        largeScanButton.innerText = 'CHANGE TEXTILE'
        deleteFilterButton.style = ''
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
        })
    })
    unknownTagsCount.innerHTML = `<p>${state.length}</p>`
    ignoredTagsCount.innerHTML = `<p>0</p>`
    startScanButton.innerText = 'STOP SCAN'
    startScanButton.classList.add('scan__started')
    largeScanButton.innerText = 'IGNORE THESE'


    const contentSection = document.querySelector('.section__inner')
    contentSection.classList.add('content__section__main')
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

    startScanButton.innerText = 'START SCAN'
    startScanButton.classList.remove('scan__started')
    largeScanButton.style = ''
    largeScanButton.innerText = 'CHANGE TEXTILE'
    deleteFilterButton.style = ''
}

function ordersListMore() {
    startScanButton.addEventListener('click', () => {
        startScanButton.innerText = 'START SCAN'
        startScanButton.classList.remove('scan__started')
        largeScanButton.innerText = 'CHANGE TEXTILE'
        deleteFilterButton.style.display = 'none'
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
    contentSection.classList.remove('content__section__main')
    contentSection.innerHTML =
        `
                <div class="section__header">

                </div>
                <div class="section__body">
                    
                </div>
        `

    changedRows+=1
    const sectionHeader = document.querySelector('.section__header')
    updateHeader()
    function updateHeader() {
        sectionHeader.innerHTML =
            `
            <div class="left">
                <h1><span>Changes saved</span></h1>
            </div>
            <div class="right">
                <p><span>${changedRows}</span> lines changed in the system; <span>0</span> Tags not entered due to error;</p>
            </div>
            `
    }
    const sectionBody = document.querySelector('.section__body')

    sectionBody.innerHTML = `
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
        sectionBody.innerHTML += `
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
            ordersListMore();
        });
    });

    startScanButton.innerText = 'START SCAN'
    startScanButton.classList.remove('scan__started')
    largeScanButton.innerText = 'CHANGE TEXTILE'
    deleteFilterButton.style.display = 'none'
}
