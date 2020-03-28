import { RETRIEVE_CART, INC_ITEM, DEC_ITEM, DISCOUNT, TRACK_START, STATUS_UPDATE, TRACK_END, UPDATE_TRACK_COORDINATE } from './types';

export const retrieveCart = data => {
  return {
    type: RETRIEVE_CART,
    payload: data
  }  
}
export const incItem = data => {
  return {
    type: INC_ITEM,
    payload: data
  }
}

export const decItem = itemID => {
  return {
    type: DEC_ITEM,
    payload: itemID
  }
}
export const couponApplied = discountAmount => {
  return {
    type: DISCOUNT,
    payload: discountAmount
  }  
}
export const trackStart = (data) => {
	return {
		type : TRACK_START,
    payload : data
	}
}
export const statusUpdate = (data) => {
  return {
    type : STATUS_UPDATE,
    payload : data
  }
}
export const trackEnd = () => {
	return {
		type : TRACK_END
	}
}

export const updateTrackCoordinate = (data) => {
  return {
    type : UPDATE_TRACK_COORDINATE,
    payload : data
  }
}