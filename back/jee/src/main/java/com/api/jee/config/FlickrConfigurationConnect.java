package com.api.jee.config;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.RequestContext;
import com.flickr4java.flickr.auth.Auth;
import com.flickr4java.flickr.auth.Permission;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlickrConfigurationConnect {
    private final String APIKEY = "4d5034eeb1c3be72fae4162163034e7e";
    private final String APISECRET = "bdcca8b64c2f6de3";
    private final String APPKEY = "72157720868330525-538e9d33ae2ef346";
    private final String APPSECRET = "5e63dddac57fd890";


    @Bean
    public Flickr getCnxFlickr() {
        Flickr flickr = new Flickr(APIKEY, APISECRET, new REST());
        Auth auth = new Auth();
        auth.setPermission(Permission.DELETE);
        auth.setToken(APPKEY);
        auth.setTokenSecret(APPSECRET);
        RequestContext requestContext = RequestContext.getRequestContext();
        requestContext.setAuth(auth);
        flickr.setAuth(auth);
        return flickr;
    }
}
