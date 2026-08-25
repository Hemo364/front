import moment from "jalali-moment";

moment.locale("fa-IR");
export type FormatType =  "jD jMMMM jYYYY" | "jMM/jDD" | "jYYYY/jMM/jD"

export const convertToJalali =(date?:string | undefined,format:FormatType ='jD jMMMM jYYYY')=>{
    const newDate =moment(date);
    return newDate.format(format);
}

export const getDateRange =(startOfSet:number,endOffSet:number):string[]=>{
    const today =new Date();
    const dates:string[]=[];
    startOfSet=-startOfSet;
    for(let i=startOfSet; i<=endOffSet; i++){
        const currentDate =new Date(today);
        currentDate.setDate(today.getDate()+i);
        dates.push(currentDate.toISOString());
    }

    return dates;
}