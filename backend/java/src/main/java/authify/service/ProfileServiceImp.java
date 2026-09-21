package authify.service;

import authify.entity.UserEntity;
import authify.io.ProfileRequest;
import authify.io.ProfileResponse;
import authify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class ProfileServiceImp implements ProfileService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Override
    public void sendOtp(String email) {
        UserEntity existingUser = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        //already verified
        if (existingUser.getIsAccountVerified()) return;

        String otp = String.valueOf(ThreadLocalRandom.current().nextInt(10_00_00, 10_00_000));

        // 24 hrs
        long expieryTime = System.currentTimeMillis() + (24 * 60 * 60 * 1_000);


        existingUser.setVerifyOtp(otp);
        existingUser.setVerifyOtpExpireAt(expieryTime);

        userRepository.save(existingUser);

        try {
            emailService.sendVerifyOtp(email, otp);
        } catch (Exception e) {
            throw new RuntimeException("Unable to send verifying otp mail");
        }
    }

    @Override
    public void verifyOtp(String email, String otp) {
        UserEntity existingUser = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        //1. invalid otp
        if (!existingUser.getVerifyOtp().equals(otp)) {
            throw new RuntimeException("Invalid Otp");
        }

        //2. expired otp
        if (existingUser.getVerifyOtpExpireAt() < System.currentTimeMillis()) {
            throw new RuntimeException("OTP Expired");
        }

        existingUser.setIsAccountVerified(true);
        existingUser.setVerifyOtp(null);
        existingUser.setVerifyOtpExpireAt(0L);
        userRepository.save(existingUser);

        try {
            emailService.sendAccountVerifySuccessMail(email, existingUser.getName());
        } catch (RuntimeException e) {
            throw new RuntimeException("Unable to send verify successful mail");
        }
    }

    @Override
    public String getLoggedInUserId(String email) {
        return (userRepository.findUserIdByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found: " + email)));
    }


    @Override
    public void resetPassword(String email, String otp, String newPassword) {
        UserEntity existingEntity = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // 1. invalid otp
        if (existingEntity.getResetOtp() == null || !existingEntity.getResetOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP ");
        }

        //2. otp expired
        if (existingEntity.getResetOtpExpireAt() < System.currentTimeMillis()) {
            throw new RuntimeException("OTP Expired");
        }

        existingEntity.setPassword(passwordEncoder.encode(newPassword));
        existingEntity.setResetOtp(null);
        existingEntity.setResetOtpExpireAt(0L);

        userRepository.save(existingEntity);

    }


    @Override
    public void sendResetOtp(String email) {
        UserEntity existingEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        //Generate 6 digit otp
        String otp = String.valueOf(ThreadLocalRandom.current().nextInt(10_00_00, 10_00_000));

        //calculate expiry time (current time + 15 minutes in milliseconds)
//        long expiryTime = System.currentTimeMillis() + (15 * 60 * 1_000);
        long expiryTime = System.currentTimeMillis() + (1_000);

        //update the profile/user
        existingEntity.setResetOtp(otp);
        existingEntity.setResetOtpExpireAt(expiryTime);

        //save into database
        userRepository.save(existingEntity);

        try {
            //TODO: send the reset otp
            emailService.sendResetOtpEmail(existingEntity.getEmail(), otp);
        } catch (Exception ex) {
            throw new RuntimeException("Unable to send reset otp email");
        }

    }


    @Override
    public ProfileResponse getProfile(String email) {
        UserEntity exisitingUser = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        return convertToProfileResponse(exisitingUser);
    }

    @Override
    public ProfileResponse createProfile(ProfileRequest request) {
        UserEntity newProfile = convertToUserEntity(request);
        if (userRepository.existsByEmail(newProfile.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        newProfile = userRepository.save(newProfile);
        return convertToProfileResponse(newProfile);
    }


    private UserEntity convertToUserEntity(ProfileRequest request) {
        return UserEntity.builder()
                .email(request.getEmail())
                .userId(UUID.randomUUID().toString())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .isAccountVerified(false)
                .resetOtpExpireAt(0L)
                .verifyOtp(null)
                .resetOtp(null)
                .build();
    }

    private ProfileResponse convertToProfileResponse(UserEntity newProfile) {
        return ProfileResponse.builder()
                .email(newProfile.getEmail())
                .name(newProfile.getName())
                .userId(newProfile.getUserId())
                .isAccountVerified(newProfile.getIsAccountVerified())
                .build();
    }
}
