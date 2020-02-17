import React from 'react';
import { Dimensions } from 'react-native';
import SearchIcon from "react-native-vector-icons/Feather";
import CloseIcon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import styled from 'styled-components';
import Entypo from "react-native-vector-icons/Entypo";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const {height, width}=Dimensions.get('window');

const Container = styled.View`
	width : ${width};
	padding : 10px 10px;
	background-color : white;
`;
const Header = styled.View`
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
	background-color : white;
`; 
const Text = styled.Text``;
const Button = styled.TouchableOpacity``;
const SearchBarContainer = styled.View`
  flex-direction : row;
  align-items : center;
  justify-content : center;
  padding : 0px 10px;
  height : 40px;
  border-radius : 12px;
  background-color : ${Color.searchBarColor};
`;
const Input = styled.TextInput`
	width : ${width*0.5};
`;
const SearchOutputItem = styled.TouchableOpacity`
	padding : 20px 10px;
`;
const SearchOutput = ({data, onSearchItemPress}) => {
	let Body = (
		<SearchOutputItem onPress={()=>onSearchItemPress(data.sectionIndex, data.itemIndex)}>
			<Text>{data.itemName}</Text>
		</SearchOutputItem>
	);
	return Body;
}
const ModalHeader = props => {
	let timeOut = 0;
	onChangeHandler = (text) => {
		props.updateSearchTerm(text);
		if(timeOut) clearTimeout(timeOut);
		if(text.length===0){
			props.doSearch('cleanSlateMode');
		}
		if(text.length>3)
		{
			props.doSearch(text.toLowerCase());
		}
	}
	let header = (
		<Header>
		  <Button onPress={props.updateActive}>
			  <Entypo name="chevron-left" size={30} color={Color.greenColor}/>
		  </Button>
	      <SearchBarContainer>
	        <SearchIcon name="search" size={22} color={Color.darkGreyColor} />      
	        <Input placeholder="Search for grocery, food, shop..."
	        	   value={props.searchTerm} 
	               underlineColorAndroid="transparent"
	               autoFocus={true}
	               onChangeText={(e)=>onChangeHandler(e)}
	        />
	      </SearchBarContainer>
		</Header>
	);
	return header;
}
const SearchInShop = ({data, scroll, ...props}) => {
	let contentBody = [];
	const [searchTerm, updateSearchTerm] = React.useState('');
	const [modalBody, updateModalBody] = React.useState([]);
	React.useEffect(()=>{
		// updateSearchTerm('');
		updateModalBody([]);
	},[props.active])
	const handleBackPress = () => {
		if(searchTerm!=""){
			updateModalBody([]);
			updateSearchTerm('');
			return true;
		}
		else if(props.active){
			props.updateActive();
			return true;
		}
	}	
	const doSearch = text => {
		if(text==='cleanSlateMode'){
			updateModalBody([]);
		}else{
			for(i=0,maxI=data.length;i<maxI;i++){
				for(j=0,maxJ=data[i].children.length;j<maxJ;j++){
					itemName = data[i].children[j].itemName.toLowerCase();
					if(itemName.indexOf(text)!=-1){
						contentBody.push(
							<SearchOutput 
								key={data[i].children[j].id} 
								data={data[i].children[j]} 
								onSearchItemPress={onSearchItemPress}
						/>); 
					}
				}
			}
		}
		if(contentBody.length>0){
			updateModalBody(contentBody);
		}
	}
	const onSearchItemPress = (sectionIndex, itemIndex) =>{
		props.updateActive();
		scroll(sectionIndex, itemIndex);
	}
	let content=(
		<React.Fragment>
			<Modal
			isVisible={props.active}
			onBackButtonPress={handleBackPress}	
			onBackdropPress={props.updateActive}
			animationIn={'slideInRight'}
			animationOut={'slideOutRight'}
			animationOutTiming={10}
			deviceWidth={width}
			deviceHeight={height}
			backdropColor={'white'}
			backdropOpacity={0.3}
			style={{ justifyContent:'flex-start', margin:0, padding:0}}>
				<Container>
					<ModalHeader 
						updateActive={props.updateActive} 
						searchTerm={searchTerm} 
						updateSearchTerm={updateSearchTerm} 
						doSearch={doSearch}
					/>
					{
						modalBody.length>0
						?
						modalBody
						:
						null
					}
				</Container>
			</Modal>
		</React.Fragment>
	);
	return content;
}

export default SearchInShop;