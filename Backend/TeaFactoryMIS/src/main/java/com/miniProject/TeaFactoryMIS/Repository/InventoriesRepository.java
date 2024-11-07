package com.miniProject.TeaFactoryMIS.Repository;

import com.miniProject.TeaFactoryMIS.model.Inventories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Objects;


public interface InventoriesRepository extends JpaRepository<Inventories,String> {

        @Query(value = "call Tea_Stock_Summary(:total_Tea_stock)",nativeQuery = true)
         List<Object[]> getTotalTeaStock(@Param("total_Tea_stock") double total_Tea_stock);

}
