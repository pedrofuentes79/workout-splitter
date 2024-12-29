import exp from 'constants';
import { WorkoutSplitterWithSetsPerMuscleGroup } from '../WorkoutSplitterWithSetsPerMuscleGroup';

const workoutDays = {
    'Monday': {'Chest': 7, 'Triceps': 8, 'Shoulders': 11},
    'Wednesday': {'Back':18, 'Biceps': 8},
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
    it('should insert sets for a muscle group in the correct day', () => {
        const splitter = new WorkoutSplitterWithSetsPerMuscleGroup(workoutDays);  

        splitter.insertMuscleGroup('Shoulders', 1, 2, 4);
        // deberia haberlo agregado a otro dia que no sea friday, porque ese dia ya tiene shoulders
        // despues agregar la funcionalidad que permita agregar sets a un dia cualquiera, independientemente de si ya tiene ese muscleGroup
            // esto me deja medio picando la idea de modelar el muscleGroup, que tenga ciertas propiedades, como por ejemplo su descanso necesario por split, sus sets maximos y minimos por split, y sus dias de entrenamiento junto con sus sets por entrenamiento. 
            // No es una mala idea pensarlo asi... hay que ver como es mas natural pensar en el problema de distribucion de sets
        expect(splitter.muscleGroupsFor('Friday')['Shoulders']).toBe(4);
    })
})
