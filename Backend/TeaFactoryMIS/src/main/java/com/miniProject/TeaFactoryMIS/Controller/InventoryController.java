package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Repository.InventoryRepository;
import com.miniProject.TeaFactoryMIS.model.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryrepo;

    @PostMapping("/add")
    Inventory newInventory(@RequestBody Inventory newInventory)
    {

        return inventoryrepo.save(newInventory);
    }

   @GetMapping("/all")
    List<Inventory> getAllInventory()
   {
       return inventoryrepo.findAll();
   }

}
