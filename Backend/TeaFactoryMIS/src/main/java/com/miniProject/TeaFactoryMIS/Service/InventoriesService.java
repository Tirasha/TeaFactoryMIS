package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.Repository.InventoriesRepository;
import com.miniProject.TeaFactoryMIS.model.Inventories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.List;
import java.util.Map;

@Service
public class InventoriesService {

    @Autowired
    private InventoriesRepository inventoryRepo;
    @Autowired
    private JdbcTemplate jdbcTemplate;


        //view for tea type and qnt summary
    public List<Map<String,Object>> getTeaStockSummary(){
        String sql="select * from Tea_Stock_Summary";
        return jdbcTemplate.queryForList(sql);
    }

    //procedure
    public double getTotalTeaStock() {
        final String TotalTeaStockProcedure = "{CALL Tea_Stock_Summary(?)}";
        return jdbcTemplate.execute((Connection connection) -> {
            try (CallableStatement callableStatement = connection.prepareCall(TotalTeaStockProcedure)) {
                callableStatement.registerOutParameter(1, Types.FLOAT);
                callableStatement.execute();
                double totalStock = callableStatement.getFloat(1);
                System.out.println("Total stock from procedure: " + totalStock);  // Debugging line
                return totalStock;
            }
        });
    }


    public List<Map<String,Object>> getDeleteHistory(){
        String sql="select * from delete_history_tea";
        return jdbcTemplate.queryForList(sql);
    }

}
