package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Repository.InventoryRepository;
import com.miniProject.TeaFactoryMIS.model.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
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
