package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.Repository.InventoryRepository;
import com.miniProject.TeaFactoryMIS.Repository.SalesRepository;
import com.miniProject.TeaFactoryMIS.model.Inventory;
import com.miniProject.TeaFactoryMIS.model.Sales;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class SalesService {

    @Autowired
    private SalesRepository salesRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

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


}
