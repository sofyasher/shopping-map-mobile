import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import styles, {
  dangerColor,
  primaryColor,
  successColor,
  warningColor,
} from '../../shared/styles';
import { ShoppingMapDetailScreenStyles } from './shopping-map-detail.screen.styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { getIconClassArray } from '../../shared/utils';
import { ShoppingMap } from '../../shared/shopping-map';
import { Stand } from '../../shared/stand';
import ShoppingMapStatusBarComponent from '../../components/shopping-map-status-bar.component';
import { retrieveMapDetailFromLocalStorage } from '../../shared/local-storage';

let mapDetail = new ShoppingMap();

const ShoppingMapDetailScreen = ({ navigation, route }) => {
  const { mapId } = route.params;
  const [map, setMap] = useState(null);
  useEffect(() => {
    getMapDetail(mapId, setMap);
  }, [mapId]);
  return (
    <View style={styles.body}>
      <ShoppingMapStatusBarComponent />
      {map ? (
        <View>
          <Text style={ShoppingMapDetailScreenStyles.title}>{map.name}</Text>
          {generateGrid()}
        </View>
      ) : (
        <Text>no data</Text>
      )}
    </View>
  );
};

const generateGrid = () => {
  let grid = [];
  let gridLine = [];
  for (let i = 0; i < mapDetail.height; i++) {
    gridLine = [];
    const width = Dimensions.get('window').width / mapDetail.width;
    for (let j = 0; j < mapDetail.width; j++) {
      gridLine.push(
        <View
          style={[ShoppingMapDetailScreenStyles.gridCol, { width: width }]}
          key={'col-' + i + '-' + j}>
          {mapDetail.stands[i][j]?.direction !== 0 && (
            <View
              style={[
                ShoppingMapDetailScreenStyles.stand,
                getStandStyle(mapDetail.stands[i][j].direction),
              ]}>
              {mapDetail.stands[i][j].categoryIcon !== null ? (
                <FontAwesomeIcon
                  icon={getIconClassArray(mapDetail.stands[i][j].categoryIcon)}
                  style={ShoppingMapDetailScreenStyles.icon}
                />
              ) : (
                <FontAwesomeIcon
                  icon={getIconClassArray(null)}
                  style={ShoppingMapDetailScreenStyles.icon}
                />
              )}
            </View>
          )}
        </View>,
      );
    }
    gridLine = (
      <View key={'row-' + i} style={ShoppingMapDetailScreenStyles.gridRow}>
        {gridLine}
      </View>
    );
    grid.push(gridLine);
  }
  grid = <View style={ShoppingMapDetailScreenStyles.grid}>{grid}</View>;
  return grid;
};

const getMapDetail = (mapId, setMap) => {
  retrieveMapDetailFromLocalStorage(mapId)
    .then((result) => {
      parseMapData(result);
      setMap(result);
    })
    .catch(console.log);
};

const parseMapData = (data) => {
  mapDetail.name = data.name;
  mapDetail.width = parseInt(data.width);
  mapDetail.height = parseInt(data.height);

  mapDetail.stands = new Array(mapDetail.height);
  for (let i = 0; i < mapDetail.height; i++) {
    mapDetail.stands[i] = new Array(mapDetail.width);
  }

  data.stands.forEach((stand) => {
    const i = stand.row;
    const j = stand.col;
    const direction = stand.direction;
    const categoryId = stand.categoryId;
    const categoryIcon = stand.categoryIcon;
    mapDetail.stands[i][j] = new Stand(
      i,
      j,
      parseInt(direction),
      categoryId === null ? null : parseInt(categoryId),
      categoryIcon,
    );
  });
};

const getStandStyle = (standDirection) => {
  switch (standDirection) {
    case 1:
      return {
        width: '100%',
        height: '50%',
        top: 0,
        backgroundColor: warningColor,
      };
    case 2:
      return {
        width: '50%',
        height: '100%',
        top: 0,
        right: 0,
        backgroundColor: dangerColor,
      };
    case 3:
      return {
        width: '100%',
        height: '50%',
        bottom: 0,
        backgroundColor: primaryColor,
      };
    case 4:
      return {
        width: '50%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: successColor,
      };
  }
};

export default ShoppingMapDetailScreen;
