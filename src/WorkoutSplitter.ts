class WorkoutSplitter {
    private workoutDays: { [key:string]: string[]};

    constructor(workoutDays: { [key:string]: string[] }) {
        this.workoutDays = workoutDays;
    }
    
    restingTimeFor(muscleGroup: string): number {
        // days = +inf
        let days = Number.POSITIVE_INFINITY
        let lastDay = '';
        for (const day in this.workoutDays) {
            if (this.workoutDays[day].includes(muscleGroup)){
                if (lastDay != ''){
                    days = Math.min(differenceBetween(day, lastDay), days);
                }
                lastDay = day;
                
            }
        }
        return days;
    }


}

const weekdayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function differenceBetween(dayA: string, dayB: string): number{
    const indexA = weekdayIndex.indexOf(dayA);
    const indexB = weekdayIndex.indexOf(dayB);
    if (indexA === -1 || indexB === -1) throw new Error("Invalid weekday name");


    // TODO: Refactor
    const differenceA = (indexA - indexB + 7) % 7;
    const differenceB = (indexB - indexA + 7) % 7;
    return Math.min(differenceA, differenceB);

}


export { WorkoutSplitter }