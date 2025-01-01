import { urlToHttpOptions } from "url";
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
        const sortedFreeDays = this.sortFreeDaysByConvenience(muscleGroup);
        
        for(const day of sortedFreeDays){
            if (frequency === 0) break;

            if (this.canInsertMuscleGroup(day, muscleGroup, minimumRest)){
                this.addSetsToDay(day, muscleGroup, sets);
                frequency--;
            }
        }

        if (frequency > 0){
            this.workoutDays = workoutDaysCopy;
            throw new Error("Not enough free days to insert muscle group");
        }    
    }

    private sortFreeDaysByConvenience(muscleGroup: string): string[]{
        // days that have zero training sets on them go mid
        // days that have some training, but not a lot go first
        // days that have a lot of training go last (TODO: implementar este otro criterio...)
        const aLotOfSets = 20; // for now...
        let days: string[] = JSON.parse(JSON.stringify(this.weekdayIndex));

        const daysWithZeroSets = days.filter(day => this.setsInDay(day) === 0);
        const daysWithSomeSets = days.filter(day => this.setsInDay(day) > 0 && this.setsInDay(day) < aLotOfSets);
        const daysWithALotOfSets = days.filter(day => this.setsInDay(day) >= aLotOfSets);

        return daysWithSomeSets.concat(daysWithZeroSets).concat(daysWithALotOfSets);
    }

    private setsInDay(day: string): number {
        const workout = this.workoutDays[day];
        if (!workout){
            return 0;
        }
        return Object.values(workout).reduce((sum, sets) => sum + sets, 0);
    }

    // #region testing
    
    setsFor(muscleGroup: string, onDay: string): number {
        if (!this.workoutDays[onDay]){
            return 0;
        }
        if (muscleGroup in this.workoutDays[onDay]){
            return this.workoutDays[onDay][muscleGroup];
        }
        return 0;
    }

    addSetsToDay(day: string, muscleGroup: string, sets: number): void {
        if (!this.workoutDays[day]){
            this.workoutDays[day] = {day: sets};
        }
        else {
            if (muscleGroup in this.workoutDays[day]){
                this.workoutDays[day][muscleGroup] += sets;
            }
            else {
                this.workoutDays[day][muscleGroup] = sets;
            }
        }
    }
    // #endregion
}

export { WorkoutSplitterWithSetsPerMuscleGroup };