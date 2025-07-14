/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import { curry, test, pipe } from 'ramda';
import Api from '../tools/api';

const api = new Api();

const validateInput = (value) => {
    const inputStr = String(value);
    const numberPattern = /^[0-9]+(\.[0-9]*)?$/;
    const isNumber = test(numberPattern, inputStr);
    const len = inputStr.length;
    const num = parseFloat(inputStr);
    
    return isNumber &&
           len > 2 &&
           len < 10 &&
           num > 0;
};

const logAndReturn = curry((writeLog, value) => {
    writeLog(value);
    return value;
});

const roundNumber = pipe(parseFloat, Math.round);
const getLength = (str) => str.length;
const square = (num) => num * num;
const modulo3 = (num) => num % 3;

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const log = logAndReturn(writeLog);
    
    try {
        log(value);
        
        if (!validateInput(value)) {
            handleError('ValidationError');
            return;
        }
        
        const roundedNumber = pipe(log, roundNumber)(value);
        
        api.get('https://api.tech/numbers/base', { 
            from: 10, 
            to: 2, 
            number: roundedNumber 
        })
        .then(({ result }) => {
            log(result);
            
            const binaryLength = getLength(result);
            log(binaryLength);
            
            const squared = square(binaryLength);
            log(squared);
            
            const remainder = modulo3(squared);
            log(remainder);
            
            const resultId = remainder;
            return api.get(`https://animals.tech/${resultId}`, {});
        })
        .then(({ result }) => {
            handleSuccess(result);
        })
        .catch((error) => {
            handleError(error);
        });
        
    } catch (error) {
        handleError('ValidationError');
    }
};

export default processSequence;