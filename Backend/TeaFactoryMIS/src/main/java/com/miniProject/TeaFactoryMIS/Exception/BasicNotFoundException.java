package com.miniProject.TeaFactoryMIS.Exception;

public class BasicNotFoundException extends RuntimeException{
    public BasicNotFoundException(Long basicId){
        super("Could not found the ID with "+basicId);
    }
}
