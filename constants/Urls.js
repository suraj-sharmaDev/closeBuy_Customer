const serverUrl = `https://www.adastratech.in`;

export const ReverseGeocode = `https://maps.googleapis.com/maps/api/geocode/json`;
export const PlacesAutoComplete = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
export const PlaceDetailsById = `https://maps.googleapis.com/maps/api/place/details/json`;

export const LoginApi = `${serverUrl}/customer/loginApi/signin`;
export const GenerateOtpApi = `${serverUrl}/customer/loginApi/otpGenerator`;
export const VerificationApi = `${serverUrl}/customer/loginApi/verification`;
export const UpdateUsernameApi = `${serverUrl}/customer/loginApi/updateCustomerName`;

export const InitializeApi =`${serverUrl}/customer/initializationApi/initialize`;

export const UpdateTokenApi = `${serverUrl}/customer/tokenApi/updateToken`;

export const AddAddressApi = `${serverUrl}/customer/addressApi/addAddress`;
export const RetrieveAddressApi = `${serverUrl}/customer/addressApi/retrieveAddress`;
export const DeleteAddressApi = `${serverUrl}/customer/addressApi/deleteAddress`;

export const GetAllShopsApi = `${serverUrl}/customer/shopApi/getAllShopsWithinLimit`;
export const ShopInformationApi = `${serverUrl}/customer/shopApi/shopInformation`;
export const ShopStocksBySubCategoryApi = `${serverUrl}/customer/shopApi/shopStocksBySubCategory`;
export const ShopBasicInformationApi = `${serverUrl}/customer/shopApi/shopBasicInformation`;
export const GetCategoriesApi = `${serverUrl}/customer/categoryApi/getCategories`;
export const SearchInShopApi = `${serverUrl}/customer/shopApi/searchInShop`;

export const SearchAutosuggestApi = `${serverUrl}/customer/shopApi/searchAutoSuggest`;
export const SearchApi = `${serverUrl}/customer/shopApi/searchResult`;
export const SearchWithSubCategoryApi = `${serverUrl}/customer/shopApi/searchWithSubCategoryId`;

export const AddCartApi = `${serverUrl}/customer/cartApi/addCart`;
export const RetrieveCartApi = `${serverUrl}/customer/cartApi/retrieveCart`;

export const GetOrderDetailsApi = `${serverUrl}/customer/orderApi/getOrderDetails`;
export const InsertOrderApi =`${serverUrl}/customer/orderApi/insertOrder`;
export const CompleteOrderApi =`${serverUrl}/customer/orderApi/completeOrder`;

export const GetCouponApi = `${serverUrl}/customer/couponApi/getCoupon`;
export const ActivateCouponApi = `${serverUrl}/customer/couponApi/activateCoupon`;
export const UpdateCustomerInfoApi = `${serverUrl}/customer/customerApi/updateCustomerInfo`;

export const GeoNameApi = 'http://api.geonames.org/countryCode?username=crypt4bits'