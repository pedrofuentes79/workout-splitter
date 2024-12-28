import { WorkoutSplitterWithMuscleGroup } from '../WorkoutSplitter';


// define global routine
let workoutDays: { [key:string]: string[] };
workoutDays = {
    'Tuesday': [],
    'Friday': [],
    'Saturday': []
}

describe('workoutSplitter', () => {
    it('should insert muscle group in free days', () => {
        const splitter = new WorkoutSplitterWithMuscleGroup(workoutDays);  

        splitter.insertMuscleGroup('Chest', 2, 2);
        
        expect(splitter.muscleGroupsFor('Tuesday')).toContain('Chest');
        expect(splitter.muscleGroupsFor('Friday')).toContain('Chest');
        }
    )
})

describe('workoutSplitter', () => {
    it('should not insert muscle group if there are not enough free days', () => {
        const splitter = new WorkoutSplitterWithMuscleGroup(workoutDays);  

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


        const splitter = new WorkoutSplitterWithMuscleGroup(workoutDays);

        splitter.insertMuscleGroup('Chest', 2, 2);

        expect(splitter.muscleGroupsFor('Tuesday')).toContain('Shoulders');
        expect(splitter.muscleGroupsFor('Tuesday')).toContain('Chest');
        expect(splitter.muscleGroupsFor('Friday')).toContain('Chest');
    })
})

describe('workoutSplitter', () => {
    it('should not insert muscle group if there is not enough rest days between training days', () => {
        const workoutDays = {
            'Tuesday': ['Chest'],
            'Friday': [],
            'Saturday': []
        };

        const splitter = new WorkoutSplitterWithMuscleGroup(workoutDays);

        expect(() => splitter.insertMuscleGroup('Chest', 2, 2)).
        toThrow('Not enough free days to insert muscle group');
    })
})

describe('workoutSplitter', () => {
    it('should leave everything as is with frequency=0', () => {
        const workoutDays = {
            'Tuesday': ['Chest'],
            'Friday': [],
            'Saturday': []
        };

        const splitter = new WorkoutSplitterWithMuscleGroup(workoutDays);
        splitter.insertMuscleGroup('Chest', 0, 2);

        expect(splitter.muscleGroupsFor('Tuesday')).toContain('Chest');
        expect(splitter.isDayEmpty('Friday')).toBe(true);
        expect(splitter.isDayEmpty('Saturday')).toBe(true);
    })
})

describe('workoutSplitter', () => {
    it('should add a muscle group to an existing workout, keeping the previous muscle groups', () => {
        const workoutDays = {
            'Tuesday': ['Chest'],
            'Friday': [],
            'Saturday': []
        };

        const splitter = new WorkoutSplitterWithMuscleGroup(workoutDays);
        splitter.addMuscleGroupTo('Tuesday', ['Shoulders']);

        expect(splitter.muscleGroupsFor('Tuesday')).toContain('Chest');
        
    })
})

describe('workoutSplitter', () => {
    it('should keep the routine as it was if inserting is not possible', () => {
        const workoutDays = {
            'Tuesday': ['Chest'],
            'Friday': [],
            'Saturday': []
        };

        const splitter = new WorkoutSplitterWithMuscleGroup(workoutDays);
        expect(() => splitter.insertMuscleGroup('Chest', 2, 2)).toThrow("Not enough free days to insert muscle group");

        expect(splitter.muscleGroupsFor('Tuesday')).toContain('Chest');
        expect(splitter.isDayEmpty('Friday')).toBe(true);
        expect(splitter.isDayEmpty('Saturday')).toBe(true);

    })
})
