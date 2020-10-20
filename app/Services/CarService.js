import { ProxyState } from "../AppState.js";
import Car from "../Models/Car.js";
import { api } from '../Services/AxiosService.js'

class CarService {
  editCar(editedCar) {
    api.put("cars/" + editedCar._id, editedCar).then(res => {
      this.getCars()
    }).catch(err => console.error(err))
  }
  constructor() {
  }
  getCars() {
    api.get("cars").then(res => {
      ProxyState.cars = res.data.data.map(rawCarData => new Car(rawCarData))
    }).catch(err => console.error(err))
  }

  postCar(newCar) {
    api.post("cars", newCar).then(res => {
      this.getCars()
    }).catch(err => console.error(err))
  }

  deleteCar(carId) {
    api.delete("cars/" + carId).then(res => {
      console.log(res.data);
      this.getCars()
    }).catch(err => console.error(err))
  }
}

export const carService = new CarService();

