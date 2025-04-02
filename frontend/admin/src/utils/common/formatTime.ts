export function FormatDay(date: string) {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
    } ${day}/${month}/${year}`;
}

export function GetTimeOnDate(date: string) {
    const time = new Date(date);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes}`;
}

export function GetDateOnDate(date: string) {
    const time = new Date(date);
    const day = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    return `${day}/${month+1}/${year}`;
}

export function GetTime(date:string){
    const time = new Date(date);
    const day = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    const hours = time.getHours();
    const minutes =  time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    return `${hours}:${minutes} ${day}/${month+1}/${year}` ;
}
