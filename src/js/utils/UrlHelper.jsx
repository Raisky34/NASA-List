import jQuery from "jquery";

/**
 * Read value from React Dom model by ref element
 *
 * @param element
 */
export function toUrlParams(params) {
    if(params == undefined){
        return "";
    }
    return "?" + jQuery.param(params)
}