package com.api.jee.utils;

import com.api.jee.config.FlickrConfigurationConnect;
import com.api.jee.repository.AppUserRepository;
import com.api.jee.repository.PhotoRepository;
import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.api.jee.service.impls.PhotoServiceImpl;
import com.flickr4java.flickr.uploader.UploadMetaData;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class TestFlickr {
    public static void main(String[] args) throws IOException, FlickrException {

        final FlickrConfigurationConnect flickrConf = new FlickrConfigurationConnect();
        final Flickr flickr = flickrConf.getCnxFlickr();

        InputStream stream = new FileInputStream(new File("/home/djellal/Bureau/téléchargement.png"));
        UploadMetaData uploadMetaData = new UploadMetaData();
        uploadMetaData.setTitle("titre");

        String vPhotoId = flickr.getUploader().upload(stream, uploadMetaData);
        String url = flickr.getPhotosInterface().getPhoto(vPhotoId).getMedium640Url();
        System.out.println(url);
    }
}
