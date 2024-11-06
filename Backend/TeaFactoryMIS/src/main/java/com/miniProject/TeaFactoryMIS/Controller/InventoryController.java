package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.InventoryNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.InventoryRepository;
import com.miniProject.TeaFactoryMIS.model.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryrepo;

    @PostMapping("/inventoryAdd")
    public Inventory newInventory(@RequestBody Inventory newInventory)
    {

        return inventoryrepo.save(newInventory);
    }

   @GetMapping("/all")
    List<Inventory> getAllInventory()
   {
       return inventoryrepo.findAll();
   }

    @GetMapping("/inventoryGet/{inventory_id}")
    Inventory getInventoryById(@PathVariable String inventory_id)
    {
        return inventoryrepo.findById(inventory_id)
                .orElseThrow(()-> new InventoryNotFoundException(inventory_id));
    }

    @PutMapping("/inventoryEdit/{inventory_id}")
    Inventory updateInventory(@RequestBody Inventory newinventory, @PathVariable String inventory_id)
    {
        return  inventoryrepo.findById(inventory_id)
                .map(inventory -> {
                    inventory.setType(newinventory.getType());
                    inventory.setAvailable_stock(newinventory.getAvailable_stock());
                    inventory.setPrice_per_kg(newinventory.getPrice_per_kg());
                    return inventoryrepo.save(inventory);
                }).orElseThrow(()-> new InventoryNotFoundException(inventory_id));

    }

    @DeleteMapping("/inventoryDelete/{inventory_id}")
    String deleteInventoryById(@PathVariable String inventory_id)
    {
        if(! inventoryrepo.existsById(inventory_id))
        {
            throw  new InventoryNotFoundException(inventory_id);
        }
        inventoryrepo.deleteById(inventory_id);
        return " Inventory with id :"+inventory_id+ " has been deleted success.";
    }



}
