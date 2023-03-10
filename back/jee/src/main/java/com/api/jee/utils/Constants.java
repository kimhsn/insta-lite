package com.api.jee.utils;

public interface Constants {
      //ROOT -----------------------------------------------------------------
      public final String APP_ROOT = "/insta";

      public final String ENDPOINT_USERS = APP_ROOT+"/users";
      public final String ENDPOINT_PHOTOS = APP_ROOT+"/photos";
      public final String ENDPOINT_VIDEOS = APP_ROOT+"/videos";
      public final String ENDPOINT_ROLE = APP_ROOT+"/roles";

      public final String ENDPOINT_FIND_BY_ID = "/findById/{id}";
      public final String ENDPOINT_FIND_BY_NOM = "/findByNom/{nom}";
      public final String ENDPOINT_FIND_BY_EMAIL = "/findByMail/{email}";

      public final String ENDPOINT_ADD_USER = "/addNewUser";
      public final String ENDPOINT_ADD_ADMIN = "/addNewAdmin";
      public final String ENDPOINT_ADD_NEW_ROLE = "/addNewRoles";
      public final String ENDPOINT_ADD_ROLE_TO_USER = "/addRoleToUser";
      public final String ENDPOINT_ADD_PHOTO_TO_USER = "/addPhotoToUser";
      public final String ENDPOINT_ADD_VIDEO_TO_USER = "/addVideoToUser";
      public final String ENDPOINT_ADD_USER_TO_PHOTO = "/addUserToPhoto";
      public final String ENDPOINT_PAGE_USER = "/pageUsers";
      public final String ENDPOINT_PROFILE_USER= "/profile";

      /*--------------------------------------------------------------------*/
      public final String ENDPOINT_AUTH = APP_ROOT+"/auth";
      public final String ENDPOINT_AUTHENTICATE = "/authenticate";
      public final String ENDPOINT_REFRESH_TOKEN = "/refreshToken";
      public final String ENDPOINT_VERIF_TOKEN = "/verifToken";

      public final String[] ROOT_AUTHORIZED =
              new String[]{
                      "/shops/**/read",
                      "/shops/auth/authenticate",
                      "/shops/auth/refreshToken",
                      "/**/refreshToken/**",
                      "/v2/api-docs",
                      "/swagger-resources",
                      "/swagger-resources/**",
                      "/configuration/ui",
                      "/configuration/security",
                      "/webjars/**",
                      "/v3/api-docs/**",
                      "/swagger-ui/**"};
      //----------------------------------------------------------------------------
      public final String SECRET_KEY = "secret";
      public final String AUTHORIZATION_HEADER = "Authorization";
      public final String PREFIX_TOKEN = "Bearer ";
      public final long EXPIRE_ACCESS_TOKEN = 500*60*1000;
      public final long EXPIRE_REFRESH_TOKEN = 600*60*1000;
      public final String ROLES = "roles";

      public static final String ROLE_USER = "USER";
      public static final String ROLE_MANAGER = "MANAGER";
      public static final String ROLE_ADMIN = "ADMIN";


}
