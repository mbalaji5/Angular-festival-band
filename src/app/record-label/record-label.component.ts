import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/app.service";
import {
  Car,
  DisplayRecord,
  CarShow,
  festival,
  band
} from "../modal/app-modal";

@Component({
  selector: "app-record-label",
  templateUrl: "./record-label.component.html",
  styleUrls: ["./record-label.component.css"]
})
export class RecordLabelComponent implements OnInit {
  CarFestivalList: Array<CarShow>;
  displayCarList: Array<DisplayRecord> = new Array<DisplayRecord>();
  constructor(private carService: DataService) {
    carService.getData("./assets/bands.json").subscribe(response => {
      this.CarFestivalList = response;
      this.formDisplayData();
    });
  }

  ngOnInit() {}
  formDisplayData() {
    this.CarFestivalList.forEach(festivals => {
      festivals.bands.forEach(bands => {
        let objrecord = new DisplayRecord();
        let objband = new band();
        let objFestival = new festival();

        objrecord.label = bands.recordLabel;
        objband.name = bands.name;
        objFestival.name = festivals.name;

        objband.festivals.push(objFestival);

        let addrecord = true;
        this.displayCarList.forEach(item => {
          if (
            item.label &&
            bands.recordLabel &&
            item.label === bands.recordLabel
          ) {
            addrecord = false;
            item.band.push(objband);
          }
        });

        if (addrecord) {
          objrecord.band.push(objband);
          this.displayCarList.push(objrecord);
        }
      });
    });
    this.displayCarList.forEach(fes => {
      fes.band.sort(function(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
      });
    });

    this.displayCarList.sort(function(a, b) {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });
  }
}
