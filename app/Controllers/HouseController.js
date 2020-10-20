import { ProxyState } from "../AppState.js"
import { houseService } from "../Services/HouseService.js"

function _draw() {
  let template = ''
  ProxyState.houses.forEach(h => template += h.Template)
  document.getElementById('listings').innerHTML = template
  document.getElementById('car-form').classList.add('hidden')
  document.getElementById('job-form').classList.add('hidden')
  document.getElementById('house-form').classList.remove('hidden')
}

export default class HouseController {
  constructor() {
    console.log("hello from house controller")
    ProxyState.on("houses", _draw)
  }

  getHouses() {
    houseService.getHouses()
  }

  postHouse(e) {
    e.preventDefault()
    let form = e.target
    let newHouse = {
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      year: form.year.value,
      levels: form.levels.value,
      price: form.price.value,
      description: form.description.value,
      imgUrl: form.imgUrl.value
    }
    houseService.postHouse(newHouse)
    form.reset()
  }

  deleteHouse(houseId) {
    houseService.deleteHouse(houseId)
  }

  editHouse(e, houseId) {
    e.preventDefault()
    let form = e.target
    let editedHouse = {
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      levels: form.levels.value,
      year: form.year.value,
      imgUrl: form.imgUrl.value,
      price: form.price.value,
      description: form.description.value,
      _id: houseId
    }
    // @ts-ignore
    $('#editHouseModal-' + houseId).modal('toggle')
    houseService.editHouse(editedHouse)
  }
}