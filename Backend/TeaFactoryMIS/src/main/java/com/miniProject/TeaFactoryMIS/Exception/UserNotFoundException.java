package com.miniProject.TeaFactoryMIS.Exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String userId){
        super("Could not found the ID"+userId);
    }
}
