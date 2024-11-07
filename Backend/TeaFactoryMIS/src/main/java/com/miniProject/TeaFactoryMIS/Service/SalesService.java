package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.Repository.InventoryRepository;
import com.miniProject.TeaFactoryMIS.Repository.SalesRepository;
import com.miniProject.TeaFactoryMIS.model.Inventory;
import com.miniProject.TeaFactoryMIS.model.Sales;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;


@Service
public class SalesService {

    @Autowired
    private SalesRepository salesRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    public Sales addSale(Sales sale) {
        if (sale.getInventory() == null || sale.getInventory().getInventory_id() == null) {
            throw new IllegalArgumentException("Inventory ID must not be null");
        }

        Optional<Inventory> inventoryOpt = inventoryRepository.findById(sale.getInventory().getInventory_id());
        if (inventoryOpt.isPresent()) {
            Inventory inventory = inventoryOpt.get();
            if (inventory.getAvailable_stock() < sale.getTea_Quantity()) {
                throw new IllegalArgumentException("Not enough stock available");
            }
            return salesRepository.save(sale);
        } else {
            throw new IllegalArgumentException("Invalid Inventory Id");
        }
    }



    public List<Sales> getAllSales() {
        return salesRepository.findAll();
    }

    public List<Map<String, Object>> getSalesData(){
        String sql="SELECT * FROM ViewAllSales";
        return jdbcTemplate.queryForList(sql);
    }

    public Sales updateSales(String salesId,Sales UpdatedSale){
        Sales existingSale=salesRepository.findById(salesId).orElseThrow(()->new RuntimeException("Sale not found"));

         existingSale.setTea_Quantity(UpdatedSale.getTea_Quantity());
         existingSale.setTeaType(UpdatedSale.getTeaType());
         existingSale.setInventory(UpdatedSale.getInventory());


         return salesRepository.save(existingSale);
    }


    public List<Map<String,Object>> getSalesHistory(){
        String sql="SELECT * FROM deleted_sales";
        return jdbcTemplate.queryForList(sql);
    }

}
