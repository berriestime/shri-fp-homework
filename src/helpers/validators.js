/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { all, allPass, has, anyPass, pipe, values, filter, equals, length, propEq, complement } from 'ramda';

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    if (triangle !== 'white' || circle !== 'white')
        return false;
    
    return star === 'red' && square === 'green'; // Основное условие
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(
    values,
    filter(equals('green')),
    length,
    (cnt) => cnt >= 2
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
    const clrs = values(shapes);
    const redCnt = filter(equals('red'), clrs).length;
    const blueCnt = filter(equals('blue'), clrs).length;
    
    return redCnt === blueCnt;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    propEq('circle', 'blue'),
    propEq('star', 'red'),
    propEq('square', 'orange'),
    has('triangle'),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
    const clrs = values(shapes);
    const counts = {};
    
    clrs.forEach(clr => {
        if (clr !== 'white') {
            counts[clr] = (counts[clr] || 0) + 1;
        }
    });
    
    return Object.values(counts).some(cnt => cnt >= 3);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
    (shapes) => filter(equals('green'), values(shapes)).length === 2,
    propEq('triangle', 'green'),
    (shapes) => filter(equals('red'), values(shapes)).length === 1
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = pipe(
  values,
  all(equals('orange'))
);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = complement(anyPass([
    propEq('star', 'red'),
    propEq('star', 'white')
]));

// 9. Все фигуры зеленые.
export const validateFieldN9 = pipe(
  values,
  all(equals('green'))
);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({triangle, square}) => {
    return triangle === square && triangle !== 'white';
};