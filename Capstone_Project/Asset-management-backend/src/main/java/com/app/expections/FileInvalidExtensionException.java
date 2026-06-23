package com.app.expections;

public class FileInvalidExtensionException extends RuntimeException {
    public FileInvalidExtensionException(String message) {
        super(message);
    }
}
