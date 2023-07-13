import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Text color
  textPrimary: {
    color: '#1a237e',  
  },
  textSecondary: {
    color: '#757575', 
  },
  text1:{
      fontSize:18
  },
  text2:{
    fontSize:14
  },
  textBold: {
    fontWeight: 'bold',
   
    color: 'white',
  },
  textBlack: {
    fontWeight: 'bold',
  
    color: 'black',
  },
  button:{
     borderRadius:10,
     padding:7
  },
  // Flex styles
  container: {
    
    justifyContent: 'center' ,
    alignItems: 'center',
   
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
});

export default styles;
