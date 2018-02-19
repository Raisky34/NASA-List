/**
 * loads file to server and return link
 *
 */
import { callApi } from '../middleware/api';
import { getMerchantToken } from '../actions/auth';

export function loadFile(file, name, url, formDataProp) {
  const formData = new FormData();
  if (file) formData.append('file', file, name);

  return callApi( 'POST', url || '/files/upload', {"Auth-Token": getMerchantToken()}, formDataProp || formData, true, true );
}
