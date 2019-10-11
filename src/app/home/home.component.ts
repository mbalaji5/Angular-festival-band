import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/app.service';
import { CarShow } from '../modal/app-modal';
import { clientUrl, mockUrl} from '../app.config';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public carDetails: CarShow[];
public errorMessage: string;
public groupedCarDetails: any[];
public structuredData: any[];
public showGroupByGrid: boolean;
public searchRecord: string;
public groupedBandDetails: any[];

constructor(private carService: DataService) {
  this.showGroupByGrid = false;
}

ngOnInit() {
  this.getCarDetails();
}

getCarDetails() { // fetch car details
  this.carService.getData(mockUrl)
  .subscribe((res: any[]) => {
    this.sortResponseData(res);
  }, error => this.handleError(error));
}

sortResponseData(carDets) { // sort each group alphabetically
   carDets.forEach(el => {
     el.bands.sort((a, b) => {
       const sortTextA = a.name.toUpperCase();
       const sortTextB = b.name.toUpperCase();
       return (sortTextA < sortTextB) ? -1 : (sortTextA > sortTextB) ? 1 : 0;
     });
   });
   this.carDetails = carDets;
   console.log("After sorting alphabetically"+this.carDetails)
   this.sortByRecord(this.carDetails)
}

sortByRecord(myData) {
  const finalData = [];
  
  myData.forEach(el => {
    el.bands.forEach(element => {
      finalData.push(this.byElement(element.recordLabel, myData));
    });
  })
  console.log("Test"+finalData);
  this.structuredData = finalData;
}

byElement(record, myData){
  const BandData = [];
  let festival: string;
  myData.forEach(el => {
    el.bands.forEach(element => {
      festival = el.name;
      if(record === element.recordLabel) {
        element["prop"] = festival;
        BandData.push(element)
      }
    });
  })
  console.log("Test"+BandData);
  
  return BandData;
}
groupAlbhabetically() { // group data alphabetically
  this.showGroupByGrid = !this.showGroupByGrid;
  const mergedCarDetails = [];
  const key = 'name';

  this.carDetails.forEach((element) => { // push name in to all car objects
   element.bands.forEach(el => {
     el[key] = element.name;
     mergedCarDetails.push(el);
   });
  });

  const data = mergedCarDetails.reduce((arr, el) => { // grouping alphabetically
    const group = el.name;
    if (!arr[group]) {
      arr[group] = {group, children: [el]};
    } else {
      arr[group].children.push(el);
    }
    return arr;
  }, {});

  this.groupedCarDetails = Object.values(data);
  console.log("After sorting alphabetically"+this.groupedCarDetails)
}

handleError(error) { // handle errors
  this.errorMessage = error.message;
}

}
