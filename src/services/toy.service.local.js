
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'
// localStorage.removeItem('toyDB')

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {

            const txt = filterBy.txt || ''
            const maxPrice = filterBy.maxPrice === '' ? Infinity : +filterBy.maxPrice

            const regExp = new RegExp(txt, 'i')

            // if(filterBy.txt){

            // }

           

            const toysToReturn = toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= maxPrice
            )

            
            return _getNextPreviousToy(toysToReturn)
        })
}

function getById(toyId) {
    return query(getDefaultFilter()).then((toys)=>{

        const toyToReturn  = toys.find((toy)=>toy._id === toyId)
     
        
        return toyToReturn
    })
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: 0,
        labels: [],
        createdAt: 1631031801011,
        inStock: true,

    }
}

function getRandomToy() {
    return {
        name: getRandomName(),
        price: utilService.getRandomIntInclusive(1000, 9000),
        labels: getRandomLabel(),
        createdAt: Date.now(),
        inStock: true,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', }
}

function getRandomName() {
    const names = [
        'Super Car', 'Magic Puzzle', 'Talking Doll', 'Baby Blocks',
        'Water Gun', 'Art Kit', 'Robot Buddy', 'Speed Racer',
        'Outdoor Explorer', 'Box of Fun'
    ]
    const idx = utilService.getRandomIntInclusive(0, names.length - 1)
    return names[idx]
}

function getRandomLabel() {
    const labels = [
        'On wheels', 'Box game', 'Art', 'Baby',
        'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'
    ]
    const labelCount = utilService.getRandomIntInclusive(1, 3) // 1–3 labels
    const shuffled = labels.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, labelCount)
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


// Helpers



function _getNextPreviousToy(toys){
    return toys.map((toy, index)=>{
        const toysLength = toys.length
        let nextIndex = index + 1
        let prevIndex = index - 1
        if(index === 0) prevIndex = toysLength - 1
        if(index === toysLength - 1) nextIndex = 0
        
        return {
            ...toy,
            nextPrev:{
                next: toys[nextIndex]._id,
                prev: toys[prevIndex]._id

            }
        }
    })

}
