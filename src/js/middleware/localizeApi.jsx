import "isomorphic-fetch";

export function callApi(locale) {
    const fullUrl = process.env.LOCALIZATION_ROOT.format(locale);

    return fetch(fullUrl)
        .then(response => response.text().then(text =>({text, response})))
        .then(({text, response}) => {
            if (!response.ok) {
                return Promise.reject(text)
            }
            return text;
        })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_LOCALIZE_API = Symbol('Call Localize API')

export default store => next => action => {
    const callAPI = action[CALL_LOCALIZE_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {locale, types} = callAPI;
    if (!locale || typeof locale !== 'string') {
        throw new Error('Specify a string endpoint URL!')
    }

    if (!Array.isArray(types) || types.length !== 2) {
        throw new Error('Expected an array of two action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_LOCALIZE_API]
        return finalAction
    }

    const [ successType, failureType ] = types
    //Action on request sent

    return callApi(locale).then(
        response => {
            next(actionWith({
                response,
                type: successType
            }))
        },
        (error) => {
            next(actionWith({
                type: failureType,
                error: error.message || 'Something bad happened'
            }))
        }
    )
}