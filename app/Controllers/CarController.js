import { ProxyState } from "../AppState.js";
import { carService } from "../Services/CarService.js";


//Private
function _draw() {
  let template = ""
  ProxyState.cars.forEach(c => template += c.Template)
  document.getElementById("listings").innerHTML = template
  document.getElementById('job-form').classList.add('hidden')
  document.getElementById('house-form').classList.add('hidden')
  document.getElementById("car-form").classList.remove("hidden")
}

//Public
export default class CarController {
  constructor() {
    ProxyState.on("cars", _draw);
  }

  postCar(e) {
    e.preventDefault()
    let formData = e.target
    let newCar = {
      make: formData.make.value,
      model: formData.model.value,
      year: formData.year.value,
      imgUrl: formData.imgUrl.value,
      price: formData.price.value,
      description: formData.description.value
    }
    carService.postCar(newCar)
  }

  editCar(e, carId) {
    e.preventDefault()
    let formData = e.target
    let editedCar = {
      make: formData.make.value,
      model: formData.model.value,
      year: formData.year.value,
      imgUrl: formData.imgUrl.value,
      price: formData.price.value,
      description: formData.description.value,
      _id: carId
    }
    // @ts-ignore
    $('#editCarModal-' + carId).modal('toggle')
    carService.editCar(editedCar)
  }

  deleteCar(carId) {
    carService.deleteCar(carId)
  }

  getCars() {
    carService.getCars()
  }

}
