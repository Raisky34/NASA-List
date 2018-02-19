'use strict';

import { EMAIL_REG_EXTENDED } from '../constants/validation';

const notValidClass = 'not_valid';

/**
 * Mark component as valid
 *
 * @param element   {@link HTMLInputElement}
 */
export function markAsValid(element) {
    const className = element.className;
    element.className = className.replace(notValidClass)
}

/**
 * Mark component as valid
 *
 * @param element   {@link HTMLInputElement}
 */
export function markAsNotValid(element) {
    if(element.className.indexOf(notValidClass) < 0) {
        element.className = element.className + " " + notValidClass;
    }
}

export function validateEmail(inputRef) {
  if (EMAIL_REG_EXTENDED.test(inputRef.value)) {
    inputRef.setCustomValidity('')
  } else {
    inputRef.setCustomValidity('Email has wrong format');
  }
}
