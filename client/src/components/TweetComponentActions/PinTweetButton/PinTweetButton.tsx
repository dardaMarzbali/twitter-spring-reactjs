import React, {FC, memo, ReactElement, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ListItem, Typography} from "@material-ui/core";

import {TweetResponse} from "../../../store/types/tweet";
import TweetComponentActionsModal from "../TweetComponentActionsModal/TweetComponentActionsModal";
import {selectUserPinnedTweetId} from "../../../store/ducks/user/selectors";
import {fetchPinTweet} from "../../../store/ducks/user/actionCreators";
import {useSnackbar} from "../../../hook/useSnackbar";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";
import {PinIcon} from "../../../icons";

interface PinTweetButtonProps {
    tweetId: number;
    onCloseActionsDropdown: () => void;
}

const PinTweetButton: FC<PinTweetButtonProps> = memo(({tweetId, onCloseActionsDropdown}): ReactElement => {
    const dispatch = useDispatch();
    const pinnedTweetId = useSelector(selectUserPinnedTweetId);
    const {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar} = useSnackbar();
    const [visibleTweetPinModal, setVisibleTweetPinModal] = useState<boolean>(false);
    const isTweetPinned = pinnedTweetId === tweetId;

    const onPinUserTweet = (): void => {
        if (isTweetPinned) {
            dispatch(fetchPinTweet(tweetId));
            setSnackBarMessage("Your Tweet was unpinned from your profile");
        } else {
            dispatch(fetchPinTweet(tweetId));
            setSnackBarMessage("Your Tweet was pinned to your profile.");
        }
        setOpenSnackBar(true);
        setVisibleTweetPinModal(false);
        onCloseActionsDropdown();
    };

    const onOpenTweetComponentActionsModal = (): void => {
        setVisibleTweetPinModal(true);
    };

    const onCloseTweetComponentActionsModal = (): void => {
        setVisibleTweetPinModal(false);
    };

    return (
        <>
            <ListItem id={"pin"} onClick={onOpenTweetComponentActionsModal}>
                <>{PinIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    {(isTweetPinned) ? (
                        "Unpin from profile"
                    ) : (
                        "Pin to your profile"
                    )}
                </Typography>
            </ListItem>
            <TweetComponentActionsModal
                modalTitle={"Pin"}
                isTweetPinned={isTweetPinned}
                visibleTweetComponentActionsModal={visibleTweetPinModal}
                onCloseTweetComponentActionsModal={onCloseTweetComponentActionsModal}
                onClick={onPinUserTweet}
            />
            <ActionSnackbar
                snackBarMessage={snackBarMessage}
                openSnackBar={openSnackBar}
                onCloseSnackBar={onCloseSnackBar}
            />
        </>
    );
});

export default PinTweetButton;