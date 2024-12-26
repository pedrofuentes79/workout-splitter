import { assert } from 'console';
import { WorkoutSplitter } from '../WorkoutSplitter';


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

describe('workoutSplitter', () => {
    it('should get correct if inverting day order', () => {

        const workoutDays = {            
            'Saturday': ['Shoulders'],
            'Monday': ['Chest', 'Triceps', 'Shoulders']
        }

        const splitter = new WorkoutSplitter(workoutDays);  

        // get least resting time for a given muscle group
        const restingTime = splitter.restingTimeFor('Shoulders');
        expect(restingTime).toBe(2);
        }
    )
})

describe('workoutSplitter', () => {
    it('should get 7 days of rest if only training once per week', () => {

        const workoutDays = {
            'Monday': ['Chest', 'Triceps', 'Shoulders'],
        }

        const splitter = new WorkoutSplitter(workoutDays);  

        // get least resting time for a given muscle group
        const restingTime = splitter.restingTimeFor('Triceps');
        expect(restingTime).toBe(7);
        }
    )
})

describe('workoutSplitter', () => {
    it('should raise if that muscle group is not being trained', () => {

        const workoutDays = {
            'Monday': ['Chest', 'Triceps', 'Shoulders'],
        }

        const splitter = new WorkoutSplitter(workoutDays);  

        // try catch
        expect(() => splitter.restingTimeFor('Biceps')).toThrow('Muscle group not being trained');
    })
})

describe('workoutSplitter', () => {
    it('should return the minimum rest time, not the highest', () => {

        const workoutDays = {
            'Monday': ['Shoulders'],
            'Tuesday': ['Shoulders'],
            'Friday': ['Shoulders'],
        }

        const splitter = new WorkoutSplitter(workoutDays);  

        expect(splitter.restingTimeFor('Shoulders')).toBe(1);
    })
})