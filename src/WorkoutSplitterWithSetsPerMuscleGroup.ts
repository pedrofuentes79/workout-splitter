import { WorkoutSplitter, WorkoutWithSetsPerMuscleGroup } from "./WorkoutSplitter";


class WorkoutSplitterWithSetsPerMuscleGroup extends WorkoutSplitter<WorkoutWithSetsPerMuscleGroup>{

    // # region selecting days
    trainingDaysFor(muscleGroup: string): string[] {
        return Object.keys(this.workoutDays).filter(day => 
            muscleGroup in this.workoutDays[day]
        );
    }

    freeDaysFor(muscleGroup: string): string[] {
        return Object.keys(this.workoutDays).filter(day => 
            ! (muscleGroup in this.workoutDays[day])
        );
    }
    // #endregion

    insertMuscleGroup(muscleGroup: string, frequency: number, minimumRest: number, sets:number=0): void {
        const workoutDaysCopy = this.copyJSON(this.workoutDays);
        const freeDays = this.freeDaysFor(muscleGroup);
        
        for(const day of freeDays){
            if (frequency === 0) break;

            if (this.canInsertMuscleGroup(day, muscleGroup, minimumRest)){
                this.workoutDays[day][muscleGroup] = sets;
                frequency--;
            }
        }

        if (frequency > 0){
            this.workoutDays = workoutDaysCopy;
            throw new Error("Not enough free days to insert muscle group");
        }    
    }
}

export { WorkoutSplitterWithSetsPerMuscleGroup };