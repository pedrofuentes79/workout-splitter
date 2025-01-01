import exp from 'constants';
import { WorkoutSplitterWithSetsPerMuscleGroup } from '../WorkoutSplitterWithSetsPerMuscleGroup';

const workoutDays = {
    'Monday': {'Chest': 7, 'Triceps': 8, 'Shoulders': 11},
    'Wednesday': {'Back': 18, 'Biceps': 8},
    'Thursday': {'Quads': 10, 'Hamstrings': 5, 'Glutes': 4, 'Calves': 4},
    'Friday': {'Shoulders': 4}
}


describe('workoutSplitterWithSets', () => {
    it('should know resting days for a muscle group, regardless of set or no-set structure', () => {
        const splitter = new WorkoutSplitterWithSetsPerMuscleGroup(workoutDays);  

        // get least resting time for a given muscle group
        const restingTime = splitter.restingTimeFor('Shoulders');
        expect(restingTime).toBe(3);
        }
    )
})

describe('workoutSplitterWithSets', () => {
    it('should insert a new day with the given sets', () => {

        const workoutDays = {
            'Monday': {'Chest': 7, 'Triceps': 8},
            'Friday': {'Chest': 4}
        }

        const splitter = new WorkoutSplitterWithSetsPerMuscleGroup(workoutDays);  

        splitter.insertMuscleGroup('Shoulders', 1, 2, 4);
        expect(splitter.setsFor('Shoulders', 'Monday')).toBe(4);
    })
})

describe('workoutSplitterWithSets', () => {
    it("should add sets not to first day, but to a day that has training already", () => {
        const workoutDays = {
            'Tuesday': {'Chest': 7, 'Triceps': 8},
        }

        const splitter = new WorkoutSplitterWithSetsPerMuscleGroup(workoutDays);  

        splitter.insertMuscleGroup('Shoulders', 1, 2, 4);
        expect(splitter.setsFor('Shoulders', 'Tuesday')).toBe(4);
        expect(splitter.setsFor('Shoulders', 'Monday')).toBe(0);
    })
})

describe('workoutSplitterWithSets', () => {
    it('should add sets in the most convenient day, but without removing the existing sets', () => {
        const splitter = new WorkoutSplitterWithSetsPerMuscleGroup(workoutDays);  

        splitter.insertMuscleGroup('Shoulders', 1, 2, 4);
        expect(splitter.setsFor('Shoulders', 'Friday')).toBe(8);
        expect(splitter.setsFor('Shoulders', 'Monday')).toBe(11);
        expect(splitter.setsFor('Shoulders', 'Wednesday')).toBe(0);
        expect(splitter.setsFor('Shoulders', 'Thursday')).toBe(0);
        expect(splitter.setsFor('Shoulders', 'Saturday')).toBe(0);
        expect(splitter.setsFor('Shoulders', 'Sunday')).toBe(0);
    })
})