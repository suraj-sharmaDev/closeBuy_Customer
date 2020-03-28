import { ADD_TO_CACHE_FROM_SEARCH, ADD_TO_CACHE_FROM_API } from '../actions/types';

// const initialState = {
// 	shopId : 2,
// 	categories: [
// 		{
// 			categoryId : 1,
// 			subCategories : [
// 				{
// 					subCategoryId : 1,
// 					subCategoryChild : [
// 						{
// 							subCategoryChildId : 1,
// 							products : [
// 								{
// 									productId : 1,
// 									productName : 'Tea Leaves'
// 								},
// 								{
// 									productId : 2,
// 									productName : 'Tea Powder'
// 								},
// 								{
// 									productId : 3,
// 									productName : 'Instant Tea'
// 								}																
// 							]
// 						}
// 					]
// 				}
// 			]
// 		}
// 	],
// };

const initialState = {
	shopId : 0,
	categories: [],
};


const createNewArray = (array, data) => {
	let newState = array;
	for (category of data.category) {
		let subCategoryIndex = 0;
		pushData = {
			categoryId: category.mainCategoryId,
			subCategories: [
				{
					subCategoryId: category.categoryId,
					subCategoryChild: [
						{
							subCategoryChildId: category.subCategoryChildId,
							products: [],
						},
					],
				},
			],
		};
		for (product of category.data) {
			pushData.subCategories[subCategoryIndex].subCategoryChild[0].products.push(
				product,
			);
		}
		if(Array.isArray(newState)){
			newState.push(pushData);
		}else{
			return pushData;
		}
	}
	return newState;
}
const pushToArray = (array, data) => {

}
const onAddToCacheFromSearch = (state, data) => {
	let newState = {...state};
	if(newState.shopId==0 || newState.shopId!=data.shopId){
		//When app initialized for first time
		//product from different shop
		newState.shopId = data.shopId;
		newState.categories = createNewArray([], data);
	}
	else if(newState.shopId == data.shopId){
		//if the cache already contains data from given shop
		for(category of data.category)
		{
			const categoryIndex = newState.categories.findIndex(item => item.categoryId === category.mainCategoryId);
			if(categoryIndex > -1)
			{
		  		//if categoryId also exists
		  		//find if subCategoryId exists or not
				const subCategoryIndex = newState.categories[categoryIndex].subCategories.findIndex(item => item.subCategoryId === category.categoryId);
				if(subCategoryIndex>-1){
					//check if subCategoryChildId exists
					const subCategoryChildIndex = newState.categories[categoryIndex]
														  .subCategories
														  [subCategoryIndex]
														  .subCategoryChild
														  .findIndex(item => item.subCategoryChildId === category.subCategoryChildId);
					if(subCategoryChildIndex > -1){
						for(product of category.data){
							newState.categories[categoryIndex].subCategories[subCategoryIndex].subCategoryChild[subCategoryChildIndex].push(product);
						}
					}else{
						//else create a new subCategoryChild and insert into newState
						const pushData = {
							subCategoryChildId : category.subCategoryChildId,
							products : []
						}
						for(product of category.data){
							pushData.products.push(product);
						}
						newState.categories[categoryIndex].subCategories[subCategoryIndex].subCategoryChild.push(pushData);	
					}
				}else{
					//if subCategory doesn't exist create one and push into newState
					const pushData = {
						subCategoryId : category.categoryId,
						subCategoryChild : [
							{
								subCategoryChildId : category.subCategoryChildId,
								products : []
							}
						],
					}
					for(product of category.data){
						pushData.subCategoryChild[0].products.push(product);
					}
					newState.categories[categoryIndex].subCategories.push(pushData);						
				}
			}
			else
			{
				//if category doesn't exist
				//create a new category and push to newState
				pushData = createNewArray({}, data);
				newState.categories.push(pushData);
			}
		}
	}
	return newState;
}

const shopReducer = (state = initialState, action) => {
  switch(action.type) {
  	case ADD_TO_CACHE_FROM_SEARCH : 
  		return onAddToCacheFromSearch(state, action.payload);
    default:
      return state;
  }
}

export default shopReducer;