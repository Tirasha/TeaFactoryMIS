package com.miniProject.TeaFactoryMIS.Exception;

public class BasicNotFoundException extends RuntimeException{
    public BasicNotFoundException(String basicId){
        super("Could not found the ID with "+basicId);
    }
}
