import {camelizeKeys} from "humps";
import "isomorphic-fetch";

const EMPTY_BODY_STATUS = 204;

export function callApi(method, endpoint, headers, body, noJSON, blobResponse) {
    const api = process.env.API_URL;

    const fullUrl = (endpoint.indexOf(api) === -1) ? api + endpoint : endpoint
    const requestMethod = method ? method : 'POST';

    const request = new Request(fullUrl, {
        method: requestMethod,
        headers: headers,
        body: noJSON ? body : JSON.stringify(body)
    });
    if(blobResponse){
        return fetch(request)
            .then((response)=> {
                return response.blob().then(blob => ({blob, response}))
            })
            .then(({blob, response}) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return blob
            })
    } else {
        return fetch(request)
            .then(response => {
              if (response.status === EMPTY_BODY_STATUS) {
                return ({json: {}, response});
              } else {
                return response.json().then(json => {
                  return ({json, response})
                });
              }
            })
            .then(({json, response}) => {
                if (!response.ok) {
                    return Promise.reject(json)
                }
                return Object.assign({}, camelizeKeys(json))
            })
    }
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { method, handlers, noJSON } = callAPI;

    if (!method) {
        method = 'POST'
    }
    if (handlers == undefined) {
        handlers = {};
    }
    handlers = Object.assign({ 500: 'Server temporary unavailable. Please try again later.'}, handlers);//set default error codes
    const { endpoint, headers, body, types, listName, blobResponse } = callAPI;

    //Test functions
    const {onComplete, onSuccess, onFailed} = callAPI;

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL!')
    }
    if (!headers) {
        throw new Error('At least one header required!')
    }
    if (method == 'POST') {
        if (!body) {
            throw new Error('Specify body!')
        }
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    }

    const [ requestType, successType, failureType ] = types
    //Action on request sent
    next(actionWith({type: requestType}))

    return callApi(method, endpoint, headers, body, noJSON, blobResponse).then(
        response => {
            if (typeof onSuccess == 'function') {
                onSuccess(response);
            }
            if (typeof onComplete == 'function') {
                onComplete(response);
            }
            next(actionWith({
                response,
                type: successType,
                listName
            }))
        },
        (error) => {
            if (typeof onFailed == 'function') {
                onFailed(error);
            }
            if (typeof onComplete == 'function') {
                onComplete();
            }
            if (error instanceof TypeError) {
                error = {status: 500}
            }
            next(actionWith({
                type: failureType,
                payload: error,
                error: handlers[error.status] || error.message || 'Something bad happened',
                listName
            }))
        }
    )
}
