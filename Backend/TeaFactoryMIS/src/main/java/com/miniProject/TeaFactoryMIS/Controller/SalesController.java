package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Service.SalesService;
import com.miniProject.TeaFactoryMIS.model.Sales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("Sales")
@CrossOrigin(origins = "*")
public class SalesController {

    @Autowired
    SalesService salesService;

    @PostMapping("/addSales")
    public ResponseEntity<Sales> addSale(@RequestBody Sales sale) {
        try {
            if (sale.getInventory() == null || sale.getInventory().getInventory_id() == null) {
                return ResponseEntity.badRequest().body(null); // or throw an exception
            }

            sale.setDate(new Date());
            Sales savedSale = salesService.addSale(sale);
            return ResponseEntity.ok(savedSale);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/getAllSales")
    public ResponseEntity<List<Sales>> getAllSales() {
        List<Sales> salesList = salesService.getAllSales();
        return ResponseEntity.ok(salesList);
    }

}
