import { WorkoutSplitter } from '../WorkoutSplitter';


// define global routine
let workoutDays: { [key:string]: string[] };
workoutDays = {
    'Tuesday': [],
    'Friday': [],
    'Saturday': []
}

describe('workoutSplitter', () => {
    it('should insert muscle group in free days', () => {
        const splitter = new WorkoutSplitter(workoutDays);  

        splitter.insertMuscleGroup('Chest', 2, 2);
        
        expect(workoutDays['Tuesday']).toContain('Chest');
        expect(workoutDays['Friday']).toContain('Chest');
        }
    )
})

describe('workoutSplitter', () => {
    it('should not insert muscle group if there are not enough free days', () => {
        const splitter = new WorkoutSplitter(workoutDays);  

        expect(() => splitter.insertMuscleGroup('Chest', 4, 2)).toThrow('Not enough free days to insert muscle group');
    })
})


describe('workoutSplitter', () => {
    it('should insert a new muscle group even if that day already has a muscle group', () => {
        const workoutDays = {
            'Tuesday': ['Shoulders'],
            'Friday': [],
            'Saturday': []
        };


        const splitter = new WorkoutSplitter(workoutDays);

        splitter.insertMuscleGroup('Chest', 2, 2);

        expect(workoutDays['Tuesday']).toContain('Shoulders');
        expect(workoutDays['Tuesday']).toContain('Chest');
        expect(workoutDays['Friday']).toContain('Chest');
    })
})

describe('workoutSplitter', () => {
    it('should not insert muscle group if there is not enough rest days between training days', () => {
        const workoutDays = {
            'Tuesday': ['Chest'],
            'Friday': [],
            'Saturday': []
        };

        const splitter = new WorkoutSplitter(workoutDays);

        expect(() => splitter.insertMuscleGroup('Chest', 2, 2)).
        toThrow('Not enough free days to insert muscle group');
    })
})