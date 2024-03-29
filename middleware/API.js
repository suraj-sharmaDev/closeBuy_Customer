import { ReverseGeocode, PlacesAutoComplete, PlaceDetailsById, GeoNameApi, LoginApi, GenerateOtpApi, VerificationApi, UpdateUsernameApi, InitializeApi, 
	     UpdateTokenApi, AddAddressApi, RetrieveAddressApi, DeleteAddressApi, GetAllShopsApi, ShopInformationApi, ShopStocksBySubCategoryApi,
	     ShopBasicInformationApi, GetCategoriesApi, SearchInShopApi, SearchAutosuggestApi, SearchApi, SearchWithSubCategoryApi, AddCartApi, 
	     RetrieveCartApi, GetOrderDetailsApi, InsertOrderApi, CompleteOrderApi, GetCouponApi, ActivateCouponApi, UpdateCustomerInfoApi } from "../constants/Urls";

import API_KEY from "../constants/Api";

export const GeoName = async(latitude, longitude) => {
	const url = `${GeoNameApi}&lat=${latitude}&lng=${longitude}`;
	const response = await fetch(url);
	return response.text();
}

export const Login = async (data) => {
	const response = await fetch(LoginApi,{
		method : 'POST',
    	body : data		
	});
	const result = await response.json();
	return result;
}
export const GenerateOtp = async(customerId) => {
	const url = `${GenerateOtpApi}?customerId=${customerId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const Verify = async (data) => {
	const response = await fetch(VerificationApi,{
		method : 'POST',
    	body : data		
	});
	const result = await response.json();
	return result;	
}
export const UpdateUsername = async (data) => {
	const response = await fetch(UpdateUsernameApi,{
		method : 'POST',
    	body : data		
	});
	const result = await response.json();
	return result;
}
export const Initialize = async(customerId) => {
	const url = `${InitializeApi}?customerId=${customerId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const UpdateToken = async(data) => {
	const response = await fetch(UpdateTokenApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;	
}

export const AddAddress = async(data) => {
	const response = await fetch(AddAddressApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;
}

export const RetrieveAddress = async(customerId) => {
	const url = `${RetrieveAddressApi}?customerId=${customerId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const DeleteAddress = async(data) => {
	const response = await fetch(DeleteAddressApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;
}

export const GetAllShops = async(coordinates) => {
	const url = `${GetAllShopsApi}?coordinates=${coordinates}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const ShopInformation = async(shopId) => {
	const url = `${ShopInformationApi}?shopId=${shopId}&appVer=2`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const ShopStocksBySubCategory = async(shopId, subCategoryId) => {
	const url = `${ShopStocksBySubCategoryApi}?shopId=${shopId}&subCategoryId=${subCategoryId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const ShopBasicInformation = async(shopId) => {
	const url = `${ShopBasicInformationApi}?shopId=${shopId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const GetCategories = async() => {
	const response = await fetch(GetCategoriesApi);
	const result = await response.json();
	return result;
}
export const SearchInShope = async(shopId, search) => {
	const url = `${SearchInShopApi}?shopId=${shopId}&search=${search}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const SearchAutosuggest = async(searchTerm) => {
	const url = `${SearchAutosuggestApi}?search=${searchTerm}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const Search = async(searchTerm, coordinates) => {
	const url = `${SearchApi}?search=${searchTerm}&coordinates=${coordinates}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const SearchWithSubCategory = async(subCategoryId, coordinates) => {
	const url = `${SearchWithSubCategoryApi}?subCategoryId=${subCategoryId}&coordinates=${coordinates}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const AddCart = async(data) => {
	const response = await fetch(AddCartApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;	
}
export const ActivateCoupon = async(data) => {
	const response = await fetch(ActivateCouponApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;		
}
export const PlaceOrder = async(data) => {
	const response = await fetch(InsertOrderApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;
}
export const CompleteOrder = async(data) => {
	//Incase self_pickup
	const response = await fetch(CompleteOrderApi,{
		method : 'POST',
		body : data
	});
	const result = await response.json();
	return result;
}
export const GetOrderDetails = async(orderId) => {
	let url = `${GetOrderDetailsApi}?orderId=${orderId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const UpdateCustomerInfo = async(data) => {
	const response = await fetch(UpdateCustomerInfoApi, {
		method : 'POST',
		body : data
	})
	const result = await response.json();
	return result;
}
//Fetch when user searches for places
export const PlacesAutoFetch = async(searchTerm) => {
	let url = `${PlacesAutoComplete}?input=${searchTerm}&components=country:in&key=${API_KEY}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}
export const PlaceDetails = async(placeId) => {
	//function to get place details from placeId
	let url = `${PlaceDetailsById}?place_id=${placeId}&fields=geometry&key=${API_KEY}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}
export const ReverseLookup = async (region) => {
	//function to get place name from lat and long
	let formattedAddress = {'title':'', 'street':''};
    const url = `${ReverseGeocode}?latlng=${region.latitude},${region.longitude}&key=${API_KEY}`;
   	const response = await fetch(url);
    const result = await response.json();
    formattedAddress.title = result.results[0].address_components[1].long_name;
    formattedAddress.street = result.results[0].address_components[0].long_name;
    return formattedAddress;
  }