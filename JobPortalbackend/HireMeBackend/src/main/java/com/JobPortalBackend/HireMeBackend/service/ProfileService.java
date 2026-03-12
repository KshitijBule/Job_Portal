package com.JobPortalBackend.HireMeBackend.service;

import com.JobPortalBackend.HireMeBackend.dto.ProfileDTO;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;

import java.util.List;

public interface ProfileService {
    public Long createProfile(String email,String name) throws JobPortalException;
    public ProfileDTO getProfile(Long id) throws JobPortalException;
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException;

   public List<ProfileDTO> getAllProfile() throws JobPortalException;
}
