package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.InventoryNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.InventoriesRepository;
import com.miniProject.TeaFactoryMIS.Service.InventoriesService;
import com.miniProject.TeaFactoryMIS.model.Inventories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class InventoriesController {

    @Autowired
    private InventoriesRepository inventoryRepo;

    @Autowired
    private InventoriesService inventoryServ;


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
    Inventories addNewInvntory(@RequestBody Inventories newinventory)
    {
        return inventoryRepo.save(newinventory);
    }

    @GetMapping("/inventory/all")
    List<Inventories> getAllInventory()
    {
        return inventoryRepo.findAll();
    }

    @GetMapping("/inventory/get/{inventory_id}")
    Inventories getInventoryById(@PathVariable String inventory_id)
    {
        return inventoryRepo.findById(inventory_id)
                .orElseThrow(()-> new InventoryNotFoundException(inventory_id));
    }

    @PutMapping("/inventory/edit/{inventory_id}")
    Inventories updateInventory(@RequestBody Inventories newinventory,@PathVariable String inventory_id)
    {
        return  inventoryRepo.findById(inventory_id)
                .map(inventories -> {
                    inventories.setTea_type(newinventory.getTea_type());
                    inventories.setAvailable_stock(newinventory.getAvailable_stock());
                    inventories.setPrice_per_kg(newinventory.getPrice_per_kg());
                    return inventoryRepo.save(inventories);
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
