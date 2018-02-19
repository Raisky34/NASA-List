import React from 'react';
import ReactDom from 'react-dom'
import * as Order from '../constants/sortOrder'

/**
 * Read value from React Dom model by ref element
 *
 * @param element
 */
export function getValue(element) {
    if(element == undefined){
        return "";
    }
    switch (element.type){
        case 'email':
        case 'password':
        case 'text':
        case 'select-one':
            return ReactDom.findDOMNode(element).value.trim();
        case 'checkbox':
            return ReactDom.findDOMNode(element).checked;
        default:
            if(element.hasAttribute('data-value')){
                return element.getAttribute('data-value');
            }
            return "";
    }
}

/**
 * Read value from React Dom model by ref element
 *
 * @param element
 */
export function setValue(element, value) {
    if(element == undefined){
        return "";
    }
    switch (element.type){
        case 'email':
        case 'password':
        case 'text':
        case 'select-one':
            return ReactDom.findDOMNode(element).value(value);
        default:
            element.setAttribute('data-value', value);

            return element.getAttribute('data-value');
    }
}

/**
 * Read classes 'sorting', 'sorting_asc' and 'sorting_desc' from element
 *
 * @param element
 * @return {@link Order} if element exist
 */
export function getSorting(element) {
    if(element == undefined){
        return undefined;
    }
    const classList = element.classList;
    if(classList.contains('sorting_asc')){
        //if current sorting is 'ASC' then set 'DESC'
        return Order.DESC;
    } else if(classList.contains('sorting_desc') || classList.contains('sorting')) {
        //if current sorting absent ot current sorting is 'DESC' then set 'ASC'
        return Order.ASC;
    }
    return undefined;
}