import { ProxyState } from "../AppState.js"
import House from "../Models/House.js"
import { api } from "../Services/AxiosService.js"

class HouseService {
  constructor() {
    console.log("hello from house service")
  }
  postHouse(newHouse) {
    api.post("houses", newHouse).then(res => {
      this.getHouses()
    }).catch(err => console.error(err))
  }

  editHouse(editedHouse) {
    api.put("houses/" + editedHouse._id, editedHouse).then(res => {
      this.getHouses()
    }).catch(err => console.error(err))
  }
  deleteHouse(houseId) {
    api.delete("houses/" + houseId).then(res => {
      this.getHouses()
    }).catch(err => console.error(err))
  }
  getHouses() {
    api.get("houses").then(res => {
      ProxyState.houses = res.data.data.map(newHouseData => new House(newHouseData))
    }).catch(err => console.error(err))
  }

}

export const houseService = new HouseService()