package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Repository.SalesRepository;
import com.miniProject.TeaFactoryMIS.Service.SalesService;
import com.miniProject.TeaFactoryMIS.model.Sales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("Sales")
@CrossOrigin(origins = "*")
public class SalesController {

    @Autowired
    SalesService salesService;

    @Autowired
    SalesRepository salesRepository;

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

    @GetMapping("/getsales")
    public ResponseEntity<List<Map<String, Object>>> getSales() {
        List<Map<String, Object>> salesData = salesService.getSalesData();
        return ResponseEntity.ok(salesData);
    }


    @DeleteMapping("/{salesId}")
    public ResponseEntity<Void> deleteSales(@PathVariable String salesId) {
        try {
            salesRepository.deleteById(salesId);
            return ResponseEntity.noContent().build();

        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/history")
    public List<Map<String, Object>> getSalesHistory() {
        return salesService.getSalesHistory();
    }

//    @GetMapping("/getAllSales")
//    public ResponseEntity<List<Sales>> getAllSales() {
//        List<Sales> salesList = salesService.getAllSales();
//        return ResponseEntity.ok(salesList);
//    }


    @PutMapping("/{salesId}")
    public ResponseEntity<Sales> updateSales(@PathVariable String salesId, @RequestBody Sales updatedSale) {
        Sales updated = salesService.updateSales(salesId, updatedSale);

        return ResponseEntity.ok(updated);
    }


    @GetMapping("/monthlySales")
    public Map<String, Map<String, Double>> getMonthlySales() {
        List<Sales> allsales = salesRepository.findAll();
        Map<String, Map<String, Double>> monthlySalesData = new HashMap<>();

        for (Sales sale : allsales) {
            LocalDate saleDate = sale.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            String month = saleDate.getMonth().toString();

            monthlySalesData.putIfAbsent(month, new HashMap<>());
            monthlySalesData.get(month).merge(sale.getTeaType(), sale.getTea_Quantity(), Double::sum);


        }
        return monthlySalesData;
    }
}




