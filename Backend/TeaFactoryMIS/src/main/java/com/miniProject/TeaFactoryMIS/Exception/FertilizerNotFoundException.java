package com.miniProject.TeaFactoryMIS.Exception;

import org.springframework.web.bind.annotation.ExceptionHandler;

public class FertilizerNotFoundException extends RuntimeException {
    public FertilizerNotFoundException(String Fer_ID){
        super("Could not found the ID with "+Fer_ID);
    }

}
