import React, { useContext, useEffect, useState } from 'react';
import { FILES_URL, get } from '../../shared/api';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../shared/styles';
import { ProfileScreenStyles } from './profile.screen.styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ShoppingMapStatusBarComponent from '../../components/shopping-map-status-bar.component';
import { AuthContext } from '../../shared/store/auth/auth-context';
import { useNetInfo } from '@react-native-community/netinfo';
import { AUTHENTICATED_USER_ENDPOINT } from '../../shared/endpoints';
import {
  PROFILE_KEY,
  retrieveFromLocalStorage,
  saveToLocalStorage,
} from '../../shared/local-storage';
import { logOut } from '../../shared/store/auth/auth-effects';

const ProfileScreen = () => {
  const DEFAULT_PICTURE_SRC = '../../assets/profile-cat.png';
  const { dispatch } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const netInfo = useNetInfo();
  useEffect(() => {
    if (netInfo.isConnected) {
      getProfile(setProfile);
    } else {
      getProfileFromStorage(setProfile);
    }
  }, [netInfo]);

  return (
    <View style={styles.body}>
      <ShoppingMapStatusBarComponent />
      {profile ? (
        <>
          {profile?.photo && netInfo.isConnected ? (
            <Image
              source={{ uri: `${FILES_URL}${profile?.photo}` }}
              style={ProfileScreenStyles.picture}
            />
          ) : (
            <Image
              source={require(DEFAULT_PICTURE_SRC)}
              style={ProfileScreenStyles.picture}
            />
          )}
          <Text style={ProfileScreenStyles.name}>{profile?.name}</Text>
        </>
      ) : (
        <></>
      )}
      {netInfo.isConnected ? (
        <TouchableOpacity
          style={ProfileScreenStyles.logOutContainer}
          onPress={() => logOut(dispatch)}>
          <FontAwesomeIcon icon={['fas', 'sign-out-alt']} style={styles.icon} />
          <Text>Log out</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

const getProfile = (setProfile) => {
  get(AUTHENTICATED_USER_ENDPOINT)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to get profile');
      }
    })
    .then((result) => {
      saveProfileToStorage(result);
      setProfile(result);
    })
    .catch(console.log);
};

const getProfileFromStorage = (setProfile) => {
  retrieveFromLocalStorage(PROFILE_KEY, setProfile);
};

const saveProfileToStorage = (profile) => {
  saveToLocalStorage(PROFILE_KEY, profile);
};

export default ProfileScreen;
