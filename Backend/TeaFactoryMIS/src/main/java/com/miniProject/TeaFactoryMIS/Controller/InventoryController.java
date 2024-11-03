package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Repository.InventoryRepository;
import com.miniProject.TeaFactoryMIS.model.Fertilizer;
import com.miniProject.TeaFactoryMIS.model.Inventory;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryrepo;

    @PostMapping("/inventory/add")
    Inventory newInventory(@RequestBody Inventory newInventory)
    {

        return inventoryrepo.save(newInventory);
    }

   @GetMapping("/inventory/all")
    List<Inventory> getAllInventory()
   {
       return inventoryrepo.findAll();
   }



}
