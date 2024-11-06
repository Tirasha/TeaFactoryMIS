package com.miniProject.TeaFactoryMIS.Exception;

public class InventoryNotFoundException extends RuntimeException{
    public InventoryNotFoundException(String inventory_id){
        super("Could not found the ID with "+inventory_id);
    }

}
