type WorkoutWithSetsPerMuscleGroup = {
    [key: string]: {
        [key: string]: number;
    };
};

type WorkoutWithMuscleGroup = {
    [key: string]: string[];
};

class WorkoutSplitter<T>{

    protected workoutDays: T;
    protected readonly weekdayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    constructor(workoutDays: T) {
        this.workoutDays = this.copyJSON(workoutDays);
    }

    protected copyJSON(jsonToCopy: T): T {
        return JSON.parse(JSON.stringify(jsonToCopy));
    }

    restDaysBetween(dayA: string, dayB: string): number{
        const indexA = this.weekdayIndex.indexOf(dayA);
        const indexB = this.weekdayIndex.indexOf(dayB);
        if (indexA === -1 || indexB === -1) throw new Error("Invalid weekday name");
    
        const forwardDistance = (indexB - indexA + 7) % 7;
        const backwardDistance = indexA === indexB ? 0 : 7 - forwardDistance;
    
        return Math.min(backwardDistance, forwardDistance);
    
    }

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
        throw new Error("Subclass responsibility");
    }

}

class WorkoutSplitterWithSetsPerMuscleGroup extends WorkoutSplitter<WorkoutWithSetsPerMuscleGroup>{

}

class WorkoutSplitterWithMuscleGroup extends WorkoutSplitter<WorkoutWithMuscleGroup>{
    addMuscleGroupTo(workoutDay: string, muscleGroups: string[]): void {
        if (!this.workoutDays[workoutDay]){
            this.workoutDays[workoutDay] = [];
        }
        this.workoutDays[workoutDay].push(...muscleGroups);

    }

    muscleGroupsFor(day: string): string[] {
        if (!this.workoutDays[day]){
            throw new Error("This day is not a workout day");
        }
        return this.workoutDays[day].slice();

    }

    isDayEmpty(day: string): boolean {
        return this.workoutDays[day].length === 0;
    }

    // #region INSERTING INTO ROUTINE
    insertMuscleGroup(muscleGroup: string, frequency: number, minimumRest: number): void {
        const workoutDaysCopy = this.copyJSON(this.workoutDays);

        const freeDays = this.freeDaysFor(muscleGroup);
        for(const day of freeDays){
            if (frequency === 0) break;

            if (this.canInsertMuscleGroup(day, muscleGroup, minimumRest)){
                this.workoutDays[day].push(muscleGroup);
                frequency--;
            }
        }

        if (frequency > 0){
            this.workoutDays = workoutDaysCopy;
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

    // #endregion

    //#region restDays

    trainingDaysFor(muscleGroup: string): string[] {
        const days = Object.keys(this.workoutDays).filter(day => 
            this.workoutDays[day].includes(muscleGroup)
        );
        return days;
    }


    
    // #endregion

}

export { WorkoutSplitter, WorkoutSplitterWithSetsPerMuscleGroup, WorkoutSplitterWithMuscleGroup };