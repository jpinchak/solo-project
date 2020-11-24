import * as types from '../constants/actionTypes';

export const itemFetchError = (hasError) => ({
  type: types.ITEM_FETCH_ERROR,
  payload: hasError
});

export const itemsAreLoading = (areLoading) => ({
  type: types.ITEMS_ARE_LOADING,
  payload: areLoading
});

export const itemFetchSuccess = (itemList) => ({
  type: types.ITEM_FETCH_SUCCESS,
  payload: itemList
});

export const fetchItems = (url) => {
  console.log('in the action');
  return (dispatch) => {
    dispatch(itemsAreLoading(true));

    fetch(url)
      .then(response => {
        if(response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(itemsAreLoading(false));
        return response;
      })
      .then((res) => res.json())
      .then((items) => {
        console.log('in fetch action');
        console.log(items);
        dispatch(itemFetchSuccess(items))
      })
      .catch(() => dispatch(itemFetchError(true)));  
  };
};