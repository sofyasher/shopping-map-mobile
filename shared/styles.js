import { StyleSheet } from 'react-native';

export const darkColor = '#9d8189';
export const dangerColor = '#f4acb7';
const secondaryColor = '#ffcad4';
export const errorColor = '#d90368';
export const primaryColor = '#efd3d7';
export const cardBg = '#ffe3dc';
const lightColor = '#ffe5d9';
export const bodyBg = '#f8edeb';
export const warningColor = '#c8c0d3';
const infoColor = '#dee2ff';
export const successColor = '#d8e2dc';
export const darker425 = 'rgba(0, 0, 0, .425)';
export const statusBarColor = darkColor;
export const borderColor = '#c8c8c8';

export default StyleSheet.create({
  body: {
    backgroundColor: cardBg,
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: darkColor,
    padding: 25,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,.05)',
  },
  itemText: {
    color: darker425,
    fontSize: 15,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: dangerColor,
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  icon: {
    color: darker425,
  },
  iconTabBar: {
    color: '#fff',
  },
  button: {
    height: 50,
    alignItems: 'center',
    margin: 10,
    padding: 15,
    backgroundColor: primaryColor,
    color: darker425,
    borderColor: 'rgba(0, 0, 0, .125)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: '700',
    color: darker425,
  },
  input: {
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ced4da',
    backgroundColor: bodyBg,
    margin: 10,
    color: '#495057',
    padding: 10,
  },
});
