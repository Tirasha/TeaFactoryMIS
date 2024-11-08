package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class DeleteHistoryTea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String inventory_id;
    private  String tea_type;
    private  double available_stock;
    private  double price_per_kg;
    private LocalDateTime Deleted_Time;
}
