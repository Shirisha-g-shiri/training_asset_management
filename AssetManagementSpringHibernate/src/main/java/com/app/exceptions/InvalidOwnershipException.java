package com.app.exceptions;

public class InvalidOwnershipException extends RuntimeException {
    public InvalidOwnershipException(String message) {
        super(message);
    }
}
