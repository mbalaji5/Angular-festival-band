// export interface Car {
//     make: string;
//     model: string;
// }

export interface Car {
    name: string;
    recordLabel: string;
}

export interface CarShow {
    name: string;
    bands: [Car];
}
