import CarController from "./Controllers/CarController.js";
import HouseController from "./Controllers/HouseController.js";
import JobController from "./Controllers/JobController.js";

class App {
  carController = new CarController();
  jobController = new JobController();

  houseController = new HouseController();
}

window["app"] = new App();
