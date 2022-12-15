package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
import org.springframework.beans.factory.annotation.Value;

public interface TopicByCategoryProjection {
    Long getId();
    String getTopicName();
    TopicCategory getTopicCategory();

    @Value("#{@topicServiceImpl.isTopicFollowed(target.id)}")
    boolean getIsTopicFollowed();

    @Value("#{@topicServiceImpl.isTopicNotInterested(target.id)}")
    boolean getIsTopicNotInterested();
}
