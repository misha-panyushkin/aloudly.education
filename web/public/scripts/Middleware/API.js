import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import { CONFIG } from 'Configuration/Config'
// import auth from 'Middleware/Auth'

const API_ROOT = CONFIG.get('API_ROOT');

function FETCH_API (route, data) {

    const REQUEST_PARAMS = route.get('params').toJS();
    // REQUEST_PARAMS.headers.append('authorization', auth.getToken());

    const URL = new window.URL(API_ROOT.concat(route.get('path')));
    const SEARCH_PARAMS = _.reduce(route.get('search'), (result, value, key) => result.concat(key, '=', value), '');
    URL.search = SEARCH_PARAMS;

    return fetch(
        URL, 
        Object.assign(REQUEST_PARAMS, data ? {
            body: JSON.stringify(data)
        } : {})

    ).then(response => {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(json => ({ json, response }));

        } else {
            console.log('Not a JSON');
            return Promise.reject('Not a JSON');

        }

    }).then(({ json, response }) => {
        if (!response.ok) {
            return Promise.reject(json)
        }

        // if (response.token) {
        //     auth.setToken(response.token);
        // }

        return json;
    })
}

export const API_CALL = Symbol('API_Symbol');

export default store => next => action => {
    const API_CALL_DATA = action[API_CALL];
    if (typeof API_CALL_DATA === 'undefined') {
        return next(action);
    }

    const { 
        route,
        types,
        data
    } = API_CALL_DATA;

    if (!route) {
        throw new Error('Route parameter is undefined.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    function constructRequestParams (extra) {
        const fullParams = Object.assign({}, action, extra)
        delete fullParams[API_CALL]
        return fullParams
    }

    const [ requestType, successType, failureType ] = types
    next(constructRequestParams({ type: requestType }))

    return FETCH_API(route, data).then(
        response => next(constructRequestParams({
            response,
            type: successType
        })),
        error => next(constructRequestParams({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    )
};