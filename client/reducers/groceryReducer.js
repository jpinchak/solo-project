import * as types from  '../constants/actionTypes';

const initialState = {
  itemList: [],
  newItem: {
    itemName: '',
    quantity: 0,
    uniqueId: '',
  },
  loadingItems: false,
  erroredItems: false
}

const itemReducer = (state = initialState, action) => {
  let loadingItems;
  let erroredItems;
  let itemList;

  switch(action.type) {
    case types.ITEM_FETCH_ERROR:
      erroredItems = action.payload;
      return {
        ...state,
        erroredItems
      }

    case types.ITEMS_ARE_LOADING:
      loadingItems = action.payload;
      return {
        ...state,
        loadingItems
      }

    case types.ITEM_FETCH_SUCCESS:
      itemList = action.payload;
      return {
        ...state,
        itemList
      }
    default:
      return state;
  }
}

export default itemReducer;