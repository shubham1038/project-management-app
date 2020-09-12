import * as moment from 'moment';
import { Employee } from './employee';
export class Project {
    constructor(
        public project: string,
        public setDate: boolean,
        public endDate: string = moment().format("YYYY-MM-DD"),
        public priority: string,
        public selectedEmployee: Employee,
        public startDate: string = moment().add(1, 'days').format("YYYY-MM-DD"),
        public projectId: string,
    ){}

}
