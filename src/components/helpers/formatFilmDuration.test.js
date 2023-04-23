import {formatFilmDuration} from './formatFilmDuration';

describe('formatFilmDuration', () => {
    it('should format the duration correctly', () => {
        expect(formatFilmDuration(90)).toEqual('1h 30m')
        expect(formatFilmDuration(125)).toEqual('2h 5m')
        expect(formatFilmDuration(60)).toEqual('1h 0m')
        expect(formatFilmDuration(0)).toEqual('0h 0m')
    })
})
