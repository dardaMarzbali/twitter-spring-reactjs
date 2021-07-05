import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {UsersSearchActionsType} from "./contracts/actionTypes";
import {User} from "../user/contracts/state";
import {UserApi} from "../../../services/api/userApi";
import {setUsersSearch, setUsersSearchLoadingState} from "./actionCreators";

export function* fetchUsersSearchRequest() {
    try {
        yield put(setUsersSearchLoadingState(LoadingStatus.LOADING));
        const item: User[] = yield call(UserApi.getUsers);
        yield put(setUsersSearch(item));
    } catch (error) {
        yield put(setUsersSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* usersSearchSaga() {
    yield takeLatest(UsersSearchActionsType.FETCH_USERS, fetchUsersSearchRequest);
}