import { Project } from './project';
import { Employee } from './employee';

export class AddTask {
    selectedProject:Project = new Project('',false,'','', new Employee('','','',''),'','');
    setParent :boolean = false;
    taskId:string;
    task:string;
    selectedParentTask :ParentTask = new ParentTask();
    priority:string;
    endDate:string;
    startDate:string;
    selectedEmployee:Employee = new Employee('','','','');
    status:number = 1;
}

class ParentTask{
    parentId:string;
    parentTask:any;
}