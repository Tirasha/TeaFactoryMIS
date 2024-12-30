package com.miniProject.TeaFactoryMIS.Exception;

public class InventoryNotFoundException extends  RuntimeException {

    public InventoryNotFoundException(String inv_id)
    {
        super("Could not found inventory id :" +inv_id);
    }

}
