package com.miniProject.TeaFactoryMIS.Service;

import com.miniProject.TeaFactoryMIS.Repository.FertilizerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FertilizerService {

    @Autowired
    private FertilizerRepository fertilizerRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public List<Map<String,Object>> getFertilizerStockSummary(){
        String sql= "select * from Fertilizer_Summary";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String,Object>> getDeletedFertilizer(){
        String sql="select * from deleted_fertilizer_history";
        return jdbcTemplate.queryForList(sql);
    }
}

