package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.UserSettingsRepository;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;
import com.gmail.merikbest2015.security.JwtProvider;
import com.gmail.merikbest2015.service.impl.UserSettingsServiceImpl;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.EMAIL_HAS_ALREADY_BEEN_TAKEN;
import static com.gmail.merikbest2015.constants.ErrorMessage.INCORRECT_USERNAME_LENGTH;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class UserSettingsServiceImplTest extends AbstractAuthTest {

    @Autowired
    private UserSettingsServiceImpl userSettingsService;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private UserSettingsRepository userSettingsRepository;

    @MockBean
    private JwtProvider jwtProvider;

    @Test
    public void updateUsername_ShouldReturnUpdatedUsername() {
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
        assertEquals(TestConstants.USERNAME, userSettingsService.updateUsername(TestConstants.USERNAME));
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(userSettingsRepository, times(1)).updateUsername(TestConstants.USERNAME, TestConstants.USER_ID);
    }

    @Test
    public void updateUsername_ShouldThrowUsernameLengthException() {
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userSettingsService.updateUsername(""));
        assertEquals(INCORRECT_USERNAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void updateEmail_ShouldReturnUpdatedUser() {
        AuthUserProjection authUserProjection = UserServiceTestHelper.createAuthUserProjection();
        when(userSettingsRepository.isEmailExist(TestConstants.USER_EMAIL)).thenReturn(true);
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
        when(jwtProvider.createToken(TestConstants.USER_EMAIL, "USER")).thenReturn(TestConstants.AUTH_TOKEN);
        when(userRepository.getUserById(TestConstants.USER_ID, AuthUserProjection.class)).thenReturn(Optional.of(authUserProjection));
        assertEquals(Map.of("user", authUserProjection, "token", TestConstants.AUTH_TOKEN),
                userSettingsService.updateEmail(TestConstants.USER_EMAIL));
        verify(userSettingsRepository, times(1)).isEmailExist(TestConstants.USER_EMAIL);
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(userSettingsRepository, times(1)).updateEmail(TestConstants.USER_EMAIL, TestConstants.USER_ID);
        verify(jwtProvider, times(1)).createToken(TestConstants.USER_EMAIL, "USER");
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID, AuthUserProjection.class);
    }

    @Test
    public void updateEmail_ShouldThrowEmailException() {
        when(userSettingsRepository.isEmailExist(TestConstants.USER_EMAIL)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userSettingsService.updateEmail(TestConstants.USER_EMAIL));
        assertEquals(EMAIL_HAS_ALREADY_BEEN_TAKEN, exception.getMessage());
        assertEquals(HttpStatus.FORBIDDEN, exception.getStatus());
    }
}