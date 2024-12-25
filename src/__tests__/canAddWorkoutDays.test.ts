import { assert } from 'console';
import { WorkoutSplitter } from '../WorkoutSplitter';
import exp from 'constants';


// define global routine
let workoutDays: { [key:string]: string[] };
workoutDays = {
    'Monday': ['Chest', 'Triceps', 'Shoulders'],
    'Wednesday': ['Back', 'Biceps'],
    'Saturday': ['Shoulders', 'Legs']
}

describe('workoutSplitter', () => {
    it('should know resting days for a muscle group', () => {
        const splitter = new WorkoutSplitter(workoutDays);  

        // get least resting time for a given muscle group
        const restingTime = splitter.restingTimeFor('Shoulders');
        expect(restingTime).toBe(2);
        }
    )
})

describe('workoutSplitter', () => {
    it('should know resting days for a muscle group', () => {

        const workoutDays = {
            'Monday': ['Chest', 'Triceps', 'Shoulders'],
            'Tuesday': ['Shoulders']
        }

        const splitter = new WorkoutSplitter(workoutDays);  

        // get least resting time for a given muscle group
        const restingTime = splitter.restingTimeFor('Shoulders');
        expect(restingTime).toBe(1);
    }
    )
})

describe('workoutSplitter', () => {
    it('should get correct rest from saturday to monday', () => {

        const workoutDays = {
            'Monday': ['Chest', 'Triceps', 'Shoulders'],
            'Saturday': ['Shoulders']
        }

        const splitter = new WorkoutSplitter(workoutDays);  

        // get least resting time for a given muscle group
        const restingTime = splitter.restingTimeFor('Shoulders');
        expect(restingTime).toBe(2);
        }
    )
})