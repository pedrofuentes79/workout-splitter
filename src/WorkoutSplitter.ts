class WorkoutSplitter {
    private workoutDays: { [key:string]: string[]};
    private readonly weekdayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    constructor(workoutDays: { [key:string]: string[] }) {
        this.workoutDays = workoutDays;
    }

    addWorkoutDay(day: string, muscleGroups: string[]): void {
        this.workoutDays[day] = muscleGroups;
    }
    
    insertMuscleGroup(muscleGroup: string, frequency: number, minimumRest: number): void {
        // handle errors here
        // make a copy of the current state

        const freeDays = this.freeDaysFor(muscleGroup);
        for(const day of freeDays){
            if (this.canInsertMuscleGroup(day, muscleGroup, minimumRest)){
                this.workoutDays[day].push(muscleGroup);
                frequency--;
            }
            if (frequency === 0) break;
        }

        if (frequency > 0){
            // restore previous state
            throw new Error("Not enough free days to insert muscle group");
        }    
    }

    canInsertMuscleGroup(day: string, muscleGroup: string, minimumRest: number): boolean {
        const otherDaysForMuscleGroup = this.trainingDaysFor(muscleGroup);
        for(const otherDay of otherDaysForMuscleGroup){
            const restDays = this.restDaysBetween(day, otherDay);
            if (restDays < minimumRest) return false;
        }
        return true;
            
    }


    freeDaysFor(muscleGroup: string): string[] {
        const days = Object.keys(this.workoutDays).filter(day => 
            ! this.workoutDays[day].includes(muscleGroup)
        );

        return days;
    }

    //#region restDays
    restingTimeFor(muscleGroup: string): number {
        const trainingDays = this.trainingDaysFor(muscleGroup);
        if (trainingDays.length === 0) {throw new Error("Muscle group not being trained");}
        let restDays = 7;

        for(let i = 0; i < trainingDays.length - 1; i++){
            const currentRestDays = this.restDaysBetween(trainingDays[i], trainingDays[i+1]);
            restDays = Math.min(restDays, currentRestDays);
        }
        return restDays;

    }

    trainingDaysFor(muscleGroup: string): string[] {
        const days = Object.keys(this.workoutDays).filter(day => 
            this.workoutDays[day].includes(muscleGroup)
        );
        return days;
    }


    restDaysBetween(dayA: string, dayB: string): number{
        const indexA = this.weekdayIndex.indexOf(dayA);
        const indexB = this.weekdayIndex.indexOf(dayB);
        if (indexA === -1 || indexB === -1) throw new Error("Invalid weekday name");
    
        const forwardDistance = (indexB - indexA + 7) % 7;
        const backwardDistance = indexA === indexB ? 0 : 7 - forwardDistance;
    
        return Math.min(backwardDistance, forwardDistance);
    
    }
    // #endregion

}



export { WorkoutSplitter }