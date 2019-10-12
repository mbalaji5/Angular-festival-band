// export interface Car {
//     make: string;
//     model: string;
// }

export class Car {
  name: string;
  recordLabel: string;
}

export class CarShow {
  name: string;
  bands: Array<Car>;
}
export class festival {
  name: string;
}
export class band {
  name: string;
  festivals: Array<festival> = Array<festival>();
}
export class DisplayRecord {
  label: string;
  band: Array<band> = new Array<band>();
}
