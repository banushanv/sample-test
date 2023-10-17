import type Passenger from "./Passenger";

export default class TripForm{
    id!: string;
    date!: string;
    vehicleType!: any;
    from!: string;
    to !: string;
    distance!: string;
    toll!: string;
    sum!: string;
    isTrip!: boolean;
    passengers: Passenger[]=[];

}