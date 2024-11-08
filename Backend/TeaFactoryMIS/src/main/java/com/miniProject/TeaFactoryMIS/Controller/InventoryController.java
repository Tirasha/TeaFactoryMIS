package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.InventoryNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.InventoryRepository;
import com.miniProject.TeaFactoryMIS.Service.InventoryService;
import com.miniProject.TeaFactoryMIS.model.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepo;

    @Autowired
    private InventoryService inventoryServ;


    @GetMapping("/inventory/tea_stock_summary")
    public ResponseEntity<List<Map<String, Object>>> getTeaStockSummary(){
        List<Map<String,Object>> teaStockSummary=inventoryServ.getTeaStockSummary();
        return ResponseEntity.ok(teaStockSummary);
    }

    @GetMapping("/inventory/total_tea_stock")
    public ResponseEntity<Double> getTotalTeaStock() {
        double totalTeaStock = inventoryServ.getTotalTeaStock();
        return ResponseEntity.ok(totalTeaStock);  // Return as a simple double value
    }

    @GetMapping("/inventory/delete_history_tea")
    public ResponseEntity<List<Map<String, Object>>> getDeleteHistory(){
        List<Map<String,Object>> DeletedHistory=inventoryServ.getDeleteHistory();
        return ResponseEntity.ok(DeletedHistory);
    }



    @PostMapping("/inventory/add/new")
    Inventory addNewInvntory(@RequestBody Inventory newinventory)
    {
        return inventoryRepo.save(newinventory);
    }

    @GetMapping("/inventory/all")
    List<Inventory> getAllInventory()
    {
        return inventoryRepo.findAll();
    }

    @GetMapping("/inventory/get/{inventory_id}")
    Inventory getInventoryById(@PathVariable String inventory_id)
    {
        return inventoryRepo.findById(inventory_id)
                .orElseThrow(()-> new InventoryNotFoundException(inventory_id));
    }

    @PutMapping("/inventory/edit/{inventory_id}")
    Inventory updateInventory(@RequestBody Inventory newinventory, @PathVariable String inventory_id)
    {
        return  inventoryRepo.findById(inventory_id)
                .map(inventory -> {
                    inventory.setTea_type(newinventory.getTea_type());
                    inventory.setAvailable_stock(newinventory.getAvailable_stock());
                    inventory.setPrice_per_kg(newinventory.getPrice_per_kg());
                    return inventoryRepo.save(inventory);
                }).orElseThrow(()-> new InventoryNotFoundException(inventory_id));

    }

    @DeleteMapping("/inventory/delete/{inventory_id}")
    String deleteInventoryById(@PathVariable String inventory_id)
    {
        if(! inventoryRepo.existsById(inventory_id))
        {
            throw  new InventoryNotFoundException(inventory_id);
        }
        inventoryRepo.deleteById(inventory_id);
        return " Inventory with id :"+inventory_id+ " has been deleted success.";
    }
}
