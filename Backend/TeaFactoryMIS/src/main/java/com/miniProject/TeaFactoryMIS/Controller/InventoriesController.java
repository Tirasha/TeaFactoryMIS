package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.InventoryNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.InventoriesRepository;
import com.miniProject.TeaFactoryMIS.model.Inventories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class InventoriesController {

    @Autowired
    private InventoriesRepository inventoryRepo;

    @PostMapping("/inventory/add/new")
    Inventories addNewInvntory(@RequestBody Inventories newinventory)
    {
        return inventoryRepo.save(newinventory);
    }

    @GetMapping("/inventory/all")
    List<Inventories> getAllInventory()
    {
        return inventoryRepo.findAll();
    }

    @GetMapping("/inventory/get/{inv_id}")
    Inventories getInventoryById(@PathVariable String inv_id)
    {
        return inventoryRepo.findById(inv_id)
                .orElseThrow(()-> new InventoryNotFoundException(inv_id));
    }

    @PutMapping("/inventory/edit/{inv_id}")
    Inventories updateInventory(@RequestBody Inventories newinventory,@PathVariable String inv_id)
    {
        return  inventoryRepo.findById(inv_id)
                .map(inventories -> {
                    inventories.setTea_type(newinventory.getTea_type());
                    inventories.setAvailable_stock(newinventory.getAvailable_stock());
                    inventories.setPrice_per_kg(newinventory.getPrice_per_kg());
                    return inventoryRepo.save(inventories);
                }).orElseThrow(()-> new InventoryNotFoundException(inv_id));

    }

    @DeleteMapping("/inventory/delete/{inv_id}")
    String deleteInventoryById(@PathVariable String inv_id)
    {
        if(! inventoryRepo.existsById(inv_id))
        {
            throw  new InventoryNotFoundException(inv_id);
        }
        inventoryRepo.deleteById(inv_id);
        return " Inventory with id :"+inv_id+ " has been deleted success.";
    }
}
