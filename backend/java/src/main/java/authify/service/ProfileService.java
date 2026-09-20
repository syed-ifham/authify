package authify.service;

import authify.io.ProfileRequest;
import authify.io.ProfileResponse;

public interface ProfileService {

    ProfileResponse createProfile(ProfileRequest request);

}
